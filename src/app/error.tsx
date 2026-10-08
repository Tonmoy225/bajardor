"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-base-300 bg-base-100 p-8 text-center">
      <p className="text-5xl" aria-hidden>
        🛒
      </p>
      <h1 className="mt-3 text-2xl font-bold">ডেটা লোড করা যায়নি</h1>
      <p className="mt-2 text-sm text-base-content/70">
        বাজারদরের তথ্য আনতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।
      </p>
      <button onClick={reset} className="btn btn-primary mt-6 font-bold">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
