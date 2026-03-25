# SQL Select Übungen 🎬

In diesen Übungen geht es darum, die Select-Statements auszuprobieren. Löse die untenstehenden Übungen im SQL-Tool:

[https://sqlproject.coffee-journal.com/exercises/8](https://sqlproject.coffee-journal.com/exercises/8)

<br>

## Teil 1: Filtern mit WHERE

*In diesem Teil liegt der Fokus auf dem Finden spezifischer Daten.*

### 1\. Inception

Welche Bewertung hat der Film Inception? Schreibe ein geeignetes Query, welches den `title` und `popularity` des Films mit dem Titel `Inception` ausgibt. (Großschreibung beachten)

-----

### 2\. Piratenfilme

Finde alle Piratenfilme. Suche dazu im Feld `overview` nach dem Wort **'pirate'**. Gib `title` und `overview` aus.

-----

### 3\. Das Filmjahr 2016

Zeige alle Filme, die im Jahr **2016** veröffentlicht wurden. Nutze dafür den `BETWEEN`-Befehl für den Zeitraum vom 01. Januar bis zum 31. Dezember 2016. (Daten müssen so geschrieben werden: `'2016-12-31'`, wobei 12 der Monat und 31 der Tag ist.)

-----

### 4\. Deutsche Originale

Finde 10 Filme, deren Originalsprache (`original_language`) **Deutsch** (`'de'`) ist. Gib den `title` und die `original_language` aus.

-----

### 5\. Kurze Filmvergnügen

Suche nach Filmen, die eine Laufzeit (`runtime`) von **weniger als 45 Minuten** haben (Kurzfilme). Zeige `title` und `runtime` für maximal 10 Ergebnisse an.

-----

### 6\. Überlange Epen

Finde alle Filme, die länger als **180 Minuten** (3 Stunden) dauern. Gib den `title` und die `runtime` aus.

-----

### 7\. Filme mit "Love" im Titel

Benutze den `LIKE`-Operator, um Filme zu finden, die das Wort **'Love'** irgendwo im Titel (`title`) haben.

-----

### 8\. Beliebte Neuheiten

Suche nach Filmen, die eine Popularität (`popularity`) von **über 100** haben. Zeige `title` und `popularity`.

-----

### 9\. Bestimmte Regisseure

Finde alle Filme in der Datenbank, bei denen **'Quentin Tarantino'** der Regisseur (`director`) war.

-----

## Teil 2: Sortieren mit ORDER BY

*In diesem Teil kombinieren wir Filter mit der Sortierung der Ergebnisse.*

### 10\. Die 10 besten Filme

Zeige die 10 Filme mit der **höchsten** Durchschnittsbewertung (`vote_average`). Sortiere absteigend.

-----

### 11\. Die 10 schlechtesten Filme

Finde die 10 Filme (`title` und `vote_average`) mit der **niedrigsten** Durchschnittsbewertung. Sortiere aufsteigend.

-----

### 12\. Die 10 teuersten Filme

Welche Filme hatten das höchste Budget? Zeige `title` und `budget` der 10 teuersten Produktionen.

-----

### 13\. Die 10 billigsten Filme

Finde die 10 Filme (`title`, `budget`) mit dem geringsten Budget. Sortiere aufsteigend.

-----

### 14\. Die 10 besten deutschen Filme

Kombiniere: Suche Filme, deren `original_language` **'de'** ist und sortiere sie nach der **besten Bewertung** absteigend.

-----

### 15\. Die größten Kassenschlager

Welche 10 Filme haben den meisten Umsatz (`revenue`) generiert? Sortiere absteigend.

-----

### 16\. Die aktuellsten Blockbuster

Zeige die 10 neuesten Filme (nach `release_date`), die ein Budget von über **100 Millionen** hatten.

-----

### 17\. Kürzeste Filme (mit Laufzeit)

Zeige die 10 Filme mit der geringsten Laufzeit an, die aber **mindestens 1 Minute** lang sind.

-----