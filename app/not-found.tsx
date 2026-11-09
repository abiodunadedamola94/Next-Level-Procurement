import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { WHATSAPP_LINK } from "@/lib/site";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Page not found | Next Level Procurement",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const links = [
    ...services.map((s) => ({ href: `/services/${s.slug}`, label: s.title })),
    { href: "/starter-kit", label: "Made in China Importation StarterKit" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_70%_80%_at_70%_30%,#000_15%,transparent_75%)]"
      />
      <div className="relative wrap pt-36 md:pt-44 pb-20 md:pb-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-end">
        <div>
          <p className="mono-label text-teal">Error 404 · Not on the manifest</p>
          <h1 className="mt-5 text-[clamp(40px,6vw,76px)] leading-[1.02] tracking-[-0.03em]">
            This page didn&apos;t arrive.
          </h1>
          <p className="mt-6 max-w-[34em] text-[18px] text-[#c6ccd4]">
            The link may be old, or the address may have a typo. Tell us what you were looking for and we&apos;ll point you to it,
            or start a quote.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/quote" className="btn bg-teal text-ink hover:bg-teal-hover group">
              Request a quote <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/" className="btn border-[#3a3e48] text-white hover:border-teal">Back to home</Link>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-teal hover:text-teal-hover"
          >
            <MessageCircle size={17} aria-hidden="true" /> Ask us on WhatsApp
          </a>
        </div>
        <nav aria-label="Popular pages" className="border-t border-ink-line">
          <p className="mono-label text-[#b9c0c9] pt-5 pb-2">Popular pages</p>
          <ul>
            {links.map((l) => (
              <li key={l.href} className="border-b border-ink-line">
                <Link href={l.href} className="group flex items-center justify-between gap-4 py-4 text-[18px] hover:text-teal transition-colors">
                  {l.label}
                  <ArrowRight size={17} aria-hidden="true" className="text-[#8f97a3] transition-transform group-hover:translate-x-1 group-hover:text-teal" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
