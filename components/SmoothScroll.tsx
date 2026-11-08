"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Smooth, weighted scrolling for mouse and trackpad. Off for reduced motion, and off on touch screens,
// where Lenis leaves native scrolling alone anyway, so its frame loop would only cost battery.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  return null;
}
