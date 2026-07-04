/**
 * Shared GROQ fragments + the named query catalog from
 * docs/sanity-academy-spec.md. Not imported by any route yet — scaffolding
 * for the fetch-layer slice. Plain strings (no `groq` template tag) since
 * the tag only affects editor tooling, not query behavior.
 */

/** Every public query must exclude drafts. */
export const DRAFT_FILTER = `!(_id in path("drafts.**"))`;

/** Single coalesce query per catalogue — featured pointer, else newest. Never chain two fetches. */
export function featuredQuery(type: string, orderField: string) {
  return `coalesce(
    *[_type == "${type}" && slug.current == $featuredSlug && ${DRAFT_FILTER}][0],
    *[_type == "${type}" && ${DRAFT_FILTER}] | order(${orderField} desc)[0]
  )`;
}

// ─── Articles ────────────────────────────────────────────────────────────

export const articleSlugsQuery = `*[_type == "academyArticle" && ${DRAFT_FILTER}].slug.current`;

export const articleBySlugQuery = `*[_type == "academyArticle" && slug.current == $slug && ${DRAFT_FILTER}][0]{
  ...,
  author->{name, role, "photo": photo.asset->url}
}`;

export const articlesListingQuery = `*[_type == "academyArticle" && ${DRAFT_FILTER}] | order(publishedAt desc){
  ...,
  author->{name, role}
}`;

export const featuredArticleQuery = featuredQuery(
  "academyArticle",
  "publishedAt",
);

export const relatedArticlesQuery = `*[
  _type == "academyArticle" && slug.current != $slug && ${DRAFT_FILTER}
] | order(publishedAt desc)`;

export const articleSearchProjection = `{title, excerpt, category, "slug": slug.current}`;

// ─── Webinars ────────────────────────────────────────────────────────────

export const webinarSlugsQuery = `*[_type == "academyWebinar" && ${DRAFT_FILTER}].slug.current`;

export const webinarBySlugQuery = `*[_type == "academyWebinar" && slug.current == $slug && ${DRAFT_FILTER}][0]`;

export const webinarsListingQuery = `*[_type == "academyWebinar" && ${DRAFT_FILTER}] | order(date asc)`;

export const featuredWebinarQuery = featuredQuery("academyWebinar", "date");

export const hubScheduledWebinarsQuery = `*[
  _type == "academyWebinar" && date >= now() && ${DRAFT_FILTER}
] | order(date asc)[0...$limit]`;

export const relatedWebinarsQuery = `*[
  _type == "academyWebinar" && slug.current != $slug && date >= now() && ${DRAFT_FILTER}
] | order(date asc)[0...$limit]`;

// ─── Courses ─────────────────────────────────────────────────────────────

export const courseSlugsQuery = `*[_type == "academyCourse" && ${DRAFT_FILTER}].slug.current`;

export const courseBySlugQuery = `*[_type == "academyCourse" && slug.current == $slug && ${DRAFT_FILTER}][0]`;

export const coursesListingQuery = `*[_type == "academyCourse" && ${DRAFT_FILTER}]`;

export const featuredCourseQuery = featuredQuery("academyCourse", "_createdAt");

export const hubCoursesQuery = `*[_type == "academyCourse" && ${DRAFT_FILTER}][0...$limit]`;

export const relatedCoursesQuery = `*[
  _type == "academyCourse" && slug.current != $slug && ${DRAFT_FILTER}
][0...$limit]`;

// ─── Cross-cutting ───────────────────────────────────────────────────────

/** Session title lookup for the registration email resolver, by kind + slug. */
export function resolveSessionTitleQuery(
  type: "academyWebinar" | "academyCourse",
) {
  return `*[_type == "${type}" && slug.current == $slug && ${DRAFT_FILTER}][0].title`;
}
