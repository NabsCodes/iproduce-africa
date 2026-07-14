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
import { fetchHomePage } from "@/lib/sanity/fetch/home-page";
import { fetchPartners } from "@/lib/sanity/fetch/partners";
import { fetchSiteSettings } from "@/lib/sanity/fetch/site-settings";
import { fetchTestimonials } from "@/lib/sanity/fetch/testimonials";
import type { FaqSectionContent } from "@/types/content";

export const metadata = createPageMetadata(pageSeo.home);
// Promotion is time-driven, so this route must refresh without a CMS webhook.
export const revalidate = 300;

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
  const [
    homePage,
    siteSettings,
    { spotlight, blog },
    testimonials,
    faqs,
    { marquee: partners },
  ] = await Promise.all([
    fetchHomePage(),
    fetchSiteSettings(),
    fetchHomeAcademyPreview(),
    fetchTestimonials("home"),
    fetchFaqs("home"),
    fetchPartners(),
  ]);

  return (
    <>
      <HeroSection hero={homePage.hero} />
      {partners.length > 0 ? <PartnersSection partners={partners} /> : null}
      <WhatWeDoSection poster={homePage.whatWeDoPoster} />
      <CoreFocusSection valueChains={homePage.valueChains} />
      <WhyJoinUsSection services={homePage.services} />
      <TwoJourneysSection />
      <AcademySpotlightSection
        spotlight={spotlight}
        spotlightEmptyState={academyHomePreview.spotlightEmptyState}
      />
      {testimonials.length > 0 ? (
        <TestimonialsSection items={testimonials} />
      ) : null}
      <StayConnectedSection socialLinks={siteSettings.socialLinks} />
      {faqs.length > 0 ? (
        <FaqSection content={{ ...homeFaqsShell, items: faqs }} />
      ) : null}
      <FeaturedArticlesSection articles={blog} />
      <CtaSection overlapNext={false} />
    </>
  );
}
