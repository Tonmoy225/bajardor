"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Avatar from "./Avatar";
import { useSignOut } from "./useSignOut";

const closeMenu = () => (document.activeElement as HTMLElement | null)?.blur();

export default function UserMenu() {
  const signOut = useSignOut();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="skeleton h-10 w-28 rounded-lg" aria-label="লোড হচ্ছে" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm font-bold sm:btn-md">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm font-bold shadow-md sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = session;

  async function handleSignOut() {
    closeMenu();
    await signOut();
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-base-200"
        aria-label="ব্যবহারকারীর মেনু"
      >
        <Avatar name={user.name} image={user.image} className="size-9" />
        <span className="hidden max-w-28 truncate text-sm font-semibold sm:block">
          {user.name.split(" ")[0]}
        </span>
        <span className="text-[10px] text-base-content/60" aria-hidden>
          ▾
        </span>
      </button>
      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-2 w-64 rounded-box border border-base-300 bg-base-100 p-4 shadow-lg"
      >
        <p className="truncate font-semibold">{user.name}</p>
        <p className="mb-3 truncate text-xs text-base-content/70">{user.email}</p>
        <Link
          href="/profile"
          onClick={closeMenu}
          className="block rounded-md py-2 text-sm hover:bg-base-200"
        >
          👤 আমার প্রোফাইল
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="block w-full rounded-md py-2 text-left text-sm text-error hover:bg-base-200"
        >
          ↩ সাইন আউট
        </button>
      </div>
    </div>
  );
}
