import { ProductGridSkeleton } from "@/components/ProductGrid";

export default function Loading() {
  return (
    <div>
      <div className="skeleton mb-4 h-24 w-full rounded-2xl" />
      <div className="skeleton mb-3 h-16 w-full rounded-2xl" />
      <div className="skeleton mb-4 h-4 w-48" />
      <ProductGridSkeleton count={6} />
    </div>
  );
}
