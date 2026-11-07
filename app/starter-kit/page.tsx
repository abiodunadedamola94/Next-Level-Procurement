import type { Metadata } from "next";
import Link from "next/link";
import { Check, GraduationCap } from "lucide-react";

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
    <div className="rounded-[22px] border border-[#3a3320] bg-ink-2 overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,.85)]">
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
          {["Training on importing from China", "For individuals and businesses"].map((i) => (
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
          <Reveal delay={0.1} className="rounded-[22px] bg-white border border-line p-8 self-start">
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

      <CtaBand title="Rather we import for you?" em="We handle it end to end." text="Tell us what you need and we'll handle it from sourcing to delivery." />
    </>
  );
}
