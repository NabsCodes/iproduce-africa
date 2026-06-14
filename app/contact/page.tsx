import { PageHero } from "@/components/layout/page-hero";
import { contactPageContent } from "@/content/contact";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.contact);

export default function ContactPage() {
  return <PageHero {...contactPageContent.hero} />;
}
