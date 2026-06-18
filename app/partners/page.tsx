import { PartnersHeroSection } from "@/components/partners/hero-section";
import { PartnerVoicesSection } from "@/components/partners/partner-voices-section";
import { PartnershipInquirySection } from "@/components/partners/partnership-inquiry-section";
import { PartnershipOpportunitiesSection } from "@/components/partners/partnership-opportunities-section";
import { WhyPartnerSection } from "@/components/partners/why-partner-section";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/shared/faq-section";
import { ImpactStatsSection } from "@/components/shared/impact-stats-section";
import { partnersPageContent } from "@/content/partners";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.partners);

export default function PartnersPage() {
  const impact = partnersPageContent.impact;

  return (
    <>
      <PartnersHeroSection />
      <WhyPartnerSection />
      <ImpactStatsSection
        eyebrow={impact.eyebrow}
        title={impact.title}
        description={impact.description}
        items={impact.items}
      />
      <PartnerVoicesSection />
      <PartnershipOpportunitiesSection />
      <PartnershipInquirySection />
      <FaqSection content={partnersPageContent.faqs} />
      <CtaSection overlapNext={false} />
    </>
  );
}
