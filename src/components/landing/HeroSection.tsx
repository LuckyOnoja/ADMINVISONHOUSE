"use client";

import Link from "next/link";
import { ArrowRight, Sparkle } from "lucide-react";
import { heroAvatars } from "./landing-data";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const titleLine1 = ["A", "D", "M", "I", "N"];
const titleAccent = "O";
const titleLine1End = ["", ""];
const titleLine2 = "VISION HOUSE";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: video moves slower than content
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Content fades and moves up as you scroll away
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  // Horizontal line draws as you scroll
  const lineWidth = useTransform(scrollYProgress, [0, 0.3], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="desart-hero relative min-h-screen overflow-hidden px-6 pt-28 md:px-10 lg:px-14"
    >
      {/* Parallax video background */}
      <motion.video
        className="hero-bg-video"
        style={{ y: videoY }}
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="hero-video-overlay" aria-hidden="true" />

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-[1880px] flex-col justify-end pb-12 pt-28"
      >
        <div className="flex w-full flex-col lg:flex-row">
          <div className="w-full lg:w-[70%]">
            <h1 className="montra-hero-title">
              {/* Line 1: Each letter staggers in */}
              {titleLine1.map((letter, i) => (
                <motion.span
                  key={`l1-${i}`}
                  initial={{ y: 120, opacity: 0, rotateX: 90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ display: "inline-block", transformOrigin: "bottom" }}
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                className="accent-block"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ display: "inline-block", transformOrigin: "left" }}
              >
                {titleAccent}
              </motion.span>
              {titleLine1End.map((letter, i) => (
                <motion.span
                  key={`l1e-${i}`}
                  initial={{ y: 120, opacity: 0, rotateX: 90 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.7 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ display: "inline-block", transformOrigin: "bottom" }}
                >
                  {letter}
                </motion.span>
              ))}
              <br />
              {/* Line 2: Words slide up */}
              {titleLine2.split(" ").map((word, i) => (
                <span key={word + i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}>
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.8 + i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
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
            <motion.div
              className="hero-card-stack mt-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero-mini-card card-a">
                <span>THIS WEEK</span>
                <strong>80% BOOKED</strong>
              </div>
              <div className="hero-mini-card card-b">
                <span>READY TO SHOOT?</span>
                <strong>RESERVE YOUR SPACE</strong>
              </div>
            </motion.div>
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
