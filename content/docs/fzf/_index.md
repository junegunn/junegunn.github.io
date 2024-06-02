---
weight: 1
bookFlatSection: true
title: "fzf"
---

{{< figure src="images/fzf.png" >}}

fzf is a general-purpose command-line fuzzy finder.

It's an interactive filter program for any kind of list; files, command
history, processes, hostnames, bookmarks, git commits, etc. It implements
a "fuzzy" matching algorithm, so you can quickly type in patterns with omitted
characters and still get the results you want.

---

## Is it any good?

Yes, it is. Some say it's the next best thing since sliced internet (whatever
it is). If you spend a lot of time on the terminal, fzf can really change the
way you work and make you a lot more productive.

## Why should I care?

So what do you do on the terminal? You run commands. And most of the commands
deal with some sort of list.

| Task                               | List                                           |
| ---                                | ---                                            |
| Open a file with an editor         | List of files in the current directory         |
| Change directory                   | List of directories in the current directory   |
| Run a command from command history | List of commands you ran before                |
| Kill a process                     | List of processes running on the system        |
| SSH into a server                  | List of hostnames in your `~/.ssh/known_hosts` |
| Check out a git branch             | List of branches in the git repository         |
| Switch to a Kubernetes namespace   | List of namespaces in the Kubernetes cluster   |

And the list goes on.

---

Let's take an example. You want to open a file with an editor. Here's how you
would normally do it without fzf:

1. First, you run `ls` or `find` to see the list of the files under the current
   directory
1. You look through the list to find the file you want to open
1. If the list is too long, you scroll up, or you run the command again
   with `grep` to narrow down the list. e.g. `ls | grep foo`
1. Finally, you type the file name to the command-line to open it. For
   example, `vim THE_FILE`. Auto-completion helps, but you have to press
   <kbd>TAB</kbd> many times to open `a/file/deep/down/in/the/directory/tree`.

---

Here's another example. You want to check out a git branch.

1. You run `git branch` to see the list of branches
1. You look through the list to find the branch you want to check out
1. But you aren't sure which branch is the one you want just by looking at
   their names.
1. You examine each branch by running `git show BRANCH_NAME` or `git log BRANCH_NAME`
1. Finally, you run `git checkout THE_BRANCH`. Again, auto-completion helps,
   but you have to know in advance the exact name of the branch to check out.

---

See the pattern? You're basically repeating this same process over and over
with all kinds of lists. And fzf was created to simplify this core process.

## Demo

See how it works in action:

{{< figure src="images/fzf.gif" width=1200 height=800 >}}
