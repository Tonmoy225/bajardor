import { ProductGridSkeleton } from "@/components/ProductGrid";

export default function Loading() {
  return (
    <div className="space-y-12">
      <div className="skeleton h-64 w-full rounded-3xl" />
      <section>
        <div className="skeleton mb-4 h-7 w-48" />
        <ProductGridSkeleton count={6} />
      </section>
      <section>
        <div className="skeleton mb-4 h-7 w-48" />
        <ProductGridSkeleton count={6} />
      </section>
      <section>
        <div className="skeleton mb-4 h-7 w-32" />
        <ProductGridSkeleton count={9} />
      </section>
    </div>
  );
}
