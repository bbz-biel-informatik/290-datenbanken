Dieses SQL-Cheatsheet basiert exklusiv auf den Inhalten deiner Präsentationen und ist in die Bereiche Modellierung, Tabellenstruktur und Datenabfrage unterteilt.

---

## 1. Datenbank-Modellierung (ERD & Logisches Schema)

Bevor SQL geschrieben wird, muss die Struktur geplant werden.

* **ERD (Entity-Relationship-Diagram):**
* **Entität (Rechteck):** Ein Objekt, z. B. `Athlet`, `Ski`.
* **Attribut (Oval):** Eigenschaften, z. B. `Name`, `Marke`, `Geburtsdatum`.
* **Beziehung (Raute):** Verknüpfung zwischen Objekten, z. B. `besitzt`.


* **Kardinalitäten:**
* **1:1:** Ein Fahrer hat ein Taxi.
* **1:n:** Ein Team hat viele Spieler (Fremdschlüssel auf der „vielen“-Seite).
* **n:m:** Ein Lernender besucht viele Kurse; ein Kurs hat viele Lernende. (Benötigt eine **Zwischentabelle**).


* **Datentypen:**
* `INT` / `INTEGER`: Ganzzahlen.
* `SERIAL`: Automatisch hochzählende ID (Primärschlüssel).
* `FLOAT`: Dezimalzahlen (z. B. Körpergröße 1.85).
* `TEXT`: Beliebiger Text (auch URLs).
* `DATE`: Datum im Format `YYYY-MM-DD`.
* Es gibt noch mehr: https://www.w3schools.com/sql/sql_datatypes.asp

---

## 2. Tabellen erstellen & verwalten (DDL)

### Tabelle erstellen (`CREATE TABLE`)

Mit Constraints (Einschränkungen) stellst du die Datenqualität sicher.

* `PRIMARY KEY`: Identifiziert eine Zeile eindeutig (`UNIQUE` + `NOT NULL`).
* `NOT NULL`: Feld darf nicht leer sein.
* `DEFAULT`: Setzt einen Standardwert ein. 
* `REFERENCES`: Erstellt einen Fremdschlüssel (`FOREIGN KEY`) zu einer anderen Tabelle.

**Beispiel: Athleten und ihre Ski**

```sql
CREATE TABLE IF NOT EXISTS athlet (
  id SERIAL PRIMARY KEY,
  vorname TEXT NOT NULL,
  nachname TEXT NOT NULL,
  koerpergroesse FLOAT
);

CREATE TABLE IF NOT EXISTS ski (
  id SERIAL PRIMARY KEY,
  marke TEXT NOT NULL,
  laenge FLOAT NOT NULL,
  athlete_id INT REFERENCES athlet(id) -- Fremdschlüssel
);

```

### Struktur ändern (`ALTER TABLE`)

Falls du später Spalten hinzufügen oder löschen musst:

* **Spalte hinzufügen:** `ALTER TABLE ski ADD COLUMN farbe TEXT;`
* **Spalte löschen:** `ALTER TABLE ski DROP COLUMN koerpergroesse;`
* **Spalte umbenennen:** `ALTER TABLE ski RENAME COLUMN marke TO brand;`

---

## 3. Daten abfragen (DML - SELECT)

### Das SFW-Prinzip (**S**ELECT, **F**ROM, **W**HERE)

Die Grundstruktur jeder Abfrage:

* `SELECT *`: Alle Spalten anzeigen.
* `SELECT spalte1, spalte2`: Nur bestimmte Spalten (Projektion).
* `WHERE`: Zeilen filtern (Selektion).

**Beispiel: Produkte filtern**

```sql
SELECT name, preis 
FROM produkte 
WHERE gewicht < 700 AND preis > 100;

```

### Textsuche mit `LIKE`

* `%` ist ein Platzhalter für beliebig viele Zeichen.
* `LIKE 'IPad%'`: Findet alles, was mit "IPad" beginnt (z. B. "IPad 2", "IPad Air").

---

## 4. Sortieren & Aggregieren

### Sortieren (`ORDER BY`)

* `ASC`: Aufsteigend (Standard).
* `DESC`: Absteigend.

```sql
SELECT * FROM produkte 
ORDER BY preis DESC, name ASC;

```

### Aggregationen (Berechnungen)

* `COUNT(*)`: Anzahl der Zeilen.
* `SUM(spalte)`: Summe der Werte.
* `AVG(spalte)`: Durchschnitt.
* `MAX()` / `MIN()`: Höchster oder niedrigster Wert.

### Gruppieren (`GROUP BY`)

Berechnet Werte pro Gruppe (z. B. Durchschnittspreis pro Hersteller).

* **Wichtig:** Alle Spalten im `SELECT`, die nicht berechnet werden, müssen im `GROUP BY` stehen.

**Beispiel: Durchschnittspreis pro Hersteller**

```sql
SELECT hersteller_id, AVG(preis) 
FROM produkte 
GROUP BY hersteller_id;

```

---

## 5. Tabellen verknüpfen (JOIN)

Wenn Daten über mehrere Tabellen verteilt sind, nutzt man den `INNER JOIN`.

**Beispiel: Produktname mit dem Namen des Herstellers anzeigen**

```sql
SELECT produkte.name, hersteller.firma
FROM produkte
INNER JOIN hersteller ON produkte.hersteller_id = hersteller.id
WHERE produkte.id > 2;

```

* **Tipp:** Wenn Spaltennamen in beiden Tabellen gleich heißen (z. B. `id`), schreibe immer `tabellenname.spaltenname` davor, um Fehler ("ambiguous column") zu vermeiden.

---

### SQL-Regeln auf einen Blick:

1. **Großschreibung:** SQL-Befehle schreibt man standardmäßig GROSS, Tabellen-/Spaltennamen klein.
2. **Sonderzeichen:** Benutze Unterstriche (`_`) statt Leerzeichen. Umlaute (ä, ö, ü) vermeiden (ae, oe, ue).
3. **Abschluss:** Jedes Statement endet mit einem Semikolon (`;`).