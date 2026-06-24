"use client";

import { AcademySearchForm } from "@/components/academy/search/academy-search-form";

type AcademyHeroSearchFormProps = {
  placeholder: string;
  label: string;
};

export function AcademyHeroSearchForm({
  placeholder,
  label,
}: AcademyHeroSearchFormProps) {
  return (
    <div className="mt-8 w-full">
      <AcademySearchForm placeholder={placeholder} label={label} />
    </div>
  );
}
