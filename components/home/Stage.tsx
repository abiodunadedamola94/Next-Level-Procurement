"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { MessageCircle } from "lucide-react";

import Cinematic from "@/components/Cinematic";
import HeroReel from "@/components/home/HeroReel";
import DemoVideo from "@/components/home/DemoVideo";
import QuoteStarter from "@/components/QuoteStarter";
import { LineLink } from "@/components/Buttons";
import { WHATSAPP_LINK } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;


function Statement({ lines, className = "" }: { lines: string[]; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <p className={`uppercase font-light tracking-[0.01em] leading-[1.12] text-[clamp(26px,3.3vw,50px)] ${className}`}>
      {lines.map((l, i) => (
        // The clipping wrapper watches for view, not the line: a line pushed below its clip is never
        // "in view" to the browser, so some lines stayed hidden (seen on phones, 8 Nov 2026).
        <motion.span
          key={l}
          className="block overflow-hidden pb-[0.08em]"
          initial={reduce ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, margin: "-12% 0px" }}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "105%" }, shown: { y: 0, transition: { duration: 1.1, delay: i * 0.08, ease } } }}
          >
            {l}
          </motion.span>
        </motion.span>
      ))}
    </p>
  );
}

// The opening stage, top to bottom (pattern from Flexport's hero; nothing of theirs copied):
// a moving background of sea, air and road; the promise and the first quote question centred on it;
// then the product film, overlapping the bottom of the scene.
// Below it, the "who we are" statements pass over a fixed still.
export default function Stage() {
  const hero = useRef<HTMLDivElement>(null);
  const who = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress: heroP } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const { scrollYProgress: whoP } = useScroll({ target: who, offset: ["start end", "end end"] });
  const textY = useTransform(heroP, [0, 1], [0, reduce ? 0 : -120]);
  const textFade = useTransform(heroP, [0, 0.7], [1, reduce ? 1 : 0.2]);
  const veil = useTransform(whoP, [0, 1], [0.6, 0.85]);
  const mediaScale = useTransform(whoP, [0, 1], [1, reduce ? 1 : 1.1]);

  return (
    <div className="relative bg-ink text-white [overflow:clip]">
      <section className="relative" aria-labelledby="hero-title">
        {/* The scene */}
        <div ref={hero} className="relative min-h-[max(100svh,760px)] flex flex-col overflow-hidden">
          <HeroReel indexClassName="bottom-[92px] lg:bottom-[196px]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(18,19,23,.84)_0%,rgba(18,19,23,.62)_48%,rgba(18,19,23,.3)_100%)]" />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/35 lg:bg-transparent" />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/90 to-transparent" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-ink via-ink/60 to-transparent" />
          <div aria-hidden="true" className="absolute inset-0 guides text-white/[0.05]" />

          <motion.div style={{ y: textY, opacity: textFade }} className="relative wrap flex-1 flex flex-col items-center text-center pt-36 lg:pt-44 pb-[190px] lg:pb-[300px]">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mono-label !text-[12px] text-[#7fe3d8] inline-flex items-center gap-2.5"
            >
              <span aria-hidden="true" className="w-2 h-2 rounded-[2px] bg-gold" />
              Your dedicated buying team
            </motion.p>
            <h1 id="hero-title" className="mt-6 font-light text-[clamp(46px,7vw,108px)] tracking-[-0.045em] leading-[0.95] [text-shadow:0_2px_30px_rgba(0,0,0,.35)]">
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
            {/* Visible from the first paint (slide only, no fade): it is the page's largest text, so a fade-in delays LCP. */}
            <motion.p
              initial={reduce ? false : { y: 14 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="mt-7 text-[#d3d8de] text-[clamp(18px,1.5vw,20px)] max-w-[34em]"
            >
              We manage sourcing, purchasing and international shipping for businesses and individuals, connecting you to
              products and suppliers across the UK, China, Europe and Africa, with delivery to wherever you are. We help
              you save time, reduce costs and focus on what matters most.
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
              className="mt-10 w-full max-w-[560px] text-left"
            >
              <QuoteStarter id="hero-starter" />
              <p className="mt-4 text-[14.5px] text-[#b9c0c9] flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                Prefer to talk?
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-teal hover:text-teal-hover underline-offset-4 hover:underline py-1">
                  <MessageCircle size={15} aria-hidden="true" /> Chat on WhatsApp
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* The product film, overlapping the bottom of the scene */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease }}
          className="relative z-10 wrap -mt-[80px] lg:-mt-[180px] pb-16 lg:pb-24"
        >
          <DemoVideo />
        </motion.div>
      </section>

      <div ref={who} className="relative">
        {/* A fixed still behind the statements */}
        <div aria-hidden="true" className="sticky top-0 h-[100svh] -mb-[100svh] overflow-hidden">
          <motion.div style={{ scale: mediaScale }} className="absolute inset-0">
            <Cinematic src="/photos/ship.webp" position="60% 50%" />
          </motion.div>
          <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-ink" />
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink to-transparent" />
          <div className="absolute inset-0 guides text-white/[0.06]" />
        </div>

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
              quality products at competitive prices from the UK, China, Europe, Africa and other global markets.
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
    </div>
  );
}
