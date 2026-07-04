import { client } from "@/lib/sanity/client";
import {
  courseBySlugQuery,
  coursesListingQuery,
  courseSlugsQuery,
  featuredCourseQuery,
  hubCoursesQuery,
  relatedCoursesQuery,
} from "@/lib/sanity/queries";
import type { AcademyCourseDetail } from "@/types/academy";

/**
 * Scaffolding for the fetch-layer slice — not imported by any route yet.
 * Return shapes are provisional; the real GROQ projection wiring happens
 * when Academy routes actually cut over to Sanity.
 */

export async function fetchCourseSlugs(): Promise<string[]> {
  return client.fetch(courseSlugsQuery);
}

export async function fetchCourseBySlug(
  slug: string,
): Promise<AcademyCourseDetail | null> {
  return client.fetch(courseBySlugQuery, { slug });
}

export async function fetchCoursesListing(): Promise<AcademyCourseDetail[]> {
  return client.fetch(coursesListingQuery);
}

export async function fetchFeaturedCourse(
  featuredSlug: string | null,
): Promise<AcademyCourseDetail | null> {
  return client.fetch(featuredCourseQuery, { featuredSlug });
}

export async function fetchHubCourses(
  limit: number,
): Promise<AcademyCourseDetail[]> {
  return client.fetch(hubCoursesQuery, { limit });
}

export async function fetchRelatedCourses(
  slug: string,
  limit = 3,
): Promise<AcademyCourseDetail[]> {
  return client.fetch(relatedCoursesQuery, { slug, limit });
}
