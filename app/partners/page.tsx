import { PartnerSection } from "@/components/partners/partner-section";
import { PartnersHeroSection } from "@/components/partners/hero-section";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.partners);

export default function PartnersPage() {
  return (
    <>
      <PartnersHeroSection />
      <PartnerSection />
    </>
  );
}
