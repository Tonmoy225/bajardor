import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/bn";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug).catch(() => null);
  return { title: category ? category.nameBn : "পাতাটি পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound(); // invalid slug -> friendly 404 with "হোম পেজে ফিরে যান"

  const products = await getProductsByCategory(slug);

  return (
    <div>
      <section className="mb-4 flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 px-5 py-5 sm:px-6">
        <span className="text-4xl sm:text-5xl" aria-hidden>
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">{category.nameBn}</h1>
          <p className="text-sm text-base-content/70">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>
      <CategoryProducts products={products} />
    </div>
  );
}
