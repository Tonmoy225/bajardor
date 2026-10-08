export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl space-y-6" aria-busy="true" aria-label="লোড হচ্ছে">
      <div className="skeleton h-5 w-56" />
      <div className="skeleton h-48 w-full rounded-3xl" />
      <div className="skeleton h-64 w-full rounded-3xl" />
      <div className="skeleton h-96 w-full rounded-3xl" />
    </div>
  );
}
