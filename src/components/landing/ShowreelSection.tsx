"use client";

import { Play } from "lucide-react";
import { useScrollReveal } from "./useScrollReveal";

export function ShowreelSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="showreel"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="bg-[#050505]"
      style={{ padding: `var(--section-pad) 0` }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_.65fr]">
          <div>
            <p className="eyebrow sr">Showreel</p>
            <h2 className="section-title sr sr-delay-1">
              CREATIVE ROOMS BUILT FOR IMPACT
            </h2>
          </div>
          <div className="showreel-box sr-scale sr-delay-2">
            <button aria-label="Play showreel" className="showreel-play">
              <Play fill="currentColor" size={28} />
            </button>
            <p>Watch Our Reel</p>
          </div>
        </div>
      </div>
    </section>
  );
}
