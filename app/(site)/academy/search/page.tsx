import type { Metadata } from "next";

import { AcademySearchResults } from "@/components/academy/search/academy-search-results";
import { academyContent } from "@/content/academy";
import { createPageMetadata } from "@/lib/metadata";

const baseMetadata = createPageMetadata({
  title: "Search the Academy",
  description:
    "Search webinars, courses, and articles across the iProduce Africa Academy.",
  path: "/academy/search",
});

type AcademySearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...baseMetadata,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function AcademySearchPage({
  searchParams,
}: AcademySearchPageProps) {
  const { q = "" } = await searchParams;

  return (
    <section className="bg-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <AcademySearchResults
          query={q}
          searchPlaceholder={academyContent.hero.searchPlaceholder}
          searchLabel={academyContent.hero.searchLabel}
        />
      </div>
    </section>
  );
}
