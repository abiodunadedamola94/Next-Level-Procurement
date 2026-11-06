import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { allPosts, getPost, formatDate } from "@/lib/blog";
import { getService } from "@/lib/services";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = allPosts();
  // Next needs at least one entry for a static build; the placeholder 404s.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_none" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const title = `${p.title} | ${SITE_NAME}`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title, description: p.summary, url: `/blog/${p.slug}`, publishedTime: p.date },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const service = p.service ? getService(p.service) : undefined;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.summary,
          datePublished: p.date,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
          mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
        }}
      />
      <PageHeader
        eyebrow={formatDate(p.date)}
        title={p.title}
        lead={p.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: p.title }]}
      />
      <article className="section-padding">
        <div
          className="prose-nlp container mx-auto max-w-[68ch]"
          dangerouslySetInnerHTML={{ __html: p.html }}
        />
        {service && (
          <div className="container mx-auto max-w-[68ch] mt-12">
            <Link
              href={`/services/${service.slug}`}
              className="flex items-center justify-between gap-4 p-6 rounded-xl bg-teal/5 border border-teal/20 hover:border-teal/40 transition-colors"
            >
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">Related service</span>
                <span className="font-heading font-semibold text-foreground">{service.title}</span>
              </span>
              <ArrowRight size={18} className="text-teal shrink-0" />
            </Link>
          </div>
        )}
      </article>
      <CtaBand />
    </>
  );
}
