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

/**
 * Shared projection for every article query: flattens `slug` to a plain
 * string and dereferences `author` to just the fields `BlogAuthor` needs.
 * Everything else (`cardImage`/`heroImage`/`body`/etc.) passes through raw
 * via `...` — image URL resolution and the Portable Text → BlogArticleBlock
 * adapter both happen in JS, in `lib/sanity/fetch/articles.ts`.
 */
const ARTICLE_PROJECTION = `{
  ...,
  "slug": slug.current,
  "author": author->{name, role}
}`;

export const articleSlugsQuery = `*[_type == "academyArticle" && ${DRAFT_FILTER}].slug.current`;

export const articleBySlugQuery = `*[_type == "academyArticle" && slug.current == $slug && ${DRAFT_FILTER}][0]${ARTICLE_PROJECTION}`;

export const articlesListingQuery = `*[_type == "academyArticle" && ${DRAFT_FILTER}] | order(publishedAt desc)${ARTICLE_PROJECTION}`;

export const featuredArticleQuery = `(${featuredQuery("academyArticle", "publishedAt")})${ARTICLE_PROJECTION}`;

export const relatedArticlesQuery = `*[
  _type == "academyArticle" && slug.current != $slug && ${DRAFT_FILTER}
] | order(publishedAt desc)${ARTICLE_PROJECTION}`;

export const articleSearchProjection = `{title, excerpt, category, "slug": slug.current}`;

// ─── Webinars ────────────────────────────────────────────────────────────

/** No author dereference needed — webinars have no reference fields. */
const WEBINAR_PROJECTION = `{
  ...,
  "slug": slug.current
}`;

export const webinarSlugsQuery = `*[_type == "academyWebinar" && ${DRAFT_FILTER}].slug.current`;

export const webinarBySlugQuery = `*[_type == "academyWebinar" && slug.current == $slug && ${DRAFT_FILTER}][0]${WEBINAR_PROJECTION}`;

export const webinarsListingQuery = `*[_type == "academyWebinar" && ${DRAFT_FILTER}] | order(date asc)${WEBINAR_PROJECTION}`;

export const featuredWebinarQuery = `(${featuredQuery("academyWebinar", "date")})${WEBINAR_PROJECTION}`;

/**
 * `$today` is a date-only string (`YYYY-MM-DD`), not `now()` — matches
 * `content/webinars.ts`'s `sessionDateKey`/`isUpcomingSession` exactly.
 * Some seeded `date` values are date-only strings themselves; comparing
 * against `now()`'s full timestamp would lexicographically exclude a
 * same-day webinar the moment any time has passed today.
 */
export const hubScheduledWebinarsQuery = `*[
  _type == "academyWebinar" && date >= $today && ${DRAFT_FILTER}
] | order(date asc)[0...$limit]${WEBINAR_PROJECTION}`;

export const relatedWebinarsQuery = `*[
  _type == "academyWebinar" && slug.current != $slug && date >= $today && ${DRAFT_FILTER}
] | order(date asc)[0...$limit]${WEBINAR_PROJECTION}`;

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
