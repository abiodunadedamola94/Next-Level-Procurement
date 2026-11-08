import type { Metadata, Viewport } from "next";
import { seedState } from "@/lib/studio/seed";
import { StudioProvider } from "@/components/studio/store";
import Shell from "@/components/studio/Shell";

export const metadata: Metadata = {
  title: "Content Studio | Next Level Procurement",
  description: "Approve blog posts for nextlevelprocurements.com.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#121317" };

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudioProvider seed={seedState()}>
      <Shell>{children}</Shell>
    </StudioProvider>
  );
}
