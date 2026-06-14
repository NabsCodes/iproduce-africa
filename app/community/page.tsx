import { PageHero } from "@/components/layout/page-hero";
import { communityPageContent } from "@/content/community";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.community);

export default function CommunityPage() {
  return <PageHero {...communityPageContent.hero} />;
}
