import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="bg-[#2f9f57] px-6 py-16 text-black md:px-10 lg:px-14">
      <div className="mx-auto flex max-w-[1880px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <h2 className="font-display text-7xl leading-none tracking-normal text-white md:text-9xl">
          READY TO SHOOT?
        </h2>
        <Link href="/plans" className="black-button">
          Book a Session <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
