.PHONY: start pdf build drawings

start:
	cd revealjs && npm start

pdf:
	cd revealjs && npm run pdf

drawings:
	cd revealjs && node scripts/compile-drawings.mjs

pages:
	cd revealjs && node scripts/compile-pages.mjs


clean:
	rm -rf build

build: drawings pdf pages start
