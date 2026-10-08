import Link from "next/link";
import { formatNumber, perUnit } from "@/lib/bn";
import type { Product } from "@/lib/types";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl"
        >
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-tight">{product.nameBn}</h3>
          <p className="text-xs text-base-content/70">{perUnit(product.unit)}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-base-content/80">আজকের দাম</p>
      <div className="mt-0.5 flex items-center justify-between gap-2">
        <p>
          <span className="text-xl font-bold">{formatNumber(product.today)}</span>{" "}
          <span className="text-sm">টাকা</span>
        </p>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
