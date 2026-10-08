import Image from "next/image";
import BanglaDate from "./BanglaDate";

export default function Hero() {
  return (
    <section className="grid items-center gap-6 rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-8 md:grid-cols-[1.4fr_1fr]">
      <div>
        <BanglaDate className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-content" />
        <h1 className="mt-3 text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-base-content/70 sm:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
          সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        {/* Plain anchor: scrolls on the same page, no route change */}
        <a href="#সব-পণ্য" className="btn btn-primary mt-6 font-bold shadow-md">
          সব পণ্য দেখুন
        </a>
      </div>
      <div className="flex justify-center md:justify-end">
        <Image
          src="/hero.png"
          alt="সবজির ঝুড়ি"
          width={315}
          height={263}
          priority
          className="h-auto w-56 sm:w-72 md:w-full md:max-w-xs"
        />
      </div>
    </section>
  );
}
