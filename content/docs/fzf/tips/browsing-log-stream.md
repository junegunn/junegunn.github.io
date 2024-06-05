---
title: Browsing log stream with fzf
---

# Browsing log stream with fzf

In order to allow changing queries and getting the updated results in
real-time, fzf keeps the whole input list in memory and scans the list
whenever the query changes.

So if you attach fzf to an endless input stream, such as server logs, the
memory usage will grow indefinitely and fzf will eventually crash.

To work around this limitation, ==fzf provides `--tail=NUM` option that allows
you to limit the number of items to keep in memory==. When the number of items
exceeds the limit, fzf will drop the oldest items from the list.

```sh
# Make sure fzf doesn't blow up
cat /dev/random | xxd | fzf --tail 1000 --tac
```

## Best practices

* Use `--tac` to see the newest items up front
* You might want to use `--no-sort` option to keep the order of the items
  intact
    * Without sorting, you'll likely see many irrelevant matches, so try
      disabling fuzzy matching with `--exact`

## Examples

### Browsing local logs files

```bash
tail -f *.log | fzf --tail 100000 --tac --no-sort --exact
```

### Browsing Kubernetes logs using [stern]

[stern]: https://github.com/stern/stern

```bash
stern . --color always 2>&1 |
    fzf --ansi --tail 100000 --tac --no-sort --exact \
        --bind 'ctrl-o:execute:${EDITOR:-vim} -n <(kubectl logs {1})' \
        --bind 'enter:execute:kubectl exec -it {1} -- bash' \
        --header '╱ Enter (kubectl exec) ╱ CTRL-O (open log in editor) ╱'
```

#### `--color always` and `--ansi`

[stern] allows you to see logs from multiple pods at once, each in a different
color. But like most other programs, it suppresses color codes when the output
is redirected to another program.

To preserve the colors, use `--color always` option, and make fzf recognize
the ANSI color codes by specifying `--ansi` option.

#### `--bind`

The above example uses `--bind` option to define two custom bindings.

* You can press `ctrl-o` to open the log in the editor,
* and `enter` to execute `kubectl exec` on the selected pod.

`execute` action allows you to "execute" an arbitrary command without leaving
fzf, so when you're done, you can continue browsing the logs.

`{1}` in the bind expression denotes the first token of the current line,
which is the name of the pod.
