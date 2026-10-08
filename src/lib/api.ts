import { cache } from "react";
import type { Category, Product } from "./types";

const BASE_URLS = [
  process.env.API_BASE_URL_1 ?? "https://api.api-store.workers.dev/api/bazardor",
  process.env.API_BASE_URL_2 ?? "https://api.abcz.workers.dev/api/bazardor",
];

/** Tries BASE_URL_1, then falls back to BASE_URL_2. */
async function request<T>(path: string): Promise<T> {
  let lastError: unknown;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(`API ${res.status} for ${path}`);
      return (await res.json()) as T;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("API unavailable");
}

export const getProducts = cache(() => request<Product[]>("/products"));
export const getCategories = cache(() => request<Category[]>("/categories"));

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getCategoryBySlug(slug: string) {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getProductsByCategory(slug: string) {
  const products = await getProducts();
  return products.filter((p) => p.category === slug);
}
