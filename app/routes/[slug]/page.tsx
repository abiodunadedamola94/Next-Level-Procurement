import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import StepsRail from "@/components/StepsRail";
import StarterKitBand from "@/components/StarterKitBand";
import { Waybill, ServiceCards } from "@/components/Waybill";
import { PrimaryLink, WhatsAppLink, LineLink } from "@/components/Buttons";
import { routes, getRoute } from "@/lib/routes";
import { getService } from "@/lib/services";
import { allPosts, isDraft } from "@/lib/blog";
import { SITE_URL, waLink } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = getRoute(slug);
  if (!r) return {};
  const title = `${r.title} | Next Level Procurement`;
  return { title, description: r.lead, alternates: { canonical: `/routes/${r.slug}` }, openGraph: { title, description: r.lead, url: `/routes/${r.slug}` } };
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = getRoute(slug);
  if (!r) notFound();
  const index = routes.findIndex((o) => o.slug === r.slug);
  const guide = r.guide ? allPosts().find((p) => p.slug === r.guide) : undefined;
  const others = routes.filter((o) => o.slug !== r.slug);
  const label = r.name === "the UK" ? "The UK" : r.name;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Where we buy", item: `${SITE_URL}/routes` },
            { "@type": "ListItem", position: 3, name: `Buy from ${label}`, item: `${SITE_URL}/routes/${r.slug}` },
          ],
        }}
      />
      <PageHeader
        eyebrow={`Where we buy · ${r.code}`}
        title={r.title}
        lead={r.lead}
        crumbs={[{ label: "Home", href: "/" }, { label: "Where we buy", href: "/routes" }, { label: label }]}
        aside={
          <Waybill
            meta={`Route 0${index + 1} / 0${routes.length}`}
            title={`${label} → you`}
            rows={[
              { k: "Origin", v: label },
              { k: "Deliver to", v: "The UK, Nigeria or elsewhere" },
              { k: "Service", v: r.services.map((s) => getService(s)?.title).filter(Boolean).join(", ") },
              { k: "Quote", v: "Per order, on WhatsApp" },
            ]}
          />
        }
      >
        <PrimaryLink href={`/quote?from=${encodeURIComponent(label === "The UK" ? "UK" : label)}#form`}>Request a quote</PrimaryLink>
        <WhatsAppLink href={waLink(r.quoteText)}>Ask on WhatsApp</WhatsAppLink>
      </PageHeader>

      <section className="section">
        <div className="wrap grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          <Reveal className="lg:sticky lg:top-32">
            <p className="mono-label !text-[12px] text-teal-text">What we handle</p>
            <h2 className="mt-5 text-[clamp(30px,3.4vw,46px)]">You tell us what you need. We do the rest.</h2>
            <p className="mt-5 text-muted text-[18px] max-w-[28em]">
              From finding the supplier to the day it arrives, one team looks after your order from {label === "The UK" ? "the UK" : label}.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[8px] border border-line bg-white overflow-hidden">
            <h3 className="mono-label !text-[12px] text-muted px-6 py-4 bg-paper border-b border-line flex justify-between font-normal tracking-[0.08em]">
              <span>Included</span>
              <span>{String(r.points.length).padStart(2, "0")} items</span>
            </h3>
            <ul>
              {r.points.map((p, i) => (
                <li key={p} className="grid grid-cols-[40px_1fr_auto] gap-3 items-center px-6 py-5 border-t first:border-t-0 border-line">
                  <span className="mono-label !text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[17px]">{p}</span>
                  <Check size={18} className="text-teal-text" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-[760px] mb-12">
            <p className="mono-label !text-[12px] text-teal-text">Services on this route</p>
            <h2 className="mt-5 text-[clamp(30px,3.4vw,46px)]">How we can help.</h2>
          </Reveal>
          <ServiceCards slugs={r.services} />
          <div className="mt-20">
            <p className="mono-label !text-[12px] text-teal-text mb-10">How it works</p>
            <StepsRail />
          </div>
        </div>
      </section>

      {r.slug === "china" && (
        <section className="pt-[clamp(64px,8vw,112px)]">
          <StarterKitBand />
        </section>
      )}

      <section className="section !pt-[clamp(64px,8vw,112px)]">
        <div className="wrap grid lg:grid-cols-2 gap-12">
          {guide && (
            <div>
              <h2 className="mono-label !text-[12px] text-muted mb-5">Read first</h2>
              <Link href={`/blog/${guide.slug}`} className="group flex items-center justify-between gap-4 py-5 border-y border-line text-[20px] tracking-tight hover:text-teal-text transition-colors">
                <span>
                  {guide.title}
                  {isDraft(guide) && <span className="ml-2 align-middle mono-label !text-[10px] text-[#6b5114]">Draft</span>}
                </span>
                <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          )}
          <div>
            <h2 className="mono-label !text-[12px] text-muted mb-5">Other markets</h2>
            <ul className="border-t border-line">
              {others.map((o) => (
                <li key={o.slug} className="border-b border-line">
                  <Link href={`/routes/${o.slug}`} className="group grid grid-cols-[56px_1fr_auto] items-center gap-4 py-4 text-[18px] hover:text-teal-text transition-colors">
                    <span className="font-mono text-[12px] tracking-[0.06em] text-muted">{o.code}</span>
                    Buy from {o.name}
                    <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <LineLink href="/routes">All markets</LineLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title={`Buying from ${label === "The UK" ? "the UK" : label}?`} em="Send us the details." photo={r.slug === "uk" ? "/photos/ship.webp" : "/photos/containers.webp"} />
    </>
  );
}
