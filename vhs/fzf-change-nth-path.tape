# miniprompt
# unset FZF_DEFAULT_OPTS
# unset FZF_CTRL_R_OPTS
# cd ~/github/fzf

Set Theme { "name": "seoul256", "black": "#404040", "red": "#df9a98", "green": "#719672", "yellow": "#e0bb71", "blue": "#96bbdc", "magenta": "#dfbdbc", "cyan": "#97bcbc", "white": "#d8d8d8", "brightBlack": "#757575", "brightRed": "#e07798", "brightGreen": "#97bb98", "brightYellow": "#ffdd98", "brightBlue": "#badcfb", "brightMagenta": "#ffbebc", "brightCyan": "#96ddde", "brightWhite": "#e9e9e9", "background": "#404040", "foreground": "#d8d8d8", "selection": "#96ddde", "cursor": "#d8d8d8" }

Set Width 1200
Set Height 800
Set LineHeight 1.3
Set TypingSpeed 10ms
# Set Framerate 5
Sleep 1s

Set TypingSpeed 50ms
Type "# CTRL-N to toggle name-only search"
Sleep 1s
Enter

Set TypingSpeed 10ms
Type `fzf --delimiter / \`
Enter
Type `    --color nth:regular,fg:dim \`
Enter
Type `    --bind 'ctrl-n:change-nth(-1|)' \`
Enter
Type `    --bind 'result:transform-prompt:`
Enter
Type `              [[ $FZF_NTH = -1 ]] && echo "name> " || echo "path> "'`
Sleep 1s
Enter
Sleep 2s
Type 's'
Sleep 2s
Ctrl+n
Sleep 2s
Ctrl+n
Sleep 2s

Set TypingSpeed 500ms
Type "ag"
Sleep 1s
Ctrl+n
Sleep 2s
Ctrl+n
Sleep 2s
Ctrl+n
Sleep 4s
