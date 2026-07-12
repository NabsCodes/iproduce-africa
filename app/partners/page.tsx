import { BenefitsSection } from "@/components/partners/benefits-section";
import { PartnersHeroSection } from "@/components/partners/hero-section";
import { InquirySection } from "@/components/partners/inquiry-section";
import { OpportunitiesSection } from "@/components/partners/opportunities-section";
import { PartnerSpotlightSection } from "@/components/partners/partner-spotlight-section";
import { VoicesSection } from "@/components/partners/voices-section";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/shared/faq-section";
// import { ImpactStatsSection } from "@/components/shared/impact-stats-section";
import { partnersPageContent } from "@/content/partners";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import { fetchFaqs } from "@/lib/sanity/fetch/faqs";
import { fetchTestimonials } from "@/lib/sanity/fetch/testimonials";

export const metadata = createPageMetadata(pageSeo.partners);
export const revalidate = 3600;

export default async function PartnersPage() {
  // const impact = partnersPageContent.impact;
  const [voices, faqs] = await Promise.all([
    fetchTestimonials("partners-voices"),
    fetchFaqs("partners"),
  ]);

  return (
    <>
      <PartnersHeroSection />
      <PartnerSpotlightSection />
      <BenefitsSection />
      {/* Client said take the impact stats section out for now. I will add it back in later.*/}
      {/* <ImpactStatsSection
        eyebrow={impact.eyebrow}
        title={impact.title}
        description={impact.description}
        items={impact.items}
      /> */}
      <OpportunitiesSection />
      {voices.length > 0 ? <VoicesSection voices={voices} /> : null}
      <InquirySection />
      {faqs.length > 0 ? (
        <FaqSection content={{ ...partnersPageContent.faqs, items: faqs }} />
      ) : null}
      <CtaSection content={partnersPageContent.cta} overlapNext={false} />
    </>
  );
}
