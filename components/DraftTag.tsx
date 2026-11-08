// Marks a blog post that Next Level Procurement has not approved yet.
export default function DraftTag({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 mono-label !text-[10.5px] px-2 py-1 rounded-[4px] border ${
        tone === "dark" ? "border-[#8a6d2f] text-[#e8c77a]" : "border-[#b08a3a] text-[#6b5114] bg-[#fbf3df]"
      } ${className}`}
    >
      Draft · awaiting approval
    </span>
  );
}
