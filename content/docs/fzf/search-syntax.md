---
weight: 4
title: "Search syntax"
---

# Search syntax

Sometimes fuzzy matching is not enough. fzf implements its own simple search
syntax to augment fuzzy matching.

## Multiple search terms

You can type in multiple search terms delimited by spaces. For example,
fzf sees `^music .mp3$ sbtrkt !fire` as four separate search terms.

## Match types

| Token     | Match type                              | Description                                          |
| --------- | --------------------------------------- | ---------------------------------------------------- |
| `sbtrkt`  | fuzzy-match                             | Items that include `sbtrkt` characters in that order |
| `'wild`   | exact-match (quoted)                    | Items that include `wild`                            |
| `'wild'`  | exact-boundary-match (quoted both ends) | Items that include `wild` at word boundaries         |
| `^music`  | prefix-exact-match                      | Items that start with `music`                        |
| `.mp3$`   | suffix-exact-match                      | Items that end with `.mp3`                           |
| `!fire`   | inverse-exact-match                     | Items that do not include `fire`                     |
| `!^music` | inverse-prefix-exact-match              | Items that do not start with `music`                 |
| `!.mp3$`  | inverse-suffix-exact-match              | Items that do not end with `.mp3`                    |

## Exact matching

If you don't prefer fuzzy matching and do not wish to "quote" every word,
start fzf with `-e` or `--exact` option. Note that when `--exact` is set,
`'`-prefix "unquotes" the term.

## OR operator

A single bar character term acts as an OR operator. For example, the following
query matches entries that start with `core` and end with either `go`, `rb`,
or `py`.

```
^core go$ | rb$ | py$
```

## How to get better results

A common mistake is to type unnecessary spaces. You may type `git add` to
search for `git add something`. But if you do so, fzf sees it as two separate
terms and process them separately, so it will match `add ... git` which is not
what you want.

```sh
# fzf picks up both
fzf -q 'git add' << EOF
add things to git
git add something
EOF
```

So most of the time, ==you'll get better results by typing less==.

* `gitadd` is better than `git add`; `add git` will be filtered out.
* `gadd` should work well too.
* Or `gas`. fzf gives big bonus scores to the matching characters at word
  boundaries so acronym queries like this work surprisingly well.
