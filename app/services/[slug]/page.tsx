import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { PrimaryLink, WhatsAppLink } from "@/components/Buttons";
import { services, getService, starterKit } from "@/lib/services";
import { allPosts } from "@/lib/blog";
import { SITE_URL, SITE_NAME, waLink } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.seoTitle,
    description: s.seoDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.seoTitle, description: s.seoDescription, url: `/services/${s.slug}` },
  };
}

const steps = [
  { n: "01", t: "Tell us what you need", d: "On WhatsApp or with the quote form." },
  { n: "02", t: "We source and buy", d: "We find the right product at a competitive price." },
  { n: "03", t: "We ship it", d: "We coordinate the shipping and keep you updated." },
  { n: "04", t: "It reaches you", d: "Delivery support until it arrives." },
];

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = allPosts().filter((p) => p.service === s.slug).slice(0, 3);
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            description: s.seoDescription,
            provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
            url: `${SITE_URL}/services/${s.slug}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
              { "@type": "ListItem", position: 3, name: s.title, item: `${SITE_URL}/services/${s.slug}` },
            ],
          },
        ]}
      />
      <PageHeader
        eyebrow="Services"
        title={s.title}
        lead={s.short}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.title }]}
      >
        <PrimaryLink href="/quote">Request a quote</PrimaryLink>
        <WhatsAppLink href={waLink(s.quoteText)}>{s.ctaLabel}</WhatsAppLink>
      </PageHeader>

      <section className="section-padding">
        <div className="container mx-auto max-w-5xl grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
            {s.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside className="p-8 rounded-xl bg-card border border-border h-fit">
            <h2 className="font-heading font-semibold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Who it&apos;s for
            </h2>
            <ul className="space-y-2">
              {s.whoFor.map((w) => (
                <li key={w} className="flex items-start gap-3 text-foreground text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-padding bg-surface border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">What&apos;s included</h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {s.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border text-foreground">
                <Check size={20} className="text-teal shrink-0 mt-0.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-8">How it works</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((st) => (
              <li key={st.n} className="p-6 rounded-xl border border-border bg-card">
                <span className="font-mono text-teal text-sm">{st.n}</span>
                <h3 className="font-heading font-semibold text-foreground mt-3 mb-2">{st.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{st.d}</p>
              </li>
            ))}
          </ol>

          {s.slug === "purchasing-and-sourcing" && (
            <Link
              href="/starter-kit"
              className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-teal/5 border border-teal/20 hover:border-teal/40 transition-colors"
            >
              <span>
                <span className="block font-heading font-semibold text-foreground">
                  Want to import from China yourself?
                </span>
                <span className="text-muted-foreground text-sm">
                  The {starterKit.title} shows you how. {starterKit.price}.
                </span>
              </span>
              <span className="inline-flex items-center gap-2 text-teal font-semibold text-sm shrink-0">
                See the StarterKit <ArrowRight size={16} />
              </span>
            </Link>
          )}

          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="font-heading font-bold text-xl text-foreground mb-4">Related reading</h2>
              <ul className="space-y-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="text-teal hover:text-teal-light">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-14">
            <h2 className="font-heading font-semibold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Other services
            </h2>
            <div className="flex flex-wrap gap-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/services/${o.slug}`}
                  className="inline-flex items-center min-h-11 px-4 rounded-full border border-border text-sm text-foreground hover:border-teal/50 hover:text-teal transition-colors"
                >
                  {o.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
