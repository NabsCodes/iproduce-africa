import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import { fetchLegalPage } from "@/lib/sanity/fetch/legal-pages";

export const metadata = createPageMetadata(pageSeo.privacy);
export const revalidate = 3600;

export default async function PrivacyPage() {
  const content = await fetchLegalPage("privacy");
  const { lastUpdated, ...pageContent } = content;
  return <LegalPageLayout content={pageContent} lastUpdated={lastUpdated} />;
}
