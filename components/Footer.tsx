"use client";

import { MessageCircle } from "lucide-react";
import Image from "next/image";

const WHATSAPP_LINK = "https://wa.me/447346485225";

const links = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Who We Are", href: "#who-we-are" },
  { label: "Our Services", href: "#services" },
];

const Footer = () => {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-dark border-t border-border text-foreground">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Image src={'/footerLogo.png'} alt="Next Level Procurement" width={200} height={48} className="h-28 w-32 mb-3" style={{ width: "auto" }} />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Elevate your procurement process to the next Level.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => { e.preventDefault(); handleClick(l.href); }}
                    className="text-muted-foreground hover:text-teal transition-colors text-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Get In Touch
            </h4>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal hover:text-teal-light transition-colors text-sm"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Next Level Procurement. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
