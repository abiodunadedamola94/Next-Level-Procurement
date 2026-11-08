import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import StepsRail from "@/components/StepsRail";
import { Waybill, ServiceCards } from "@/components/Waybill";
import { PrimaryLink, WhatsAppLink } from "@/components/Buttons";
import { audiences, getAudience } from "@/lib/audiences";
import { WHATSAPP_LINK } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return audiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getAudience(slug);
  if (!a) return {};
  const title = `For ${a.title} | Next Level Procurement`;
  return { title, description: a.lead, alternates: { canonical: `/for/${a.slug}` }, openGraph: { title, description: a.lead, url: `/for/${a.slug}` } };
}

export default async function AudiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAudience(slug);
  if (!a) notFound();
  const others = audiences.filter((o) => o.slug !== a.slug);

  return (
    <>
      <PageHeader
        eyebrow={`Who we serve · ${a.title}`}
        title={a.title === "Individuals and buyers abroad" ? "Buying from the UK, from wherever you are" : `A buying team for ${a.title.toLowerCase()}`}
        lead={a.lead}
        crumbs={[{ label: "Home", href: "/" }, { label: "Who we serve", href: "/for" }, { label: a.title }]}
        aside={
          <Waybill
            meta="Sample order · Example"
            title={`${a.example.what}, ${a.example.qty}`}
            rows={[
              { k: "From", v: a.example.from },
              { k: "To", v: a.example.to },
              { k: "Checked", v: "Supplier, price, quality" },
              { k: "Status", v: "Delivered" },
            ]}
            note="Illustrative example of an order like yours."
          />
        }
      >
        <PrimaryLink href="/quote">Request a quote</PrimaryLink>
        <WhatsAppLink href={WHATSAPP_LINK}>Ask on WhatsApp</WhatsAppLink>
      </PageHeader>

      <section className="section">
        <div className="wrap">
          <Reveal className="max-w-[760px] mb-12">
            <p className="mono-label !text-[12px] text-teal-text">What changes</p>
            <h2 className="mt-5 text-[clamp(30px,3.4vw,46px)]">What gets in the way, and what we take off your desk.</h2>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-4">
            <Reveal className="rounded-[8px] border border-line bg-white p-7 md:p-10">
              <p className="mono-label !text-[12px] text-muted">What gets in the way</p>
              <ul className="mt-6">
                {a.needs.map((n) => (
                  <li key={n} className="flex items-start justify-between gap-4 py-4 border-t border-line text-[17px] text-muted">
                    {n}
                    <X size={18} aria-hidden="true" className="text-[#b42318] mt-1 shrink-0" />
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="relative rounded-[8px] bg-ink text-white p-7 md:p-10 overflow-hidden">
              <p className="mono-label !text-[12px] text-teal">What we do for you</p>
              <ul className="mt-6">
                {a.help.map((h) => (
                  <li key={h} className="flex items-start justify-between gap-4 py-4 border-t border-ink-line text-[17px]">
                    {h}
                    <Check size={18} aria-hidden="true" className="text-teal mt-1 shrink-0" />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-[760px] mb-12">
            <p className="mono-label !text-[12px] text-teal-text">Services for you</p>
            <h2 className="mt-5 text-[clamp(30px,3.4vw,46px)]">Where to start.</h2>
          </Reveal>
          <ServiceCards slugs={a.services} />
          <div className="mt-20">
            <p className="mono-label !text-[12px] text-teal-text mb-10">How it works</p>
            <StepsRail />
          </div>
        </div>
      </section>

      <section className="section !pt-[clamp(64px,8vw,112px)]">
        <div className="wrap">
          <h2 className="mono-label !text-[12px] text-muted mb-5">Also built for</h2>
          <ul className="border-t border-line grid md:grid-cols-3 md:gap-8 md:border-t-0">
            {others.map((o) => (
              <li key={o.slug} className="border-b border-line md:border-t">
                <Link href={`/for/${o.slug}`} className="group flex items-center justify-between gap-4 py-5 text-[18px] hover:text-teal-text transition-colors">
                  {o.title}
                  <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand photo="/photos/warehouse.webp" />
    </>
  );
}
