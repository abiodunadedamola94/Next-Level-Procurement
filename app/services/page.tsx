import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, ShoppingBag, PackageCheck, GraduationCap } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { services, starterKit } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services: Sourcing, UK Personal Shopping, Consumables | Next Level Procurement",
  description:
    "Purchasing and sourcing from anywhere to anywhere, personal shopping from the UK for clients abroad, consumables supply, and the Made in China StarterKit.",
  alternates: { canonical: "/services" },
};

const icons = [Globe, ShoppingBag, PackageCheck];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          ],
        }}
      />
      <PageHeader
        eyebrow="What we offer"
        title="Three ways we buy for you"
        lead="For businesses and individuals. And if you want to import from China yourself, our StarterKit shows you how."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="section-padding">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
          {services.map((s, i) => {
            const Icon = icons[i];
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group p-8 rounded-xl bg-card border border-border hover:border-teal/30 transition-all flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-6">
                  <Icon size={24} className="text-teal" aria-hidden="true" />
                </div>
                <h2 className="font-heading font-bold text-xl text-foreground mb-3">{s.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{s.short}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-teal font-semibold text-sm">
                  See how it works <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
          <Link
            href="/starter-kit"
            className="group p-8 rounded-xl bg-teal/5 border border-teal/20 hover:border-teal/40 transition-all flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-6">
              <GraduationCap size={24} className="text-teal" aria-hidden="true" />
            </div>
            <h2 className="font-heading font-bold text-xl text-foreground mb-3">
              {starterKit.title} <span className="text-teal">{starterKit.price}</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{starterKit.short}</p>
            <span className="mt-auto inline-flex items-center gap-2 text-teal font-semibold text-sm">
              About the StarterKit <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
