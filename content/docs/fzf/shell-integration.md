---
weight: 3
title: "Shell Integration"
---

# Shell Integration

To be useful out of the box without any scripting effort, fzf provides shell
integration for `bash`, `zsh` and `fish`.

* CTRL-T, ALT-C, CTRL-R for bash, zsh, and fish
* Fuzzy completion for bash and zsh

{{< figure src="../images/fzf.gif" width=1200 height=800 >}}

## Setting up shell integration

To set up shell integration, add the following to your shell configuration file:

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

{{< notice tip >}}
You can disable CTRL-T or ALT-C binding by setting `FZF_CTRL_T_COMMAND` or
`FZF_ALT_C_COMMAND` to an empty string when sourcing the script.
For example, to disable ALT-C binding:

* bash: `FZF_ALT_C_COMMAND= eval "$(fzf --bash)"`
* zsh: `FZF_ALT_C_COMMAND= source <(fzf --zsh)`
* fish: `fzf --fish | FZF_ALT_C_COMMAND= source`

Setting the variables after sourcing the script will have no effect.
{{< /notice >}}

## Key bindings

### `CTRL-R`

**Paste the selected command from history onto the command-line**

- If you want to see the commands in chronological order, press `CTRL-R`
  again which toggles sorting by relevance
- Set `FZF_CTRL_R_OPTS` to pass additional options to fzf
  ```sh
  # CTRL-/ to toggle small preview window to see the full command
  # CTRL-Y to copy the command into clipboard using pbcopy
  export FZF_CTRL_R_OPTS="
    --preview 'echo {}' --preview-window up:3:hidden:wrap
    --bind 'ctrl-/:toggle-preview'
    --bind 'ctrl-y:execute-silent(echo -n {2..} | pbcopy)+abort'
    --color header:italic
    --header 'Press CTRL-Y to copy command into clipboard'"
  ```

### `CTRL-T`

**Paste the selected files and directories onto the command-line**

- The list is generated using `--walker file,dir,follow,hidden` option
    - You can override the behavior by setting `FZF_CTRL_T_COMMAND` to a custom command that generates the desired list
    - Or you can set `--walker*` options in `FZF_CTRL_T_OPTS`
- Set `FZF_CTRL_T_OPTS` to pass additional options to fzf
  ```sh
  # Preview file content using bat (https://github.com/sharkdp/bat)
  export FZF_CTRL_T_OPTS="
    --walker-skip .git,node_modules,target
    --preview 'bat -n --color=always {}'
    --bind 'ctrl-/:change-preview-window(down|hidden|)'"
  ```
- Can be disabled by setting `FZF_CTRL_T_COMMAND` to an empty string when
  sourcing the script

### `ALT-C`

**cd into the selected directory**

- The list is generated using `--walker dir,follow,hidden` option
- Set `FZF_ALT_C_COMMAND` to override the default command
    - Or you can set `--walker-*` options in `FZF_ALT_C_OPTS`
- Set `FZF_ALT_C_OPTS` to pass additional options to fzf
  ```sh
  # Print tree structure in the preview window
  export FZF_ALT_C_OPTS="
    --walker-skip .git,node_modules,target
    --preview 'tree -C {}'"
  ```
- Can be disabled by setting `FZF_ALT_C_COMMAND` to an empty string when
  sourcing the script

## Key bindings for Git objects

[fzf-git.sh](https://github.com/junegunn/fzf-git.sh) project provides a bunch
of key bindings for completing Git objects. You should definitely check it out.

## Fuzzy completion for bash and zsh

### Files and directories

Fuzzy completion for files and directories can be triggered if the word before
the cursor ends with the trigger sequence, which is by default `**`.

- `COMMAND [DIRECTORY/][FUZZY_PATTERN]**<TAB>`

```sh
# Files under the current directory
# - You can select multiple items with TAB key
vim **<TAB>

# Files under parent directory
vim ../**<TAB>

# Files under parent directory that match `fzf`
vim ../fzf**<TAB>

# Files under your home directory
vim ~/**<TAB>


# Directories under current directory (single-selection)
cd **<TAB>

# Directories under ~/github that match `fzf`
cd ~/github/fzf**<TAB>
```

### Process IDs

Fuzzy completion for PIDs is provided for kill command.

```sh
# Can select multiple processes with <TAB> or <Shift-TAB> keys
kill -9 **<TAB>
```

### Host names

For ssh and telnet commands, fuzzy completion for hostnames is provided. The
names are extracted from /etc/hosts and ~/.ssh/config.

```sh
ssh **<TAB>
telnet **<TAB>
```

### Environment variables / Aliases

```sh
unset **<TAB>
export **<TAB>
unalias **<TAB>
```

