# Sanity Academy Spec

## Status

**Approved with edits** — 2026-06-27. Companion to `docs/cms-migration-spec.md`.
Phase 1: **Academy editorial catalogues only**. Patched after Codex + Claude
review.

**Implementation progress (2026-07-11):** foundation (schemas, Studio,
migration script) shipped and seeded into `development` — see
`docs/implementation-log.md`. Cutover sequence steps 1–7 now done for
**all Phase 1 Academy surfaces** — blog/webinars/courses listing+detail
routes, the registration email resolver, the `/academy` hub (all three
catalogue bands + featured event), Home spotlight + featured articles, and
`/academy/search`, plus `app/sitemap.ts`. Every public catalogue surface now
reads from the same Sanity source — no more static/Sanity split between
`/academy/blog/[slug]` and the hub/home/search surfaces. Remaining Phase 1
steps are non-code: QA on staging, archiving the static catalogue arrays
(not yet done — kept for rollback), and production dataset + webhook
configuration (manual, external). Phase 2 (testimonials, partners, team,
FAQs, member stories) is next after that.

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
- Team, partners, FAQs, member stories (**Phase 2** — `docs/cms-migration-spec.md`)
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

app/admin/
  layout.tsx                       # noindex + full-viewport shell (no site chrome)
  [[...index]]/page.tsx            # Embedded Studio
app/api/revalidate/route.ts

# Site chrome: public routes live under app/(site)/ and receive Header/Footer
# from that route-group layout; /admin remains outside the public data/chrome
# boundary. See docs/cms-migration-spec.md.

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
| `endDate`      | datetime             | `endDate?`             | optional; must be after `date`                                        |
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

## Automatic webinar promotion ownership

One webinar document represents one scheduled occurrence. Editors set its real
start date/time and, when it should display as ongoing, an optional end
date/time. There is no `featured`, `promote`, priority, homepage, or
manual-override field.

`selectPromotableWebinars()` in `lib/academy-webinars.ts` owns one retention
rule: `effectiveEnd >= now`, where effective end is a valid `endDate` or the
start `date`. Results sort by start ascending, then slug. A happening event
therefore keeps priority over later upcoming events until its end passes. GROQ
uses the same effective-end expression; invalid `endDate <= date` direct writes
fall back to the start in GROQ, fetch normalization, and JS.

Academy session date display is owned by `lib/academy-dates.ts` (UTC
`Intl.DateTimeFormat`). Use `resolveAcademyDateLabel(date, dateLabel?)` when
rendering featured/detail/panel dates; use the named format helpers for card
meta and hero short labels. Do not reintroduce local Academy formatters.
Blog `publishedAt` and email timestamps stay outside this module.

The same retained set drives the Academy hero, hub featured band and grid,
webinar listing featured band, Home Upcoming cards, and related sessions.
Registration remains separate: default open registration closes at the start,
while external mode remains available when editors intentionally configure a
live destination.

The Home, Academy hub, webinar listing, and webinar detail routes use
five-minute ISR for this time-driven behavior. Sanity webhooks still make
published content edits visible promptly, but they cannot trigger when time
passes. Once the five-minute cache window expires, the next request triggers
regeneration; that first response may briefly be stale while the fresh route
is produced.

The hub countdown hydrates with `--` placeholders. At start it derives
`Happening now` locally when a valid end exists, without requesting a server
rotation. At effective end it requests an immediate refresh, a cache-window
retry, and one post-ISR collection refresh. Without a valid end, start is the
effective end and transitional copy only says the session started. The UI says
`ended` only after a known end timestamp.

The promoted webinar supplies `slug`, `title`, `description`, `image`,
`imageAlt`, `date`, `location`, `speakers`, and `format`. Code-owned Academy
shell copy supplies the eyebrow, section title, category label, registration
label, and no-upcoming announcement.

The same result drives the Academy hero, hub featured-event band, and webinar
listing featured band. Home remains a four-card upcoming list; its first card
matches automatically because its fetch is ordered through the same selector.

---

## Portable Text → `BlogArticleBlock` (block map)

## GROQ query catalog

All public queries include:

```groq
!(_id in path("drafts.**"))
```

### Featured evergreen document (single query — no double round-trip)

```groq
coalesce(
  *[_type == $type && slug.current == $featuredSlug && !(_id in path("drafts.**"))][0],
  *[_type == $type && !(_id in path("drafts.**"))] | order(publishedAt desc)[0]
)
```

