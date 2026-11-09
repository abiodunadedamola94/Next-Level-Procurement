// Her Trustpilot reviews, shown in our own design (decided 9 Nov 2026).
//
// The reviews are written on Trustpilot and read from Trustpilot's API on the server, so visitors see
// our layout, not Trustpilot's widget. The API needs a key from her Trustpilot Business account
// (Integrations > API). Until TRUSTPILOT_API_KEY is set in the Vercel project, loadReviews() returns null
// and the section shows only the links to read and write reviews; no score or review is ever typed in by hand.
// Optional: TRUSTPILOT_BUSINESS_UNIT_ID skips the look-up by domain.

export const TRUSTPILOT_DOMAIN = "nextlevelprocurements.com";
export const TRUSTPILOT_REVIEWS_URL = `https://uk.trustpilot.com/review/${TRUSTPILOT_DOMAIN}`;
export const TRUSTPILOT_WRITE_URL = `https://uk.trustpilot.com/evaluate/${TRUSTPILOT_DOMAIN}`;

const API = "https://api.trustpilot.com/v1";
const HOUR = 3600;

export type Review = { id: string; stars: number; title: string; text: string; name: string; date: string };
export type ReviewData = { trustScore: number; total: number; reviews: Review[] };

async function get<T>(path: string, key: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { headers: { apikey: key }, next: { revalidate: HOUR } });
  if (!res.ok) throw new Error(`Trustpilot ${res.status} on ${path.split("?")[0]}`);
  return res.json() as Promise<T>;
}

export async function loadReviews(limit = 6): Promise<ReviewData | null> {
  const key = process.env.TRUSTPILOT_API_KEY;
  if (!key) return null;
  try {
    const id =
      process.env.TRUSTPILOT_BUSINESS_UNIT_ID ||
      (await get<{ id: string }>(`/business-units/find?name=${TRUSTPILOT_DOMAIN}`, key)).id;
    const [unit, list] = await Promise.all([
      get<{ score?: { trustScore?: number }; numberOfReviews?: { total?: number } }>(`/business-units/${id}`, key),
      get<{ reviews?: { id: string; stars: number; title?: string; text?: string; consumer?: { displayName?: string }; createdAt: string }[] }>(
        `/business-units/${id}/reviews?perPage=${limit}&orderBy=createdat.desc&language=all`,
        key,
      ),
    ]);
    return {
      trustScore: unit.score?.trustScore ?? 0,
      total: unit.numberOfReviews?.total ?? 0,
      reviews: (list.reviews ?? []).map((r) => ({
        id: r.id,
        stars: r.stars,
        title: r.title ?? "",
        text: r.text ?? "",
        name: r.consumer?.displayName ?? "A customer",
        date: r.createdAt,
      })),
    };
  } catch (e) {
    // A failed call must never break the page: fall back to the links.
    console.error("Trustpilot reviews unavailable:", (e as Error).message);
    return null;
  }
}
