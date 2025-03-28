---
title: Reference
weight: 100
---

# fzf

fzf is an interactive filter program for any kind of list.

It implements a "fuzzy" matching algorithm, so you can quickly type in
patterns with omitted characters and still get the results you want.

## SEARCH

{{< notice >}}
Most long options have the opposite version with `--no-` prefix.
{{< /notice >}}

### `-x`, `--extended`

Extended-search mode. Enabled by default. You can disable it with `+x` or
`--no-extended`.

### `-e`, `--exact`

Enable exact-match

### `-i`, `--ignore-case`

Case-insensitive match (default: smart-case match)

### `+i`, `--no-ignore-case`

Case-sensitive match

### `--smart-case`

Smart-case match (default). In this mode, the search is case-insensitive by
default, but it becomes case-sensitive if the query contains any uppercase
letters.

### `--literal`

Do not normalize latin script letters for matching.

### `--scheme=SCHEME`

Choose scoring scheme tailored for different types of input.

| Scheme | Description |
| ---    | :---        |
| `default` | Generic scoring scheme designed to work well with any type of input. |
| `path` | Additional bonus point is only given to the characters after path separator. You might want to choose this scheme over `default` if you have many files with spaces in their paths. This also sets `--tiebreak=pathname,length`, to prioritize matches occurring in the tail element of a file path. |
| `history` | Scoring scheme well suited for command history or any input where chronological ordering is important. No additional bonus points are given so that we give more weight to the chronological ordering. This also sets `--tiebreak=index`. |

fzf chooses `path` scheme when the input is a TTY device, where fzf would
start its built-in walker or run `$FZF_DEFAULT_COMMAND`, and there is no
`reload` or `transform` action bound to `start` event. Otherwise, it chooses
`default` scheme.

### `--algo=TYPE`

Fuzzy matching algorithm (default: `v2`)

| Type | Description                                                        |
| ---  | :---                                                               |
| `v2` | Optimal scoring algorithm (quality)                                |
| `v1` | Faster but not guaranteed to find the optimal result (performance) |

### `-n`, `--nth=N[,..]`

