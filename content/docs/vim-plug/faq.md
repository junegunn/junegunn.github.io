---
weight: 3
title: "FAQ"
---

# Frequently Asked Questions

## How can I load a color scheme?

> _I'm getting `E185: Cannot find color scheme 'xxx'`_

Plugins become available after `call plug#end()`. So, if you want to load a
color scheme installed by vim-plug, you should put the `colorscheme` command
after `call plug#end()`, for example:

```vim
call plug#begin()
Plug 'morhetz/gruvbox'
call plug#end()

silent! colorscheme gruvbox
```

We prepend `silent!` to ignore errors when the color scheme is not yet
installed.

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
