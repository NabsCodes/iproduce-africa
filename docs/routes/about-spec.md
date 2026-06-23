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
(title+left-image / timeline / right-image). The two side images are
`lg:sticky lg:top-24` and cross-fade between milestone-matched photos as
the user scrolls through the timeline. Active milestone derivation uses
`useInView` from `motion/react` with a centre-of-viewport margin. The
active dot fills `bg-leaf-600`; inactive dots stay outline. Mobile
collapses to a single column — each milestone shows its own image inline
with no sticky behaviour.

### 6. Team — `components/about/team-section.tsx`

Header on the left, description paragraph on the right. Below: embla
`<Carousel>` of team-member cards (`basis-full` mobile, `basis-1/2` sm,
`basis-1/3` lg) with `<CarouselDots>` right-aligned underneath. Each
card: photo (aspect-4/3), name + role row, bio, social icons.

### 7. Advisors — `components/about/advisors-section.tsx`

Left-aligned header block (eyebrow + h2 + description). Then
`lg:grid-cols-2` of horizontal advisor cards. Desktop card: photo left
(square ~`w-36 lg:w-40`), content right (name, bio, role footer with
LinkedIn icon on the right). Mobile card: photo top (`aspect-4/3`),
content stacked below — same internal pieces, achieved with
`flex-col sm:flex-row`.

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

All section data lives in `content/about.ts` as the `aboutPageContent`
object. Type aliases (`AboutStory`, `AboutMissionVisionObjective`,
`AboutImpactStats`, `AboutJourney`, `AboutJourneyMilestone`, `AboutTeam`,
`AboutTeamMember`, `AboutAdvisors`, `AboutAdvisor`) are exported
alongside the data so the upcoming Sanity migration can bind directly.

CMS-readiness highlights: every `image` field is a plain URL,
`journey.milestones[]` each carry their own `leftImage`/`rightImage` so
editors can change a milestone's media without touching code, and
`socials`/`linkedin` keys are optional so missing accounts render nothing
rather than dead icons.

## Placeholder Imagery

`lib/placeholder-images.ts` exposes `placeholderImages.about` with
`story`, `journey.{idea,cohort,expansion,platform,continent,speaker}`,
and `portrait`. Swap out as final assets arrive.

## Placeholder Copy / Metrics

Public traction metrics are intentionally removed from the hero, story, and
impact proof cards until the client approves verified numbers. Team/advisor
names + bios and the journey milestone copy remain placeholders pending client
data. Replace with real values before any production release.

## Checklist

- [x] Figma or approved screenshot supplied (hero + 8-section frame)
- [x] Desktop composition documented
- [x] Mobile composition documented
- [x] Copy structure approved for hero
- [x] Hero route implemented
- [x] Placeholder imagery needs listed for sections
- [x] Story / MVO / Impact / Journey / Team / Advisors built
- [x] CTA + Partners shared sections wired
- [x] Motion adoption scope documented
- [ ] Real photography for team / advisors / journey
- [ ] Story video link wired to a real asset
