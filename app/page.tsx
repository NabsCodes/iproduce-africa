import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AboutSection } from "@/components/home/about-section";
import { CtaSection } from "@/components/home/cta-section";
import { EcosystemSection } from "@/components/home/ecosystem-section";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { IdeasSection } from "@/components/home/ideas-section";
import { NewsSection } from "@/components/home/news-section";
import { PartnersSection } from "@/components/home/partners-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ValueChainsSection } from "@/components/home/value-chains-section";

export default function HomePage() {
  return (
    <>
      <Header activePath="/" />
      <main>
        <HeroSection />
        <AboutSection />
        <EcosystemSection />
        <ValueChainsSection />
        <IdeasSection />
        <TestimonialsSection />
        <FaqSection />
        <NewsSection />
        <CtaSection />
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}
