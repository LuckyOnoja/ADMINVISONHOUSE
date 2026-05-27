"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "./landing-data";

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-24 max-w-[1880px] items-center justify-between px-6 md:px-10 lg:px-14">
        <Link href="/" className="group flex items-center gap-3">
          <span className="brand-mark">ADMIN</span>
          <span className="font-display text-5xl leading-none tracking-normal text-white md:text-6xl">
            VISION
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-lg font-bold text-white lg:flex xl:gap-11">
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

        <div className="flex items-center gap-3">
          <Link href="/plans" className="quote-button hidden md:inline-flex">
            Get a Quote
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="grid h-12 w-12 place-items-center bg-[#2f9f57] text-white lg:hidden"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
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
