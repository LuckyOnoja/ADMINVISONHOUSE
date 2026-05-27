"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Camera,
  Video,
  Layers,
  Award,
  Users,
  Mic,
  Sparkles,
  ChevronRight,
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
      icon: Mic,
      featured: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0E10]/80 backdrop-blur-xl sleek-border-b">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <span className="logo-admin-box text-base tracking-wider">
              ADMIN
            </span>
            <span className="text-base font-extrabold text-gray-200 tracking-wider">
              VISION
            </span>
            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-1 self-end mb-0.5">
              HOUSE
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest font-bold"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111318] to-[#0D0E10]" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[#10B981]" />
            <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-[0.3em]">
              Transparent Pricing
            </span>
            <div className="w-8 h-[1px] bg-[#10B981]" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4">
            STUDIO <span className="text-[#10B981]">RATE CARD</span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Review our bespoke production spaces and select the perfect
            environment for your creative session. Payments are securely
            processed via Paystack.
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <main className="flex-grow pb-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(255,255,255,0.03)]">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`bg-[#0D0E10] p-8 md:p-10 flex flex-col justify-between relative group overflow-hidden transition-colors duration-500 hover:bg-[#111318] ${
                    plan.featured ? "ring-1 ring-[#10B981]/20" : ""
                  }`}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#10B981] group-hover:w-full transition-all duration-500" />

                  {/* Featured badge */}
                  {plan.featured && (
                    <div className="absolute top-4 right-4 text-[9px] font-bold text-[#10B981] uppercase tracking-widest bg-[#10B981]/10 px-3 py-1 border border-[#10B981]/20">
                      Popular
                    </div>
                  )}

                  <div>
                    {/* Icon + Header */}
                    <div className="w-14 h-14 border border-gray-800 flex items-center justify-center mb-6 group-hover:border-[#10B981] transition-colors duration-300">
                      <Icon
                        size={22}
                        className="text-gray-600 group-hover:text-[#10B981] transition-colors duration-300"
                      />
                    </div>

                    <h2 className="text-2xl font-black mb-1 group-hover:text-[#10B981] transition-colors duration-300">
                      {plan.name}
                    </h2>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-mono mb-5">
                      {plan.tagline}
                    </p>

                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                      {plan.description}
                    </p>

                    {/* Pricing */}
                    <div className="border-t border-gray-800/50 pt-6 mb-8 space-y-4">
                      {plan.prices.map((price, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-baseline"
                        >
                          <span className="text-gray-400 text-sm flex items-center gap-2">
                            <Clock
                              size={12}
                              className="text-[#10B981]"
                            />
                            {price.duration}
                          </span>
                          <span className="text-lg font-black text-white font-mono">
                            {price.value}
                          </span>
                        </div>
                      ))}
                      {plan.extra && (
                        <div className="text-[10px] text-gray-600 italic font-mono border-t border-gray-800/30 pt-3">
                          {plan.extra}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/book/${plan.id}`}
                    className={`w-full flex items-center justify-center gap-2 font-extrabold py-4 text-xs uppercase tracking-widest transition-all ${
                      plan.featured
                        ? "bg-[#10B981] text-gray-950 hover:bg-emerald-400 glow-btn"
                        : "border border-gray-800 text-gray-400 hover:border-[#10B981] hover:text-[#10B981]"
                    }`}
                  >
                    Select & Book
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sleek-border-t bg-[#0A0B0D]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <span className="logo-admin-box text-[10px] py-0">ADMIN</span>
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider">
              VISION
            </span>
            <span className="ml-2">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          <span className="text-gray-700">Payments secured by Paystack</span>
        </div>
      </footer>
    </div>
  );
}
