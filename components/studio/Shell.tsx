"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Home, FileText, Search, History, Settings, LogOut, ExternalLink } from "lucide-react";
import { useStudio } from "./store";
import { Toasts } from "./ui";

const NAV = [
  { href: "/studio", label: "Today", Icon: Home },
  { href: "/studio/posts", label: "Posts", Icon: FileText },
  { href: "/studio/search", label: "Search", Icon: Search },
  { href: "/studio/activity", label: "Activity", Icon: History },
  { href: "/studio/settings", label: "Settings", Icon: Settings },
];

const active = (path: string, href: string) => (href === "/studio" ? path === "/studio" : path.startsWith(href));

export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { state, ready, signOut } = useStudio();
  const waiting = state.posts.filter((p) => p.status === "review").length;
  const isSignIn = path === "/studio/sign-in";

  useEffect(() => {
    if (ready && !state.signedIn && !isSignIn) router.replace("/studio/sign-in");
  }, [ready, state.signedIn, isSignIn, router]);

  if (isSignIn) return <>{children}<Toasts /></>;
  if (!ready || !state.signedIn) return <div className="min-h-svh bg-paper" aria-busy="true" />;

  return (
    <div className="min-h-svh bg-paper md:pl-[248px]">
      {/* Desktop rail */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-[248px] flex-col bg-ink text-white border-r border-ink-line">
        <div className="px-6 pt-7 pb-6">
          <Image src="/logo-nlp.png" alt="Next Level Procurement" width={96} height={32} sizes="96px" />
          <p className="mt-4 mono-label !text-[11px] text-muted-dark">Content Studio</p>
        </div>
        <nav aria-label="Studio" className="px-3 space-y-1">
          {NAV.map(({ href, label, Icon }) => {
            const on = active(path, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={on ? "page" : undefined}
                className={`flex items-center gap-3 rounded-[6px] px-3 min-h-11 text-[15px] transition-colors ${on ? "bg-white/[0.08] text-white" : "text-[#b9c0c9] hover:text-white hover:bg-white/[0.04]"}`}
              >
                <Icon size={18} aria-hidden="true" className={on ? "text-teal" : ""} />
                <span className="flex-1">{label}</span>
                {href === "/studio/posts" && waiting > 0 && (
                  <span className="min-w-6 h-6 px-1.5 grid place-items-center rounded-full bg-gold text-ink text-[12.5px] font-semibold tabular-nums" aria-label={`${waiting} waiting for you`}>
                    {waiting}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto px-6 py-6 space-y-4 text-[14px]">
          <a href="/blog" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#b9c0c9] hover:text-white">
            <ExternalLink size={15} aria-hidden="true" /> Open the blog
          </a>
          <div className="flex items-center justify-between border-t border-ink-line pt-4">
            <div>
              <p className="text-white">Dorcas</p>
              <p className="text-[12.5px] text-muted-dark">Owner · approves posts</p>
            </div>
            <button onClick={() => { signOut(); router.push("/studio/sign-in"); }} aria-label="Sign out" className="grid place-items-center w-11 h-11 rounded-full text-[#b9c0c9] hover:text-white hover:bg-white/[0.06]">
              <LogOut size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>

      {/* Phone top bar */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between bg-ink text-white px-4 h-14">
        <Image src="/logo-nlp.png" alt="Next Level Procurement" width={72} height={24} sizes="72px" />
        <p className="mono-label !text-[11px] text-muted-dark">Content Studio</p>
      </header>

      <div className="border-b border-[#e3d3ad] bg-[#fbf3df] text-[#3d2f0b] text-[13.5px] px-4 md:px-8 py-2.5">
        <strong className="font-semibold">Prototype.</strong> The three drafts are the real ones on your blog; everything else is sample data. Nothing you do here changes the website.
      </div>

      <main id="studio-main" className="px-4 md:px-8 lg:px-10 pt-6 md:pt-8 pb-[110px] md:pb-16 max-w-[1280px]">{children}</main>

      {/* Phone tab bar */}
      <nav aria-label="Studio" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-line pb-[env(safe-area-inset-bottom)]">
        <ul className="grid grid-cols-5">
          {NAV.map(({ href, label, Icon }) => {
            const on = active(path, href);
            return (
              <li key={href}>
                <Link href={href} aria-current={on ? "page" : undefined} className={`relative flex flex-col items-center justify-center gap-1 h-16 text-[11.5px] ${on ? "text-text font-semibold" : "text-muted"}`}>
                  <Icon size={21} aria-hidden="true" className={on ? "text-teal-text" : ""} />
                  {label}
                  {href === "/studio/posts" && waiting > 0 && (
                    <span className="absolute top-2 left-[calc(50%+6px)] min-w-5 h-5 px-1 grid place-items-center rounded-full bg-gold text-ink text-[11px] font-semibold tabular-nums" aria-label={`${waiting} waiting`}>
                      {waiting}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Toasts />
    </div>
  );
}
