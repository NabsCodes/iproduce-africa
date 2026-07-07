import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { legalContent } from "@/content/legal";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.cookies);

export default function CookiesPage() {
  return <LegalPageLayout content={legalContent.cookies} />;
}
