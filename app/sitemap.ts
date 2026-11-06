import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { services } from "@/lib/services";
import { allPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = allPosts();
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: now, priority: 0.9 },
    ...services.map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, lastModified: now, priority: 0.9 })),
    { url: `${SITE_URL}/starter-kit`, lastModified: now, priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, priority: 0.7 },
    { url: `${SITE_URL}/quote`, lastModified: now, priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, priority: 0.6 },
  ];
  if (posts.length) {
    pages.push({ url: `${SITE_URL}/blog`, lastModified: now, priority: 0.6 });
    for (const p of posts) pages.push({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 });
  }
  return pages;
}
