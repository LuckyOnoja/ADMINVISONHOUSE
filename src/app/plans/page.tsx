"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Clock,
  Camera,
  Video,
  Layers,
  Award,
  Users,
  Mic,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function PlansPage() {
  const plans = [
    {
      id: "serenity-arch",
      name: "Serenity Arch",
      tagline: "Organic minimalism & elegant curvatures",
      description:
        "Designed for soft fashion editorials and architectural portraits. Incorporates cream plaster arches and natural sand backdrops.",
      prices: [
        { duration: "30 Minutes", value: "₦20,000" },
        { duration: "1 Hour", value: "₦30,000" },
      ],
      image: "/ADMIN_HOUSE/serenity-arch.jpg",
      icon: Camera,
      featured: false,
    },
    {
      id: "neo-tide",
      name: "Neo Tide",
      tagline: "Cyberpunk visuals & neon pool reflections",
      description:
        "Includes a programmable LED roof grid, metallic mirrors, and liquid reflection water stages for futuristic shoots.",
      prices: [
        { duration: "30 Minutes", value: "₦20,000" },
        { duration: "1 Hour", value: "₦30,000" },
      ],
      image: "/ADMIN_HOUSE/neo-tide.jpg",
      icon: Video,
      featured: true,
    },
    {
      id: "velvet-corner",
      name: "Velvet Corner",
      tagline: "Tactile crimsons & gold mid-century lighting",
      description:
        "A sensual boudoir style showcasing rich fabrics, vintage lamps, and dimmable atmospheric brass accents.",
      prices: [
        { duration: "30 Minutes", value: "₦20,000" },
        { duration: "1 Hour", value: "₦30,000" },
      ],
      image: "/ADMIN_HOUSE/velvet-corner.jpg",
      icon: Layers,
      featured: false,
    },
    {
      id: "amber-lounge",
      name: "Amber Lounge",
      tagline: "Teak timbers & retro executive leather",
      description:
        "Inspired by mid-century record libraries. Features aniline leather club chairs, teak paneling, and warm glow rings.",
      prices: [
        { duration: "30 Minutes", value: "₦20,000" },
        { duration: "1 Hour", value: "₦30,000" },
      ],
      image: "/ADMIN_HOUSE/amber-lounge.jpg",
      icon: Award,
      featured: false,
    },
    {
      id: "elite-circle",
      name: "Elite Circle",
      tagline: "Corporate grandeur & Calacatta marble",
      description:
        "An elegant monochrome studio featuring stark white Calacatta marble blocks, high-contrast setups, and corporate staging.",
      prices: [
        { duration: "30 Minutes", value: "₦20,000" },
        { duration: "1 Hour", value: "₦30,000" },
      ],
      image: "/ADMIN_HOUSE/elite-circle.jpg",
      icon: Users,
      featured: false,
    },
    {
      id: "iconic-oasis",
      name: "Iconic Oasis",
      tagline: "Sun-drenched rooftop & Mediterranean flora",
      description:
        "Simulates warm golden-hour beams cast across organic linens, potted palms, and rustic clay terracotta vessels.",
      prices: [
        { duration: "30 Minutes", value: "₦20,000" },
        { duration: "1 Hour", value: "₦30,000" },
      ],
      image: "/ADMIN_HOUSE/iconic-oasis.jpg",
      icon: Sparkles,
      featured: false,
    },
    {
      id: "podcast",
      name: "Podcast Studio",
      tagline: "Acoustically calibrated multi-camera broadcaster",
      description:
        "Equipped with professional vocal acoustics, Shure mics, multi-angle 4K streaming capture, and live control mixers.",
      prices: [{ duration: "1 Hour", value: "₦20,000" }],
      extra: "30-minute sessions not available for this space",
      image: "/ADMIN_HOUSE/podcast.jpg",
      icon: Mic,
      featured: false,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060707] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(61,204,110,.22),transparent_36%),radial-gradient(circle_at_80%_85%,rgba(61,204,110,.12),transparent_30%)]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090a0bcc] backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-[min(100%-2rem,1320px)] items-center justify-between px-3 md:px-5">
          <Link href="/" className="flex items-center gap-2 md:gap-2.5">
            <span className="inline-flex h-8 md:h-9 items-center bg-[#2f9f57] px-2 md:px-3 font-display text-lg md:text-2xl leading-none">
              ADMIN
            </span>
            <span className="font-display text-2xl sm:text-3xl leading-none text-white md:text-4xl">
              VISION
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 md:gap-2 border border-white/20 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:border-[#3dcc6e] hover:text-white"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="inline sm:hidden">Back</span>
          </Link>
        </div>
      </header>

      <section className="relative px-6 pb-14 pt-30">
        <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#74f2a5]">
              Conversion-focused package selection
            </p>
            <h1 className="font-display text-5xl leading-[0.9] text-white md:text-6xl lg:text-7xl">
              Choose A Studio Package That Gets You More Clients
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
              This page is built to help visitors decide quickly and book with
              confidence. Each package has a visual direction, clear inclusions,
              and straightforward pricing.
            </p>
          </div>
          <div className="border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#74f2a5]">
              Booking confidence
            </p>
            <div className="space-y-2 text-sm text-white/78">
              <p className="flex items-center gap-2">
                <BadgeCheck size={15} className="text-[#74f2a5]" />
                Fast confirmation after payment
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#74f2a5]" />
                Secure checkout via Paystack
              </p>
              <p className="flex items-center gap-2">
                <Clock size={15} className="text-[#74f2a5]" />
                Easy duration-based pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 flex-grow px-6 pb-24">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`group relative flex flex-col justify-between overflow-hidden border border-white/10 bg-[#0d0e10] transition duration-500 hover:-translate-y-1 hover:border-[#3dcc6e]/60 ${
                    plan.featured ? "ring-1 ring-[#3dcc6e]/30" : ""
                  }`}
                >
                  <Image
                    src={plan.image}
                    alt={plan.name}
                    fill
                    className="object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    priority={plan.featured}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#0d0e10]/80 to-black/25 transition-all duration-500" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(61,204,110,.15),transparent_40%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                  {plan.featured && (
                    <div className="absolute right-4 top-4 z-20 border border-[#74f2a5]/45 bg-[#0b2115d0] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#74f2a5]">
                      Popular
                    </div>
                  )}

                  <div className="relative z-10 p-6 md:p-7">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/30 transition-colors duration-300 group-hover:border-[#74f2a5]/60">
                      <Icon
                        size={20}
                        className="text-white/75 transition-colors duration-300 group-hover:text-[#74f2a5]"
                      />
                    </div>

                    <h2 className="font-display text-3xl text-white transition-colors duration-300 group-hover:text-[#74f2a5]">
                      {plan.name}
                    </h2>
                    <p className="mb-4 mt-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
                      {plan.tagline}
                    </p>

                    <p className="mb-7 text-sm leading-relaxed text-white/72">
                      {plan.description}
                    </p>

                    <div className="mb-7 space-y-3 border-t border-white/15 pt-5">
                      {plan.prices.map((price, idx) => (
                        <div
                          key={idx}
                          className="flex items-baseline justify-between"
                        >
                          <span className="flex items-center gap-2 text-sm text-white/75">
                            <Clock
                              size={12}
                              className="text-[#74f2a5]"
                            />
                            {price.duration}
                          </span>
                          <span className="font-mono text-lg font-black text-white">
                            {price.value}
                          </span>
                        </div>
                      ))}
                      {plan.extra && (
                        <div className="border-t border-white/10 pt-3 text-[10px] font-mono italic text-white/50">
                          {plan.extra}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/book/${plan.id}`}
                      className={`inline-flex w-full items-center justify-center gap-2 py-3.5 text-xs font-extrabold uppercase tracking-[0.16em] transition ${
                        plan.featured
                          ? "bg-[#3dcc6e] text-[#04210f] hover:bg-[#6cf8a6]"
                          : "border border-white/25 bg-black/35 text-white/85 hover:border-[#74f2a5] hover:text-[#74f2a5]"
                      }`}
                    >
                      Select & Book
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-[#090a0b]">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} Admin Vision House. All rights reserved.</p>
          <p className="text-white/35">Secure checkout powered by Paystack</p>
        </div>
      </footer>
    </div>
  );
}
