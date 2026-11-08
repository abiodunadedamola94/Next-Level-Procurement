"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ArrowRight, ChevronDown, Phone, Mail, MessageCircle, GraduationCap, Globe2, Send } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { WHATSAPP_LINK, PHONE_DISPLAY, PHONE_TEL, EMAIL } from "@/lib/site";
import { navMenus, type NavMenu, type NavFeature } from "@/lib/nav";
import ThemeToggle from "@/components/ThemeToggle";

const ease = [0.22, 1, 0.36, 1] as const;

function FeatureArt({ kind }: { kind: NavFeature["kind"] }) {
  if (kind === "kit")
    return (
      <div className="flex items-end justify-between">
        <GraduationCap size={28} className="text-gold" aria-hidden="true" />
        <span className="font-mono text-[34px] leading-none text-white tracking-tight">$20</span>
      </div>
    );
  if (kind === "map")
    return (
      <div className="font-mono text-[11px] tracking-[0.08em] text-muted-dark" aria-hidden="true">
        <div className="flex flex-wrap gap-1.5">
          {["GBR", "CHN", "EUR", "TUR", "AFR"].map((c) => (
            <span key={c} className="px-1.5 py-1 rounded-[3px] border border-ink-line">{c}</span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-px flex-1 border-t border-dashed border-teal/60" />
          <Globe2 size={14} className="text-teal" />
          <span className="text-white">GBR · NGA · +</span>
        </div>
      </div>
    );
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <span className="rounded-[10px] rounded-bl-[3px] bg-[#1f3b37] text-[12.5px] text-white px-3 py-2 leading-snug">I need 200 cartons of gloves</span>
      <Send size={14} className="text-teal shrink-0" />
    </div>
  );
}

function MegaPanel({ menu, id, onNavigate }: { menu: NavMenu; id: string; onNavigate: () => void }) {
  const pathname = usePathname();
  return (
    <div id={id} className="wrap grid grid-cols-[1fr_300px] gap-10 py-9">
      <div className={`grid gap-10 ${menu.groups.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {menu.groups.map((g) => (
          <div key={g.title}>
            <p className="mono-label !text-[11.5px] text-muted bg-paper border border-line rounded-[3px] px-2.5 py-1.5 inline-flex items-center gap-2">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-[1px] bg-gold" />
              {g.title}
            </p>
            <ul className={`mt-4 grid gap-x-8 ${menu.groups.length === 1 && g.items.length > 3 ? "grid-cols-2" : "grid-cols-1"}`}>
              {g.items.map((it) => {
                const active = pathname === it.href;
                return (
                  <li key={it.href + it.label}>
                    <Link
                      href={it.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className="group grid grid-cols-[44px_1fr_auto] gap-2 items-start py-3.5 border-b border-line hover:border-text transition-colors"
                    >
                      <span className="font-mono text-[11.5px] tracking-[0.06em] text-muted pt-[3px]">{it.code ?? "·"}</span>
                      <span>
                        <span className={`block text-[16px] font-medium tracking-tight ${active ? "text-teal-text" : "text-text"}`}>{it.label}</span>
                        {it.desc && <span className="block text-[14px] text-muted mt-0.5 leading-snug">{it.desc}</span>}
                      </span>
                      <ArrowRight size={16} aria-hidden="true" className="mt-1 text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <Link
        href={menu.feature.href}
        onClick={onNavigate}
        className="group relative flex flex-col justify-between gap-8 rounded-[6px] bg-ink text-white p-6 overflow-hidden min-h-[230px]"
      >
        <span aria-hidden="true" className="absolute inset-0 grid-lines opacity-30 [mask-image:linear-gradient(160deg,#000,transparent_70%)]" />
        <span className="relative">
          <span className="mono-label !text-[11px] text-teal">{menu.feature.eyebrow}</span>
          <span className="block mt-2 text-[20px] leading-snug tracking-tight">{menu.feature.title}</span>
          <span className="block mt-1.5 text-[14px] text-muted-dark">{menu.feature.text}</span>
        </span>
        <span className="relative">
          <FeatureArt kind={menu.feature.kind} />
          <span className="mt-5 flex items-center justify-between mono-label !text-[11.5px] text-teal border-t border-ink-line pt-3">
            {menu.feature.cta}
            <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </span>
        </span>
      </Link>
    </div>
  );
}

// Ink bar (her logo is light type). Desktop: grouped mega menus that open on hover or click,
// close on Escape, outside click or route change. Mobile: a full-height accordion.
const Navbar = ({ showBlog = false }: { showBlog?: boolean }) => {
  const menus = navMenus(showBlog);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<number | null>(0);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const close = useCallback(() => setOpen(null), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open !== null) {
        triggers.current[open]?.focus();
        setOpen(null);
      }
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const hoverOpen = (i: number) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(i), open === null ? 90 : 0);
  };
  const hoverClose = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(null), 160);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const solid = scrolled || mobileOpen || open !== null;

  return (
    <>
      <nav aria-label="Main" className="fixed top-0 inset-x-0 z-50" onMouseLeave={hoverClose}>
        {/* Utility strip: the details people look for first */}
        <div
          className={`hidden lg:block bg-ink border-b border-ink-line transition-[margin] duration-300 ${scrolled ? "-mt-9" : "mt-0"}`}
        >
          <div className="wrap h-9 flex items-center justify-between mono-label !text-[11px] text-muted-dark">
            <p className="flex items-center gap-2">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_0_3px_rgba(44,186,172,.2)]" />
              Buying from the UK, China, Europe, Turkey and Africa
            </p>
            <div className="flex items-center gap-5">
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-1.5 hover:text-white transition-colors py-2">
                <Phone size={12} aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors py-2 normal-case tracking-normal">
                <Mail size={12} aria-hidden="true" /> {EMAIL}
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-teal hover:text-teal-hover transition-colors py-2">
                <MessageCircle size={12} aria-hidden="true" /> WhatsApp
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className={`transition-[background-color,border-color] duration-300 border-b ${solid ? "bg-ink/95 backdrop-blur-xl border-ink-line" : "bg-ink/0 border-transparent"}`}>
          <div className="wrap flex items-center justify-between h-[72px] gap-6">
            <Link href="/" className="flex items-center shrink-0 py-2" aria-label="Next Level Procurement, home">
              <Image loading="eager" src="/logo-nlp.png" alt="" width={720} height={240} className="h-8 xl:h-9 w-auto" />
              <span className="ml-3 pl-3 border-l border-ink-line text-white text-[14px] leading-[1.15] tracking-tight hidden min-[400px]:block">
                Next Level
                <br />
                Procurement
              </span>
            </Link>

            <ul className="hidden lg:flex items-center gap-0.5">
              {menus.map((m, i) => (
                <li key={m.label} onMouseEnter={() => hoverOpen(i)}>
                  <button
                    ref={(el) => {
                      triggers.current[i] = el;
                    }}
                    type="button"
                    aria-expanded={open === i}
                    aria-controls={`mega-${i}`}
                    onClick={() => setOpen(open === i ? null : i)}
                    className={`relative flex items-center gap-1.5 px-3 py-2.5 text-[14.5px] transition-colors ${
                      open === i || isActive(m.href) ? "text-white" : "text-muted-dark hover:text-white"
                    }`}
                  >
                    {m.label}
                    <ChevronDown size={14} aria-hidden="true" className={`transition-transform duration-300 ${open === i ? "rotate-180 text-teal" : ""}`} />
                    {(open === i || isActive(m.href)) && (
                      <motion.span layoutId="nav-underline" aria-hidden="true" className="absolute left-3 right-3 -bottom-[15px] h-px bg-teal" />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <div className="hidden lg:flex items-center gap-2">
              <Link href="/quote" className="btn bg-teal text-ink hover:bg-teal-hover min-h-11 px-4 !text-[12.5px] group">
                Request a quote
                <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]" />
              </Link>
            </div>

            <div className="flex lg:hidden items-center gap-1">
              <Link href="/quote" className="btn bg-teal text-ink min-h-11 px-3.5 !text-[12px]">
                Quote
              </Link>
              <button
                className="text-white w-11 h-11 grid place-items-center -mr-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop mega panel */}
        <AnimatePresence>
          {open !== null && (
            <motion.div
              key="panel"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease }}
              onMouseEnter={() => timer.current && clearTimeout(timer.current)}
              className="hidden lg:block bg-white text-text border-b border-line shadow-[0_30px_60px_-30px_rgba(18,19,23,.45)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open}
                  initial={reduce ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -8 }}
                  transition={{ duration: 0.2, ease }}
                >
                  <MegaPanel menu={menus[open]} id={`mega-${open}`} onNavigate={close} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-ink border-t border-ink-line overflow-y-auto overscroll-contain"
            >
              <div className="wrap pb-10 pt-2">
                <ul>
                  {menus.map((m, i) => {
                    const expanded = mobileSection === i;
                    return (
                      <li key={m.label} className="border-b border-ink-line">
                        <button
                          type="button"
                          onClick={() => setMobileSection(expanded ? null : i)}
                          aria-expanded={expanded}
                          className="w-full flex items-center justify-between py-4 text-[21px] tracking-tight text-white"
                        >
                          <span className="flex items-baseline gap-3">
                            <span className="mono-label !text-[11px] text-muted-dark">0{i + 1}</span>
                            {m.label}
                          </span>
                          <ChevronDown size={20} aria-hidden="true" className={`text-muted-dark transition-transform duration-300 ${expanded ? "rotate-180 text-teal" : ""}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease }}
                              className="overflow-hidden"
                            >
                              {m.groups.flatMap((g) => g.items).map((it) => (
                                <li key={it.href + it.label}>
                                  <Link href={it.href} className="flex items-center justify-between gap-3 py-3 pl-8 text-[16px] text-muted-dark hover:text-white">
                                    {it.label}
                                    <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
                                  </Link>
                                </li>
                              ))}
                              <li className="h-3" />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-8 grid gap-3">
                  <Link href="/quote" className="btn bg-teal text-ink">Request a quote</Link>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn border-[#3a3e48] text-white">
                    <MessageCircle size={17} aria-hidden="true" /> Chat on WhatsApp
                  </a>
                </div>
                <div className="mt-8 flex items-center justify-between gap-4">
                  <span className="mono-label !text-[11px] text-muted-dark">Theme</span>
                  <ThemeToggle large />
                </div>
                <p className="mt-8 mono-label !text-[11px] text-muted-dark leading-relaxed">
                  {PHONE_DISPLAY}
                  <br />
                  <span className="normal-case tracking-normal">{EMAIL}</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page dim behind an open mega panel */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="hidden lg:block fixed inset-0 z-40 bg-ink/45 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
