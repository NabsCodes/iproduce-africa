"use client";

import {
  ALL_LISTING_FILTER,
  ListingFilterBar,
} from "@/components/academy/listings/listing-filter-bar";

export const ALL_CATEGORIES = ALL_LISTING_FILTER;

type CategoryFilterBarProps = {
  categories: readonly string[];
  value: string;
  onChange: (next: string) => void;
};

export function CategoryFilterBar({
  categories,
  value,
  onChange,
}: CategoryFilterBarProps) {
  return (
    <ListingFilterBar
      options={categories}
      value={value}
      onChange={onChange}
      ariaLabel="Filter articles by category"
    />
  );
}
