// The three areas Next Level Procurement serves, and the StarterKit.
// Wording comes from Dorcas: her 6 Nov 2026 answer and her new About text.
// Nothing here promises more than she has said.

export type Service = {
  slug: string;
  title: string;
  short: string; // one line for cards
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  whoFor: string[];
  includes: string[];
  quoteText: string; // pre-written WhatsApp message
  ctaLabel: string;
};

export const SOURCE_MARKETS = ["the UK", "China", "Europe", "Turkey", "Africa"];

export const services: Service[] = [
  {
    slug: "purchasing-and-sourcing",
    title: "Purchasing and Sourcing",
    short:
      "From anywhere in the world to anywhere, including importation from China.",
    seoTitle: "Purchasing, Sourcing and China Importation | Next Level Procurement",
    seoDescription:
      "We source quality products at competitive prices from the UK, China, Europe, Turkey, Africa and other markets, and manage the process from sourcing to delivery.",
    intro: [
      "We source quality products at competitive prices from the UK, China, Europe, Turkey, Africa and other global markets, from anywhere in the world to anywhere.",
      "Whether you need reliable suppliers for your business, bulk product sourcing or international importation, we help you find the right products and manage the process from sourcing to delivery.",
    ],
    whoFor: [
      "Small businesses",
      "Retailers and wholesalers",
      "E-commerce businesses",
      "Individuals buying for themselves",
    ],
    includes: [
      "Global product sourcing and procurement",
      "China and EU importation to the UK, Nigeria and other destinations",
      "Supplier sourcing, negotiation and management",
      "Bulk purchasing for retailers, wholesalers and small businesses",
      "Quality inspection",
      "Order tracking, shipping coordination and delivery support",
    ],
    quoteText:
      "Hello Next Level Procurement, I'd like a quote for sourcing. I need: ",
    ctaLabel: "Request a sourcing quote",
  },
  {
    slug: "uk-personal-shopping",
    title: "Personal Shopping from the UK",
    short:
      "For clients abroad who want to buy from the UK and have it sent to their country.",
    seoTitle: "Personal Shopping from the UK, Shipped to You | Next Level Procurement",
    seoDescription:
      "Live outside the UK and want to buy from UK stores? We buy for you in the UK and send it to your country, from one item to many.",
    intro: [
      "If you live outside the UK and want to buy from UK stores, we buy for you and send it to your country.",
      "Whether you are buying one item for personal use or many, we handle the purchase, shipping coordination and delivery support.",
    ],
    whoFor: [
      "Individuals abroad buying from the UK",
      "Businesses abroad buying UK products",
    ],
    includes: [
      "Personal shopping and purchasing from the UK",
      "Shipping to your country",
      "Order tracking, shipping coordination and delivery support",
    ],
    quoteText:
      "Hello, I'd like to buy from the UK and have it sent to me. I need: ",
    ctaLabel: "Ask about personal shopping",
  },
  {
    slug: "consumables-supply",
    title: "Consumables Supply",
    short: "Basic consumables for businesses and individuals.",
    seoTitle: "Consumables Supply: Bin Bags, Gloves, Microfibre Cloths | Next Level Procurement",
    seoDescription:
      "We supply businesses and individuals with basic consumables like bin bags, microfibre cloths, disposable gloves and disposable napkins.",
    intro: [
      "We supply businesses and individuals with the basic consumables they use every day.",
    ],
    whoFor: ["Businesses", "Individuals"],
    includes: [
      "Bin bags",
      "Microfibre cloths",
      "Disposable gloves",
      "Disposable napkins",
      "Other basic consumables: ask us",
    ],
    quoteText: "Hello, I'd like to order consumables. I need: ",
    ctaLabel: "Order consumables",
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);

export const starterKit = {
  title: "Made in China StarterKit",
  price: "$20",
  priceValue: "20",
  currency: "USD",
  short: "Training on how to import from China.",
  seoTitle: "Made in China StarterKit: Learn to Import from China | Next Level Procurement",
  seoDescription:
    "The Made in China StarterKit is our training on how to import from China. $20.",
};
