"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { MessageCircle, Search, Ship, PackageCheck } from "lucide-react";

const steps = [
  { n: "01", t: "Tell us what you need", d: "On WhatsApp or with the quote form.", icon: MessageCircle },
  { n: "02", t: "We source and buy", d: "The right product at a competitive price.", icon: Search },
  { n: "03", t: "We ship it", d: "We coordinate the shipping and keep you updated.", icon: Ship },
  { n: "04", t: "It reaches you", d: "Delivery support until it arrives.", icon: PackageCheck },
];

// A horizontal rail that fills as it scrolls through the viewport.
export default function StepsRail() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });

  return (
    <ol ref={ref} className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
      <div aria-hidden="true" className="hidden lg:block absolute left-0 right-0 top-[27px] h-0.5 bg-line">
        <motion.div style={{ scaleX: reduce ? 1 : scaleX }} className="absolute inset-0 origin-left bg-teal-text" />
      </div>
      {steps.map((s) => {
        const Icon = s.icon;
        return (
          <li key={s.n} className="relative">
            <span aria-hidden="true" className="relative z-10 w-14 h-14 rounded-2xl bg-ink text-teal grid place-items-center">
              <Icon size={24} />
            </span>
            <p className="mono-label text-muted mt-6">Step {s.n}</p>
            <h3 className="mt-2 text-[24px]">{s.t}</h3>
            <p className="mt-2 text-muted">{s.d}</p>
          </li>
        );
      })}
    </ol>
  );
}
