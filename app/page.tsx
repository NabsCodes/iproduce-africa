import { createPageMetadata } from "@/lib/metadata";
import { AcademySpotlightSection } from "@/components/home/academy-spotlight-section";
import { CtaSection } from "@/components/shared/cta-section";
import { CoreFocusSection } from "@/components/home/core-focus-section";
import { FaqSection } from "@/components/shared/faq-section";
import { FeaturedArticlesSection } from "@/components/home/featured-articles-section";
import { HeroSection } from "@/components/home/hero-section";
import { StayConnectedSection } from "@/components/home/stay-connected-section";
import { PartnersSection } from "@/components/shared/partners-section";
import { TestimonialsSection } from "@/components/shared/testimonials-section";
import { TwoJourneysSection } from "@/components/home/two-journeys-section";
import { WhatWeDoSection } from "@/components/home/what-we-do-section";
import { pageSeo } from "@/content/seo";

export const metadata = createPageMetadata(pageSeo.home);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <WhatWeDoSection />
      <TwoJourneysSection />
      <CoreFocusSection />
      <AcademySpotlightSection />
      <TestimonialsSection />
      <StayConnectedSection />
      <FaqSection />
      <FeaturedArticlesSection />
      <CtaSection overlapNext={false} />
    </>
  );
}
