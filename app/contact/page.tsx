import type { Metadata } from "next";
import { MessageCircle, Phone, Mail } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import { PrimaryLink } from "@/components/Buttons";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Next Level Procurement",
  description: `WhatsApp or call ${PHONE_DISPLAY}, or email ${EMAIL}.`,
  alternates: { canonical: "/contact" },
};

const ways = [
  { icon: MessageCircle, label: "WhatsApp", value: PHONE_DISPLAY, href: WHATSAPP_LINK, note: "The quickest way to reach us", external: true },
  { icon: Phone, label: "Phone", value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}`, note: "Business line" },
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, note: "For documents and longer requests" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to us"
        lead="For a price, the quote form is fastest. For anything else, reach us here."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      >
        <PrimaryLink href="/quote">Request a quote</PrimaryLink>
      </PageHeader>
      <section className="section-padding">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-3 gap-6">
          {ways.map(({ icon: Icon, label, value, href, note, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="p-8 rounded-xl bg-card border border-border hover:border-teal/30 transition-colors"
            >
              <Icon size={24} className="text-teal mb-5" aria-hidden="true" />
              <p className="font-heading font-semibold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{label}</p>
              <p className="text-foreground font-semibold break-all">{value}</p>
              <p className="text-muted-foreground text-sm mt-2">{note}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
