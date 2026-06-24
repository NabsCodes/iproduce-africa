import { AcademyListingHeroSection } from "@/components/academy/listings/listing-hero-section";
import { FeaturedCourseSection } from "@/components/academy/courses/featured-course-section";
import { CoursesListingBody } from "@/components/academy/courses/courses-listing-body";
import { CtaSection } from "@/components/shared/cta-section";
import { coursesContent, coursesListing, getCourse } from "@/content/courses";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.courses);

export default function CoursesIndexPage() {
  const featured = getCourse(coursesListing.featuredSlug);

  return (
    <>
      <AcademyListingHeroSection content={coursesListing.hero} />
      {featured ? <FeaturedCourseSection course={featured} /> : null}
      <CoursesListingBody
        courses={coursesContent.courses}
        filterLevels={coursesListing.filterLevels}
      />
      <CtaSection overlapNext={false} content={coursesContent.cta} />
    </>
  );
}
