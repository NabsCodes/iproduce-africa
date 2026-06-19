import { BenefitsSection } from "@/components/shared/benefits-section";
import { communityPageContent } from "@/content/community";

export function WhyJoinSection() {
  return (
    <BenefitsSection
      content={communityPageContent.whyJoin}
      chipShape="square"
      headerLayout="stacked"
      interactive
    />
  );
}
