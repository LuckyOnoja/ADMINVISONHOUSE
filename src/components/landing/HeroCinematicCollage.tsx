"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "phase1" | "phase2" | "phase3";

function SplashBorder() {
  return (
    <>
      {/* 1. Base Thicker Pure White Frame */}
      <div className="absolute inset-0 border-[6px] border-white z-20 pointer-events-none rounded-none" />
      
      {/* 2. Organic Paint Drip from top border (dripping down onto image) */}
      <svg viewBox="0 0 60 40" className="absolute w-14 h-10 fill-black z-30 pointer-events-none" style={{ top: "-6px", left: "15%" }}>
        <path d="M 0 6 Q 15 6 20 6 T 30 18 Q 32 30 35 30 Q 38 30 40 6 T 60 6 L 60 0 L 0 0 Z" />
        <circle cx="35" cy="36" r="2.5" />
        <circle cx="23" cy="22" r="1.5" />
      </svg>
      
      {/* 3. Organic Paint Drip from bottom border (dripping down off border) */}
      <svg viewBox="0 0 60 40" className="absolute w-16 h-10 fill-black z-30 pointer-events-none" style={{ bottom: "-6px", left: "45%" }}>
        <path d="M 0 34 Q 15 34 20 34 T 30 22 Q 32 10 35 10 Q 38 10 40 34 T 60 34 L 60 40 L 0 40 Z" />
        <circle cx="35" cy="4" r="2.5" />
        <circle cx="23" cy="18" r="1.5" />
      </svg>

      {/* 4. Large Paint Splat on the right border */}
      <svg viewBox="0 0 50 50" className="absolute w-12 h-12 fill-black z-30 pointer-events-none" style={{ top: "30%", right: "-16px" }}>
        <path d="M25 15 C28 22 35 20 38 25 C41 30 32 32 30 38 C28 44 22 40 18 35 C14 30 18 28 15 22 C12 16 22 8 25 15 Z" />
        <circle cx="10" cy="18" r="2" />
        <circle cx="38" cy="12" r="1.5" />
        <circle cx="42" cy="35" r="2.5" />
        <circle cx="8" cy="32" r="2" />
      </svg>

      {/* 5. Smaller Paint Splat on the left border */}
      <svg viewBox="0 0 50 50" className="absolute w-10 h-10 fill-black z-30 pointer-events-none" style={{ bottom: "25%", left: "-14px" }}>
        <path d="M25 15 C28 22 35 20 38 25 C41 30 32 32 30 38 C28 44 22 40 18 35 C14 30 18 28 15 22 C12 16 22 8 25 15 Z" />
        <circle cx="28" cy="8" r="1.5" />
        <circle cx="12" cy="40" r="2" />
      </svg>

      {/* 6. Stray Splattered Drops */}
      <div className="absolute w-2 h-2 rounded-full bg-black z-30 pointer-events-none" style={{ top: "-14px", right: "25%" }} />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-black z-30 pointer-events-none" style={{ bottom: "-12px", right: "35%" }} />
      <div className="absolute w-1 h-1 rounded-full bg-black z-30 pointer-events-none" style={{ top: "15%", left: "-10px" }} />
    </>
  );
}

