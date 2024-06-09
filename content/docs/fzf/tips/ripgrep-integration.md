---
title: Ripgrep integration
---

# Ripgrep integration

## The two pillars of fzf

The interactive terminal interface and the fuzzy matching algorithm are the
two pillars of fzf. However, the usefulness of the latter is quite limited in
a non-interactive environment because by nature,

1. it requires user confirmation

    ```sh
    fzf --filter lt < /usr/share/dict/words | head -5
      # lat
      # let
      # lit
      # lot
      # Lot

      # These are all good matches for 'lt', but which one is the right one?
    ```

2. and it generates many irrelevant matches.

    ```sh
    fzf --filter lt < /usr/share/dict/words | tail -5
      # philosophicojuristic
      # blepharoconjunctivitis
      # sulphureovirescent
      # blepharosyndesmitis
      # choledochoduodenostomy

      # In interactive mode, you don't get to see these unless you scroll a lot.
      # You're definitely not interested in these. But are you?
    ```

The interactive terminal interface, on the other hand, can still be useful
even if you don't want the fuzzy matching algorithm of fzf and want to use
an external program or service to do the filtering.

[Ripgrep][ripgrep] is a good example. It's obviously a much better choice for
searching for a pattern in a large number of files. But it's not an
interactive program. You can't change the search pattern on the fly.

[ripgrep]: https://github.com/BurntSushi/ripgrep

We can get the best of both worlds by combining ripgrep with the interactive
interface of fzf. This article will show you how to achieve that step by step.

## Walkthrough

### 1. `--disabled`

To prevent fzf from doing the filtering, we use `--disabled` option.

```sh
fzf --disabled
```

Now fzf is a mere selector interface. You can move the cursor up and down and
select an item from the list, but that's it. Anything you type on the prompt
is simply ignored.

### 2. Bind `change` event

We need a way to relaunch ripgrep whenever the query string is changed. The
"event-action binding mechanism" of fzf is the answer. We're going to bind
`change` event, which is triggered when the query string is changed, to
`reload` action that runs a command and replaces the current list with the
output of the command.

Run this command and type anything.

```sh
fzf --disabled --bind 'change:reload:echo you typed {q}'
```

* `{q}` is the placeholder expression for the current query, single-quoted.

See? Let's replace `echo` with `rg`, run the command, and type in a search
pattern.

```sh
fzf --disabled --bind 'change:reload:rg {q}'
```

{{< figure src="/fzf/images/fzf-ripgrep-step2.png" alt="change:reload:rg" >}}

It's a good start, but there's a lot to be desired.

> * No line and column numbers are shown.
> * No colors.
> * Search is case-sensitive, which is not what you'd expect from fzf.
> * The initial list is a list of files. We need to start fzf with a ripgrep
>   result for the initial query.
> * No preview window.
> * No action performed when you press enter. fzf just prints the selected line.

### 3. Set ripgrep options

1. Add `--column` to show both line and column numbers.
1. Add `--color=always` to show colors. This requires `--ansi` option of fzf.
1. Add `--smart-case` to make the search case-insensitive by default, but
   case-sensitive if the query contains an uppercase letter.

```sh
fzf --disabled --ansi \
    --bind 'change:reload:rg --column --color=always --smart-case {q}'
```

### 4. Fix initial list

As mentioned above, the above command starts fzf with a list of files because
no input is fed to it and fzf starts its built-in directory walker. Let's fix
it.

```sh {hl_lines=[1]}
rg --column --color=always --smart-case '' |
  fzf --disabled --ansi \
      --bind 'change:reload:rg --column --color=always --smart-case {q}'
```

Okay, but we're repeating the same command twice. Let's put it in a variable
and refer to it. Instead of feeding the output of the command to fzf via
standard input, let's bind `start` event to `reload` action for consistency.

```sh {hl_lines=[1, 2, 4]}
(RELOAD='reload:rg --column --color=always --smart-case {q} || :'
 fzf < /dev/null \
     --disabled --ansi \
     --bind "start:$RELOAD" --bind "change:$RELOAD")
```

