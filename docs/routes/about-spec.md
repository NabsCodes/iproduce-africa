# About Page Spec

## Status

Full page UI built against placeholder copy and imagery. Ready for client
review of layout and motion before real data lands.

## Purpose

Introduce iProduce Africa, its mission, history, people, and advisors —
positioning the org as the credible operator behind the wider site.

## Confirmed Inputs

- Route exists at `/about`
- Approved hero screenshot supplied (2026-06-15)
- Eight-section Figma frame supplied (2026-06-17)
- Lead copy and orbit content live in `content/about.ts`
- Shared chrome stays consistent with the public site

## Section Composition

### 1. Hero — `components/about/hero-section.tsx`

Two-column on desktop, stacked on mobile. Left: tangerine eyebrow pill,
mixed-color serif title, muted body copy. Right: ecosystem orbit visual
with browser mockup, three orbit rings, icon badges, decorative dots, and
summary pill. Client feedback on 2026-06-23 removed public traction numbers
for now, so the pill should stay qualitative until verified metrics are
approved.

### 2. Story — `components/about/story-section.tsx`

Two-column on `lg`. Left: rounded image with centered play-button overlay
and a tangerine `DecorativeRing` positioned top-right of the image. Right:
eyebrow, serif h2, two paragraphs, two CTA buttons.

### 3. Mission / Vision / Objective — `components/about/mvo-section.tsx`

Three coloured cards in a `lg:grid-cols-2 lg:grid-rows-2` grid. Mission
(`bg-leaf-subtle`) at row 1 col 1; Vision (`bg-tangerine-subtle`,
`row-span-2`) on the right spanning both rows; Objective (`bg-muted`) at
row 2 col 1. Tangerine `DecorativeRing` bottom-right of the Vision card.
Mobile: single-column stack.

### 4. Impact Proof — `components/about/impact-stats-section.tsx`

Centered header (eyebrow + h2 + description). Then 2x2 on mobile / 1x4 on
desktop of bordered proof cards. While public metrics are not approved, each
card uses a small uppercase label, check icon, and qualitative serif
description. The shared section still supports numeric count-up cards when a
future verified `value` is supplied.

### 5. Journey — `components/about/journey-section.tsx`

The scroll-driven storytelling section. Three-column layout on `lg`
(title+left-image / timeline / right focus panel). Years stay on the
timeline as era markers. The right sticky card shows qualitative
`focusPoints` per milestone (no numeric stats). **Desktop:** sticky right
panel lists focus points for the active milestone. **Mobile/tablet:** timeline
copy only — focus chips hidden. Left image is
`lg:sticky` and cross-fades between milestone-matched photos as the user
scrolls. Active milestone uses scroll position at ~45% viewport; active
dot fills `bg-leaf-600`.

### 6. Team — `components/about/team-section.tsx`

Header on the left, description paragraph on the right. Below: embla
`<Carousel>` of team-member cards (`basis-full` mobile, `basis-1/2` sm,
`basis-1/3` lg) with `<CarouselDots>` right-aligned underneath. Each
card: photo (aspect-4/3), name + role row, clamped `bioSummary` teaser,
**View profile** label with chevron, and social icons outside the click
target.

**Interaction:** the card body is a `<button>` that opens
`PersonProfileDialog` (`components/about/person-profile-dialog.tsx`).
Social icon links use `stopPropagation` so LinkedIn/Facebook do not open
the modal. Cards show up to **two** link socials by priority (LinkedIn
first); email/phone and any remaining links appear in the modal only.
Hover/focus uses a subtle border shift (`border-leaf-300` /
`ring-leaf-400`) — no shadow elevation.

**Data:** roster lives in `content/about-people.ts` (`group: 'team'`);
`content/about.ts` projects members via `getAboutPeopleByGroup('team')`.
Wilson Agaba is intentionally omitted until photo + bio arrive.

### 7. Advisors — `components/about/advisors-section.tsx`

