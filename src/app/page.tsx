import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { PartnersSection } from "@/components/landing/partners-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <main>
        <HeroSection />
        <PartnersSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
