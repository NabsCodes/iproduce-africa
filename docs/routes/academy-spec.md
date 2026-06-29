# Academy Page Spec

## Status

Hub page (`/academy`) built against the supplied Figma frame (2026-06-17).
**Academy listing routes** (`/academy/webinars`, `/academy/courses`,
`/academy/blog`) share one dark-band hero (`AcademyListingHeroSection`) and
a `ContentCard` grid (`ListingCardGrid`). Each listing adds a **featured**
band and **filter pills** below the hero (blog: article + categories;
webinars: event + type; courses: course + level). Slug detail pages ship
static-first on `AcademyDetailShell` for all three catalogues. **Sanity
wiring is explicitly deferred** until UI sign-off and a separate Sanity spec.

## Purpose

The Academy is the content-heaviest surface — webinars, training, courses,
events, and articles, all editor-managed via Sanity in the next iteration.
The hub introduces the four learning categories, surfaces curated previews,
and routes to full catalogue pages. In-page tab anchors remain on `/academy`
for scroll-spy navigation; cards and CTAs use real listing/detail URLs.

## Taxonomy (locked)

- **Hub anchors**: `overview`, `webinars-events`, `courses`, `blog`.
  (Events fold into the Webinars & Events section on the hub; nothing
  lives at `#training` or `#events` in this build.)
- **Listing routes** (built): `/academy/webinars` (webinars + events
  catalogue), `/academy/courses`, `/academy/blog`. Each uses
  `AcademyListingHeroSection` + featured band + filter bar + `ListingCardGrid`.
- **Detail routes** (static scaffold): `/academy/blog/[slug]`,
  `/academy/webinars/[slug]`, `/academy/courses/[slug]` — each composes
  `AcademyDetailShell` with track-owned slot renderers.

### Naming rule: `blog` everywhere in code, "Blog/Insights" in nav

The category that holds articles / thought leadership is named `blog`
in code, routes, anchors, and types (`AcademyArticle`,
`AcademyArticleCategory`, `academyContent.blog`,
`academyHomePreview.blog`, `#blog`, `/academy/blog`). The visible label is
**"Blog"** inside the Academy page (tab strip, section eyebrow, Opportunities
card) for clarity, and **"Blog/Insights"** in the global navbar Academy
dropdown and the footer Academy column to preserve the more descriptive
hover-target wording users were responding to. The earlier "Insights" naming
was dropped because (1) `/academy/blog` is a higher-volume search query than
`/academy/insights`, (2) one-syllable "Blog" reads truer to the actual
content mix of how-to + analysis + commentary than the more corporate
"Insights", and (3) the Figma was already hedging with "Blog / insights" —
picking one and committing in code while keeping the descriptive nav label
gives both audiences the clearest signal.

## Listing routes (shared pattern)

Figma ships one listing template; each catalogue swaps hero copy, featured
item, filters, and grid data. Implemented primitives:

| Primitive                   | Path                                                   | Role                                                                     |
| --------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------ |
| `AcademyListingHeroSection` | `components/academy/listings/listing-hero-section.tsx` | Dark `bg-forest-900` band, leaf `EyebrowPill`, centred serif h1          |
| `ListingCardGrid`           | `components/academy/listings/listing-card-grid.tsx`    | `ContentCard` grid + **Load more** (in-page) + count helper              |
| `ListingFilterBar`          | `components/academy/listings/listing-filter-bar.tsx`   | Shared pill filters (`aria-pressed`) — blog wraps as `CategoryFilterBar` |
| `AcademyDetailShell`        | `components/academy/listings/academy-detail-shell.tsx` | Detail pages — blog, webinars, courses                                   |
| Hub sections                | `components/academy/hub/`                              | `/academy` marketing hub only                                            |
| Blog-only sections          | `components/academy/blog/`                             | Article body, sidebar, featured article                                  |
| Webinars-only sections      | `components/academy/webinars/`                         | Featured event band, listing body + type filters                         |
| Courses-only sections       | `components/academy/courses/`                          | Featured course band, listing body + level filters                       |

