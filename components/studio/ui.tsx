"use client";

import { useEffect, useRef } from "react";
import { X, CheckCircle2, AlertTriangle } from "lucide-react";
import type { Status } from "@/lib/studio/types";
import { useStudio } from "./store";

export const STATUS: Record<Status, { label: string; cls: string; dot: string }> = {
  review: { label: "Waiting for you", cls: "bg-gold-soft text-gold-text border-[#d9bf86]", dot: "bg-gold" },
  changes: { label: "Changes asked", cls: "bg-white text-text border-line", dot: "bg-[#5b6470]" },
  drafting: { label: "Being written", cls: "bg-white text-muted border-line", dot: "bg-[#a3acb8]" },
  idea: { label: "Idea", cls: "bg-white text-muted border-dashed border-line", dot: "bg-[#a3acb8]" },
  scheduled: { label: "Scheduled", cls: "bg-teal-soft text-teal-text border-[#a7ddd6]", dot: "bg-teal-text" },
  published: { label: "Live", cls: "bg-teal-soft text-teal-text border-[#a7ddd6]", dot: "bg-teal" },
  declined: { label: "Declined", cls: "bg-white text-muted border-line", dot: "bg-[#c7ccd3]" },
};

export function StatusPill({ status, className = "" }: { status: Status; className?: string }) {
  const s = STATUS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[12.5px] font-medium leading-none ${s.cls} ${className}`}>
      <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-[6px] min-h-12 px-4 text-[15px] font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2";
export const btn = {
  primary: `${base} bg-ink text-white hover:bg-ink-3`,
  approve: `${base} bg-teal-text text-white hover:bg-[#0b5a53]`,
  ghost: `${base} border border-line bg-white text-text hover:border-text`,
  quiet: `${base} text-text hover:bg-black/[0.04]`,
  danger: `${base} border border-[#e7b4ae] bg-white text-[#b42318] hover:border-[#b42318]`,
};

export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`mono-label !text-[11.5px] text-muted ${className}`}>{children}</p>;
}

export function SampleTag({ children = "Sample data" }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[4px] border border-dashed border-[#b8bec7] px-1.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.06em] text-muted">
      {children}
    </span>
  );
}

// A sheet: rises from the bottom on a phone, sits centred on a larger screen.
export function Sheet({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; footer?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const el = ref.current;
    el?.querySelector<HTMLElement>("textarea, input, button:not([data-close])")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && el) {
        const f = [...el.querySelectorAll<HTMLElement>("button, textarea, input, a[href], select")].filter((x) => !x.hasAttribute("disabled"));
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end md:items-center justify-center">
      <button aria-label="Close" data-close className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] studio-fade" onClick={onClose} />
      <div ref={ref} role="dialog" aria-modal="true" aria-label={title} className="studio-rise relative w-full md:max-w-[520px] max-h-[90svh] flex flex-col bg-white rounded-t-[16px] md:rounded-[12px] shadow-[0_-8px_40px_rgba(18,19,23,.25)]">
        <div className="flex items-center justify-between gap-4 px-5 pt-4 pb-3 border-b border-line">
          <span aria-hidden="true" className="md:hidden absolute left-1/2 -translate-x-1/2 top-2 w-10 h-1 rounded-full bg-line" />
          <h2 className="text-[19px] font-semibold tracking-tight pt-2 md:pt-0">{title}</h2>
          <button data-close onClick={onClose} aria-label="Close" className="grid place-items-center w-11 h-11 -mr-2 rounded-full hover:bg-black/[0.05]">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5">{children}</div>
        {footer && <div className="px-5 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] border-t border-line">{footer}</div>}
      </div>
    </div>
  );
}

export function Toasts() {
  const { toasts, dismiss } = useStudio();
  return (
    <div aria-live="polite" className="fixed z-[90] left-1/2 -translate-x-1/2 bottom-[88px] md:bottom-6 w-[min(440px,calc(100%-24px))] space-y-2">
      {toasts.map((t) => (
        <div key={t.id} className={`studio-rise flex items-center gap-3 rounded-[10px] px-4 py-3 text-[15px] shadow-[0_10px_30px_rgba(18,19,23,.28)] ${t.tone === "error" ? "bg-[#3a1714] text-white" : "bg-ink text-white"}`}>
          {t.tone === "error" ? <AlertTriangle size={18} className="text-[#ff8a80] shrink-0" aria-hidden="true" /> : <CheckCircle2 size={18} className="text-teal shrink-0" aria-hidden="true" />}
          <span className="flex-1">{t.text}</span>
          {t.action && (
            <button onClick={() => { t.action!.run(); dismiss(t.id); }} className="font-semibold text-teal hover:text-teal-hover min-h-11 px-2">
              {t.action.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export function Stat({ label, value, hint, tone }: { label: string; value: React.ReactNode; hint?: React.ReactNode; tone?: "gold" }) {
  return (
    <div className={`rounded-[10px] border p-4 md:p-5 ${tone === "gold" ? "border-[#d9bf86] bg-gold-soft" : "border-line bg-white"}`}>
      <p className="text-[13.5px] text-muted">{label}</p>
      <p className="mt-1.5 text-[30px] md:text-[34px] leading-none tracking-[-0.03em] font-medium tabular-nums">{value}</p>
      {hint && <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted">{hint}</div>}
    </div>
  );
}

export function Empty({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-[10px] border border-dashed border-line bg-white px-6 py-10 text-center">
      <p className="text-[17px] font-semibold">{title}</p>
      <p className="mt-2 text-muted text-[15px] max-w-[34em] mx-auto">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
