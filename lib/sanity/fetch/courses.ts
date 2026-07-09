import type { Image } from "sanity";
import { courseToRelatedItem } from "@/content/courses";
import { sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import {
  courseBySlugQuery,
  coursesListingQuery,
  courseSlugsQuery,
  featuredCourseQuery,
  hubCoursesQuery,
  relatedCoursesQuery,
} from "@/lib/sanity/queries";
import type {
  AcademyCourse,
  AcademyCourseDetail,
  AcademyCourseLevel,
  AcademyRegistrationConfig,
  AcademyRelatedItem,
} from "@/types/academy";

type RawCourseDoc = {
  slug: string;
  title: string;
  level: AcademyCourseLevel;
  duration: string;
  description: string;
  excerpt: string;
  image: Image | null;
  body: string[];
  modules: string[];
  registration?: AcademyRegistrationConfig | null;
};

function normalizeCourse(raw: RawCourseDoc): AcademyCourseDetail {
  return {
    slug: raw.slug,
    title: raw.title,
    level: raw.level,
    duration: raw.duration,
    description: raw.description,
    image: resolveImageUrl(raw.image) ?? "",
    excerpt: raw.excerpt,
    body: raw.body,
    modules: raw.modules,
    registration: raw.registration ?? undefined,
  };
}

export async function fetchCourseSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(courseSlugsQuery);
}

export async function fetchCourseBySlug(
  slug: string,
): Promise<AcademyCourseDetail | null> {
  const raw = await sanityFetch<RawCourseDoc | null>(courseBySlugQuery, {
    slug,
  });
  return raw ? normalizeCourse(raw) : null;
}

export async function fetchCoursesListing(): Promise<AcademyCourseDetail[]> {
  const raw = await sanityFetch<RawCourseDoc[]>(coursesListingQuery);
  return raw.map(normalizeCourse);
}

export async function fetchFeaturedCourse(
  featuredSlug: string | null,
): Promise<AcademyCourseDetail | null> {
  const raw = await sanityFetch<RawCourseDoc | null>(featuredCourseQuery, {
    featuredSlug,
  });
  return raw ? normalizeCourse(raw) : null;
}

/**
 * Not wired into any route yet — scaffolding for the `/academy` hub
 * checkpoint. Returns the reduced `AcademyCourse` shape (no
 * excerpt/body/modules/registration) to match how the hub band actually
 * uses it — mirrors `content/courses.ts`'s `academyHubCourses` projection.
 */
export async function fetchHubCourses(limit: number): Promise<AcademyCourse[]> {
  const raw = await sanityFetch<RawCourseDoc[]>(hubCoursesQuery, { limit });
  return raw.map(({ slug, title, level, duration, description, image }) => ({
    slug,
    title,
    level,
    duration,
    description,
    image: resolveImageUrl(image) ?? "",
  }));
}

export async function fetchRelatedCourses(
  slug: string,
  limit = 3,
): Promise<AcademyRelatedItem[]> {
  const raw = await sanityFetch<RawCourseDoc[]>(relatedCoursesQuery, {
    slug,
    limit,
  });
  return raw.map(normalizeCourse).map(courseToRelatedItem);
}
