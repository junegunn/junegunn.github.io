#!/usr/bin/env ruby
# frozen_string_literal: true

# Generate content/docs/fzf/reference.md from the fzf man-page source.
#
# USAGE
#     scripts/gen-fzf-reference.rb [--man PATH]
#
# By default the script reads ../fzf/man/man1/fzf.1 relative to this repo,
# pointed at a local checkout of https://github.com/junegunn/fzf. Override
# the location with --man /path/to/fzf.1 if your fzf checkout lives elsewhere.
#
# The script overwrites content/docs/fzf/reference.md in place.
#
# WHY A SCRIPT
#     fzf releases keep adding options and tweaking wording, so this page has
#     to be regenerated periodically. Doing the conversion by hand on every
#     release is impractical (2000+ lines). The script encodes the man-to-
#     markdown rules below so re-runs are stable.
#
# CONVERSION RULES (groff/man -> Markdown)
#     .SH NAME              -> ## NAME
#     .SS NAME              -> ### NAME
#     .TP + .B "flag"       -> #### `flag` (or ### `flag` when no .SS in scope)
#     \fB...\fR             -> **bold**, OR `code` when content looks code-ish
#                              (contains --, =, $, {}, etc.). Code form is used
#                              liberally so Hugo's typographer cannot mangle
#                              `--` into an en-dash.
#     \fI...\fR             -> *italic* (same code-fallback as bold)
#     .B "* IDENT [tail]"   -> Markdown bullet `- `IDENT` [tail]` (also for
#                              .BR/.BI/etc. whose first arg starts with "* ").
#     Run of .BR <k> "<v>"  -> Markdown table (key | description). Triggered
#                              when >=2 such directives appear consecutively
#                              (separated only by .br). First column header
#                              is blank; second is "Description".
#     .br                   -> trailing two spaces (Markdown hard line break);
#                              suppressed after bullets so list items render
#     .RS / .RE             -> structural-only; collapsed in output
#     e.g. + indented lines -> fenced code block with `bash` language hint
#     Lines indented 2+ sp  -> fenced code block (bash), UNLESS the previous
#                              output line is a Markdown bullet ("- ..."),
#                              in which case they fold into the bullet as
#                              paragraph continuation.
#
#     Within a code block the script strips the common leading whitespace so
#     examples sit flush-left; relative indentation is preserved.
#
#     Plain-text occurrences of --flag-like tokens are wrapped in backticks
#     so Goldmark's typographer cannot convert `--` to an en-dash.
#
# FRONTMATTER
#     The generated file starts with Hugo frontmatter (weight: 6, title:
#     "Reference") followed by a one-line note pointing readers at
#     `fzf --man` for the terminal version of the same content.
#
# LIMITATIONS
#     - Two adjacent bold spans in the man source render as adjacent bold in
#       markdown (rare; usually a typo in the source).
#     - URLs emit as Markdown autolinks (<https://...>) so they're clickable.
#     - The script does not validate that the output Hugo-builds cleanly.
#       Run `hugo --gc --minify` after regeneration to confirm.

require 'optparse'

REPO_ROOT = File.expand_path('..', __dir__)
DEFAULT_MAN = File.expand_path(File.join(REPO_ROOT, '..', 'fzf', 'man', 'man1', 'fzf.1'))
OUTPUT = File.join(REPO_ROOT, 'content', 'docs', 'fzf', 'reference.md')

FRONTMATTER = <<~TEXT
  ---
  weight: 6
  title: "Reference"
  ---

  # Reference

  This is a Markdown rendition of the fzf man page. For the same content in your terminal, run `fzf --man`.

TEXT

CODE_LANG = 'bash'

TABLE_CMDS = %w[BR RB BI IB IR RI].freeze
BI_PAIRS = {
  'BI' => %w[B I], 'IB' => %w[I B],
  'BR' => %w[B R], 'RB' => %w[R B],
  'IR' => %w[I R], 'RI' => %w[R I]
}.freeze

# Split a man directive's argument list, honoring "double-quoted" tokens.
def parse_args_inline(rest)
  args = []
  s = rest.strip
  until s.empty?
    if s.start_with?('"')
      stop = s.index('"', 1)
      if stop.nil?
        args << s[1..]
        break
      end
      args << s[1...stop]
      s = s[(stop + 1)..].lstrip
    else
      m = s.match(/\S+/)
      args << m[0]
      s = s[m.end(0)..].lstrip
    end
  end
  args
