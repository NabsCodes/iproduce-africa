import { CommunityHeroSection } from "@/components/community/hero-section";
import { MembershipApplicationSection } from "@/components/community/application-section";
import { CommunityPreviewSection } from "@/components/community/preview-section";
import { MemberBenefitsSection } from "@/components/community/member-benefits-section";
import { MemberStoriesSection } from "@/components/community/member-stories-section";
import { ThreeStepsSection } from "@/components/community/three-steps-section";
import { WhoShouldJoinSection } from "@/components/community/who-should-join-section";
import { WhyJoinSection } from "@/components/community/why-join-section";
import { CommunityApplyBanner } from "@/components/community/community-apply-banner";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/shared/faq-section";
import { communityPageContent } from "@/content/community";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.community);

export default function CommunityPage() {
  return (
    <>
      <CommunityHeroSection />
      <WhyJoinSection />
      <CommunityApplyBanner content={communityPageContent.applyBannerPrimary} />
      <ThreeStepsSection />
      <WhoShouldJoinSection />
      <MemberBenefitsSection />
      <CommunityApplyBanner
        content={communityPageContent.applyBannerSecondary}
      />
      <CommunityPreviewSection />
      <MemberStoriesSection />
      <MembershipApplicationSection />
      <FaqSection content={communityPageContent.faqs} />
      <CtaSection content={communityPageContent.cta} overlapNext={false} />
    </>
  );
}
