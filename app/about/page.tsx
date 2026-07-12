import { AdvisorsSection } from "@/components/about/advisors-section";
import { AboutHeroSection } from "@/components/about/hero-section";
// import { ImpactStatsSection } from "@/components/shared/impact-stats-section";
import { JourneySection } from "@/components/about/journey-section";
import { MvoSection } from "@/components/about/mvo-section";
import { StorySection } from "@/components/about/story-section";
import { TeamSection } from "@/components/about/team-section";
import { CtaSection } from "@/components/shared/cta-section";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import { fetchTeamMembers } from "@/lib/sanity/fetch/team-members";

export const metadata = createPageMetadata(pageSeo.about);
export const revalidate = 3600;

export default async function AboutPage() {
  const { team, advisors } = await fetchTeamMembers();

  return (
    <>
      <AboutHeroSection />
      <StorySection />
      <MvoSection />
      {/* Client said take the impact stats section out for now. I will add it back in later.*/}
      {/* <ImpactStatsSection /> */}
      <JourneySection />
      {team.length > 0 ? <TeamSection members={team} /> : null}
      {advisors.length > 0 ? <AdvisorsSection members={advisors} /> : null}
      <CtaSection overlapNext={false} />
    </>
  );
}
