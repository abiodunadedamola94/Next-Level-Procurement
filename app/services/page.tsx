import type { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import ServiceStack from "@/components/ServiceStack";
import StarterKitBand from "@/components/StarterKitBand";
import { PrimaryLink } from "@/components/Buttons";
import { SITE_URL } from "@/lib/site";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Our Services: Sourcing, UK Personal Shopping, Consumables | Next Level Procurement",
  description:
    "Purchasing and sourcing from anywhere to anywhere, personal shopping from the UK for clients abroad, consumables supply, and the Made in China StarterKit.",
  alternates: { canonical: "/services" },
};

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
        aside={
          <ol className="rounded-[22px] border border-ink-line bg-ink-2 overflow-hidden">
            {services.map((s, i) => (
              <li key={s.slug} className="grid grid-cols-[44px_1fr] items-center px-6 py-5 border-t first:border-t-0 border-ink-line">
                <span className="mono-label !text-[11px] text-muted-dark">{String(i + 1).padStart(2, "0")}</span>
                <a href={`/services/${s.slug}`} className="font-semibold hover:text-teal transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        }
      >
        <PrimaryLink href="/quote">Request a quote</PrimaryLink>
      </PageHeader>

      <section className="section">
        <div className="wrap">
          <ServiceStack />
        </div>
        <div className="mt-6 lg:mt-0">
          <StarterKitBand />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