export function HeroCinematicCollage() {
  const [phase, setPhase] = useState<Phase>("phase1");

  useEffect(() => {
    let active = true;
    const runSequence = async () => {
      while (active) {
        // Phase 1: 4.5 seconds
        setPhase("phase1");
        await new Promise((resolve) => setTimeout(resolve, 4500));
        if (!active) break;

        // Phase 2: 5.5 seconds
        setPhase("phase2");
        await new Promise((resolve) => setTimeout(resolve, 5500));
        if (!active) break;

        // Phase 3: 6.0 seconds
        setPhase("phase3");
        await new Promise((resolve) => setTimeout(resolve, 6000));
        if (!active) break;
      }
    };

    runSequence();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none z-2">
      <AnimatePresence mode="wait">
        {/* PHASE 1: Single Cinematic Image (Center-Right visual) */}
        {phase === "phase1" && (
          <motion.div
            key="phase1"
            className="relative flex items-center justify-center w-[85vw] md:w-[55vw] max-w-[720px] aspect-[4/3] md:aspect-[16/10] shadow-[0_0_50px_rgba(0,0,0,0.85)]"
            initial={{ scale: 0.2, opacity: 0, rotate: -8 }}
            animate={{
              scale: [0.2, 1.02, 1.05],
              opacity: [0, 1, 1],
              rotate: [-8, 2, 4],
            }}
            exit={{
              scale: 0.15,
              opacity: 0,
              rotate: 15,
              filter: "blur(15px)",
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            transition={{
              duration: 4.5,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.8, 1],
            }}
          >
            {/* Clipped Image Container */}
            <div className="absolute inset-0 overflow-hidden z-10 rounded-none">
              <motion.img
                src="/ADMIN_HOUSE/podcast.jpg"
                alt="Cinematic Collage 1"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 4.5, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />
            </div>

            {/* Custom Splash Border */}
            <SplashBorder />

            <motion.div
              className="absolute bottom-6 left-6 right-6 z-25 text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.3em] uppercase text-emerald-400">
                Phase I: The Soundstage
              </span>
              <h3 className="text-md md:text-xl font-bold tracking-wider text-white mt-1 uppercase font-display">
                CREATIVE SUITE
              </h3>
            </motion.div>
          </motion.div>
        )}

        {/* PHASE 2: 5 Slanted Images cascading from middle right */}
        {phase === "phase2" && (
          <motion.div
            key="phase2"
            className="relative w-full h-full flex items-center justify-center"
            exit={{
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            {[
              { src: "/ADMIN_HOUSE/amber-lounge.jpg", x: -220, y: 110, rot: 12, label: "Amber Lounge" },
              { src: "/ADMIN_HOUSE/elite-circle.jpg", x: -110, y: 55, rot: 14, label: "Elite Circle" },
              { src: "/ADMIN_HOUSE/neo-tide.jpg", x: 20, y: -10, rot: 16, label: "Neo Tide" },
              { src: "/ADMIN_HOUSE/serenity-arch.jpg", x: 150, y: -65, rot: 18, label: "Serenity Arch" },
              { src: "/ADMIN_HOUSE/velvet-corner.jpg", x: 280, y: -120, rot: 20, label: "Velvet Corner" },
            ].map((img, index) => {
              const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
              const xVal = isMobile ? img.x * 0.45 : img.x;
              const yVal = isMobile ? img.y * 0.45 : img.y;
              const sizeClass = isMobile
                ? "w-[32vw] aspect-[3/4]"
                : "w-[18vw] max-w-[280px] aspect-[3/4]";

              return (
                <motion.div
                  key={index}
                  className={`absolute shadow-2xl ${sizeClass}`}
                  style={{ zIndex: 10 + index }}
                  initial={{
                    x: 300,
                    y: 200,
                    scale: 0.1,
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: xVal,
                    y: yVal,
                    scale: 1,
                    opacity: 1,
                    rotate: img.rot,
                  }}
                  exit={{
                    x: xVal - 50,
                    y: yVal + 50,
                    scale: 0.2,
                    opacity: 0,
                    rotate: img.rot - 15,
                    transition: {
                      duration: 0.6,
                      delay: (4 - index) * 0.05,
                      ease: "easeIn",
                    },
                  }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden z-10 rounded-none">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[8px] md:text-[9px] font-bold tracking-widest text-white/80 uppercase">
                      {img.label}
                    </span>
                  </div>
                  <SplashBorder />
                </motion.div>
              );
            })}

            {/* Title Overlay for Phase 2 */}
            <motion.div
              className="absolute bottom-12 left-10 z-30"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.35em] uppercase text-emerald-400">
                Phase II: The Assembly
              </span>
              <h3 className="text-lg md:text-2xl font-extrabold tracking-wider text-white mt-1 uppercase font-display">
                CREATIVE COLLAGE
              </h3>
            </motion.div>
          </motion.div>
        )}

        {/* PHASE 3: 2 Left and 2 Right Images with Circling Border Lights */}
        {phase === "phase3" && (
          <motion.div
            key="phase3"
            className="relative w-full h-full flex items-center justify-center"
            exit={{
              opacity: 0,
              scale: 1.1,
              filter: "blur(10px)",
              transition: { duration: 0.7, ease: "easeOut" },
            }}
          >
            {/* Center core pulse glow */}
            <div className="absolute w-[60vw] h-[60vw] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

            {[
              // Left side images
              {
                src: "/ADMIN_HOUSE/iconic-oasis.jpg",
                side: "left",
                style: { left: "5%", top: "15%", rotate: -6 },
                label: "Iconic Oasis",
                startX: -600,
                delay: 0.1,
              },
              {
                src: "/ADMIN_HOUSE/terra-gallery.jpg",
                side: "left",
                style: { left: "12%", top: "45%", rotate: 8 },
                label: "Terra Gallery",
                startX: -600,
                delay: 0.3,
              },
              // Right side images
              {
                src: "/ADMIN_HOUSE/podcast.jpg",
                side: "right",
                style: { right: "5%", top: "18%", rotate: 5 },
                label: "Podcast Suite",
                startX: 600,
                delay: 0.2,
              },
              {
                src: "/ADMIN_HOUSE/amber-lounge.jpg",
                side: "right",
                style: { right: "12%", top: "48%", rotate: -8 },
                label: "Amber Lounge",
                startX: 600,
                delay: 0.4,
              },
            ].map((img, index) => {
              const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
              const sizeClass = isMobile
                ? "w-[44vw] aspect-[3/4]"
                : "w-[24vw] max-w-[380px] aspect-[3/4]";

              // On mobile, position them slightly more central so they don't cut off
              const mobileStyle = isMobile
                ? img.side === "left"
                  ? { left: `${index * 8 + 3}%`, top: `${index * 25 + 15}%`, rotate: img.style.rotate }
                  : { right: `${(index - 2) * 8 + 3}%`, top: `${(index - 2) * 25 + 20}%`, rotate: img.style.rotate }
                : img.style;

              return (
                <motion.div
                  key={index}
                  className={`absolute shadow-[0_0_35px_rgba(0,0,0,0.9)] ${sizeClass}`}
                  style={{
                    ...mobileStyle,
                    zIndex: 20 + index,
                  }}
                  initial={{
                    x: img.startX,
                    rotate: img.style.rotate * 2,
                    scale: 0.6,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    rotate: img.style.rotate,
                    scale: 1,
                    opacity: 1,
                    y: [0, -8, 0], // Float effect
                  }}
                  transition={{
                    x: { duration: 1, delay: img.delay, ease: [0.16, 1, 0.3, 1] },
                    rotate: { duration: 1.2, delay: img.delay, ease: [0.16, 1, 0.3, 1] },
                    scale: { duration: 1, delay: img.delay, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.8, delay: img.delay },
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: img.delay + 1,
                    },
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden z-10 rounded-none">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[8px] md:text-[10px] font-bold tracking-widest text-white uppercase">
                      {img.label}
                    </span>
                  </div>
                  <SplashBorder />
                </motion.div>
              );
            })}

            {/* Staggered subtitles & titles */}
            <motion.div
              className="absolute text-center z-30 pointer-events-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.span
                className="text-[9px] md:text-[11px] font-semibold tracking-[0.4em] uppercase text-emerald-400 block"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Phase III: The Alignment
              </motion.span>
              <h2 className="text-xl md:text-4xl font-black tracking-widest text-white mt-2 uppercase font-display">
                PREMIUM SPACES
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
