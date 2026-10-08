import Link from "next/link";
import BanglaDate from "./BanglaDate";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="বাজার দর - হোম">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-xl shadow-sm">
        🛒
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-bold sm:text-xl">বাজার দর</span>
        <BanglaDate className="block text-[11px] text-base-content/70 sm:text-xs" />
      </span>
    </Link>
  );
}
