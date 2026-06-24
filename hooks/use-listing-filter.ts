import { useState } from "react";

import { ALL_LISTING_FILTER } from "@/components/academy/listings/listing-filter-bar";

type UseListingFilterOptions<T> = {
  items: readonly T[];
  getFilterValue: (item: T) => string | undefined;
  sort?: (a: T, b: T) => number;
  allValue?: string;
};

export function useListingFilter<T>({
  items,
  getFilterValue,
  sort,
  allValue = ALL_LISTING_FILTER,
}: UseListingFilterOptions<T>) {
  const [activeFilter, setActiveFilter] = useState(allValue);

  const sorted = sort ? [...items].sort(sort) : [...items];
  const filtered =
    activeFilter === allValue
      ? sorted
      : sorted.filter((item) => getFilterValue(item) === activeFilter);

  return {
    activeFilter,
    setActiveFilter,
    filtered,
    resetKey: activeFilter,
  };
}
