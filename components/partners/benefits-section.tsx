import { BenefitsSection as SharedBenefitsSection } from "@/components/shared/benefits-section";
import { partnersPageContent } from "@/content/partners";

export function BenefitsSection() {
  return (
    <SharedBenefitsSection
      content={partnersPageContent.whyPartner}
      chipShape="square"
      headerLayout="split"
      interactive
    />
  );
}
