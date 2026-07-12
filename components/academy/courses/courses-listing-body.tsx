"use client";

import { ListingCardGrid } from "@/components/academy/listings/listing-card-grid";
import {
  ALL_LISTING_FILTER,
  ListingFilterBar,
} from "@/components/academy/listings/listing-filter-bar";
import type { CourseFilterLevel } from "@/content/courses";
import { coursesListing,courseToCardItem } from "@/content/courses";
import { useListingFilter } from "@/hooks/use-listing-filter";
import type { AcademyCourseDetail } from "@/types/academy";

type CoursesListingBodyProps = {
  courses: readonly AcademyCourseDetail[];
  filterLevels: readonly CourseFilterLevel[];
};

export function CoursesListingBody({
  courses,
  filterLevels,
}: CoursesListingBodyProps) {
  const { activeFilter, setActiveFilter, filtered, resetKey } =
    useListingFilter({
      items: courses,
      getFilterValue: (course) => courseToCardItem(course).filterLevel,
    });

  return (
    <section className="bg-white">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-10 sm:mb-12">
          <ListingFilterBar
            options={filterLevels}
            value={activeFilter}
            onChange={setActiveFilter}
            ariaLabel="Filter courses by level"
          />
        </div>

        <ListingCardGrid
          resetKey={resetKey}
          items={filtered.map(courseToCardItem)}
          emptyState={{
            ...coursesListing.filterEmptyState,
            onCtaClick: () => setActiveFilter(ALL_LISTING_FILTER),
          }}
        />
      </div>
    </section>
  );
}
