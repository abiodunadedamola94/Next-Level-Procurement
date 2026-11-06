// One place for Next Level Procurement's contact details and links.
// Details confirmed by Dorcas on 6 Nov 2026.
export const SITE_URL = "https://nextlevelprocurements.com";
export const SITE_NAME = "Next Level Procurement";
export const MOTTO = "Smarter Buying, Delivering Value.";

export const PHONE_DISPLAY = "+44 7346 485225";
export const PHONE_TEL = "+447346485225";
export const EMAIL = "link@nextlevelprocurements.com";

export const WHATSAPP_LINK = "https://wa.me/447346485225";

export const waLink = (text: string) =>
  `${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`;

export const QUOTE_LINK = waLink(
  "Hello Next Level Procurement, I'd like a quote. I need: "
);

// The Made in China StarterKit ($20). Until the sales link is added,
// the button opens WhatsApp with a ready message.
export const STARTERKIT_URL: string | null = null;
export const STARTERKIT_LINK =
  STARTERKIT_URL ?? waLink("Hello, I'd like the Made in China StarterKit ($20).");
