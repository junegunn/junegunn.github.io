---
title: Using fzf in your program
---

# Using fzf in your program

While fzf is most commonly used in shell scripts, you can also use it in your
programs written in different languages.

## As a Go library

fzf is written in Go, so you can use it as a library in your Go programs.
However, the API is experimental and subject to change. I'll try to keep this
gist up-to-date with the latest changes.

{{< gist junegunn 193990b65be48a38aac6ac49d5669170 >}}

## In other languages

Even if you're not using Go, you can still use fzf in your programs as an
external command. Here are some examples in different languages.

### Ruby

We write generic `with_filter` function that takes a command as the first
argument and a block which produces the input to the command, and returns the
selected entries as an array.

```ruby
def with_filter(command)
  io = IO.popen(command, 'r+')
  begin
    stdout, $stdout = $stdout, io
    yield rescue nil
  ensure
    $stdout = stdout
  end
  io.close_write
  io.readlines.map(&:chomp)
end

result = with_filter('fzf -m') do
  1000.times do |n|
    puts n
    sleep 0.005
  end
end

pp result
```

### Python

Translated to Python.

```python
import subprocess
import sys
import time

def with_filter(command, work):
    process = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True, shell=True)
    original_stdout = sys.stdout
    sys.stdout = process.stdin
    try:
        work()
        process.stdin.close()
    except:
        pass
    finally:
        sys.stdout = original_stdout

    output = process.stdout.read().splitlines()
    process.stdout.close()
    return output

def work():
    for n in range(1000):
        print(n, flush=True)
        time.sleep(0.005)

print(with_filter('fzf -m', work))
```

### Clojure

We do the same with Clojure. The code here is a bit more involved, but it will
give you a hint on how it can be done in other JVM languages.

```clojure
(require '[clojure.java.io :as io])

(defmacro with-filter
  [command & forms]
  `(let [sh#  (or (System/getenv "SHELL") "sh")
         pb#  (ProcessBuilder. [sh# "-c" ~command])
         p#   (.start pb#)
         in#  (io/reader (.getInputStream p#))
         out# (io/writer (.getOutputStream p#))]
     (binding [*out* out#]
       (try ~@forms (.close out#) (catch Exception e#)))
     (take-while identity (repeatedly #(.readLine in#)))))

(let [result (with-filter "fzf -m"
               (dotimes [n 1000]
                 (println n)
                 (Thread/sleep 5)))]
  (println result))
```

