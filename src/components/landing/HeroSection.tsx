"use client";

import Link from "next/link";
import { ArrowRight, Sparkle } from "lucide-react";
import { heroAvatars } from "./landing-data";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { HeroCinematicCollage } from "./HeroCinematicCollage";
import { GreenLightningBg } from "./GreenLightningBg";

const titleItems = [
  { type: "char", value: "A" },
  { type: "char", value: "D" },
  { type: "char", value: "M" },
  { type: "char", value: "I" },
  { type: "char", value: "N" },
  { type: "char", value: " " },
  { type: "accent", value: "O" },
  { type: "br" },
  { type: "char", value: "V" },
  { type: "char", value: "I" },
  { type: "char", value: "S" },
  { type: "char", value: "I" },
  { type: "char", value: "O" },
  { type: "char", value: "N" },
  { type: "char", value: " " },
  { type: "char", value: "H" },
  { type: "char", value: "O" },
  { type: "char", value: "U" },
  { type: "char", value: "S" },
  { type: "char", value: "E" },
];

const titleContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06, // typing speed
      delayChildren: 0.3,
    },
  },
};

const titleCharVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.01 }, // snaps in like a typewriter keypress
  },
};
const titleAccentVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [collageInterval, setCollageInterval] = useState(0);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCollageInterval((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: background layers move slower than text content
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Content fades and moves up as you scroll away
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  // Horizontal line draws as you scroll
  const lineWidth = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);

  if (!mounted) {
    return <section className="relative min-h-screen bg-[#090909]" />;
  }

  const phase = (() => {
    const p = collageInterval % 3;
    if (p === 0) return "phase1";
    if (p === 1) return "phase2";
    return "phase3";
  })();

  return (
    <section
      ref={sectionRef}
      className="desart-hero relative min-h-screen overflow-hidden px-6 pt-20 md:pt-28 md:px-10 lg:px-14"
    >
      {/* 1. Cinematic dark green lightning background (deep back layer) */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ y: bgY, zIndex: 1 }}
      >
        <GreenLightningBg collageInterval={collageInterval} />
      </motion.div>

      {/* 2. Looping Cinematic Collage (middle layer) */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ y: bgY, zIndex: 2 }}
      >
        <HeroCinematicCollage phase={phase} />
      </motion.div>

      {/* 3. Dark gradient overlay to soften elements and preserve text contrast */}
      <div 
        className="hero-video-overlay pointer-events-none" 
        aria-hidden="true" 
        style={{ zIndex: 3, opacity: 0.55 }} 
      />

      {/* 4. Main Content Overlay (top layer) */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-[1880px] flex-col justify-end pb-12 pt-16 md:pt-28"
      >
        <div className="flex w-full flex-col lg:flex-row">
          <div className="w-full lg:w-[70%]">
            <motion.h1 
              className="montra-hero-title"
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {titleItems.map((item, idx) => {
                if (item.type === "br") {
                  return <br key={`br-${idx}`} />;
                }
                if (item.type === "accent") {
                  return (
                    <motion.span
                      key={`accent-${idx}`}
                      className="accent-block"
                      variants={titleAccentVariants}
                      style={{ display: "inline-block", transformOrigin: "left" }}
                    >
                      {item.value}
                    </motion.span>
                  );
                }
                return (
                  <motion.span
                    key={`char-${idx}`}
                    variants={titleCharVariants}
                    style={{ display: "inline-block" }}
                  >
                    {item.value === " " ? "\u00A0" : item.value}
                  </motion.span>
                );
              })}
            </motion.h1>
          </div>

          <motion.aside
            className="flex flex-col items-start justify-end w-full lg:w-[30%] mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex">
              {heroAvatars.map((src, i) => (
                <motion.span
                  key={src}
                  className="hero-avatar"
                  style={{ backgroundImage: `url(${src})` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.4 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
              <motion.span
                className="hero-avatar-spark"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 1.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Sparkle fill="white" strokeWidth={3} />
              </motion.span>
            </div>
            <motion.p
              className="text-md font-medium mt-4"
              style={{ color: "rgba(255,255,255,.76)", maxWidth: 600, lineHeight: 1.45 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Admin Vision House is a full-service creative production studio
              delivering bold visuals and powerful narratives. From content
              campaigns to creative films, we bring your vision to life.
            </motion.p>
          </motion.aside>
        </div>

        {/* Animated divider line */}
        <motion.div
          className="hero-bottom-row"
          style={{ borderTopColor: "transparent", position: "relative" }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: 4,
              background: "rgba(255,255,255,.9)",
              width: lineWidth,
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/plans" className="watch-button hero-cta-button">
              Book a Session <ArrowRight size={20} />
            </Link>
          </motion.div>

          <motion.div
            className="hero-social-buttons"
            aria-label="Social links"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="X">X</a>
            <a href="#" aria-label="YouTube">▶</a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
