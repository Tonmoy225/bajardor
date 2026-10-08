import type { Market, Product } from "./types";

export type MarketRow = Market & { avg: number };

export function marketRows(product: Product): MarketRow[] {
  return (product.markets ?? [])
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);
}

export function priceSummary(product: Product, rows: MarketRow[]) {
  if (rows.length === 0) {
    return { min: product.today, max: product.today, avg: product.today };
  }
  return {
    min: Math.min(...rows.map((r) => r.min)),
    max: Math.max(...rows.map((r) => r.max)),
    avg: Math.round(rows.reduce((sum, r) => sum + r.avg, 0) / rows.length),
  };
}
