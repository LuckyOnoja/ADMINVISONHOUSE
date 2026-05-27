import { landingImages, services } from "./landing-data";

export function ServicesSection() {
  return (
    <section id="services" className="services-mosaic bg-[#0d0d0d] px-6 pb-24 md:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1880px] gap-8 lg:grid-cols-[minmax(320px,.7fr)_minmax(0,1fr)]">
        <div
          className="services-person"
          style={{ backgroundImage: `url(${landingImages.director})` }}
        />

        <div className="services-card-grid">
          {services.slice(0, 4).map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className={
                  index === 2
                    ? "mosaic-service-card active"
                    : "mosaic-service-card"
                }
              >
                <Icon size={68} strokeWidth={1.8} />
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