**Blog** — `FeaturedArticleSection`, `CategoryFilterBar` → `ListingFilterBar`,
`BlogListingBody` → `ArticleGrid` → `ListingCardGrid`.

**Webinars** — `FeaturedWebinarSection`, `WebinarsListingBody` with type
filters (`Webinar`, `Training`, `Live Q&A`, `Event`). Featured slug defaults
to hub `featuredEvent.slug`.

**Courses** — `FeaturedCourseSection`, `CoursesListingBody` with level filters
(`Beginner`, `Intermediate`, `Advanced`).

All listing routes are **static** (no `searchParams`). Hub search goes to
`/academy/search?q=` only — not catalogue `?q=` filters.

Listing vs slug **loading** boundaries use route groups:
`app/academy/{blog,webinars,courses}/(listing)/loading.tsx` for catalogues,
`[slug]/loading.tsx` for detail pages.

Hero content shape: `AcademyListingHeroContent` in `types/academy.ts`
(`{ eyebrow, title, description }`). Per-route copy in
`content/{blog,webinars,courses}.ts`.

## Section Composition

Order: Hero → Tabs → Featured Event → Learning Opportunities → Target
Participants → Webinars & Events → Courses → Blog → Testimonials → FAQ →
CTA → Footer.

### 1. Hero — `components/academy/hub/academy-hero-section.tsx`

Bespoke hero, **not** a `PageHero` wrap. Composition:

- **Left column**: tangerine eyebrow pill, serif h1, body copy, **Academy-wide
  search** (`AcademyHeroSearchForm`: single `<Input type="search">` + Search
  button — no category dropdown). Submit navigates to
  `/academy/search?q={keyword}` which searches webinars, courses, and articles
  together (`lib/academy-search.ts`).
- **Right column**: `aspect-4/5` image with decorative ring (`lg:` only) and
  floating **NEXT LIVE SESSION** card linking to the featured webinar detail
  slug (`/academy/webinars/{slug}`).

`AcademyHeroSearchForm` is `"use client"` for `useRouter` navigation to
`/academy/search?q=`.

### 2. Tabs — `components/academy/hub/academy-tabs-section.tsx`

Sticky in-page navigation directly under the hero. `"use client"` to host
scroll-spy behaviour.

- **Sticky behaviour**: `sticky top-0 z-30 border-y bg-white/95 backdrop-blur`.
  The header is itself sticky, so tab anchors carry generous `scroll-mt`
  (hero `scroll-mt-24`, all later sections `scroll-mt-28`) to prevent the
  active section title from being hidden behind the combined sticky stack.
- **Pills**: Overview / Webinars & Events / Evergreen courses / Blog.
  Rounded full pills, active state `bg-leaf-200 text-foreground`, inactive
  `text-fg-muted hover:bg-muted`. Mobile scrolls horizontally if labels
  overflow (`overflow-x-auto` + `min-w-max` nav).
- **Scroll-spy**: a passive scroll listener with a 35%-of-viewport reading
  line picks the deepest section whose top has crossed the line, then
  `setActiveId` only updates when the candidate differs (avoids re-renders).

### 3. Featured Event — `components/academy/hub/featured-event-section.tsx`

Standalone section between Tabs and Opportunities. `"use client"` for the
countdown timer.

- **Layout**: two-column `rounded-xl` card; left image
  (`aspect-4/3 min-h-[280px]` on mobile, fills column on `lg:`), right
  content column with leaf category pill + dark forest format pill, serif
  h3 title, description, then a vertically-divided icon list (`CalendarDays`
  date, `MapPin` location, `Users` speakers).
- **Countdown**: four `CountdownCard` blocks (Days / Hours / Minutes /
  Seconds) in `bg-forest-900` with serif `tabular-nums`, ticking every
  second against the event's ISO date. The hook hydrates from a stable zero
  state, ticks on mount, and then runs on a one-second interval.
- **CTA**: tangerine `AcademyRegistrationAction` opens the webinar
  registration dialog for the featured session.

### 4. Learning Opportunities — `components/academy/hub/learning-opportunities-section.tsx`

Centered band introducing the four learning categories. Replaces the
in-hero tab strip from the earlier composition.

