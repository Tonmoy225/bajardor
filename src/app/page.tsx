import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import { DIRECTION_STYLE } from "@/lib/ui";

function SectionTitle({
  children,
  arrow,
  id,
}: {
  children: React.ReactNode;
  arrow?: { symbol: string; className: string };
  id?: string;
}) {
  return (
    <h2 id={id} className="mb-4 flex scroll-mt-6 items-center gap-2 text-xl font-bold sm:text-2xl">
      {arrow && (
        <span className={`text-base ${arrow.className}`} aria-hidden>
          {arrow.symbol}
        </span>
      )}
      {children}
    </h2>
  );
}

export default async function HomePage() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-12">
      <Hero />

      <section aria-labelledby="risers">
        <SectionTitle
          id="risers"
          arrow={{ symbol: DIRECTION_STYLE.up.arrow, className: DIRECTION_STYLE.up.text }}
        >
          আজ দাম বেড়েছে
        </SectionTitle>
        <ProductGrid products={risers} />
      </section>

      <section aria-labelledby="fallers">
        <SectionTitle
          id="fallers"
          arrow={{ symbol: DIRECTION_STYLE.down.arrow, className: DIRECTION_STYLE.down.text }}
        >
          আজ দাম কমেছে
        </SectionTitle>
        <ProductGrid products={fallers} />
      </section>

      <section id="সব-পণ্য" className="scroll-mt-6">
        <h2 className="text-xl font-bold sm:text-2xl">সব পণ্য</h2>
        <p className="mt-1 mb-4 text-sm text-base-content/70">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে।
        </p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
