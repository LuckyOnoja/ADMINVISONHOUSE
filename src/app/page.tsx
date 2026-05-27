"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Play,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Video,
  Mic,
  Layers,
  Award,
  Users,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Globe,
  MessageCircle,
  PlayCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      icon: Camera,
      title: "Photography",
      desc: "Bespoke set designs for editorial, commercial, and portrait photography sessions.",
    },
    {
      icon: Video,
      title: "Videography",
      desc: "Cinematic production spaces with lighting rigs, backdrops, and multi-camera setups.",
    },
    {
      icon: Mic,
      title: "Podcasting",
      desc: "Acoustically treated podcast suites with professional-grade audio equipment.",
    },
    {
      icon: Layers,
      title: "Content Creation",
      desc: "Versatile environments designed for social media content, reels, and brand campaigns.",
    },
    {
      icon: Award,
      title: "Brand Shoots",
      desc: "Premium product and brand photography spaces with controlled lighting environments.",
    },
    {
      icon: Users,
      title: "Events & Private",
      desc: "Exclusive private studio hire for intimate events, workshops, and creative gatherings.",
    },
  ];

  const spaces = [
    { id: "serenity-arch", name: "Serenity Arch", tag: "Photography" },
    { id: "neo-tide", name: "Neo Tide", tag: "Videography" },
    { id: "velvet-corner", name: "Velvet Corner", tag: "Creative" },
    { id: "amber-lounge", name: "Amber Lounge", tag: "Content" },
    { id: "elite-circle", name: "Elite Circle", tag: "Corporate" },
    { id: "iconic-oasis", name: "Iconic Oasis", tag: "Lifestyle" },
    { id: "podcast", name: "Podcast Studio", tag: "Audio" },
  ];

  const stats = [
    { value: "7+", label: "Bespoke Spaces" },
    { value: "500+", label: "Sessions Delivered" },
    { value: "150+", label: "Happy Clients" },
    { value: "5+", label: "Years Experience" },
  ];

  const team = [
    { name: "Creative Director", role: "Vision & Strategy" },
    { name: "Head Photographer", role: "Photography Lead" },
    { name: "Videographer", role: "Film & Motion" },
    { name: "Studio Manager", role: "Operations" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ═══════════════════════════════════════════════════ */}
      {/* NAVIGATION                                         */}
      {/* ═══════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0E10]/80 backdrop-blur-xl sleek-border-b">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <span className="logo-admin-box text-base md:text-lg tracking-wider">
              ADMIN
            </span>
            <span className="text-base md:text-lg font-extrabold text-gray-200 tracking-wider">
              VISION
            </span>
            <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-1 self-end mb-0.5">
              HOUSE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10 text-[13px] font-medium text-gray-400 uppercase tracking-widest">
            <Link
              href="/"
              className="text-white hover:text-[#10B981] transition-colors"
            >
              Home
            </Link>
            <a
              href="#about"
              className="hover:text-[#10B981] transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-[#10B981] transition-colors"
            >
              Services
            </a>
            <a
              href="#showreel"
              className="hover:text-[#10B981] transition-colors"
            >
              Portfolio
            </a>
            <Link
              href="/plans"
              className="hover:text-[#10B981] transition-colors"
            >
              Pricing
            </Link>
            <a
              href="#contact"
              className="hover:text-[#10B981] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/plans"
              className="hidden md:flex items-center gap-2 bg-[#10B981] text-gray-950 font-bold px-6 py-2.5 rounded-none text-xs uppercase tracking-widest transition-all hover:bg-emerald-400 glow-btn"
            >
              Book Now
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0D0E10]/95 backdrop-blur-xl sleek-border-t px-6 py-8 space-y-6">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "#about" },
              { label: "Services", href: "#services" },
              { label: "Portfolio", href: "#showreel" },
              { label: "Pricing", href: "/plans" },
              { label: "Contact", href: "#contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg font-semibold text-gray-300 hover:text-[#10B981] transition-colors uppercase tracking-widest"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/plans"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-4 bg-[#10B981] text-gray-950 font-bold px-6 py-3 text-center text-sm uppercase tracking-widest"
            >
              Book a Session
            </Link>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════════════ */}
      {/* HERO SECTION                                       */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background placeholder for hero image/video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0E10] via-[#13151A] to-[#0D0E10]">
          {/* IMAGE/VIDEO PLACEHOLDER — replace src with actual hero media */}
          <div className="absolute inset-0 bg-[url('/hero-placeholder.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E10] via-[#0D0E10]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0E10]/80 to-transparent" />
        </div>

        {/* Decorative grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full py-20">
          <div className="max-w-3xl">
            {/* Tag */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-[#10B981]" />
              <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-[0.3em]">
                Premium Creative Studio
              </span>
            </div>

            {/* Main title */}
            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black leading-[0.95] tracking-tight mb-8">
              WHERE
              <br />
              <span className="text-[#10B981]">VISION</span>
              <br />
              MEETS CRAFT
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed mb-12">
              A network of bespoke production micro-environments designed for
              photographers, videographers, content creators, and podcasters who
              demand excellence.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/plans"
                className="flex items-center justify-center gap-3 bg-[#10B981] text-gray-950 font-extrabold px-10 py-4 text-sm uppercase tracking-widest transition-all hover:bg-emerald-400 glow-btn"
              >
                Book a Session
                <ArrowRight size={16} />
              </Link>
              <a
                href="#showreel"
                className="flex items-center justify-center gap-3 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 font-bold px-10 py-4 text-sm uppercase tracking-widest transition-all"
              >
                <Play size={16} />
                View Showreel
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-mono">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#10B981] to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* ABOUT SECTION                                      */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="about" className="py-24 md:py-32 sleek-border-t">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left — Image placeholder */}
            <div className="relative">
              <div className="showreel-aspect bg-[#16181D] rounded-sm overflow-hidden relative group">
                {/* IMAGE PLACEHOLDER — replace with actual about image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera
                      size={48}
                      className="text-gray-700 mx-auto mb-3"
                    />
                    <span className="text-xs text-gray-600 uppercase tracking-widest font-mono">
                      Studio Image Placeholder
                    </span>
                  </div>
                </div>
                {/* Green accent corner */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#10B981]" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#10B981]" />
              </div>
              {/* Floating experience badge */}
              <div className="absolute -bottom-6 -right-6 md:right-8 bg-[#10B981] text-gray-950 px-6 py-4 z-10">
                <div className="text-3xl font-black">5+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest">
                  Years Experience
                </div>
              </div>
            </div>

            {/* Right — Text content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-[#10B981]" />
                <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-[0.3em]">
                  About Us
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                CRAFTING VISUAL
                <br />
                <span className="text-[#10B981]">EXPERIENCES</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Admin Vision House is a premium creative production studio
                offering meticulously designed spaces for professional
                photography, videography, content creation, and podcasting. Each
                of our seven bespoke environments has been architecturally
                curated to deliver unique visual narratives.
              </p>
              <p className="text-gray-500 leading-relaxed mb-10">
                From organic minimalist arches to cyberpunk neon installations,
                our spaces transform creative concepts into stunning reality. We
                provide everything you need — lighting, backdrops, props, and
                acoustic treatment — so you can focus purely on your craft.
              </p>

              {/* Feature list */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  "7 Unique Spaces",
                  "Professional Lighting",
                  "Online Booking",
                  "Podcast Ready",
                  "Props & Backdrops",
                  "Instant Checkout",
                ].map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <ChevronRight
                      size={14}
                      className="text-[#10B981] flex-shrink-0"
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/plans"
                className="inline-flex items-center gap-3 bg-[#10B981] text-gray-950 font-extrabold px-8 py-3.5 text-xs uppercase tracking-widest transition-all hover:bg-emerald-400 glow-btn"
              >
                Explore Spaces
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SERVICES SECTION                                   */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="services" className="py-24 md:py-32 bg-[#111318] sleek-border-t">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#10B981]" />
              <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-[0.3em]">
                What We Offer
              </span>
              <div className="w-8 h-[1px] bg-[#10B981]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              OUR <span className="text-[#10B981]">SERVICES</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm">
              We provide end-to-end creative production solutions tailored for
              modern content creators and brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(255,255,255,0.04)]">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#111318] p-10 group hover:bg-[#161820] transition-all duration-500 relative overflow-hidden"
                >
                  {/* Hover accent line */}
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#10B981] group-hover:w-full transition-all duration-500" />

                  <div className="w-14 h-14 border border-gray-800 flex items-center justify-center mb-6 group-hover:border-[#10B981] transition-colors duration-300">
                    <Icon
                      size={24}
                      className="text-gray-500 group-hover:text-[#10B981] transition-colors duration-300"
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#10B981] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {service.desc}
                  </p>

                  <ArrowUpRight
                    size={16}
                    className="mt-6 text-gray-700 group-hover:text-[#10B981] transition-colors duration-300"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* SHOWREEL / PORTFOLIO SECTION                       */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="showreel" className="py-24 md:py-32 sleek-border-t">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-[#10B981]" />
                <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-[0.3em]">
                  Portfolio
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black">
                OUR <span className="text-[#10B981]">SPACES</span>
              </h2>
            </div>
            <Link
              href="/plans"
              className="flex items-center gap-2 text-sm font-bold text-[#10B981] hover:text-emerald-400 transition-colors uppercase tracking-widest"
            >
              View All Spaces
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Main Showreel — Video placeholder */}
          <div className="showreel-aspect bg-[#16181D] relative mb-8 overflow-hidden group cursor-pointer">
            {/* VIDEO PLACEHOLDER — replace with actual showreel video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-[#10B981] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#10B981] group-hover:scale-110 transition-all duration-300">
                  <Play
                    size={28}
                    className="text-[#10B981] group-hover:text-gray-950 ml-1 transition-colors"
                  />
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-[0.3em] font-mono">
                  Showreel Video Placeholder
                </span>
              </div>
            </div>
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#10B981]/30" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#10B981]/30" />
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {spaces.map((space, idx) => (
              <Link
                key={space.id}
                href={`/book/${space.id}`}
                className={`relative overflow-hidden group bg-[#16181D] ${
                  idx === 0
                    ? "md:col-span-2 md:row-span-2"
                    : ""
                }`}
                style={{ aspectRatio: idx === 0 ? "1" : "4/3" }}
              >
                {/* IMAGE PLACEHOLDER — replace with actual space images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles
                      size={idx === 0 ? 32 : 20}
                      className="text-gray-700 mx-auto mb-2"
                    />
                    <span className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                      {space.name}
                    </span>
                  </div>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E10] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] text-[#10B981] uppercase tracking-widest font-mono block mb-1">
                    {space.tag}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {space.name}
                  </span>
                </div>

                {/* Top-right arrow */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-[#10B981] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={14} className="text-gray-950" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* STATS SECTION                                      */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#10B981] relative overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#000_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-black text-gray-950 mb-2">
                  {stat.value}
                </div>
                <div className="text-[11px] font-bold text-gray-900/70 uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* TEAM SECTION                                       */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="team" className="py-24 md:py-32 sleek-border-t">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#10B981]" />
              <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-[0.3em]">
                Our Crew
              </span>
              <div className="w-8 h-[1px] bg-[#10B981]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              THE <span className="text-[#10B981]">TEAM</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm">
              The creative minds and technical experts behind every exceptional
              session at Admin Vision House.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="group">
                {/* IMAGE PLACEHOLDER — replace with actual team photos */}
                <div className="aspect-[3/4] bg-[#16181D] relative overflow-hidden mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Users
                        size={32}
                        className="text-gray-700 mx-auto mb-2"
                      />
                      <span className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                        Team Photo
                      </span>
                    </div>
                  </div>
                  {/* Green bottom bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#10B981] transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-lg group-hover:text-[#10B981] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* PRICING PREVIEW SECTION                            */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-[#111318] sleek-border-t">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#10B981]" />
              <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-[0.3em]">
                Transparent Pricing
              </span>
              <div className="w-8 h-[1px] bg-[#10B981]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              RATE <span className="text-[#10B981]">CARD</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Standard Spaces Card */}
            <div className="border border-[rgba(255,255,255,0.06)] p-8 md:p-10 relative overflow-hidden group hover:border-[rgba(16,185,129,0.2)] transition-colors">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#10B981]" />
              <h3 className="text-xl font-bold mb-2">Production Spaces</h3>
              <p className="text-xs text-gray-500 mb-8 uppercase tracking-widest font-mono">
                Serenity Arch · Neo Tide · Velvet Corner · Amber Lounge · Elite
                Circle · Iconic Oasis
              </p>
              <div className="space-y-6">
                <div className="flex justify-between items-baseline border-b border-gray-800/50 pb-4">
                  <span className="text-gray-400 text-sm">30 Minutes</span>
                  <span className="text-2xl font-black text-white">
                    ₦20,000
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-400 text-sm">1 Hour</span>
                  <span className="text-2xl font-black text-[#10B981]">
                    ₦30,000
                  </span>
                </div>
              </div>
              <Link
                href="/plans"
                className="mt-10 w-full flex items-center justify-center gap-2 bg-[#10B981] text-gray-950 font-extrabold py-4 text-xs uppercase tracking-widest transition-all hover:bg-emerald-400 glow-btn"
              >
                Book Space
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Podcast Card */}
            <div className="border border-[rgba(255,255,255,0.06)] p-8 md:p-10 relative overflow-hidden group hover:border-[rgba(16,185,129,0.2)] transition-colors">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gray-700" />
              <h3 className="text-xl font-bold mb-2">Podcast Suite</h3>
              <p className="text-xs text-gray-500 mb-8 uppercase tracking-widest font-mono">
                Professional multi-mic acoustic chamber
              </p>
              <div className="space-y-6">
                <div className="flex justify-between items-baseline border-b border-gray-800/50 pb-4">
                  <span className="text-gray-400 text-sm">1 Hour</span>
                  <span className="text-2xl font-black text-white">
                    ₦20,000
                  </span>
                </div>
                <div className="text-xs text-gray-600 italic font-mono">
                  30-minute sessions not available for this space
                </div>
              </div>
              <Link
                href="/book/podcast"
                className="mt-10 w-full flex items-center justify-center gap-2 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 font-extrabold py-4 text-xs uppercase tracking-widest transition-all"
              >
                Book Podcast Suite
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* CTA SECTION                                        */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 relative overflow-hidden sleek-border-t">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0E10] via-[#111318] to-[#0D0E10]" />
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.5px,transparent_0.5px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            READY TO CREATE
            <br />
            <span className="text-[#10B981]">SOMETHING AMAZING?</span>
          </h2>
          <p className="text-gray-500 mb-12 max-w-lg mx-auto">
            Book your session today and experience our premium production spaces.
            Secure instant checkout via Paystack.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/plans"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#10B981] text-gray-950 font-extrabold px-10 py-4 text-sm uppercase tracking-widest transition-all hover:bg-emerald-400 glow-btn"
            >
              Book Now
              <ArrowRight size={16} />
            </Link>
            <a
              href="#contact"
              className="w-full sm:w-auto flex items-center justify-center gap-3 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 font-bold px-10 py-4 text-sm uppercase tracking-widest transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* FOOTER                                             */}
      {/* ═══════════════════════════════════════════════════ */}
      <footer id="contact" className="sleek-border-t bg-[#0A0B0D]">
        {/* Main footer */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-1 mb-6">
                <span className="logo-admin-box text-sm">ADMIN</span>
                <span className="text-sm font-extrabold text-gray-200 tracking-wider">
                  VISION
                </span>
                <span className="text-[8px] font-bold text-gray-500 tracking-widest uppercase ml-1 self-end mb-0.5">
                  HOUSE
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Premium creative production studio crafting visual experiences
                for photographers, videographers, and content creators.
              </p>
              <div className="flex gap-4">
                {[Globe, MessageCircle, PlayCircle].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-9 h-9 border border-gray-800 flex items-center justify-center text-gray-500 hover:border-[#10B981] hover:text-[#10B981] transition-colors"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#10B981] mb-6">
                Quick Links
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "#about" },
                  { label: "Services", href: "#services" },
                  { label: "Portfolio", href: "#showreel" },
                  { label: "Pricing", href: "/plans" },
                  { label: "Admin Portal", href: "/admin" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-gray-500 hover:text-[#10B981] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Our Spaces */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#10B981] mb-6">
                Our Spaces
              </h4>
              <div className="space-y-3">
                {spaces.slice(0, 6).map((space) => (
                  <Link
                    key={space.id}
                    href={`/book/${space.id}`}
                    className="block text-sm text-gray-500 hover:text-[#10B981] transition-colors"
                  >
                    {space.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#10B981] mb-6">
                Contact Info
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={14}
                    className="text-[#10B981] mt-1 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-500">
                    Studio Address
                    <br />
                    Lagos, Nigeria
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-[#10B981] flex-shrink-0" />
                  <span className="text-sm text-gray-500">
                    +234 000 000 0000
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-[#10B981] flex-shrink-0" />
                  <span className="text-sm text-gray-500">
                    info@adminvisionhouse.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="sleek-border-t">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <span>
              © {new Date().getFullYear()} Admin Vision House. All rights
              reserved.
            </span>
            <span className="text-gray-700">
              Payments secured by Paystack
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
