import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

// Blog posts are Markdown files in content/blog with a small front-matter block.
// status: draft | approved | published. Only "published" posts appear on the site.
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

// SHOW_DRAFTS=1 (set on preview deployments only) lets Dorcas read drafts before approving them.
export function allPosts({ includeDrafts = process.env.SHOW_DRAFTS === "1" } = {}): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .filter((p) => includeDrafts || p.status === "published")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getPost = (slug: string) => allPosts().find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
