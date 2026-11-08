import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, Check, GraduationCap } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { PrimaryLink, WhatsAppLink } from "@/components/Buttons";
import { starterKit } from "@/lib/services";
import { SITE_URL, SITE_NAME, STARTERKIT_LINK, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: starterKit.seoTitle,
  description: starterKit.seoDescription,
  alternates: { canonical: "/starter-kit" },
  openGraph: { title: starterKit.seoTitle, description: starterKit.seoDescription, url: "/starter-kit" },
};

function PriceCard() {
  return (
    <div className="rounded-[8px] border border-[#3a3320] bg-ink-2 overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,.85)]">
      <div className="h-1.5 bg-gold" />
      <div className="p-7">
        <div className="flex justify-between items-start">
          <span className="w-14 h-14 rounded-2xl bg-ink text-gold grid place-items-center border border-ink-line" aria-hidden="true">
            <GraduationCap size={26} />
          </span>
          <span className="mono-label !text-[11.5px] text-muted-dark">Training</span>
        </div>
        <p className="mt-6 mono-label !text-[11.5px] text-gold">Price</p>
        <p className="mt-1 text-[64px] font-semibold tracking-[-0.04em] leading-none">{starterKit.price}</p>
        <ul className="mt-6">
          {["Training on importing from China", "For individuals and businesses", `${starterKit.modules.length} modules, outline below`].map((i) => (
            <li key={i} className="flex items-center gap-3 py-3 border-t border-ink-line text-[15px]">
              <Check size={16} className="text-teal shrink-0" aria-hidden="true" /> {i}
            </li>
          ))}
        </ul>
        <PrimaryLink href={STARTERKIT_LINK} className="mt-6 w-full">
          Get the StarterKit
        </PrimaryLink>
      </div>
    </div>
  );
}

// What the course covers, so a buyer knows what they get before paying. While outlineStatus is
// "proposed" the outline carries a label saying Next Level Procurement is confirming it.
function Outline() {
  const proposed = starterKit.outlineStatus === "proposed";
  return (
    <section id="outline" className="section bg-white border-y border-line scroll-mt-24" aria-labelledby="outline-title">
      <div className="wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
        <Reveal className="lg:sticky lg:top-32">
          <p className="mono-label text-teal-text">Course outline</p>
          <h2 id="outline-title" className="mt-5 text-[clamp(32px,4vw,52px)]">What you&apos;ll learn</h2>
          <p className="mt-6 text-muted text-[18px] max-w-[30em]">{starterKit.outcome}</p>
          {proposed && (
            <p className="mt-6 rounded-[6px] border border-[#b08a3a] bg-[#fbf3df] text-[#3d2f0b] px-4 py-3 text-[15px] leading-relaxed max-w-[30em]">
              <span className="mono-label !text-[11px] text-[#6b5114] block mb-1">Proposed outline · awaiting confirmation</span>
              Next Level Procurement is confirming the final lesson list. Ask us on WhatsApp what is included before you buy.
            </p>
          )}
          <div className="mt-8 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
            <PrimaryLink href={STARTERKIT_LINK} tone="paper">Get the StarterKit ({starterKit.price})</PrimaryLink>
            <WhatsAppLink href={waLink("Hello, before I buy the Made in China StarterKit, what does it include?")} tone="paper">Ask what&apos;s included</WhatsAppLink>
          </div>
        </Reveal>
        <ol className="grid sm:grid-cols-2 gap-4">
          {starterKit.modules.map((m, i) => (
            <li key={m.title} className="rounded-[8px] border border-line bg-paper p-6">
              <p className="mono-label !text-[11.5px] text-muted">Module {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-[20px] font-semibold tracking-tight leading-snug">{m.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {m.lessons.map((l) => (
                  <li key={l} className="flex gap-2.5 text-[15.5px] text-text leading-snug">
                    <Check size={16} aria-hidden="true" className="text-teal-text mt-0.5 shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function StarterKitPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: starterKit.title,
          description: starterKit.seoDescription,
          brand: { "@type": "Brand", name: SITE_NAME },
          url: `${SITE_URL}/starter-kit`,
          offers: {
            "@type": "Offer",
            price: starterKit.priceValue,
            priceCurrency: starterKit.currency,
            url: `${SITE_URL}/starter-kit`,
          },
        }}
      />
      <PageHeader
        eyebrow="Training"
        title={starterKit.title}
        lead="Learn how to import from China yourself, from the team that imports for its clients."
        crumbs={[{ label: "Home", href: "/" }, { label: "StarterKit" }]}
        aside={<PriceCard />}
      >
        <PrimaryLink href={STARTERKIT_LINK}>Get the StarterKit ({starterKit.price})</PrimaryLink>
        <WhatsAppLink href={waLink("Hello, I have a question about the Made in China StarterKit.")}>
          Ask a question first
        </WhatsAppLink>
        <a href="#outline" className="inline-flex items-center gap-2 min-h-11 px-1 text-[15px] font-semibold text-teal hover:text-teal-hover underline-offset-4 hover:underline">
          <ArrowDown size={16} aria-hidden="true" /> See what you&apos;ll learn
        </a>
      </PageHeader>

      <section className="section">
        <div className="wrap grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <p className="mono-label text-teal-text">What it is</p>
            <p className="mt-5 text-[clamp(24px,2.6vw,34px)] leading-snug tracking-tight font-medium">
              The Made in China StarterKit is our training on how to import from China.
            </p>
            <p className="mt-6 text-muted text-[18px] max-w-[32em]">
              It is for anyone who wants to start importing from China for themselves or their business.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[8px] bg-white border border-line p-8 self-start">
            <p className="mono-label text-muted">Rather we do it for you?</p>
            <p className="mt-4 text-[22px] font-semibold tracking-tight leading-snug">
              We import from China for our clients, from sourcing to delivery.
            </p>
            <Link
              href="/services/purchasing-and-sourcing"
              className="mt-6 inline-flex items-center gap-2 min-h-11 font-semibold text-teal-text underline underline-offset-4 hover:text-text"
            >
              See purchasing and sourcing
            </Link>
          </Reveal>
        </div>
      </section>

      <Outline />

      <CtaBand title="Rather we import for you?" em="We handle it end to end." text="Tell us what you need and we'll handle it from sourcing to delivery." />
    </>
  );
}
