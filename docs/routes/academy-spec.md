# Academy Page Spec

## Status

Hub page (`/academy`) built against the supplied Figma frame (2026-06-17).
**Academy track listing routes** (`/academy/webinars`, `/academy/courses`,
`/academy/blog`) share one dark-band hero pattern (`AcademyTrackHeroSection`)
and a `ContentCard` grid; only eyebrow copy and the body below the hero
differ per track. Slug detail pages are incremental — Blog detail ships
first; webinars/courses/event detail reuse `AcademyDetailShell` next.

## Purpose

The Academy is the content-heaviest surface — webinars, training, courses,
events, and articles, all editor-managed via Sanity in the next iteration.
The hub introduces the four learning categories, lists the most recent
items per category, and routes onward via in-page anchors (MVP) until the
dedicated listing pages are built.

## Taxonomy (locked)

- **Hub anchors**: `overview`, `webinars-events`, `courses`, `blog`.
  (Events fold into the Webinars & Events section on the hub; nothing
  lives at `#training` or `#events` in this build.)
- **Track listing routes** (in scope): `/academy/webinars` (webinars +
  events catalogue), `/academy/courses`, `/academy/blog`. Each uses
  `AcademyTrackHeroSection` + track-owned grid; Blog adds featured article
  - category filter on top of the shared grid primitive.
- **Track detail routes** (incremental): `/academy/blog/[slug]` ships first.
  `/academy/webinars/[slug]`, `/academy/courses/[slug]` reuse
  `AcademyDetailShell` when designs are wired — same slots, different
  metadata + main renderers.

### Naming rule: `blog` everywhere in code, "Blog/Insights" in nav

The category that holds articles / thought leadership is named **`blog`**
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

## Track listing routes (shared pattern)

Figma ships one listing template; each track swaps hero copy and grid
data. Implemented primitives:

| Primitive                 | Path                                        | Role                                                                          |
| ------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------- |
| `AcademyTrackHeroSection` | `components/academy/track-hero-section.tsx` | Dark `bg-forest-900` band, leaf `EyebrowPill`, centred serif h1 + description |
| `TrackCardGrid`           | `components/academy/track-card-grid.tsx`    | `ContentCard` grid + View More + count helper                                 |
| `AcademyDetailShell`      | `components/academy/detail-shell/`          | Detail pages only (Blog ships first)                                          |

**Blog** adds track-only bands: `FeaturedArticleSection`, `CategoryFilterBar`,
`BlogListingBody` (filter state + `ArticleGrid` → `TrackCardGrid`).

**Webinars** and **Courses** listing pages are grid-only below the hero for
now. Card `href`s point at hub anchors until `/academy/{track}/[slug]`
detail routes ship (no dead slug URLs).

Hero content shape: `AcademyTrackHeroContent` in `types/academy.ts`
(`{ eyebrow, title, description }`). Per-track copy lives in
`content/{blog,webinars,courses}.ts`.

## Section Composition

Order: Hero → Tabs → Featured Event → Learning Opportunities → Target
Participants → Webinars & Events → Courses → Blog → Testimonials → FAQ →
CTA → Footer.

### 1. Hero — `components/academy/academy-hero-section.tsx`

Bespoke hero, **not** a `PageHero` wrap. Composition:

- **Left column**: tangerine eyebrow pill, serif h1 with the middle phrase
  rendered in `text-leaf-700` accent via a split `{ lead, accent, trail }`
  title shape, body copy, **compound search input**
  (`AcademyHeroSearchForm`: shadcn `DropdownMenu` category selector hidden on
  mobile and inline-flex from `sm:` + `<Input type="search">` + dark
  `bg-forest-900` search button, all wrapped in a rounded `border` shell with
  mock submit + spinner + inline success/error feedback), and a qualitative
  **learner trust row** (avatar stack + practical learning copy, with no public
  learner count until verified metrics are approved).
- **Right column**: `aspect-4/5` image with a tangerine **decorative ring**
  (`size-[220px]`, `lg:` only) anchored top-right, and a floating
  **"NEXT LIVE SESSION" card** absolutely positioned bottom-right on desktop
  (full-width bottom on mobile) — leaf icon chip + `Clock3` glyph + tangerine
  uppercase label + serif event title linking to `#featured-event`.

The component is `"use client"` because the search form needs `onSubmit`
handling and the dropdown selector holds local state. The hero no longer
includes the four-card category strip — that responsibility moved to the
**Learning Opportunities** band (see §4) as a standalone section.

### 2. Tabs — `components/academy/academy-tabs-section.tsx`

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

### 3. Featured Event — `components/academy/featured-event-section.tsx`

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
  state and the first client tick is scheduled via `setTimeout(tick, 0)` so
  no `setState` fires synchronously inside `useEffect` (sidesteps the
  `react-hooks/set-state-in-effect` lint rule cleanly).
