"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { WHATSAPP_LINK } from "@/lib/site";

const allLinks = [
  { label: "Services", href: "/services" },
  { label: "StarterKit", href: "/starter-kit" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Ink bar: her logo is light type, so the bar stays dark on every page.
// The Blog link shows only once at least one post is published.
const Navbar = ({ showBlog = false }: { showBlog?: boolean }) => {
  const navLinks = allLinks.filter((l) => showBlog || l.href !== "/blog");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      aria-label="Main"
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color] duration-300 border-b ${
        scrolled || mobileOpen ? "bg-ink/90 backdrop-blur-xl border-ink-line" : "bg-ink/0 border-transparent"
      }`}
    >
      <div className="wrap flex items-center justify-between h-[72px] gap-6">
        <Link href="/" className="flex items-center shrink-0 py-2" aria-label="Next Level Procurement, home">
          <Image
            loading="eager"
            src="/logo.png"
            alt="Next Level Procurement"
            width={831}
            height={84}
            className="h-5 min-[420px]:h-6 md:h-8 w-auto"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`relative px-3.5 py-2.5 text-[15px] transition-colors ${
                isActive(l.href) ? "text-white" : "text-muted-dark hover:text-white"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span aria-hidden="true" className="absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-teal" />
              )}
            </Link>
          ))}
          <Link href="/quote" className="btn bg-teal text-ink hover:bg-teal-hover min-h-11 px-5 text-[15px] ml-4 group">
            Request a quote
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <Link href="/quote" className="btn bg-teal text-ink min-h-11 px-4 text-[15px]">
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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-ink border-t border-ink-line overflow-hidden"
          >
            <div className="wrap flex flex-col pb-6 pt-2">
              {[{ label: "Home", href: "/" }, ...navLinks].map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center justify-between py-4 text-[22px] font-medium tracking-tight text-white border-b border-ink-line"
                >
                  {l.label}
                  <span className="mono-label text-muted-dark">0{i + 1}</span>
                </Link>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-6 border-[#3a3e48] text-white"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
