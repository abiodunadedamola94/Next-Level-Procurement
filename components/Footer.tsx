import { MessageCircle, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { WHATSAPP_LINK, PHONE_DISPLAY, PHONE_TEL, EMAIL, MOTTO } from "@/lib/site";
import { services } from "@/lib/services";
import { allPosts } from "@/lib/blog";

const company = [
  { label: "About", href: "/about" },
  { label: "Made in China StarterKit", href: "/starter-kit" },
  ...(allPosts().length ? [{ label: "Blog", href: "/blog" }] : []),
  { label: "Request a quote", href: "/quote" },
  { label: "Contact", href: "/contact" },
];

const heading = "font-heading font-semibold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4";
const link = "text-muted-foreground hover:text-teal transition-colors text-sm";

const Footer = () => (
  <footer className="bg-navy-dark border-t border-border text-foreground">
    <div className="container mx-auto px-4 md:px-8 py-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <Image src="/footerLogo.png" alt="Next Level Procurement" width={200} height={48} className="h-28 w-32 mb-3" style={{ width: "auto" }} />
          <p className="text-muted-foreground text-sm leading-relaxed">{MOTTO}</p>
        </div>

        <div>
          <h2 className={heading}>Services</h2>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={link}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Company</h2>
          <ul className="space-y-2">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Get in touch</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-teal hover:text-teal-light transition-colors">
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:${PHONE_TEL}`} className={`inline-flex items-center gap-2 ${link}`}>
                <Phone size={16} /> {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={`inline-flex items-center gap-2 break-all ${link}`}>
                <Mail size={16} /> {EMAIL}
              </a>
            </li>
          </ul>
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

export default Footer;
