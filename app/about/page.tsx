import { AboutHeroSection } from "@/components/about/hero-section";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.about);

export default function AboutPage() {
  return <AboutHeroSection />;
}
