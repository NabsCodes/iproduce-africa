import { AcademyTrackHeroSection } from "@/components/academy/track-hero-section";
import { TrackCardGrid } from "@/components/academy/track-card-grid";
import { CtaSection } from "@/components/shared/cta-section";
import { webinarsContent, webinarsListing } from "@/content/webinars";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.webinars);

export default function WebinarsIndexPage() {
  return (
    <>
      <AcademyTrackHeroSection content={webinarsListing.hero} />
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <TrackCardGrid items={webinarsListing.items} />
        </div>
      </section>
      <CtaSection overlapNext={false} content={webinarsContent.cta} />
    </>
  );
}