* We start subshell `(...)` not to pollute the current shell environment
  with temporary variables.
* Notice the `|| :` at the end of the command. This is to prevent the
  command from exiting with a non-zero status when there's no match for
  the pattern. Otherwise, fzf will show `[Command failed: rg --column
  --color=always --smart-case '...']` message on screen.
* `start:reload` will immediately replace the initial list.
* `< /dev/null` will prevent fzf doing unnecessary work of preparing the
  initial list that is going to be thrown away.


### 5. Add preview window

We're going to use [bat] to show syntax-highlighted preview of the line in the
file. You can install it with `brew install bat`.

[bat]: https://github.com/sharkdp/bat

```sh {hl_lines=[5, 6, 7]}
(RELOAD='reload:rg --column --color=always --smart-case {q} || :'
 fzf < /dev/null \
     --disabled --ansi \
     --bind "start:$RELOAD" --bind "change:$RELOAD" \
     --delimiter : \
     --preview 'bat --style=numbers --color=always --highlight-line {2} {1}' \
     --preview-window '+{2}/2')
```

* Each line of ripgrep output is in the format of
  `FILEPATH:LINE:COLUMN:LINE_CONTENT`. We need `FILEPATH` and `LINE` to build
  a preview command. To do that, we set `--delimiter :` and refer to the
  fields with `{1}` and `{2}`.
* `--preview-window '+{2}/2'` specifies the scroll offset of the preview
  window. `+{2}` means that the offset should be set according to the second
  token, which is the line number. `/2` means that the offset should be
  adjusted so that the line is shown in the middle of the window.

Nice, but we can still do better.

```sh {hl_lines=[6, 7]}
(RELOAD='reload:rg --column --color=always --smart-case {q} || :'
 fzf < /dev/null \
     --disabled --ansi \
     --bind "start:$RELOAD" --bind "change:$RELOAD" \
     --delimiter : \
     --preview 'bat --style=full --color=always --highlight-line {2} {1}' \
     --preview-window '~4,+{2}+4/3,<80(up)')
```

* Now we've switched to `--style=full` which shows the file name and the size
  as the header.
  ```
  ───────┬────────────────────────────────────────────────
         │ File: LICENSE
         │ Size: 1.1 KB
  ───────┼────────────────────────────────────────────────
     1   │ The MIT License (MIT)
     2   │
     3   │ Copyright (c) 2013-2024 Junegunn Choi
  ```
- Let's break down the even more cryptic `--preview-window` expression.
    - `~4` makes the top four lines "sticky" header so that they are always
      visible regardless of the scroll offset. (Did I mention that you can
      scroll the preview window with your mouse/trackpad?)
    - `+{2}` — The base offset is extracted from the second token
    - `+4` — We add 4 lines to the base offset to compensate for the header
    - `/3` adjusts the offset so that the matching line is shown at a third
      position in the window
    - `<80(up)` — This expression specifies the alternative options for
      the preview window. By default, the preview window opens on the right
      side with 50% width. But if the width is narrower than 80 columns, it
      will open above the main window with 50% height.

### 6. Bind `enter` to `become` action

```sh {hl_lines=[5]}
(RELOAD='reload:rg --column --color=always --smart-case {q} || :'
 fzf < /dev/null \
     --disabled --ansi \
     --bind "start:$RELOAD" --bind "change:$RELOAD" \
     --bind 'enter:become:vim {1} +{2}' \
     --delimiter : \
     --preview 'bat --style=full --color=always --highlight-line {2} {1}' \
     --preview-window '~4,+{2}+4/3,<80(up)')
```

With the new binding, when you press enter, fzf will open the file (`{1}`) in
`vim` and move the cursor to the line (`{2}`).

### 7. Add another `execute` binding

Sometimes you may want to open the file in the editor and come back to fzf to
continue searching. Let's add an `execute` binding for that.

