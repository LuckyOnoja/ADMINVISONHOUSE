import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="cta-section bg-[#2f9f57] px-6 py-14 text-black md:px-10 lg:px-14">
      <div className="mx-auto flex max-w-[1880px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-xs font-extrabold tracking-[0.25em] text-black/75">
            YOUR NEXT CLIENT CAMPAIGN STARTS HERE
          </p>
          <h2 className="font-display text-6xl leading-none tracking-tight text-white md:text-8xl">
            READY TO SHOOT?
          </h2>
        </div>
        <Link href="/plans" className="black-button">
          Book a Session <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
