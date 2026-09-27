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
 *   category    eine von: "kabelmanagement", "merch", "sonstiges"
 *   tagline     kurzer Satz, erscheint auf der Karte in der Übersicht
 *   description längerer Beschreibungstext für die Detailansicht
 *               (Zeilenumbrüche im Text werden übernommen)
 *   price       optional, z. B. "9,90 €" — leer lassen falls nicht relevant
 *   image       optional, Pfad zu einer Bilddatei im Projekt, z. B.
 *               "assets/kabelkamm.jpg" — leer lassen ("") falls kein Bild vorhanden
 *   etsyUrl     Link zum Etsy-Listing dieses Produkts, z. B.
 *               "https://www.etsy.com/de/listing/123456789/kabelkamm"
 *               — leer lassen ("") falls noch kein Listing existiert;
 *               im Warenkorb wird dann "Etsy-Link folgt" angezeigt
 * ---------------------------------------------------------------
 */

window.PRODUCTS = [
  {
    id: "kabelkamm",
    name: "MADAN Kabelkamm",
    category: "kabelmanagement",
    tagline: "Bis zu 5 Kabel sicher und sichtbar an Ort und Stelle.",
    description:
      "Der kompakte Kabelkamm sorgt für ein einfaches und stilvolles Kabelmanagement. Er fixiert bis zu 5 Kabel unterschiedlicher Stärke sicher an Ort und Stelle, verhindert Verheddern und hält deinen Schreibtisch dauerhaft aufgeräumt.\n\nWird unter der Tischplatte befestigt und bleibt dabei unauffällig im Hintergrund.",
    price: "",
    image: "",
    etsyUrl: "",
  },

  // Neues Produkt? Beispiel zum Kopieren:
  // {
  //   id: "mein-neues-produkt",
  //   name: "Mein neues Produkt",
  //   category: "sonstiges", // "kabelmanagement" | "merch" | "sonstiges"
  //   tagline: "Ein Satz, der es auf den Punkt bringt.",
  //   description: "Ausführliche Beschreibung hier.",
  //   price: "",
  //   image: "",
  //   etsyUrl: "",
  // },
];
