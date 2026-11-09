import type { Metadata } from "next";
import Image from "next/image";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import Values from "@/components/Values";
import { MOTTO } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | Next Level Procurement",
  description:
    "We make sourcing, purchasing and importing simple, reliable and stress-free for individuals, small businesses, retailers, wholesalers and online sellers.",
  alternates: { canonical: "/about" },
};

// Dorcas's About text (6 Nov 2026), verbatim.
const services = [
  "Global product sourcing and procurement",
  "Personal shopping and purchasing from the UK",
  "China and EU importation to the UK, Nigeria and other destinations",
  "Supplier sourcing, negotiation and management",
  "Bulk purchasing for retailers, wholesalers and small businesses",
  "Order tracking, shipping coordination and delivery support",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Sourcing, purchasing and importing, made simple"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="text-[clamp(28px,3.6vw,48px)] leading-[1.15] tracking-[-0.03em] font-medium max-w-[22em]">
              At Next Level Procurement, we make sourcing, purchasing and importing goods{" "}
              <span className="text-teal-text">simple, reliable and stress-free.</span>
            </p>
          </Reveal>

          <div className="mt-20 grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
            <Reveal className="space-y-6 text-[18px] text-muted">
              <p>
                We work with individuals, small businesses, retailers, wholesalers and e-commerce businesses to source
                quality products at competitive prices from the UK, China, Europe, Africa and other global markets.
              </p>
              <p>
                Whether you need personal shopping from the UK to your country, reliable suppliers for your business, bulk
                product sourcing or international importation, we help you find the right products and manage the process
                from sourcing to delivery.
              </p>
              <p>
                We understand the challenges of finding trustworthy suppliers, managing costs, maintaining product quality
                and ensuring timely delivery. That is why we focus on clear communication, dependable service and
                solutions tailored to your needs.
              </p>
              <p>
                At Next Level Procurement, your needs come first. Whether you are buying one item for personal use or
                sourcing products in bulk for your business, we are here to help you buy smarter and source with
                confidence.
              </p>
              <div className="relative mt-10 aspect-[4/3] rounded-[8px] overflow-hidden">
                <Image src="/photos/warehouse.webp" alt="A forklift moving a pallet of boxed goods in a warehouse" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:sticky lg:top-32 rounded-[8px] border border-line bg-white overflow-hidden">
              <h2 className="mono-label !text-[12px] text-muted px-6 py-4 bg-paper border-b border-line font-normal flex justify-between">
                <span>Our services include</span>
                <span>06</span>
              </h2>
              <ul>
                {services.map((s, i) => (
                  <li key={s} className="grid grid-cols-[40px_1fr] gap-3 px-6 py-5 border-t first:border-t-0 border-line text-[17px]">
                    <span className="mono-label !text-[11px] text-muted pt-1">{String(i + 1).padStart(2, "0")}</span>
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <Values />

      <section className="section">
        <Reveal className="wrap">
          <figure className="max-w-[900px]">
            <span aria-hidden="true" className="block w-12 h-1 bg-gold mb-8" />
            <blockquote className="text-[clamp(40px,6vw,84px)] font-semibold tracking-[-0.04em] leading-[1]">{MOTTO}</blockquote>
            <figcaption className="mt-8 mono-label text-muted">
              Next Level Procurement · your trusted partner for sourcing, purchasing and global procurement
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
