import type { Metadata } from "next";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট" };

export default async function UpdateProfilePage() {
  const session = await requireSession("/profile/update");

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-3xl font-extrabold">তথ্য আপডেট করুন</h1>
      <p className="mt-1 mb-6 text-sm text-base-content/70">আপনার নাম পরিবর্তন করুন।</p>
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-6">
        <UpdateProfileForm currentName={session.user.name} />
      </div>
    </div>
  );
}
