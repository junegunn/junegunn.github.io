---
weight: 2
title: Chrome history
slug: chrome
params:
  long: Browsing Chrome history and bookmarks with fzf
---

# Browsing Chrome history and bookmarks with fzf

{{< notice info >}}
You might want to check out https://github.com/junegunn/everything.fzf which
includes a more complete version of this script, along with many other
integrations.
{{< /notice >}}

In this example, you'll learn how to browse Chrome history and bookmarks from
the command-line using [fzf].

[fzf]: https://junegunn.github.io/fzf/

## Getting the input data

Chrome manages the browsing history in an SQLite database file, and the
bookmarks in a JSON file. For example, on macOS, the files are located at:

* `~/Library/Application Support/Google/Chrome/Default/History`
   ```sh
   # The file is locked if Chrome is running, so you need to make a copy
   cp ~/Library/Application\ Support/Google/Chrome/Default/History /tmp/h

   sqlite3 /tmp/h '.schema urls'
   ```
   ```sql
   CREATE TABLE urls(
     id              INTEGER PRIMARY KEY AUTOINCREMENT,
     url             LONGVARCHAR,
     title           LONGVARCHAR,
     visit_count     INTEGER DEFAULT 0 NOT NULL,
     typed_count     INTEGER DEFAULT 0 NOT NULL,
     last_visit_time INTEGER NOT NULL,
     hidden          INTEGER DEFAULT 0 NOT NULL
   );
   CREATE INDEX urls_url_index ON urls (url);
   ```
* `~/Library/Application Support/Google/Chrome/Default/Bookmarks`
  ```sh
  jq '.roots | keys' ~/Library/Application\ Support/Google/Chrome/Default/Bookmarks
  ```
  ```json
  [
    "bookmark_bar",
    "other",
    "synced"
  ]
  ```

While it's not impossible to process these files using shell script, it's
challenging and probably not worth the effort, especially because the
bookmarks are in hierarchical structure. A scripting language like Ruby,
Python, or Perl would be better suited for this task. I've chosen Ruby for
this example because I'm most comfortable with it, but any language of your
choice will do.

See [Using fzf in your program](/fzf/tips/using-fzf-in-your-program/)
to learn how to integrate fzf into your program.

## Integration ideas

* Allow selecting multiple items and open them all at once
    * `--multi` (tab and shift-tab to select multiple items)
* Enable [line wrapping](/fzf/releases/0.54.0/) so that long URLs are not truncated
    * `--wrap`
* Use [multi-line feature](/fzf/tips/processing-multi-line-items/) of fzf to
  display the title of the page and the URL in separate lines
    * `--read0`
* Print the title and the URL in different colors
    * `--ansi`
* Open the selected URLs when you hit `Enter`, but do not close fzf so you can
  continue browsing
    * `--bind enter:execute-silent(...)+deselect-all`