```sh {hl_lines=[6]}
(RELOAD='reload:rg --column --color=always --smart-case {q} || :'
 fzf < /dev/null \
     --disabled --ansi \
     --bind "start:$RELOAD" --bind "change:$RELOAD" \
     --bind 'enter:become:vim {1} +{2}' \
     --bind 'ctrl-o:execute:vim {1} +{2}' \
     --delimiter : \
     --preview 'bat --style=full --color=always --highlight-line {2} {1}' \
     --preview-window '~4,+{2}+4/3,<80(up)')
```

Now you can press `ctrl-o` to open the file in `vim` without leaving fzf.

### 8. Handle multiple selections

So far, we've been dealing with a single selection. Let's add `--multi` option
so you can select multiple lines with `TAB` and `SHIFT-TAB`.

```sh {hl_lines=["2-6", "10-12"]}
(RELOAD='reload:rg --column --color=always --smart-case {q} || :'
 OPENER='if [[ $FZF_SELECT_COUNT -eq 0 ]]; then
           vim {1} +{2}     # No selection. Open the current line in Vim.
         else
           vim +cw -q {+f}  # Build and open quickfix window for the selected items.
         fi'
 fzf < /dev/null \
     --disabled --ansi --multi \
     --bind "start:$RELOAD" --bind "change:$RELOAD" \
     --bind "enter:become:$OPENER" \
     --bind "ctrl-o:execute:$OPENER" \
     --bind 'alt-a:select-all,alt-d:deselect-all,ctrl-/:toggle-preview' \
     --delimiter : \
     --preview 'bat --style=full --color=always --highlight-line {2} {1}' \
     --preview-window '~4,+{2}+4/3,<80(up)')
```

* fzf exports a number of environment variables to its child processes so that
  they can behave differently depending on the context. `$FZF_SELECT_COUNT` is
  the number of selected items.
* `$OPENER` holds a shell code that is run on `enter` and `ctrl-o`. It behaves
  differently depending on `$FZF_SELECT_COUNT`.
* It builds and open quickfix window only when the user has selected any items
  using `TAB` or `SHIFT-TAB`.
* `vim +cw -q {+f}` needs some explanation.
    * `+cw` tells Vim to execute `:cw` command to open the quickfix window.
    * `-q {+f}` makes Vim start in quickfix mode using the error file `{+f}`
    * So what is `{+f}`? It's a placeholder expression of fzf for a temporary
      file containing the selected items. It's a combination of two flags, `+`
      and `f`. See [the reference page](/fzf/reference/#preview) for more
      information.
* We added three more bindings for convenience; `alt-a` and `alt-d`, to select
  and deselect all items, and `ctrl-/` to toggle the preview window.

### Wrap-up

Let's define it as a function so we can pass the initial query as an argument.

```sh {hl_lines=[18]}
# ripgrep->fzf->vim [QUERY]
rfv() (
  RELOAD='reload:rg --column --color=always --smart-case {q} || :'
  OPENER='if [[ $FZF_SELECT_COUNT -eq 0 ]]; then
            vim {1} +{2}     # No selection. Open the current line in Vim.
          else
            vim +cw -q {+f}  # Build and open quickfix window for the selected items.
          fi'
  fzf < /dev/null \
      --disabled --ansi --multi \
      --bind "start:$RELOAD" --bind "change:$RELOAD" \
      --bind "enter:become:$OPENER" \
      --bind "ctrl-o:execute:$OPENER" \
      --bind 'alt-a:select-all,alt-d:deselect-all,ctrl-/:toggle-preview' \
      --delimiter : \
      --preview 'bat --style=full --color=always --highlight-line {2} {1}' \
      --preview-window '~4,+{2}+4/3,<80(up)' \
      --query "$*"
)
```

{{< figure src="/fzf/images/fzf-rfv.gif" alt="ripgrep->fzf->vim" >}}

Isn't it wonderful? With [ripgrep], [bat], and fzf, we have a fully
functional, high performance code search interface with syntax-highlighted
live preview that integrates with Vim in less than 20 lines of code. This is
the beauty of [the Unix philosophy][unix]. And fzf is a good citizen of the
Unix world.

[unix]: https://en.wikipedia.org/wiki/Unix_philosophy
