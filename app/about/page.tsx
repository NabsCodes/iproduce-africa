import { AdvisorsSection } from "@/components/about/advisors-section";
import { AboutHeroSection } from "@/components/about/hero-section";
import { ImpactStatsSection } from "@/components/about/impact-stats-section";
import { JourneySection } from "@/components/about/journey-section";
import { MvoSection } from "@/components/about/mvo-section";
import { StorySection } from "@/components/about/story-section";
import { TeamSection } from "@/components/about/team-section";
import { CtaSection } from "@/components/shared/cta-section";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.about);

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <StorySection />
      <MvoSection />
      <ImpactStatsSection />
      <JourneySection />
      <TeamSection />
      <AdvisorsSection />
      <CtaSection overlapNext={false} />
    </>
  );
}
