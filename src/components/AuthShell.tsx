import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <p className="mt-1 text-sm text-base-content/70">{subtitle}</p>
      </div>
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-6">{children}</div>
      <p className="mt-6 text-center text-sm text-base-content/60">
        <Link href="/" className="hover:text-primary">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}

export function Divider() {
  return (
    <div className="my-5 flex items-center gap-3 text-xs text-base-content/60">
      <span className="h-px flex-1 bg-base-300" />
      অথবা
      <span className="h-px flex-1 bg-base-300" />
    </div>
  );
}
