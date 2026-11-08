import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Blog posts are Markdown files in content/blog with a small front-matter block.
// status: draft | approved | published. Drafts and approved posts show on the site with a
// "Draft" label (decided 8 Nov 2026) but stay out of Google: noindex, and not in the sitemap.
// Only "published" posts are indexed. HIDE_DRAFTS=1 hides unpublished posts completely.
// The content engine (if built) writes the same format.

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  service?: string;
  status: "draft" | "approved" | "published";
  html: string;
};

const DIR = path.join(process.cwd(), "content", "blog");

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Missing front matter in ${file}`);
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
  }
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title ?? "",
    date: meta.date ?? "",
    summary: meta.summary ?? "",
    service: meta.service || undefined,
    status: (meta.status as Post["status"]) ?? "draft",
    html: marked.parse(m[2], { async: false }) as string,
  };
}

export function allPosts({ includeDrafts = process.env.HIDE_DRAFTS !== "1" } = {}): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .filter((p) => includeDrafts || p.status === "published")
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Posts Google may index: published only. */
export const publishedPosts = () => allPosts({ includeDrafts: false });

export const isDraft = (p: Post) => p.status !== "published";

export const getPost = (slug: string) => allPosts().find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