* Show the current mode in [the border label](https://github.com/junegunn/fzf/blob/master/CHANGELOG.md#0350)
    * `--border-label " Chrome::History "`
* Provide bindings to switch between history mode and bookmarks mode
    * `--bind ctrl-b:reload(...)+change-border-label(...)+top`
    * `--bind ctrl-h:reload(...)+change-border-label(...)+top`
* Provide a binding to copy the selected URLs to the clipboard
    * `--bind ctrl-y:execute-silent(...)+deselect-all`

## Screenshot

{{< figure src="/fzf/images/chrome.fzf.png" >}}

## The code

Store the following code in a file, say `chrome.fzf`, put in in your `$PATH`,
and make it executable, so you can run it from anywhere.

The script was only tested on macOS, so if you're on another platform, you may
need to change `OPEN_COMMAND` and `CLIP_COMMAND` to the commands that work on
your platform.

```ruby {lineNos=inline}
#!/usr/bin/env ruby
# frozen_string_literal: true

require 'bundler/inline'
require 'rbconfig'
require 'tempfile'
require 'json'
require 'open3'
require 'shellwords'

gemfile do
  source 'https://rubygems.org'
  gem 'sqlite3'
  gem 'ansi256'
end

# Chrome fzf integration
module ChromeFzf
  extend self

  # Platform-specific constants.
  # FIXME: Commands for Linux and Windows are not tested.
  BASE_PATH, OPEN_COMMAND, CLIP_COMMAND =
    case RbConfig::CONFIG['host_os']
    when /darwin/
      ['Library/Application Support/Google/Chrome', 'open {+2}', 'echo -n {+2} | pbcopy']
    when /linux/
      ['.config/google-chrome', 'xdg-open {+2}', 'echo -n {+2} | xsel --clipboard --input']
    else
      ['AppData\Local\Google\Chrome\User Data', 'start {+2}', 'echo {+2} | clip']
    end

  def run(type)
    Open3.popen2(fzf(type)) do |stdin, _stdout|
      list(type, stdin)
    end
  rescue Errno::EPIPE
    # Ignore broken pipe error
  end

  def list(type, io = $stdout)
    method(type).call.each do |title, url, time|
      format(io, title, url, time)
    end
  end

  private

  def path(name) = File.join(Dir.home, BASE_PATH, 'Default', name)

  # Build fzf command
  def fzf(name)
    <<~CMD
      fzf --ansi --read0 --multi --info inline-right --reverse --scheme history \\
          --highlight-line --cycle --tmux 100% --wrap --wrap-sign ' ↳ ' \\
          --border --border-label " Chrome::#{name.capitalize} " --delimiter "\n · " \\
          --header '╱ CTRL-B: Bookmarks ╱ CTRL-H: History ╱ CTRL-Y: Copy to clipboard ╱\n\n' \\
          --bind 'enter:execute-silent(#{OPEN_COMMAND})+deselect-all' \\
          --bind 'ctrl-y:execute-silent(#{CLIP_COMMAND})+deselect-all' \\
          --bind 'ctrl-b:reload(ruby #{__FILE__.shellescape} --list b)+change-border-label( Chrome::Bookmarks )+top' \\
          --bind 'ctrl-h:reload(ruby #{__FILE__.shellescape} --list h)+change-border-label( Chrome::History )+top'
    CMD
  end

  def format(io, title, url, time)
    time = Time.at(time.to_i / 1_000_000 - 11_644_473_600).strftime('%F %T')
    io.puts "#{title} (#{time.yellow})".strip
    io.print " · #{url.blue.dim}\n\x0"
  end

  def history
    Tempfile.create('chrome') do |temp|
      temp.close
      FileUtils.cp(path('History'), temp.path)
      SQLite3::Database.open(temp.path) do |db|
        db.execute('select title, url, last_visit_time from urls order by last_visit_time desc')
      end
    end
  end

  def bookmarks
    build = lambda do |parent, json|
      name = [parent, json[:name]].compact.join('/')
      if json[:type] == 'folder'
        json[:children].flat_map { |child| build[name, child] }
      else
        [[name, json[:url], json.values_at(:date_last_used, :date_added).max]]
      end
    end

    JSON.load_file(path('Bookmarks'), symbolize_names: true)
        .fetch(:roots, {})
        .values
        .flat_map { |e| build[nil, e] }
        .sort_by(&:last)
        .reverse
  end
end

method = ARGV.delete('--list') ? :list : :run
type = case ARGV[0]&.downcase
       when 'b' then :bookmarks
       when 'h', nil then :history
       else abort "Usage: #{__FILE__} [--list] [b|h]"
       end

ChromeFzf.send(method, type)
```

{{< notice >}}
* In both cases, the entries are sorted by the last visit time in descending
  order. We use [`--scheme history`](/fzf/reference/#--schemescheme) to give
  more weight to this ordering.
* If you don't want to keep fzf open after you press enter or CTRL-Y, change
  `execute-silent(...)+deselect-all` to `enter:become(...)`.
{{< /notice >}}
