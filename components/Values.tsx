"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Handshake, ScanSearch, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

// Her three values, on ink over a slow-moving port photograph.
const values = [
  { icon: Handshake, title: "Trust", text: "We operate with transparency and accountability at every level of engagement." },
  { icon: ScanSearch, title: "Diligence", text: "We carefully vet suppliers and manage logistics with precision and care." },
  { icon: ShieldCheck, title: "Integrity", text: "We protect our clients' interests at every stage of the procurement process." },
];

export default function Values() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);

  return (
    <section ref={ref} className="section bg-ink text-white relative overflow-hidden" aria-labelledby="why-title">
      <motion.div style={{ y }} className="absolute inset-[-14%_0] pointer-events-none" aria-hidden="true">
        <Image src="/photos/containers.webp" alt="" fill sizes="100vw" className="object-cover opacity-30" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink via-ink/55 to-ink" />
      <div className="relative wrap">
        <Reveal className="max-w-[760px]">
          <p className="mono-label text-teal">Who we are</p>
          <h2 id="why-title" className="mt-5 text-[clamp(36px,4.6vw,60px)]">We don&apos;t just buy. We build.</h2>
          <p className="mt-5 text-muted-dark text-[19px] max-w-[36em]">
            We are a structured procurement ecosystem built on trust, diligence and integrity. Our mission is to be the
            most dependable procurement partner for growing businesses.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.1} className="rounded-[22px] border border-ink-line bg-ink-2/85 backdrop-blur-md p-8">
                <Icon size={28} className="text-gold" aria-hidden="true" />
                <h3 className="mt-6 text-[26px]">{v.title}</h3>
                <p className="mt-3 text-muted-dark">{v.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
