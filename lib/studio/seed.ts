import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import type { Block, Post, StudioState, ActivityEvent } from "./types";

// The prototype's starting data. The three "waiting" posts are read from content/blog: real posts, approved and
// published on 9 Nov 2026, kept here as the demo drafts. Everything else is sample data, labelled as such.

const DIR = path.join(process.cwd(), "content", "blog");

export function toBlocks(md: string, prefix: string): Block[] {
  return marked
    .lexer(md.trim())
    .filter((t) => t.type !== "space")
    .map((t, i) => ({ id: `${prefix}-${i}`, md: t.raw.trim(), html: marked.parser([t] as never) as string }));
}

function readDraft(file: string) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)!;
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
  }
  return { slug: file.replace(/\.md$/, ""), meta, body: m[2] };
}

const daysAgo = (d: number, h = 9) => {
  const t = new Date();
  t.setDate(t.getDate() - d);
  t.setHours(h, 0, 0, 0);
  return t.toISOString();
};
const daysAhead = (d: number, h = 9) => daysAgo(-d, h);

const okChecks = (links: number) => [
  { id: "c-prices", label: "No prices, dates or delivery times promised", detail: "Nothing here commits you to a figure.", state: "ok" as const },
  { id: "c-links", label: `${links} links to your own pages, all working`, detail: "Checked against your live site.", state: "ok" as const },
  { id: "c-spell", label: "UK spelling, plain words", detail: "Reads at about age 12. No jargon.", state: "ok" as const },
];

const REAL: Record<string, Partial<Post>> = {
  "importing-from-china-first-steps": {
    signal: { query: "how to import from china to nigeria", impressions: 1240, clicks: 9, position: 14.2, note: "People search this often and your site has no page that answers it." },
    checks: [
      ...okChecks(2),
      { id: "c-claim", label: "Confirm: you handle every step from sourcing to delivery", detail: "The last paragraph says “we handle it from sourcing to delivery”. Is that true for every order?", state: "confirm" },
    ],
  },
  "how-to-buy-from-uk-stores-and-ship-abroad": {
    signal: { query: "uk personal shopper ship to nigeria", impressions: 610, clicks: 4, position: 11.8, note: "Close to page one. A clear post could move you up." },
    checks: [
      ...okChecks(1),
      { id: "c-claim", label: "Confirm: you check every item before shipping it on", detail: "Step 3 says “we check it arrived as ordered”. Is that done every time?", state: "confirm" },
    ],
  },
  "bulk-buying-for-small-businesses": {
    signal: { query: "wholesale disposable gloves supplier uk", impressions: 380, clicks: 6, position: 9.4, note: "You already appear for this. A post linking to Consumables Supply backs it up." },
    checks: [
      ...okChecks(2),
      { id: "c-claim", label: "Confirm: the four products named are ones you supply", detail: "It names bin bags, microfibre cloths, disposable gloves and disposable napkins.", state: "confirm" },
    ],
  },
};

const sample = (p: Partial<Post> & { id: string; title: string; summary: string; status: Post["status"]; md: string }): Post => ({
  slug: p.id,
  version: 1,
  comments: [],
  checks: okChecks(1),
  createdAt: daysAgo(12),
  ...p,
  blocks: toBlocks(p.md, p.id),
});

