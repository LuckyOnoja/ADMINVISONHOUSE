"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "phase1" | "phase2" | "phase3";

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
            className="relative flex items-center justify-center w-[75vw] md:w-[45vw] max-w-[580px] aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />
            <motion.img
              src="/ADMIN_HOUSE/podcast.jpg"
              alt="Cinematic Collage 1"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 4.5, ease: "easeOut" }}
            />
            <motion.div
              className="absolute bottom-6 left-6 right-6 z-20 text-center"
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
              { src: "/ADMIN_HOUSE/amber-lounge.jpg", x: -160, y: 80, rot: 12, label: "Amber Lounge" },
              { src: "/ADMIN_HOUSE/elite-circle.jpg", x: -70, y: 35, rot: 14, label: "Elite Circle" },
              { src: "/ADMIN_HOUSE/neo-tide.jpg", x: 20, y: -10, rot: 16, label: "Neo Tide" },
              { src: "/ADMIN_HOUSE/serenity-arch.jpg", x: 110, y: -55, rot: 18, label: "Serenity Arch" },
              { src: "/ADMIN_HOUSE/velvet-corner.jpg", x: 200, y: -100, rot: 20, label: "Velvet Corner" },
            ].map((img, index) => {
              const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
              const xVal = isMobile ? img.x * 0.45 : img.x;
              const yVal = isMobile ? img.y * 0.45 : img.y;
              const sizeClass = isMobile
                ? "w-[24vw] aspect-[3/4]"
                : "w-[13vw] max-w-[190px] aspect-[3/4]";

              return (
                <motion.div
                  key={index}
                  className={`absolute rounded-xl overflow-hidden border border-white/10 shadow-2xl ${sizeClass}`}
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
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[8px] md:text-[9px] font-bold tracking-widest text-white/80 uppercase">
                    {img.label}
                  </span>
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
                style: { left: "8%", top: "18%", rotate: -6 },
                label: "Iconic Oasis",
                startX: -600,
                delay: 0.1,
              },
              {
                src: "/ADMIN_HOUSE/terra-gallery.jpg",
                side: "left",
                style: { left: "14%", top: "45%", rotate: 8 },
                label: "Terra Gallery",
                startX: -600,
                delay: 0.3,
              },
              // Right side images
              {
                src: "/ADMIN_HOUSE/podcast.jpg",
                side: "right",
                style: { right: "8%", top: "22%", rotate: 5 },
                label: "Podcast Suite",
                startX: 600,
                delay: 0.2,
              },
              {
                src: "/ADMIN_HOUSE/amber-lounge.jpg",
                side: "right",
                style: { right: "14%", top: "48%", rotate: -8 },
                label: "Amber Lounge",
                startX: 600,
                delay: 0.4,
              },
            ].map((img, index) => {
              const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
              const sizeClass = isMobile
                ? "w-[36vw] aspect-[3/4]"
                : "w-[18vw] max-w-[260px] aspect-[3/4]";

              // On mobile, position them slightly more central so they don't cut off
              const mobileStyle = isMobile
                ? img.side === "left"
                  ? { left: `${index * 8 + 4}%`, top: `${index * 25 + 15}%`, rotate: img.style.rotate }
                  : { right: `${(index - 2) * 8 + 4}%`, top: `${(index - 2) * 25 + 20}%`, rotate: img.style.rotate }
                : img.style;

              return (
                <motion.div
                  key={index}
                  className={`absolute rounded-2xl p-[2px] overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.9)] ${sizeClass}`}
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
                  {/* Glowing border trace (conic gradient) */}
                  <motion.div
                    className="absolute inset-[-150%] rounded-full bg-[conic-gradient(from_0deg,#10b981_0%,#34d399_20%,transparent_40%,transparent_60%,#10b981_80%,#34d399_100%)] z-0"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Inner container to clip content and hide conic gradient except border */}
                  <div className="relative w-full h-full bg-[#0d0d0d] rounded-[14px] overflow-hidden z-10">
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
