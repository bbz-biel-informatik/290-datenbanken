# SQL Select Übungen 🎬

In diesen Übungen geht es darum, die Select-Statements auszuprobieren. Löse die untenstehenden Übungen im SQL-Tool:

[https://sqlproject.coffee-journal.com/exercises/9](https://sqlproject.coffee-journal.com/exercises/9)

<br>

## Teil 1: Filtern mit WHERE

*In diesem Teil liegt der Fokus auf dem Finden spezifischer Daten.*

### 1\. Alle Ufosichtungen in Deutschland 

Finde die `city`, `shape` und `comments` aller ufo-sichtungen aus Deutschland. Bei allen deutschen Sichtungen ist die column `country` auf `de` gesetzt.

-----

### 2\. Ufosichtungen in New York

Finde die `city`, `shape` und `comments` aller ufo-sichtungen aus New York. Bei allen Sichtungen von New York ist die column `state` auf `ny` gesetzt.

-----

### 3\. Ufosichtungen triangle

Finde alle Ufo Sichtungen, welche in der Form (`shape`)  `triangle` erwähnt wird. Gib nur die `shape`und `comments` aus.

-----

### 4\. Ufosichtungen triangle 2

Finde alle Ufo Sichtungen, bei welchen im Kommentar (`comment`)  `triangle` erwähnt wird. Gib nur die `shape`und `comments` aus.

-----

### 5\. Gab es an deinem Geburtstag eine Ufosichtung?

Überlege dir, wie du das herausfinden kannst. Nutze dabei das property `date_posted` und ein Datum, welches du so schreibst: '1998-12-20' 'YYYY-MM-DD'

-----

### 6\. Gab es in deinem Geburtsjahr eine Ufosichtung?

Überlege dir, wie du das herausfinden kannst. Nutze dabei wiederum das property `date_posted` in Kombination mit 'BETWEEN'

-----

### 7\. Ufosichtungen länger als 1h

Finde die Dauer `duration_seconds`, den Kommentar `comments` und das Datum `date_posted` aller Ufosichtungen, welche länger als 1h gingen. 1h = 3600 Sekunden

-----

### 8\. Kommentare beginnend mit 'I went...' 

Finde alle Ufosichtungen, dessen Komentar mit `I went` beginnt. Nutze dazu den like operator. Gib die Stadt `city` und den Kommentar `comments` aus.


## Teil 2: Sortieren mit ORDER BY

*In diesem Teil geht es darum, die Ergebnisse zu sortieren und auf eine bestimmte Anzahl zu begrenzen.*

### 10\. Die 10 längsten Ufosichtungen

Zeige `city`, `duration_seconds` und `comments` der **10 längsten** Ufosichtungen. Sortiere absteigend nach `duration_seconds`.

-----

### 11\. Die 10 kürzesten Ufosichtungen

Zeige `city`, `duration_seconds` und `comments` der **10 kürzesten** Ufosichtungen. Sortiere aufsteigend nach `duration_seconds`.

-----

### 12\. Die 10 neuesten Ufosichtungen

Zeige `city`, `state`, `country` und `date_posted` der **10 neuesten** Ufosichtungen. Sortiere absteigend nach `date_posted`.

-----

### 13\. Die 10 ältesten Ufosichtungen

Zeige `city`, `state`, `country` und `date_posted` der **10 ältesten** Ufosichtungen. Sortiere aufsteigend nach `date_posted`.

-----

### 14\. Die 10 nördlichsten Ufosichtungen

Zeige `city`, `country` und `latitude` der **10 Sichtungen mit dem höchsten Breitengrad** (`latitude`). Sortiere absteigend nach `latitude`.

-----

### 16\. Die 10 längsten Ufosichtungen in den USA

Kombiniere: Filtere alle Sichtungen aus den USA (`country = 'us'`) und zeige die **10 längsten** davon. Gib `city`, `state` und `duration_seconds` aus. Sortiere absteigend nach `duration_seconds`.

-----

### 17\. Die 10 neuesten Dreieck-Sichtungen

Kombiniere: Filtere alle Sichtungen mit der Form (`shape`) `triangle` und zeige die **10 neuesten** davon. Gib `city`, `country`, `shape` und `date_posted` aus.

-----

### 19\. Die 10 ältesten Sichtungen aus Deutschland

Kombiniere: Filtere alle Sichtungen aus Deutschland (`country = 'de'`) und zeige die **10 ältesten** davon. Gib `city`, `shape`, `comments` und `date_posted` aus.

-----