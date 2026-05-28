"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Hook for counting up numbers when they scroll into view.
 */
export function useCountUp(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = el.dataset.target || el.textContent || "0";
            const numericTarget = parseInt(target.replace(/\D/g, ""), 10);
            const suffix = target.replace(/[\d]/g, "");

            if (prefersReducedMotion || !numericTarget) {
              el.textContent = target;
              observer.unobserve(el);
              return;
            }

            let current = 0;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out quart for dramatic counting
              const eased = 1 - Math.pow(1 - progress, 4);
              current = Math.round(eased * numericTarget);
              el.textContent = current + suffix;

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    const timer = setTimeout(() => {
      const targets = ref.current?.querySelectorAll("[data-countup]");
      targets?.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [ref]);
}

/**
 * Magnetic button effect - button subtly follows cursor position
 */
export function useMagneticHover(ref: RefObject<HTMLElement | null>, strength = 0.3) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = "translate(0, 0)";
      el.style.transition = "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)";
      setTimeout(() => {
        if (el) el.style.transition = "";
      }, 400);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength]);
}

/**
 * Hook for triggering reveal classes when a section enters view.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const sectionRef = useRef<T>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealItems = Array.from(
      root.querySelectorAll<HTMLElement>(".sr, .sr-scale")
    );

    if (prefersReducedMotion) {
      revealItems.forEach((el) => el.classList.add("is-revealed"));
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
      {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    revealItems.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return sectionRef;
}
