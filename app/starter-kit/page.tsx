import type { Metadata } from "next";
import { Check } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { PrimaryLink, WhatsAppLink } from "@/components/Buttons";
import { starterKit } from "@/lib/services";
import { SITE_URL, SITE_NAME, STARTERKIT_LINK, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: starterKit.seoTitle,
  description: starterKit.seoDescription,
  alternates: { canonical: "/starter-kit" },
  openGraph: { title: starterKit.seoTitle, description: starterKit.seoDescription, url: "/starter-kit" },
};

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
        title={`${starterKit.title}`}
        lead="Learn how to import from China yourself, from the team that imports for its clients."
        crumbs={[{ label: "Home", href: "/" }, { label: "StarterKit" }]}
      >
        <PrimaryLink href={STARTERKIT_LINK}>Get the StarterKit ({starterKit.price})</PrimaryLink>
        <WhatsAppLink href={waLink("Hello, I have a question about the Made in China StarterKit.")}>
          Ask a question first
        </WhatsAppLink>
      </PageHeader>

      <section className="section-padding">
        <div className="container mx-auto max-w-5xl grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
            <p>
              The Made in China StarterKit is our training on how to import from China.
            </p>
            <p>
              It is for anyone who wants to start importing from China for themselves or their business.
              If you would rather we handle it for you, see our{" "}
              <a href="/services/purchasing-and-sourcing" className="text-teal hover:text-teal-light underline underline-offset-4">
                purchasing and sourcing service
              </a>
              .
            </p>
          </div>
          <aside className="p-8 rounded-xl bg-card border border-teal/20 h-fit">
            <p className="font-heading font-semibold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Price</p>
            <p className="font-heading font-extrabold text-4xl text-foreground mb-6">{starterKit.price}</p>
            <ul className="space-y-3 mb-8">
              {["Training on importing from China", "For individuals and businesses"].map((i) => (
                <li key={i} className="flex items-start gap-3 text-foreground text-sm">
                  <Check size={18} className="text-teal shrink-0" aria-hidden="true" /> {i}
                </li>
              ))}
            </ul>
            <PrimaryLink href={STARTERKIT_LINK}>Get the StarterKit</PrimaryLink>
          </aside>
        </div>
      </section>

      <CtaBand title="Rather we import for you?" text="Tell us what you need and we'll handle it from sourcing to delivery." />
    </>
  );
}
