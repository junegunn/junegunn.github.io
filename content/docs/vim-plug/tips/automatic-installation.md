---
title: Automatic installation
---

# Automatic installation

## Vim script

Place the following code in your .vimrc before plug#begin() call, and Vim will
automatically install vim-plug and the plugins when you open Vim.

```vim
let data_dir = has('nvim') ? stdpath('data') . '/site' : '~/.vim'
if empty(glob(data_dir . '/autoload/plug.vim'))
  silent execute '!curl -fLo '.data_dir.'/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

" An example of vim-plug section ---------------------------------------------
call plug#begin()
Plug 'junegunn/seoul256.vim'
call plug#end()

silent! colorscheme seoul256
```

## Lua script equivalent for Neovim

```lua
local data_dir = vim.fn.stdpath('data')
if vim.fn.empty(vim.fn.glob(data_dir .. '/site/autoload/plug.vim')) == 1 then
  vim.cmd('silent !curl -fLo ' .. data_dir .. '/site/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim')
  vim.o.runtimepath = vim.o.runtimepath
  vim.cmd('autocmd VimEnter * PlugInstall --sync | source $MYVIMRC')
end

-- An example of vim-plug section --------------------------------------------
local vim = vim
local Plug = vim.fn['plug#']

vim.call('plug#begin')
Plug('junegunn/seoul256.vim')
vim.call('plug#end')

vim.cmd('silent! colorscheme seoul256')
```

(Seemingly unnecessary `vim.o.runtimepath = vim.o.runtimepath` is there to
work around a bug in Neovim. See https://github.com/junegunn/vim-plug/issues/1270.)
