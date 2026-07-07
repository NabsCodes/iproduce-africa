import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { legalContent } from "@/content/legal";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.privacy);

export default function PrivacyPage() {
  return <LegalPageLayout content={legalContent.privacy} />;
}