- **Header**: centered `<EyebrowBadge>` ("LEARNING OPPORTUNITIES") + serif h2
  ("Learning Designed for Real-World Impact").
- **Grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` of icon cards
  (`GraduationCap`/Webinars, `Lightbulb`/Courses tangerine-toned,
  `Users`/Events, `Newspaper`/Blog). Each is a `<Link>` to the matching
  hub anchor with a "Jump to section →" affordance. Icon tone is data-driven
  via `iconTone: "leaf" | "tangerine"` on the content shape so designers can
  reassign emphasis without editing JSX.

### 5. Target Participants — `components/academy/hub/target-participants-section.tsx`

Eyebrow + h2 on the left, supporting paragraph on the right. Below: a 9-card
grid of audience segments (Startups, Farmers, Input Suppliers, etc.),
each with a leaf icon chip + title + 1-line description. Grid:
`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.

### 6. Webinars & Events — `<LearningListingSection id="webinars-events">`

Four `<ContentCard>` items with `type` pill (WEBINAR / TRAINING / LIVE Q&A)
and date pill ("JUN 18"). Disabled "View More" control + count text
("Showing 4 of 26 upcoming webinars & events").

### 7. Courses — `<LearningListingSection id="courses">`

Three `<ContentCard>` items with `level` pill (BEGINNER / INTERMEDIATE /
ADVANCED) and duration pill ("6 WEEKS"). Disabled "View More" + count text.

### 8. Blog — `<LearningListingSection id="blog">`

Three `<ContentCard>` items with `category` pill (INNOVATION / TRADE /
SMART AGRICULTURE) and read-time pill ("5 MIN READ"). Disabled
"View More" + count text. The data lives at `academyContent.blog` and is
typed as `AcademyArticle[]`.

### 9. Testimonials — `<TestimonialsSection>` (shared)

Refactored to accept neutral `TestimonialItem[]` plus optional
`eyebrow / title / description` props. Academy passes its own data;
Home keeps default behaviour.

### 10. FAQ — `<FaqSection>` (shared)

Refactored to accept neutral `FaqItem[]` + `FaqCategory[]` plus optional
header props. Academy passes its own collection; Home keeps default
behaviour.

### 11. CTA — `<CtaSection>` (shared, non-overlap variant)

### 12. Footer — shared layout chrome

## Shared section refactors

Both `TestimonialsSection` and `FaqSection` previously hard-coded
`homeContent` imports. They now accept their data via optional props:

- `<TestimonialsSection items={...} title={...} description={...} />`
- `<FaqSection items={...} categories={...} description={...} />`

Defaults fall back to `homeContent` so existing Home consumers don't
break. Item shapes are typed against neutral `TestimonialItem` /
`FaqItem` / `FaqCategory` aliases in `types/content.ts`.

## Hub catalogue CTAs vs listing pagination

Two different patterns — do not conflate labels:

| Surface                      | Control    | Behaviour                         | Label                           |
| ---------------------------- | ---------- | --------------------------------- | ------------------------------- |
| Hub `LearningListingSection` | `<Link>`   | Navigates to full catalogue route | **Browse all …** + `ArrowRight` |
| Listing `ListingCardGrid`    | `<button>` | Reveals more cards on same page   | **Load more** + `ChevronDown`   |

Hub count copy uses honest framing derived from canonical catalogue lengths,
e.g. `4 highlighted · 7 in the full catalogue` — not invented Figma totals.

## Link policy (2026-06-24)

1. **Navbar** — Academy dropdown children point at listing routes
   (`/academy/webinars`, `/academy/courses`, `/academy/blog`) where built;
   hub tab strip still uses in-page `#` anchors for scroll-spy.
2. **Hub preview cards** — `ContentCard` hrefs use `/academy/{catalogue}/{slug}`.
3. **Featured event Register** — featured webinar detail slug (same as next-live).
4. **Registration / enrolment** — `AcademyRegistrationDialog` opened from
   featured event, webinar detail, and course detail (not partnership enquiry).
   POSTs to `/api/academy/register`; server resolves session title from
   `content/webinars.ts` / `content/courses.ts`. Sanity owns editorial content only.

