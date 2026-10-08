import { getCategories } from "@/lib/api";
import NavLinks from "./NavLinks";

export default async function NavCategories() {
  try {
    const categories = await getCategories();
    return <NavLinks categories={categories} />;
  } catch {
    return null; // keep the header usable even if the API is down
  }
}
