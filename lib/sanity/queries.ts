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

/** Narrow projection for `app/sitemap.ts` — slug + `publishedAt` only, no
 * image/body/author, so sitemap generation doesn't pay for the full
 * article normalization (Portable Text adapter, image resolution, etc.). */
export const articleSitemapEntriesQuery = `*[_type == "academyArticle" && ${DRAFT_FILTER}]{"slug": slug.current, publishedAt}`;

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

/** No author, no separate image-alt field — `AcademyCourse` has neither. */
const COURSE_PROJECTION = `{
  ...,
  "slug": slug.current
}`;

export const courseSlugsQuery = `*[_type == "academyCourse" && ${DRAFT_FILTER}].slug.current`;

export const courseBySlugQuery = `*[_type == "academyCourse" && slug.current == $slug && ${DRAFT_FILTER}][0]${COURSE_PROJECTION}`;

/**
 * `order(_createdAt asc)` — without an explicit order, Sanity returns
 * documents non-deterministically. The static `coursesContent.courses`
 * array has a deliberate curriculum sequence (Foundations → Financing →
 * Market Access) that doesn't map to any content field, but the migration
 * script created the three course documents in that exact order, so
 * `_createdAt asc` reproduces it — same field `featuredCourseQuery` already
 * uses for its fallback order.
 */
export const coursesListingQuery = `*[_type == "academyCourse" && ${DRAFT_FILTER}] | order(_createdAt asc)${COURSE_PROJECTION}`;

export const featuredCourseQuery = `(${featuredQuery("academyCourse", "_createdAt")})${COURSE_PROJECTION}`;

export const hubCoursesQuery = `*[_type == "academyCourse" && ${DRAFT_FILTER}] | order(_createdAt asc)[0...$limit]${COURSE_PROJECTION}`;

export const relatedCoursesQuery = `*[
  _type == "academyCourse" && slug.current != $slug && ${DRAFT_FILTER}
] | order(_createdAt asc)[0...$limit]${COURSE_PROJECTION}`;

// ─── Testimonials & FAQs ────────────────────────────
//
// `coalesce(order, 9999)` so a doc without an explicit `order` sorts after
// every ordered doc instead of landing ambiguously; `_createdAt asc` is the
// tiebreak for two docs that both lack `order` (or share the same value).

export const testimonialsByPlacementQuery = `*[
  _type == "testimonial" && placement == $placement && ${DRAFT_FILTER}
] | order(coalesce(order, 9999) asc, _createdAt asc)`;

export const faqsByPageQuery = `*[
  _type == "faq" && page == $page && ${DRAFT_FILTER}
] | order(coalesce(order, 9999) asc, _createdAt asc){question, answer, category}`;

// ─── Partners ────────────────────────────────────────────────────────────
//
// One query returns every partner regardless of `showInMarquee`/
// `showInVoices` — the fetch layer splits the result into two pools rather
// than issuing two separate requests for the same underlying catalogue.

export const partnersQuery = `*[
  _type == "partner" && ${DRAFT_FILTER}
] | order(coalesce(order, 9999) asc, name asc){
  "slug": slug.current,
  name,
  logo,
  website,
  showInMarquee,
  showInVoices,
  order
}`;

// ─── People ──────────────────────────────────────────────────────────────
//
// One query returns every team member regardless of `group` — `/about`
// needs both the Team and Advisors collections at once, so the fetch layer
// splits the result in JS rather than issuing two separate requests (same
// reasoning as `partnersQuery` above).

export const teamMembersQuery = `*[
  _type == "teamMember" && ${DRAFT_FILTER}
] | order(coalesce(order, 9999) asc, name asc){
  "id": _id,
  name,
  role,
  group,
  photo,
  credentials,
  bioSummary,
  bioParagraphs,
  socials,
  order
}`;

export const memberStoriesQuery = `*[
  _type == "memberStory" && ${DRAFT_FILTER}
] | order(coalesce(order, 9999) asc, name asc){
  "id": _id,
  result, challenge, withIProduce, name, age, initials, role, country
}`;

// ─── Phase 3 singletons ──────────────────────────────────────────────────

export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings" && ${DRAFT_FILTER}][0]{
  email,
  phone,
  address,
  instagramUrl,
  linkedinUrl,
  facebookUrl,
  youtubeUrl
}`;

export const homePageQuery = `*[_type == "homePage" && _id == "homePage" && ${DRAFT_FILTER}][0]{
  heroMessage,
  whatWeDoPoster,
  services,
  valueChains
}`;

export const aboutPageQuery = `*[_type == "aboutPage" && _id == "aboutPage" && ${DRAFT_FILTER}][0]{
  story,
  missionVisionObjective
}`;

export const legalPageByKeyQuery = `*[_type == "legalPage" && key == $key && ${DRAFT_FILTER}][0]{
  key,
  lastUpdated,
  title,
  subtitle,
  baselineNotice,
  sections
}`;

// ─── Cross-cutting ───────────────────────────────────────────────────────
//
// Session title + registration status for the registration email resolver
// reuses fetchWebinarBySlug/fetchCourseBySlug (lib/sanity/fetch/*.ts) —
// see lib/email/academy-registration.ts's resolveAcademySession(). No
// dedicated title-only query needed.
