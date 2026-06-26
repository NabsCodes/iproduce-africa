# Home Page Static Spec

This is the active milestone for the iProduce Africa website.

## Goal

Translate the approved Home page design into a polished static Next.js
implementation with strong desktop and mobile fidelity.

## Files In Scope

- `app/page.tsx`
- `components/home/*` — section files are named after their eyebrow or section role:
  - `hero-section.tsx` — top hero
  - shared `partners-section.tsx` — eyebrow: "Our partners", placed directly below hero on Home
  - `what-we-do-section.tsx` — eyebrow: "What we do"
  - `core-focus-section.tsx` — eyebrow: "Core areas of focus"
  - `core-focus-card.tsx` — card used by core focus rail
  - `why-join-us-section.tsx` — eyebrow: "Why join us"
  - `why-join-service-card.tsx` — card used by the Why Join Us image-led grid
  - `two-journeys-section.tsx` — eyebrow: "Your pathway"
  - `academy-spotlight-section.tsx` — eyebrow: "Academy spotlight"
  - `stay-connected-section.tsx` — eyebrow: "Stay connected"
  - `featured-articles-section.tsx` — eyebrow: "Featured article"
- Shared primitives only when a Home page need genuinely earns reuse
- `content/home.ts`
- `lib/placeholder-images.ts`
- Shared chrome only when Home requirements reveal a shell-level issue

## Must Keep True

- Build on the current scaffold work already in the repo
- Keep editable copy and repeated collections in `content/home.ts`
- Use temporary centralized imagery where final assets are unavailable
- Preserve `/about`, `/academy`, `/community`, `/partners`, and `/contact`
  scaffolds
- Use `Join our community` as the Home hero CTA while client review is focused
  on the member pathway. Keep partner interest available through lower-page,
  nav, footer, or Partners/Contact routes where the audience has more context.

## Do Not Add In This Milestone

- Sanity integration
- Backend data fetching
- Authentication
- Payments, donations, or e-commerce
- Dashboards
- Community-channel integrations
- Invented partner names, statistics, or submission workflows

## Section Review Checklist

Every Home section should be checked against the approved desktop design for:

- typography
- spacing
- color usage
- radius and card treatment
- imagery and crop behavior
- CTA hierarchy
- section height and vertical rhythm

Every Home section should also be checked at 390px and tablet widths in the
same implementation pass. Desktop-first references are useful, but they do not
complete a section until the mobile composition, card density, CTA stacking, and
horizontal overflow behavior are also intentional.

Current fidelity notes from the approved hero and what-we-do references:

- the hero eyebrow uses a shared pill treatment, not one-off inline markup
- the Home hero uses the provided local public asset when available instead of a
  placeholder image source
- the Home hero now carries a single `Join our community` CTA. Its former
  numeric traction cards have been replaced with qualitative proof points
  until the client approves real metrics for public use.
- the what-we-do section should keep its original left editorial panel and
  right capability grid structure unless a new approved screenshot says
  otherwise
- capability icons in the what-we-do grid should stay neutral by default and
  flip to the green active state only on hover
- hover treatment in the what-we-do area should stay subtle and premium, not
  turn the grid into heavy marketing cards
- the two-journey section remains a static side-by-side pathway composition on
  desktop rather than a carousel
- the Core Focus strip uses the shared Embla-based carousel primitive for now,
  with the cards still feeling like a calm horizontal rail rather than a heavy
  slider
- its pagination count and active state must come from the real carousel snap
  points, never from a hard-coded dot count
- touch, trackpad, keyboard, and pagination-dot navigation should feel smooth
  without hijacking normal vertical page scroll
- pagination dots remain the only visible custom navigation controls
- Core Focus card presentation belongs in a Home-specific reusable component,
  while the pagination indicator stays in `components/ui`

Latest Home implementation order after the June 24 review:

- Home order is now: Hero, Partners, What we do, Core Focus, Why join us, Your
  pathway, Academy spotlight, Testimonials, Stay connected, FAQ, Featured
  articles, CTA.
- Partners sits directly under the hero in a pale `forest-subtle` band with
  normal Home section rhythm. The old extra top padding is only for pages where
  a preceding CTA overlaps the partner band.
- Why Join Us is an image-led 2×2 grid placed after Core Focus and before Your
  pathway.
- Academy spotlight keeps the same heading/tabs intent but its items now use
  the shared image-led `<ContentCard />` treatment instead of the old date-block
  `AcademyEventCard`.
- Academy spotlight shows a four-card desktop row where space allows, then
  falls back to two cards on tablet and one card at 390px.
- Stay connected is a dark rounded Home module between Testimonials and FAQ.
  It presents Instagram, Facebook, and YouTube cards using the shared
  `content/site.ts` social-link source. Do not invent final URLs; cards remain
  disabled/coming-soon when a social `href` is still unconfirmed.

The mobile version must be treated as its own composition. Reorder, restack,
and resize intentionally instead of shrinking the desktop layout.

## Interaction QA

Before the Home page milestone is considered done, verify:

- mobile navigation
- Academy dropdown
- FAQ category filtering
- FAQ accordion open and close behavior
- all visible links
- no horizontal overflow at 390px

## Handoff Requirement

When this milestone is complete, report:

- files changed
- checks run
- remaining placeholders
- anything required before starting About Us
