import type { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import { MOTTO } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | Next Level Procurement",
  description:
    "We make sourcing, purchasing and importing goods simple, reliable and stress-free, for individuals, small businesses, retailers, wholesalers and e-commerce businesses.",
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

      <section className="section-padding">
        <div className="container mx-auto max-w-3xl space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p className="text-foreground">
            At Next Level Procurement, we make sourcing, purchasing and importing goods simple, reliable and stress-free.
          </p>
          <p>
            We work with individuals, small businesses, retailers, wholesalers and e-commerce businesses to source quality
            products at competitive prices from the UK, China, Europe, Turkey, Africa and other global markets.
          </p>
          <p>
            Whether you need personal shopping from the UK to your country, reliable suppliers for your business, bulk
            product sourcing or international importation, we help you find the right products and manage the process from
            sourcing to delivery.
          </p>

          <div className="not-prose p-8 rounded-xl bg-card border border-border">
            <h2 className="font-heading font-semibold text-foreground text-xl mb-4">Our services include</h2>
            <ul className="space-y-3 text-base">
              {services.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <p>
            We understand the challenges of finding trustworthy suppliers, managing costs, maintaining product quality and
            ensuring timely delivery. That is why we focus on clear communication, dependable service and solutions tailored
            to your needs.
          </p>
          <p>
            At Next Level Procurement, your needs come first. Whether you are buying one item for personal use or sourcing
            products in bulk for your business, we are here to help you buy smarter and source with confidence.
          </p>

          <blockquote className="border-l-2 border-teal pl-6 py-2">
            <p className="font-heading font-bold text-2xl md:text-3xl text-foreground">{MOTTO}</p>
            <footer className="mt-3 text-sm text-muted-foreground">
              Next Level Procurement: your trusted partner for sourcing, purchasing and global procurement.
            </footer>
          </blockquote>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
