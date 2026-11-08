import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { WHATSAPP_LINK, PHONE_DISPLAY, PHONE_TEL, EMAIL, MOTTO } from "@/lib/site";
import { navMenus } from "@/lib/nav";
import { allPosts } from "@/lib/blog";

const heading = "mono-label !text-[11.5px] text-[#7b8390] mb-4 pb-3 border-b border-ink-line";
const link = "text-muted-dark hover:text-white transition-colors inline-block py-1";

// Mega footer: every page in the menu, grouped the same way, so the footer doubles as the site map.
const Footer = () => {
  const menus = navMenus(allPosts().length > 0);
  return (
    <footer className="bg-ink text-white border-t border-ink-line overflow-hidden">
      {/* Closing strip: one more chance to start */}
      <div className="border-b border-ink-line">
        <div className="wrap py-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <p className="text-[clamp(24px,2.6vw,34px)] tracking-[-0.03em] leading-tight">
            Need something bought, checked and delivered? <span className="text-teal">Send us the details.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/quote" className="btn bg-teal text-ink hover:bg-teal-hover group">
              Request a quote <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]" />
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn border-[#3a3e48] text-white hover:border-teal">
              <MessageCircle size={17} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="wrap pt-16 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.25fr_repeat(5,1fr)] gap-x-8 gap-y-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image src="/logo-nlp.png" alt="Next Level Procurement" width={720} height={240} sizes="144px" className="w-36 h-auto mb-6" />
            <p className="text-[19px] tracking-tight leading-snug max-w-[12em]">{MOTTO}</p>
            <ul className="mt-6 space-y-1 text-[14.5px]">
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 py-1 text-teal hover:text-teal-hover transition-colors">
                  <MessageCircle size={15} aria-hidden="true" /> Chat on WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_TEL}`} className={`inline-flex items-center gap-2.5 ${link}`}>
                  <Phone size={15} aria-hidden="true" /> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={`inline-flex items-center gap-2.5 break-all ${link}`}>
                  <Mail size={15} aria-hidden="true" /> {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {menus.map((m) => (
            <div key={m.label}>
              <h2 className={heading}>{m.label}</h2>
              <ul className="space-y-1 text-[14.5px]">
                {m.groups
                  .flatMap((g) => g.items)
                  .filter((it, i, all) => all.findIndex((x) => x.href === it.href) === i)
                  .map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} className={link}>{it.label}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
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
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/privacy" className="hover:text-white transition-colors underline-offset-4 hover:underline">Privacy</Link>
            <span>UK · China · Europe · Turkey · Africa</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
