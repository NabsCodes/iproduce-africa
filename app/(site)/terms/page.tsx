import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import { fetchLegalPage } from "@/lib/sanity/fetch/legal-pages";

export const metadata = createPageMetadata(pageSeo.terms);
export const revalidate = 3600;

export default async function TermsPage() {
  const content = await fetchLegalPage("terms");
  const { lastUpdated, ...pageContent } = content;
  return <LegalPageLayout content={pageContent} lastUpdated={lastUpdated} />;
}
