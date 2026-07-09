import { AcademyListingHeroSection } from "@/components/academy/listings/listing-hero-section";
import { FeaturedCourseSection } from "@/components/academy/courses/featured-course-section";
import { CoursesListingBody } from "@/components/academy/courses/courses-listing-body";
import { CtaSection } from "@/components/shared/cta-section";
import { coursesContent, coursesListing } from "@/content/courses";
import { pageSeo } from "@/content/seo";
import {
  fetchCoursesListing,
  fetchFeaturedCourse,
} from "@/lib/sanity/fetch/courses";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(pageSeo.courses);
export const revalidate = 3600;

export default async function CoursesIndexPage() {
  const [courses, featured] = await Promise.all([
    fetchCoursesListing(),
    fetchFeaturedCourse(coursesListing.featuredSlug),
  ]);

  return (
    <>
      <AcademyListingHeroSection content={coursesListing.hero} />
      {featured ? <FeaturedCourseSection course={featured} /> : null}
      <CoursesListingBody
        courses={courses}
        filterLevels={coursesListing.filterLevels}
      />
      <CtaSection overlapNext={false} content={coursesContent.cta} />
    </>
  );
}
