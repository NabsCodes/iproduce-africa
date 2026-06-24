import { AcademyTrackHeroSection } from "@/components/academy/track-hero-section";
import { TrackCardGrid } from "@/components/academy/track-card-grid";
import { CtaSection } from "@/components/shared/cta-section";
import { coursesContent, coursesListing } from "@/content/courses";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.courses);

export default function CoursesIndexPage() {
  return (
    <>
      <AcademyTrackHeroSection content={coursesListing.hero} />
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <TrackCardGrid items={coursesListing.items} />
        </div>
      </section>
      <CtaSection overlapNext={false} content={coursesContent.cta} />
    </>
  );
}
