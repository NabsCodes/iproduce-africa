import { createPageMetadata } from "@/lib/metadata";
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
import { pageSeo } from "@/content/seo";

export const metadata = createPageMetadata(pageSeo.home);

export default function HomePage() {
  return (
    <>
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
    </>
  );
}
