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
import { WhyJoinUsSection } from "@/components/home/why-join-us-section";
import { WhatWeDoSection } from "@/components/home/what-we-do-section";
import { academyHomePreview } from "@/content/academy";
import { pageSeo } from "@/content/seo";
import { fetchHomeAcademyPreview } from "@/lib/sanity/fetch/academy-preview";

export const metadata = createPageMetadata(pageSeo.home);
export const revalidate = 3600;

export default async function HomePage() {
  const { spotlight, blog } = await fetchHomeAcademyPreview();

  return (
    <>
      <HeroSection />
      <PartnersSection />
      <WhatWeDoSection />
      <CoreFocusSection />
      <WhyJoinUsSection />
      <TwoJourneysSection />
      <AcademySpotlightSection
        spotlight={spotlight}
        spotlightEmptyState={academyHomePreview.spotlightEmptyState}
      />
      <TestimonialsSection />
      <StayConnectedSection />
      <FaqSection />
      <FeaturedArticlesSection articles={blog} />
      <CtaSection overlapNext={false} />
    </>
  );
}
