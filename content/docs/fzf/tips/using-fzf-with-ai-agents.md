---
title: Using fzf with AI agents
params:
  long: Using fzf with AI coding agents
---

# Using fzf with AI coding agents

## The problem

With AI coding agents such as Claude Code and Codex, you spend more of your
time typing into the prompt of the agent than on the command line of your
shell. You still need to type in file paths, commit hashes, and branch names,
but the fzf-powered key bindings for your shell, such as
[<kbd>CTRL-T</kbd>](/fzf/shell-integration/) for files and
[<kbd>CTRL-G</kbd> <kbd>CTRL-H</kbd>](/fzf/examples/git/) for commit hashes,
are no longer there to help you. They are handled by the shell, and the shell
is not the program reading your keys anymore.

## tmux to the rescue

If you run the agents inside tmux, as many people do, tmux key bindings still
work. tmux sees the keys before the program in the pane does, so a key bound
in tmux works whatever the pane is running. It can start fzf in a floating
pane, and send the selection back to the original pane as key strokes, as if
you typed it.

There are two plugins built this way.

| Plugin | Key | Completes |
| --- | --- | --- |
| [tmux-fzf-complete][complete] | <kbd>PREFIX</kbd> <kbd>CTRL-T</kbd> | Files, directories, and URLs, paths, and sentences on the screen |
| [fzf-git.sh][fzf-git] | <kbd>PREFIX</kbd> <kbd>g</kbd> | Git objects |

The floating pane requires tmux 3.7 or later. On older versions, fzf starts in
a popup instead.

<video src="https://github.com/user-attachments/assets/df090db7-d06e-4151-aafb-029260f44fc0" controls="controls" style="max-width: 100%"></video>

[complete]: https://github.com/junegunn/tmux-fzf-complete
[fzf-git]: https://github.com/junegunn/fzf-git.sh

## tmux-fzf-complete

[tmux-fzf-complete][complete] makes <kbd>CTRL-T</kbd> of fzf available in every
tmux pane. It requires fzf 0.74.0 or later, and Ruby. Install it with
[TPM](https://github.com/tmux-plugins/tpm),

```sh
# ~/.tmux.conf
set -g @plugin 'junegunn/tmux-fzf-complete'
```

or clone the repository and run `fzf-complete.tmux` from your .tmux.conf.

```sh
# ~/.tmux.conf
run-shell /path/to/tmux-fzf-complete/fzf-complete.tmux
```

Press <kbd>PREFIX</kbd> <kbd>CTRL-T</kbd> in the prompt of an agent. The word in
front of the cursor becomes the query, and the selection replaces it.

```
~/github/fzf-g      ->      ~/github/fzf-git.sh/README.md
```

It completes more than files. Inside fzf, <kbd>CTRL-T</kbd> goes to the next
provider, and these keys switch to one directly.

| Key | Provider |
| --- | --- |
| <kbd>ALT-F</kbd> | Files |
| <kbd>ALT-D</kbd> | Directories |
| <kbd>ALT-U</kbd> | URLs on the screen |
| <kbd>ALT-P</kbd> | Paths on the screen |
| <kbd>ALT-S</kbd> | Sentences on the screen |

The last three are especially useful with an agent. An agent prints a lot of
paths and URLs, and you often want to refer to one of them in your next
message. A sentence is put back together from the rows the agent wrapped it
into, with its indentation removed, so you can quote a part of the answer of
the agent without copying it with the mouse.

Some other keys inside fzf:

- <kbd>CTRL-O</kbd> opens the item under the cursor, a URL in the browser and
  anything else in `$EDITOR`, and comes back to fzf after. The editor opens in
  the floating pane, so press <kbd>PREFIX</kbd> <kbd>z</kbd> to zoom the pane
  if you need more room.
- <kbd>CTRL-Y</kbd> copies the selection to the clipboard.
- <kbd>CTRL-R</kbd> reloads the list, so you can pick up the latest output of
  the agent.

### Keep the output of the agent in the scrollback

An agent that draws a full screen keeps no scrollback in tmux, so only what is
currently on the screen can be completed from. Claude Code and Codex can draw
on the main screen instead, which leaves their output in the scrollback.

- Claude Code: `/tui default` in a session, or `"tui": "default"` in
  `~/.claude/settings.json`
- Codex: `alternate_screen = "never"` under `[tui]` in
  `~/.codex/config.toml`, or `codex --no-alt-screen`

## fzf-git.sh

[fzf-git.sh][fzf-git] provides key bindings for [Git
objects](/fzf/examples/git/). In addition to the shell bindings, it now
comes with tmux bindings in `fzf-git.tmux`. Keep it in the same directory as
`fzf-git.sh`.

```sh
# ~/.tmux.conf
run-shell /path/to/fzf-git.tmux
```

The keys are the same as the shell bindings, with <kbd>PREFIX</kbd>
<kbd>g</kbd> in place of <kbd>CTRL-G</kbd>.

* <kbd>PREFIX</kbd> <kbd>g</kbd> <kbd>?</kbd> to show the list
* <kbd>PREFIX</kbd> <kbd>g</kbd> <kbd>f</kbd> for **F**iles
* <kbd>PREFIX</kbd> <kbd>g</kbd> <kbd>b</kbd> for **B**ranches
* <kbd>PREFIX</kbd> <kbd>g</kbd> <kbd>t</kbd> for **T**ags
* <kbd>PREFIX</kbd> <kbd>g</kbd> <kbd>r</kbd> for **R**emotes
* <kbd>PREFIX</kbd> <kbd>g</kbd> <kbd>h</kbd> for commit **H**ashes
* <kbd>PREFIX</kbd> <kbd>g</kbd> <kbd>s</kbd> for **S**tashes
* <kbd>PREFIX</kbd> <kbd>g</kbd> <kbd>l</kbd> for ref**l**ogs
* <kbd>PREFIX</kbd> <kbd>g</kbd> <kbd>w</kbd> for **W**orktrees
* <kbd>PREFIX</kbd> <kbd>g</kbd> <kbd>e</kbd> for **E**ach ref (`git for-each-ref`)

So you can ask the agent to "review the changes in" a commit, and fill in the
hash with <kbd>PREFIX</kbd> <kbd>g</kbd> <kbd>h</kbd> after looking at the
diff of each commit in the preview window.