export function seedState(): StudioState {
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith(".md")) : [];
  const ready = [2, 1, 0];
  const real: Post[] = files.map((f, i) => {
    const d = readDraft(f);
    return {
      id: d.slug,
      slug: d.slug,
      title: d.meta.title ?? d.slug,
      summary: d.meta.summary ?? "",
      service: d.meta.service,
      status: "review",
      version: 1,
      blocks: toBlocks(d.body, d.slug),
      checks: okChecks(1),
      comments: [],
      createdAt: daysAgo(ready[i % 3] + 1),
      readyAt: daysAgo(ready[i % 3], 8),
      real: true,
      ...REAL[d.slug],
    };
  });

  const samples: Post[] = [
    sample({
      id: "sample-shipping-times",
      title: "Air or sea freight from China: which should you choose?",
      summary: "How to choose between air and sea for a first order, by cost, speed and size.",
      service: "purchasing-and-sourcing",
      status: "changes",
      version: 1,
      readyAt: daysAgo(4),
      changeNote: "Too long. Add a simple example with a small order.",
      md: "Most first orders from China travel by air or by sea.\n\n## Air\n\nFaster and dearer. Good for small, light or urgent orders.\n\n## Sea\n\nSlower and cheaper per item. Good for large or heavy orders.",
      signal: { query: "air or sea freight from china", impressions: 290, clicks: 2, position: 18.1, note: "Asked often by first-time importers." },
    }),
    sample({
      id: "sample-supplier-checks",
      title: "Five questions to ask a supplier before you pay",
      summary: "The questions that catch most bad suppliers before any money moves.",
      service: "purchasing-and-sourcing",
      status: "scheduled",
      version: 2,
      readyAt: daysAgo(6),
      scheduledFor: daysAhead(2),
      md: "Before you pay a new supplier, ask these five questions.\n\n1. Can you send a sample?\n2. Can I see your business licence?\n3. What are your payment terms?\n4. When will the goods be ready?\n5. Who do I talk to if something is wrong?",
    }),
    sample({
      id: "sample-uk-gifts",
      title: "Sending UK gifts home for the holidays",
      summary: "How to get UK gifts to family abroad in time.",
      service: "uk-personal-shopping",
      status: "published",
      version: 1,
      readyAt: daysAgo(20),
      publishedAt: daysAgo(18),
      md: "Holiday gifts from UK shops can reach family abroad in time if you start early.",
    }),
    sample({
      id: "sample-consumables-restock",
      title: "Never run out: restocking everyday consumables",
      summary: "A simple way to plan repeat orders of the things your business uses up.",
      service: "consumables-supply",
      status: "published",
      version: 1,
      readyAt: daysAgo(34),
      publishedAt: daysAgo(31),
      md: "Running out of gloves or bin bags stops work. Plan repeat orders around how fast you use them.",
    }),
    sample({
      id: "sample-idea-customs",
      title: "Customs duty on goods from China: what to expect",
      summary: "Suggested from search data. Not written yet.",
      status: "idea",
      md: "Not written yet.",
      signal: { query: "customs duty on goods from china nigeria", impressions: 870, clicks: 0, position: 31.5, note: "Searched often. You have no page on it, so you get no clicks." },
    }),
    sample({
      id: "sample-drafting-europe",
      title: "Buying from Europe: what to check first",
      summary: "Being written now.",
      status: "drafting",
      md: "Being written.",
      signal: { query: "wholesale suppliers in europe", impressions: 140, clicks: 1, position: 22.0, note: "Small but growing." },
    }),
  ];

  const activity: ActivityEvent[] = [
    { id: "a1", at: daysAgo(0, 8), who: "Content engine", postId: real[2]?.id, text: "Draft ready for you" },
    { id: "a2", at: daysAgo(1, 8), who: "Content engine", postId: real[1]?.id, text: "Draft ready for you" },
    { id: "a3", at: daysAgo(2, 8), who: "Content engine", postId: real[0]?.id, text: "Draft ready for you" },
    { id: "a4", at: daysAgo(3, 19), who: "Dorcas", postId: "sample-shipping-times", text: "Asked for changes: “Too long. Add a simple example with a small order.”" },
    { id: "a5", at: daysAgo(5, 12), who: "Dorcas", postId: "sample-supplier-checks", text: "Approved and scheduled" },
    { id: "a6", at: daysAgo(7, 7), who: "Content engine", text: "Weekly search check: 2 new topics suggested" },
    { id: "a7", at: daysAgo(18, 9), who: "Content engine", postId: "sample-uk-gifts", text: "Published and sent to Google" },
  ];

  return {
    posts: [...real, ...samples],
    activity,
    signedIn: false,
    settings: {
      notifyWhatsApp: true,
      notifyEmail: true,
      reminderAfterDays: 2,
      weeklySummary: true,
      rhythm: "1-week",
      publishDay: "Tuesday",
      publishTime: "09:00",
      houseRules: [
        "Never promise a delivery date or a price in a post",
        "Always link to the quote page at the end",
        "Say “we”, never “I”",
        "No client names without their written yes",
      ],
      failNextPublish: false,
    },
  };
}
