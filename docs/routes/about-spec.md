# About Page Spec

## Status

Full page UI built against placeholder copy and imagery, layout/motion
approved. **Team + Advisors are Sanity-backed** (`teamMember` document
type, Phase 2). **Story and Mission/Vision/Objective are Sanity-backed**
(`aboutPage` singleton, Phase 3) via `fetchAboutPage()`. The complete hero,
eyebrows, CTA destinations, journey timeline, and orbit chrome stay in
`content/about.ts`.

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

Figma-aligned editorial timeline with light scroll guidance. Three-column
layout on `lg` (title + **story images** / timeline / **anchor image**).

**Left story:** per-milestone `image` cross-fades on a **350ms delay** after
the active year settles — text/dot update first, photo follows (no race while
reading). **Right anchor:** single tall sticky `anchorImage` + caption;
desktop only (`lg+`). **Mobile:** timeline text only — no journey images.

Active milestone uses viewport-center proximity (Intersection Observer).

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

**Data:** CMS-fed — `fetchTeamMembers()` returns `{ team, advisors }` split
from one Sanity query by the `teamMember.group` field; `TeamSection`
receives the `team` half as a `members` prop. `content/about-people.ts`
(`group: 'team'`) is the migration-script source, not the live path.
Current core team: Aisha Waziri Umar, Wilson Agaba, Mustapha Yakubu, Umma
Umar, Usman Dagona, and Tobi Seun Ajayi.

### 7. Advisors — `components/about/advisors-section.tsx`

Left-aligned header block (eyebrow + h2 + description). Then
`lg:grid-cols-2` of horizontal advisor cards. Desktop card: photo left
(square ~`w-36 lg:w-40`), content right (name, clamped `bioSummary`,
**Read more** link, role footer with LinkedIn icon on the right). Mobile
card: photo top (`aspect-4/3`), content stacked below — same internal
pieces, achieved with `flex-col sm:flex-row`.

**Interaction:** **Read more** opens the same `PersonProfileDialog`.
Optional `email` / `phone` render in the modal footer only (not on cards).

**Data:** CMS-fed — `AdvisorsSection` receives the `advisors` half of
`fetchTeamMembers()`'s result as a `members` prop.
`content/about-people.ts` (`group: 'advisor'`) is the migration-script
source, not the live path.

### 8. CTA — reuses `<CtaSection />`

### 9. Partners marquee — reuses `<PartnersSection />`

## Motion Adoption

This page uses `motion/react` narrowly on shared impact/proof cards when
numeric values are approved. The **Journey** section uses CSS transitions
for active-year emphasis only — no scroll-jacked image cross-fades.

**Rule for future agents:** do not extend `motion/react` to other sections
without a specific UX justification. CSS transitions plus scroll position
cover most needs and keep bundle pressure low.

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
the data; `AboutPerson` is now also the Sanity `teamMember` fetch layer's
return shape (`lib/sanity/fetch/team-members.ts`).

CMS-readiness highlights: every `image` field is a plain URL,
`journey.milestones[]` carry `image` + `imageAlt` for the left story stack;
`journey.anchorImage` is the stable right-column community frame.
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

**Story media boundary:** The Story poster image/alt and one optional hosted
video URL are editor-managed. The application accepts supported YouTube/Vimeo
links, constructs a privacy-oriented embed URL, and mounts the player only
after a visitor activates the real Play button. A missing or invalid URL shows
the poster without promising unavailable playback. Direct video uploads,
custom hosting, captions/transcripts, and Home video wiring remain separate
requirements.

## Placeholder Copy / Metrics

Public traction metrics are intentionally removed from the hero, story, and
impact proof cards until the client approves verified numbers. Team/advisor
roster uses real bios and photos in `content/about-people.ts` (v1: six
team members, three advisors). Journey milestone copy
remains placeholder pending client data.

## Checklist

- [x] Figma or approved screenshot supplied (hero + 8-section frame)
- [x] Desktop composition documented
- [x] Mobile composition documented
- [x] Copy structure approved for hero
- [x] Hero route implemented
- [x] Placeholder imagery needs listed for sections
- [x] Story / MVO editorial copy + poster image CMS-fed (`aboutPage`, Phase 3)
- [x] Team + advisor profile dialogs + `about-people.ts` registry
- [x] CTA + Partners shared sections wired
- [x] Motion adoption scope documented
- [x] Real photography for team / advisors
- [ ] Real photography for journey milestones
- [x] Story click-to-play component + optional CMS video URL implemented
- [ ] Client supplies and verifies the real Story video URL
