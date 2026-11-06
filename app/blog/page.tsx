import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import { allPosts, formatDate } from "@/lib/blog";
import { getService } from "@/lib/services";

export const metadata: Metadata = {
  title: "Blog: Sourcing, Importing and Buying from the UK | Next Level Procurement",
  description:
    "Practical guides on sourcing products, importing from China and buying from the UK, from the Next Level Procurement team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = allPosts();
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Guides for smarter buying"
        lead="Sourcing, importing from China and buying from the UK, explained simply."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <section className="section-padding">
        <div className="container mx-auto max-w-5xl">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">Our first guides are on the way.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group p-7 rounded-xl bg-card border border-border hover:border-teal/30 transition-colors flex flex-col"
                >
                  <p className="font-mono text-xs text-muted-foreground mb-4">
                    {formatDate(p.date)}
                    {p.service && getService(p.service) ? ` · ${getService(p.service)!.title}` : ""}
                  </p>
                  <h2 className="font-heading font-bold text-lg text-foreground mb-3 leading-snug">{p.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-teal text-sm font-semibold">
                    Read <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
