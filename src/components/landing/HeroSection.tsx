import Link from "next/link";
import { Film, Sparkle } from "lucide-react";
import { heroAvatars } from "./landing-data";

export function HeroSection() {
  return (
    <section className="desart-hero relative min-h-screen overflow-hidden px-6 pt-28 md:px-10 lg:px-14">
      <video
        className="hero-bg-video"
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="hero-video-overlay" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-[1880px] flex-col justify-end pb-12 pt-28">
        <div className="flex w-full">
          <div className="w-[70%]">
            <h1 className="montra-hero-title">
              STR<span className="accent-block">O</span>NG
              <br />
              CRAFTING VISUALS
            </h1>
          </div>

          <aside className="flex flex-col items-start justify-end w-[30%]">
            <div className=" flex ">
              {heroAvatars.map((src) => (
                <span
                  key={src}
                  className="hero-avatar"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
              <span className="hero-avatar-spark">
                <Sparkle fill="white" strokeWidth={3} />
              </span>
            </div>
            <p className="text-md font-medium">
              Admin Vision House is a full-service creative production studio
              delivering bold visuals and powerful narratives. From content
              campaigns to creative films, we bring your vision to life.
            </p>
          </aside>
        </div>

        <div className="hero-bottom-row">
          <Link href="#showreel" className="watch-button">
            Watch Our Showreel <Film size={23} />
          </Link>

          <div className="hero-social-buttons" aria-label="Social links">
            <a href="#" aria-label="Instagram">
              IG
            </a>
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="X">
              X
            </a>
            <a href="#" aria-label="YouTube">
              ▶
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
