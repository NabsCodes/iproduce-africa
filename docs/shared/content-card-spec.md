# Content card — shared spec

A single, reusable image-led card used wherever the site lists learning or
editorial content: featured articles on home, courses, webinars & events,
and articles on the Academy page. It is now the shared card for Home previews,
Academy hub previews, listing pages, related content, and search results.

## Component

- File: `components/shared/content-card.tsx`
- Primitive deps: `components/ui/card.tsx`, `components/ui/badge.tsx`
- Used in: `components/home/academy-spotlight-section.tsx`,
  `components/home/featured-articles-section.tsx`,
  `components/academy/hub/learning-listing-section.tsx`,
  `components/academy/listings/listing-card-grid.tsx`,
  `components/academy/listings/academy-related-section.tsx`, and
  `components/academy/search/academy-search-results.tsx`.

## Anatomy

```
┌───────────────────────────┐
│  ┌─────────────────────┐  │  <- aspect-4/3 cover image, rounded-xl
│  │      cover image    │  │
│  └─────────────────────┘  │
│                           │
│  ◉ PRIMARY  • SECONDARY    │  <- primary Badge (tone'd) + optional outline pill
│                           │
│  Serif title goes here    │
│                           │
│  One line of description  │
└───────────────────────────┘
```

- Outer shell: `Card` with `rounded-xl border-border bg-subtle p-4`.
- Image: `next/image` in `fill` mode inside an `aspect-4/3` rounded frame.
  Group hover lifts to `scale-[1.02]`.
- Tags row: primary `<Badge>` (tone'd) + optional secondary outline pill.
- Title: serif, `text-lg leading-[26px]`. Hover shifts to `text-leaf-700`.
- Description: muted, `text-sm leading-[22px]`.
- The full card is a `<Link>` to `href`. Single click target, no nested
  interactive elements.

## Props

```ts
type ContentCardTone = "tangerine" | "leaf" | "forest";

type ContentCardProps = {
  image: string;
  imageAlt?: string;
  href: string;
  category: string;
  categoryTone?: ContentCardTone;
  meta?: string;
  title: string;
  description?: string;
  className?: string;
};
```

`categoryTone` maps to existing `Badge` variants (`leaf` / `forest` /
`tangerine`). Default is `tangerine`.

`meta` renders as a neutral outline pill (no tint) so the category pill
always reads as the dominant signal.

## Consumers

| Surface                     | category                                      | meta                 | Notes |
| --------------------------- | --------------------------------------------- | -------------------- | ----- |
| Home — Academy spotlight    | type (WEBINAR/TRAINING/LIVE Q&A)              | date ("JUN 18")      | Live  |
| Home — Featured Articles    | category (INNOVATION/TRADE/SMART AGRICULTURE) | read time            | Live  |
| Academy — Courses           | difficulty (BEGINNER/INTERMEDIATE/ADVANCED)   | duration ("6 WEEKS") | Live  |
| Academy — Webinars & Events | type (WEBINAR/TRAINING/LIVE Q&A)              | date ("JUN 18")      | Live  |
| Academy — Articles          | category                                      | read time            | Live  |
| Academy — Search / Related  | source-specific label                         | source-specific meta | Live  |

Each consumer maps its own domain labels to a `tone` — the card doesn't know
or care about category vocabularies.

## Data contract

Each consumer owns or projects its own data file: Home uses `content/home.ts`,
Academy hub previews come through `content/academy.ts`, and the canonical
catalogues live in `content/blog.ts`, `content/webinars.ts`, and
`content/courses.ts`. Recommended item shape:

```ts
type LearningContentItem = {
  category: string; // or "level" / "type"
  readTime?: string; // or "duration" / "date"
  title: string;
  description: string;
  image: string;
  href: string;
};
```

The CMS migration replaces the inline arrays with Sanity queries that return
the same shape — the card and section components stay untouched.

## What this card is _not_

- Not for date-block-only event lists. The June 17 Home design changed the
  Home Academy spotlight to image-led cards, so that Home surface now uses this
  component.
- Not for `CoreFocusCard` (value-chain carousel) — different visual
  language, dedicated component stays.
- Not for partner logos (`PartnerLogo` lives in `components/shared/`).

## Why one card

Three near-identical surfaces in the design were on track to ship as three
separate components, each with its own JSX, hover behaviour, and tag
treatment. Unifying them means: one place to tune hover, one place to swap
the image strategy when Sanity arrives, and one consistent affordance for
visitors clicking a learning tile.
