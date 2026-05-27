import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { landingImages } from "./landing-data";

export function HeroSection() {
  return (
    <section className="desart-hero relative min-h-screen overflow-hidden px-6 pt-28 md:px-10 lg:px-14">
      <div className="hero-social-rail" aria-label="Social links">
        <a href="#">instagram</a>
        <span />
        <a href="#">linkedin</a>
        <span />
        <a href="#">facebook</a>
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-[1880px] items-center gap-12 lg:grid-cols-[minmax(0,.95fr)_minmax(520px,1.05fr)]">
        <div className="relative z-10 max-w-5xl pb-10 pt-16">
          <span className="hero-ghost-mark">A</span>
          <p className="mb-8 font-mono text-sm uppercase tracking-[0.35em] text-[#2f9f57]">
            Creative Production House
          </p>
          <h1 className="desart-title">
            Creative
            <br />
            Studio Booking
          </h1>
          <p className="mt-10 max-w-3xl text-2xl font-semibold leading-relaxed text-white/58 md:text-3xl">
            We create cinematic production spaces for photographers,
            videographers, podcasters, and brands ready to make stronger
            visuals.
          </p>
          <div className="mt-16 flex flex-col gap-5 sm:flex-row">
            <Link href="/plans" className="watch-button">
              Book a Session <ArrowRight size={24} />
            </Link>
            <Link href="#about" className="hero-outline-button">
              Learn More
            </Link>
          </div>
        </div>

        <div className="hero-art-panel">
          <div
            className="hero-portrait"
            style={{ backgroundImage: `url(${landingImages.hero})` }}
          />
          <button className="hero-search" aria-label="Search">
            <Search size={34} />
          </button>
          <div className="hero-line" />
        </div>
      </div>

      <div className="hero-mobile-social">
        <a href="#" aria-label="Instagram">
          IG
        </a>
        <a href="#" aria-label="LinkedIn">
          IN
        </a>
      </div>
    </section>
  );
}
