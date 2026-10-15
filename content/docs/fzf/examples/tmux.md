---
weight: 4
title: Tmux integration
slug: tmux
params:
  long: Tmux integration
---

# Tmux integration

## Tmux plugins

There are tmux plugins that utilize fzf for better experience.

### [junegunn/tmux-fzf-complete](https://github.com/junegunn/tmux-fzf-complete)

<kbd>CTRL-T</kbd> of the shell integration only works on the command line of a
shell. [junegunn/tmux-fzf-complete](https://github.com/junegunn/tmux-fzf-complete)
binds it as a tmux key instead, so <kbd>PREFIX</kbd> <kbd>CTRL-T</kbd> completes
a path into any pane, even one that is running an editor or an interactive AI
agent, as the selection is sent to it as key strokes.

Inside fzf, <kbd>CTRL-T</kbd> goes to the next list, and <kbd>ALT-D</kbd>,
<kbd>ALT-U</kbd>, <kbd>ALT-P</kbd>, and <kbd>ALT-S</kbd> switch straight to
directories, URLs, paths, or sentences on the screen. A sentence is put back
together from the rows the program wrapped it into, with its indentation
removed, which is what makes the output of an AI agent usable.

See [Using fzf with AI agents](/fzf/tips/using-fzf-with-ai-agents/) for how
to use it with an AI agent.

### [junegunn/tmux-fzf-url](https://github.com/junegunn/tmux-fzf-url)

The one I enjoy the most is
[junegunn/tmux-fzf-url](https://github.com/junegunn/tmux-fzf-url). It allows
me to quickly open URLs in the browser with just a few key strokes. Highly
recommended.

### [sainnhe/tmux-fzf](https://github.com/sainnhe/tmux-fzf)

[sainnhe/tmux-fzf](https://github.com/sainnhe/tmux-fzf) allows you to perform
various actions on tmux using fzf. It's probably the most feature-rich plugin
out there so you might want to check it out.
