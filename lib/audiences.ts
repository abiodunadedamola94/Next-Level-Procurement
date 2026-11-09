// Who Next Level Procurement serves, in Dorcas's words (About text, 6 Nov 2026):
// "individuals, small businesses, retailers, wholesalers and e-commerce businesses".
// The challenges are hers too: trustworthy suppliers, costs, quality, timely delivery.

export type Audience = {
  slug: string;
  title: string;
  short: string;
  lead: string;
  needs: string[];
  help: string[];
  services: string[];
  example: { what: string; qty: string; from: string; to: string }; // labelled illustrative
};

export const audiences: Audience[] = [
  {
    slug: "small-businesses",
    title: "Small businesses",
    short: "Reliable suppliers and stock, without running the buying yourself.",
    lead: "You need stock you can rely on, at a fair price, without spending your week chasing suppliers. We become your buying team.",
    needs: ["Finding trustworthy suppliers", "Managing costs", "Maintaining product quality", "Ensuring timely delivery"],
    help: [
      "Supplier sourcing, negotiation and management",
      "Bulk purchasing at competitive prices",
      "Quality inspection",
      "Basic consumables for the business",
      "Order tracking, shipping coordination and delivery support",
    ],
    services: ["purchasing-and-sourcing", "consumables-supply"],
    example: { what: "Microfibre cloths", qty: "50 packs", from: "UK", to: "Your shop" },
  },
  {
    slug: "retailers-and-wholesalers",
    title: "Retailers and wholesalers",
    short: "Bulk purchasing from the UK, China, Europe and Africa.",
    lead: "Buying in volume means the supplier, the price and the quality all matter more. We source in bulk and manage it from supplier to your shelves.",
    needs: ["Finding trustworthy suppliers", "Managing costs", "Maintaining product quality", "Ensuring timely delivery"],
    help: [
      "Bulk purchasing for retailers and wholesalers",
      "Supplier sourcing, negotiation and management",
      "China and EU importation to the UK, Nigeria and other destinations",
      "Quality inspection",
      "Order tracking, shipping coordination and delivery support",
    ],
    services: ["purchasing-and-sourcing"],
    example: { what: "Disposable gloves", qty: "200 cartons", from: "China", to: "Lagos" },
  },
  {
    slug: "ecommerce-businesses",
    title: "E-commerce businesses",
    short: "Product sourcing and importation for online sellers.",
    lead: "Your store is only as good as the products in it. We find suppliers, check quality and bring stock to you, so you can focus on selling.",
    needs: ["Finding trustworthy suppliers", "Maintaining product quality", "Managing costs", "Ensuring timely delivery"],
    help: [
      "Global product sourcing and procurement",
      "Supplier sourcing, negotiation and management",
      "Quality inspection",
      "China and EU importation",
      "Order tracking, shipping coordination and delivery support",
    ],
    services: ["purchasing-and-sourcing"],
    example: { what: "Phone accessories", qty: "1,000 units", from: "China", to: "UK" },
  },
  {
    slug: "buyers-abroad",
    title: "Individuals and buyers abroad",
    short: "Buy from UK stores and have it sent to your country.",
    lead: "Whether you are buying one item for personal use or many, we buy from the UK for you and send it to your country.",
    needs: ["Buying from stores that do not ship to you", "Knowing the goods are genuine", "Getting it delivered safely"],
    help: [
      "Personal shopping and purchasing from the UK",
      "Shipping to your country",
      "Order tracking, shipping coordination and delivery support",
    ],
    services: ["uk-personal-shopping", "consumables-supply"],
    example: { what: "School uniforms", qty: "3 sets", from: "UK", to: "Abuja" },
  },
];

export const getAudience = (slug: string) => audiences.find((a) => a.slug === slug);
