# 📸 SQL Basics mit instagram 

Deine Aufgabe ist es, mit SQL-Befehlen (`INSERT`, `SELECT`, `UPDATE`) unser soziales Netzwerk zu befüllen. Nutze die Struktur unserer Datenbank, um die folgenden Aktionen durchzuführen. **Notiere dir zu jeder Aufgabe den SQL-Befehl, den du verwendet hast** Schaue dir die Datenbankstruktur an und überlege dir, wie du die Aufgaben am besten löst.

Sehe das Netzwerk live hier:
https://playgroundinsta.coffee-journal.com/feed

Die Übungen können auf dem sql tool hier gemacht werden:
https://sqlproject.coffee-journal.com/exercises/5


## Datenbankstruktur
![alt text](<Unbenanntes Diagramm.drawio.svg>)

## Teil 1: Dein Profil & Dein Content (INSERT) 

**1 - Erstelle dein eigenes Konto**<br> 
Schaue dir die Datenstruktur an und überlege dir, wie du einen Benutzer machen kannst. Als Profilbild kannst du diese Seite verwenden (oder auch etwas anderes): https://getavataaars.com/

**2 - Veröffentliche einen ersten Beitrag**<br>
Suche ein Bild, welches du posten kannst. Das Bild wird als URL eingefügt. Finde dazu ein Bild im Internet, wähle dann mit rechtsklick "url kopieren" und füge das geeignet in die Tabellenstruktur ein.

**3 - Kommentiere einen Beitrag**<br>
Finde einen Beitrag und schreibe einen Kommentar.

## Teil 2: Beiträge anzeigen (INSERT / SELECT)

**4 - Lass dir den Feed anzeigen**<br>
Schreibe ein Query, welches dir den aktuellen Feed anzeigt.

**5 - Finde den Account deines Sitznachbarn**<br>
Suche in der Datenbank gezielt den Account deines Sitznachbarns. Notiere dier die `id`!

**6 - Schau dir die Beiträge deines Nachbarn an:**<br>
Lass dir nur die Posts anzeigen, die von der `user_id` deines Sitznachbarn erstellt wurden.

**7 - Komentare anzeigen**<br>
Schaue dir die Kommentare unter deinem Post an.

## Teil 3: Likes / Edits / Mehr Select

**8 - Verteile ein paar Likes**<br>
Suche dir 2-3 andere Beiträge aus dem Feed aus und erhöhe deren Like-Zahl um jeweils 1. *(Achtung: Denk unbedingt an die `WHERE`-Klausel, sonst likest du aus Versehen jeden Post in der Datenbank!)*

**9 - Verändere einen Post**<br>
Finde den Post, welchen du zu Beginn gemacht hast und ändere das bild oder die Beschreibung

**10 - Benutzer finden**<br>
Finde alle Benutzer, welche "caprio" im Namen haben 

**11 - Posts finden**<br>
- Finde alle Posts, welche in Thun gemacht wurden
- Finde alle Posts, welche mehr als 5 Likes haben
- Finde alle Posts, welche zwischen 5 und 10 Likes haben

**12 - Nachricht senden**<br>
Sende eine Chatnachricht an eine ander Person im Netzwerk

**13 - Inbox anzeigen**<br>
Schaue dir deine Inbox, um Nachrichten anzusehen.

**14 - Welcher Beitrag hat die meisten likes?**<br>
Finde den Beitrag, welcher die meisten likes hat.


