import { parseBnNumber } from "./bn";
import type { Product } from "./types";

export type SortMode = "default" | "price-asc" | "price-desc";

export const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

/**
 * Compare by numeric value, never by string, so "৯৯" < "১৪৮" and "99" < "148".
 * parseBnNumber also copes with Bengali digits and thousands separators.
 */
const priceOf = (p: Product) => parseBnNumber(p.today);

export function sortProducts(products: Product[], mode: SortMode): Product[] {
  if (mode === "default") return products;
  const sorted = [...products].sort((a, b) => priceOf(a) - priceOf(b));
  return mode === "price-asc" ? sorted : sorted.reverse();
}
