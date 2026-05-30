"use client";

import React from "react";
import { motion } from "framer-motion";

interface GreenLightningBgProps {
  collageInterval: number;
}

export function GreenLightningBg({ collageInterval }: GreenLightningBgProps) {
  const isVisible = collageInterval % 2 !== 0;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Dark base background */}
      <div className="absolute inset-0 bg-[#090909]" />

      {/* Subtle ambient green radial glow in the center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(47, 159, 87, 0.06) 0%, rgba(9, 9, 9, 0) 70%)",
        }}
      />

      {/* ═══ LEFT NEON STRIPE ═══ */}
      <motion.div
        className="absolute top-0 h-full flex justify-center pointer-events-none"
        style={{ left: "-98px", width: "200px" }}
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={{
          clipPath: collageInterval === 0
            ? "inset(0% 0% 100% 0%)"
            : isVisible
            ? ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
            : "inset(100% 0% 0% 0%)",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-[4px] h-full">
          {/* The neon glow aura behind the stripe */}
          <div
            className="absolute inset-0"
            style={{
              width: "4px",
              background:
                "linear-gradient(180deg, transparent 0%, #3dcc6e 15%, #3dcc6e 85%, transparent 100%)",
              boxShadow:
                "0 0 16px 6px rgba(61, 204, 110, 0.4), 0 0 35px 12px rgba(61, 204, 110, 0.2), 0 0 70px 18px rgba(47, 159, 87, 0.1)",
              borderRadius: "2px",
            }}
          />

          {/* The bright core line */}
          <div
            className="absolute inset-0"
            style={{
              width: "2px",
              marginLeft: "1px",
              background:
                "linear-gradient(180deg, transparent 0%, rgba(180, 255, 210, 0.9) 15%, rgba(180, 255, 210, 0.9) 85%, transparent 100%)",
              borderRadius: "1px",
            }}
          />

          {/* Traveling light pulse that loops on the left stripe */}
          <motion.div
            className="absolute"
            style={{
              width: "4px",
              height: "150px",
              background:
                "linear-gradient(180deg, transparent, rgba(180, 255, 210, 0.8), rgba(61, 204, 110, 0.9), rgba(180, 255, 210, 0.8), transparent)",
              boxShadow:
                "0 0 25px 8px rgba(61, 204, 110, 0.5), 0 0 50px 15px rgba(61, 204, 110, 0.2.5)",
              borderRadius: "2px",
              left: 0,
            }}
            initial={{ top: "-150px" }}
            animate={{ top: "calc(100% + 150px)" }}
            transition={{
              duration: 5.0,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>

      {/* ═══ RIGHT NEON STRIPE ═══ */}
      <motion.div
        className="absolute top-0 h-full flex justify-center pointer-events-none"
        style={{ right: "-98px", width: "200px" }}
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={{
          clipPath: collageInterval === 0
            ? "inset(0% 0% 100% 0%)"
            : isVisible
            ? ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
            : "inset(100% 0% 0% 0%)",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-[4px] h-full">
          {/* The neon glow aura behind the stripe */}
          <div
            className="absolute inset-0"
            style={{
              width: "4px",
              background:
                "linear-gradient(180deg, transparent 0%, #3dcc6e 15%, #3dcc6e 85%, transparent 100%)",
              boxShadow:
                "0 0 16px 6px rgba(61, 204, 110, 0.4), 0 0 35px 12px rgba(61, 204, 110, 0.2), 0 0 70px 18px rgba(47, 159, 87, 0.1)",
              borderRadius: "2px",
            }}
          />

          {/* The bright core line */}
          <div
            className="absolute inset-0"
            style={{
              width: "2px",
              marginLeft: "1px",
              background:
                "linear-gradient(180deg, transparent 0%, rgba(180, 255, 210, 0.9) 15%, rgba(180, 255, 210, 0.9) 85%, transparent 100%)",
              borderRadius: "1px",
            }}
          />

          {/* Traveling light pulse that loops on the right stripe */}
          <motion.div
            className="absolute"
            style={{
              width: "4px",
              height: "150px",
              background:
                "linear-gradient(180deg, transparent, rgba(180, 255, 210, 0.8), rgba(61, 204, 110, 0.9), rgba(180, 255, 210, 0.8), transparent)",
              boxShadow:
                "0 0 25px 8px rgba(61, 204, 110, 0.5), 0 0 50px 15px rgba(61, 204, 110, 0.2.5)",
              borderRadius: "2px",
              left: 0,
            }}
            initial={{ top: "-150px" }}
            animate={{ top: "calc(100% + 150px)" }}
            transition={{
              duration: 5.0,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
