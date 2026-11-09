import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { services } from "@/lib/services";
import { allPosts, publishedPosts } from "@/lib/blog";
import { routes } from "@/lib/routes";
import { audiences } from "@/lib/audiences";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: now, priority: 0.9 },
    ...services.map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, lastModified: now, priority: 0.9 })),
    { url: `${SITE_URL}/routes`, lastModified: now, priority: 0.8 },
    ...routes.map((r) => ({ url: `${SITE_URL}/routes/${r.slug}`, lastModified: now, priority: 0.8 })),
    { url: `${SITE_URL}/for`, lastModified: now, priority: 0.7 },
    ...audiences.map((a) => ({ url: `${SITE_URL}/for/${a.slug}`, lastModified: now, priority: 0.7 })),
    { url: `${SITE_URL}/how-it-works`, lastModified: now, priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: now, priority: 0.6 },
    { url: `${SITE_URL}/starter-kit`, lastModified: now, priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, priority: 0.7 },
    { url: `${SITE_URL}/quote`, lastModified: now, priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, priority: 0.6 },
    { url: `${SITE_URL}/reviews`, lastModified: now, priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: now, priority: 0.2 },
  ];
  if (allPosts().length) pages.push({ url: `${SITE_URL}/blog`, lastModified: now, priority: 0.6 });
  // Drafts show on the site but are not offered to Google until they are published.
  for (const p of publishedPosts()) pages.push({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 });
  return pages;
}
