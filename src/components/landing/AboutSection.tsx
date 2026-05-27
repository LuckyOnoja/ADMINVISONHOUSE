import { Sparkle } from "lucide-react";
import { stats } from "./landing-data";

export function AboutSection() {
  return (
    <section id="about" className="story-section section-pad bg-[#0d0d0d]">
      <div className="mx-auto max-w-[1880px] px-6 md:px-10 lg:px-14">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_320px]">
          <div>
            <h2 className="story-title">
              CRAFTING STORIES
              <br />
              THROUGH
              <br />
              CINEMATIC FRAMES
            </h2>
          </div>
          <div className="story-seal" aria-hidden="true">
            <span>Admin Vision • Creative Studio • Booking House •</span>
            <Sparkle fill="currentColor" strokeWidth={3} />
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(260px,.52fr)_minmax(0,.68fr)_minmax(280px,.4fr)]">
          <div className="hidden lg:block" />
          <p className="story-copy">
            Admin Vision House is built on the belief that every visual idea
            deserves a room with power, intention, and precision. Whether it is
            a campaign, podcast, portrait session, or branded content, we craft
            spaces that help your story resonate.
          </p>
          <div className="story-stats">
            {stats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
