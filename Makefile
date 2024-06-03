run: clean
	hugo server --minify

build: clean
	hugo --gc --minify

debug: clean
	hugo --printPathWarnings --printUnusedTemplates --logLevel debug --cleanDestinationDir --ignoreCache

clean:
	rm -rf public

.PHONY: run build debug clean
