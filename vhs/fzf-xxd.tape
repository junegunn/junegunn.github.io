Set Theme { "name": "seoul256", "black": "#404040", "red": "#df9a98", "green": "#719672", "yellow": "#e0bb71", "blue": "#96bbdc", "magenta": "#dfbdbc", "cyan": "#97bcbc", "white": "#d8d8d8", "brightBlack": "#757575", "brightRed": "#e07798", "brightGreen": "#97bb98", "brightYellow": "#ffdd98", "brightBlue": "#badcfb", "brightMagenta": "#ffbebc", "brightCyan": "#96ddde", "brightWhite": "#e9e9e9", "background": "#404040", "foreground": "#d8d8d8", "selection": "#96ddde", "cursor": "#d8d8d8" }

Set Width 1200
Set Height 800
Set LineHeight 1.2
Set TypingSpeed 50ms
# Set Framerate 5
Sleep 1s

Type "# Make sure fzf doesn't blow up"
Sleep 500ms
Enter
Type "cat /dev/random | xxd | fzf --tail 1000 --tac"
Sleep 500ms
Enter
Sleep 4s
Ctrl+c
