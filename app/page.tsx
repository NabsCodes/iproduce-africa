import { AcademySpotlightSection } from "@/components/home/academy-spotlight-section";
import { CoreFocusSection } from "@/components/home/core-focus-section";
import { FeaturedArticlesSection } from "@/components/home/featured-articles-section";
import { HeroSection } from "@/components/home/hero-section";
import { StayConnectedSection } from "@/components/home/stay-connected-section";
import { TwoJourneysSection } from "@/components/home/two-journeys-section";
import { WhatWeDoSection } from "@/components/home/what-we-do-section";
import { WhyJoinUsSection } from "@/components/home/why-join-us-section";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/shared/faq-section";
import { PartnersSection } from "@/components/shared/partners-section";
import { TestimonialsSection } from "@/components/shared/testimonials-section";
import { academyHomePreview } from "@/content/academy";
import { homeContent } from "@/content/home";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import { fetchHomeAcademyPreview } from "@/lib/sanity/fetch/academy-preview";
import { fetchFaqs } from "@/lib/sanity/fetch/faqs";
import { fetchPartners } from "@/lib/sanity/fetch/partners";
import { fetchTestimonials } from "@/lib/sanity/fetch/testimonials";
import type { FaqSectionContent } from "@/types/content";

export const metadata = createPageMetadata(pageSeo.home);
export const revalidate = 3600;

// Home's own FAQ shell copy — mirrors the same eyebrow/description already
// duplicated in content/contact.ts's faqs (both intentionally reuse this
// wording; only `items` differs per surface once CMS-fed).
const homeFaqsShell: Pick<
  FaqSectionContent,
  "eyebrow" | "description" | "categories"
> = {
  eyebrow: "Frequently asked questions",
  description:
    "Everything about the platform, membership and partnerships — answered plainly.",
  categories: homeContent.faqCategories,
};

export default async function HomePage() {
  const [{ spotlight, blog }, testimonials, faqs, { marquee: partners }] =
    await Promise.all([
      fetchHomeAcademyPreview(),
      fetchTestimonials("home"),
      fetchFaqs("home"),
      fetchPartners(),
    ]);

  return (
    <>
      <HeroSection />
      {partners.length > 0 ? <PartnersSection partners={partners} /> : null}
      <WhatWeDoSection />
      <CoreFocusSection />
      <WhyJoinUsSection />
      <TwoJourneysSection />
      <AcademySpotlightSection
        spotlight={spotlight}
        spotlightEmptyState={academyHomePreview.spotlightEmptyState}
      />
      {testimonials.length > 0 ? (
        <TestimonialsSection items={testimonials} />
      ) : null}
      <StayConnectedSection />
      {faqs.length > 0 ? (
        <FaqSection content={{ ...homeFaqsShell, items: faqs }} />
      ) : null}
      <FeaturedArticlesSection articles={blog} />
      <CtaSection overlapNext={false} />
    </>
  );
}
