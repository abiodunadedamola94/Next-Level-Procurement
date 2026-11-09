import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reviews from "@/components/Reviews";
import CtaBand from "@/components/CtaBand";
import { TRUSTPILOT_WRITE_URL } from "@/lib/trustpilot";
import { PrimaryLink } from "@/components/Buttons";

export const metadata: Metadata = {
  title: "Reviews | Next Level Procurement",
  description: "What customers say about Next Level Procurement, from our Trustpilot page. Worked with us? Write a review.",
  alternates: { canonical: "/reviews" },
};

// Reviews are re-read from Trustpilot at most once an hour (lib/trustpilot.ts).
export const revalidate = 3600;

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title="Reviews from our customers"
        lead="Every review here is written on Trustpilot, an independent review site. We cannot edit or remove them."
        crumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
      >
        <PrimaryLink href={TRUSTPILOT_WRITE_URL}>Write a review</PrimaryLink>
      </PageHeader>
      <Reviews limit={20} more={false} id="all-reviews" bare />
      <CtaBand />
    </>
  );
}