## CMS / Sanity migration prep

- All Academy section data lives in `content/academy.ts` as
  `academyContent` (hub shell + projections), with canonical catalogues in
  `content/webinars.ts`, `content/courses.ts`, and `content/blog.ts`.
  Page-domain TypeScript contracts live in
  `types/academy.ts` (e.g. `AcademyScheduledItem`, `AcademyCourse`,
  `AcademyArticle`).
- Home Academy preview sections consume the Academy-owned
  `academyHomePreview` projection, also exported from `content/academy.ts`.
  Home should not duplicate Academy event/article collections in
  `content/home.ts` or map deep Academy internals inside Home JSX. In Sanity,
  this becomes a targeted Home preview query.
- Each listing carries a `total` field aligned with the canonical catalogue
  length in `content/{webinars,courses,blog}.ts` for honest "Showing N of M"
  and hub count copy.
- Each item carries a `slug` field so URL generation is content-driven.
- **No React Query.** Server Components fetch from Sanity directly;
  Next caching (`fetch({ next: { revalidate } })` or `unstable_cache`)
  handles invalidation.

## Route + slug architecture

| Route                      | Status    | Notes                                                              |
| -------------------------- | --------- | ------------------------------------------------------------------ |
| `/academy`                 | **built** | Hub — tabs use in-page anchors; cards/CTAs use listing/detail URLs |
| `/academy/blog`            | **built** | See `[blog-spec.md](./blog-spec.md)`                               |
| `/academy/blog/[slug]`     | **built** | 10 static articles; `not-found.tsx` scoped                         |
| `/academy/webinars`        | **built** | Featured + type filters; no Figma — dev-led parity with blog       |
| `/academy/webinars/[slug]` | **built** | 7 static sessions (incl. featured forum)                           |
| `/academy/courses`         | **built** | Featured + level filters                                           |
| `/academy/courses/[slug]`  | **built** | 3 static courses with module list                                  |
| `/academy/search`          | **built** | Unified static search across webinars, courses, articles           |
| `/academy/events`          | **n/a**   | Events catalogue lives under `/academy/webinars`                   |

**Routes are not created speculatively.** Sub-routes appear in the build
manifest only when their designs are implemented. Placeholder pages whose
only purpose is calling `notFound()` are explicitly disallowed (Codex
correction 2026-06-24) — the listing 404 surfaces ungated, the route
slot is created when it has something to render.

## Detail-page shell (shared across tracks)

The Blog detail page is the **visual foundation** for future Academy
detail pages (courses, webinars, events). Each track is a different
editorial product — articles want prose, courses want duration / modules /
enrolment, events want date / location / registration — so we **do not**
collapse them into a universal "AcademyThing" schema or renderer.

Reuse happens at the **layout primitive** level: a small shell component
that defines slots, and per-track section components that fill them with
the track's own metadata and rendering rules.

### Slot composition

```
┌────────────────────────────────────────┐
│ hero / media slot                      │ ← image (blog/courses) or
│                                        │   media+meta band (webinars/events)
├────────────────────────────────────────┤
│ metadata slot                          │ ← chips: category + read-time + date
│                                        │   (blog) / level + duration (courses) /
│                                        │   date + location (events)
├──────────────────────┬─────────────────┤
│ main slot            │ sidebar slot    │ ← prose (blog), modules list (courses),
│                      │                 │   agenda (events). Sidebar is a small
│                      │                 │   panel column on lg:, stacks on mobile.
├──────────────────────┴─────────────────┤
│ related slot                           │ ← related articles (blog),
│                                        │   related courses (course detail), etc.
├────────────────────────────────────────┤
│ cta slot                               │ ← shared `CtaSection`
└────────────────────────────────────────┘
```

### Shell API (sketch)

```tsx
<AcademyDetailShell
  hero={<BlogDetailHero article={article} />}
  metadata={<BlogDetailMetadata article={article} />}
  main={<ArticleBody blocks={article.body} />}
  sidebar={
    <>
      <StayInformedCard />
      <ShareArticleControls article={article} />
    </>
  }
  related={
    <AcademyRelatedSection
      content={blogContent.relatedSection}
      items={getRelatedArticles(article.slug)}
    />
  }
  cta={<CtaSection overlapNext={false} />}
/>
```

