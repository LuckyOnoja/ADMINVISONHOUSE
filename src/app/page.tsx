import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { MontraReplicaSections } from "@/components/landing/MontraReplicaSections";
import { ScrollExperience } from "@/components/landing/ScrollExperience";
import { HeroSection } from "@/components/landing/HeroSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <ScrollExperience />
      <LandingHeader />
      <HeroSection />
      <MontraReplicaSections />
      <LandingFooter />
    </main>
  );
}
