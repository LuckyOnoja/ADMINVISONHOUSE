"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function ScrollExperience() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });

  const glowX = useTransform(scrollYProgress, [0, 1], ["8%", "88%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["18%", "72%"]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".sr, .sr-scale")
    );

    if (prefersReducedMotion) {
      items.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div className="scroll-progress-bar" style={{ scaleX: progress }} />
      <div className="site-gradient-shift" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="global-scroll-glow"
        style={{ left: glowX, top: glowY }}
      />
    </>
  );
}
