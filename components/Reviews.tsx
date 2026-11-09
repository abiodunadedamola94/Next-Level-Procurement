import Link from "next/link";
import { Star, ArrowUpRight, PenLine } from "lucide-react";
import Reveal from "./Reveal";
import { loadReviews, TRUSTPILOT_REVIEWS_URL, TRUSTPILOT_WRITE_URL, type Review } from "@/lib/trustpilot";
import { formatDate } from "@/lib/blog";

function Stars({ n, size = 16 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} aria-hidden="true" className={i <= Math.round(n) ? "text-gold fill-gold" : "text-line fill-line"} />
      ))}
    </span>
  );
}

function ReviewCard({ r, clamp }: { r: Review; clamp: boolean }) {
  return (
    <li className="rounded-[8px] border border-line bg-white p-6 flex flex-col">
      <Stars n={r.stars} />
      {r.title && <p className="mt-4 text-[18px] font-semibold tracking-tight leading-snug">{r.title}</p>}
      <p className={`mt-2 text-[15.5px] text-muted leading-relaxed ${clamp ? "line-clamp-6" : ""}`}>{r.text}</p>
      <p className="mt-auto pt-5 mono-label !text-[11.5px] text-muted">
        {r.name} · {formatDate(r.date)}
      </p>
    </li>
  );
}

const linkCls = "inline-flex items-center gap-2 min-h-11 font-semibold underline-offset-4 hover:underline";

// Reviews in our design, read from Trustpilot (lib/trustpilot.ts). Without the API key it shows the two
// links only. `limit` is how many reviews to show; `more` adds a link to the full reviews page.
// `bare` drops the section's own heading, for the reviews page, whose page header already names it.
export default async function Reviews({ limit = 3, more = true, id = "reviews", bare = false }: { limit?: number; more?: boolean; id?: string; bare?: boolean }) {
  const data = await loadReviews(limit);
  const has = data && data.reviews.length > 0;
  return (
    <section id={id} className="section scroll-mt-24" aria-labelledby={bare ? undefined : `${id}-title`} aria-label={bare ? "Reviews" : undefined}>
      <div className="wrap">
        <Reveal className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
          <div className="max-w-[760px]">
            {!bare && (
              <>
                <p className="mono-label !text-[12px] text-muted">Reviews</p>
                <h2 id={`${id}-title`} className="mt-6 text-[clamp(36px,4.6vw,64px)]">What our customers say.</h2>
              </>
            )}
            {has ? (
              <p className="mt-6 first:mt-0 text-[18px] text-muted flex flex-wrap items-center gap-x-3 gap-y-2">
                <Stars n={data.trustScore} size={20} />
                <span>
                  <span className="text-text font-semibold">{data.trustScore.toFixed(1)}</span> out of 5 from{" "}
                  {data.total} {data.total === 1 ? "review" : "reviews"} on Trustpilot
                </span>
              </p>
            ) : (
              <p className="mt-6 first:mt-0 text-[18px] text-muted max-w-[34em]">
                {bare
                  ? "Read what our customers wrote on Trustpilot. Worked with us? Tell others how it went."
                  : "Our reviews are on Trustpilot, an independent review site. We cannot edit or remove them. Worked with us? Tell others how it went."}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
            <a href={TRUSTPILOT_WRITE_URL} target="_blank" rel="noopener noreferrer" className="group btn bg-ink text-white hover:bg-ink-3">
              <PenLine size={17} aria-hidden="true" /> Write a review
            </a>
            <a href={TRUSTPILOT_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="btn border-line bg-white text-text hover:border-text">
              Read all reviews <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        {has && (
          <Reveal delay={0.1}>
            <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.reviews.slice(0, limit).map((r) => (
                <ReviewCard key={r.id} r={r} clamp={more} />
              ))}
            </ul>
            <p className="mt-5 text-[14px] text-muted">
              Reviews from Trustpilot, newest first.{" "}
              {more && (
                <Link href="/reviews" className={`${linkCls} !min-h-0 text-teal-text`}>
                  See more reviews
                </Link>
              )}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
