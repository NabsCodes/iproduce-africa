# Blog (Academy → Blog) Spec

## Status

Drafted 2026-06-24, updated after listings pass. **Static-first** — placeholder
content under `content/blog.ts`, no Sanity in this milestone.

Blog is one **Academy catalogue** alongside Webinars and Courses. All three
listing routes share `AcademyListingHeroSection` (dark forest band + leaf
eyebrow pill). Each adds a featured band and filter pills on top of the shared
`ListingCardGrid` / `ContentCard` grid. See
[`academy-spec.md` → Listing routes](./academy-spec.md#listing-routes-shared-pattern)
for the cross-catalogue pattern; this file owns Blog-only behaviour (article
body blocks, sidebar, article SEO).

## Purpose

Make the Academy track's editorial output (long-form articles, market
insights, commentary) browsable and shareable. Gives the iProduce voice a
credible home for analysis pieces separate from the time-bound events /
training catalogue, and seeds a cross-promotion path into the paid Academy
courses via the detail page's related section.

## Confirmed inputs / constraints

- Lives at `/academy/blog` (listing) and `/academy/blog/[slug]` (detail) —
  inside the Academy parent surface.
- **Academy navbar architecture**: the Academy dropdown items currently
  point at hash anchors on `/academy`. The migration is **incremental** —
  repoint the Blog item now, leave the other three (Webinars / Courses /
  Events) as anchors until they ship. See [Navbar + footer migration](#navbar--footer-migration).
- Static-first MVP: no Sanity, no live submissions, no comments, no auth.
  Newsletter signup is placeholder UI (matches the footer newsletter form).
- Reuse existing primitives: `ContentCard`, `EyebrowPill`, `SiteCtaButton`,
  `CtaSection`. Motion primitives (`MotionFade`, `MotionStagger`) apply on
  day one — the full motion pass is shipped.
- **Shell-driven detail layout**: the blog detail page composes the shared
  Academy detail shell (slots: hero/media, metadata, main+sidebar, related,
  CTA). Future course / webinar / event detail pages reuse the same shell
  but fill the slots with their own metadata and renderers. **No universal
  "AcademyThing" component.**

## Routes (this pass)

| Route                  | File                               | Status                                                                                 |
| ---------------------- | ---------------------------------- | -------------------------------------------------------------------------------------- |
| `/academy/blog`        | `app/academy/blog/page.tsx`        | **In scope today**                                                                     |
| `/academy/blog/[slug]` | `app/academy/blog/[slug]/page.tsx` | **Shipped** — `generateStaticParams` over slugs                                        |
| Per-route 404          | `app/academy/blog/not-found.tsx`   | **Shipped** — first consumer of the deferred per-route 404 from `system-pages-spec.md` |

Sibling listing routes (shared hero, grid-only body for now):

| `/academy/webinars` | `app/academy/webinars/page.tsx` | **Shipped** — cards link to hub until slug pages ship |
| `/academy/courses` | `app/academy/courses/page.tsx` | **Shipped** — cards link to hub until slug pages ship |

Webinar / course **detail** routes are the next increment on
`AcademyDetailShell`. Events share the webinars track (no separate
`/academy/events` listing).

## Page 1 — Listing `/academy/blog`

### Section order

1. **Hero band** — full-width `bg-forest-900` (dark), centred content.
   Eyebrow pill: `INSIGHTS & RESOURCES`. Serif h1: _"Ideas Shaping African
   Agribusiness"_. Subtitle: _"Explore trends, perspectives, and practical
   insights driving innovation and growth across Africa's agricultural
   ecosystem."_ Generous vertical padding (~`py-20 sm:py-24`).
2. **Featured Article** — split layout, image left (rounded-xl, aspect
   ~5/4 on lg), content right: small `FEATURED ARTICLE` eyebrow + serif
   h2 + category chip + read time + 2-line description + outlined
   `Read more →` CTA. Stacks image-over-content on mobile.
3. **Category filter bar** — horizontal scroll on mobile, wraps on `sm+`.
   `All` (default, leaf-fill active state) + the **eight** categories from
   the design (see [Category set](#category-set)). Reuses the existing
   `Tabs`/pill primitive shape — same family as Academy's tab strip.
4. **Article grid** — 3-column on `lg:`, 2 on `sm:`, 1 on mobile.
   Existing `ContentCard` shape (image top, `category` chip + `meta` =
   read time, title, description). Hover lift already present.
5. **View More** — outlined button below the grid. The helper text below
   it (e.g. _"Showing 3 of 12 articles"_) **must reflect the actual
   collection count** — never hardcode "42" or any unconfirmed number. If
   the count helper is uncomfortable to ship until editorial volume is
   real, hide it entirely (the design's "42 articles" line is a placeholder
   and **must not** be published verbatim).
6. **Shared CTA** — existing `CtaSection`. The design shows the same dark
   `Let's Build the Future of Agriculture Together` band + "Partner with
   us" CTA we already ship.

### Featured-article selection rule

A single field on the listing content: `featuredArticleSlug: string | null`.
The listing resolves to the article matching that slug; if `null` or no
match, fall back to the **most recent article** by `publishedAt`.

Avoid `isFeatured: true` booleans on articles — that pattern guarantees
two articles will eventually both be flagged true and create ambiguity. A
single pointer is unambiguous and maps cleanly to a Sanity reference
later.

### Motion (inherits the shipped pass)

- Hero: dark band fades up once (`MotionFade`, single block).
- Featured article: `MotionFade` on the right-hand content column;
  image stays static.
- Category filter: no entrance motion (chips are interactive controls).
- Grid: header `MotionFade`; the ContentCard grid uses `MotionStagger`
  (cap 6 by default — first 6 stagger, remainder instant per spec rule).
- View More + CTA + footer: standard fades from the global pass.

## Page 2 — Detail `/academy/blog/[slug]`

Composes the shared Academy detail shell described in
[`academy-spec.md` → Detail-page shell](./academy-spec.md#detail-page-shell-shared-across-tracks).
Blog fills the slots like so:

| Slot               | Blog content                                                                                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **hero/media**     | Full-width hero image, ~aspect 21/9 on `lg:`, 16/9 on mobile, `rounded-xl`. No overlay text.                                                                               |
| **metadata**       | Category chip + read time + publish date (e.g. _"Jun 12, 2026"_, formatted via `Intl.DateTimeFormat`). No `date-fns`.                                                      |
| **main + sidebar** | Two-column on `lg:` (`grid-cols-[1fr_320px]`, `gap-12`), single column on mobile. Main = `<ArticleBody />`. Sidebar = `<StayInformedCard />` + `<ShareArticleControls />`. |
| **related**        | **"More from the blog"** — 3 related _articles_ via shared `AcademyRelatedSection`.                                                                                        |
| **cta**            | Shared `CtaSection`.                                                                                                                                                       |

### Article body

Lives in the main column. Plain prose — paragraphs, h2 subheadings,
bulleted and numbered lists. No pull-quotes or callout boxes in the
designs.

Body content is **structured blocks** (not MDX/HTML strings) — see
[Content shape](#content-shape) below.

### Sidebar — Stay Informed + Share Article

`<StayInformedCard />`: eyebrow + 1-sentence description + email input +
tangerine send-icon button. Mirrors the footer newsletter signup exactly
(placeholder UI; not wired).

`<ShareArticleControls />`: row of round icon buttons. **Drop Instagram —
it has no public web share intent and would be a dead control.** Ship the
four that actually work:

| Control     | Action                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------ |
| WhatsApp    | `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`                                            |
| LinkedIn    | `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`                              |
| X (Twitter) | `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`                        |
| Copy link   | `navigator.clipboard.writeText(window.location.href)` + toast confirmation via existing `sonner` |

If the page is rendered inside a browser that exposes
`navigator.share()` (most mobile browsers), the X icon can swap to a
single "Share" button using the native sheet. Detect at runtime
(`typeof navigator !== "undefined" && "share" in navigator`), fall back
to the X intent otherwise.

### Related section

Blog detail related content is **same-track articles**, not cross-promoted
courses. Heading and copy live in `blogContent.relatedSection`; items come
from `getRelatedArticles(slug)` in `content/blog.ts`. Rendered via shared
`AcademyRelatedSection` (`components/academy/listings/academy-related-section.tsx`).

Course and webinar detail pages use the same related primitive with their
own `getRelatedCourses()` / `getRelatedWebinars()` projections.

### Motion

- Hero image: `MotionFade` with `scaleFrom={0.98}`, `duration={0.48}` —
  spec's single-featured-panel rhythm.
- Article body, sidebar, share controls: **no entrance motion** — per
  spec rule "motion density decreases as content density increases".
  Sidebar's sticky positioning is the only kinetic detail.
- Related section: header `MotionFade` + `MotionStagger` on the 3-card
  grid.
- CTA + footer: standard.

## Category set

The design shows **eight** categories (Codex correction — earlier draft
missed _Community_):

`Innovation`, `Trade`, `Smart Agriculture`, `Agribusiness`, `Policy`,
`Market Insights`, `Sustainability`, `Community`.

Plus the `All` chip in the filter bar.

The TypeScript category type is **derived from the data**, not
hand-maintained:

```ts
// content/blog.ts
export const blogCategories = [
  "Innovation",
  "Trade",
  "Smart Agriculture",
  "Agribusiness",
  "Policy",
  "Market Insights",
  "Sustainability",
  "Community",
] as const;
```

```ts
// types/blog.ts
import { blogCategories } from "@/content/blog";
export type BlogCategory = (typeof blogCategories)[number];
```

Editorial can grow the list by appending to `blogCategories` — the type
follows.

## Content shape

**`types/blog.ts`** — contracts only:

```ts
import type { blogCategories } from "@/content/blog";

export type BlogCategory = (typeof blogCategories)[number];

export type BlogArticleBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading2"; text: string }
  | { kind: "list_unordered"; items: readonly string[] }
  | { kind: "list_ordered"; items: readonly { title: string; body: string }[] };

export type BlogArticle = {
  slug: string;
  title: string;
  category: BlogCategory;
  readTimeMinutes: number; // renders as "5 MIN READ"
  publishedAt: string; // ISO 8601 → formatted via Intl.DateTimeFormat
  image: string;
  imageAlt: string;
  excerpt: string;
  body: readonly BlogArticleBlock[];
};

export type BlogPageContent = {
  hero: { eyebrow: string; title: string; description: string };
  newsletter: { eyebrow: string; description: string };
  featuredArticleSlug: string | null;
  articles: readonly BlogArticle[];
};
```

**`content/blog.ts`** — data only. Imports its types from `types/blog.ts`;
does not declare types itself.

```ts
import type { BlogArticle, BlogPageContent } from "@/types/blog";

export const blogCategories = [
  /* the 8 categories above */
] as const;

const articles: readonly BlogArticle[] = [
  /* 9–12 placeholder articles */
];

export const blogContent: BlogPageContent = {
  hero: {
    /* ... */
  },
  newsletter: {
    /* ... */
  },
  featuredArticleSlug: "unlocking-intra-african-trade",
  articles,
};
```

### Date formatting

Use `Intl.DateTimeFormat`. Adding `date-fns` for a single date format
is unjustified weight.

```ts
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
// "Jun 12, 2026"
```

Hoist to module scope so the formatter is built once.

## Sanity migration (post-MVP, documented for the doc)

Structured blocks are **not** a drop-in Portable Text shape. Sanity's
Portable Text uses `_type`-discriminated objects with span-marked text;
our `BlogArticleBlock` is a simpler tagged union. The CMS migration will
need either:

- a small **adapter** that maps Portable Text → `BlogArticleBlock`
  (cleanest: keep the renderer stable, swap data source), or
- a **GROQ projection** that emits `BlogArticleBlock`-shaped output
  directly (cleaner Sanity-side; more brittle if Sanity schemas change).

Either works. The renderer is the asset to protect — keep it pure on
the `BlogArticleBlock` shape regardless of source.

## Navbar + footer migration

The Academy dropdown and the footer's Academy column both currently
point Blog at `/academy#blog`. Migrate **only the Blog entry** in this
pass:

| Surface | File                    | Before          | After (this pass)  |
| ------- | ----------------------- | --------------- | ------------------ |
| Navbar  | `content/navigation.ts` | `/academy#blog` | `/academy/blog` ✅ |
| Footer  | `content/site.ts`       | `/academy#blog` | `/academy/blog` ✅ |

**Blog/Insights stays in both the navbar dropdown and the footer Academy
column** — keep the existing IA. Don't remove it from the footer because
the design composition for Webinars/Trainings/Courses/Events doesn't
include it; we're not in a position to drop discoverability without
explicit editorial direction.

Webinars / Courses / Events footer + navbar entries keep their hash
anchors until those routes ship. Repointing those would surface a 404 in
chrome — worse UX than the current anchor scroll.

## File-by-file delta

| Path                                                      | Action                                                                                                               |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `app/academy/blog/page.tsx`                               | **New** — listing                                                                                                    |
| `app/academy/blog/[slug]/page.tsx`                        | **New** — detail; `generateStaticParams` over `content/blog.ts`, `notFound()` on misses                              |
| `app/academy/blog/not-found.tsx`                          | **New** — scoped 404 (Blog-specific CTAs: browse all + back to Academy hub)                                          |
| `content/blog.ts`                                         | **New** — data + the `blogCategories` const                                                                          |
| `types/blog.ts`                                           | **New** — contracts (BlogCategory derived from data, BlogArticleBlock, BlogArticle, BlogPageContent)                 |
| `components/academy/blog/blog-hero-section.tsx`           | **New** — dark band hero                                                                                             |
| `components/academy/blog/featured-article-section.tsx`    | **New** — split layout                                                                                               |
| `components/academy/blog/category-filter-bar.tsx`         | **New** — pill chips with `useState` for active category                                                             |
| `components/academy/blog/article-grid.tsx`                | **New** — ContentCard grid + View More                                                                               |
| `components/academy/blog/article-body.tsx`                | **New** — `BlogArticleBlock` renderer                                                                                |
| `components/academy/blog/stay-informed-card.tsx`          | **New** — sidebar newsletter placeholder                                                                             |
| `components/academy/blog/share-article-controls.tsx`      | **New** — 4 working share targets (WhatsApp / LinkedIn / X / copy-link) with optional native-share swap              |
| `components/academy/listings/academy-related-section.tsx` | **Shared** — related cards band (blog articles, courses, webinars)                                                   |
| `components/academy/listings/academy-detail-shell.tsx`    | **Shared** — slot layout shell for all Academy detail routes (see `academy-spec.md`)                                 |
| `content/blog.ts`                                         | `getRelatedArticles()` + `blogContent.relatedSection` — blog detail does not cross-import course data                |
| `content/navigation.ts`                                   | Repoint Blog/Insights from `/academy#blog` → `/academy/blog`                                                         |
| `content/site.ts`                                         | Repoint footer Academy column's Blog/Insights entry                                                                  |
| `content/seo.ts`                                          | Add `pageSeo.blog` (listing); detail-page metadata generated per slug via `generateMetadata`                         |
| `app/sitemap.ts`                                          | Add `/academy/blog` + one entry per article slug (auto from `content/blog.ts`)                                       |
| `docs/routes/academy-spec.md`                             | Add a "Detail-page shell (shared across tracks)" section (see below); update route table to mark Blog as in progress |
| `docs/routes/blog-spec.md`                                | **This file**                                                                                                        |
| `docs/implementation-log.md`                              | One row when the build ships                                                                                         |

## Open questions for the user

Only ones still load-bearing after the Codex review:

1. **Category set future-proofing** — the eight are locked for the MVP.
   Confirm editorial doesn't expect more in the immediate next pass.
2. **Featured article identity** — resolved: `unlocking-intra-african-trade`.

## Out of scope (this pass)

- Sanity wiring — content stays in `content/*.ts`; separate Sanity spec after UI sign-off.
- Global search backend — hub search navigates to `/academy/search?q=`; client filter only.
- Author / tag / archive-by-month pages.
- Comments / reactions.
- Real newsletter wiring.
- Auto-calculated read time (`readTimeMinutes` is authored).
- RSS feed.

## Verification

1. `pnpm format && pnpm lint && pnpm typecheck && pnpm build` — clean.
2. Routes resolve in the build manifest: `/academy/blog` and one entry
   per article slug; no orphan Webinars/Courses/Events routes.
3. Browser walk at 390 / tablet / 1440:
   - Listing: dark hero reads cleanly, 8 category pills wrap on `sm+` and
     horizontal-scroll on mobile, grid is 1/2/3 columns, View More
     doesn't shift layout, helper count reflects actual collection size.
   - Detail: hero scales without overflow, sidebar sticks on `lg:` and
     stacks on mobile, share controls fire (test each: WhatsApp opens
     wa.me, LinkedIn opens sharing URL, X opens intent, copy-link copies
     and toasts), related article cards link to
     `/academy/blog/{slug}`.
4. Reduced-motion sweep: hero image scale-in collapses; related stagger
   collapses; sidebar sticky behaviour stays.
5. Per-route 404: visit `/academy/blog/does-not-exist` → blog-scoped
   not-found, not the root one.
6. Lighthouse on `/academy/blog` and one detail page (record in the
   implementation-log row).

## Checklist

- [x] Open questions resolved (related: same-track articles via `AcademyRelatedSection`; categories locked for MVP; featured slug: unlocking-intra-african-trade)
- [x] `types/blog.ts` (contracts) + `content/blog.ts` (data) — no type/data overlap
- [x] `app/academy/blog/page.tsx` + `[slug]/page.tsx` + `not-found.tsx`
- [x] Shared detail shell at `components/academy/listings/academy-detail-shell.tsx` — slots: media, metadata, main+sidebar, related, CTA
- [x] Blog-specific section components (hero, featured, filter, grid, body, sidebar cards, share, related articles)
- [x] Related section consumes `getRelatedArticles()` — no duplicate article arrays in `content/blog.ts`
- [x] Share controls drop Instagram; ship working WhatsApp + LinkedIn + X + copy-link (+ optional native-share swap on mobile)
- [x] `Intl.DateTimeFormat` for date rendering; no `date-fns`
- [x] View More helper text matches actual collection count
- [x] Hub search → `/academy/search?q=` (not catalogue `?q=` filters)
- [x] `ListingCardGrid` uses **Load more** label (not hub **Browse all**)
- [x] Related article cards → `/academy/blog/{slug}`
- [x] Footer + navbar Blog entries repointed to `/academy/blog`
- [x] Webinars / Courses navbar entries → listing routes (not hub hashes)
- [x] `sitemap.ts` + `seo.ts` updated; `generateMetadata` per slug for detail (article OG type + publishedTime + hero image)
- [x] Sanity migration boundary documented inline + spec note in this file's "Sanity migration" section
- [x] Motion primitives applied per the rules above
- [x] Implementation-log row + academy-spec aligned (listings pass 2026-06-24)
- [ ] Verification sweep + Lighthouse row
