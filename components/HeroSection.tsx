
"use client"

import { motion } from "framer-motion";
import { ArrowRight, Package, MapPin, Users } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/447346485225";

const trustItems = [
  { icon: Package, label: "End-to-End Procurement" },
  { icon: MapPin, label: "Real-Time Supply Tracking" },
  { icon: Users, label: "Trusted Vendor Network" },
];

const HeroSection = () => (
  <section
    id="home"
    className="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    {/* Background grid pattern */}
    <div className="absolute inset-0 bg-background">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 rounded-full bg-teal/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
    </div>

    <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground text-xs font-medium tracking-wide uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-glow" />
          Strategic Procurement Partner
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6 tracking-tight"
        >
          Elevate Your Procurement{" "}
          <br className="hidden md:block" />
          Process to the{" "}
          <span className="text-gradient">Next Level</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          End-to-end procurement and logistics solutions designed to deliver
          efficiency, cost optimization, and full supply chain transparency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-lg transition-all hover:shadow-lg hover:shadow-teal/20 glow-teal"
          >
            Get Started <ArrowRight size={18} />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground hover:border-teal/50 hover:text-teal font-semibold px-8 py-3.5 rounded-lg transition-all bg-secondary/30"
          >
            Join Our Waitlist
          </a>
        </motion.div>
      </div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="mt-24 md:mt-32 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pb-10"
      >
        {trustItems.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 glass rounded-xl px-5 py-4 hover:border-teal/20 transition-colors"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center">
              <Icon size={20} className="text-teal" />
            </div>
            <span className="text-foreground/80 font-medium text-sm">
              {label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
