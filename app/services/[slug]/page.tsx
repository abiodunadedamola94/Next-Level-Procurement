import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import StepsRail from "@/components/StepsRail";
import StarterKitBand from "@/components/StarterKitBand";
import { PrimaryLink, WhatsAppLink } from "@/components/Buttons";
import { services, getService } from "@/lib/services";
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

// The service sheet shown beside the header: a waybill summary of the page.
function ServiceSheet({ i, title, whoFor }: { i: number; title: string; whoFor: string[] }) {
  return (
    <div className="rounded-[22px] border border-ink-line bg-ink-2 p-6 md:p-7 shadow-[0_40px_80px_-40px_rgba(0,0,0,.85)]">
      <div className="flex justify-between mono-label !text-[11.5px] text-muted-dark">
        <span>Service sheet</span>
        <span>
          {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-3 text-[21px] font-semibold tracking-tight">{title}</p>
      <p className="mt-6 mono-label !text-[11.5px] text-teal">Who it&apos;s for</p>
      <ul className="mt-2">
        {whoFor.map((w) => (
          <li key={w} className="flex items-center gap-3 py-3 border-t first:border-t-0 border-ink-line text-[15px]">
            <Check size={16} className="text-teal shrink-0" aria-hidden="true" />
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const index = services.findIndex((o) => o.slug === s.slug);

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
        eyebrow={`Service ${String(index + 1).padStart(2, "0")}`}
        title={s.title}
        lead={s.short}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: s.title }]}
        aside={<ServiceSheet i={index} title={s.title} whoFor={s.whoFor} />}
      >
        <PrimaryLink href="/quote">Request a quote</PrimaryLink>
        <WhatsAppLink href={waLink(s.quoteText)}>Ask on WhatsApp</WhatsAppLink>
      </PageHeader>

      {/* Intro + what's included */}
      <section className="section">
        <div className="wrap grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          <Reveal className="lg:sticky lg:top-32">
            <p className="mono-label text-teal-text">Overview</p>
            <div className="mt-5 space-y-5">
              {s.intro.map((p, i) => (
                <p key={p} className={i === 0 ? "text-[clamp(22px,2.2vw,28px)] leading-snug tracking-tight font-medium" : "text-muted text-[18px]"}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[22px] border border-line bg-white overflow-hidden">
              <h2 className="mono-label !text-[12px] text-muted px-6 py-4 bg-paper border-b border-line flex justify-between font-normal tracking-[0.08em]">
                <span>What&apos;s included</span>
                <span>{String(s.includes.length).padStart(2, "0")} items</span>
              </h2>
              <ul>
                {s.includes.map((item, i) => (
                  <li key={item} className="grid grid-cols-[40px_1fr_auto] gap-3 items-center px-6 py-5 border-t first:border-t-0 border-line">
                    <span className="mono-label !text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[17px]">{item}</span>
                    <Check size={18} className="text-teal-text" aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-[760px] mb-16">
            <p className="mono-label text-teal-text">How it works</p>
            <h2 className="mt-5 text-[clamp(32px,4vw,52px)]">Four steps, one team.</h2>
          </Reveal>
          <StepsRail />
        </div>
      </section>

      {s.slug === "purchasing-and-sourcing" && (
        <section className="pt-[clamp(64px,8vw,112px)]">
          <StarterKitBand />
        </section>
      )}

      <section className="section !pt-[clamp(64px,8vw,112px)]">
        <div className="wrap grid lg:grid-cols-2 gap-12">
          {related.length > 0 && (
            <div>
              <h2 className="mono-label text-muted mb-5">Related reading</h2>
              <ul className="border-t border-line">
                {related.map((p) => (
                  <li key={p.slug} className="border-b border-line">
                    <Link href={`/blog/${p.slug}`} className="group flex items-center justify-between gap-4 py-5 text-[18px] font-medium hover:text-teal-text transition-colors">
                      {p.title}
                      <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h2 className="mono-label text-muted mb-5">Other services</h2>
            <ul className="border-t border-line">
              {others.map((o) => (
                <li key={o.slug} className="border-b border-line">
                  <Link href={`/services/${o.slug}`} className="group flex items-center justify-between gap-4 py-5 text-[18px] font-medium hover:text-teal-text transition-colors">
                    <span>
                      {o.title}
                      <span className="block text-[15px] font-normal text-muted mt-1">{o.short}</span>
                    </span>
                    <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
