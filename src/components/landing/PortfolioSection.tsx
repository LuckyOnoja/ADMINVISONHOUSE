"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { spaces } from "./landing-data";
import { useScrollReveal } from "./useScrollReveal";

export function PortfolioSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="portfolio"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="bg-[#050505]"
      style={{ padding: `var(--section-pad) 0` }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow sr">Portfolio</p>
            <h2 className="section-title sr sr-delay-1">BOOK THE FRAME</h2>
          </div>
          <Link href="/plans" className="text-link sr sr-delay-2">
            View All Spaces <ArrowRight size={18} />
          </Link>
        </div>

        <div className="portfolio-grid">
          {spaces.map((space, index) => (
            <Link
              key={space.id}
              href={`/book/${space.id}`}
              className={`space-card sr-scale sr-delay-${index + 1} ${
                index === 0 ? "feature" : ""
              }`}
            >
              <span className="corner-arrow">
                <ArrowUpRight size={22} />
              </span>
              <span className="space-meta">{space.tag}</span>
              <strong>{space.name}</strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
