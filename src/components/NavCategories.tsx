import { getCategories } from "@/lib/api";
import type { Category } from "@/lib/types";
import NavLinks from "./NavLinks";

export default async function NavCategories() {
  let categories: Category[];
  try {
    categories = await getCategories();
  } catch {
    return null; // keep the header usable even if the API is down
  }
  return <NavLinks categories={categories} />;
}
