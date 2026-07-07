import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { legalContent } from "@/content/legal";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.terms);

export default function TermsPage() {
  return <LegalPageLayout content={legalContent.terms} />;
}
