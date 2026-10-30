import { Crown } from "lucide-react";

export default function RecommendedBadge({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet to-violet-deep font-bold uppercase tracking-[0.14em] text-white ${
        small ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-[12px]"
      }`}
    >
      <Crown aria-hidden="true" className={small ? "size-3" : "size-3.5"} />
      Recommended
    </span>
  );
}
