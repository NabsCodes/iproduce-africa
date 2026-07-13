import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import { fetchLegalPage } from "@/lib/sanity/fetch/legal-pages";

export const metadata = createPageMetadata(pageSeo.cookies);
export const revalidate = 3600;

export default async function CookiesPage() {
  const content = await fetchLegalPage("cookies");
  const { lastUpdated, ...pageContent } = content;
  return <LegalPageLayout content={pageContent} lastUpdated={lastUpdated} />;
}
