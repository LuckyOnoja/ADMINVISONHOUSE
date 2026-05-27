"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "./landing-data";

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header
      className={`landing-header fixed inset-x-0 top-0 z-50 ${scrolled || mobileMenuOpen ? "is-scrolled" : ""
        }`}
    >
      <div className="mx-auto flex h-24 max-w-[1880px] items-center justify-between px-6 md:px-10 lg:px-14">
        <Link href="/" className="group flex items-center gap-3">
          <span className="brand-mark">ADMIN</span>
          <span className="font-display text-3xl leading-none tracking-normal text-white md:text-6xl">
            VISION
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-bold text-white lg:flex xl:gap-11">
          {navItems.map((item, index) =>
            item.href.startsWith("#") ? (
              <a
                key={item.label}
                href={item.href}
                className={index === 0 ? "nav-link active" : "nav-link"}
              >
                {item.label}
                {["Services", "Portfolio"].includes(item.label) && (
                  <ChevronDown size={20} strokeWidth={3} />
                )}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={index === 0 ? "nav-link active" : "nav-link"}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="mx-4 bg-[#151515] p-6 shadow-2xl lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block border-b border-white/10 py-4 text-xl font-bold text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/plans"
            onClick={() => setMobileMenuOpen(false)}
            className="quote-button mt-6 flex justify-center"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
