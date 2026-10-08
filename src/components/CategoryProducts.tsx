"use client";

import { useMemo, useState } from "react";
import { toBn } from "@/lib/bn";
import { SORT_OPTIONS, sortProducts, type SortMode } from "@/lib/sort";
import type { Product } from "@/lib/types";
import EmptyState from "./EmptyState";
import ProductGrid from "./ProductGrid";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortMode>("default");
  const visible = useMemo(() => sortProducts(products, sort), [products, sort]);

  if (products.length === 0) {
    return (
      <EmptyState
        title="এই বিভাগে কোনো পণ্য নেই"
        message="এই মুহূর্তে এই বিভাগে দেখানোর মতো কোনো পণ্য পাওয়া যায়নি।"
      />
    );
  }

  return (
    <>
      <div className="mb-3 flex items-center justify-end gap-3 rounded-2xl border border-base-300 bg-base-100 px-4 py-3 sm:px-6 sm:py-4">
        <label htmlFor="sort" className="text-sm text-base-content/70">
          সাজান
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="h-9 cursor-pointer appearance-none rounded-lg border border-base-300 bg-base-100 py-0 pr-9 pl-3 text-sm font-medium focus:border-primary focus:outline-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-base-content/70"
          >
            <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p className="mb-4 text-sm text-base-content/70">
        মোট {toBn(visible.length)}টি পণ্য দেখানো হচ্ছে।
      </p>
      <ProductGrid products={visible} />
    </>
  );
}
