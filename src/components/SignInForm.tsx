"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-messages";
import { Divider } from "./AuthShell";
import SocialButtons from "./SocialButtons";

export default function SignInForm({
  redirectTo,
  loginRequired,
}: {
  redirectTo: string;
  loginRequired: boolean;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Shown when a protected page redirected here.
  useEffect(() => {
    if (loginRequired) {
      toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, [loginRequired]);

  function fail(message: string) {
    setError(message);
    toast.error(message);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return fail("সঠিক ইমেইল ঠিকানা দিন");
    if (!password) return fail("পাসওয়ার্ড লিখুন");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email: email.trim(), password });
    setLoading(false);
    if (error) return fail(authErrorMessage(error));

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
          />
        </div>
        {error && (
          <p role="alert" className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn btn-primary w-full font-bold shadow-md">
          {loading && <span className="loading loading-spinner loading-sm" />}
          সাইন ইন
        </button>
      </form>
      <Divider />
      <SocialButtons callbackURL={redirectTo} />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
