import { formatPct } from "@/lib/bn";
import { DIRECTION_STYLE } from "@/lib/ui";
import type { Product } from "@/lib/types";

export default function ChangeBadge({
  change,
  className = "",
}: {
  change: Product["change"];
  className?: string;
}) {
  const dir = DIRECTION_STYLE[change.dir];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-base-200 px-2.5 py-1 text-xs font-semibold ${dir.text} ${className}`}
    >
      <span aria-hidden>{dir.arrow}</span>
      {change.dir === "flat" ? "০.০%" : formatPct(change.pct)}
      <span className="sr-only">
        {change.dir === "up" ? "বেড়েছে" : change.dir === "down" ? "কমেছে" : "অপরিবর্তিত"}
      </span>
    </span>
  );
}
