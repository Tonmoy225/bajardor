"use client";

import { useSyncExternalStore } from "react";
import { banglaDate } from "@/lib/bn";

const subscribe = () => () => {};

/** Renders today's Bangla date on the client so cached pages never show a stale day. */
export default function BanglaDate({ className }: { className?: string }) {
  const text = useSyncExternalStore(subscribe, () => banglaDate(), () => "");
  return (
    <span className={className} suppressHydrationWarning>
      {text || "\u00A0"}
    </span>
  );
}
