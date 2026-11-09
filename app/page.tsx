import type { Metadata } from "next";

import Stage from "@/components/home/Stage";
import ChapterRail from "@/components/home/ChapterRail";
import ProblemPair from "@/components/home/ProblemPair";
import ServiceSplit from "@/components/home/ServiceSplit";
import RouteMap from "@/components/home/RouteMap";
import RouteCards from "@/components/home/RouteCards";
import AudienceBento from "@/components/home/AudienceBento";
import ProcessBeam from "@/components/home/ProcessBeam";
import StarterKitBand from "@/components/StarterKitBand";
import Reviews from "@/components/Reviews";
import FaqList from "@/components/FaqList";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { LineLink } from "@/components/Buttons";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Chapters: 01 who we are (over the cinematic stage), 02 why, 03 services (split screen),
// 04 where we buy (map + market carousel), 05 who we serve (bento), 06 how it works, 07 questions.
export default function Home() {
  return (
    <>
      <ChapterRail />
      <Stage />
      {/* Below the first screen, each chapter is laid out and painted only as it nears the screen
          (content-visibility: auto, see .cv-auto in globals.css). */}
      <div className="cv-auto"><ProblemPair /></div>
      <div className="cv-auto"><ServiceSplit /></div>
      <div className="cv-auto"><RouteMap after={<RouteCards />} /></div>
      <div className="cv-auto"><AudienceBento /></div>
      <div className="cv-auto"><ProcessBeam /></div>
      <div className="cv-auto bg-paper"><Reviews /></div>
      <div className="cv-auto bg-white py-[clamp(64px,8vw,112px)]">
        <StarterKitBand />
      </div>
      <section id="questions" data-chapter="Questions" className="section cv-auto" aria-labelledby="faq-title">
        <div className="wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
          <Reveal className="lg:sticky lg:top-32">
            <p className="mono-label !text-[12px] text-muted flex items-center gap-4">
              <span className="text-teal-text">07</span> Questions
            </p>
            <h2 id="faq-title" className="mt-6 text-[clamp(36px,4.6vw,64px)]">Before you send a request.</h2>
            <p className="mt-6 text-muted text-[18px] max-w-[26em]">The things people ask first. Anything else, ask us on WhatsApp.</p>
            <div className="mt-8">
              <LineLink href="/faq">All questions</LineLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <FaqList limit={5} />
          </Reveal>
        </div>
      </section>
      <div className="cv-auto"><CtaBand /></div>
    </>
  );
}
