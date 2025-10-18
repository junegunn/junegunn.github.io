run: clean
	hugo server --minify

build: clean
	hugo --gc --minify --printPathWarnings

clean:
	rm -rf public

init:
	git submodule update --init --recursive

.PHONY: run build clean init
