"use client";

import { useSyncExternalStore } from "react";

// Hydration-safe replacement for framer-motion's useReducedMotion.
// framer's hook reads matchMedia on the very first client render, so a visitor with reduced
// motion got different HTML from the server (React error #418 on the home page, 8 Nov 2026).
// Here the server and the hydrating render both see `false`; React then re-renders straight
// after hydration with the real preference, and follows it if the setting changes.
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
