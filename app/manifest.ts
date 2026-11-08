import type { MetadataRoute } from "next";

import { SITE_NAME, MOTTO } from "@/lib/site";

// What a phone shows when the site is saved to the home screen, and what browsers read for the name and colours.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "NLP",
    description: `${MOTTO} Sourcing and purchasing from anywhere, UK personal shopping, and consumables supply.`,
    start_url: "/",
    display: "standalone",
    background_color: "#121317",
    theme_color: "#121317",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
