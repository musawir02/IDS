import { Crown } from "lucide-react";

export default function RecommendedBadge({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-violet font-semibold text-white ${
        small ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
      }`}
    >
      <Crown aria-hidden="true" className={small ? "size-3" : "size-3.5"} />
      Recommended
    </span>
  );
}
