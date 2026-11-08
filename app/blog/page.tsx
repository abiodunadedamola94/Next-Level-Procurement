import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { allPosts, formatDate } from "@/lib/blog";
import { getService } from "@/lib/services";

export const metadata: Metadata = {
  title: "Blog: Sourcing, Importing and Buying from the UK | Next Level Procurement",
  description:
    "Practical guides on sourcing products, importing from China and buying from the UK, from the Next Level Procurement team.",
  alternates: { canonical: "/blog" },
};

// The section headings of a post, for the "In this guide" list.
const headings = (html: string) =>
  [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)]
    .map((m) => m[1].replace(/<[^>]+>/g, "").replace(/&#39;/g, "'").replace(/&amp;/g, "&"))
    .slice(0, 5);

export default function BlogPage() {
  const posts = allPosts();
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Guides for smarter buying"
        lead="Sourcing, importing from China and buying from the UK, explained simply."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <section className="section">
        <div className="wrap">
          {!lead ? (
            <p className="text-muted text-[18px]">Our first guides are on the way.</p>
          ) : (
            <>
              <Reveal>
                <Link href={`/blog/${lead.slug}`} className="group grid lg:grid-cols-[1.2fr_1fr] rounded-[8px] bg-ink text-white overflow-hidden border border-ink">
                  <div className="p-8 md:p-12 flex flex-col">
                    <p className="mono-label text-teal">
                      Latest · {formatDate(lead.date)}
                      {lead.service && getService(lead.service) ? ` · ${getService(lead.service)!.title}` : ""}
                    </p>
                    <h2 className="mt-5 text-[clamp(30px,3.6vw,46px)]">{lead.title}</h2>
                    <p className="mt-5 text-muted-dark text-[18px] max-w-[32em]">{lead.summary}</p>
                    <span className="mt-auto pt-10 inline-flex items-center gap-2 font-semibold text-teal">
                      Read the guide <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="relative p-8 md:p-12 lg:border-l border-t lg:border-t-0 border-ink-line bg-ink-2">
                    <p className="mono-label text-muted-dark">In this guide</p>
                    <ol className="mt-5">
                      {headings(lead.html).map((h, i) => (
                        <li key={h} className="grid grid-cols-[36px_1fr] gap-2 py-3.5 border-t first:border-t-0 border-ink-line text-[16px]">
                          <span className="mono-label !text-[11px] text-muted-dark pt-1">{String(i + 1).padStart(2, "0")}</span>
                          {h}
                        </li>
                      ))}
                    </ol>
                  </div>
                </Link>
              </Reveal>
              {rest.length > 0 && (
                <ul className="mt-4 grid md:grid-cols-2 gap-4">
                  {rest.map((p, i) => (
                    <Reveal as="li" key={p.slug} delay={i * 0.08}>
                      <Link href={`/blog/${p.slug}`} className="group flex flex-col h-full rounded-[8px] bg-white border border-line p-8 hover:border-text transition-colors">
                        <p className="mono-label text-muted">
                          {formatDate(p.date)}
                          {p.service && getService(p.service) ? ` · ${getService(p.service)!.title}` : ""}
                        </p>
                        <h2 className="mt-4 text-[26px] leading-tight">{p.title}</h2>
                        <p className="mt-3 text-muted">{p.summary}</p>
                        <span className="mt-auto pt-8 inline-flex items-center gap-2 font-semibold text-teal-text">
                          Read <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
