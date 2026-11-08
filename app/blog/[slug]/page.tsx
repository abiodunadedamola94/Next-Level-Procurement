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
      <article className="section">
        <div className="wrap grid lg:grid-cols-[200px_minmax(0,68ch)] gap-10 lg:gap-16 justify-center">
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-6">
              <div>
                <p className="mono-label text-muted">Published</p>
                <p className="mt-1 font-medium">{formatDate(p.date)}</p>
              </div>
              {service && (
                <div>
                  <p className="mono-label text-muted">Service</p>
                  <Link href={`/services/${service.slug}`} className="mt-1 inline-block font-medium text-teal-text underline underline-offset-4 hover:text-text">
                    {service.title}
                  </Link>
                </div>
              )}
              <span aria-hidden="true" className="block w-10 h-1 bg-gold" />
            </div>
          </aside>
          <div className="min-w-0">
            <div className="prose-nlp" dangerouslySetInnerHTML={{ __html: p.html }} />
            {service && (
              <Link
                href={`/services/${service.slug}`}
                className="group mt-14 flex items-center justify-between gap-4 p-7 rounded-[8px] bg-ink text-white border border-ink hover:border-teal transition-colors"
              >
                <span>
                  <span className="block mono-label text-teal mb-2">Related service</span>
                  <span className="text-[22px] font-semibold tracking-tight">{service.title}</span>
                </span>
                <ArrowRight size={20} className="text-teal shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
