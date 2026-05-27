import { AboutSection } from "@/components/landing/AboutSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { PortfolioSection } from "@/components/landing/PortfolioSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { ShowreelSection } from "@/components/landing/ShowreelSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <LandingHeader />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ShowreelSection />
      <CtaSection />
      <LandingFooter />
    </main>
  );
}
