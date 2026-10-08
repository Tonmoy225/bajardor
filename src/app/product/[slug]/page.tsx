import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { getProductBySlug } from "@/lib/api";
import { formatNumber, perUnit, unitLabel } from "@/lib/bn";
import { requireSession } from "@/lib/session";
import { marketRows, priceSummary } from "@/lib/stats";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  return { title: product ? product.nameBn : "পাতাটি পাওয়া যায়নি" };
}

function ChangeSentence({ today, yesterday }: { today: number; yesterday: number }) {
  const diff = today - yesterday;
  if (diff === 0) return <>গতকালের মতোই আছে</>;
  return (
    <>
      গতকালের তুলনায় আজ দাম <strong>{diff > 0 ? "বেড়েছে" : "কমেছে"}</strong> ·{" "}
      {formatNumber(Math.abs(diff))} টাকা
    </>
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  await requireSession(`/product/${slug}`); // protected route

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const rows = marketRows(product);
  const { min, max, avg } = priceSummary(product, rows);
  const unit = unitLabel(product.unit);

  const history = [
    { label: "আজ", value: product.today },
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-base-content/70">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span aria-hidden>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-primary">
          {product.categoryNameBn}
        </Link>
        <span aria-hidden>›</span>
        <span className="font-medium text-base-content">{product.nameBn}</span>
      </nav>

      {/* Summary */}
      <section className="flex flex-col gap-5 rounded-3xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-4 sm:gap-5">
          <span aria-hidden className="grid size-20 shrink-0 place-items-center rounded-2xl bg-base-200 text-4xl sm:size-24 sm:text-5xl">
            {product.image}
          </span>
          <div>
            <h1 className="text-2xl font-extrabold sm:text-4xl">{product.nameBn}</h1>
            <p className="mt-1 text-sm text-base-content/70">
              {perUnit(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-2 text-sm">
              <ChangeSentence today={product.today} yesterday={product.yesterday} />
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href={`/category/${product.category}`}
                className="badge badge-secondary gap-1 py-3 font-semibold"
              >
                <span aria-hidden>{product.categoryIcon}</span>
                {product.categoryNameBn}
              </Link>
              <span className="badge badge-outline py-3">{perUnit(product.unit)}</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-base-200 px-8 py-5 text-center sm:min-w-44">
          <p className="text-sm text-base-content/70">আজকের দাম</p>
          <p className="text-4xl font-extrabold">{formatNumber(product.today)}</p>
          <p className="text-sm">
            <span className="text-primary">টাকা</span> / {unit}
          </p>
          <ChangeBadge change={product.change} className="mt-2 bg-transparent" />
        </div>
      </section>

      {/* Price summary */}
      <section className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-8">
        <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "সর্বনিম্ন দাম", value: min, hint: "সবচেয়ে কম দামের বাজার" },
            { label: "সর্বাধিক দাম", value: max, hint: "সবচেয়ে বেশি দামের বাজার" },
            { label: "গড় দাম", value: avg, hint: `প্রতি ${unit}-এর হিসাবে` },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-base-300 p-4">
              <p className="text-sm text-base-content/70">{s.label}</p>
              <p className="mt-1 text-primary">
                <span className="text-3xl font-extrabold">{formatNumber(s.value)}</span>{" "}
                <span className="text-sm">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-base-content/70">{s.hint}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-6 mb-3 text-sm font-semibold text-base-content/70">দামের পরিবর্তন</h3>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {history.map((h) => (
            <div key={h.label} className="rounded-xl bg-base-200 px-4 py-3">
              <dt className="text-xs text-base-content/70">{h.label}</dt>
              <dd className="font-bold">{formatNumber(h.value)} টাকা</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Market-wise prices */}
      <section className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-8">
        <h2 className="mb-4 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {rows.length === 0 ? (
          <p className="text-sm text-base-content/70">এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="border-b border-base-300 text-base-content/70">
                  <th className="px-4 py-3 text-left font-medium">বাজার</th>
                  <th className="px-4 py-3 text-left font-medium">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.market} className="border-b border-base-300 last:border-0 even:bg-base-200/60">
                    <td className="px-4 py-3 font-medium">{r.market}</td>
                    <td className="px-4 py-3">{r.division}</td>
                    <td className="px-4 py-3 text-right">{formatNumber(r.min)} টাকা</td>
                    <td className="px-4 py-3 text-right">{formatNumber(r.max)} টাকা</td>
                    <td className="px-4 py-3 text-right font-bold">{formatNumber(r.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
