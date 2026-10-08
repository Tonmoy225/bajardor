import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

export const gridClass = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className={gridClass}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className={gridClass} aria-busy="true" aria-label="লোড হচ্ছে">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="rounded-2xl border border-base-300 bg-base-100 p-4">
          <div className="flex items-center gap-3">
            <div className="skeleton size-12 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/3" />
            </div>
          </div>
          <div className="skeleton mt-4 h-3 w-16" />
          <div className="mt-2 flex items-center justify-between">
            <div className="skeleton h-6 w-24" />
            <div className="skeleton h-6 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
