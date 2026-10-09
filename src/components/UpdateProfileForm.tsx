"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-messages";

export default function UpdateProfileForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      const message = "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
      setError(message);
      toast.error(message);
      return;
    }

    if (trimmed.length > 50) {
      const message = "নাম ৫০ অক্ষরের বেশি হতে পারবে না";
      setError(message);
      toast.error(message);
      return;
    }
    if (trimmed === currentName.trim()) {
      const message = "নতুন কোনো নাম দেননি";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    try {
      // https://better-auth.com/docs/concepts/users-accounts#update-user
      const { error } = await authClient.updateUser({ name: trimmed });
      if (error) {
        const message = authErrorMessage(error);
        setError(message);
        toast.error(message);
        setLoading(false);
        return;
      }
      toast.success("নাম সফলভাবে হালনাগাদ হয়েছে");
      // Stay on the page: refresh server data so the profile card shows the new name.
      // (The header updates by itself because it reads the same session.)
      setLoading(false);
      router.refresh();
    } catch {
      const message = "নাম আপডেট করা যায়নি, আবার চেষ্টা করুন";
      setError(message);
      toast.error(message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold">
          নাম
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input w-full"
        />
      </div>
      {error && (
        <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
          {error}
        </p>
      )}
      <button type="submit" disabled={loading} className="btn btn-primary font-bold shadow-md">
        {loading && <span className="loading loading-spinner loading-sm" />}
        নাম হালনাগাদ করুন
      </button>
    </form>
  );
}
