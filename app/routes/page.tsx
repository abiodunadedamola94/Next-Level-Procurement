import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import RouteMap from "@/components/home/RouteMap";
import { PrimaryLink, WhatsAppLink } from "@/components/Buttons";
import { routes } from "@/lib/routes";
import { WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Where We Buy: UK, China, Europe and Africa | Next Level Procurement",
  description:
    "We source and buy from the UK, China, Europe, Africa and other global markets, and deliver to the UK, Nigeria and other destinations.",
  alternates: { canonical: "/routes" },
};

export default function RoutesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Where we buy"
        title="Four markets. Delivered anywhere."
        lead="We source from the UK, China, Europe, Africa and other global markets, and deliver to the UK, Nigeria and other destinations."
        crumbs={[{ label: "Home", href: "/" }, { label: "Where we buy" }]}
      >
        <PrimaryLink href="/quote">Request a quote</PrimaryLink>
        <WhatsAppLink href={WHATSAPP_LINK}>Ask on WhatsApp</WhatsAppLink>
      </PageHeader>

      <section className="section" aria-labelledby="markets-title">
        <div className="wrap">
          <h2 id="markets-title" className="mono-label !text-[12px] text-muted mb-6">Choose a market</h2>
          <ul className="border-t border-line">
            {routes.map((r, i) => (
              <Reveal as="li" key={r.slug} delay={i * 0.05} className="border-b border-line">
                <Link
                  href={`/routes/${r.slug}`}
                  className="group grid grid-cols-[56px_1fr_auto] md:grid-cols-[80px_120px_1fr_1.2fr_auto] gap-4 md:gap-8 items-center py-7 md:py-9"
                >
                  <span className="mono-label !text-[11px] text-muted">0{i + 1}</span>
                  <span className="hidden md:block font-mono text-[28px] tracking-[-0.03em] text-transparent [-webkit-text-stroke:1px_#9aa2ab] group-hover:text-text transition-colors duration-500">
                    {r.code}
                  </span>
                  <span className="text-[clamp(24px,2.6vw,34px)] tracking-[-0.03em] leading-tight">Buy from {r.name}</span>
                  <span className="hidden md:block text-muted text-[16px]">{r.short}</span>
                  <span className="grid place-items-center w-11 h-11 rounded-full border border-line group-hover:bg-ink group-hover:border-ink group-hover:text-white transition-colors duration-300">
                    <ArrowRight size={18} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <RouteMap n={null} />
      <CtaBand photo="/photos/ship.webp" />
    </>
  );
}
