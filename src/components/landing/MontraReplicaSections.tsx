"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Play, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const serviceItems = [
  "Video Production",
  "Video Editing",
  "Script Writing",
  "Motion Graphics",
  "Sound Design",
];

const trustItems = [
  "Cinematic Excellence",
  "Creative Teamwork",
  "End-to-End Services",
  "Client-Focused Approach",
];

const testimonialItems = [
  "Working with Admin Vision House was seamless and visually outstanding.",
  "They captured our message with precision, clarity, and premium quality.",
  "From script to final cut, the process was smooth and highly creative.",
];

export function MontraReplicaSections() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section id="about" className="section-pad bg-[#0a0a0a] px-6 md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1880px] gap-10 lg:grid-cols-[1.15fr_.85fr] items-center">
          <div>
            <p className="eyebrow sr">Crafting Stories Through Cinematic Frames</p>
            <p className="max-w-3xl text-base leading-relaxed text-white/75 sr sr-delay-1">
              Every story deserves to be told with power, passion, and
              precision. This structure mirrors the reference flow while keeping
              your color direction and conversion-focused messaging.
            </p>
          </div>
          <div
            onClick={() => setIsOpen(true)}
            className="group relative cursor-pointer overflow-hidden border border-white/15 bg-black h-72 md:h-80 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition hover:border-[#3dcc6e]/40 sr-scale sr-delay-2"
          >
            {/* Background muted autoplaying video loop */}
            <video
              src="/hero-video.mp4"
              muted
              loop
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover brightness-[0.6] group-hover:brightness-[0.7] group-hover:scale-[1.03] transition-all duration-700"
            />

            {/* Glowing neon green border accent when hovered */}
            <div className="absolute inset-0 border border-transparent group-hover:border-[#3dcc6e]/20 pointer-events-none transition-all duration-500 z-10" />

            {/* Play Button Overlay */}
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
            {/* Backdrop overlay with custom green kite grid pattern and blur */}
            <div
              className="absolute inset-0 cursor-pointer bg-black/85 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 15 0 L 30 25 L 15 50 L 0 25 Z' fill='none' stroke='rgba(61, 204, 110, 0.2)' stroke-width='0.8'/%3E%3C/svg%3E")`,
                backgroundSize: "30px 50px",
              }}
            />

            {/* Modal video container */}
            <motion.div
              className="relative w-full max-w-[1280px] aspect-video bg-[#090909] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.85)] overflow-hidden z-10"
              initial={{ scale: 0.94, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 15, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-20 p-2.5 rounded-none text-white/70 hover:text-[#3dcc6e] bg-black/50 hover:bg-black/80 border border-white/10 hover:border-[#3dcc6e]/30 transition-all duration-300"
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Fully controllable video element inside modal */}
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

      <section id="services" className="section-pad bg-[#070707] px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1880px]">
          <p className="eyebrow sr">What We Do Best</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceItems.map((item, index) => (
              <article
                key={item}
                className={`card-switch border border-white/15 bg-[#131313] p-6 transition hover:-translate-y-1 hover:border-[#3dcc6e] sr-scale sr-delay-${Math.min(index + 1, 5)}`}
              >
                <h3 className="font-display text-3xl uppercase text-white">
                  {item}
                </h3>
                <div className="mt-4 h-30 border border-dashed border-white/20 bg-white/5 p-3 text-[10px] font-bold tracking-[0.18em] text-white/55">
                  IMAGE PLACEHOLDER
                </div>
                <p className="mt-4 text-white/70">
                  Structured content block ready for your real copy and
                  imagery.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section-pad bg-[#050505] px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1880px]">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
            <h2 className="section-title">Featured Projects</h2>
            <Link href="/plans" className="text-link whitespace-nowrap inline-flex items-center gap-1.5">
              Explore All Spaces <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {["Urban Soul", "Echoes of Fashion", "The Journey", "Legacy"].map(
              (item) => (
                <article
                  key={item}
                  className="card-switch min-h-[380px] border border-white/20 bg-white/5 p-4 sr-scale"
                >
                  <div className="h-60 border border-dashed border-white/20 bg-[#1a1a1a] p-3 text-[10px] font-bold tracking-[0.18em] text-white/55">
                    PROJECT IMAGE PLACEHOLDER
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-white">
                    {item}
                  </h3>
                  <p className="text-sm text-[#7ff5aa]">Category Placeholder</p>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#070707] px-6 md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-[1880px] gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item, index) => (
            <article key={item} className="stat-tile card-switch border border-white/10 sr">
              <span className="text-[#7ff5aa]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-2xl text-white">{item}</h3>
              <p className="mt-3 text-white/70">
                High-performance creative execution designed to convert viewers
                into paying clients.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-[#7ff5aa]">
                <Check size={14} /> LEARN MORE
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad bg-[#050505] px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1880px]">
          <h2 className="section-title sr">Trusted By Creative Brands</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {testimonialItems.map((item, index) => (
              <article key={index} className="testimonial-card card-switch min-w-0 max-w-none sr-scale">
                <blockquote>{item}</blockquote>
                <cite>Client Name Placeholder</cite>
                <p className="role">Agency / Brand</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#070707] px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1880px]">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <h2 className="section-title sr">Meet The Creative Team</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {["Daniel Reyes", "Maya Chen", "Sasha Morgan", "Leo Fernandez"].map(
              (name) => (
                <article key={name} className="card-switch border border-white/20 bg-[#111] p-4 sr-scale">
                  <div className="h-56 border border-dashed border-white/20 bg-white/5 p-3 text-[10px] font-bold tracking-[0.18em] text-white/55">
                    TEAM PHOTO PLACEHOLDER
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-white">{name}</h3>
                  <p className="text-[#7ff5aa]">Role Placeholder</p>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#050505] px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1880px]">
          <h2 className="section-title sr">Latest Insights</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <article key={item} className="card-switch border border-white/20 bg-[#121212] p-4 sr-scale">
                <div className="h-44 border border-dashed border-white/20 bg-white/5 p-3 text-[10px] font-bold tracking-[0.18em] text-white/55">
                  BLOG IMAGE PLACEHOLDER
                </div>
                <p className="mt-4 text-xs font-bold tracking-[0.18em] text-[#7ff5aa]">
                  CREATIVE DIRECTION
                </p>
                <h3 className="mt-3 font-display text-2xl text-white">
                  Article Title Placeholder
                </h3>
                <p className="mt-2 text-white/70">
                  Short blog intro placeholder text to mimic the source
                  layout.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section section-pad bg-[#2f9f57] px-6 py-14 text-black md:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1880px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-5xl leading-[0.88] text-white md:text-6xl">
              Let&apos;s Turn Your Vision Into Reality
            </h2>
            <p className="mt-4 max-w-3xl text-black/80">
              From concept to post-production, we designed this page to feel
              premium and convert visitors into studio bookings.
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
