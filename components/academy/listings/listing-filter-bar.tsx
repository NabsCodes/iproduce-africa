"use client";

import { Button } from "@/components/ui/button";

export const ALL_LISTING_FILTER = "All" as const;

type ListingFilterBarProps = {
  options: readonly string[];
  value: string;
  onChange: (next: string) => void;
  ariaLabel: string;
};

export function ListingFilterBar({
  options,
  value,
  onChange,
  ariaLabel,
}: ListingFilterBarProps) {
  const filters = [ALL_LISTING_FILTER, ...options];

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="-mx-4 flex w-full scrollbar-none flex-nowrap items-center gap-2 overflow-x-auto px-4 [-ms-overflow-style:none] sm:mx-0 sm:flex-wrap sm:gap-2.5 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {filters.map((option) => {
        const isActive = option === value;

        return (
          <Button
            key={option}
            type="button"
            variant={isActive ? "green" : "ghost"}
            size="xs"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className="rounded-full"
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
}
