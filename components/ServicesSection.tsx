"use client";

import {
  ShoppingCart,
  Plane,
  PackageCheck,
  BarChart3,
} from "lucide-react";
import { useScrollAnimation } from "./useScrollAnimation";

const services = [
  {
    icon: ShoppingCart,
    title: "Procurement Services",
    items: [
      "Product sourcing",
      "Supplier negotiation",
      "Contract management",
      "Cost optimization",
      "Quality inspection",
      "Importation (China and EU countries)",
    ],
  },
  {
    icon: Plane,
    title: "Logistics Services",
    items: [
      "Freight forwarding (road, sea, air)",
      "Local distribution",
      "Delivery coordination",
    ],
  },
  {
    icon: PackageCheck,
    title: "Procure + Deliver Packages",
    items: [
      "Source → Manage → Ship → Deliver",
      "Single accountability partner",
      "Seamless end-to-end execution",
    ],
  },
  {
    icon: BarChart3,
    title: "Value-Added Services",
    items: [
      "Real-time supply tracking",
      "Vendor performance reporting",
      "Cost benchmarking",
    ],
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
            Comprehensive procurement and logistics solutions tailored for
            businesses that demand efficiency, transparency, and results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map(({ icon: Icon, title, items }) => (
            <div
              key={title}
              className="p-8 rounded-xl bg-card border border-border hover:border-teal/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center group-hover:bg-teal/15 transition-colors">
                  <Icon size={24} className="text-teal" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground">
                  {title}
                </h3>
              </div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;