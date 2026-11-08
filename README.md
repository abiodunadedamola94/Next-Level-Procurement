# Next Level Procurement website

The website of Next Level Procurement: purchasing and sourcing from anywhere, UK personal shopping, consumables supply, and the Made in China StarterKit. Live at https://nextlevelprocurements.com.

Built with Next.js (app router), React and Tailwind CSS, hosted on Vercel. Every push to `main` deploys to the live site.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things are

- `app/`: the pages. Each page sets its own title, description and structured data.
- `components/`: the parts of each page.
- `lib/site.ts`: the name, motto, phone, email, WhatsApp and StarterKit links used everywhere.
- `lib/services.ts`: the three services and the StarterKit.
- `content/blog/`: blog posts as Markdown. `status: draft` shows the post with a "Draft · awaiting approval" label, kept out of Google and the sitemap; `status: published` makes it public.
- `public/count.js`: the enquiry counter on the quote form (counts seen, started and sent; no cookies).
- `scripts/build-route-map.mjs`: rebuilds the dotted map image behind the route map.

## Search engines

`app/sitemap.ts`, `app/robots.ts` and `public/llms.txt` tell Google, Bing and AI search what is on the site. Search Console can be verified by a DNS record, or by setting `GOOGLE_SITE_VERIFICATION` in the Vercel project settings.
