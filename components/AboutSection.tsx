"use client"

import { DollarSign, Truck, Handshake } from "lucide-react";
import { useScrollAnimation } from "./useScrollAnimation";

const highlights = [
  {
    icon: DollarSign,
    title: "Sourcing, Purchasing & Cost Savings",
    desc: "Strategic sourcing and negotiation to maximize value and reduce procurement costs.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    desc: "Coordinated logistics ensuring on-time delivery across all supply chain stages.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    desc: "Long-term relationships built on transparency and mutual growth. We partner with the best suppliers in the UK, EU and China and supervise all importation down to your doorstep.",
  },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-padding bg-background relative">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-teal/20 to-transparent" />

      <div
        ref={ref}
        className={`container mx-auto max-w-5xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            About Us
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
            About NextLevel Procurement
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
            Next Level Procurement is your strategic sourcing and supply chain partner, delivering structured and reliable procurement solutions. We act as your dedicated buying team at minimal cost, helping you save time and money while ensuring quality service, so you can focus on running your business
          </p>
          <div className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-left space-y-2 mb-6">
            <p className="font-semibold text-foreground">We support businesses with:</p>
            <ul className="list-none space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />End-to-end sourcing and supplier evaluation</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />Negotiation and supplier management</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />Importation, logistics coordination and supply chain oversight</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />Performance monitoring and reporting</li>
            </ul>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
            Our approach combines commercial awareness with operational efficiency, enabling our clients to reduce risk, control spend, and improve supplier performance.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We operate with integrity, transparency, and measurable value delivery at every stage of the procurement cycle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group text-center p-8 rounded-xl border border-border hover:border-teal/20 transition-all duration-300 bg-card glow-teal hover:glow-teal"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-teal/10 flex items-center justify-center group-hover:bg-teal/15 transition-colors">
                <Icon size={26} className="text-teal" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
