# Design System

This project should use a hybrid system:

- Figma foundations define the visual intent.
- Tailwind v4 and shadcn provide most of the implementation primitives.
- Custom tokens only exist where they add shared meaning across the site.

The goal is a premium, warm, editorial marketing site, not a giant token
machine for a six-page public app.

## Working Rule

- tokenize brand decisions and semantic roles
- let Tailwind handle most typography, spacing, radius, and layout utilities
- keep the code understandable for future agents and human contributors
- avoid rename churn while the static UI is still being actively shaped

## Where The System Lives

- `app/globals.css` owns CSS variables, semantic roles, and Tailwind theme
  bridging
- shared component APIs should live in the primitive that owns them, such as
  `components/ui/button.tsx`
- section and UI components should consume semantic roles first, not one-off
  hex values

When a foundation value changes, update the shared CSS variables or primitive
variant source before patching random component classes.

We do not need a separate `tokens.ts` file for this repo right now. Tailwind v4
already covers most primitive styling, and duplicating those values in
TypeScript would add ceremony without helping the six-page MVP.

## Foundations Translation

### Colour

The foundations image gives us a clear role system:

- `Leaf` is the primary action family
- `Forest` is the depth and dark-surface family
- `Sage` is the neutral surface and border family
- `Tangerine` is the warm accent family
- `Success`, `Warning`, `Error`, and `Info` are state colors

Practical usage:

- use `leaf` for main actions and green highlights
- use `forest` for dark nav/footer surfaces and strong contrast moments
- use semantic neutrals like `bg-subtle`, `bg-muted`, `border-border`, and
  `text-fg-muted` instead of reaching directly into CSS variables
- use `tangerine` as accent, not as the default color for all CTAs
- reserve state palettes for actual status meaning

## Semantic Roles To Prefer

Most components should prefer semantic roles before raw palette classes:

- `bg-background`, `text-foreground`
- `bg-card`, `border-border`
- `bg-subtle`, `bg-panel`
- `text-fg-muted`, `text-fg-subtle`
- `bg-muted`, `text-muted-foreground`
- `bg-primary`, `text-primary-foreground`
- `bg-secondary`, `text-secondary-foreground`
- `bg-accent`, `text-accent-foreground`
- `ring-ring`

Raw palette classes are still useful when the design needs visible brand
expression:

- `leaf` for primary emphasis
- `forest` for contrast
- `tangerine` for warm editorial accents

Brand-tinted semantic surfaces use the same readable Tailwind vocabulary:

- `bg-leaf-subtle`
- `bg-forest-subtle`
- `bg-tangerine-subtle`
- `bg-leaf-emphasized`, `text-leaf-emphasized`, or
  `border-leaf-emphasized` when that stronger role is required

### Tailwind v4 Class Rule

Component JSX should consume values registered through Tailwind's
`--color-*` theme namespace. Do not use arbitrary CSS-variable color classes
when an equivalent theme utility exists.

`border-border` is intentional: the first `border` is Tailwind's property
utility and the second is shadcn's standard semantic color role. For one-pixel
grid separators, use `bg-border`.

Direct CSS variables remain appropriate inside CSS declarations or third-party
style configuration objects where Tailwind classes cannot apply.

## Typography

- `Fraunces` remains the display and heading voice
- `Plus Jakarta Sans` remains the body and interface voice

Implementation rule:

- keep custom font tokens only for the family bridge: `font-serif` and
  `font-sans`
- do not create CSS variables for every type size, weight, or line height
- use Tailwind utilities for text sizing, leading, tracking, and weight

Usage direction:

- serif for hero headlines, section titles, and editorial emphasis
- sans for navigation, paragraphs, metadata, buttons, cards, and forms

The typography should feel expressive, but never theatrical or oversized on
mobile.

## Spacing

The foundations use a 4px base, which already matches Tailwind's spacing
system. We should not mirror the spacing scale in another custom token file.

Rules:

- use Tailwind spacing utilities by default
- only add a custom spacing token if the design repeats a value Tailwind does
  not cover cleanly
- define rhythm through a few section patterns, not a huge spacing map

## Radius

The foundations may show a full radius ladder, but this site uses a tighter
radius cap so the UI stays refined and consistent.

Default posture:

- `rounded-sm` through `rounded-xl` are available when a rectangular surface
  needs corners
- `rounded-xl` is the maximum radius for cards, panels, image frames, hero
  blocks, CTA shells, buttons, chips, inputs, and badges
- do not use Tailwind radius utilities or custom radii above the `xl` scale
- `rounded-full` for pills, avatars, and circular icon buttons

Avoid section-specific radius drift unless the approved design truly depends on
it.

## Elevation

The current `elevation-1` through `elevation-5` utilities are enough as the
bridge from Figma to code.

Use them with restraint:

- most surfaces should use no shadow, `elevation-1`, or `elevation-2`
- deeper elevation is for dropdowns, overlays, or clearly floating modules

## Buttons

`components/ui/button.tsx` remains the source of truth.

Guidance:

- the main action family should stay in `leaf`
- `tangerine` is for selected highlight moments, not every button
- neutral variants should handle quieter utility actions

CTA language should stay consistent:

