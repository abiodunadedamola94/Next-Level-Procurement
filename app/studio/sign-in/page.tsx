"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import { useStudio } from "@/components/studio/store";
import { btn } from "@/components/studio/ui";

// Sign-in by a link sent to an approved address: no password to remember or leak. In the
// prototype the link is a button; in the engine it is a one-time link that works for 15 minutes.
const ALLOWED = (e: string) => /@nextlevelprocurements\.com$/i.test(e) || e.toLowerCase() === "hello@mocreativeconcept.com";

export default function SignIn() {
  const { signIn } = useStudio();
  const router = useRouter();
  const [email, setEmail] = useState("link@nextlevelprocurements.com");
  const [step, setStep] = useState<"ask" | "sent">("ask");
  const [error, setError] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return setError("Check the email address.");
    if (!ALLOWED(v)) return setError("This address can't approve posts for this site. Ask MoCreative to add it.");
    setError("");
    setStep("sent");
  };

  return (
    <div className="min-h-svh bg-ink text-white flex flex-col">
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="relative flex-1 grid place-items-center px-4 py-12">
        <div className="w-full max-w-[420px]">
          <Image src="/logo-nlp.png" alt="Next Level Procurement" width={120} height={40} sizes="120px" priority />
          <p className="mt-8 mono-label !text-[11.5px] text-teal">Content Studio</p>
          <h1 className="mt-3 text-[34px] md:text-[40px]">{step === "ask" ? "Sign in" : "Check your email"}</h1>

          <div className="mt-8 rounded-[12px] bg-white text-text p-6">
            {step === "ask" ? (
              <form onSubmit={send} noValidate>
                <label htmlFor="si-email" className="block text-[15px] font-semibold mb-2">Your email</label>
                <input
                  id="si-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!error}
                  aria-describedby={error ? "si-err" : "si-help"}
                  className="w-full border border-line rounded-[6px] px-4 min-h-[52px] text-[16px] focus:outline-none focus:border-text focus:ring-4 focus:ring-teal/25 aria-[invalid=true]:border-[#b42318]"
                />
                {error ? (
                  <p id="si-err" role="alert" className="mt-2 text-[14px] font-medium text-[#b42318]">{error}</p>
                ) : (
                  <p id="si-help" className="mt-2 text-[14px] text-muted">We email you a link. No password.</p>
                )}
                <button type="submit" className={`${btn.primary} w-full mt-5`}>
                  <Mail size={18} aria-hidden="true" /> Email me a sign-in link
                </button>
              </form>
            ) : (
              <div>
                <p className="text-[16px]">
                  We sent a sign-in link to <strong className="font-semibold break-all">{email}</strong>. It works once, for 15 minutes.
                </p>
                <button onClick={() => { signIn(); router.push("/studio"); }} className={`${btn.approve} w-full mt-6`}>
                  Open the link <span className="font-normal opacity-80">(prototype)</span>
                </button>
                <button onClick={() => setStep("ask")} className={`${btn.quiet} w-full mt-2`}>
                  <ArrowLeft size={17} aria-hidden="true" /> Use a different email
                </button>
              </div>
            )}
          </div>

          <p className="mt-6 flex gap-2.5 text-[14px] text-[#b9c0c9]">
            <ShieldCheck size={18} className="text-teal shrink-0 mt-0.5" aria-hidden="true" />
            Only addresses you approve can sign in. Nothing is published without your yes.
          </p>
        </div>
      </div>
    </div>
  );
}
