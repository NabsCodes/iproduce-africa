# Sanity Academy Spec

## Status

**Approved with edits** — 2026-06-27. Companion to `docs/cms-migration-spec.md`.
Phase 1: **Academy editorial catalogues only**. Patched after Codex + Claude
review. No code until parent checklist is signed off.

---

## Scope

### In scope (Phase 1)

- Sanity document types for **blog articles**, **webinars/events**, **courses**
- GROQ projections into existing `types/blog.ts` and `types/academy.ts` shapes
- Fetch helpers in `lib/sanity/` replacing static imports on Academy routes
- Seed/migration from current `content/` files
- Session title resolution for `/api/academy/register` (slug lookup)
- **`/academy/search` in Phase 1** — server fetches three catalogues; existing
  client filter in `lib/academy-search.ts` unchanged (no Algolia, no Phase 1b)
- **`academyHomePreview` catalogue slices** from Sanity (spotlight + blog cards);
  non-catalogue preview copy stays code-owned

### Out of scope (Phase 1)

- Academy hub hero, tabs, opportunities, participants, testimonials, FAQs
- Team, partners, site-wide FAQs (Phase 2)
- Visual Editing / draft preview (deferred)
- Algolia or server search API
- TypeGen (Phase 1b after schema stabilises)

### Hard boundaries (unchanged)

- **Registration** stays on API + Resend — Sanity owns editorial content only
- **`ArticleBody`** stays the renderer — Portable Text adapts to `BlogArticleBlock`
- Root **`schemas/`** stays Zod only
- **Canonical ownership:** `blog.ts` / `webinars.ts` / `courses.ts` (+ `blog-articles.ts` data) — `academy.ts` projects only

---

## Reference implementation map

| Concern                                        | Primary reference                    | Secondary                                   |
| ---------------------------------------------- | ------------------------------------ | ------------------------------------------- |
| `lib/sanity/client.ts`, `fetch.ts`, `image.ts` | q-das                                | Sanity `nextjs.md`                          |
| PT object blocks (callout, table, code)        | q-das `sanity/schemas/objects/*`     | portfolio `blogPost.ts` inline blocks       |
| Webhook revalidate                             | q-das `app/api/revalidate/route.ts`  | —                                           |
| Migration + image upload                       | q-das `scripts/migrate-to-sanity.ts` | portfolio `scripts/seed-blog-posts.ts`      |
| Studio route                                   | q-das `app/admin/[[...index]]`       | Sanity embedded Studio docs                 |
| Blog slug pages                                | portfolio `app/blog/[slug]/page.tsx` | iProduce `app/academy/blog/[slug]/page.tsx` |

---

## Target folder layout (Phase 1 files only)

```text
sanity/
  env.ts
  structure.ts
  schemaTypes/
    index.ts
    documents/
      academy-article.ts
      academy-webinar.ts
      academy-course.ts
      author.ts
    objects/
      registration-config.ts       # shared import — webinar + course
    blocks/
      callout.ts
      table.ts
      code-block.ts
      body-image.ts

lib/sanity/
  client.ts
  fetch/
    articles.ts
    webinars.ts
    courses.ts
    academy-preview.ts             # hub + home preview projections
  image.ts
  queries.ts                       # shared groq fragments
  portable-text.ts                 # PT → BlogArticleBlock[]
  guards.ts                        # featured fallback, empty arrays

app/admin/[[...index]]/page.tsx
app/api/revalidate/route.ts

scripts/
  migrate-academy-to-sanity.ts
```

---

## Document types

### `academyArticle`

Maps to `BlogArticle` (`types/blog.ts`).

| Sanity field      | Type                 | Maps to                       | Notes                                         |
| ----------------- | -------------------- | ----------------------------- | --------------------------------------------- |
| `title`           | string               | `title`                       | required                                      |
| `slug`            | slug                 | `slug`                        | unique                                        |
| `excerpt`         | text                 | `excerpt`                     | max ~200                                      |
| `category`        | string (list)        | `BlogCategory`                | eight values — see below                      |
| `author`          | reference → `author` | `BlogAuthor`                  | **required reference** (v1)                   |
| `readTimeMinutes` | number               | `readTimeMinutes`             | optional override; else compute in projection |
| `publishedAt`     | datetime             | `publishedAt`                 | ISO at fetch                                  |
| `cardImage`       | image + alt          | `cardImage`, `cardImageAlt`   | alt required in Studio                        |
| `heroImage`       | image + alt          | `heroImage?`, `heroImageAlt?` | optional                                      |
| `body`            | array (PT + blocks)  | `BlogArticleBlock[]`          | via adapter                                   |

