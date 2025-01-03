# miniprompt
# unset FZF_DEFAULT_OPTS
# unset FZF_CTRL_R_OPTS
# cd ~/github/fzf

Set Theme { "name": "seoul256", "black": "#404040", "red": "#df9a98", "green": "#719672", "yellow": "#e0bb71", "blue": "#96bbdc", "magenta": "#dfbdbc", "cyan": "#97bcbc", "white": "#d8d8d8", "brightBlack": "#757575", "brightRed": "#e07798", "brightGreen": "#97bb98", "brightYellow": "#ffdd98", "brightBlue": "#badcfb", "brightMagenta": "#ffbebc", "brightCyan": "#96ddde", "brightWhite": "#e9e9e9", "background": "#404040", "foreground": "#d8d8d8", "selection": "#96ddde", "cursor": "#d8d8d8" }

Set FontSize 18
Set Padding 20
Set Width 1200
Set Height 800
Set LineHeight 1.3
Set TypingSpeed 10ms
# Set Framerate 5
Sleep 1s

Type "
Type "ps -ef | fzf --reverse --header-lines 1 --header-border bottom --input-border \"
Enter
Type "         --color nth:regular,fg:dim \"
Enter
Type "         --bind 'ctrl-n:change-nth(8..|1|2|3|4|5|6|7|)' \"
Enter
Type `         --bind 'result:transform-prompt:echo "${FZF_NTH}> "'`
Sleep 1s
Enter
Sleep 2s
Ctrl+n
Sleep 500ms
Ctrl+n
Sleep 500ms
Ctrl+n
Sleep 500ms
Ctrl+n
Sleep 500ms
Ctrl+n
Sleep 500ms
Ctrl+n
Sleep 500ms
Ctrl+n
Sleep 500ms
Ctrl+n
Sleep 500ms
Ctrl+n
Sleep 500ms
Ctrl+n
Sleep 2s
Set TypingSpeed 200ms
Type "vim"
Sleep 4s
