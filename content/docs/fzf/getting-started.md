---
weight: 2
title: "Getting Started"
---

# Getting Started

## Understanding fzf

Basically, you can think of fzf as ==an interactive version of "grep"== (with
bells and whistles, lots of bells and whistles).

1. You feed lines of text to fzf via standard input,
2. fzf starts an interactive terminal interface where you can narrow down the
   list using fuzzy matching algorithm.
3. And when you finally make a selection, fzf prints it out to standard output.

```goat
 .-------------.
|               |
|  Input lines  |                                .----------------.
|  ______       |                               |                  |
|  ___________  |            .-----.            |  Output line(s)  |
|  ________     +----------->| fzf +----------->|  ________        |
|  ____         |   STDIN    '-----'   STDOUT   |  ____            |
|  ________     |                               |                  |
|  _____        |                                '----------------'
|               |               👀
 '-------------'
```

What I'm trying to say here is that ==fzf is essentially a text filter==; it's
up to you to provide the input list, and it's up to you to do something with
the filtered output.

This may not sound very exciting, but this simple, generic mechanism is what
makes fzf really versatile, because you can compose it with any other
command-line tool that generates or consumes text lines.

```sh
ls | fzf | wc
find * | fzf | md5sum
git ls-files | fzf | xargs git log
ps -ef | sed 1d | fzf | awk '{print $2}' | xargs kill
```

And unlike `grep`:

* fzf is interactive. You can change the query and see the result in
  real-time. And it's really fast.
* fzf performs "fuzzy" matching by default. Your query doesn't have to be
  exact. For example, you can type `fzf` to match "==f==u==z==zy ==f==inder".
  So you can be really quick (and sloppy) and still get the result you want.
* fzf also allows you to "preview" the item in real-time. You don't have to
  manually run `cat FILE` or `git show BRANCH` commands to really see which
  one is the right one.
* fzf is fully customizable through its event-action binding mechanism. It is
  so versatile that many even see it as a framework for building interactive
  terminal applications.

## An example

### Interactive git branch selector

So here's one real-world example. Take a look.

{{< figure src="../images/fzf-gcb.gif" width=1200 height=800 >}}

```sh
git branch | fzf | cut -c 3- | xargs git checkout
```

* List of branches is given to fzf
* You select a branch with fzf
* `cut` command strips off the leading characters before the branch name
  (e.g. `* master`)
* `xargs` runs `git checkout` with the selected branch name

Congratulations! :tada: You just implemented a fully-working interactive git
branch selector in a single line of code. You probably don't want to type the
whole command every time, so let's create an alias.

```sh
alias gcb='git branch | fzf | cut -c 3- | xargs git checkout'
```

### Real-time preview of the content

As mentioned above, you can "preview" the content of the branch using
"preview" option.

```sh
git branch | fzf --preview 'git show --color=always {-1}' |
             cut -c 3- | xargs git checkout
```

* `{-1}` means the last token. This is to ignore leading `*` characters from
  `git branch` output. (e.g. Take `master` from `* master`, or `devel` from
  `  devel`)
* `git show` command suppresses colored output when the output is not
  a terminal, so we explicitly set `--color=always`

### Making it even better

Building a new command with the selected item and running it is such a common
pattern, fzf provides a shorthand method to turn itself into a different
process.

```sh
git branch | fzf --preview 'git show --color=always {-1}' \
                 --bind 'enter:become(git checkout {-1})'
```

* This uses fzf's event-action binding mechnism (`--bind`). In this case, we
  bind `enter` key event to `become` action.
* So when you press <kbd>"enter"</kbd> key, fzf "become"s `git checkout
  THE_BRANCH` command.

So far, you should have noticed that fzf runs in full-screen mode. But that is
not always desirable, so fzf implements alternative display modes.

```sh
git branch | fzf --preview 'git show --color=always {-1}' \
                 --bind 'enter:become(git checkout {-1})' \
                 --height 40% --layout reverse
```

With `--height`, fzf starts below the current cursor position. In this display
mode, `--layout=reverse`, which displays the candidate list from top to
bottom, usually looks better.

{{< figure src="../images/fzf-gcb-preview.gif" width=1200 height=800 >}}

(If you're like me and always on [tmux][tmux], you can make fzf start in
a tmux popup with `--tmux` option. You can learn more about the options from
`fzf --man`.)

[tmux]: https://github.com/tmux/tmux

## Shell Integration

If you're not ready to get serious with scripting, don't worry. fzf comes with
"ready-to-wear" shell integration scripts that set up useful key bindings and
fuzzy completion.

Let's move on to [Shell Integration]({{< relref "shell-integration.md" >}}).
