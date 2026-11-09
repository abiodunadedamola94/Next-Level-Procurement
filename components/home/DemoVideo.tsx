"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Play, Clapperboard, ArrowRight } from "lucide-react";
import Cinematic from "@/components/Cinematic";

// The product film, straight after the hero (replaced the demo order dashboard on 9 Nov 2026).
// Pattern: a rounded video card on soft flowing lines, as on Transpoco's home page; nothing of theirs copied.
//
// The film is not made yet (held 9 Nov 2026). Until it is, FILM_SRC is null and the card shows a moving
// still with "Film coming soon", so nothing pretends to play. When the film exists:
// put the file in public/film/, set FILM_SRC (and FILM_CAPTIONS if there is a .vtt), and set FILM_LENGTH.
const FILM_SRC: string | null = null;
const FILM_CAPTIONS: string | null = null;
const FILM_POSTER = "/photos/containers.webp";
const FILM_LENGTH = "About 40 seconds";

// Thin lines that drift behind the card. Decorative; they stop under reduced motion (globals.css).
function Lines() {
  const paths = [
    "M-40 260 C 220 120, 420 420, 720 230 S 1180 60, 1480 220",
    "M-40 300 C 240 170, 450 460, 740 270 S 1190 110, 1480 270",
    "M-40 340 C 260 220, 480 500, 760 310 S 1200 160, 1480 320",
    "M-40 380 C 280 270, 510 540, 780 350 S 1210 210, 1480 370",
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 600"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-x-[8%] top-[6%] h-[88%] w-[116%] hidden sm:block"
    >
      <defs>
        <linearGradient id="film-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="var(--color-teal)" stopOpacity="0" />
          <stop offset="0.35" stopColor="var(--color-teal)" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="var(--color-gold)" stopOpacity="0.45" />
          <stop offset="1" stopColor="var(--color-gold)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="url(#film-line)"
          strokeWidth={i === 1 ? 2 : 1.25}
          className="film-line"
          style={{ animationDelay: `${i * -3.5}s` }}
        />
      ))}
    </svg>
  );
}

export default function DemoVideo() {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const ready = Boolean(FILM_SRC);

  return (
    <section id="film" aria-labelledby="film-title" className="relative">
      <h2 id="film-title" className="sr-only">Watch: how we buy for you</h2>
      <Lines />

      <div className="relative mx-auto max-w-[1120px]">
        <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden rounded-[16px] sm:rounded-[20px] bg-ink-2 ring-1 ring-white/10 shadow-[0_50px_120px_-40px_rgba(0,0,0,.9)]">
          {ready && playing ? (
            <video
              ref={video}
              className="absolute inset-0 h-full w-full object-cover"
              src={FILM_SRC!}
              poster={FILM_POSTER}
              controls
              autoPlay
              playsInline
              preload="metadata"
            >
              {FILM_CAPTIONS && <track kind="captions" src={FILM_CAPTIONS} srcLang="en" label="English" default />}
            </video>
          ) : (
            <>
              <Cinematic src={FILM_POSTER} position="50% 55%" />
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(18,19,23,.25)_0%,rgba(18,19,23,.7)_100%)]" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent" />

              <div className="absolute inset-0 grid place-items-center">
                {ready ? (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="group grid place-items-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/30 text-white hover:bg-white/25 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/60"
                    aria-label={`Play the film (${FILM_LENGTH.toLowerCase()})`}
                  >
                    <Play size={34} className="translate-x-[2px] transition-transform group-hover:scale-110" aria-hidden="true" fill="currentColor" />
                  </button>
                ) : (
                  <p className="inline-flex items-center gap-2.5 rounded-full bg-ink/70 backdrop-blur-md ring-1 ring-white/15 px-5 py-3 text-[14px] text-white">
                    <Clapperboard size={17} className="text-gold" aria-hidden="true" />
                    Film coming soon
                  </p>
                )}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 flex items-end justify-between gap-6 text-white">
                <div>
                  <p className="mono-label !text-[11.5px] text-[#7fe3d8]">Next Level Procurement</p>
                  <p className="mt-2 text-[clamp(20px,2.4vw,32px)] leading-tight tracking-tight">From supplier to doorstep.</p>
                </div>
                {ready && <p className="hidden sm:block mono-label !text-[11.5px] text-[#c6ccd4] shrink-0">{FILM_LENGTH}</p>}
              </div>
            </>
          )}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[15px]">
          <p className="text-[#c6ccd4]">How we source, buy and deliver for you, in a short film.</p>
          <Link
            href="/how-it-works"
            className="group inline-flex items-center gap-2 min-h-11 font-semibold text-teal hover:text-teal-hover underline-offset-4 hover:underline"
          >
            Prefer to read? How it works
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
