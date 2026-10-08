import { getProducts } from "@/lib/api";
import { formatNumber, formatPct, unitLabel } from "@/lib/bn";
import { DIRECTION_STYLE } from "@/lib/ui";
import type { Product } from "@/lib/types";

function TickerItem({ product, hidden }: { product: Product; hidden?: boolean }) {
  const dir = DIRECTION_STYLE[product.change.dir];
  return (
    <li
      aria-hidden={hidden || undefined}
      className="flex items-center gap-2 border-r border-base-300 px-4 py-2 text-sm whitespace-nowrap"
    >
      <span aria-hidden>{product.image}</span>
      <span className="font-semibold">{product.nameBn}</span>
      <span className="text-base-content/70">
        {formatNumber(product.today)} টাকা/{unitLabel(product.unit)}
      </span>
      <span className={`font-semibold ${dir.text}`}>
        {dir.arrow} {formatPct(product.change.pct)}
      </span>
    </li>
  );
}

export default async function PriceTicker() {
  let products: Product[];
  try {
    products = await getProducts();
  } catch {
    return null; // keep the header usable even if the API is down
  }

  return (
    <div className="ticker overflow-hidden bg-base-100" aria-label="আজকের দামের তালিকা">
      {/* The list is rendered twice so translateX(-50%) loops seamlessly. */}
      <ul className="ticker-track">
        {products.map((p) => (
          <TickerItem key={`a-${p.id}`} product={p} />
        ))}
        {products.map((p) => (
          <TickerItem key={`b-${p.id}`} product={p} hidden />
        ))}
      </ul>
    </div>
  );
}
