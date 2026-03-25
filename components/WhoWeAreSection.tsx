"use client"

import { Shield, Search, Lock } from "lucide-react";
import { useScrollAnimation } from "./useScrollAnimation";

const principles = [
  {
    icon: Shield,
    title: "Trust",
    desc: "We operate with transparency and accountability at every level of engagement.",
  },
  {
    icon: Search,
    title: "Diligence",
    desc: "We carefully vet suppliers and manage logistics with precision and care.",
  },
  {
    icon: Lock,
    title: "Integrity",
    desc: "We protect our clients' interests at every stage of the procurement process.",
  },
];

const WhoWeAreSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="who-we-are" className="section-padding bg-card relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div
        ref={ref}
        className={`container mx-auto max-w-5xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-teal font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Who We Are
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
            We Don&apos;t Just Buy. We Build
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are a structured procurement ecosystem built on trust, diligence,
            and integrity. Our mission is to be the most dependable procurement
            partner for growing businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {principles.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="relative p-8 rounded-xl bg-background border border-border hover:border-teal/20 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-teal to-teal-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="w-14 h-14 mb-5 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-teal/10 transition-colors">
                <Icon size={26} className="text-muted-foreground group-hover:text-teal transition-colors" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-3">
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

export default WhoWeAreSection;
