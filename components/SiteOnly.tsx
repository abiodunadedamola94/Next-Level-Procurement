"use client";

import { usePathname } from "next/navigation";

// The public site's header, footer and smooth scroll stay off the Content Studio (/studio),
// which has its own frame.
export default function SiteOnly({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return path?.startsWith("/studio") ? null : <>{children}</>;
}
