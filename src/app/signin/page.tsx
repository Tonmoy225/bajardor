import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import SignInForm from "@/components/SignInForm";
import { safeRedirect } from "@/lib/auth-messages";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন ইন" };

type Props = { searchParams: Promise<{ redirect?: string; reason?: string }> };

export default async function SignInPage({ searchParams }: Props) {
  const { redirect: redirectParam, reason } = await searchParams;
  const redirectTo = safeRedirect(redirectParam);

  // Already signed in? Skip the form.
  const session = await getSession().catch(() => null);
  if (session) redirect(redirectTo);

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <SignInForm redirectTo={redirectTo} loginRequired={reason === "login-required"} />
    </AuthShell>
  );
}
