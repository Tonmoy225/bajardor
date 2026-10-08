"use client";

import { useSignOut } from "./useSignOut";

export default function SignOutButton() {
  const signOut = useSignOut();
  return (
    <button
      type="button"
      onClick={signOut}
      className="btn btn-outline btn-error btn-sm font-semibold sm:btn-md"
    >
      ↩ সাইন আউট
    </button>
  );
}
