"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera, Check, Film, Mic, Palette, Play, Share2, Sparkles, Star, Video, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ───────────────────────────────────────────────
   SERVICE DATA
   ─────────────────────────────────────────────── */
const services = [
  {
    icon: Camera,
    title: "Photography",
    desc: "Professional studio portraits, lifestyle shoots, product photography, fashion sessions, and creative visual storytelling.",
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1200&q=85",
    tag: "VISUAL",
  },
  {
    icon: Film,
    title: "Videography",
    desc: "High-quality video production for brands, businesses, events, music videos, interviews, and social media content.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=85",
    tag: "PRODUCTION",
  },
  {
    icon: Mic,
    title: "Podcast Production",
    desc: "Record, film, and produce professional podcasts with crystal-clear audio and multi-camera video setups.",
    image: "/ADMIN_HOUSE/podcast.jpg",
    tag: "AUDIO",
  },
  {
    icon: Sparkles,
    title: "Content Creation",
    desc: "A creative environment designed for influencers, creators, brands, and entrepreneurs to produce engaging content that stands out.",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=85",
    tag: "CREATIVE",
  },
  {
    icon: Palette,
    title: "Creative Direction",
    desc: "From concept development to execution, we help bring your ideas to life with strategy, styling, and production planning.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=85",
    tag: "STRATEGY",
  },
  {
    icon: Share2,
    title: "Social Media Content",
    desc: "Create reels, shorts, TikToks, and promotional content optimized to increase engagement and grow your online presence.",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=85",
    tag: "DIGITAL",
  },
];

/* ───────────────────────────────────────────────
   MARKETING GALLERY IMAGES (from Sorrounding folder)
   ─────────────────────────────────────────────── */
const galleryImages = [
  { src: "/Sorrounding/IMG_4533.jpeg", alt: "Elegant couple portrait session", span: "tall" },
  { src: "/Sorrounding/IMG_4995.jpeg", alt: "Fashion editorial shoot", span: "tall" },
  { src: "/Sorrounding/IMG_4675.jpeg", alt: "Artistic motion portrait", span: "normal" },
  { src: "/Sorrounding/IMG_4990.jpeg", alt: "Cultural fashion portrait", span: "normal" },
  { src: "/Sorrounding/IMG_4037.jpeg", alt: "Lifestyle brand shoot", span: "normal" },
  { src: "/Sorrounding/IMG_4996.jpeg", alt: "Fashion photography session", span: "tall" },
  { src: "/Sorrounding/IMG_4994.jpeg", alt: "Cultural portrait photography", span: "normal" },
];

const trustItems = [
  { num: "500+", label: "Sessions Delivered", desc: "Premium creative sessions executed for brands, creators, and businesses across multiple industries." },
  { num: "7+", label: "Unique Studio Spaces", desc: "Thoughtfully designed rooms for every creative need — from podcast suites to cinematic backdrops." },
  { num: "5+", label: "Years of Excellence", desc: "Consistently delivering world-class visuals and content that converts audiences into loyal customers." },
  { num: "98%", label: "Client Satisfaction", desc: "Our clients don't just come back — they refer everyone they know. That's the Admin Vision House difference." },
];

const testimonialItems = [
  { quote: "The team at Admin Vision House exceeded every expectation. The content they produced tripled our engagement overnight.", name: "Sophia K.", role: "Brand Manager, Luxe Beauty" },
  { quote: "From script to final cut, the process was seamless. Our music video looked like a Hollywood production.", name: "Marcus D.", role: "Independent Artist" },
  { quote: "We booked a podcast session and were blown away by the setup. Crystal-clear audio and the multi-cam quality was insane.", name: "Tunde A.", role: "Podcast Host, The Daily Brief" },
];

