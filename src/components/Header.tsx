import { Suspense } from "react";
import Logo from "./Logo";
import NavCategories from "./NavCategories";
import PriceTicker from "./PriceTicker";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Logo />
        <UserMenu />
      </div>
      <div className="border-t border-base-300/70">
        <div className="mx-auto max-w-6xl px-4">
          <Suspense fallback={<div className="skeleton my-2 h-8 w-full max-w-xl" />}>
            <NavCategories />
          </Suspense>
        </div>
      </div>
      <div className="border-t border-base-300">
        <Suspense fallback={<div className="skeleton h-10 w-full rounded-none" />}>
          <PriceTicker />
        </Suspense>
      </div>
    </header>
  );
}
