/**
 * PRODUKTE VON MADAN
 * ---------------------------------------------------------------
 * Hier trägt ihr neue Produkte ein — kein Programmieren nötig.
 * Einfach ein neues { ... } Objekt in die Liste kopieren und ausfüllen,
 * dann Datei speichern und per "git push" hochladen.
 *
 * Felder:
 *   id          eindeutiger Kurzname, nur Kleinbuchstaben/Bindestriche
 *   name        Produktname, wie er auf der Karte & im Detail steht
 *   tagline     kurzer Satz, erscheint auf der Karte in der Übersicht
 *   description längerer Beschreibungstext für die Detailansicht
 *               (Zeilenumbrüche im Text werden übernommen)
 *   price       optional, z. B. "ab 29 €/Monat" — leer lassen falls nicht relevant
 *   image       optional, Bild-URL oder Pfad zu einer Bilddatei im Projekt
 *               — leer lassen ("") falls kein Bild vorhanden
 * ---------------------------------------------------------------
 */
 
window.PRODUCTS = [
  {
    id: "madan-core",
    name: "MADAN Core",
    tagline: "Das Fundament — schnell eingerichtet, einfach erweiterbar.",
    description:
      "MADAN Core ist unser Basisprodukt. Es bildet die Grundlage für alle weiteren MADAN-Werkzeuge und lässt sich in wenigen Minuten einrichten.\n\nBeispieltext — bitte durch eure echte Produktbeschreibung ersetzen.",
    price: "",
    image: "",
  },
  {
    id: "madan-flow",
    name: "MADAN Flow",
    tagline: "Abläufe automatisieren, ohne den Überblick zu verlieren.",
    description:
      "MADAN Flow hilft dabei, wiederkehrende Aufgaben zu automatisieren und Prozesse übersichtlich darzustellen.\n\nBeispieltext — bitte durch eure echte Produktbeschreibung ersetzen.",
    price: "",
    image: "",
  },
  {
    id: "madan-pulse",
    name: "MADAN Pulse",
    tagline: "Alle wichtigen Kennzahlen auf einen Blick.",
    description:
      "MADAN Pulse zeigt die wichtigsten Kennzahlen in Echtzeit und macht Entwicklungen sofort sichtbar.\n\nBeispieltext — bitte durch eure echte Produktbeschreibung ersetzen.",
    price: "",
    image: "",
  },
 
  // Neues Produkt? Beispiel zum Kopieren:
  // {
  //   id: "mein-neues-produkt",
  //   name: "Mein neues Produkt",
  //   tagline: "Ein Satz, der es auf den Punkt bringt.",
  //   description: "Ausführliche Beschreibung hier.",
  //   price: "",
  //   image: "",
  // },
];
