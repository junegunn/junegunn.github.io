# Build instructions


```bash
asdf install hugo 0.124.0
export alias hugo='asdf exec hugo'
```

```bash
git clone https://github.com/junegunn/junegunn.github.io
cd junegunn.github.io
```

```bash
make init
make build
make run
```
(For any build issues, check the commands in `Makefile` and try running them manually to isolate the error)