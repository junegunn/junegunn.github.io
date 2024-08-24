---
weight: 3
title: Git objects
slug: git
params:
  long: Completing Git objects with fzf
---

# Completing Git objects with fzf

If you're like me and you prefer to write Git commands by hand, you often need
to type in commit hashes, branch names, tags, etc. And fzf can really
help you with that.

With its numerous subcommands and options, git can be quite daunting even for
the experienced. There is sophisticated, context-aware [completion
support][git-completion] for git command, but I find it lacking in several
aspects.

[git-completion]: https://github.com/git/git/tree/master/contrib/completion

- The "context-awareness" of it definitely helps, but in some cases it can be
  limiting. For example, for `git checkout`, it lists branches and tags, but
  I sometimes need to check out a specific commit by its commit hash (a.k.a.
  detached head state).
- We can't tell whether a completion candidate is a tag, or a branch. We don't
  *see* the details of each entry, just the names.
- Even if the completion for `git checkout` is extended to also present commit
  hashes as the candidates, it will be hardly useful, as we have no way of
  knowing what each hash represents.
- It only works with git command, you can't use it in other contexts.

So in addition to the completion, I use a set of dedicated key bindings for
each type of git object; commit hashes, branches, tags, remotes, and the files
that are modified or untracked, etc.

* <kbd>CTRL-G</kbd> <kbd>CTRL-F</kbd> for **F**iles
* <kbd>CTRL-G</kbd> <kbd>CTRL-B</kbd> for **B**ranches
* <kbd>CTRL-G</kbd> <kbd>CTRL-T</kbd> for **T**ags
* <kbd>CTRL-G</kbd> <kbd>CTRL-R</kbd> for **R**emotes
* <kbd>CTRL-G</kbd> <kbd>CTRL-H</kbd> for commit **H**ashes
* <kbd>CTRL-G</kbd> <kbd>CTRL-S</kbd> for **S**tashes
* <kbd>CTRL-G</kbd> <kbd>CTRL-L</kbd> for ref**l**ogs
* <kbd>CTRL-G</kbd> <kbd>CTRL-W</kbd> for **W**orktrees
* <kbd>CTRL-G</kbd> <kbd>CTRL-E</kbd> for **E**ach ref (`git for-each-ref`)

They are implemented using fzf, so we can interactively search for things with
its efficient fuzzy matching algorithm, and with the `--preview` option, we
not only see the list of the objects, but also the details of each entry,
without having to run additional commands.

{{< figure src="/fzf/images/fzf-git-objects.gif" width=1200 height=800 >}}

The bindings are available in
[fzf-git.sh](https://github.com/junegunn/fzf-git.sh) respository. Thank me
later.
