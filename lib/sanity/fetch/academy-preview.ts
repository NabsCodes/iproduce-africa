import { client } from "@/lib/sanity/client";
import {
  hubCoursesQuery,
  hubScheduledWebinarsQuery,
} from "@/lib/sanity/queries";
import { articlesListingQuery } from "@/lib/sanity/queries";
import type { AcademyCourseDetail, AcademyWebinar } from "@/types/academy";
import type { BlogArticle } from "@/types/blog";

/**
 * Scaffolding for the fetch-layer slice — not imported by any route yet.
 * Returns the raw catalogue slices only; the category-collapse table,
 * date formatting, and `opportunities` composition stay code-owned in
 * content/academy.ts per docs/sanity-academy-spec.md and are applied at the
 * page boundary once this is actually wired.
 */
export async function fetchAcademyHomePreviewSlices(limit: number): Promise<{
  upcomingWebinars: AcademyWebinar[];
  courses: AcademyCourseDetail[];
  articles: BlogArticle[];
}> {
  const [upcomingWebinars, courses, articles] = await Promise.all([
    client.fetch(hubScheduledWebinarsQuery, { limit }) as Promise<
      AcademyWebinar[]
    >,
    client.fetch(hubCoursesQuery, { limit }) as Promise<AcademyCourseDetail[]>,
    client.fetch(articlesListingQuery) as Promise<BlogArticle[]>,
  ]);

  return { upcomingWebinars, courses, articles: articles.slice(0, limit) };
}
