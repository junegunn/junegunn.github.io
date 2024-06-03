---
weight: 2
bookFlatSection: true
title: "vim-plug"
url: /vim-plug
---

{{< figure src="images/plug.png" >}}

vim-plug is the de-facto standard plugin manager for Vim. With 10+ years of
history, it's no longer new and shiny, but it's extremely reliable and gets
the job done with minimal fuss.

### Pros.

- Minimalist design
    - [Just one file](https://github.com/junegunn/vim-plug/blob/master/plug.vim) with no dependencies. Super easy to set up.
    - Concise, intuitive syntax that you can learn within minutes. No boilerplate code required.
    - No feature bloat
- Extremely stable with flawless backward compatibility
    - *Works perfectly with all versions of Vim since 2006 and all versions of Neovim ever released* [^1]
- [Super-fast][40/4] parallel installation/update [^2]
- Creates shallow clones to minimize disk space usage and download time
- On-demand loading for [faster startup time][startup-time]
- Can review and rollback updates
- Branch/tag/commit support
- Post-update hooks
- Support for externally managed plugins

[^1]: vim-plug implemented parallel installer for Neovim in 2014 before Neovim
    had its first release.
[^2]: vim-plug was the first plugin manager to implement parallel installation
    and update. It's now a common feature in other plugin managers as well.

[40/4]: https://raw.githubusercontent.com/junegunn/i/master/vim-plug/40-in-4.gif
[startup-time]: https://github.com/junegunn/vim-startuptime-benchmark#result

### Cons.

- Probably not the best choice if you're heavily into Lua plugin ecosystem of
  Neovim. vim-plug can install and manage Lua plugins, but it doesn't provide
  Lua-specific features. But if you're a regular Vim user, look no further.
