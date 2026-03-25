"use client"

import { MessageCircle } from "lucide-react";
import { useScrollAnimation } from "./useScrollAnimation";

const WHATSAPP_LINK = "https://wa.me/1234567890";

const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-card relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div
        ref={ref}
        className={`container mx-auto max-w-3xl text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-75 rounded-full bg-teal/5 blur-[100px] pointer-events-none" />

        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6 relative">
          Ready to Elevate Your Procurement Process?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed relative">
          Partner with a team that delivers efficiency, transparency and
          measurable results for your business. Let us worry about the buying
          and deliveries while you focus on running your business efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg transition-all hover:shadow-lg hover:shadow-teal/20 glow-teal text-lg"
          >
            <MessageCircle size={20} />
            Chat With Us on WhatsApp
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground hover:border-teal/50 hover:text-teal font-semibold px-8 py-4 rounded-lg transition-all bg-secondary/30"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
