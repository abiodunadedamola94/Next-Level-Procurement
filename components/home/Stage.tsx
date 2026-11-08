"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, animate, useMotionValue } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import Cinematic from "@/components/Cinematic";
import OrderCard from "@/components/home/OrderCard";
import QuoteStarter from "@/components/QuoteStarter";
import { LineLink } from "@/components/Buttons";
import { WHATSAPP_LINK } from "@/lib/site";
import { services } from "@/lib/services";

const ease = [0.22, 1, 0.36, 1] as const;

function Statement({ lines, className = "" }: { lines: string[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <p className={`uppercase font-light tracking-[0.01em] leading-[1.12] text-[clamp(26px,3.3vw,50px)] ${className}`}>
      {lines.map((l, i) => (
        <span key={l} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "105%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 1.1, delay: i * 0.08, ease }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

// The opening stage. One cinematic layer stays fixed while two layers of content pass over it:
// the hero (with the sample order, scored by scroll) and the "who we are" statements,
// staggered across the column guides.
export default function Stage() {
  const stage = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress: stageP } = useScroll({ target: stage, offset: ["start start", "end end"] });
  const { scrollYProgress: heroP } = useScroll({ target: hero, offset: ["start start", "end start"] });

  const veil = useTransform(stageP, [0, 0.45, 1], [0.15, 0.55, 0.8]);
  const mediaScale = useTransform(stageP, [0, 1], [1, reduce ? 1 : 1.12]);

  const load = useMotionValue(reduce ? 0.62 : 0);
  useEffect(() => {
    if (reduce) return;
    const c = animate(load, 0.62, { duration: 1.8, delay: 0.7, ease });
    return () => c.stop();
  }, [load, reduce]);
  const progress = useTransform([load, heroP], ([l, s]: number[]) => Math.min(1, l + Math.max(0, s - 0.05) * 0.95));

  const textY = useTransform(heroP, [0, 1], [0, reduce ? 0 : -140]);
  const cardY = useTransform(heroP, [0, 1], [0, reduce ? 0 : -60]);

  return (
    <div ref={stage} className="relative bg-ink text-white [overflow:clip]">
      {/* Layer 0: the fixed cinematic scene */}
      <div className="sticky top-0 h-[100svh] -mb-[100svh] overflow-hidden">
        <motion.div style={{ scale: mediaScale }} className="absolute inset-0">
          <Cinematic src="/photos/ship.webp" priority position="60% 50%" />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,19,23,.95)_0%,rgba(18,19,23,.84)_50%,rgba(18,19,23,.4)_100%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
        <motion.div aria-hidden="true" style={{ opacity: veil }} className="absolute inset-0 bg-ink" />
        <div aria-hidden="true" className="absolute inset-0 guides text-white/[0.06]" />
      </div>

      {/* Layer 1: hero */}
      <section ref={hero} className="relative min-h-[100svh] flex flex-col" aria-labelledby="hero-title">
        <div className="wrap flex-1 grid lg:grid-cols-[1.12fr_0.88fr] gap-14 lg:gap-16 items-center pt-32 lg:pt-44 pb-16">
          <motion.div style={{ y: textY }} className="min-w-0">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mono-label !text-[12px] text-teal inline-flex items-center gap-2.5"
            >
              <span aria-hidden="true" className="w-2 h-2 rounded-[2px] bg-gold" />
              Your dedicated buying team
            </motion.p>
            <h1 id="hero-title" className="mt-6 font-light text-[clamp(46px,6.6vw,100px)] tracking-[-0.045em] leading-[0.95]">
              {["From supplier", "to doorstep."].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.07em]">
                  <motion.span
                    className={`block ${i === 1 ? "text-teal" : ""}`}
                    initial={reduce ? false : { y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.1 + i * 0.1, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="mt-7 text-[#c6ccd4] text-[clamp(18px,1.5vw,20px)] max-w-[32em]"
            >
              We source, buy and ship for businesses and individuals, from the UK, China, Europe, Turkey and Africa to
              wherever you are. You save time and money and get on with running your business.
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="mt-10"
            >
              <QuoteStarter id="hero-starter" />
              <p className="mt-4 text-[14.5px] text-muted-dark flex flex-wrap items-center gap-x-2 gap-y-1">
                Prefer to talk?
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-teal hover:text-teal-hover underline-offset-4 hover:underline py-1">
                  <MessageCircle size={15} aria-hidden="true" /> Chat on WhatsApp
                </a>
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: cardY }}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
            className="min-w-0"
          >
            <OrderCard progress={progress} />
          </motion.div>
        </div>

        {/* Three doors in: one per service */}
        <div className="wrap pb-10 lg:pb-14">
          <ul className="grid md:grid-cols-3 gap-px bg-white/10 rounded-[8px] overflow-hidden border border-white/10" aria-label="Services">
            {services.map((s, i) => (
              <motion.li
                key={s.slug}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 + i * 0.08, ease }}
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col gap-3 p-6 bg-ink/75 backdrop-blur-xl hover:bg-white hover:text-text transition-colors duration-500"
                >
                  <span className="flex items-center justify-between">
                    <span className="mono-label !text-[11px] text-muted-dark group-hover:text-muted transition-colors">0{i + 1} / Service</span>
                    <ArrowUpRight size={18} aria-hidden="true" className="text-teal group-hover:text-teal-text transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                  <span className="text-[19px] tracking-tight">{s.title}</span>
                  <span className="text-[14.5px] text-muted-dark group-hover:text-muted transition-colors leading-snug">{s.short}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Layer 2: who we are, staggered across the guides */}
      <section id="who-we-are" data-chapter="Who we are" className="relative pt-[14vh] pb-[22vh]" aria-labelledby="who-title">
        <div className="wrap">
          <p className="mono-label !text-[12px] text-muted-dark flex items-center gap-4 max-w-[480px]">
            <span className="text-teal">01</span> Who we are <span aria-hidden="true" className="h-px flex-1 bg-white/20" />
          </p>
          <h2 id="who-title" className="sr-only">Who we are</h2>

          <div className="mt-14 lg:w-[75%]">
            <Statement lines={["A structured procurement", "ecosystem built on trust,", "diligence and integrity."]} />
          </div>

          <div className="mt-[14vh] lg:ml-[50%] lg:w-[42%] grid gap-8">
            <p className="text-[clamp(18px,1.5vw,21px)] text-[#c6ccd4] leading-relaxed">
              We work with individuals, small businesses, retailers, wholesalers and e-commerce businesses to source
              quality products at competitive prices from the UK, China, Europe, Turkey, Africa and other global markets.
            </p>
            <div>
              <LineLink href="/about" dark>About us</LineLink>
            </div>
          </div>

          <div className="mt-[16vh] lg:ml-[25%] lg:w-[60%]">
            <Statement lines={["Our mission is to be", "the most dependable", "procurement partner for", "growing businesses."]} className="text-white/90" />
          </div>
        </div>
      </section>
    </div>
  );
}