Each track ships its own:

- hero component (article = single image; course = image + level + price
  band; event = countdown + venue map embed)
- metadata component (different chip set per track)
- main column renderer (prose vs modules list vs agenda)
- sidebar contents (newsletter+share for blog; enroll panel for courses;
  registration panel for events)
- related projection (blog → related articles via `getRelatedArticles()`;
  course → related courses via `getRelatedCourses()`; webinar → upcoming
  sessions via `getRelatedWebinars()`)

The shell itself owns only the layout (max-w, columns, gaps, sticky
behaviour on the sidebar, `MotionFade` on the hero slot). It does not
inspect or transform the data passed to its slots.

### Why this and not a universal schema

- **Content models are honest.** A `BlogArticle` doesn't have a
  `durationWeeks`, and forcing it onto a generic `AcademyThing` either
  bloats the type with optional fields that are always null per-track or
  leaks track-specific discriminants into every consumer.
- **Renderers are simple.** Each track's main column gets the renderer
  it needs (prose, modules, agenda) instead of a switch statement that
  reads the discriminant and dispatches.
- **Future Sanity migration is per-track.** Each track maps to its own  
  Sanity document type with its own schema. The shell stays code-only.

### Per-track separation

| Track    | Route                      | Content module        | Content type                        |
| -------- | -------------------------- | --------------------- | ----------------------------------- |
| Blog     | `/academy/blog/[slug]`     | `content/blog.ts`     | `BlogArticle` (prose blocks)        |
| Courses  | `/academy/courses/[slug]`  | `content/courses.ts`  | `AcademyCourseDetail` (modules)     |
| Webinars | `/academy/webinars/[slug]` | `content/webinars.ts` | `AcademyWebinar` (session metadata) |

Cross-track content reuse goes through **owned projections** — e.g. the
blog detail's related section consumes `getRelatedArticles()` from
`content/blog.ts`; webinar detail uses `getRelatedWebinars()` from
`content/webinars.ts`. Same pattern Home uses for its Academy spotlight.

## Placeholder hygiene

- Catalogue slugs are meaningful editorial placeholders (e.g.
  `foundations-of-agribusiness`) — no `placeholder-slug-*` URLs in the
  sitemap.
- Hub `countLabel` / `total` values derive from canonical catalogue lengths
  in `content/webinars.ts`, `content/courses.ts`, and `content/blog.ts`.
- Stats and member names are placeholders pending client data (same
  posture as About page).
- Hero image, course/article imagery, and audience icons all use existing
  `lib/placeholder-images.ts` sources to keep the asset surface small.

## Checklist

- [x] Figma frame supplied (2026-06-17)
- [x] Taxonomy locked
- [x] Desktop composition documented
- [x] Mobile composition documented
- [x] Bespoke hero implemented (split title, compound search, decorative ring, NEXT LIVE SESSION card)
- [x] Sticky tabs section with scroll-spy
- [x] Featured Event section with live countdown
- [x] Learning Opportunities band (standalone, not in hero)
- [x] Target Participants grid implemented
- [x] Webinars & Events, Courses, Blog listings implemented
- [x] Shared testimonials + FAQ refactored to neutral types
- [x] No dead route links (navbar + browse-all CTAs + ContentCard hrefs)
- [x] CMS-ready data shapes + slug fields
- [x] Dedicated listing routes built (webinars, courses, blog)
- [x] Slug detail pages built (static scaffold — all three catalogues)
- [x] Hub search navigates to `/academy/search?q=` (unified static search)
- [x] Listing featured + filter bands (webinars + courses; blog already had)
- [x] Browser QA + Lighthouse on hub + three catalogues (+ blog long/short article UX)
- [ ] Sanity wiring + `docs/sanity-academy-spec.md` (**next doc** — content-shape map from `types/` + `content/`)
- [ ] Real photography for hero, courses, blog articles, participant cards
- [ ] Search wired to Sanity / Algolia (beyond `/academy/search` client filter)
