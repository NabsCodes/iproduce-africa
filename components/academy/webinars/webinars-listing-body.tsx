"use client";

import { ListingCardGrid } from "@/components/academy/listings/listing-card-grid";
import {
  ALL_LISTING_FILTER,
  ListingFilterBar,
} from "@/components/academy/listings/listing-filter-bar";
import type { WebinarFilterType } from "@/content/webinars";
import { webinarsListing,webinarToCardItem } from "@/content/webinars";
import { useListingFilter } from "@/hooks/use-listing-filter";
import type { AcademyWebinar } from "@/types/academy";

type WebinarsListingBodyProps = {
  webinars: readonly AcademyWebinar[];
  filterTypes: readonly WebinarFilterType[];
};

export function WebinarsListingBody({
  webinars,
  filterTypes,
}: WebinarsListingBodyProps) {
  const { activeFilter, setActiveFilter, filtered, resetKey } =
    useListingFilter({
      items: webinars,
      getFilterValue: (webinar) => webinarToCardItem(webinar).filterType,
      sort: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    });

  return (
    <section className="bg-white">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mb-10 sm:mb-12">
          <ListingFilterBar
            options={filterTypes}
            value={activeFilter}
            onChange={setActiveFilter}
            ariaLabel="Filter webinars and events by type"
          />
        </div>

        <ListingCardGrid
          resetKey={resetKey}
          items={filtered.map(webinarToCardItem)}
          emptyState={{
            ...webinarsListing.filterEmptyState,
            onCtaClick: () => setActiveFilter(ALL_LISTING_FILTER),
          }}
        />
      </div>
    </section>
  );
}