Use for articles and courses only. Time-based webinars use the automatic
upcoming selector above; they must never fall back to a past document.

### Articles

| Query key              | Purpose                                  | Replaces                          |
| ---------------------- | ---------------------------------------- | --------------------------------- |
| `articleSlugsQuery`    | `generateStaticParams`                   | `blogContent.articles.map`        |
| `articleBySlugQuery`   | detail page                              | `getArticle(slug)`                |
| `articlesListingQuery` | listing + sort by `publishedAt desc`     | `blogContent.articles`            |
| `featuredArticleQuery` | coalesce featured + newest (single GROQ) | `blogContent.featuredArticleSlug` |
| `relatedArticlesQuery` | same category first, then others         | `getRelatedArticles`              |

**Featured fallback:** use coalesce GROQ above — do not chain two fetches in
the fetch helper.

### Webinars

| Query key                   | Purpose                               | Replaces                      |
| --------------------------- | ------------------------------------- | ----------------------------- |
| `webinarSlugsQuery`         | static params                         | `webinarsContent.webinars`    |
| `webinarBySlugQuery`        | detail                                | `getWebinar(slug)`            |
| `webinarsListingQuery`      | listing                               | `webinarsListing`             |
| `hubScheduledWebinarsQuery` | hub subset (upcoming, limit N)        | `academyHubScheduledWebinars` |
| `relatedWebinarsQuery`      | upcoming, exclude slug, date >= today | `getRelatedWebinars`          |

**Promoted event:** the hub already fetches the full webinar listing for its
band and count, so it derives the first upcoming webinar in JS rather than
issuing another request. The Home preview keeps the narrow upcoming query and
normalizes its result through the same selector.

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

| Query key                 | Purpose              | Replaces                                     |
| ------------------------- | -------------------- | -------------------------------------------- |
| `academyHomePreviewQuery` | `AcademyHomePreview` | `academyHomePreview` in `content/academy.ts` |

Session title + registration status for `/api/academy/register` is resolved
by `resolveAcademySession()` (`lib/email/academy-registration.ts`) reusing
the existing `fetchWebinarBySlug`/`fetchCourseBySlug` from
`lib/sanity/fetch/{webinars,courses}.ts` — no dedicated GROQ query. There is
no separate `resolveSessionTitleQuery`/title-only projection in code.

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
6. For each: upload images from `public/` first (when required), then
   deterministic `_id` (`academyArticle.{slug}`, etc.) → `createIfNotExists`
   with complete image refs; `patch` on re-runs / failed-image recovery only
7. **Default `--dataset development`** — full placeholder seed runs here first;
   production requires `--dataset production --confirm` after QA
8. **No writes by default** — `--dry-run` (API read-only SKIP/CREATE preview);
   `--execute` to mutate; optional `--dry-run --offline` before project exists
9. Migration manifest: failures, skips, slug-drift warnings, collisions
10. Print summary counts

Phase 2 uses the same pattern for testimonials, partners, team, advisors, FAQs,
and member stories — migrate static placeholders into `development`, not empty
collections (see `docs/cms-migration-spec.md` Phase 2).

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
7. Switch search + email resolver + home preview — **done**
8. QA: slugs, related, featured, empty, build, mobile — **your turn on staging**
9. Remove static catalogue arrays; update specs + implementation log — **deferred until after staging QA**

---

## Acceptance criteria (Phase 1)

- [x] All existing static slugs resolve (10 + 7 + 3)
- [x] `pnpm build` passes; `generateStaticParams` from Sanity
- [x] `ArticleBody` unchanged; adapter covers all block kinds in flagship article
- [x] Featured + related + upcoming logic matches static behaviour
- [x] Empty catalogue rules from cms-migration-spec enforced
- [x] Registration emails resolve session title from Sanity slug
- [x] Webhook revalidates listing + detail (old/new slug) + hub + home + search
- [x] `/academy/search` uses Sanity catalogues in Phase 1
- [x] Category collapse table matches hub behaviour
- [x] PT adapter strips marks; ordered steps map correctly
- [x] `registration.mode: closed` blocked in API
- [x] No Sanity types in root `schemas/`

---

## Review notes

Locked per `docs/cms-migration-spec.md` **Locked decisions**. External review
(Codex + Claude, 2026-06-27) incorporated in this revision.
