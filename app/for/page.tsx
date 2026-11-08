import type { Metadata } from "next";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import AudienceBento from "@/components/home/AudienceBento";
import { PrimaryLink, WhatsAppLink } from "@/components/Buttons";
import { WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Who We Serve | Next Level Procurement",
  description:
    "We work with individuals, small businesses, retailers, wholesalers and e-commerce businesses, from one item to bulk orders.",
  alternates: { canonical: "/for" },
};

export default function ForPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who we serve"
        title="Built for people who buy to sell, and people who just need it."
        lead="Individuals, small businesses, retailers, wholesalers and e-commerce businesses. One item for personal use or products in bulk."
        crumbs={[{ label: "Home", href: "/" }, { label: "Who we serve" }]}
      >
        <PrimaryLink href="/quote">Request a quote</PrimaryLink>
        <WhatsAppLink href={WHATSAPP_LINK}>Ask on WhatsApp</WhatsAppLink>
      </PageHeader>
      <AudienceBento n={null} />
      <CtaBand photo="/photos/warehouse.webp" />
    </>
  );
}
