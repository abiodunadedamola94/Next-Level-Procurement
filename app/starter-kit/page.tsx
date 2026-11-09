import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, BookOpen, Check } from "lucide-react";

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
            <BookOpen size={26} />
          </span>
          <span className="mono-label !text-[11.5px] text-muted-dark">Guide</span>
        </div>
        <p className="mt-6 mono-label !text-[11.5px] text-gold">Price</p>
        <p className="mt-1 text-[64px] font-semibold tracking-[-0.04em] leading-none">{starterKit.price}</p>
        <ul className="mt-6">
          {[starterKit.format, "For beginners, sellers and small businesses", `${starterKit.contents.length} sections, listed below`].map((i) => (
            <li key={i} className="flex items-center gap-3 py-3 border-t border-ink-line text-[15px]">
              <Check size={16} className="text-teal shrink-0" aria-hidden="true" /> {i}
            </li>
          ))}
        </ul>
        <PrimaryLink href={STARTERKIT_LINK} className="mt-6 w-full">
          Get the StarterKit
        </PrimaryLink>
        <p className="mt-3 text-[13px] text-muted-dark text-center">Opens our Payhip shop</p>
      </div>
    </div>
  );
}

// What is inside, word for word from the Payhip page, so a buyer knows what they get before paying.
function Contents() {
  return (
    <section id="outline" className="section bg-white border-y border-line scroll-mt-24" aria-labelledby="outline-title">
      <div className="wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
        <Reveal className="lg:sticky lg:top-32">
          <p className="mono-label text-teal-text">What is inside</p>
          <h2 id="outline-title" className="mt-5 text-[clamp(32px,4vw,52px)]">A {starterKit.format.split(",")[0]}, in plain English</h2>
          <p className="mt-6 text-muted text-[18px] max-w-[30em]">{starterKit.author}.</p>
          <dl className="mt-8 grid gap-5 max-w-[30em] text-[16px]">
            <div>
              <dt className="mono-label !text-[11.5px] text-muted">Who it is for</dt>
              <dd className="mt-1.5">{starterKit.whoFor}</dd>
            </div>
            <div>
              <dt className="mono-label !text-[11.5px] text-muted">Who it is not for</dt>
              <dd className="mt-1.5 text-muted">{starterKit.notFor}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
            <PrimaryLink href={STARTERKIT_LINK} tone="paper">Get the StarterKit ({starterKit.price})</PrimaryLink>
            <WhatsAppLink href={waLink(`Hello, I have a question about the ${starterKit.title}.`)} tone="paper">Ask a question first</WhatsAppLink>
          </div>
        </Reveal>
        <ol className="grid sm:grid-cols-2 gap-4">
          {starterKit.contents.map((c, i) => (
            <li key={c} className="rounded-[8px] border border-line bg-paper p-6">
              <p className="mono-label !text-[11.5px] text-muted">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 text-[17px] font-medium tracking-tight leading-snug">{c}</p>
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
            url: STARTERKIT_LINK,
          },
        }}
      />
      <PageHeader
        eyebrow="Guide · PDF"
        title={starterKit.title}
        lead={starterKit.short}
        crumbs={[{ label: "Home", href: "/" }, { label: "StarterKit" }]}
        aside={<PriceCard />}
      >
        <PrimaryLink href={STARTERKIT_LINK}>Get the StarterKit ({starterKit.price})</PrimaryLink>
        <WhatsAppLink href={waLink(`Hello, I have a question about the ${starterKit.title}.`)}>
          Ask a question first
        </WhatsAppLink>
        <a href="#outline" className="inline-flex items-center gap-2 min-h-11 px-1 text-[15px] font-semibold text-teal hover:text-teal-hover underline-offset-4 hover:underline">
          <ArrowDown size={16} aria-hidden="true" /> See what is inside
        </a>
      </PageHeader>

      <section className="section">
        <div className="wrap grid lg:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <p className="mono-label text-teal-text">What it is</p>
            <p className="mt-5 text-[clamp(24px,2.6vw,34px)] leading-snug tracking-tight font-medium">
              {starterKit.pitch}
            </p>
            <p className="mt-6 text-muted text-[18px] max-w-[32em]">{starterKit.intro}</p>
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

      <Contents />

      <CtaBand title="Rather we import for you?" em="We handle it end to end." text="Tell us what you need and we'll handle it from sourcing to delivery." />
    </>
  );
}