- `Join our community`
- `Partner with us`

## Decorative Rings

`components/ui/decorative-ring.tsx` owns both accent types. Do not re-inline
equivalent markup in section components.

### Solid ring (`DecorativeRing`)

- SVG circle stroke using `currentColor`.
- Use on **light or mixed surfaces** where a bold brand arc adds depth without
  competing with copy — shared `CtaSection`, testimonials, About story/MVO,
  Partners voices, Community membership orbit.
- Size and color come from the consumer via `className` + optional
  `strokeWidth`. Typical palette: `text-tangerine-500`, `text-leaf-700`.
- Multiple rings on one surface are fine when the approved design calls for
  them (CTA band uses tangerine + leaf at different positions).

### Dashed ring (`DashedDecorativeRing`)

- CSS `border-2 border-dashed border-white/15` on a `rounded-full` div.
- Use on **dark forest panels** only — the accent bleeds off the top-right
  corner inside an `overflow-hidden` / `overflow-clip` container.
- Prefer the shared preset constant rather than duplicating position classes:

```tsx
import {
  darkPanelDashedRingClass,
  DashedDecorativeRing,
} from "@/components/ui/decorative-ring";

<DashedDecorativeRing className={darkPanelDashedRingClass} />;
```

Current consumers: Home Stay Connected, Community Three Steps. Add a new
consumer only when a section matches that same dark-panel + corner-bleed pattern.

### Do not

- Swap dashed for solid (or vice versa) to “reuse something”.
- Override ring primitives with ad-hoc inline borders in section JSX.
- Use dashed rings on the Contact hero or map — those surfaces use photography,
  split layout, or embed chrome instead.

## Cards And Surfaces

Surfaces should feel related across the site.

- keep borders subtle
- prefer soft, confident radii
- let white space and tinted backgrounds do more work than heavy shadows
- only introduce a new card language when the design needs clear contrast

## What We Should Not Overengineer

- no CSS token for every Tailwind font size
- no CSS token for every spacing step
- no second token layer that duplicates Tailwind class names
- no repo-wide rename purely for naming purity while layouts are still in flux
- no hardcoded one-off hex values in section components when a shared role
  already exists

## Imagery

Until final assets arrive:

- use `lib/placeholder-images.ts`
- choose human, credible, agricultural imagery
- prefer faces, hands, learning, trade, and collaboration over generic gear
- keep overlays readable

## Content System

Keep content portable and future-CMS-friendly.

- Home copy and repeated collections live in `content/home.ts`
- secondary page copy lives in its own `content/*.ts` file
- components should consume content, not bury copy in JSX
- Zod schemas, schema-derived form value types, form defaults, and step
  validation maps live in `schemas/`; content/component contracts stay in
  `types/`
- form select options and editable labels stay in `content/` so they can map to
  Sanity fields later without rewriting components
- cross-page previews should be shaped by the source domain, not by the
  consuming component. If Home previews Academy, Academy exports a
  `academyHomePreview` projection from `content/academy.ts`; Home renders that
  projection without duplicating Academy collections or mapping deep Academy
  internals in JSX.
- when Sanity arrives, these static projections become targeted CMS queries
  returning the same simple card/view models.

## System pages

Brand-styled `not-found`, `error`, and `global-error` surfaces, plus the
brand icon set, live in [`routes/system-pages-spec.md`](routes/system-pages-spec.md).
High-level rules:

- System pages render inside the root layout and inherit Header + Footer.
  This is the marketing-site default (Stripe, Notion, Airbnb) — header
  gives free recovery via nav, brand context is preserved, and visitors
  never feel bounced to a different site.
- All three system pages share the same centered-card shape
  (`rounded-xl`, eyebrow pill + serif h1) so the family reads as one set.
- 404 uses a leaf eyebrow + the logo-mark watermark; recoverable error
  uses a tangerine eyebrow + `RefreshCw` chip — same shape, distinct at a
  glance.
- `global-error.tsx` is fully inline-styled (no Tailwind dependency) since
  it runs when the root layout itself has crashed.
- Brand icons follow the Next.js file convention (`app/icon.png`,
  `app/apple-icon.png`, plus share-image files), not `.tsx` route handlers, so
  swapping the mark stays file-based.

## Motion

Motion plan lives in [`motion-spec.md`](motion-spec.md). High-level rules:

- `motion/react` is the only animation library; CSS-first for hover, focus,
  dropdown, and accordion chrome.
- Every `motion/react` use must collapse to a static equivalent under
  `prefers-reduced-motion`.
- Never animate body copy, form fields, or focus rings.
- Title-only fade/rise on section entrance is fine; full text doesn't type,
  slide, or stagger word-by-word.
- Animate `transform` and `opacity` only — no animated `box-shadow` or
  `filter: blur()` on large elements.

Read the spec before adding motion to any new section.

## Practical Recommendation

The best move right now is not to rebuild the token system. It is to tighten the
existing one:

1. keep Tailwind v4 for most primitive styling choices
2. keep shadcn semantic variables as the shared component bridge
3. align the exposed brand roles around Leaf, Forest, Sage-like neutrals, and
   Tangerine
4. wait for more exact Figma inspect values before making broader palette
   surgery
