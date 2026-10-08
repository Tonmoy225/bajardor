"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-messages";
import { Divider } from "./AuthShell";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function fail(message: string) {
    setError(message);
    toast.error(message);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) return fail("আপনার নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return fail("সঠিক ইমেইল ঠিকানা দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মিলছে না");

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) return fail(authErrorMessage(error));

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold">
            নাম
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="যেমন: রহিম উদ্দিন"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input w-full"
          />
        </div>
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
            autoComplete="new-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="mb-1 block text-sm font-semibold">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="আবার লিখুন"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>
      <Divider />
      <SocialButtons callbackURL="/" />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}
