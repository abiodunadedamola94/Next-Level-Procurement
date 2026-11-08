// Where Next Level Procurement buys. Every line rests on Dorcas's own words:
// "the UK, China, Europe, Turkey, Africa and other global markets, from anywhere
// in the world to anywhere", "China and EU importation to the UK, Nigeria and
// other destinations". No transit times or prices: those are quoted per order.

export type Route = {
  slug: string;
  name: string; // "China"
  title: string; // page h1
  short: string; // one line for menus and cards
  lead: string;
  code: string; // three-letter label on the waybill
  pin: { lat: number; lng: number };
  services: string[]; // service slugs that apply
  points: string[];
  guide?: string; // blog slug
  quoteText: string;
};

export const routes: Route[] = [
  {
    slug: "china",
    name: "China",
    title: "Buy from China, delivered to you",
    short: "Sourcing and importation from Chinese suppliers.",
    lead: "We find suppliers in China, buy at an agreed price and manage importation to the UK, Nigeria and other destinations.",
    code: "CHN",
    pin: { lat: 23.1, lng: 113.3 },
    services: ["purchasing-and-sourcing"],
    points: [
      "Supplier sourcing, negotiation and management",
      "Bulk purchasing for retailers, wholesalers and small businesses",
      "Quality inspection",
      "China importation to the UK, Nigeria and other destinations",
      "Order tracking, shipping coordination and delivery support",
    ],
    guide: "importing-from-china-first-steps",
    quoteText: "Hello Next Level Procurement, I'd like to buy from China. I need: ",
  },
  {
    slug: "uk",
    name: "the UK",
    title: "Buy from the UK, sent to your country",
    short: "Personal shopping and sourcing from UK stores and suppliers.",
    lead: "Live outside the UK? We buy from UK stores for you and send it to your country, from one item to many. Businesses can source UK products the same way.",
    code: "GBR",
    pin: { lat: 51.5, lng: -0.1 },
    services: ["uk-personal-shopping", "purchasing-and-sourcing"],
    points: [
      "Personal shopping and purchasing from the UK",
      "Sourcing UK products for businesses abroad",
      "Shipping to your country",
      "Order tracking, shipping coordination and delivery support",
    ],
    guide: "how-to-buy-from-uk-stores-and-ship-abroad",
    quoteText: "Hello, I'd like to buy from the UK and have it sent to me. I need: ",
  },
  {
    slug: "europe",
    name: "Europe",
    title: "Buy from Europe, delivered to you",
    short: "Sourcing and EU importation for businesses and individuals.",
    lead: "We source quality products from European suppliers at competitive prices and manage EU importation to the UK, Nigeria and other destinations.",
    code: "EUR",
    pin: { lat: 50.1, lng: 8.7 },
    services: ["purchasing-and-sourcing"],
    points: [
      "Global product sourcing and procurement",
      "Supplier sourcing, negotiation and management",
      "Quality inspection",
      "EU importation to the UK, Nigeria and other destinations",
      "Order tracking, shipping coordination and delivery support",
    ],
    quoteText: "Hello Next Level Procurement, I'd like to buy from Europe. I need: ",
  },
  {
    slug: "turkey",
    name: "Turkey",
    title: "Buy from Turkey, delivered to you",
    short: "Sourcing from Turkish suppliers, shipped on to you.",
    lead: "We source products from suppliers in Turkey at competitive prices and coordinate shipping to wherever you need them.",
    code: "TUR",
    pin: { lat: 41.0, lng: 28.9 },
    services: ["purchasing-and-sourcing"],
    points: [
      "Global product sourcing and procurement",
      "Supplier sourcing, negotiation and management",
      "Quality inspection",
      "Order tracking, shipping coordination and delivery support",
    ],
    quoteText: "Hello Next Level Procurement, I'd like to buy from Turkey. I need: ",
  },
  {
    slug: "africa",
    name: "Africa",
    title: "Buy from Africa, delivered to you",
    short: "Sourcing from African suppliers and markets.",
    lead: "We source products from suppliers across Africa at competitive prices and coordinate shipping to wherever you need them.",
    code: "AFR",
    pin: { lat: -1.3, lng: 36.8 },
    services: ["purchasing-and-sourcing"],
    points: [
      "Global product sourcing and procurement",
      "Supplier sourcing, negotiation and management",
      "Quality inspection",
      "Order tracking, shipping coordination and delivery support",
    ],
    quoteText: "Hello Next Level Procurement, I'd like to buy from Africa. I need: ",
  },
];

export const getRoute = (slug: string) => routes.find((r) => r.slug === slug);
