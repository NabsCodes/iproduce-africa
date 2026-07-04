import { BenefitsSection } from "@/components/shared/benefits-section";
import { communityPageContent } from "@/content/community";

export function MemberBenefitsSection() {
  return (
    <BenefitsSection
      sectionId="member-benefits"
      content={communityPageContent.memberBenefits}
      chipShape="round"
      headerLayout="stacked"
      interactive
      className="scroll-mt-24"
    />
  );
}
