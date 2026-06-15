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

The foundations show a full radius ladder, but we only need the values we
actually reuse in code.

Default posture:

- `rounded-xl` for smaller UI and controls
- `rounded-2xl` for most cards and modules
- `rounded-3xl` for larger hero or CTA shells
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

## Motion

Motion is deferred as a system decision for now.

When added later:

- keep it purposeful
- prioritize nav, dropdown, and accordion polish first
- avoid decorative motion that does not improve clarity

## Practical Recommendation

The best move right now is not to rebuild the token system. It is to tighten the
existing one:

1. keep Tailwind v4 for most primitive styling choices
2. keep shadcn semantic variables as the shared component bridge
3. align the exposed brand roles around Leaf, Forest, Sage-like neutrals, and
   Tangerine
4. wait for more exact Figma inspect values before making broader palette
   surgery
