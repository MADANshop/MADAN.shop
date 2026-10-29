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
 *   images      Liste von Bild-Links (z. B. von imgbb.com), in der
 *               Reihenfolge, wie sie durchgeklickt werden sollen.
 *               Ein Bild reicht auch — einfach nur einen Link in die Liste.
 *               Leere Liste [] falls (noch) kein Bild vorhanden.
 *   etsyUrl     Link zum Etsy-Listing dieses Produkts, z. B.
 *               "https://www.etsy.com/de/listing/123456789/kabelkamm"
 *               — leer lassen ("") falls noch kein Listing existiert;
 *               im Warenkorb wird dann "Etsy-Link folgt" angezeigt
 * ---------------------------------------------------------------
 */

window.PRODUCTS = [
  {
    id: "kabelkamm-4er",
    name: "MADAN Kabelkamm 4er",
    category: "kabelmanagement",
    tagline: "Bis zu 4 Kabel sicher und sichtbar an Ort und Stelle.",
    description:
      "Der kompakte Kabelkamm sorgt für ein einfaches und stilvolles Kabelmanagement. Er fixiert bis zu 4 Kabel unterschiedlicher Stärke sicher an Ort und Stelle, verhindert Verheddern und hält deinen Schreibtisch dauerhaft aufgeräumt.\n\nWird unter der Tischplatte befestigt und bleibt dabei unauffällig im Hintergrund.",
    price: "6–11 €",
    images: [
      "https://i.ibb.co/6J4Q3C17/kabelkamm-foto-1.jpg",
      "https://i.ibb.co/m5q9BTzh/kabelkamm-foto-4-clip-grau.jpg",
      "https://i.ibb.co/67JY0Kdw/kabelkamm-foto-5-clip-holz.jpg",
      "https://i.ibb.co/rKNCC2gT/kabelkamm-technische-zeichnung.jpg",
    ],
    etsyUrl:
      "https://www.etsy.com/de/listing/4587126616/kabelhalter-kabelfuhrung-o-3d-gedruckter",
  },
  {
    id: "kabelkamm-6er",
    name: "MADAN Kabelkamm 6er",
    category: "kabelmanagement",
    tagline: "Bis zu 6 Kabel sicher und sichtbar an Ort und Stelle.",
    description:
      "Die größere Variante unseres Kabelkamms: fixiert bis zu 6 Kabel unterschiedlicher Stärke sicher an Ort und Stelle, verhindert Verheddern und hält deinen Schreibtisch dauerhaft aufgeräumt.\n\nWird unter der Tischplatte befestigt und bleibt dabei unauffällig im Hintergrund.",
    price: "",
    images: [
      "https://i.ibb.co/SD0BxMJR/kabelkamm-foto-neu.jpg",
      "https://i.ibb.co/FkGQL6jL/kabelkamm-foto-3.jpg",
    ],
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
  //   images: [],
  //   etsyUrl: "",
  // },
];