**No `isPublished` field** — visibility = Sanity publish + drafts filter only.

**Categories (canonical — eight):** Innovation, Trade, Smart Agriculture,
Agribusiness, Policy, Market Insights, Sustainability, Community — controlled
`list` in Studio (from `content/blog.ts` `BLOG_CATEGORIES`).

### Hub category collapse (`BlogCategory` → `AcademyArticleCategory`)

Academy hub blog band uses **three** chip values. Projection in
`lib/sanity/fetch/academy-preview.ts` must match today’s static behaviour in
`content/blog.ts` `toHubArticleCategory()`:

| `BlogCategory` (8) | `AcademyArticleCategory` (hub) |
| ------------------ | ------------------------------ |
| Trade              | TRADE                          |
| Smart Agriculture  | SMART AGRICULTURE              |
| Innovation         | INNOVATION                     |
| Agribusiness       | INNOVATION                     |
| Policy             | INNOVATION                     |
| Market Insights    | INNOVATION                     |
| Sustainability     | INNOVATION                     |
| Community          | INNOVATION                     |

Do not change this mapping without a deliberate product decision and type update.

### `academyWebinar`

Maps to `AcademyWebinar` (`types/academy.ts`). One type for webinars, training,
live Q&A, and events (matches `AcademyScheduledType`).

| Sanity field   | Type                 | Maps to                |
| -------------- | -------------------- | ---------------------- | --------------------------------------------------------------------- |
| `title`        | string               | `title`                |
| `slug`         | slug                 | `slug`                 |
| `type`         | string list          | `AcademyScheduledType` | WEBINAR, TRAINING, LIVE Q&A, EVENT                                    |
| `date`         | datetime             | `date`                 | ISO string                                                            |
| `description`  | text                 | `description`          | listing card                                                          |
| `excerpt`      | text                 | `excerpt`              | search + cards                                                        |
| `image`        | image + alt          | `image`, `imageAlt?`   |
| `body`         | array of string      | `body: string[]`       | v1 — max 2000 chars/string, min 1 when published                      |
| `dateLabel`    | string               | `dateLabel?`           | **computed from `date` in projection**; optional Studio override only |
| `location`     | string               | `location?`            |
| `format`       | string               | `format?`              |
| `speakers`     | string               | `speakers?`            |
| `registration` | `registrationConfig` | `registration?`        |

**`registrationConfig`** — single object in
`sanity/schemaTypes/objects/registration-config.ts`, imported by webinar and
course schemas (field set must not drift).

| Field         | Values                                         |
| ------------- | ---------------------------------------------- |
| `mode`        | `open` \| `interest` \| `external` \| `closed` |
| `url`         | url (external mode)                            |
| `label`       | string                                         |
| `closedLabel` | string                                         |

### `academyCourse`

Maps to `AcademyCourseDetail`.

| Sanity field   | Type                 | Maps to              |
| -------------- | -------------------- | -------------------- | -------------------------------- |
| `title`        | string               | `title`              |
| `slug`         | slug                 | `slug`               |
| `level`        | list                 | `AcademyCourseLevel` | BEGINNER, INTERMEDIATE, ADVANCED |
| `duration`     | string               | `duration`           | e.g. `6 WEEKS`                   |
| `description`  | text                 | `description`        | card                             |
| `excerpt`      | text                 | `excerpt`            |
| `image`        | image + alt          | `image`              |
| `body`         | text array           | `body: string[]`     | v1                               |
| `modules`      | array of string      | `modules`            | min 1 when published             |
| `registration` | `registrationConfig` | `registration?`      |

**Phase 2 body upgrade:** swap to Portable Text without breaking v1 content —
adapter can still emit `string[]` for shallow copy.

### `author` (Phase 1)

| Field   | Type                 |
| ------- | -------------------- |
| `name`  | string (required)    |
| `role`  | string               |
| `photo` | image + alt optional |

Referenced by `academyArticle.author`. One bio/photo update propagates to all
articles.

---

## Portable Text → `BlogArticleBlock`

`ArticleBody` (`components/academy/blog/article-body.tsx`) dispatches on
`block.kind`. The adapter in `lib/sanity/portable-text.ts` is the **only**
place that knows Sanity’s `_type` values.

