import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import { fetchLegalPage } from "@/lib/sanity/fetch/legal-pages";

export const metadata = createPageMetadata(pageSeo.accessibility);
export const revalidate = 3600;

export default async function AccessibilityPage() {
  const content = await fetchLegalPage("accessibility");
  const { lastUpdated, ...pageContent } = content;
  return <LegalPageLayout content={pageContent} lastUpdated={lastUpdated} />;
}
