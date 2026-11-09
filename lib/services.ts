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

export const SOURCE_MARKETS = ["the UK", "China", "Europe", "Africa"];

export const services: Service[] = [
  {
    slug: "purchasing-and-sourcing",
    title: "Purchasing and Sourcing",
    short:
      "From anywhere in the world to anywhere, including importation from China.",
    seoTitle: "Sourcing and China Importation | Next Level Procurement",
    seoDescription:
      "We source quality products at competitive prices from the UK, China, Europe, Africa and other markets, and manage the process from sourcing to delivery.",
    intro: [
      "We source quality products at competitive prices from the UK, China, Europe, Africa and other global markets, from anywhere in the world to anywhere.",
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
    seoTitle: "UK Personal Shopping, Shipped to You | Next Level Procurement",
    seoDescription:
      "Based outside the UK and want to shop from UK stores or retailers? We purchase on your behalf and arrange delivery directly to your country.",
    intro: [
      "Based outside the UK and want to shop from UK stores or retailers? We purchase on your behalf and arrange delivery directly to your country.",
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
    seoTitle: "Consumables: Gloves, Bin Bags, Cloths | Next Level Procurement",
    seoDescription:
      "We supply businesses and individuals with basic consumables like bin bags, microfibre cloths, disposable gloves and disposable napkins.",
    intro: [
      "We provide businesses and individuals with a reliable supply of everyday essential consumables to support their daily operations and needs.",
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

// The StarterKit as sold on Payhip (https://payhip.com/b/8OPgJ, read 9 Nov 2026). Name, price, format and
// contents are copied from that page, so the site and the shop agree. If she changes the Payhip page,
// change this too.
export const starterKit = {
  title: "Made in China Importation StarterKit",
  price: "$20",
  priceValue: "20",
  currency: "USD",
  format: "39-page PDF, instant download",
  author: "Written by Dorcas Kareem, founder of Next Level Procurement",
  short: "The plain-English guide to sourcing, paying, shipping and clearing goods from China.",
  pitch: "Want to source from China yourself? Our Made in China Importation StarterKit provides practical, step-by-step guidance to help you get started.",
  seoTitle: "Made in China Importation StarterKit | Next Level Procurement",
  seoDescription:
    "The plain-English guide to sourcing, paying, shipping and clearing goods from China. A 39-page PDF for $20, by Next Level Procurement.",
  intro:
    "China can be one of the best places to source products, but a cheap unit price does not automatically mean a profitable purchase. This starter kit shows you how to find the right suppliers, protect your payment, check quality and bring the goods home at a landed cost you have worked out in advance.",
  contents: [
    "Where to source: Alibaba, 1688, Pinduoduo, Taobao and more than ten other sites and markets",
    "How to order from China, step by step",
    "WeChat explained, and why you never pay a supplier on chat",
    "Alipay: how to connect it, pay on 1688 from the UK and get yuan",
    "1688 ordering, including how to enter your shipping address field by field",
    "Sea, air, rail and express compared, with typical costs",
    "Shipping fee, volumetric weight and CBM calculators with worked examples",
    "UK customs: EORI, commodity codes, duty, VAT and a full landed-cost example",
    "Refunds and complaints on 1688, with the Chinese words you will see on screen",
    "50 shipping companies to know and a 10-point supplier check",
    "Starter supplier contacts, scorecards, checklists and a glossary",
  ],
  whoFor: "Beginners, online sellers, boutiques, small businesses and anyone who wants to import without learning it the expensive way.",
  notFor: "Anyone looking for a guaranteed profit, legal or tax advice, or a list of suppliers that never changes.",
};
