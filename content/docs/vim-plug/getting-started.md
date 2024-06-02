---
weight: 2
title: "Getting Started"
---

# Getting Started

Add a vim-plug section to your `~/.vimrc` (or `init.vim` for Neovim)

1. Begin the section with `call plug#begin()`
1. List the plugins with `Plug` commands
1. End the section with `call plug#end()`

For example,

```vim
call plug#begin()

" List your plugins here
Plug 'tpope/vim-sensible'

call plug#end()
```

Reload the file or restart Vim, then you can,

* `:PlugInstall` to install the plugins
* `:PlugUpdate` to install or update the plugins
* `:PlugDiff` to review the changes from the last update
* `:PlugClean` to remove plugins no longer in the list

