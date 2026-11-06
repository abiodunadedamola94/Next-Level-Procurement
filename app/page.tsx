import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WhoWeAreSection />
      <ServicesSection />
      <CTASection />
    </>
  );
}
