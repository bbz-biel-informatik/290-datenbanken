.PHONY: start pdf build drawings

start:
	cd revealjs && npm start

pdf:
	cd revealjs && npm run pdf

drawings:
	cd revealjs && node scripts/compile-drawings.mjs

build: drawings pdf start
