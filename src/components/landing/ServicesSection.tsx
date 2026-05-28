"use client";

import { landingImages, services } from "./landing-data";
import { useScrollReveal } from "./useScrollReveal";

export function ServicesSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="services"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="services-mosaic bg-[#050505] px-6 md:px-10 lg:px-12"
      style={{ paddingBottom: "var(--section-pad)" }}
    >
      {/* Section header */}
      <div className="mx-auto max-w-[1440px] mb-10 pt-2">
        <p className="eyebrow sr">What We Do</p>
        <h2 className="section-title sr sr-delay-1">OUR SERVICES</h2>
      </div>

      {/* Content grid */}
      <div className="mx-auto grid max-w-[1440px] gap-3 lg:grid-cols-[minmax(280px,.55fr)_minmax(0,1fr)]">
        <div
          className="services-person sr-scale"
          style={{ backgroundImage: `url(${landingImages.director})` }}
        />

        <div className="services-card-grid">
          {services.slice(0, 4).map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className={`mosaic-service-card sr sr-delay-${index + 1} ${
                  index === 2 ? "active" : ""
                }`}
              >
                <Icon size={48} strokeWidth={1.5} />
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
