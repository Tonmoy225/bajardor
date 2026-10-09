import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-4 rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-8">
      <h1 className="text-3xl font-extrabold">Privacy Policy</h1>
      <p className="text-sm text-base-content/70">Last updated: October 2026</p>

      <p>
        BazarDor (বাজার দর) is a student project that shows daily grocery
        prices in Bangladesh. This page explains what information we collect
        and how we use it.
      </p>

      <h2 className="pt-2 text-xl font-bold">Information we collect</h2>
      <p>
        When you create an account or sign in with Google or GitHub, we store
        your name, email address and profile picture (if provided). If you sign
        up with email, we also store a securely hashed password.
      </p>

      <h2 className="pt-2 text-xl font-bold">How we use it</h2>
      <p>
        We use this information only to sign you in, show your profile, and
        protect access to product detail pages. We do not sell or share your
        data with third parties, and we do not use it for advertising.
      </p>

      <h2 className="pt-2 text-xl font-bold">Data storage and deletion</h2>
      <p>
        Account data is stored in a MongoDB database. To request deletion of
        your account and data, contact us at the email below.
      </p>

      <h2 className="pt-2 text-xl font-bold">Contact</h2>
      <p>itonmoy92@gmail.com</p>
    </article>
  );
}