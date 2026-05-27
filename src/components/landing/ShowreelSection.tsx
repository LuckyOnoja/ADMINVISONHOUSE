import { Play } from "lucide-react";

export function ShowreelSection() {
  return (
    <section id="showreel" className="section-pad bg-[#151515]">
      <div className="mx-auto grid max-w-[1880px] items-center gap-12 px-6 md:px-10 lg:grid-cols-[1fr_.62fr] lg:px-14">
        <div>
          <p className="eyebrow">Showreel</p>
          <h2 className="section-title">CREATIVE ROOMS BUILT FOR IMPACT</h2>
        </div>
        <div className="showreel-box">
          <button aria-label="Play showreel" className="showreel-play">
            <Play fill="currentColor" />
          </button>
          <p>Production reel placeholder</p>
        </div>
      </div>
    </section>
  );
}
