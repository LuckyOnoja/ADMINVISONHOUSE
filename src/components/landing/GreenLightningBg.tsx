"use client";

import React, { useEffect, useRef } from "react";

export function GreenLightningBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Lightning strike representation
    interface Strike {
      points: { x: number; y: number }[];
      opacity: number;
      duration: number;
      maxDuration: number;
      width: number;
      branches: { points: { x: number; y: number }[]; opacity: number }[];
    }

    let activeStrikes: Strike[] = [];
    let flashOpacity = 0;
    let nextStrikeTime = Date.now() + Math.random() * 2000 + 1000;

    // Generate lightning bolt path
    const createLightningPath = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displace: number
    ): { x: number; y: number }[] => {
      const points: { x: number; y: number }[] = [];
      const minSegment = 8;

      const generate = (
        sx: number,
        sy: number,
        ex: number,
        ey: number,
        disp: number
      ) => {
        const dx = ex - sx;
        const dy = ey - sy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minSegment) {
          points.push({ x: sx, y: sy });
          return;
        }

        const midX = (sx + ex) / 2;
        const midY = (sy + ey) / 2;

        // Offset perpendicular to the segment direction
        const nx = -dy / dist;
        const ny = dx / dist;
        const offset = (Math.random() - 0.5) * disp;

        const cx = midX + nx * offset;
        const cy = midY + ny * offset;

        generate(sx, sy, cx, cy, disp / 2);
        generate(cx, cy, ex, ey, disp / 2);
      };

      generate(x1, y1, x2, y2, displace);
      points.push({ x: x2, y: y2 });
      return points.sort((a, b) => a.y - b.y);
    };

    // Trigger a new strike
    const triggerStrike = () => {
      const startX = Math.random() * width;
      const startY = 0;
      const endX = startX + (Math.random() - 0.5) * (width * 0.4);
      const endY = height * (0.4 + Math.random() * 0.6);

      const mainPoints = createLightningPath(startX, startY, endX, endY, width * 0.15);
      const strikeWidth = Math.random() * 2.5 + 1.5;
      const duration = Math.floor(Math.random() * 15) + 12; // frame count

      // Generate branches
      const branches: { points: { x: number; y: number }[]; opacity: number }[] = [];
      const numBranches = Math.floor(Math.random() * 3);

      for (let i = 0; i < numBranches; i++) {
        // Pick a point along the main path to branch off
        if (mainPoints.length > 5) {
          const idx = Math.floor(Math.random() * (mainPoints.length - 4)) + 2;
          const branchStart = mainPoints[idx];
          const branchEndX = branchStart.x + (Math.random() - 0.5) * 200;
          const branchEndY = branchStart.y + Math.random() * 250 + 50;
          const branchPoints = createLightningPath(
            branchStart.x,
            branchStart.y,
            branchEndX,
            branchEndY,
            50
          );
          branches.push({ points: branchPoints, opacity: 0.8 });
        }
      }

      activeStrikes.push({
        points: mainPoints,
        opacity: 1,
        duration,
        maxDuration: duration,
        width: strikeWidth,
        branches,
      });

      // Set global flash opacity
      flashOpacity = Math.random() * 0.25 + 0.1;
    };

    // Animation Loop
    const draw = () => {
      // 1. Draw Background
      ctx.fillStyle = "#090909";
      ctx.fillRect(0, 0, width, height);

      // Ambient radial glow
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      grad.addColorStop(0, "rgba(47, 159, 87, 0.08)");
      grad.addColorStop(0.5, "rgba(22, 75, 41, 0.04)");
      grad.addColorStop(1, "rgba(9, 9, 9, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Additional localized ambient glows that move slowly
      const time = Date.now() * 0.0005;
      const glowX = width / 2 + Math.sin(time) * (width * 0.2);
      const glowY = height * 0.4 + Math.cos(time * 0.8) * (height * 0.1);
      const movingGrad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, width * 0.4);
      movingGrad.addColorStop(0, "rgba(61, 204, 110, 0.05)");
      movingGrad.addColorStop(1, "rgba(9, 9, 9, 0)");
      ctx.fillStyle = movingGrad;
      ctx.fillRect(0, 0, width, height);

      // Check if it's time to trigger a new strike
      if (Date.now() > nextStrikeTime) {
        triggerStrike();
        nextStrikeTime = Date.now() + Math.random() * 4000 + 2000; // 2-6s gap
      }

      // 2. Render global screen flashes from lightning
      if (flashOpacity > 0) {
        ctx.fillStyle = `rgba(61, 204, 110, ${flashOpacity})`;
        ctx.fillRect(0, 0, width, height);
        flashOpacity -= 0.015;
      }

      // 3. Render active strikes
      activeStrikes = activeStrikes.filter((strike) => {
        strike.duration--;

        if (strike.duration <= 0) return false;

        // Flicker effect: randomize opacity based on remaining duration
        const flicker = Math.random() > 0.3 ? 1 : 0.2;
        const currentOpacity = (strike.duration / strike.maxDuration) * flicker;

        ctx.save();
        ctx.shadowColor = "#3dcc6e";
        ctx.shadowBlur = 18;
        ctx.strokeStyle = `rgba(180, 255, 200, ${currentOpacity})`;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Draw main bolt
        ctx.lineWidth = strike.width;
        ctx.beginPath();
        if (strike.points.length > 0) {
          ctx.moveTo(strike.points[0].x, strike.points[0].y);
          for (let i = 1; i < strike.points.length; i++) {
            ctx.lineTo(strike.points[i].x, strike.points[i].y);
          }
        }
        ctx.stroke();

        // Draw branches
        ctx.lineWidth = strike.width * 0.6;
        ctx.strokeStyle = `rgba(61, 204, 110, ${currentOpacity * 0.8})`;
        strike.branches.forEach((branch) => {
          ctx.beginPath();
          if (branch.points.length > 0) {
            ctx.moveTo(branch.points[0].x, branch.points[0].y);
            for (let i = 1; i < branch.points.length; i++) {
              ctx.lineTo(branch.points[i].x, branch.points[i].y);
            }
          }
          ctx.stroke();
        });

        ctx.restore();
        return true;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