export function MontraReplicaSections() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          SECTION: ABOUT / STUDIO REEL
          ═══════════════════════════════════════════════════════ */}
      <section id="about" className="section-pad bg-[#0a0a0a] px-4 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1880px] gap-10 lg:grid-cols-[1.15fr_.85fr] items-center">
          <div>
            <h2 className="cinematic-display-title sr">
              Crafting Stories Through{" "}
              <span className="relative inline-block highlight-splash">
                <span className="relative z-10 bg-gradient-to-r from-[#6ef5a1] via-[#2f9f57] to-[#3bf584] bg-clip-text text-transparent">
                  Cinematic Frames
                </span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#2f9f57]/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q30,9 50,5 T100,5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="path-animation" />
                </svg>
              </span>
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-white/75 sr sr-delay-1">
              Every story deserves to be told with power, passion, and
              precision. At Admin Vision House, we combine cutting-edge technology
              with bold creative vision to produce content that doesn&apos;t just look
              good — it converts viewers into paying clients.
            </p>
          </div>
          <div
            onClick={() => setIsOpen(true)}
            className="group relative cursor-pointer overflow-hidden border border-white/15 bg-black h-72 md:h-80 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition hover:border-[#3dcc6e]/40 sr-scale sr-delay-2"
          >
            <video
              src="/hero-video.mp4"
              muted
              loop
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover brightness-[0.6] group-hover:brightness-[0.7] group-hover:scale-[1.03] transition-all duration-700"
            />
            <div className="absolute inset-0 border border-transparent group-hover:border-[#3dcc6e]/20 pointer-events-none transition-all duration-500 z-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-500 z-10">
              <motion.div
                className="flex items-center justify-center w-16 h-16 rounded-full border border-white/20 bg-black/60 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:border-[#3dcc6e] group-hover:text-[#3dcc6e] group-hover:shadow-[0_0_25px_rgba(0,0,0,0.7)] transition-all duration-500"
                whileTap={{ scale: 0.95 }}
              >
                <Play size={24} fill="currentColor" className="ml-1 transition-colors duration-500" />
              </motion.div>
              <span className="mt-4 text-[10px] font-bold tracking-[0.3em] text-white/80 group-hover:text-white transition-colors uppercase">
                Explore Studio Reel
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Modal Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 cursor-pointer bg-black/85 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 15 0 L 30 25 L 15 50 L 0 25 Z' fill='none' stroke='rgba(61, 204, 110, 0.2)' stroke-width='0.8'/%3E%3C/svg%3E")`,
                backgroundSize: "30px 50px",
              }}
            />
            <motion.div
              className="relative w-full max-w-[1280px] aspect-video bg-[#090909] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.85)] overflow-hidden z-10"
              initial={{ scale: 0.94, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 15, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <button
                className="absolute top-4 right-4 z-20 p-2.5 rounded-none text-white/70 hover:text-[#3dcc6e] bg-black/50 hover:bg-black/80 border border-white/10 hover:border-[#3dcc6e]/30 transition-all duration-300"
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <video
                src="/hero-video.mp4"
                autoPlay
                controls
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
          SECTION: MARKETING GALLERY — Visitor → Client Conversion
          ═══════════════════════════════════════════════════════ */}
      <section className="section-pad bg-[#060606] px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1880px]">
          {/* Conversion headline */}
          <div className="mb-6 sr">
            <p className="text-[11px] font-bold tracking-[0.35em] text-[#3dcc6e] uppercase mb-3">Our Work Speaks</p>
            <h2 className="section-title max-w-4xl">
              <span className="block md:inline whitespace-nowrap">Real Clients. </span>
              <span className="block md:inline whitespace-nowrap">Real Results. </span>
              <span className="block md:inline whitespace-nowrap">Real Impact.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-white/60 text-base leading-relaxed">
              Every image below was shot inside our studio. This is the quality you get when you book with Admin Vision House — 
              premium visuals that elevate your brand, tell your story, and convert your audience.
            </p>
          </div>

          {/* Masonry-style gallery */}
          <div className="mt-10 columns-2 md:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, index) => (
              <motion.div
                key={img.src}
                className={`group relative overflow-hidden border border-white/10 break-inside-avoid bg-[#111] sr-scale sr-delay-${Math.min(index + 1, 5)}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`relative ${img.span === "tall" ? "aspect-[3/4]" : "aspect-square"} overflow-hidden`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[10px] font-bold tracking-[0.25em] text-[#7ff5aa] uppercase">{img.alt}</p>
                  </div>
                </div>
                {/* Green accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#3dcc6e] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </div>

          {/* Conversion CTA strip */}
          <motion.div
            className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10 border border-white/10 bg-gradient-to-r from-[#0d1f14] via-[#0a0a0a] to-[#0d1f14] sr"
            whileHover={{ borderColor: "rgba(61, 204, 110, 0.3)" }}
          >
            <div>
              <h3 className="font-display text-2xl md:text-3xl uppercase text-white">
                Want Results Like These?
              </h3>
              <p className="mt-2 text-white/55 max-w-lg">
                Join 500+ brands and creators who trust Admin Vision House for premium visual content that drives real business results.
              </p>
            </div>
            <Link
              href="/plans"
              className="watch-button hero-cta-button whitespace-nowrap shrink-0"
              style={{ fontSize: "1.1rem", minHeight: "62px", padding: "0 32px" }}
            >
              Book Your Session <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION: WHAT WE DO BEST — Services with Banner Images
          ═══════════════════════════════════════════════════════ */}
      <section id="services" className="section-pad bg-[#070707] px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1880px]">
          <div className="mb-4 sr">
            <p className="text-[11px] font-bold tracking-[0.35em] text-[#3dcc6e] uppercase mb-3">Services</p>
            <h2 className="section-title">What We Do Best</h2>
          </div>

          {/* Interactive service showcase: left = tabs, right = preview */}
          <div className="mt-10 grid gap-0 lg:grid-cols-[1fr_1.2fr] border border-white/10 bg-[#0c0c0c] overflow-hidden sr-scale">
            {/* Left: service selector list */}
            <div className="divide-y divide-white/8 border-r border-white/8">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isActive = activeService === index;
                return (
                  <button
                    key={service.title}
                    onClick={() => setActiveService(index)}
                    className={`w-full text-left p-5 md:p-6 flex items-start gap-4 transition-all duration-300 group ${
                      isActive
                        ? "bg-[#3dcc6e]/10 border-l-[3px] border-l-[#3dcc6e]"
                        : "bg-transparent border-l-[3px] border-l-transparent hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className={`shrink-0 mt-0.5 p-2.5 border transition-all duration-300 ${
                      isActive
                        ? "border-[#3dcc6e]/40 bg-[#3dcc6e]/15 text-[#3dcc6e]"
                        : "border-white/10 bg-white/5 text-white/40 group-hover:text-white/70"
                    }`}>
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className={`font-display text-lg md:text-xl uppercase transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/60 group-hover:text-white/90"
                        }`}>
                          {service.title}
                        </h3>
                        <span className={`text-[9px] font-bold tracking-[0.2em] px-2 py-0.5 border transition-all duration-300 ${
                          isActive
                            ? "text-[#3dcc6e] border-[#3dcc6e]/30 bg-[#3dcc6e]/10"
                            : "text-white/30 border-white/10 bg-transparent"
                        }`}>
                          {service.tag}
                        </span>
                      </div>
                      <p className={`mt-1.5 text-sm leading-relaxed transition-colors duration-300 ${
                        isActive ? "text-white/70" : "text-white/35"
                      }`}>
                        {service.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: active service banner preview */}
            <div className="relative min-h-[400px] md:min-h-[600px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={services[activeService].image}
                    alt={services[activeService].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c] via-transparent to-transparent opacity-60" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <span className="text-[10px] font-bold tracking-[0.3em] text-[#7ff5aa] uppercase">
                        {services[activeService].tag}
                      </span>
                      <h3 className="mt-2 font-display text-3xl md:text-5xl uppercase text-white">
                        {services[activeService].title}
                      </h3>
                      <p className="mt-3 text-white/65 max-w-lg text-sm md:text-base leading-relaxed">
                        {services[activeService].desc}
                      </p>
                      <Link
                        href="/plans"
                        className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#7ff5aa] uppercase hover:text-white hover:gap-3 transition-all duration-300"
                      >
                        Book This Service <ArrowRight size={14} />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Service cards grid (mobile-friendly alternative view) */}
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className={`card-switch group relative border border-white/10 bg-[#111] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-[#3dcc6e]/50 sr-scale sr-delay-${Math.min(index + 1, 5)}`}
                >
                  {/* Banner image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/40 to-transparent" />
                    {/* Tag badge */}
                    <span className="absolute top-4 left-4 text-[9px] font-bold tracking-[0.2em] text-[#7ff5aa] bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 uppercase">
                      {service.tag}
                    </span>
                    {/* Green line on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3dcc6e] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>

                  {/* Text content */}
                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 border border-white/10 bg-white/5 text-[#3dcc6e] group-hover:border-[#3dcc6e]/30 group-hover:bg-[#3dcc6e]/10 transition-all duration-300">
                        <Icon size={18} />
                      </div>
                      <h3 className="font-display text-xl md:text-2xl uppercase text-white">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-white/55 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                    <Link
                      href="/plans"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#7ff5aa] uppercase hover:text-white hover:gap-3 transition-all duration-300"
                    >
                      Get Started <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION: TRUST METRICS
          ═══════════════════════════════════════════════════════ */}
      <section className="section-pad bg-[#070707] px-4 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1880px] gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item, index) => (
            <article key={item.label} className="stat-tile card-switch border border-white/10 sr">
              <span className="text-[#7ff5aa]">{item.num}</span>
              <h3 className="font-display text-2xl text-white">{item.label}</h3>
              <p className="mt-3 text-white/70">
                {item.desc}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#7ff5aa]">
                <Check size={14} /> LEARN MORE
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION: PORTFOLIO / FEATURED PROJECTS
          ═══════════════════════════════════════════════════════ */}
      <section id="portfolio" className="section-pad bg-[#050505] px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1880px]">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
            <div>
              <p className="text-[11px] font-bold tracking-[0.35em] text-[#3dcc6e] uppercase mb-3">Portfolio</p>
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <Link href="/plans" className="text-link">
              View All Work <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { name: "Amber Lounge", tag: "Lifestyle", src: "/ADMIN_HOUSE/amber-lounge.jpg" },
              { name: "Serenity Arch", tag: "Photography", src: "/ADMIN_HOUSE/serenity-arch.jpg" },
              { name: "Neo Tide", tag: "Videography", src: "/ADMIN_HOUSE/neo-tide.jpg" },
              { name: "Velvet Corner", tag: "Creative", src: "/ADMIN_HOUSE/velvet-corner.jpg" },
            ].map((item) => (
              <article
                key={item.name}
                className="card-switch group relative min-h-[380px] border border-white/10 overflow-hidden sr-scale"
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-sm text-[#7ff5aa] font-bold tracking-[0.12em] uppercase">{item.tag}</p>
                  <h3 className="mt-1 font-display text-2xl text-white">{item.name}</h3>
                </div>
                {/* Hover arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[#3dcc6e] text-white opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                  <ArrowRight size={16} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION: COMMUNITY / SOCIAL PROOF (INSTAGRAM WALL)
          ═══════════════════════════════════════════════════════ */}
      <section id="community" className="section-pad bg-[#060606] px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1880px]">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-0 sr">
            <div>
              <p className="text-[11px] font-bold tracking-[0.35em] text-[#3dcc6e] uppercase mb-3">Join Us</p>
              <h2 className="section-title">Who Has Joined Us</h2>
              <p className="mt-4 max-w-2xl text-white/60 text-sm leading-relaxed">
                Connect with our thriving creative community. Follow us on Instagram to see real creators in action inside Admin Vision House.
              </p>
            </div>
            <a 
              href="https://www.instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-link"
            >
              Follow @adminvisionhouse <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                url: "https://www.instagram.com/p/DY6l6OrjX-n/?igsh=bHc3NDVwbXNuejI3",
                img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
                caption: "Cinematic frames and pristine captures. The craft is in the details. 📸✨",
                likes: "1,248"
              },
              {
                url: "https://www.instagram.com/p/DYzPknzDZhp/?igsh=MWEwNXdrODh6dmF0Zg==",
                img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
                caption: "Our studio configurations are tailored to empower your production workflow. ⚡️💡",
                likes: "956"
              },
              {
                url: "https://www.instagram.com/p/DYvWdVTiI2v/?igsh=czZoNjlrMHIyZTM2",
                img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
                caption: "Creating stories that resonate and visuals that leave a lasting mark. 🎬🎞️",
                likes: "1,412"
              },
              {
                url: "https://www.instagram.com/p/DY9-uUmjWXd/?igsh=MTZtbGx1eWZ0bm4yYw==",
                img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
                caption: "In the podcast zone: crystal clear acoustics meet gorgeous ambient set designs. 🎙️🌌",
                likes: "1,104"
              }
            ].map((post, i) => (
              <a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[4/5] border border-white/10 bg-[#0d0e10] overflow-hidden card-switch transition-all duration-500 hover:border-[#3dcc6e]/40 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(47,159,87,0.15)]"
              >
                <Image
                  src={post.img}
                  alt="Instagram Community Post"
                  fill
                  className="object-cover transition-all duration-700 brightness-[0.8] group-hover:brightness-[0.55] group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                
                {/* Instagram Header simulation inside post hover */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full border-2 border-[#3dcc6e] p-0.5 bg-black overflow-hidden flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-[#111] flex items-center justify-center text-[7px] font-bold text-white font-mono">AV</div>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-white block leading-none">adminvisionhouse</span>
                      <span className="text-[8px] text-white/50">Abia, Nigeria</span>
                    </div>
                  </div>
                  <div className="w-5 h-5 flex items-center justify-center bg-black/60 rounded-full text-white">
                    <span className="text-[10px] font-bold">IG</span>
                  </div>
                </div>

                {/* Text and Actions Overlay on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent pt-12 transform translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <p className="text-xs text-white/90 leading-relaxed font-light line-clamp-3">
                    {post.caption}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/70">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-bold text-[#7ff5aa]">
                        ❤️ {post.likes}
                      </span>
                      <span>💬 Comment</span>
                    </div>
                    <span className="text-[#7ff5aa] font-bold tracking-wider hover:underline flex items-center gap-1">
                      VIEW POST <ArrowRight size={10} />
                    </span>
                  </div>
                </div>

                {/* Constant Static Icon to show it's interactive and social */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-[#7ff5aa] group-hover:scale-0 group-hover:opacity-0 transition-all duration-300 z-10">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION: TESTIMONIALS
          ═══════════════════════════════════════════════════════ */}
      <section className="section-pad bg-[#050505] px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1880px]">
          <div className="sr">
            <p className="text-[11px] font-bold tracking-[0.35em] text-[#3dcc6e] uppercase mb-3">Testimonials</p>
            <h2 className="section-title">Trusted By Creative Brands</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {testimonialItems.map((item, index) => (
              <article key={index} className="testimonial-card card-switch min-w-0 max-w-none sr-scale">
                {/* Star rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#3dcc6e" className="text-[#3dcc6e]" />
                  ))}
                </div>
                <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                <cite>{item.name}</cite>
                <p className="role">{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION: CTA — Final Conversion Push
          ═══════════════════════════════════════════════════════ */}
      <section className="cta-section section-pad bg-[#2f9f57] px-4 py-14 text-black md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1880px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-5xl leading-[0.88] text-white md:text-6xl">
              Let&apos;s Turn Your Vision Into Reality
            </h2>
            <p className="mt-4 max-w-3xl text-black/80">
              From concept to post-production, Admin Vision House is your one-stop creative studio.
              Book a free consultation and let&apos;s create something extraordinary together.
            </p>
          </div>
          <Link href="/plans" className="black-button consultation-text-button md:self-end">
            Free Consultation <Star size={22} />
          </Link>
        </div>
      </section>
    </>
  );
}
