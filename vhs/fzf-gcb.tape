Set Theme { "name": "seoul256", "black": "#4a4a4a", "red": "#df9a98", "green": "#719672", "yellow": "#e0bb71", "blue": "#96bbdc", "magenta": "#dfbdbc", "cyan": "#97bcbc", "white": "#d8d8d8", "brightBlack": "#757575", "brightRed": "#e07798", "brightGreen": "#97bb98", "brightYellow": "#ffdd98", "brightBlue": "#badcfb", "brightMagenta": "#ffbebc", "brightCyan": "#96ddde", "brightWhite": "#e9e9e9", "background": "#4a4a4a", "foreground": "#d8d8d8", "selection": "#96ddde", "cursor": "#d8d8d8" }

Set Width 1200
Set Height 800
Set LineHeight 1.2
Set TypingSpeed 50ms
Sleep 1s

Type "git branch | fzf | cut -c 3- | xargs git checkout"
Sleep 500ms
Enter
Sleep 2s
Type@200ms "mas"
Sleep 1s
Enter
Sleep 2s
Up
Sleep 1s
Enter
Sleep 2s
Type@200ms "dv"
Sleep 1s
Enter
Sleep 4s
