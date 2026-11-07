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

const heading = "mono-label text-[#7b8390] mb-5";
const link = "text-muted-dark hover:text-white transition-colors inline-block py-1";

const Footer = () => (
  <footer className="bg-ink text-white border-t border-ink-line overflow-hidden">
    <div className="wrap pt-20 pb-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] gap-12">
        <div>
          <Image src="/footerLogo.png" alt="Next Level Procurement" width={454} height={354} className="w-28 h-auto mb-6" />
          <p className="text-[22px] font-semibold tracking-tight leading-snug max-w-[12em]">{MOTTO}</p>
        </div>

        <div>
          <h2 className={heading}>Services</h2>
          <ul className="space-y-1.5 text-[15px]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className={link}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Company</h2>
          <ul className="space-y-1.5 text-[15px]">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Get in touch</h2>
          <ul className="space-y-1.5 text-[15px]">
            <li>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 py-1 text-teal hover:text-teal-hover transition-colors">
                <MessageCircle size={16} aria-hidden="true" /> Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:${PHONE_TEL}`} className={`inline-flex items-center gap-2.5 ${link}`}>
                <Phone size={16} aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={`inline-flex items-center gap-2.5 break-all ${link}`}>
                <Mail size={16} aria-hidden="true" /> {EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Giant outline wordmark: the sign-off of the page */}
    <div aria-hidden="true" className="wrap select-none">
      <p className="outline-word font-semibold tracking-[-0.05em] leading-[0.8] text-[clamp(60px,17.6vw,258px)] whitespace-nowrap pb-[0.06em]">
        Next Level
      </p>
    </div>

    <div className="border-t border-ink-line">
      <div className="wrap py-6 flex flex-col sm:flex-row gap-2 justify-between mono-label text-[#7b8390] !text-[11.5px]">
        <p>© {new Date().getFullYear()} Next Level Procurement. All rights reserved.</p>
        <p>UK · China · Europe · Turkey · Africa</p>
      </div>
    </div>
  </footer>
);

export default Footer;
