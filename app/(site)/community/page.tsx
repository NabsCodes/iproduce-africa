import { MembershipApplicationSection } from "@/components/community/application-section";
import { CommunityApplyBanner } from "@/components/community/community-apply-banner";
import { CommunityHeroSection } from "@/components/community/hero-section";
import { MemberBenefitsSection } from "@/components/community/member-benefits-section";
import { MemberStoriesSection } from "@/components/community/member-stories-section";
import { CommunityPreviewSection } from "@/components/community/preview-section";
import { ThreeStepsSection } from "@/components/community/three-steps-section";
import { WhoShouldJoinSection } from "@/components/community/who-should-join-section";
import { WhyJoinSection } from "@/components/community/why-join-section";
import { CtaSection } from "@/components/shared/cta-section";
import { FaqSection } from "@/components/shared/faq-section";
import { communityPageContent } from "@/content/community";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import { fetchFaqs } from "@/lib/sanity/fetch/faqs";
import { fetchMemberStories } from "@/lib/sanity/fetch/member-stories";
import { fetchSiteSettings } from "@/lib/sanity/fetch/site-settings";

export const metadata = createPageMetadata(pageSeo.community);
export const revalidate = 3600;

export default async function CommunityPage() {
  const [faqs, memberStories, settings] = await Promise.all([
    fetchFaqs("community"),
    fetchMemberStories(),
    fetchSiteSettings(),
  ]);

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
      <CommunityPreviewSection channels={settings.communityChannels} />
      {memberStories.length > 0 ? (
        <MemberStoriesSection items={memberStories} />
      ) : null}
      <MembershipApplicationSection />
      {faqs.length > 0 ? (
        <FaqSection content={{ ...communityPageContent.faqs, items: faqs }} />
      ) : null}
      <CtaSection content={communityPageContent.cta} overlapNext={false} />
    </>
  );
}
