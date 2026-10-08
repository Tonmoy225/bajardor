import Link from "next/link";

export default function EmptyState({
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন সেটি নেই অথবা সরিয়ে নেওয়া হয়েছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-base-300 bg-base-100 px-6 py-12 text-center">
      <p className="text-6xl font-extrabold text-primary" aria-hidden>
        404
      </p>
      <p className="mt-2 text-4xl" aria-hidden>
        🧺
      </p>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-6 font-bold shadow-md">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
