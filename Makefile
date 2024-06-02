run: clean
	hugo server --minify

clean:
	rm -rf public

.PHONY: run clean
