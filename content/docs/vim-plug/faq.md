---
weight: 3
title: "FAQ"
---

# Frequently Asked Questions

## Where should I put plugin configuration?

The most common way to configure a Vim plugin is to define global variables
and/or mappings. Since you can define variables and mappings even when the
plugin is not available, it's safe to put them anywhere you prefer.

I put a plugin's configuration right after its `Plug` command so that it's
easier to manage. I also indent the lines to make them visually distinct. This
is just a matter of personal preference.

```vim
call plug#begin()

Plug 'majutsushi/tagbar'
  let g:tagbar_sort = 0

Plug 'tpope/vim-commentary'
  map  gc  <Plug>Commentary
  nmap gcc <Plug>CommentaryLine

Plug 'morhetz/gruvbox'
  let g:gruvbox_contrast_dark = 'soft'

call plug#end()
```

However, some plugins require you to call their functions for configuring
them, and the functions are not available until you call `plug#end()`, so you
are forced to put it after `plug#end()`. Similarly, you can't load a color
scheme before `plug#end()`.

```vim
call plug#begin()

Plug 'junegunn/vim-after-object'

Plug 'morhetz/gruvbox'
  let g:gruvbox_contrast_dark = 'soft'

call plug#end()

" Prepended `silent!` in case the plugin is not yet installed
silent! call after_object#enable('=', ':', '#', ' ', '|')

" Color schemes are also not available until plug#end()
silent! colorscheme gruvbox
```

But as the list of plugins grows, it gets harder to keep track of a plugin's
configuration if it's not co-located. To alleviate this problem, you can use
`VimEnter` autocmd to delay code execution until Vim is ready.

```vim
call plug#begin()

Plug 'junegunn/vim-after-object'
  autocmd VimEnter * silent! call after_object#enable('=', ':', '#', ' ', '|')

Plug 'morhetz/gruvbox'
  let g:gruvbox_contrast_dark = 'soft'
  autocmd VimEnter * nested silent! colorscheme gruvbox
  " You want 'nested' in case there are ColorScheme autocmds

call plug#end()
```

## Should I set up on-demand (lazy) loading?

You probably don't need to.

A properly implemented Vim plugin should already load lazily without any help
from a plugin manager (`:help autoload`). So there are few cases where these
options actually make much sense. ==Making a plugin load faster is the
responsibility of the plugin developer, not the user.== If you find a plugin
that takes too long to load, consider opening an issue on the plugin's issue
tracker.

Let me give you a perspective. The time it takes to load a plugin is usually
less than 2 or 3ms on modern computers. So unless you use a very large
number of plugins, you are unlikely to save more than 50ms. If you have
spent an hour carefully setting up the options to shave off 50ms, you
will have to start Vim 72,000 times just to break even. You should ask
yourself if that's a good investment of your time.

Make sure that you're tackling the right problem by breaking down the
startup time of Vim using `--startuptime`.

```sh
vim --startuptime /tmp/log
```

On-demand loading should only be used as a last resort. It is basically
a hacky workaround and is not always guaranteed to work.
