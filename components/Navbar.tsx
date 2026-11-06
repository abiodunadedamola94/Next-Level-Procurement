"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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

// The Blog link shows only once at least one post is published.
const Navbar = ({ showBlog = false }: { showBlog?: boolean }) => {
  const navLinks = allLinks.filter((l) => showBlog || l.href !== "/blog");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      aria-label="Main"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
        <Link href="/" className="flex items-center" aria-label="Next Level Procurement, home">
          <Image loading="eager" src="/logo.png" alt="Next Level Procurement" width={277} height={28} className="h-10 md:h-12 w-52 md:w-60 object-contain object-left" />
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`text-sm font-medium transition-colors ${
                isActive(l.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-teal/20"
          >
            Request a quote
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Link href="/quote" className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-lg">
            Quote
          </Link>
          <button
            className="text-foreground p-2.5 -mr-2"
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
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 pb-6 pt-2">
              {[{ label: "Home", href: "/" }, ...navLinks].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-muted-foreground hover:text-foreground transition-colors font-medium border-b border-border/60"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 border border-border text-foreground text-sm font-semibold px-5 py-3 rounded-lg text-center"
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
