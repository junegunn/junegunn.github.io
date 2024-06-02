# miniprompt
# unset FZF_DEFAULT_OPTS
# unset FZF_CTRL_R_OPTS
# cd ~/github/fzf

Set Theme { "name": "seoul256", "black": "#4a4a4a", "red": "#df9a98", "green": "#719672", "yellow": "#e0bb71", "blue": "#96bbdc", "magenta": "#dfbdbc", "cyan": "#97bcbc", "white": "#d8d8d8", "brightBlack": "#757575", "brightRed": "#e07798", "brightGreen": "#97bb98", "brightYellow": "#ffdd98", "brightBlue": "#badcfb", "brightMagenta": "#ffbebc", "brightCyan": "#96ddde", "brightWhite": "#e9e9e9", "background": "#4a4a4a", "foreground": "#d8d8d8", "selection": "#96ddde", "cursor": "#d8d8d8" }

Set Width 1200
Set Height 800
Set LineHeight 1.2
Set TypingSpeed 50ms
Sleep 1s
Type "ls"
Sleep 500ms
Enter
Sleep 1s
Type "# Press CTRL-T to complete the command using fzf"
Enter
Sleep 1s
Type "vim "
Sleep 1s
Ctrl+T
Sleep 2s
Type@100ms "algogo"
Sleep 500ms
Tab@500ms 2
Sleep 1s
Enter
Sleep 2s
Ctrl+C
Sleep 1s
Type "# Press ALT-C to change directory"
Enter
Sleep 1s
Escape
Type@0ms "c"
Sleep 2s
Type "wf"
Sleep 1s
Enter
Sleep 1s
Type "pwd"
Sleep 500ms
Enter
Sleep 4s