| `BlogArticleBlock.kind` | Sanity source                                                    |
| ----------------------- | ---------------------------------------------------------------- |
| `paragraph`             | `block` style normal                                             |
| `heading2`              | `block` style h2                                                 |
| `heading3`              | `block` style h3                                                 |
| `blockquote`            | `block` style blockquote                                         |
| `callout`               | object `callout`                                                 |
| `list_unordered`        | `block` list bullet (flatten to items[])                         |
| `list_ordered`          | custom object OR nested blocks → `{ title, body }[]`             |
| `table`                 | object `table` (portfolio/q-das validation: row width = headers) |
| `code`                  | object `codeBlock`                                               |
| `image`                 | image type with alt + caption                                    |

**Not in v1 unless editorial asks:** youtube, image gallery, CTA buttons (q-das
has these — skip until needed).

**Renderer rule:** do not change `ArticleBody` for Sanity; change adapter only.

### Inline marks (v1 fidelity contract)

`BlogArticleBlock` paragraph/heading fields are **plain `string`** — no span
model. Sanity PT will produce bold/italic/link marks when editors use the toolbar.

**v1 adapter rule:** strip marks to plain text (links → visible URL text or drop
link, team choice at implement time — document in adapter JSDoc). **Do not**
silently render broken HTML.

**Allowed PT in Studio v1:** styles `normal`, `h2`, `h3`, `blockquote`; lists
bullet/number; custom objects `callout`, `table`, `codeBlock`, image blocks.
Disallow ad-hoc embeds (youtube, gallery) until requested.

### Ordered list → `{ title, body }[]`

Use a dedicated Sanity object `orderedStep` (`title` + `body` text) in the PT
array, mapped to `list_ordered` in the adapter. Do not fake ordered lists from
nested bullet blocks.

---

## `academyHomePreview` composition (Phase 1)

| Slice                | Source                                                                       | Code-owned                          |
| -------------------- | ---------------------------------------------------------------------------- | ----------------------------------- |
| `spotlight.upcoming` | GROQ: upcoming webinars from Sanity, same filter/sort as `isUpcomingSession` | —                                   |
| `spotlight.training` | GROQ: course card projection, limit N                                        | —                                   |
| `blog`               | GROQ: article hub preview + category collapse table                          | —                                   |
| `opportunities`      | —                                                                            | `content/academy.ts` anchors + copy |

Home sections import `fetchAcademyHomePreview()` instead of static
`academyHomePreview` export once wired.

---

## `AcademyFeaturedEvent` field ownership

