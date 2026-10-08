import type { Metadata } from "next";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const session = await requireSession("/profile");
  const { user } = session;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-extrabold">আমার প্রোফাইল</h1>
      <p className="mt-1 mb-6 text-sm text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <section className="flex flex-col gap-4 rounded-3xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} image={user.image} className="size-16 text-2xl sm:size-20" />
          <div className="min-w-0">
            <p className="truncate text-xl font-semibold">{user.name}</p>
            <p className="truncate text-sm text-base-content/70">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </section>

      <section className="mt-4 rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">তথ্য</h2>
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-base-300 pb-3">
            <dt className="text-base-content/70">নাম</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-base-content/70">ইমেইল</dt>
            <dd className="truncate font-medium">{user.email}</dd>
          </div>
        </dl>
        <Link href="/profile/update" className="btn btn-primary mt-6 w-full font-bold shadow-md">
          তথ্য আপডেট করুন
        </Link>
      </section>
    </div>
  );
}
