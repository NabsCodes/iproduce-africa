# Content card — shared spec

A single, reusable image-led card used wherever the site lists learning or
editorial content: featured articles on home, courses, webinars & events,
and articles on the Academy page. Built once now, consumed everywhere later.

## Component

- File: `components/shared/content-card.tsx`
- Primitive deps: `components/ui/card.tsx`, `components/ui/badge.tsx`
- Used in: `components/home/featured-articles-section.tsx` (live), Academy
  page surfaces (next phase).

## Anatomy

```
┌───────────────────────────┐
│  ┌─────────────────────┐  │  <- aspect-4/3 cover image, rounded-[14px]
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

- Outer shell: `Card` with `rounded-[20px] border-border bg-subtle p-4`.
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

| Surface                     | category                                      | meta                 | Notes      |
| --------------------------- | --------------------------------------------- | -------------------- | ---------- |
| Home — Featured Articles    | category (INNOVATION/TRADE/SMART AGRICULTURE) | read time            | Live       |
| Academy — Courses           | difficulty (BEGINNER/INTERMEDIATE/ADVANCED)   | duration ("6 WEEKS") | Next phase |
| Academy — Webinars & Events | type (WEBINAR/TRAINING/LIVE Q&A)              | date ("JUN 18")      | Next phase |
| Academy — Articles          | category                                      | read time            | Next phase |

Each consumer maps its own domain labels to a `tone` — the card doesn't know
or care about category vocabularies.

## Data contract

Each consumer owns its data file (`content/home.ts` already does for
articles; `content/academy.ts` will own the rest). Recommended item shape:

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

- Not a replacement for `AcademyEventCard` in its current shape (date-block,
  no image). When the Academy phase rebuilds events with images, that card
  is retired in favour of this one.
- Not for `CoreFocusCard` (value-chain carousel) — different visual
  language, dedicated component stays.
- Not for partner logos (`PartnerLogo` lives in `components/shared/`).

## Why one card

Three near-identical surfaces in the design were on track to ship as three
separate components, each with its own JSX, hover behaviour, and tag
treatment. Unifying them means: one place to tune hover, one place to swap
the image strategy when Sanity arrives, and one consistent affordance for
visitors clicking a learning tile.
