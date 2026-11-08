"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Pause, Play } from "lucide-react";

// Three moving scenes behind the hero: sea, air, road. AI-generated illustrations, not footage of
// NLP shipments: stills from Nano Banana animated with Kling 2.1 (KIE, 8 Nov 2026). Each 5 s clip
// plays once, then the next fades in. Reduced motion shows the still only. A pause button is always there (WCAG 2.2.2).
export const scenes = [
  { key: "sea", label: "Sea freight", video: "/hero/ship.mp4", poster: "/hero/ship.webp", position: "50% 62%" },
  { key: "air", label: "Air freight", video: "/hero/plane.mp4", poster: "/hero/plane.webp", position: "62% 60%" },
  { key: "road", label: "Road delivery", video: "/hero/truck.mp4", poster: "/hero/truck.webp", position: "45% 65%" },
] as const;

const SLIDE_MS = 4800; // just under the 5 s clip, so the crossfade starts while it is still moving

export default function HeroReel({ indexClassName = "bottom-0" }: { indexClassName?: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  // Stills first; the videos start once the page has loaded and gone quiet, so decoding them
  // never competes with the first paint or with the page becoming usable on a slow phone.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idle = 0;
    let t = 0;
    const go = () => {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      t = window.setTimeout(() => {
        if (ric) idle = ric(() => setReady(true), { timeout: 2500 });
        else setReady(true);
      }, 1200);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      clearTimeout(t);
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (idle && cic) cic(idle);
    };
  }, []);

  // Only play while the hero is on screen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && !paused && visible && !reduce) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else if (i === active || paused || !visible) {
        v.pause();
      }
      // The clip fading out keeps playing to its end, so the crossfade never freezes.
    });
  }, [active, paused, visible, reduce, ready]);

  // Advance on a timer so a slow or failed clip never stalls the reel.
  useEffect(() => {
    if (paused || reduce || !visible || !ready) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % scenes.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduce, visible, ready]);

  return (
    <div ref={box} className="absolute inset-0">
      {scenes.map((s, i) => (
        <div
          key={s.key}
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          {reduce || !ready ? (
            // eslint-disable-next-line @next/next/no-img-element
            (i === active || ready || reduce) && (
              <img src={s.poster} alt="" fetchPriority={i === active ? "high" : "low"} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: s.position }} />
            )
          ) : (
            <video
              ref={(el) => {
                vids.current[i] = el;
              }}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: s.position }}
              poster={s.poster}
              muted
              playsInline
              preload={i === active ? "auto" : "none"}
            >
              <source src={s.video} type="video/mp4" />
            </video>
          )}
        </div>
      ))}

      {/* Scene index: which mode is showing, and a way to pick or pause */}
      <div className={`absolute z-10 left-0 right-0 pointer-events-none ${indexClassName}`}>
        <div className="wrap flex items-end justify-between gap-4 pb-5">
          <ul className="flex gap-5 pointer-events-auto" aria-label="Background scenes">
            {scenes.map((s, i) => (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={`group text-left mono-label !text-[10.5px] py-2 transition-colors ${i === active ? "text-white" : "text-white/55 hover:text-white"}`}
                >
                  <span className="block">0{i + 1} · {s.label}</span>
                  <span className="mt-1.5 block h-px w-20 bg-white/20 overflow-hidden">
                    {i === active && (
                      <span
                        key={`${active}-${paused}-${ready}`}
                        className="block h-full bg-teal origin-left"
                        style={{
                          animation: reduce || paused || !ready ? "none" : `reel-progress ${SLIDE_MS}ms linear forwards`,
                          transform: reduce || paused ? "scaleX(1)" : !ready ? "scaleX(0)" : undefined,
                        }}
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {!reduce && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="pointer-events-auto grid place-items-center w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/50 transition-colors"
              aria-label={paused ? "Play background video" : "Pause background video"}
            >
              {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
