"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Choice = "system" | "light" | "dark";
const KEY = "nlp-theme";

// Applied before paint by the script in layout.tsx; this keeps it in step afterwards.
export const themeScript = `(function(){try{var c=localStorage.getItem("${KEY}")||"system";var d=c==="dark"||(c==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-theme",d?"dark":"light")}catch(e){}})();`;

function apply(choice: Choice) {
  const dark = choice === "dark" || (choice === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
}

const options: { value: Choice; label: string; Icon: typeof Sun }[] = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

// Three-way switch: follow the device, or force light or dark. Sits on ink, so its colours are fixed.
export default function ThemeToggle({ className = "", large = false }: { className?: string; large?: boolean }) {
  const [choice, setChoice] = useState<Choice>("system");

  useEffect(() => {
    let saved: Choice = "system";
    try {
      saved = (localStorage.getItem(KEY) as Choice) || "system";
    } catch {}
    // Read after mount so the server render and first client render match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(saved);
  }, []);

  useEffect(() => {
    apply(choice);
    if (choice !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => apply("system");
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [choice]);

  const pick = (c: Choice) => {
    setChoice(c);
    try {
      localStorage.setItem(KEY, c);
    } catch {}
  };

  return (
    <div role="radiogroup" aria-label="Colour theme" className={`inline-flex items-center rounded-full border border-ink-line p-0.5 ${className}`}>
      {options.map(({ value, label, Icon }) => {
        const on = choice === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={`${label} theme`}
            title={`${label} theme`}
            onClick={() => pick(value)}
            className={`grid place-items-center ${large ? "w-11 h-11" : "w-7 h-7"} rounded-full transition-colors ${
              on ? "bg-ink-3 text-teal" : "text-muted-dark hover:text-white"
            }`}
          >
            <Icon size={large ? 17 : 13} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
