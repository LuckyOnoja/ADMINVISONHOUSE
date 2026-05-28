"use client";

import { Sparkle } from "lucide-react";
import { stats } from "./landing-data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "./useScrollReveal";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useCountUp(statsRef);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Seal rotates as you scroll
  const sealRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="story-section section-pad bg-[#0d0d0d]"
    >
      <div className="mx-auto max-w-[1880px] px-6 md:px-10 lg:px-14">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_320px]">
          <div>
            <h2 className="story-title">
              {/* Each line slides in from the left with stagger */}
              {["CRAFTING STORIES", "THROUGH", "CINEMATIC FRAMES"].map(
                (line, i) => (
                  <span
                    key={line}
                    style={{ display: "block", overflow: "hidden" }}
                  >
                    <motion.span
                      style={{ display: "block" }}
                      initial={{ x: "-100%", opacity: 0 }}
                      whileInView={{ x: "0%", opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 1,
                        delay: i * 0.15,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                )
              )}
            </h2>
          </div>

          {/* Spinning seal driven by scroll */}
          <motion.div
            className="story-seal"
            style={{ rotate: sealRotate }}
            aria-hidden="true"
          >
            <span>Admin Vision • Creative Studio • Booking House •</span>
            <Sparkle fill="currentColor" strokeWidth={3} />
          </motion.div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(260px,.52fr)_minmax(0,.68fr)_minmax(280px,.4fr)]">
          <div className="hidden lg:block" />

          <motion.p
            className="story-copy"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Admin Vision House is built on the belief that every visual idea
            deserves a room with power, intention, and precision. Whether it is
            a campaign, podcast, portrait session, or branded content, we craft
            spaces that help your story resonate.
          </motion.p>

          <div className="story-stats" ref={statsRef}>
            {stats.map(([value, label], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <strong data-countup data-target={value}>
                  0
                </strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