end

# Decode groff escape sequences. \fX font switches are preserved as-is
# so they can be processed in a later pass.
def unescape(text)
  out = String.new
  i = 0
  len = text.length
  while i < len
    ch = text[i]
    if ch == '\\' && i + 1 < len
      nxt = text[i + 1]
      case nxt
      when 'f'
        if i + 2 < len
          out << text[i, 3]
          i += 3
          next
        end
      when '-'
        out << '-'
        i += 2
        next
      when '\\'
        out << '\\'
        i += 2
        next
      when '&'
        i += 2
        next
      when 'e'
        out << '\\'
        i += 2
        next
      when '('
        i += 4
        next
      when '.', "'", '"', ' '
        out << nxt
        i += 2
        next
      else
        out << nxt
        i += 2
        next
      end
    end
    out << ch
    i += 1
  end
  out
end

# Remove font switches; leave content as plain text.
def strip_formatting(text)
  unescape(text).gsub(/\\f[BIRP]/, '')
end

# Wrap option-flag-like tokens in backticks so Markdown's typographer
# doesn't turn `--` into an en-dash, wrap bare URLs in autolink angle
# brackets so Goldmark renders them as clickable links, and convert
# short single-quoted character literals (e.g. '▌', '··', '>') to inline code.
def protect_plain(text)
  text = text.gsub(/(?<![<`])https?:\/\/[^\s<>`]+/) { |m| "<#{m}>" }
  # Convert 'X' to `X` when X has no spaces (length <=16) or contains
  # non-ASCII. Negative lookarounds avoid matching apostrophes inside
  # words ("don't", "John's") and tokens already inside backticks.
  text = text.gsub(
    /(?<![A-Za-z0-9`])'([^'`]{1,4}|[^'\s`]{1,16}|[^'`]*[^\x00-\x7f][^'`]*)'(?![A-Za-z0-9`])/
  ) { "`#{Regexp.last_match(1)}`" }
  # When the source quotes a literal that itself ends in an apostrophe
  # (e.g. '.|'' for the marker chars), the regex stops at the inner
  # apostrophe and leaves the trailing one stranded. Merge back.
  text = text.gsub(/`([^`]+)`'/) { "`#{Regexp.last_match(1)}'`" }
  text.gsub(/(?<!`)--[A-Za-z][A-Za-z0-9_-]*/) { |m| "`#{m}`" }
end

# Heuristic: should this emphasized span render as `code` instead of **bold**?
def looks_codey?(body)
  return true if body.include?('--')
  return true if body.match?(/[$=({}\[\]\/\\^]/)
  return true if body.match?(/\A[+-]?[A-Za-z_][A-Za-z_0-9-]*\z/) && body.include?('-')
  return true if body.match?(/\A[A-Z][A-Z0-9_]+\z/)
  # Single lowercase identifier (key names, event names). The man page
  # never uses italic for ordinary prose words, so this is safe.
  return true if body.match?(/\A[a-z]+(?:-[a-z0-9]+)*\z/)

  false
end

# Reconstruct a \fX-annotated string from alternating-font directives
# like .BI / .BR / .IB / .RB / .IR / .RI.
def render_bi_pairs(args, base_font, alt_font)
  parts = []
  cur = base_font
  args.each do |a|
    parts << case cur
             when 'B' then "\\fB#{a}\\fR"
             when 'I' then "\\fI#{a}\\fR"
             else a
             end
    cur = (cur == base_font) ? alt_font : base_font
  end
  parts.join
end

# Escape leading/trailing asterisks in a bold/italic body so they don't
# break the surrounding Markdown emphasis markers.
def esc_body(b)
  return b if b.empty?

  escaped_leading = false
  if b[0] == '*'
    b = '\\' + b
    escaped_leading = true
  end
  if b[-1] == '*' && !(escaped_leading && b.length == 2)
    b = b[0...-1] + '\\' + b[-1]
  end
  b
end

# Render a single \fX-delimited span based on its font code.
def render_span(seg, font)
  return seg if seg.strip.empty?

  lead = seg[0...(seg.length - seg.lstrip.length)]
  body = seg.strip
  trail = seg[seg.rstrip.length..]

  if body.match?(/\Ahttps?:\/\/\S+\z/)
    "#{lead}<#{body}>#{trail}"
  elsif font == 'B'
    if looks_codey?(body)
      "#{lead}`#{body.gsub('`', '\\`')}`#{trail}"
    else
      "#{lead}**#{esc_body(body)}**#{trail}"
    end
  elsif font == 'I'
    if looks_codey?(body)
      "#{lead}`#{body.gsub('`', '\\`')}`#{trail}"
    else
      "#{lead}*#{esc_body(body)}*#{trail}"
    end
  else
    protect_plain(seg)
  end
end

# Walk through a text snippet, swapping groff font codes for Markdown
# emphasis or backticks where appropriate.
def render_inline(text)
  text = unescape(text)
  out = []
  cur = String.new
  cur_font = 'R'
  i = 0
  len = text.length

  while i < len
    ch = text[i]
    if ch == '\\' && i + 1 < len && text[i + 1] == 'f'
      out << render_span(cur, cur_font) unless cur.empty?
      cur = String.new
      code = i + 2 < len ? text[i + 2] : 'R'
      cur_font = %w[B I R].include?(code) ? code : 'R'
      i += 3
      next
    end
    cur << ch
    i += 1
  end
  out << render_span(cur, cur_font) unless cur.empty?
  out.join
end

# Produce the heading text for a .TP tag. Returns [kind, rendered] where
# kind is 'option' (signature -> code-formatted heading) or 'text'.
def render_tag(line)
  line = line.rstrip
  return ['text', render_inline(line)] unless line.start_with?('.')

  parts = line[1..].split(' ', 2)
  cmd = parts[0]
  rest = parts[1] || ''
  args = parse_args_inline(rest)

  if %w[B I].include?(cmd)
    sig = args.map { |a| strip_formatting(a) }.join(' ')
    ['option', "`#{sig}`"]
  elsif TABLE_CMDS.include?(cmd)
    sig = args.map { |a| strip_formatting(a) }.join
    ['option', "`#{sig}`"]
  else
    ['text', render_inline(rest)]
  end
end

# Render a `* <ident> [trailing]` bullet as a Markdown list item.
# The identifier (first word) is wrapped in backticks; any trailing text
# is left as plain text.
def render_bullet(content)
  rest = content[2..].lstrip
  m = rest.match(/\A([A-Za-z][\w\-]*)(.*)\z/)
  m ? "- `#{m[1]}`#{m[2]}" : "- #{rest}"
end

# Strip the longest common leading-whitespace prefix from a code block.
#
# Treats single-outlier lines at indent 0 specially: if exactly one
# non-blank line has zero indent and the rest share a higher indent, the
# higher indent is used. This handles the `e.g. <content>` pattern where
# the first line was extracted with no leading whitespace while the rest
# of the block remained indented in the original source.
def dedent_block(lines)
  return lines if lines.empty?

  indents = lines.reject { |l| l.strip.empty? }
                 .map { |l| l.length - l.sub(/\A +/, '').length }
  return lines if indents.empty?

  zero_count = indents.count(0)
  nonzero = indents.reject(&:zero?)
  ci = if zero_count == 1 && !nonzero.empty? && nonzero.min > 0
         nonzero.min
       else
         indents.min
       end
  return lines if ci.zero?

  lines.map do |l|
    if l.length >= ci && l[0...ci].strip.empty?
      l[ci..]
    else
      l.sub(/\A +/, '')
    end
  end
end

# Detect a run of `.BR/.BI/.IB/.RB/.IR/.RI <key> "<desc>"` directives
# (or single-arg `.BR <key>`) separated only by `.br`. Returns [end_index,
# rows] when at least 2 such directives are found, else [start, nil].
# Each row is [raw_key, raw_desc] with groff escapes still intact.
def try_collect_table(lines, start, n)
  rows = []
  i = start
  while i < n
    ln = lines[i].rstrip
    break unless ln.start_with?('.')

    parts = ln[1..].split(' ', 2)
    cmd = parts[0]
    break unless TABLE_CMDS.include?(cmd)

    args = parse_args_inline(parts[1] || '')
    break if args.empty? || args.length > 2
    break if args[0].lstrip.start_with?('* ')

    rows << [args[0], args.length == 2 ? args[1] : '']
    i += 1
    i += 1 if i < n && lines[i].strip == '.br'
  end
  rows.length >= 2 ? [i, rows] : [start, nil]
end

class Generator
  def initialize(lines)
    @lines = lines
    @n = lines.length
    @out = []
    @i = 0
    @saw_ss = false
  end

  def run
    while @i < @n
      step
    end
    finalize
  end

  private

  def push(s = '')
    @out << s
  end

  def ensure_blank
    push if @out.any? && @out[-1] != ''
  end

  def ensure_blank_unless_bullet
    return if @out.empty?

    last = @out[-1]
    return if last == '' || last.start_with?('- ')

    push
  end

  def emit_table(rows)
    ensure_blank
    push '|     | Description |'
    push '| --- | :---------- |'
    rows.each do |raw_key, raw_desc|
      key_plain = strip_formatting(raw_key).strip
      k = key_plain.empty? ? '' : "`#{key_plain}`"
      d = raw_desc.empty? ? '' : render_inline(raw_desc).strip
      push "| #{k.gsub('|', '\\|')} | #{d.gsub('|', '\\|')} |"
    end
    push
  end

  def emit_code_block(buf)
    ensure_blank
    push "```#{CODE_LANG}"
    block = buf.map { |ln| strip_formatting(ln) }
    block.pop while block.any? && block[-1].strip.empty?
    dedent_block(block).each { |ln| push ln }
    push '```'
    push
  end

  def step
    line = @lines[@i].rstrip
    if line.empty?
      ensure_blank
      @i += 1
      return
    end
    if line.start_with?('.')
      handle_directive(line)
    elsif line.match?(/\A\s{2,}\S/)
      handle_indented_block(line)
    elsif line.strip == 'e.g.'
      handle_eg_standalone
    elsif line.start_with?('e.g. ')
      handle_eg_inline(line)
    else
      push render_inline(line)
      @i += 1
    end
  end

  def handle_directive(line)
    parts = line[1..].split(' ', 2)
    cmd = parts[0]
    rest = parts[1] || ''

    case cmd
    when 'TH'
      @i += 1
    when 'SH'
      a = parse_args_inline(rest)
      title = a.any? ? strip_formatting(a.join(' ')) : ''
      @saw_ss = false
      ensure_blank
      push "## #{title}"
      push
      @i += 1
    when 'SS'
      a = parse_args_inline(rest)
      title = a.any? ? strip_formatting(a.join(' ')) : ''
      @saw_ss = true
      ensure_blank
      push "### #{title}"
      push
      @i += 1
    when 'TP'
      handle_tp
    when 'B'
      handle_b(rest)
    when 'I'
      a = parse_args_inline(rest)
      push render_inline("\\fI#{a.join(' ')}\\fR")
      @i += 1
    when *TABLE_CMDS
      handle_alt_font(cmd, rest)
    when 'br'
      if @out.any? && !@out[-1].empty? && !@out[-1].end_with?('  ') && !@out[-1].start_with?('- ')
        @out[-1] = @out[-1].rstrip + '  '
      end
      @i += 1
    when 'PP', 'LP', 'P', 'RS', 'RE'
      ensure_blank
      @i += 1
    when 'IP'
      a = parse_args_inline(rest)
      ensure_blank
      push render_inline(a[0]) if a.any?
      @i += 1
    when 'nf'
      handle_nf
    when 'fi'
      @i += 1
    when 'ig'
      @i += 1
      @i += 1 while @i < @n && @lines[@i].rstrip != '..'
      @i += 1 if @i < @n
    else
      @i += 1
    end
  end

  def handle_tp
    @i += 1
    @i += 1 while @i < @n && @lines[@i].strip.empty?
    return if @i >= @n

    kind, rendered = render_tag(@lines[@i])
    @i += 1
    ensure_blank
    if kind == 'option'
      depth = @saw_ss ? '####' : '###'
      push "#{depth} #{rendered}"
    else
      push rendered
    end
    push
  end

  def handle_b(rest)
    a = parse_args_inline(rest)
    joined = a.join(' ')
    if joined.start_with?('* ')
      ensure_blank_unless_bullet
      push render_bullet(strip_formatting(joined))
    else
      push render_inline("\\fB#{a.join(' ')}\\fR")
    end
    @i += 1
  end

  def handle_alt_font(cmd, rest)
    a = parse_args_inline(rest)
    if a.any? && a[0].lstrip.start_with?('* ')
      joined = a.map { |x| strip_formatting(x) }.join
      ensure_blank_unless_bullet
      push render_bullet(joined)
      @i += 1
      return
    end

    end_i, rows = try_collect_table(@lines, @i, @n)
    if rows
      emit_table(rows)
      @i = end_i
      return
    end

    base, alt = BI_PAIRS[cmd]
    push render_inline(render_bi_pairs(a, base, alt))
    @i += 1
  end

  def handle_nf
    buf = []
    @i += 1
    while @i < @n && @lines[@i].rstrip != '.fi'
      buf << @lines[@i]
      @i += 1
    end
    @i += 1 if @i < @n
    emit_code_block(buf)
  end

  def handle_indented_block(_line)
    # 2-space-indented follow-on lines inside a Markdown bullet are
    # paragraph continuation, not code.
    if @out.any? && @out[-1].start_with?('- ')
      while @i < @n
        cur = @lines[@i]
        break if cur.strip.empty?
        break if cur.start_with?('.')
        break unless cur.match?(/\A\s{2,}\S/)

        @out[-1] = @out[-1].rstrip + ' ' + render_inline(cur.strip)
        @i += 1
      end
      return
    end

    buf = []
    while @i < @n
      cur = @lines[@i]
      if cur.strip.empty?
        j = @i + 1
        j += 1 while j < @n && @lines[j].strip.empty?
        if j < @n && @lines[j].match?(/\A\s{2,}\S/)
          buf << ''
          @i += 1
          next
        end
        break
      end
      break if cur.start_with?('.')
      break unless cur.match?(/\A\s/)

      buf << cur
      @i += 1
    end
    emit_code_block(buf)
  end

  def handle_eg_standalone
    j = @i + 1
    j += 1 while j < @n && @lines[j].strip.empty?
    if j < @n && @lines[j].match?(/\A\s{2,}\S/) && !@lines[j].start_with?('.')
      push 'e.g.'
      push
      buf = []
      @i = j
      while @i < @n
        cur = @lines[@i]
        if cur.strip.empty?
          buf << ''
          @i += 1
          next
        end
        break if cur.start_with?('.')
        break unless cur.match?(/\A\s/)

        buf << cur
        @i += 1
      end
      emit_code_block(buf)
    else
      push render_inline(@lines[@i].rstrip)
      @i += 1
    end
  end

  def handle_eg_inline(line)
    tail = line[5..]
    push 'e.g.'
    push
    buf = [tail]
    @i += 1
    while @i < @n
      cur = @lines[@i]
      if cur.strip.empty?
        j = @i + 1
        j += 1 while j < @n && @lines[j].strip.empty?
        if j < @n && @lines[j].match?(/\A\s{2,}\S/) && !@lines[j].start_with?('.')
          buf << ''
          @i += 1
          next
        end
        break
      end
      break if cur.start_with?('.')
      break unless cur.match?(/\A\s/)

      buf << cur
      @i += 1
    end
    emit_code_block(buf)
  end

  def finalize
    # Collapse runs of blank lines.
    cleaned = []
    prev_blank = false
    @out.each do |l|
      if l == ''
        cleaned << l unless prev_blank
        prev_blank = true
      else
        cleaned << l
        prev_blank = false
      end
    end

    # Trim blanks inside code fences.
    final = []
    in_code = false
    cleaned.each do |l|
      if l.start_with?('```')
        final.pop while final.any? && final[-1] == '' if in_code
        in_code = !in_code
      end
      final << l
    end
    final
  end
end

man_path = DEFAULT_MAN
OptionParser.new do |opts|
  opts.banner = "Usage: #{$PROGRAM_NAME} [options]"
  opts.on('--man PATH', "Path to fzf.1 man source (default: #{DEFAULT_MAN})") { |v| man_path = v }
end.parse!

unless File.file?(man_path)
  warn "ERROR: man source not found at #{man_path}"
  warn 'Point --man at a checkout of github.com/junegunn/fzf (file: man/man1/fzf.1).'
  exit 1
end

raw = File.read(man_path)
raw = raw.gsub(/^\.ig\n.*?^\.\.\n/m, '')
lines = raw.split("\n", -1)

final = Generator.new(lines).run

File.open(OUTPUT, 'w') do |f|
  f.write(FRONTMATTER)
  f.write(final.join("\n"))
  f.write("\n") if final.empty? || final[-1] != ''
end

puts "Wrote #{OUTPUT} (#{final.length} content lines)"