- **CTA**: tangerine `<Button>` "Register Now →" linking to `#featured-event`
  for now; flips to the real event detail route in the next phase.

### 4. Learning Opportunities — `components/academy/learning-opportunities-section.tsx`

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

### 5. Target Participants — `components/academy/target-participants-section.tsx`

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

## "No dead link" policy

Codex flagged route 404s as a P1. Two changes resolve it:

1. **Navbar Academy dropdown** in `content/navigation.ts` now points its
   children to in-page anchors (`/academy#webinars-events`,
   `/academy#courses`, `/academy#blog`) instead of `/academy/{type}`
   routes that don't exist yet. Restore route links in the next phase.
2. **"View More" buttons** on the three learning listings are
   disabled `<button type="button" data-state="coming-soon">` controls until the dedicated listing routes
   ship. Flipping each to a `<Link>` is a one-line change per call site
   when the time comes. Implemented in
   `components/academy/learning-listing-section.tsx`.

`ContentCard` instances on the hub still point to in-page anchors
(`#webinars-events`, etc.) so individual card clicks scroll to the
relevant section instead of 404ing. Once slug routes exist they switch to
`/academy/{type}/{slug}`.

## CMS / Sanity migration prep

- All Academy section data lives in `content/academy.ts` as
  `academyContent`, with page-domain TypeScript contracts in
  `types/academy.ts` (e.g. `AcademyScheduledItem`, `AcademyCourse`,
  `AcademyArticle`).
- Home Academy preview sections consume the Academy-owned
  `academyHomePreview` projection, also exported from `content/academy.ts`.
  Home should not duplicate Academy event/article collections in
  `content/home.ts` or map deep Academy internals inside Home JSX. In Sanity,
  this becomes a targeted Home preview query.
- Each listing carries a `total` field so paginated CMS queries don't
  require client-side counting for the "Showing N of M" copy.
- Each item carries a `slug` field so URL generation is content-driven.
- Listing `total` values are deliberately large (26, 18, 42) to seed the
  count copy from the Figma against a small placeholder dataset.
- **No React Query.** Server Components fetch from Sanity directly;
  Next caching (`fetch({ next: { revalidate } })` or `unstable_cache`)
  handles invalidation.

## Route + slug architecture

| Route                                       | Status                     | Notes                                                                                                     |
| ------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| `/academy`                                  | **built**                  | The hub. Tabs in-page link to anchors on this route until each sub-route ships.                           |
| `/academy/blog`                             | **in progress 2026-06-24** | Full articles listing — see [`blog-spec.md`](./blog-spec.md)                                              |
| `/academy/blog/[slug]`                      | **in progress 2026-06-24** | First consumer of the detail shell below. Per-route `not-found.tsx` lives here too.                       |
| `/academy/webinars`                         | designs pending            | Full webinars listing                                                                                     |
| `/academy/courses`                          | designs pending            | Full courses listing                                                                                      |
| `/academy/events`                           | designs pending            | Full events listing                                                                                       |
| `/academy/{webinars,courses,events}/[slug]` | designs pending            | Detail pages — each composes the shared detail shell (below) but with its own content model and renderer. |

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
│ related slot                           │ ← "Continue Learning" (blog),
│                                        │   related events (course detail), etc.
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
  related={<ContinueLearningSection items={relatedCourses} />}
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
- related projection (blog → courses; course → related courses + linked
  events; event → upcoming events + post-event materials)

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

| Track    | Route                      | Content module       | Content type                 |
| -------- | -------------------------- | -------------------- | ---------------------------- |
| Blog     | `/academy/blog/[slug]`     | `content/blog.ts`    | `BlogArticle` (prose blocks) |
| Courses  | `/academy/courses/[slug]`  | `content/academy.ts` | `AcademyCourse` (modules)    |
| Webinars | `/academy/webinars/[slug]` | `content/academy.ts` | `AcademyWebinar` (presenter) |
| Events   | `/academy/events/[slug]`   | `content/academy.ts` | `AcademyEvent` (date+venue)  |

Cross-track content reuse goes through **owned projections** — e.g. the
blog detail's `Continue Learning` section consumes a course preview
projection exported from `content/academy.ts`, not raw `academyContent
.courses`. Same pattern Home uses for its Academy spotlight.

## Placeholder hygiene

- Item slugs use `placeholder-slug-N` form so they're obviously unwired.
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
- [x] No dead route links (navbar + View More + ContentCard hrefs)
- [x] CMS-ready data shapes + slug fields
- [ ] Dedicated listing routes built (next phase)
- [ ] Slug pages built (next phase)
- [ ] Sanity wiring (next phase)
- [ ] Real photography for hero, courses, blog articles, participant cards
- [ ] Search wired to a real query backend
