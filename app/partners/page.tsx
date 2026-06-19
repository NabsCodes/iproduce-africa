import { PartnersHeroSection } from "@/components/partners/hero-section";
import { VoicesSection } from "@/components/partners/voices-section";
import { InquirySection } from "@/components/partners/inquiry-section";
import { OpportunitiesSection } from "@/components/partners/opportunities-section";
import { BenefitsSection } from "@/components/partners/benefits-section";
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
      <BenefitsSection />
      <ImpactStatsSection
        eyebrow={impact.eyebrow}
        title={impact.title}
        description={impact.description}
        items={impact.items}
      />
      <VoicesSection />
      <OpportunitiesSection />
      <InquirySection />
      <FaqSection content={partnersPageContent.faqs} />
      <CtaSection content={partnersPageContent.cta} overlapNext={false} />
    </>
  );
}
