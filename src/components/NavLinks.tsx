"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function NavLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="পণ্যের বিভাগ"
      className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 py-2 md:mx-0 md:px-0"
    >
      {categories.map((c) => {
        const active = pathname === `/category/${c.slug}`;
        return (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
              active
                ? "bg-primary text-primary-content shadow-sm"
                : "text-base-content hover:bg-base-200"
            }`}
          >
            <span aria-hidden>{c.icon}</span>
            {c.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}