Comma-separated list of field index expressions for limiting search scope. See
[field index expression](#field-index-expression) for the details. When you
use this option with `--with-nth`, the field index expressions are calculated
against the transformed lines (unlike in `--preview` where fields are
extracted from the original lines) because fzf doesn't allow searching against
the hidden fields.

### `--with-nth=N[,..] or TEMPLATE`

Transform the presentation of each line using the field index expressions.
For advanced transformation, you can provide a template containing field index
expressions in curly braces. When you use a template, the trailing delimiter
is stripped from each expression, giving you more control over the output.
`{n}` in template evaluates to the zero-based ordinal index of the line.

```sh
# Single expression: drop the first field
echo foo bar baz | fzf --with-nth 2..

# Use template to rearrange fields
echo foo,bar,baz | fzf --delimiter , --with-nth '{n},{1},{3},{2},{1..2}'
```

### `--accept-nth=N[,..] or TEMPLATE`

Define which fields to print on accept. The last delimiter is stripped from
the output. For advanced transformation, you can provide a template containing
field index expressions in curly braces. When you use a template, the trailing
delimiter is stripped from each expression, giving you more control over the
output. `{n}` in template evaluates to the zero-based ordinal index of the
line.


```sh
# Single expression
echo foo bar baz | fzf --accept-nth 2

# Template
echo foo bar baz | fzf --accept-nth 'Index: {n}, 1st: {1}, 2nd: {2}, 3rd: {3}'
```

### `-d`, `--delimiter=STR`

Field delimiter regex for `--nth`, `--with-nth`, and field index expressions
(default: AWK-style)

### `+s`, `--no-sort`

Do not sort the result

### `--tail=NUM`

Maximum number of items to keep in memory. This is useful when you want to
browse an endless stream of data (e.g. log stream) with fzf while limiting
memory usage.

```bash
# Interactive filtering of a log stream
tail -f *.log | fzf --tail 100000 --tac --no-sort --exact
```

### `--disabled`

Do not perform search. With this option, fzf becomes a simple selector
interface rather than a "fuzzy finder". You can later enable the search
using `enable-search` or `toggle-search` action.

### `--tiebreak=CRI[,..]`

Comma-separated list of sort criteria to apply when the scores are tied.

| Criterion  | Description                                                        |
| ---        | ---                                                                |
| `length`   | Prefers line with shorter length                                   |
| `chunk`    | Prefers line with shorter matched chunk (delimited by whitespaces) |
| `begin`    | Prefers line with matched substring closer to the beginning        |
| `end`      | Prefers line with matched substring closer to the end              |
| `pathname` | Prefers line with matched substring in the tail element of a path  |
| `index`    | Prefers line that appeared earlier in the input stream             |

- Each criterion should appear only once in the list
- `index` is only allowed at the end of the list
- `index` is implicitly appended to the list when not specified
- Default is `length` (or equivalently `length,index`)
- If `end` is found in the list, fzf will scan each line backwards

## INPUT/OUTPUT

### `--read0`

Read input delimited by ASCII NUL characters instead of newline characters

### `--print0`

### `--ansi`
Enable processing of ANSI color codes

### `--sync`

Synchronous search for multi-staged filtering. If specified, fzf will launch
the finder only after the input stream is complete and the initial filtering
and the associated actions (bound to any of `start`, `load`, `result`, or
`focus`) are complete.

```bash
# Avoid rendering both fzf instances at the same time
fzf --multi | fzf --sync

# fzf will not render intermediate states
(sleep 1; seq 1000000; sleep 1) |
  fzf --sync --query 5 --listen --bind start:up,load:up,result:up,focus:change-header:Ready
```

## GLOBAL STYLE

### `--style=PRESET`

Apply a style preset `[default|minimal|full[:BORDER_STYLE]]`

### `--color=EXPR`

> `[BASE_SCHEME][,COLOR_NAME[:ANSI_COLOR][:ANSI_ATTRIBUTES]]...`

Color configuration. The name of the base color scheme is followed by custom
color mappings.

#### Base scheme

(default: `dark` on 256-color terminal, otherwise `16`; If `NO_COLOR` is set, `bw`)

| Scheme  | Description                               |
| ---     | ---                                       |
| `dark`  | Color scheme for dark 256-color terminal  |
| `light` | Color scheme for light 256-color terminal |
| `16`    | Color scheme for 16-color terminal        |
| `bw`    | No colors (equivalent to `--no-color`)    |

#### Color names

* `fg`                     --- Text
  * `list-fg`              --- Text in the list section
    * `selected-fg`        --- Selected line text
  * `preview-fg`           --- Preview window text
* `bg`                     --- Background
  * `list-bg`              --- List section background
    * `selected-bg`        --- Selected line background
  * `preview-bg`           --- Preview window background
  * `input-bg`             --- Input section background
  * `header-bg`            --- Header section background
* `hl`                     --- Highlighted substrings
  * `selected-hl`          --- Highlighted substrings in the selected line
* `current-fg` (`fg+`)     --- Text (current line)
* `current-bg` (`bg+`)     --- Background (current line)
  * `gutter`               --- Gutter on the left
* `current-hl` (`hl+`)     --- Highlighted substrings (current line)
* `query` (`input-fg`)     --- Query string
  * `disabled`             --- Query string when search is disabled (`--disabled`)
* `info`                   --- Info line (match counters)
* `border`                 --- Border around the window (`--border` and `--preview`)
  * `list-border`          --- Scrollbar
    * `scrollbar`          --- Scrollbar
    * `separator`          --- Horizontal separator on info line
    * `gap-line`           --- Horizontal line on each gap
  * `preview-border`       --- Border around the preview window (`--preview`)
    * `preview-scrollbar`  --- Scrollbar
  * `input-border`         --- Border around the input section (`--input-border`)
  * `header-border`        --- Border around the header section (`--header-border`)
* `label`                  --- Border label (`--border-label`, `--list-label`, `--input-label`, and `--preview-label`)
  * `list-label`           --- Border label of the list section (`--list-label`)
  * `preview-label`        --- Border label of the preview window (`--preview-label`)
  * `input-label`          --- Border label of the input section (`--input-label`)
  * `header-label`         --- Border label of the header section (`--header-label`)
* `prompt`                 --- Prompt
* `pointer`                --- Pointer to the current line
* `marker`                 --- Multi-select marker
* `spinner`                --- Streaming input indicator
* `header` (`header-fg`)   --- Header

#### ANSI colors

* `-1`          --- Default terminal foreground/background color (or the original color of the text)
* 0 ~ 15      --- 16 base colors
  * `black`
  * `red`
  * `green`
  * `yellow`
  * `blue`
  * `magenta`
  * `cyan`
  * `white`
  * `bright-black` (`gray` | `grey`)
  * `bright-red`
  * `bright-green`
  * `bright-yellow`
  * `bright-blue`
  * `bright-magenta`
  * `bright-cyan`
  * `bright-white`
* 16 ~ 255 --- ANSI 256 colors
* `#rrggbb` --- 24-bit colors

#### ANSI ATTRIBUTES

(Only applies to foreground colors)

* `regular` --- Clears previously set attributes; should precede the other ones
* `bold`
* `underline`
* `reverse`
* `dim`
* `italic`
* `strikethrough`

#### EXAMPLES

```bash
# Seoul256 theme with 8-bit colors
# (https://github.com/junegunn/seoul256.vim)
fzf --color='bg:237,bg+:236,info:143,border:240,spinner:108' \
    --color='hl:65,fg:252,header:65,fg+:252' \
    --color='pointer:161,marker:168,prompt:110,hl+:108'

# Seoul256 theme with 24-bit colors
fzf --color='bg:#4B4B4B,bg+:#3F3F3F,info:#BDBB72,border:#6B6B6B,spinner:#98BC99' \
    --color='hl:#719872,fg:#D9D9D9,header:#719872,fg+:#D9D9D9' \
    --color='pointer:#E12672,marker:#E17899,prompt:#98BEDE,hl+:#98BC99'
```

### `--no-color`

Disable colors

### `--no-bold`
Do not use bold text

### `--black`
Use black background

## DISPLAY MODE

### `--height=EXPR`

> `=[~]HEIGHT[%]`

Display fzf window below the cursor with the given height instead of using
the full screen.

If a negative value is specified, the height is calculated as the terminal
height minus the given value.

```bash
fzf --height=-1
```

When prefixed with `~`, fzf will automatically determine the height in the
range according to the input size.

```bash
# Will not take up 100% of the screen
seq 5 | fzf --height=~100%
```

Adaptive height has the following limitations:

* Cannot be used with top/bottom margin and padding given in percent size
* Negative value is not allowed
* It will not find the right size when there are multi-line items

### `--min-height=HEIGHT`

Minimum height when `--height` is given as a percentage. Add `+` to
automatically increase the value according to the other layout options so that
the specified number of items are visible in the list section (default:
`10+`). Ignored when `--height` is not specified or set as an absolute value.

### `--tmux[=EXPR]`

> `[center|top|bottom|left|right][,SIZE[%]][,SIZE[%]][,border-native]]`

Start fzf in a tmux popup (default `center,50%`). Requires tmux 3.3 or later.
This option is ignored if you are not running fzf inside tmux.

```bash
# Popup in the center with 70% width and height
fzf --tmux 70%

# Popup on the left with 40% width and 100% height
fzf --tmux right,40%

# Popup on the bottom with 100% width and 30% height
fzf --tmux bottom,30%

# Popup on the top with 80% width and 40% height
fzf --tmux top,80%,40%

# Popup with a native tmux border in the center with 80% width and height
fzf --tmux center,80%,border-native
```

## LAYOUT

### `--layout=LAYOUT`

Choose the layout (default: `default`)

| Layout        | Description |
| ---           | ---         |
| `default`     | Display from the bottom of the screen |
| `reverse`     | Display from the top of the screen |
| `reverse-list`| Display from the top of the screen, prompt at the bottom |

### `--reverse`

A synonym for `--layout=reverse`

### `--margin=MARGIN`

Comma-separated expression for margins around the finder.

| Expression | Description                                  |
| ---        | ---                                          |
| `TRBL`       | Same margin for top, right, bottom, and left |
| `TB,RL`      | Vertical, horizontal margin                  |
| `T,RL,B`     | Top, horizontal, bottom margin               |
| `T,R,B,L`    | Top, right, bottom, left margin              |

Each part can be given in absolute number or in percentage relative to the
terminal size with `%` suffix.

```bash
fzf --margin 10%
fzf --margin 1,5%
```

### `--padding=PADDING`

Comma-separated expression for padding inside the border. Padding is
distinguishable from margin only when `--border` option is used.

```bash
fzf --margin 5% --padding 5% --border --preview 'cat {}' \
    --color bg:#222222,preview-bg:#333333
```

| Expression | Description                                   |
| ---        | ---                                           |
| `TRBL`       | Same padding for top, right, bottom, and left |
| `TB,RL`      | Vertical, horizontal padding                  |
| `T,RL,B`     | Top, horizontal, bottom padding               |
| `T,R,B,L`    | Top, right, bottom, left padding              |

### `--border[=STYLE]`

Draw border around the finder

| Option       | Description                                                                   |
| ---          | ---                                                                           |
| `rounded`    | Border with rounded corners (default)                                         |
| `sharp`      | Border with sharp corners                                                     |
| `bold`       | Border with bold lines                                                        |
| `double`     | Border with double lines                                                      |
| `block`      | Border using block elements; suitable when using different background colors  |
| `thinblock`  | Border using legacy computing symbols; may not be displayed on some terminals |
| `horizontal` | Horizontal lines above and below the finder                                   |
| `vertical`   | Vertical lines on each side of the finder                                     |
| `top`        | Border only on the top (`up`)                                                 |
| `bottom`     | Border only on the bottom (`down`)                                            |
| `left`       | Border only on the left                                                       |
| `right`      | Border only on the right                                                      |
| `none`       | No border                                                                     |


If you use a terminal emulator where each box-drawing character takes
2 columns, try setting `--ambidouble`. If the border is still not properly
rendered, set `--no-unicode`.

### `--border-label=LABEL`

Label to print on the horizontal border line. Should be used with one of the
following `--border` options.

* `rounded`
* `sharp`
* `bold`
* `double`
* `horizontal`
* `top` (`up`)
* `bottom` (`down`)

```bash
# ANSI color codes are supported
# (with https://github.com/busyloop/lolcat)
label=$(curl -s http://metaphorpsum.com/sentences/1 | lolcat -f)

# Border label at the center
fzf --height=10 --border --border-label="╢ $label ╟" --color=label:italic:black

# Left-aligned (positive integer)
fzf --height=10 --border --border-label="╢ $label ╟" --border-label-pos=3 --color=label:italic:black

# Right-aligned (negative integer) on the bottom line (:bottom)
fzf --height=10 --border --border-label="╢ $label ╟" --border-label-pos=-3:bottom --color=label:italic:black
```

### `--border-label-pos=EXPR`

> `N[:top|bottom]`

Position of the border label on the border line. Specify a positive integer as
the column position from the left. Specify a negative integer to right-align
the label. Label is printed on the top border line by default, add `:bottom`
to put it on the border line on the bottom. The default value `0` (or
`center`) will put the label at the center of the border line.

## LIST SECTION

### `-m`, `--multi`
Enable multi-select with tab/shift-tab. It optionally takes an integer argument
which denotes the maximum number of items that can be selected.

### `+m`, `--no-multi`
Disable multi-select

### `--highlight-line`
Highlight the whole current line

### `--cycle`

Enable cyclic scroll

### `--wrap`

Enable line wrap

### `--wrap-sign=INDICATOR`

Indicator for wrapped lines. The default is `↳ ` or `> ` depending on
`--no-unicode`.

### `--no-multi-line`

Disable multi-line display of items when using `--read0`

### `--track`
Make fzf track the current selection when the result list is updated.
This can be useful when browsing logs using fzf with sorting disabled. It is
not recommended to use this option with `--tac` as the resulting behavior
can be confusing. Also, consider using `track` action instead of this
option.

```bash
git log --oneline --graph --color=always | nl |
    fzf --ansi --track --no-sort --layout=reverse-list
```

### `--tac`
Reverse the order of the input

```bash
history | fzf --tac --no-sort
```

### `--gap[=N]`

Render empty lines between each item

### `--keep-right`

Keep the right end of the line visible when it's too long. Effective only when
the query string is empty.

### `--scroll-off=LINES`

Number of screen lines to keep above or below when scrolling to the top or to
the bottom (default: 3).

### `--no-hscroll`

Disable horizontal scroll

### `--hscroll-off=COLS`

Number of screen columns to keep to the right of the highlighted substring
(default: 10). Setting it to a large value will cause the text to be positioned
on the center of the screen.

### `--jump-labels=CHARS`

Label characters for `jump` mode.

### `--pointer=STR`
Pointer to the current line (default: `▌` or `>` depending on `--no-unicode`)

### `--marker=STR`
Multi-select marker (default: `┃` or `>` depending on `--no-unicode`)

### `--marker-multi-line=STR`
Multi-select marker for multi-line entries. 3 elements for top, middle, and bottom.
(default: `╻┃╹` or `.|'` depending on `--no-unicode`)

### `--ellipsis=STR`
Ellipsis to show when line is truncated (default: '..')

### `--tabstop=" SPACES
Number of spaces for a tab character (default: 8)

### `--scrollbar=CHAR1[CHAR2]`

Use the given character to render scrollbar. (default: `│` or `:` depending on
`--no-unicode`). The optional `CHAR2` is used to render scrollbar of
the preview window.

### `--no-scrollbar`
Do not display scrollbar. A synonym for `--scrollbar=''`

### `--list-border[=STYLE]`

Draw border around the list section

### `--list-label=LABEL`

Label to print on the list border

### `--list-label-pos=EXPR`

> `N[:top|bottom]`

Position of the list label

## INPUT SECTION

### `--no-input`

Disable and hide the input section. You can no longer type in queries. To
trigger a search, use `search` action. You can later show the input section
using `show-input` or `toggle-input` action, and hide it again using
`hide-input`, or `toggle-input`.

### `--prompt=STR`
Input prompt (default: `> `)

### `--info=STYLE`

Determines the display style of the finder info. (e.g. match counter, loading
indicator, etc.)

| Style                 | Description                                              |
| ---                   | ---                                                      |
| `default`             | On the left end of the horizontal separator              |
| `right`               | On the right end of the horizontal separator             |
| `hidden`              | Do not display finder info                               |
| `inline`              | After the prompt with the default prefix ` < `           |
| `inline:PREFIX`       | After the prompt with a non-default prefix               |
| `inline-right`        | On the right end of the prompt line                      |
| `inline-right:PREFIX` | On the right end of the prompt line with a custom prefix |

### `--info-command=COMMAND`

Command to generate the finder info line. The command runs synchronously and
blocks the UI until completion, so make sure that it's fast. ANSI color codes
are supported. `$FZF_INFO` variable is set to the original info text.
For additional environment variables available to the command, see the section
[Environment variables exported to child processes](#environment-variables-exported-to-child-processes).

```sh
# Prepend the current cursor position in yellow
fzf --info-command='echo -e "\x1b[33;1m$FZF_POS\x1b[m/$FZF_INFO 💛"'
```

### `--no-info`

A synonym for `--info=hidden`

### `--separator=STR`

The given string will be repeated to form the horizontal separator on the info
line (default: `─` or `-` depending on `--no-unicode`).

ANSI color codes are supported.

### `--no-separator`

Do not display horizontal separator on the info line. A synonym for
`--separator=''`

### `--ghost=TEXT`

Ghost text to display when the input is empty

### `--filepath-word`

Make word-wise movements and actions respect path separators. The following
actions are affected:

* `backward-kill-word`
* `backward-word`
* `forward-word`
* `kill-word`

### `--input-border[=STYLE]`

Draw border around the input section

### `--input-label=LABEL`

Label to print on the input border

### `--input-label-pos=EXPR`

> `N[:top|bottom]`

Position of the input label

## PREVIEW WINDOW

### `--preview=COMMAND`
Execute the given command for the current line and display the result on the
preview window. `{}` in the command is the placeholder that is replaced to
the single-quoted string of the current line. To transform the replacement
string, specify field index expressions between the braces (See [field index
expression](#field-index-expression) for the details).

```bash
fzf --preview='head -$LINES {}'
ls -l | fzf --preview="echo user={3} when={-4..-2}; cat {-1}" --header-lines=1
```

fzf exports `$FZF_PREVIEW_LINES` and `$FZF_PREVIEW_COLUMNS` so that
they represent the exact size of the preview window. (It also overrides
`$LINES` and `$COLUMNS` with the same values but they can be reset
by the default shell, so prefer to refer to the ones with `FZF_PREVIEW_`
prefix.)

fzf also exports `$FZF_PREVIEW_TOP` and `$FZF_PREVIEW_LEFT` so that
the preview command can determine the position of the preview window.

A placeholder expression starting with `+` flag will be replaced to the
space-separated list of the selected lines (or the current line if no selection
was made) individually quoted.

```bash
fzf --multi --preview='head -10 {+}'
git log --oneline | fzf --multi --preview 'git show {+1}'
```

When using a field index expression, leading and trailing whitespace is stripped
from the replacement string. To preserve the whitespace, use the `s` flag.

A placeholder expression with `f` flag is replaced to the path of
a temporary file that holds the evaluated list. This is useful when you
multi-select a large number of items and the length of the evaluated string may
exceed `ARG_MAX`.

```bash
# Press CTRL-A to select 100K items and see the sum of all the numbers.
# This won't work properly without 'f' flag due to ARG_MAX limit.
seq 100000 | fzf --multi --bind ctrl-a:select-all \
                 --preview "awk '{sum+=\$1} END {print sum}' {+f}"
```

Also,

* `{q}` is replaced to the current query string
* `{q}` can contain field index expressions. e.g. `{q:1}`, `{q:2..}`, etc.
* `{n}` is replaced to the zero-based ordinal index of the current item.
  Use `{+n}` if you want all index numbers when multiple lines are selected.


Note that you can escape a placeholder pattern by prepending a backslash.

Preview window will be updated even when there is no match for the current
query if any of the placeholder expressions evaluates to a non-empty string
or `{q}` is in the command template.

Since 0.24.0, fzf can render partial preview content before the preview command
completes. ANSI escape sequence for clearing the display (`CSI 2 J`) is
supported, so you can use it to implement preview window that is constantly
updating.

```bash
fzf --preview 'for i in $(seq 100000); do
  (( i % 200 == 0 )) && printf "\\033[2J"
  echo "$i"
  sleep 0.01
done'
```

fzf has experimental support for Kitty graphics protocol and Sixel graphics.
The following example uses https://github.com/junegunn/fzf/blob/master/bin/fzf-preview.sh
script to render an image using either of the protocols inside the preview window.

```bash
fzf --preview='fzf-preview.sh {}'
```

### `--preview-border=STYLE`
Short for `--preview-window=border-STYLE`

### `--preview-label=LABEL`
Label to print on the horizontal border line of the preview window.
Should be used with one of the following `--preview-window` options.

* `border-rounded` (default on non-Windows platforms)
* `border-sharp` (default on Windows)
* `border-bold`
* `border-double`
* `border-block`
* `border-thinblock`
* `border-horizontal`
* `border-top`
* `border-bottom`

### `--preview-label-pos=EXPR`

> `N[:top|bottom]`

Position of the border label on the border line of the preview window. Specify
a positive integer as the column position from the left. Specify a negative
integer to right-align the label. Label is printed on the top border line by
default, add `:bottom` to put it on the border line on the bottom. The
default value 0 (or `center`) will put the label at the center of the
border line.

### `--preview-window=EXPR`

> ```
> [POSITION][,SIZE[%]][,border-BORDER_OPT][,[no]wrap][,[no]follow][,[no]cycle]
> [,[no]hidden][,+SCROLL[OFFSETS][/DENOM]][,~HEADER_LINES][,default]
> [,<SIZE_THRESHOLD(ALTERNATIVE_LAYOUT)]"
> ```

* POSITION (default: `right`)
    * `up`
    * `down`
    * `left`
    * `right`

Determines the layout of the preview window.

* If the argument contains `:hidden`, the preview window will be hidden by
  default until `toggle-preview` action is triggered.
* If size is given as 0, preview window will not be visible, but fzf will
  still execute the command in the background.
* Long lines are truncated by default. Line wrap can be enabled with `wrap`
  flag.
* Preview window will automatically scroll to the bottom when `follow` flag is
  set, similarly to how `tail -f` works.
  ```bash
  fzf --preview-window follow --preview 'for i in $(seq 100000); do
    echo "$i"
    sleep 0.01
    (( i % 300 == 0 )) && printf "\\033[2J"
  done
  ```
* Cyclic scrolling is enabled with `cycle` flag.
* To hide the scroll offset information on the top right corner, specify `noinfo`.
* To change the style of the border of the preview window, specify one of the
  options for `--border` with `border-` prefix. e.g. `border-rounded` (border
  with rounded edges, default), `border-sharp` (border with sharp edges),
  `border-left`, `border-none`, etc.
* `[:+SCROLL[OFFSETS][/DENOM]]` determines the initial scroll offset of the
  preview window.
  * `SCROLL` can be either a numeric integer or a single-field index
    expression that refers to a numeric integer or `{n}` to refer to the
    zero-based ordinal index of the current item.
  * The optional `OFFSETS` part is for adjusting the base offset. It should be
    given as a series of signed integers (`-INTEGER` or `+INTEGER`).
  * The final `/DENOM` part is for specifying a fraction of the preview window
    height.
* `~HEADER_LINES` keeps the top N lines as the fixed header so that they are
  always visible.
* `default` resets all options previously set to the default.

```bash
# Non-default scroll window positions and sizes
fzf --preview="head {}" --preview-window=up,30%
fzf --preview="file {}" --preview-window=down,1

# Initial scroll offset is set to the line number of each line of
# git grep output *minus* 5 lines (-5)
git grep --line-number '' |
  fzf --delimiter : --preview 'nl {1}' --preview-window '+{2}-5'

# Preview with bat, matching line in the middle of the window below
# the fixed header of the top 3 lines
#
#   ~3    Top 3 lines as the fixed header
#   +{2}  Base scroll offset extracted from the second field
#   +3    Extra offset to compensate for the 3-line header
#   /2    Put in the middle of the preview area
#
git grep --line-number '' |
  fzf --delimiter : \
      --preview 'bat --style=full --color=always --highlight-line {2} {1}' \
      --preview-window '~3,+{2}+3/2'

# Display top 3 lines as the fixed header
fzf --preview 'bat --style=full --color=always {}' --preview-window '~3'
```

* You can specify an alternative set of options that are used only when the size
  of the preview window is below a certain threshold. Note that only one
  alternative layout is allowed.

```bash
fzf --preview 'cat {}' --preview-window 'right,border-left,<30(up,30%,border-bottom)'
```

## HEADER

### `--header=STR`
The given string will be printed as the sticky header. The lines are displayed
in the given order from top to bottom regardless of `--layout` option, and
are not affected by `--with-nth`. ANSI color codes are processed even when
`--ansi` is not set.

### `--header-lines=N`
The first N lines of the input are treated as the sticky header. When
`--with-nth` is set, the lines are transformed just like the other
lines that follow.

### `--header-first`
Print header before the prompt line

### `--header-border[=STYLE]`

Draw border around the header section

### `--header-label=LABEL`

Label to print on the header border

### `--header-label-pos=EXPR`

> `N[:top|bottom]`

Position of the header label

### `--header-lines-border[=STYLE]`

Display header from `--header-lines` with a separate border. Pass
`none` to still separate the header lines but without a border. To combine
two headers, use `--no-header-lines-border`.

## SCRIPTING

### `-q`, `--query=STR`

Start the finder with the given query

### `-1`, `--select-1`

If there is only one match for the initial query (`--query`), do not start
interactive finder and automatically select the only match

### `-0`, `--exit-0`

If there is no match for the initial query (`--query`), do not start
interactive finder and exit immediately

### `-f`, `--filter=STR`

Filter mode. Do not start interactive finder. When used with `--no-sort`,
fzf becomes a fuzzy-version of grep.

### `--print-query`

Print query as the first line

### `--expect=KEY[,..]`

Comma-separated list of keys that can be used to complete fzf in addition to
the default enter key. When this option is set, fzf will print the name of the
key pressed as the first line of its output (or as the second line if
`--print-query` is also used). The line will be empty if fzf is completed with
the default enter key. If `--expect` option is specified multiple times, fzf
will expect the union of the keys. `--no-expect` will clear the list.

```bash
fzf --expect=ctrl-v,ctrl-t,alt-s --expect=f1,f2,~,@
```

This option is not compatible with `--bind` on the same key and will take
precedence over it. To combine the two, use `print` action.

```bash
fzf --multi --bind 'enter:print()+accept,ctrl-y:select-all+print(ctrl-y)+accept'
```

Print output delimited by ASCII NUL characters instead of newline characters

### `--no-clear`

Do not clear finder interface on exit. If fzf was started in full screen mode,
it will not switch back to the original screen, so you'll have to manually run
`tput rmcup` to return. This option can be used to avoid flickering of the
screen when your application needs to start fzf multiple times in order. (Note
that in most cases, it is preferable to use `reload` action instead.)

```bash
foo=$(seq 100 | fzf --no-clear) || (
  # Need to manually switch back to the main screen when cancelled
  tput rmcup
  exit 1
) && seq "$foo" 100 | fzf
```

## KEY/EVENT BINDING

### `--bind=BINDINGS`

Comma-separated list of custom key bindings. See [Key/event
bindings](#keyevent-bindings) for the details.

## ADVANCED

### `--with-shell=STR`

Shell command and flags to start child processes with. On *nix Systems, the
default value is `$SHELL -c` if `$SHELL` is set, otherwise `sh -c`.
On Windows, the default value is `cmd /s/c` when `$SHELL` is not
set.

```bash
gem list | fzf --with-shell 'ruby -e' --preview 'pp Gem::Specification.find_by_name({1})'
```

### `--listen[=[ADDR:]PORT]`, `--listen-unsafe[=[ADDR:]PORT]`

Start HTTP server and listen on the given address. It allows external processes
to send actions to perform via POST method.

- If the port number is omitted or given as 0, fzf will automatically choose
a port and export it as `FZF_PORT` environment variable to the child processes
- If `FZF_API_KEY` environment variable is set, the server would require
sending an API key with the same value in the `x-api-key` HTTP header
- `FZF_API_KEY` is required for a non-localhost listen address
- To allow remote process execution, use `--listen-unsafe`

```bash
# Start HTTP server on port 6266
fzf --listen 6266

# Send action to the server
curl -XPOST localhost:6266 -d 'reload(seq 100)+change-prompt(hundred> )'

# Get program state in JSON format (experimental)
# * Make sure NOT to access this endpoint from execute/transform actions
#   as it will result in a timeout
curl localhost:6266

# Start HTTP server on port 6266 with remote connections allowed
# * Listening on non-localhost address requires using an API key
export FZF_API_KEY="$(head -c 32 /dev/urandom | base64)"
fzf --listen 0.0.0.0:6266

# Send an authenticated action
curl -XPOST localhost:6266 -H "x-api-key: $FZF_API_KEY" -d 'change-query(yo)'

# Choose port automatically and export it as $FZF_PORT to the child process
fzf --listen --bind 'start:execute-silent:echo $FZF_PORT > /tmp/fzf-port'
```

## DIRECTORY TRAVERSAL

### `--walker=EXPR`

> `[file][,dir][,follow][,hidden]`

Determines the behavior of the built-in directory walker that is used when
`$FZF_DEFAULT_COMMAND` is not set. The default value is `file,follow,hidden`.

* `file` --- Include files in the search result
* `dir` --- Include directories in the search result
* `hidden` --- Include and follow hidden directories
* `follow` --- Follow symbolic links


### `--walker-root=DIR [...]`

List of directory names to start the built-in directory walker.
The default value is the current working directory.

### `--walker-skip=DIRS`

Comma-separated list of directory names to skip during the directory walk.
The default value is `.git,node_modules`.

## HISTORY

### `--history=HISTORY_FILE`

Load search history from the specified file and update the file on completion.
When enabled, `CTRL-N` and `CTRL-P` are automatically remapped to
`next-history` and `prev-history`.

### `--history-size=N`
Maximum number of entries in the history file (default: 1000). The file is
automatically truncated when the number of the lines exceeds the value.

## SHELL INTEGRATION

### `--bash`

Print script to set up Bash shell integration

```bash
eval "$(fzf --bash)"
```

### `--zsh`

Print script to set up Zsh shell integration

```zsh
source <(fzf --zsh)
```

### `--fish`

Print script to set up Fish shell integration

```fish
fzf --fish | source
```

## OTHERS

### `--no-mouse`
Disable mouse

### `--no-unicode`

Use ASCII characters instead of Unicode drawing characters to draw borders,
the spinner and the horizontal separator.

### `--ambidouble`

Set this option if your terminal displays ambiguous width characters (e.g.
box-drawing characters for borders) as 2 columns.

## HELP

### `--version`
Display version information and exit

### `--help`
Show help message

### `--man`
Show man page

## ENVIRONMENT VARIABLES

### `FZF_DEFAULT_COMMAND`

Default command to use when input is tty. On *nix systems, fzf runs the command
with `$SHELL -c` if `SHELL` is set, otherwise with `sh -c`, so in
this case make sure that the command is POSIX-compliant.

### `FZF_DEFAULT_OPTS`

Default options.

```bash
export FZF_DEFAULT_OPTS="--layout=reverse --border --cycle"
```

### `FZF_DEFAULT_OPTS_FILE`

The location of the file that contains the default options.

```bash
export FZF_DEFAULT_OPTS_FILE=~/.fzfrc
```

### `FZF_API_KEY`

Can be used to require an API key when using `--listen` option. If not set,
no authentication will be required by the server. You can set this value if
you need to protect against DNS rebinding and privilege escalation attacks.

## Exit status

| Code | Description                                  |
| ---  | ---                                          |
| 0    | Normal exit                                  |
| 1    | No match                                     |
| 2    | Error                                        |
| 126  | Permission denied error from `become` action |
| 127  | Invalid shell command for `become` action    |
| 130  | Interrupted with `CTRL-C` or `ESC`           |

## Field index expression

A field index expression can be a non-zero integer or a range expression
(`[BEGIN]..[END]`). `--nth` and `--with-nth` take a comma-separated list
of field index expressions.

### Examples

| Expression | Description                                     |
| ---        | ---                                             |
| `1`        | The 1st field                                   |
| `2`        | The 2nd field                                   |
| `-1`       | The last field                                  |
| `-2`       | The 2nd to last field                           |
| `3..5`     | From the 3rd field to the 5th field             |
| `2..`      | From the 2nd field to the last field            |
| `..-3`     | From the 1st field to the 3rd to the last field |
| `..`       | All the fields                                  |

## Environment variables exported to child processes

fzf exports the following environment variables to its child processes.

| Variable              | Description                                                 |
| ---                   | ---                                                         |
| `FZF_LINES`           | Number of lines fzf takes up excluding padding and margin   |
| `FZF_COLUMNS`         | Number of columns fzf takes up excluding padding and margin |
| `FZF_TOTAL_COUNT`     | Total number of items                                       |
| `FZF_MATCH_COUNT`     | Number of matched items                                     |
| `FZF_SELECT_COUNT`    | Number of selected items                                    |
| `FZF_POS`             | Vertical position of the cursor in the list starting from 1 |
| `FZF_QUERY`           | Current query string                                        |
| `FZF_NTH`             | Current `--nth` option                                      |
| `FZF_PROMPT`          | Prompt string                                               |
| `FZF_PREVIEW_LABEL`   | Preview label string                                        |
| `FZF_BORDER_LABEL`    | Border label string                                         |
| `FZF_ACTION`          | The name of the last action performed                       |
| `FZF_KEY`             | The name of the last key pressed                            |
| `FZF_PORT`            | Port number when --listen option is used                    |
| `FZF_PREVIEW_TOP`     | Top position of the preview window                          |
| `FZF_PREVIEW_LEFT`    | Left position of the preview window                         |
| `FZF_PREVIEW_LINES`   | Number of lines in the preview window                       |
| `FZF_PREVIEW_COLUMNS` | Number of columns in the preview window                     |

## Extended search mode

Unless specified otherwise, fzf will start in "extended-search mode". In this
mode, you can specify multiple patterns delimited by spaces, such as: `'wild
^music .mp3$ sbtrkt !rmx`

You can prepend a backslash to a space (`\ `) to match a literal space
character.

### Exact-match (quoted)

A term that is prefixed by a single-quote character (`'`) is interpreted as
an "exact-match" (or "non-fuzzy") term. fzf will search for the exact
occurrences of the string.

### Anchored-match
A term can be prefixed by `^`, or suffixed by `$` to become an
anchored-match term. Then fzf will search for the lines that start with or end
with the given string. An anchored-match term is also an exact-match term.

### Exact-boundary-match (quoted both ends)
A single-quoted term is interpreted as an "exact-boundary-match". fzf will
search for the exact occurrences of the string with both ends at the word
boundaries. Unlike in regular expressions, this also sees an underscore as
a word boundary. But the words around underscores are ranked lower and appear
later in the result than the other words around the other types of word
boundaries.

1. `xxx foo xxx` (highest score)
2. `xxx foo_xxx`
3. `xxx_foo xxx`
4. `xxx_foo_xxx` (lowest score)

### Negation
If a term is prefixed by `!`, fzf will exclude the lines that satisfy the
term from the result. In this case, fzf performs exact match by default.

### Exact-match by default
If you don't prefer fuzzy matching and do not wish to "quote" (prefixing with
`'`) every word, start fzf with `-e` or `--exact` option. Note that
when `--exact` is set, `'`-prefix "unquotes" the term.

### OR operator
A single bar character term acts as an OR operator. For example, the following
query matches entries that start with `core` and end with either `go`,
`rb`, or `py`.

e.g. `^core go$ | rb$ | py$`

## Key/event bindings

`--bind` option allows you to bind `a key` or `an event` to one or
more `actions`. You can use it to customize key bindings or implement
dynamic behaviors.

`--bind` takes a comma-separated list of binding expressions. Each binding
expression is `KEY:ACTION` or `EVENT:ACTION`. You can bind actions to multiple
keys and events by writing comma-separated list of keys and events before the
colon. e.g. `KEY1,KEY2,EVENT1,EVENT2:ACTION`.

```bash
fzf --bind=ctrl-j:accept,ctrl-k:kill-line

# Load 'ps -ef' output on start and reload it on CTRL-R
fzf --bind 'start,ctrl-r:reload:ps -ef'
```

### Available keys

* `ctrl-[a-z]`
* `ctrl-space`
* `ctrl-delete`
* `ctrl-\`
* `ctrl-]`
* `ctrl-^`         (`ctrl-6`)
* `ctrl-/`         (`ctrl-_`)
* `ctrl-alt-[a-z]`
* `alt-[*]`        (Any case-sensitive single character is allowed)
* `f[1-12]`
* `enter`          (`return`, `ctrl-m`)
* `space`
* `backspace`      (`bspace`, `bs`)
* `alt-up`
* `alt-down`
* `alt-left`
* `alt-right`
* `alt-enter`
* `alt-space`
* `alt-backspace`  (`alt-bspace`, `alt-bs`)
* `tab`
* `shift-tab`      (`btab`)
* `esc`
* `delete`         (`del`)
* `up`
* `down`
* `left`
* `right`
* `home`
* `end`
* `insert`
* `page-up`        (`pgup`)
* `page-down`      (`pgdn`)
* `shift-up`
* `shift-down`
* `shift-left`
* `shift-right`
* `shift-delete`
* `alt-shift-up`
* `alt-shift-down`
* `alt-shift-left`
* `alt-shift-right`
* `left-click`
* `right-click`
* `double-click`
* `scroll-up`
* `scroll-down`
* `preview-scroll-up`
* `preview-scroll-down`
* `shift-left-click`
* `shift-right-click`
* `shift-scroll-up`
* `shift-scroll-down`
* or any single character

### Available events

#### `start`
Triggered only once when fzf finder starts. Since fzf consumes the input stream
asynchronously, the input list is not available unless you use `--sync`.

```bash
# Move cursor to the last item and select all items
seq 1000 | fzf --multi --sync --bind start:last+select-all
```

#### `load`
Triggered when the input stream is complete and the initial processing of the
list is complete.

```bash
# Change the prompt to "loaded" when the input stream is complete
(seq 10; sleep 1; seq 11 20) | fzf --prompt 'Loading> ' --bind 'load:change-prompt:Loaded> '
```

#### `resize`
Triggered when the terminal size is changed.

```bash
fzf --bind 'resize:transform-header:echo Resized: ${FZF_COLUMNS}x${FZF_LINES}'
```

#### `result`
Triggered when the filtering for the current query is complete and the result list is ready.

```bash
# Put the cursor on the second item when the query string is empty
# * Note that you can't use 'change' event in this case because the second position may not be available
fzf --sync --bind 'result:transform:[[ -z {q} ]] && echo "pos(2)"'
```

#### `change`
Triggered whenever the query string is changed

```bash
# Move cursor to the first entry whenever the query is changed
fzf --bind change:first
```

#### `focus`
Triggered when the focus changes due to a vertical cursor movement or a search
result update.

```bash
fzf --bind 'focus:transform-preview-label:echo [ {} ]' --preview 'cat {}'

# Any action bound to the event runs synchronously and thus can make the interface sluggish
# e.g. lolcat isn't one of the fastest programs, and every cursor movement in
#      fzf will be noticeably affected by its execution time
fzf --bind 'focus:transform-preview-label:echo [ {} ] | lolcat -f' --preview 'cat {}'

# Beware not to introduce an infinite loop
seq 10 | fzf --bind 'focus:up' --cycle
```

#### `one`
Triggered when there's only one match. `one:accept` binding is comparable
to `--select-1` option, but the difference is that `--select-1` is only
effective before the interactive finder starts but `one` event is triggered
by the interactive finder.

```bash
# Automatically select the only match
seq 10 | fzf --bind one:accept
```

#### `zero`
Triggered when there's no match. `zero:abort` binding is comparable to
`--exit-0` option, but the difference is that `--exit-0` is only
effective before the interactive finder starts but `zero` event is
triggered by the interactive finder.

```bash
# Reload the candidate list when there's no match
echo $RANDOM | fzf --bind 'zero:reload(echo $RANDOM)+clear-query' --height 3
```

#### `backward-eof`
Triggered when the query string is already empty and you try to delete it
backward.

```bash
fzf --bind backward-eof:abort
```

#### `jump`
Triggered when successfully jumped to the target item in `jump` mode.

```bash
fzf --bind space:jump,jump:accept
```

#### `jump-cancel`
Triggered when `jump` mode is cancelled.

```bash
fzf --bind space:jump,jump:accept,jump-cancel:abort
```

#### `click-header`
Triggered when a mouse click occurs within the header. Sets
`FZF_CLICK_HEADER_LINE` and `FZF_CLICK_HEADER_COLUMN` environment variables
starting from 1. It optionally sets `FZF_CLICK_HEADER_WORD` and
`FZF_CLICK_HEADER_NTH` if clicked on a word.

```bash
printf "head1\nhead2" | fzf --header-lines=2 --bind 'click-header:transform-prompt:printf ${FZF_CLICK_HEADER_LINE}x${FZF_CLICK_HEADER_COLUMN}'
```

## Available actions

A key or an event can be bound to one or more of the following actions.

| Action                         | Default bindings (notes)                                                                     |
| ---                            | ---                                                                                          |
| `abort`                        | `ctrl-c`  `ctrl-g`  `ctrl-q`  `esc`                                                          |
| `accept`                       | `enter`   `double-click`                                                                     |
| `accept-non-empty`             | (same as `accept` except that it prevents fzf from exiting without selection)                |
| `accept-or-print-query`        | (same as `accept` except that it prints the query when there's no match)                     |
| `backward-char`                | `ctrl-b`  `left`                                                                             |
| `backward-delete-char`         | `ctrl-h`  `bspace`                                                                           |
| `backward-delete-char/eof`     | (same as `backward-delete-char` except aborts fzf if query is empty)                         |
| `backward-kill-word`           | `alt-bs`                                                                                     |
| `backward-word`                | `alt-b`   `shift-left`                                                                       |
| `become(...)`                  | (replace fzf process with the specified command; see below for the details)                  |
| `beginning-of-line`            | `ctrl-a`  `home`                                                                             |
| `bell`                         | (ring the terminal bell)                                                                     |
| `change-border-label(...)`     | (change `--border-label` to the given string)                                                |
| `cancel`                       | (clear query string if not empty, abort fzf otherwise)                                       |
| `change-header(...)`           | (change header to the given string; doesn't affect `--header-lines`)                         |
| `change-header-label(...)`     | (change `--header-label` to the given string)                                                |
| `change-input-label(...)`      | (change `--input-label` to the given string)                                                 |
| `change-list-label(...)`       | (change `--list-label` to the given string)                                                  |
| `change-multi`                 | (enable multi-select mode with no limit)                                                     |
| `change-multi(...)`            | (enable multi-select mode with a limit or disable it with 0)                                 |
| `change-nth(...)`              | (change `--nth` option; rotate through the multiple options separated by '|')                |
| `change-pointer(...)`          | (change `--pointer` option)                                                                  |
| `change-preview(...)`          | (change `--preview` option)                                                                  |
| `change-preview-label(...)`    | (change `--preview-label` to the given string)                                               |
| `change-preview-window(...)`   | (change `--preview-window` option; rotate through the multiple option sets separated by '|') |
| `change-prompt(...)`           | (change prompt to the given string)                                                          |
| `change-query(...)`            | (change query string to the given string)                                                    |
| `clear-screen`                 | `ctrl-l`                                                                                     |
| `clear-selection`              | (clear multi-selection)                                                                      |
| `close`                        | (close preview window if open, abort fzf otherwise)                                          |
| `clear-query`                  | (clear query string)                                                                         |
| `delete-char`                  | `del`                                                                                        |
| `delete-char/eof`              | `ctrl-d` (same as `delete-char` except aborts fzf if query is empty)                         |
| `deselect`                     |                                                                                              |
| `deselect-all`                 | (deselect all matches)                                                                       |
| `disable-search`               | (disable search functionality)                                                               |
| `down`                         | `ctrl-j`  `ctrl-n`  `down`                                                                   |
| `enable-search`                | (enable search functionality)                                                                |
| `end-of-line`                  | `ctrl-e`  `end`                                                                              |
| `exclude`                      | (exclude the current item from the result)                                                   |
| `exclude-multi`                | (exclude the selected items or the current item from the result)                             |
| `execute(...)`                 | (see below for the details)                                                                  |
| `execute-silent(...)`          | (see below for the details)                                                                  |
| `first`                        | (move to the first match; same as `pos(1)`)                                                  |
| `forward-char`                 | `ctrl-f`  `right`                                                                            |
| `forward-word`                 | `alt-f`  `shift-right`                                                                       |
| `ignore`                       |                                                                                              |
| `jump`                         | (EasyMotion-like 2-keystroke movement)                                                       |
| `kill-line`                    |                                                                                              |
| `kill-word`                    | `alt-d`                                                                                      |
| `last`                         | (move to the last match; same as `pos(-1)`)                                                  |
| `next-history`                 | (`ctrl-n` on `--history`)                                                                    |
| `next-selected`                | (move to the next selected item)                                                             |
| `page-down`                    | `pgdn`                                                                                       |
| `page-up`                      | `pgup`                                                                                       |
| `half-page-down`               |                                                                                              |
| `half-page-up`                 |                                                                                              |
| `hide-header`                  |                                                                                              |
| `hide-input`                   |                                                                                              |
| `hide-preview`                 |                                                                                              |
| `offset-down`                  | (similar to CTRL-E of Vim)                                                                   |
| `offset-up`                    | (similar to CTRL-Y of Vim)                                                                   |
| `offset-middle`                | (place the current item is in the middle of the screen)                                      |
| `pos(...)`                     | (move cursor to the numeric position; negative number to count from the end)                 |
| `prev-history`                 | (`ctrl-p` on `--history`)                                                                    |
| `prev-selected`                | (move to the previous selected item)                                                         |
| `preview(...)`                 | (see below for the details)                                                                  |
| `preview-down`                 | `shift-down`                                                                                 |
| `preview-up`                   | `shift-up`                                                                                   |
| `preview-page-down`            |                                                                                              |
| `preview-page-up`              |                                                                                              |
| `preview-half-page-down`       |                                                                                              |
| `preview-half-page-up`         |                                                                                              |
| `preview-bottom`               |                                                                                              |
| `preview-top`                  |                                                                                              |
| `print(...)`                   | (add string to the output queue and print on normal exit)                                    |
| `put`                          | (put the character to the prompt)                                                            |
| `put(...)`                     | (put the given string to the prompt)                                                         |
| `refresh-preview`              |                                                                                              |
| `rebind(...)`                  | (rebind bindings after `unbind`)                                                             |
| `reload(...)`                  | (see below for the details)                                                                  |
| `reload-sync(...)`             | (see below for the details)                                                                  |
| `replace-query`                | (replace query string with the current selection)                                            |
| `search`                       | (trigger fzf search with the given string)                                                   |
| `select`                       |                                                                                              |
| `select-all`                   | (select all matches)                                                                         |
| `show-header`                  |                                                                                              |
| `show-input`                   |                                                                                              |
| `show-preview`                 |                                                                                              |
| `toggle`                       | (`right-click`)                                                                              |
| `toggle-all`                   | (toggle all matches)                                                                         |
| `toggle+down`                  | `ctrl-i  (tab)`                                                                              |
| `toggle-header`                |                                                                                              |
| `toggle-input`                 |                                                                                              |
| `toggle-in`                    | (`--layout=reverse*` ? `toggle+up` : `toggle+down`)                                          |
| `toggle-out`                   | (`--layout=reverse*` ? `toggle+down` : `toggle+up`)                                          |
| `toggle-preview`               |                                                                                              |
| `toggle-preview-wrap`          |                                                                                              |
| `toggle-search`                | (toggle search functionality)                                                                |
| `toggle-sort`                  |                                                                                              |
| `toggle-track`                 | (toggle global tracking option (`--track`))                                                  |
| `toggle-track-current`         | (toggle tracking of the current item)                                                        |
| `toggle-wrap`                  | `ctrl-/`  `alt-/`                                                                            |
| `toggle+up`                    | `btab    (shift-tab)`                                                                        |
| `track-current`                | (track the current item; automatically disabled if focus changes)                            |
| `transform(...)`               | (transform states using the output of an external command)                                   |
| `transform-border-label(...)`  | (transform border label using an external command)                                           |
| `transform-header(...)`        | (transform header using an external command)                                                 |
| `transform-header-label(...)`  | (transform header label using an external command)                                           |
| `transform-input-label(...)`   | (transform input label using an external command)                                            |
| `transform-list-label(...)`    | (transform list label using an external command)                                             |
| `transform-nth(...)`           | (transform nth using an external command)                                                    |
| `transform-pointer(...)`       | (transform pointer using an external command)                                                |
| `transform-preview-label(...)` | (transform preview label using an external command)                                          |
| `transform-prompt(...)`        | (transform prompt string using an external command)                                          |
| `transform-query(...)`         | (transform query string using an external command)                                           |
| `transform-search(...)`        | (trigger fzf search with the output of an external command)                                  |
| `unbind(...)`                  | (unbind bindings)                                                                            |
| `unix-line-discard`            | `ctrl-u`                                                                                     |
| `unix-word-rubout`             | `ctrl-w`                                                                                     |
| `untrack-current`              | (stop tracking the current item; no-op if global tracking is enabled)                        |
| `up`                           | `ctrl-k`  `ctrl-p`  `up`                                                                     |
| `yank`                         | `ctrl-y`                                                                                     |

## Action composition

Multiple actions can be chained using `+` separator.

```bash
fzf --multi --bind 'ctrl-a:select-all+accept'
fzf --multi --bind 'ctrl-a:select-all' --bind 'ctrl-a:+accept'
```

Any action after a terminal action that exits fzf, such as `accept` or
`abort`, is ignored.

## Action argument

An action denoted with `(...)` suffix takes an argument.

```bash
fzf --bind 'ctrl-a:change-prompt(NewPrompt> )'
fzf --bind 'ctrl-v:preview(cat {})' --preview-window hidden
```

If the argument contains parentheses, fzf may fail to parse the expression. In
that case, you can use any of the following alternative notations to avoid
parse errors.

* `action-name[...]`
* `action-name{...}`
* `action-name<...>`
* `action-name~...~`
* `action-name!...!`
* `action-name@...@`
* `action-name#...#`
* `action-name$...$`
* `action-name%...%`
* `action-name^...^`
* `action-name&...&`
* `action-name*...*`
* `action-name;...;`
* `action-name/.../`
* `action-name|...|`
* `action-name:...`

The last one is the special form that frees you from parse errors as it does
not expect the closing character. The catch is that it should be the last one
in the comma-separated list of key-action pairs.

## Command execution

With `execute(...)` action, you can execute arbitrary commands without
leaving fzf. For example, you can turn fzf into a simple file browser by
binding `enter` key to `less` command like follows.

```bash
fzf --bind "enter:execute(less {})"
```

You can use the same placeholder expressions as in `--preview`.

fzf switches to the alternate screen when executing a command. However, if the
command is expected to complete quickly, and you are not interested in its
output, you might want to use `execute-silent` instead, which silently
executes the command without the switching. Note that fzf will not be
responsive until the command is complete. For asynchronous execution, start
your command as a background process (i.e. appending `&`).

On *nix systems, fzf runs the command with `$SHELL -c` if `SHELL` is
set, otherwise with `sh -c`, so in this case make sure that the command is
POSIX-compliant.

`become(...)` action is similar to `execute(...)`, but it replaces the
current fzf process with the specified command using `execve(2)` system
call.

```bash
fzf --bind "enter:become(vim {})"
```

## Reload input

`reload(...)` action is used to dynamically update the input list
without restarting fzf. It takes the same command template with placeholder
expressions as `execute(...)`.

See https://github.com/junegunn/fzf/issues/1750 for more info.

```bash
# Update the list of processes by pressing CTRL-R
ps -ef | fzf --bind 'ctrl-r:reload(ps -ef)' --header 'Press CTRL-R to reload' \
             --header-lines=1 --layout=reverse

# Integration with ripgrep
RG_PREFIX="rg --column --line-number --no-heading --color=always --smart-case "
INITIAL_QUERY="foobar"
FZF_DEFAULT_COMMAND="$RG_PREFIX '$INITIAL_QUERY'" \
  fzf --bind "change:reload:$RG_PREFIX {q} || true" \
      --ansi --disabled --query "$INITIAL_QUERY"
```

`reload-sync(...)` is a synchronous version of `reload` that replaces
the list only when the command is complete. This is useful when the command
takes a while to produce the initial output and you don't want fzf to run
against an empty list while the command is running.


```bash
# You can still filter and select entries from the initial list for 3 seconds
seq 100 | fzf --bind 'load:reload-sync(sleep 3; seq 1000)+unbind(load)'
```

## Transform actions

Actions with `transform-` prefix are used to transform the states of fzf
using the output of an external command. The output of these commands are
expected to be a single line of text.

```bash
fzf --bind 'focus:transform-header:file --brief {}'
```

`transform(...)` action runs an external command that should print a series
of actions to be performed. The output should be in the same format as the
payload of HTTP POST request to the `--listen` server.

```bash
# Disallow selecting an empty line
echo -e "1. Hello\n2. Goodbye\n\n3. Exit" |
  fzf --height '~100%' --reverse --header 'Select one' \
      --bind 'enter:transform:[[ -n {} ]] &&
                echo accept ||
                echo "change-header:Invalid selection"'
```

## Preview binding

With `preview(...)` action, you can specify multiple different preview
commands in addition to the default preview command given by `--preview`
option.

```bash
# Default preview command with an extra preview binding
fzf --preview 'file {}' --bind '?:preview:cat {}'

# A preview binding with no default preview command
# (Preview window is initially empty)
fzf --bind '?:preview:cat {}'

# Preview window hidden by default, it appears when you first hit '?'
fzf --bind '?:preview:cat {}' --preview-window hidden
```

## Change preview window attributes

`change-preview-window` action can be used to change the properties of the
preview window. Unlike the `--preview-window` option, you can specify
multiple sets of options separated by `|` characters.

```bash
# Rotate through the options using CTRL-/
fzf --preview 'cat {}' --bind 'ctrl-/:change-preview-window(right,70%|down,40%,border-horizontal|hidden|right)'

# The default properties given by `--preview-window` are inherited, so an empty string in the list is interpreted as the default
fzf --preview 'cat {}' --preview-window 'right,40%,border-left' --bind 'ctrl-/:change-preview-window(70%|down,border-top|hidden|)'

# This is equivalent to toggle-preview action
fzf --preview 'cat {}' --bind 'ctrl-/:change-preview-window(hidden|)'
```

## Author

[Junegunn Choi](https://github.com/junegunn)

## See also

* Project documentation: https://junegunn.github.io/fzf/
* Project homepage: https://github.com/junegunn/fzf
* Extra Vim plugin: https://github.com/junegunn/fzf.vim

## License

```
The MIT License (MIT)

Copyright (c) 2013-2024 Junegunn Choi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
