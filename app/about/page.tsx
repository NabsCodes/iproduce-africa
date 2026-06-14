import { PageHero } from "@/components/layout/page-hero";
import { aboutPageContent } from "@/content/about";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.about);

export default function AboutPage() {
  return <PageHero {...aboutPageContent.hero} />;
}