| From webinar (Sanity)                                                                         | From code wrapper (`content/academy.ts`)                                                                                               |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`, `title`, `description`, `image`, `imageAlt`, `date`, `location`, `speakers`, `format` | `eyebrow`, `sectionTitle`, `category` (hub marketing label), `registerLabel`, `dateLabel` override only if computed label insufficient |

Do not duplicate wrapper labels on the webinar document in Phase 1.

---

## Portable Text → `BlogArticleBlock` (block map)

## GROQ query catalog

All public queries include:

```groq
!(_id in path("drafts.**"))
```

### Featured document (single query — no double round-trip)

```groq
coalesce(
  *[_type == $type && slug.current == $featuredSlug && !(_id in path("drafts.**"))][0],
  *[_type == $type && !(_id in path("drafts.**"))] | order(publishedAt desc)[0]
)
```

Use per catalogue (`academyArticle`, `academyWebinar`, `academyCourse`). If
coalesce is null → hide featured band.

### Articles

| Query key                 | Purpose                                  | Replaces                          |
| ------------------------- | ---------------------------------------- | --------------------------------- |
| `articleSlugsQuery`       | `generateStaticParams`                   | `blogContent.articles.map`        |
| `articleBySlugQuery`      | detail page                              | `getArticle(slug)`                |
| `articlesListingQuery`    | listing + sort by `publishedAt desc`     | `blogContent.articles`            |
| `featuredArticleQuery`    | coalesce featured + newest (single GROQ) | `blogContent.featuredArticleSlug` |
| `relatedArticlesQuery`    | same category first, then others         | `getRelatedArticles`              |
| `articleSearchProjection` | title, excerpt, category, slug           | search index                      |

**Featured fallback:** use coalesce GROQ above — do not chain two fetches in
`guards.ts`.

### Webinars

| Query key                   | Purpose                               | Replaces                       |
| --------------------------- | ------------------------------------- | ------------------------------ |
| `webinarSlugsQuery`         | static params                         | `webinarsContent.webinars`     |
| `webinarBySlugQuery`        | detail                                | `getWebinar(slug)`             |
| `webinarsListingQuery`      | listing                               | `webinarsListing`              |
| `featuredWebinarQuery`      | featured band                         | `webinarsContent.featuredSlug` |
| `hubScheduledWebinarsQuery` | hub subset (upcoming, limit N)        | `academyHubScheduledWebinars`  |
| `relatedWebinarsQuery`      | upcoming, exclude slug, date >= today | `getRelatedWebinars`           |
| `featuredEventProjection`   | `AcademyFeaturedEvent`                | `academyFeaturedEvent` export  |

**Featured event:** hub band copy (eyebrow “Featured Event”, `registerLabel`) can
stay **code-owned** in `content/academy.ts` wrapping canonical webinar fields
until Phase 2 hub singleton.

### Courses

| Query key             | Purpose               | Replaces                      |
| --------------------- | --------------------- | ----------------------------- |
| `courseSlugsQuery`    | static params         | `coursesContent.courses`      |
| `courseBySlugQuery`   | detail                | `getCourse(slug)`             |
| `coursesListingQuery` | listing               | `coursesListing`              |
| `featuredCourseQuery` | featured band         | `coursesContent.featuredSlug` |
| `hubCoursesQuery`     | hub grid              | `academyHubCourses`           |
| `relatedCoursesQuery` | exclude slug, limit 3 | `getRelatedCourses`           |

### Cross-cutting

| Query key                  | Purpose              | Replaces                                     |
| -------------------------- | -------------------- | -------------------------------------------- |
| `academyHomePreviewQuery`  | `AcademyHomePreview` | `academyHomePreview` in `content/academy.ts` |
| `resolveSessionTitleQuery` | title by kind + slug | `resolveAcademySessionTitle`                 |

---

## Page integration map

| Route                      | Current import                                | Phase 1 change                                                       |
| -------------------------- | --------------------------------------------- | -------------------------------------------------------------------- |
| `/academy/blog`            | `blogContent`                                 | fetch listing + featured; keep page chrome from `blogContent` static |
| `/academy/blog/[slug]`     | `getArticle`, `getRelatedArticles`            | `fetchArticleBySlug`, `fetchRelatedArticles`                         |
| `/academy/webinars`        | `webinarsContent`                             | fetch listing                                                        |
| `/academy/webinars/[slug]` | `getWebinar`, `getRelatedWebinars`            | fetch helpers                                                        |
| `/academy/courses`         | `coursesContent`                              | fetch listing                                                        |
| `/academy/courses/[slug]`  | `getCourse`, `getRelatedCourses`              | fetch helpers                                                        |
| `/academy` hub grids       | `academyContent` scheduled/courses/blog items | preview query or composed fetches                                    |
| `/academy/search`          | `searchAcademy`                               | Server page fetches three catalogues → passes to client filter       |
| Home spotlight             | `academyHomePreview`                          | same preview query                                                   |
| `/api/academy/register`    | `getWebinar` / `getCourse`                    | `resolveSessionTitle` via Sanity                                     |

**Page chrome** (heroes, CTA copy, related section labels, newsletter sidebar copy)
may stay in `content/blog.ts`, `content/webinars.ts`, `content/courses.ts` until
Phase 2 singletons — only **catalogue arrays** swap to CMS first.

---

## Edge cases (Academy-specific)

| Scenario                              | Required behaviour                                                                                                                                                                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zero published articles               | Listing route: hero + empty message; hub blog band: **hidden**                                                                                                                                                                    |
| Featured slug points to draft/missing | Fallback to newest published; if none, hide featured band                                                                                                                                                                         |
| Webinar date in past                  | Still on detail URL; related/upcoming queries exclude past                                                                                                                                                                        |
| `registration.mode: closed`           | UI shows `closedLabel` only (no register button). **API rejects** POST with `{ error: PUBLIC_FORM_VALIDATION_ERROR }` / 400 — same response shape as `session_not_found` in `handlePublicFormPost`, not a new client error string |
| `registration.mode: external`         | UI links out; API not used                                                                                                                                                                                                        |
| Course with empty `modules`           | Studio blocks publish; runtime hides modules block if somehow empty                                                                                                                                                               |
| Related query returns `[]`            | Omit `AcademyRelatedSection`                                                                                                                                                                                                      |
| Migration missing image               | Log to manifest; use `CmsFallbackImage` at runtime                                                                                                                                                                                |
| Slug edited after publish             | Studio warning; webhook revalidates old + new paths                                                                                                                                                                               |
| Slug removed / doc unpublished        | `notFound()` on detail; omitted from listings after revalidate                                                                                                                                                                    |

---

## Studio scope (Phase 1)

**Sidebar**

- Webinars & Events
- Courses
- Articles
- Authors

**Per-document preview**

- Open production URL: `/academy/{track}/{slug}`

**Validation highlights**

- Slug required; **`slug.current` unique per `_type`** (custom validation)
- After first publish: **discourage slug edits** (Studio `readOnly` warning pattern)
- `cardImage` / main image + **alt** required
- Webinar `date` required; `dateLabel` optional override only
- Course `modules` min 1; `body` strings max 2000 chars each
- Do not add `isPublished`

**Not in Studio v1:** hub hero, FAQs, testimonials, forms.

---

## Revalidation paths

v1 uses **`revalidatePath` only** (no tag cache). Listing routes are the index —
they must revalidate on every publish, not only detail pages.

Webhook verifies **Sanity signed payload** (HMAC), not a bare shared secret in
query string alone.

| `_type`          | Static paths                                            | Dynamic                                         |
| ---------------- | ------------------------------------------------------- | ----------------------------------------------- |
| `academyArticle` | `/academy/blog`, `/academy`, `/`, `/academy/search`     | `/academy/blog/{slug}` old + new on slug change |
| `academyWebinar` | `/academy/webinars`, `/academy`, `/`, `/academy/search` | `/academy/webinars/{slug}` old + new            |
| `academyCourse`  | `/academy/courses`, `/academy`, `/`, `/academy/search`  | `/academy/courses/{slug}` old + new             |

`dynamicParams = true` (Next default) — removed slugs 404 until rebuild/revalidate.

---

## Migration script outline

**Policy:** Studio must **never** launch empty for client handoff. The migration
script seeds **all** current static catalogue placeholders (10 articles, 7
webinars, 3 courses, authors) into the target dataset automatically — editors
replace or delete from `/admin`, they do not re-type demo content by hand.

`scripts/migrate-academy-to-sanity.ts`:

1. Load env; create write client
2. **Authors:** seed from `blog-articles.ts` author map first (for references)
3. **Articles:** iterate `blogArticles` from `content/blog-articles.ts`
4. **Webinars:** iterate `webinarsContent.webinars`
5. **Courses:** iterate `coursesContent.courses`
6. For each: upload images from `public/` → create document (**auto `_id`**)
7. **Default `--dataset development`** — full placeholder seed runs here first;
   production requires `--dataset production --confirm` after QA
8. `--dry-run` + migration manifest (failures, skips, collisions)
9. Print summary counts

Phase 2 uses the same pattern for testimonials, partners, team, FAQs — migrate
static placeholders into `development`, not empty collections.

**Post-migration:** static catalogue arrays move to `content/_archived/` after
cutover QA — do not delete in the same PR as fetch swap.

---

## Cutover sequence

1. Approve this spec + cms-migration-spec
2. Create Sanity project + datasets
3. Add schemas + Studio route (no public fetch yet)
4. Run migration script → verify in Studio
5. Implement `lib/sanity/fetch/*` + guards
6. Switch Academy routes one track at a time (blog → webinars → courses)
7. Switch search + email resolver + home preview
8. QA: slugs, related, featured, empty, build, mobile
9. Remove static catalogue arrays; update specs + implementation log

---

## Acceptance criteria (Phase 1)

- [ ] All existing static slugs resolve (10 + 7 + 3)
- [ ] `pnpm build` passes; `generateStaticParams` from Sanity
- [ ] `ArticleBody` unchanged; adapter covers all block kinds in flagship article
- [ ] Featured + related + upcoming logic matches static behaviour
- [ ] Empty catalogue rules from cms-migration-spec enforced
- [ ] Registration emails resolve session title from Sanity slug
- [ ] Webhook revalidates listing + detail (old/new slug) + hub + home + search
- [ ] `/academy/search` uses Sanity catalogues in Phase 1
- [ ] Category collapse table matches hub behaviour
- [ ] PT adapter strips marks; ordered steps map correctly
- [ ] `registration.mode: closed` blocked in API
- [ ] No Sanity types in root `schemas/`

---

## Review notes

Locked per `docs/cms-migration-spec.md` **Locked decisions**. External review
(Codex + Claude, 2026-06-27) incorporated in this revision.
