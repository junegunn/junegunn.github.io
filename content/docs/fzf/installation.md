---
weight: 1
title: "Installation"
---

# Installation

## Using Homebrew

[Homebrew](https://brew.sh/) is the recommended way to install fzf, as it
provides the most recent version of fzf.

```sh
brew install fzf
```

## Using other package managers

### Linux

{{< details >}}
| Package Manager | Linux Distribution      | Command                            |
| --------------- | ----------------------- | ---------------------------------- |
| APK             | Alpine Linux            | `sudo apk add fzf`                 |
| APT             | Debian 9+/Ubuntu 19.10+ | `sudo apt install fzf`             |
| Conda           |                         | `conda install -c conda-forge fzf` |
| DNF             | Fedora                  | `sudo dnf install fzf`             |
| Nix             | NixOS, etc.             | `nix-env -iA nixpkgs.fzf`          |
| Pacman          | Arch Linux              | `sudo pacman -S fzf`               |
| pkg             | FreeBSD                 | `pkg install fzf`                  |
| pkgin           | NetBSD                  | `pkgin install fzf`                |
| pkg_add         | OpenBSD                 | `pkg_add fzf`                      |
| Portage         | Gentoo                  | `emerge --ask app-shells/fzf`      |
| Spack           |                         | `spack install fzf`                |
| XBPS            | Void Linux              | `sudo xbps-install -S fzf`         |
| Zypper          | openSUSE                | `sudo zypper install fzf`          |
{{< /details >}}

### Windows

{{< details >}}
| Package manager | Command                               |
| --------------- | ------------------------------------- |
| Chocolatey      | `choco install fzf`                   |
| Scoop           | `scoop install fzf`                   |
| Winget          | `winget install fzf`                  |
| MSYS2 (pacman)  | `pacman -S $MINGW_PACKAGE_PREFIX-fzf` |
{{< /details >}}

## Getting the latest binary

While fzf is available on all major package managers, they may provide an old
version of fzf. If that's the case, you can download the latest binary from
the [releases page](https://github.com/junegunn/fzf/releases) and put it in
your `$PATH`.

## Setting up shell integration

fzf comes with shell integration scripts that set up useful key bindings
and fuzzy completion so that fzf is still useful even if you're not well
versed in shell scripting.

* bash (~/.bashrc)
  ```sh
  eval "$(fzf --bash)"
  ```
* zsh (~/.zshrc)
  ```sh
  source <(fzf --zsh)
  ```
* fish (~/.config/fish/config.fish)
  ```fish
  fzf --fish | source
  ```

