import type { QueryRow } from "./types";

// Sample Search Console rows (28 days). The engine would pull these weekly from her property.
export const sampleQueries: QueryRow[] = [
  { query: "next level procurement", clicks: 41, impressions: 120, position: 1.2, page: "/" },
  { query: "how to import from china to nigeria", clicks: 9, impressions: 1240, position: 14.2 },
  { query: "customs duty on goods from china nigeria", clicks: 0, impressions: 870, position: 31.5 },
  { query: "uk personal shopper ship to nigeria", clicks: 4, impressions: 610, position: 11.8, page: "/services/uk-personal-shopping" },
  { query: "wholesale disposable gloves supplier uk", clicks: 6, impressions: 380, position: 9.4, page: "/services/consumables-supply" },
  { query: "air or sea freight from china", clicks: 2, impressions: 290, position: 18.1 },
  { query: "made in china starter kit", clicks: 7, impressions: 95, position: 3.1, page: "/starter-kit" },
  { query: "how to pay chinese suppliers safely", clicks: 0, impressions: 520, position: 27.4 },
  { query: "personal shopper london to lagos", clicks: 1, impressions: 330, position: 16.9 },
  { query: "buy from turkey wholesale", clicks: 1, impressions: 140, position: 22.0 },
];

export const sampleTrend = [38, 42, 35, 51, 47, 58, 62, 55, 66, 71, 64, 79]; // weekly clicks, 12 weeks
