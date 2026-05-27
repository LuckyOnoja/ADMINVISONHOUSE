import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { spaces } from "./landing-data";

export function PortfolioSection() {
  return (
    <section id="portfolio" className="section-pad bg-[#080808]">
      <div className="mx-auto max-w-[1880px] px-6 md:px-10 lg:px-14">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2 className="section-title">BOOK THE FRAME</h2>
          </div>
          <Link href="/plans" className="text-link">
            View All Spaces <ArrowRight size={24} />
          </Link>
        </div>

        <div className="portfolio-grid">
          {spaces.map((space, index) => (
            <Link
              key={space.id}
              href={`/book/${space.id}`}
              className={index === 0 ? "space-card feature" : "space-card"}
            >
              <span className="corner-arrow">
                <ArrowUpRight size={28} />
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
