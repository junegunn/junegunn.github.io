---
weight: 1
title: "Directory navigation"
---

# Directory navigation with fzf

[ALT-C binding](/fzf/shell-integration/#alt-c) allows you to easily
move to a subdirectory. But for directories not under the current directory,
we need a different approach. [Fuzzy completion](/fzf/shell-integration/#fuzzy-completion-for-bash-and-zsh) helps
(e.g. `cd ../../foo/**<TAB>`), but that's still a lot of typing.

You definitely need a program that keeps track of the directories you visit
frequently and allows you to jump between them quickly. It will immensly boost
your productivity, because you'll be switching between a small number of
directories most of the time.

## [z](https://github.com/rupa/z)

I've been using the good old [z](https://github.com/rupa/z). There are
alternatives like [autojump](https://github.com/wting/autojump) and
[zoxide](https://github.com/ajeetdsouza/zoxide), but I prefer the simplicity
of `z` and the fact that it's just a small shell script file so I can easily
read and change if needed. Other projects claim to be faster, but performance
is rarely an issue and you won't really notice the difference.

### Installation

Installing `z` is easy. You can use your package manager to install it

```sh
brew install z
```

or download [the script file](https://raw.githubusercontent.com/rupa/z/master/z.sh).

```sh
curl https://raw.githubusercontent.com/rupa/z/master/z.sh -o ~/.z.sh
```

Then add a line to your shell configuration file to source the script.

```sh
# If installed via Homebrew
echo ". /opt/homebrew/etc/profile.d/z.sh" >> ~/.bashrc

# If downloaded manually
echo ". ~/.z.sh" >> ~/.bashrc
```

### Usage

Once set up, `z` will keep track of the directories you visit and sort them
by "frecency" (frequency + recency). You can jump to the most "relevant"
directory matching the given string.

```sh
z foo
```

Or you can list the directories by just typing `z`

```sh
z
```

### Integration with fzf

Now that we have a list of relevant directories you visit all the time, it's
time to integrate it with fzf.

`z` actually is an alias to `_z` function. Let's unalias it first to create
our own `z` function that integrates with fzf.

```sh
unalias z 2> /dev/null
```

Then we define our `z` function like so:

```sh
z() {
  local dir=$(
    _z 2>&1 |
    fzf --height 40% --layout reverse --info inline \
        --nth 2.. --tac --no-sort --query "$*" \
        --bind 'enter:become:echo {2..}'
  ) && cd "$dir"
}
```

* `_z` prints the list to the standard error, so we redirect it to the
  standard output (`2>&1`).
* `--height 40% --layout reverse --info inline`
    * These options just customize the layout and don't affect the result, so
      feel free to experiment with other options.
      [fzf Theme Generator](https://vitormv.github.io/fzf-themes/) is a great
      place to explore different options.
* `--nth 2..` limits the search scope to exclude the first score column.
* `_z` lists the entries in the ascending order of the score, so we use
  `--tac` to make the most relevant entry appear first.
* Because the list is already sorted, we use `--no-sort`.
* `--query "$*"` sets the initial query to the arguments passed to the
  function.
* By default, when you press enter, fzf prints the entire line to the standard
  output. But we only want the directory name without the score at the front,
  so we use `--bind 'enter:become:echo {2..}'` to change the behavior.
    * We use `{2..}` instead of `{2}` in case the directory name contains
      spaces.

{{< figure src="/fzf/images/z.png" >}}

## [zoxide](https://github.com/ajeetdsouza/zoxide)

[zoxide](https://github.com/ajeetdsouza/zoxide) is an alternative to `z`. It
provides fzf integration out of the box as `zi` (zoxide interactive). However,
the options to fzf are not customizable and [fuzzy matching is
disabled](https://github.com/ajeetdsouza/zoxide/issues/34), so you might want
to define your own function like the one above. We simply replace `_z 2>&1`
with `zoxide query --list --score`, and that's all it takes.

```sh {hl_lines=[3]}
z() {
  local dir=$(
    zoxide query --list --score |
    fzf --height 40% --layout reverse --info inline \
        --nth 2.. --tac --no-sort --query "$*" \
        --bind 'enter:become:echo {2..}'
  ) && cd "$dir"
}
```
