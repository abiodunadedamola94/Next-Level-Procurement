import type { Metadata } from "next";
import { MessageCircle, Phone, Mail, ArrowUpRight } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { PrimaryLink } from "@/components/Buttons";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, WHATSAPP_LINK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Next Level Procurement",
  description: `WhatsApp or call ${PHONE_DISPLAY}, or email ${EMAIL}.`,
  alternates: { canonical: "/contact" },
};

const ways = [
  { icon: MessageCircle, label: "WhatsApp", value: PHONE_DISPLAY, href: WHATSAPP_LINK, note: "The quickest way to reach us", external: true, featured: true },
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
      <section className="section">
        <div className="wrap grid md:grid-cols-3 gap-4">
          {ways.map(({ icon: Icon, label, value, href, note, external, featured }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`group flex flex-col h-full min-h-[280px] rounded-[22px] border p-8 transition-colors ${
                  featured ? "bg-ink text-white border-ink hover:border-teal" : "bg-white border-line hover:border-text"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`w-14 h-14 rounded-2xl grid place-items-center ${featured ? "bg-teal text-ink" : "bg-ink text-teal"}`} aria-hidden="true">
                    <Icon size={24} />
                  </span>
                  <ArrowUpRight size={22} aria-hidden="true" className={`transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${featured ? "text-teal" : "text-muted"}`} />
                </div>
                <p className={`mt-auto pt-10 mono-label ${featured ? "text-teal" : "text-muted"}`}>{label}</p>
                <p className="mt-2 text-[22px] font-semibold tracking-tight break-all">{value}</p>
                <p className={`mt-1 text-[15px] ${featured ? "text-muted-dark" : "text-muted"}`}>{note}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
