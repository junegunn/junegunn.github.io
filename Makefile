run: clean
	hugo server --minify

build: clean
	hugo --gc --minify --printPathWarnings

clean:
	rm -rf public

.PHONY: run build clean