Left-aligned header block (eyebrow + h2 + description). Then
`lg:grid-cols-2` of horizontal advisor cards. Desktop card: photo left
(square ~`w-36 lg:w-40`), content right (name, clamped `bioSummary`,
**Read more** link, role footer with LinkedIn icon on the right). Mobile
card: photo top (`aspect-4/3`), content stacked below — same internal
pieces, achieved with `flex-col sm:flex-row`.

**Interaction:** **Read more** opens the same `PersonProfileDialog`.
Optional `email` / `phone` render in the modal footer only (not on cards).

**Data:** `content/about-people.ts` (`group: 'advisor'`), projected in
`content/about.ts` via `getAboutPeopleByGroup('advisor')`.

### 8. CTA — reuses `<CtaSection />`

### 9. Partners marquee — reuses `<PartnersSection />`

## Motion Adoption

This page is the first home for `motion/react` (the post-Framer package).
Scope is intentionally narrow: **Journey section** (sticky scroll image
cross-fades) and the shared impact/proof cards when numeric values are
approved. We use
`useInView` per milestone, `AnimatePresence` for image cross-fades,
`motion.div` for the cross-fading sticky panel, and `useMotionValue` +
`animate` for future stat counters.

**Rule for future agents:** do not extend `motion/react` to other sections
without a specific UX justification. CSS transitions plus
`IntersectionObserver` cover most needs and keep bundle pressure low.
Motion earns its weight when the design intent is explicitly cinematic.

Reduced-motion: respected via the global `prefers-reduced-motion` rule in
`app/globals.css`. Cross-fades collapse to snaps without breaking layout.

## Data Shapes

Section chrome lives in `content/about.ts` as the `aboutPageContent`
object. **People roster** is canonical in `content/about-people.ts`
(`aboutPeople[]` + `getAboutPeopleByGroup`). Team and advisor `members[]`
are projections filtered by `group: 'team' | 'advisor'` and sorted by
`order`. Changing `group` on a person moves them between sections without
component changes.

Type aliases (`AboutStory`, `AboutMissionVisionObjective`,
`AboutImpactStats`, `AboutJourney`, `AboutJourneyMilestone`, `AboutPerson`,
`AboutPersonGroup`, `AboutTeam`, `AboutAdvisors`) are exported alongside
the data so the upcoming Sanity migration can bind directly.

CMS-readiness highlights: every `image` field is a plain URL,
`journey.milestones[]` each carry their own `leftImage`/`rightImage` so
editors can change a milestone's media without touching code, and
`linkedin` / `facebook` / `email` / `phone` keys are optional so missing
accounts render nothing rather than dead icons. Profile modals use
`bioParagraphs[]`; cards use `bioSummary` only. Contact/social links use
`socials[]` (`platform` + `value`) — email/phone render as icons in the
modal footer with hover title; link platforms show on cards when set.

## Placeholder Imagery

`lib/placeholder-images.ts` exposes `placeholderImages.about` with
`story`, `journey.{idea,cohort,expansion,platform,continent,speaker}`,
and `portrait`. Journey placeholders are theme-matched Unsplash
stand-ins featuring **African people and contexts** (agriculture, cohort
learning, partnerships, digital platform, continental scale) until client
exports real milestone photography to `public/images/about/journey/`.

## Placeholder Copy / Metrics

Public traction metrics are intentionally removed from the hero, story, and
impact proof cards until the client approves verified numbers. Team/advisor
roster uses real bios and photos in `content/about-people.ts` (v1: two
team members, three advisors). **Wilson Agaba** is pending client photo +
bio — add as a registry entry when assets arrive. Journey milestone copy
remains placeholder pending client data.

## Checklist

- [x] Figma or approved screenshot supplied (hero + 8-section frame)
- [x] Desktop composition documented
- [x] Mobile composition documented
- [x] Copy structure approved for hero
- [x] Hero route implemented
- [x] Placeholder imagery needs listed for sections
- [x] Story / MVO / Impact / Journey / Team / Advisors built
- [x] Team + advisor profile dialogs + `about-people.ts` registry
- [x] CTA + Partners shared sections wired
- [x] Motion adoption scope documented
- [x] Real photography for team / advisors (Wilson pending)
- [ ] Real photography for journey milestones
- [ ] Story video link wired to a real asset
