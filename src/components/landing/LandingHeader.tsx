"use client";

import Link from "next/link";
import { ChevronDown, Menu, X, ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "./landing-data";

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-20px)",
        pointerEvents: mounted ? "auto" : "none",
        transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="landing-header-inner mx-auto flex h-20 w-[min(100%-2rem,1360px)] items-center justify-between px-3 md:px-5">
        <Link href="/" className="group flex items-center gap-2 md:gap-2.5">
          <span className="brand-mark">ADMIN</span>
          <span className="font-display text-2xl sm:text-3xl leading-none tracking-tight text-white md:text-4xl">
            VISION
          </span>
        </Link>

        <nav className="nav-shell hidden items-center gap-6 text-sm font-bold text-white lg:flex">
          {navItems.map((item, index) =>
            item.href.startsWith("#") ? (
              <a
                key={item.label}
                href={item.href}
                className={index === 0 ? "nav-link active" : "nav-link"}
              >
                {item.label}
                {["Services", "Portfolio"].includes(item.label) && (
                  <ChevronDown size={14} strokeWidth={2.8} />
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

        <div className="nav-actions flex items-center gap-3">
          <Link href="/plans" className="nav-book-button !hidden lg:!inline-flex">
            <span className="nav-book-button-inner">
              Book A Session <Star size={16} className="star-icon" fill="#fff" strokeWidth={0} />
            </span>
          </Link>

          <button
            className="mobile-menu-toggle inline-flex items-center justify-center text-white lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`overflow-hidden transition-all duration-500 lg:hidden`}
        style={{
          maxHeight: mobileMenuOpen ? "500px" : "0",
          opacity: mobileMenuOpen ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="mobile-menu-panel mx-4 mb-4 p-5 shadow-2xl">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-menu-link block py-3.5 text-base font-semibold text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/plans"
            onClick={() => setMobileMenuOpen(false)}
            className="quote-button mt-5 flex justify-center"
          >
            Book a Session
          </Link>
        </div>
      </div>
    </header>
  );
}
