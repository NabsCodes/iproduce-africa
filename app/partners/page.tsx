import { PageHero } from "@/components/layout/page-hero";
import { partnersPageContent } from "@/content/partners";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.partners);

export default function PartnersPage() {
  return <PageHero {...partnersPageContent.hero} />;
}
