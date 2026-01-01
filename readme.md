# Datenbanken modul 290
Dieses Repository enthält das gesamte Material für das Modul Datenbanken 290.

https://bbz-biel-informatik.github.io/290-datenbanken/

## Tools
Die Slides werden mit reveal.js erstellt: https://revealjs.com/
Das Projekt wird auf github pages deployed.

## Live preview
Um eine live preview der Slides zu bekommen, führe folgenden Befehl aus:

```bash
npm run dev
```

## Deploy to GitHub Pages
Das Projekt wird automatisch deployed, wenn auf den Master gepusht wird. Der Build passiert jedoch auf der lokalen Maschine und wird dann auf github pages deployed.

Um das Projekt auf github pages manuell zu deployen, führe folgenden Befehl aus:

```bash
npm run deploy
```

! Das ist nötig, da das automatische deployment wegen dem subpath Probleme macht: https://github.com/orgs/community/discussions/61478


## Notes
Bessere Struktur:
|--|Material 
|----|ERD
|------|01-erd.html
|------|Übungen.md
|----|SQL
|------|02-sql.html
|------|Übungen.md