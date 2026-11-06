"use client";

import {
  Globe,
  ShoppingBag,
  PackageCheck,
  GraduationCap,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useScrollAnimation } from "./useScrollAnimation";
import { QUOTE_LINK, STARTERKIT_LINK, waLink } from "@/lib/site";

// The three areas Next Level Procurement serves, in Dorcas's words (6 Nov 2026),
// plus the Made in China StarterKit. Sub-items come from the previous services list.
type Service = {
  icon: LucideIcon;
  title: string;
  summary: string;
  items: string[];
  cta: { label: string; href: string };
};

const services: Service[] = [
  {
    icon: Globe,
    title: "Purchasing and Sourcing",
    summary:
      "From anywhere in the world to anywhere, including importation from China.",
    items: [
      "Product sourcing",
      "Supplier negotiation",
      "Quality inspection",
      "Importation from China",
      "Freight forwarding (road, sea, air)",
      "Delivery coordination",
    ],
    cta: { label: "Request a quote", href: QUOTE_LINK },
  },
  {
    icon: ShoppingBag,
    title: "Personal Shopping from the UK",
    summary:
      "For clients abroad who want to buy from the UK and have it sent to their country.",
    items: [
      "We buy from UK stores for you",
      "We send it to your country",
    ],
    cta: {
      label: "Ask about personal shopping",
      href: waLink("Hello, I'd like to buy from the UK and have it sent to me. I need: "),
    },
  },
  {
    icon: PackageCheck,
    title: "Consumables Supply",
    summary: "Basic consumables for businesses and individuals.",
    items: [
      "Bin bags",
      "Microfibre cloths",
      "Disposable gloves",
      "Disposable napkins",
    ],
    cta: {
      label: "Order consumables",
      href: waLink("Hello, I'd like to order consumables. I need: "),
    },
  },
  {
    icon: GraduationCap,
    title: "Made in China StarterKit",
    summary: "Training on how to import from China. $20.",
    items: [
      "Learn how importing from China works",
      "For anyone starting to import",
    ],
    cta: { label: "Get the StarterKit ($20)", href: STARTERKIT_LINK },
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="section-padding bg-background relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-teal/20 to-transparent" />

      <div
        ref={ref}
        className={`container mx-auto max-w-6xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            What We Offer
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Three ways we buy for you, for businesses and individuals, plus
            training if you want to import from China yourself.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map(({ icon: Icon, title, summary, items, cta }) => (
            <div
              key={title}
              className="p-8 rounded-xl bg-card border border-border hover:border-teal/20 transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center group-hover:bg-teal/15 transition-colors">
                  <Icon size={24} className="text-teal" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground">
                  {title}
                </h3>
              </div>
              <p className="text-foreground/90 text-sm leading-relaxed mb-5">
                {summary}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-muted-foreground text-sm"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-6 inline-flex items-center gap-2 text-teal hover:text-teal-light font-semibold text-sm transition-colors"
              >
                {cta.label} <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;