# Academy Page Spec

## Status

Hub page (`/academy`) built against the supplied Figma frame (2026-06-17).
Dedicated listing routes (`/academy/{type}`) and slug pages are scoped for
the **next phase** and intentionally not built here.

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
- **Future routes** (next phase): `/academy/webinars`, `/academy/events`,
  `/academy/courses`, `/academy/blog`, plus
  `/academy/{type}/[slug]` for individual items.

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

## Route + slug architecture (planned, not built)

| Route                    | Status     | Notes                                                                                                                                                                                 |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/academy`               | **built**  | This task                                                                                                                                                                             |
| `/academy/webinars`      | next phase | Full webinars listing                                                                                                                                                                 |
| `/academy/courses`       | next phase | Full courses listing                                                                                                                                                                  |
| `/academy/events`        | next phase | Full events listing                                                                                                                                                                   |
| `/academy/blog`          | next phase | Full articles listing                                                                                                                                                                 |
| `/academy/{type}/[slug]` | next phase | Item detail pages — SSG via `generateStaticParams` over Sanity slugs, `generateMetadata` for SEO, `notFound()` for misses. Adds `loading.tsx` per route and a global `app/error.tsx`. |

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
