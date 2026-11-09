import type { NextConfig } from "next";

const SITE = "https://nextlevelprocurements.com";

// The old .co.uk domain points at this project too. Without these, www.nextlevelprocurement.co.uk served
// the whole site as a second copy, and Google kept showing the .co.uk address in results (seen 8 Nov 2026).
// A permanent redirect of every .co.uk address to the same page on the .com tells Google the site has
// moved, so the .com replaces the .co.uk in results everywhere, the UK included.
const OLD_HOSTS = ["www.nextlevelprocurement.co.uk", "nextlevelprocurement.co.uk"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...OLD_HOSTS.map((value) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value }],
        destination: `${SITE}/:path*`,
        permanent: true,
      })),
      // Turkey is part of Europe, so it no longer has its own page (decided 9 Nov 2026).
      { source: "/routes/turkey", destination: "/routes/europe", permanent: true },
    ];
  },
};

export default nextConfig;
