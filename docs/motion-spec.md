# Motion Spec

## Status

Drafted 2026-06-19. Static UI is complete across all six routes; this is the
plan for the motion pass that ships next. Build section by section against
this spec.

## Purpose

Add motion that **clarifies hierarchy, signals interactivity, and rewards
attention** — without turning the marketing site into a showcase. The bar is
"would a serious agribusiness reader feel respected, not entertained." Every
motion choice should justify the bytes it costs and the focus it pulls.

## Locked decisions

- **Library**: `motion/react` (already in `package.json`, used by
  `components/about/journey-section.tsx` and
  `components/shared/impact-stats-section.tsx`). Do not introduce a second
  animation lib.
- **CSS-only first**: hover, focus, dropdown chrome, accordion, marquee, and
  small attention details stay in Tailwind/`@keyframes`. Reach for
  `motion/react` only for entrance choreography, scroll-driven sequences,
  shared-element transitions, and presence (`AnimatePresence`) needs.
- **No page transitions** yet. App Router page transitions add complexity
  without obvious payoff for a static marketing site. Revisit only if a
  specific hand-off demands it.
- **Respect `prefers-reduced-motion`**: every motion primitive must collapse
  to a static equivalent. Marquee already does this in `globals.css`; the new
  primitives must too.
- **No motion on copy**: body paragraphs, eyebrows, and form labels do not
  animate. Title-only fade/rise is allowed; full sentences do not type, slide,
  or stagger.

## Motion categories + budget

| Category          | When                                                            | Tooling                                                    | Examples                                                                           |
| ----------------- | --------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Hover/focus**   | Pointer or keyboard intent on interactive elements              | Tailwind `transition-*`, `duration-200`, `ease-out`        | Card lift, button color, icon chip activation, link underline                      |
| **Entrance**      | First time a section enters viewport                            | `motion/react` `whileInView` + `viewport={{ once: true }}` | Hero title rise, stat card fade-up, benefit grid stagger                           |
| **Scroll-driven** | Sustained relationship between scroll progress and visual state | `motion/react` `useScroll` / `useInView`                   | About Journey (already shipped), Community chat mockup attention tick              |
| **Attention**     | Small loops that signal liveness without demanding focus        | CSS `@keyframes`                                           | Marquee (already shipped), orbit rotation (already shipped), pulse on "LIVE" pills |
| **Presence**      | Mounting/unmounting transitions                                 | `motion/react` `AnimatePresence`                           | Multi-step dialog step swap, success panel reveal, mobile nav sheet                |

**Performance budget** for the motion pass:

- No section should regress Lighthouse Performance below the current baseline
  by more than 2 points. Run `pnpm build` + Lighthouse on `/`, `/about`,
  `/partners` before merging.
- Entrance animations on a single section: max **6 staggered children** before
  collapsing to a single group fade.
- Scroll-driven work uses `useScroll` with a passive container; no
  `requestAnimationFrame` loops outside `motion/react`.
- No animated `box-shadow` or `filter: blur()` on large elements — animate
  `transform` and `opacity` only.

## Accessibility rules

- Wrap every `motion/react` use in a primitive that reads
  `useReducedMotion()` (from `motion/react`) and falls back to a static
  variant. Acceptable patterns:
  - `<MotionFade>` that returns a plain `<div>` when reduced motion is on.
  - Inline guard: `const reduce = useReducedMotion(); const variants = reduce ? {} : {...}`.
- Focus-visible rings must remain instant — never `transition-all`. Use
  `transition-colors transition-transform` so focus outlines are never
  delayed.
- Do not autoplay parallax or scroll-jacking that prevents the user from
  reading at their own pace. Journey's sticky cross-fade is the upper bound;
  do not exceed it.
- Carousels must be pausable: marquee pauses on hover (already shipped); any
  new carousel auto-advance must pause on hover and focus.

## Reusable primitives to add

Co-locate in `components/shared/motion/` so every page consumes the same
helpers:

- `motion-fade.tsx` — fade + small rise on enter; collapses to plain div under
  reduced motion. Props: `delay`, `as`, `className`.
- `motion-stagger.tsx` — wraps children with a `staggerChildren` parent and
  exposes a `<MotionStagger.Item>` for the rise children.
- `motion-count-up.tsx` — extract the existing count-up logic from
  `impact-stats-section.tsx` so future stat surfaces can reuse it without
  copy-paste.
- `use-reduced-motion-safe.ts` (hook) — thin wrapper around
  `motion/react`'s `useReducedMotion` that defaults to `true` during SSR to
  avoid hydration mismatches.

Do **not** add a generic `<AnimateOnScroll>` god-component; it always ends up
overgrown. Keep each primitive narrow.

## Per-section plan

The list below is the build order. Each row says **what to add, what to leave
alone, and the smallest change that hits the goal**.

### Global chrome

| Surface                    | Motion                                                                                                                      | Notes                            |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Header utility/primary bar | Already correct (no animation beyond border on scroll). Add subtle `transition-shadow duration-200` on the scroll boundary. | Don't animate the logo or links. |
| Mobile nav sheet           | Use Radix Dialog defaults (fade + slide). Confirm `prefers-reduced-motion` collapses to plain fade.                         | Already covered by Radix.        |
| Academy dropdown           | Add 120ms fade + 4px rise on open via Radix data attributes (`data-[state=open]:animate-in`).                               | Tailwind-only.                   |
| Footer                     | No motion.                                                                                                                  | —                                |

### Home

1. **Hero** — title fade-up (140ms delay between lead and accent), image
   container settles from `scale-[0.98] opacity-0` to `1 / 1` once. CTA pair
   does not animate.
2. **What we do / Core focus / Two journeys** — section-level entrance fade
   only (`MotionFade`). No per-card stagger; the marquee and carousel already
   carry the kinetic weight.
3. **Featured Articles** — card images get the standard hover lift (already
   present via `<ContentCard>`); no entrance animation needed.
4. **Stay Connected (dark)** — eyebrow + h2 fade-up; social tiles do not
   stagger.
5. **CTA section** — fade-up only; the decorative ring should _not_ spin.

### About

1. **Hero** — title fade-up. Ecosystem orbit already animates; leave it.
2. **Story** — single fade-up.
3. **MVO** — three cards rise in stagger (140ms between).
4. **Impact Stats** — already shipped (count-up). Extract logic to shared
   `motion-count-up` primitive without changing behavior.
5. **Journey** — already shipped (sticky cross-fade). Re-test under reduced
   motion and document the contract in this file as the upper bound for
   scroll-driven work.
6. **Team / Advisors** — section fade-up; cards do not individually animate
   because the carousel/grid is the focus.

### Academy

1. **Hero** — title fade-up; search bar settles with a 200ms delay so it
   reads as a second beat. NEXT LIVE SESSION card scales in from
   `scale-[0.95]` once.
2. **Sticky Tabs** — active pill morphs with `layoutId` for the underline
   indicator. Falls back to instant color swap under reduced motion.
3. **Featured Event countdown** — digits already tick; add a `tabular-nums`
   crossfade between values (`AnimatePresence` keyed on the number) so the
   change reads cleanly. Keep tick interval at 1s.
4. **Learning Opportunities + Participants** — `MotionStagger` on the card
   grid, 80ms between children, capped at 6.
5. **Listings** — section fade-up; individual cards rely on `<ContentCard>`
   hover.

### Community

1. **Hero** — title fade-up; orbit continues to spin (already shipped). Avatar
   row fades in last (240ms delay) so the eye lands on the title first.
2. **Why Join / Member Benefits** — `MotionStagger` on the 6-card grids.
3. **Apply Banner** (×2) — band fade-up; the CTA button does not
   independently animate.
4. **Three Steps** — dashed ring stays static; cards rise in left-to-right
   stagger (`whileInView`).
5. **Who Should Join** — fade-up only.
6. **Community Preview chat mockup** — bubbles rise with stagger (max 5
   visible bubbles, others render instant). Channel chips do not animate.
   "LIVE" pill gets a subtle `animate-pulse` on the dot only, not the text.
7. **Member Stories** — `MotionStagger` on the 4 cards (80ms).
8. **Membership Application section** — fade-up; form fields inside do not
   animate (avoid distracting the user mid-input).
9. **FAQ + CTA** — reuse the global section fade-up pattern.

### Partners

1. **Hero** — title fade-up; the Africa composite image settles with the same
   `scale-[0.98]` reveal as Home hero.
2. **Why Partner / Opportunities** — `MotionStagger` on card grids.
3. **Impact Stats** — already shipped (count-up).
4. **Voices** — testimonial card fades in; logo grid is the marquee/static
   grid as already built.
5. **Inquiry section** — copy column fades in; form card does not animate
   (same rule as Membership Application — never animate live forms).
6. **FAQ + CTA** — global section fade-up.

### Contact

1. **Intro split** — copy column fade-up; form card stays static.
2. **Map embed** — no motion; do not delay-load just to animate it in.
3. **FAQ + CTA** — global section fade-up.

### Dialogs

- **Become a Partner** + **Membership Application** — step body uses
  `AnimatePresence` with `mode="wait"`. Outgoing step fades out, incoming step
  fades in with a 4px rise. Stepper pill (current step indicator) uses
  `layoutId` so the active ring slides between steps. Success panel scales in
  from `scale-[0.96]` once.

## File-by-file delta

| Path                                                            | Change                                                                                                        |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `components/shared/motion/motion-fade.tsx`                      | **New** primitive                                                                                             |
| `components/shared/motion/motion-stagger.tsx`                   | **New** primitive                                                                                             |
| `components/shared/motion/motion-count-up.tsx`                  | **New** primitive — extracted from `impact-stats-section.tsx`                                                 |
| `hooks/use-reduced-motion-safe.ts`                              | **New** hook (SSR-safe wrapper)                                                                               |
| `components/shared/impact-stats-section.tsx`                    | Refactor to consume `motion-count-up`                                                                         |
| `components/about/journey-section.tsx`                          | Re-test reduced motion; no logic change                                                                       |
| `components/{home,about,academy,community,partners,contact}/**` | Wrap section entrances per the per-section plan                                                               |
| `components/shared/multi-step-dialog/*`                         | Add `AnimatePresence` step swap + stepper `layoutId`                                                          |
| `app/globals.css`                                               | Add `@media (prefers-reduced-motion: reduce)` overrides for any new CSS keyframes (none expected, but verify) |
| `docs/design-system.md`                                         | Replace the "Motion is deferred" section with a pointer to this spec                                          |

## Verification

For each page after the motion pass:

1. `pnpm format && pnpm lint && pnpm typecheck && pnpm build`
2. Visual walk at 1440px / tablet / 390px:
   - Entrances trigger once and only once per session.
   - No layout shift caused by motion (entries reserve their space).
   - Hover states still feel snappy (<200ms transitions).
3. Reduced-motion walk: toggle OS-level "Reduce motion" and confirm:
   - All `motion/react` entrances render in their settled state immediately.
   - Marquee + orbit pause / collapse to static.
   - Dialog step transitions are instant.
4. Lighthouse on `/`, `/about`, `/partners` — Performance must not drop more
   than 2 points vs the baseline before this pass.

## Out of scope for this pass

- Page transitions between routes.
- Custom cursor effects.
- Animated SVG illustrations beyond the existing decorative ring rotation.
- Lottie or video-backed motion.
- A motion design system beyond the four primitives listed above.

## Checklist

- [ ] Add the four motion primitives in `components/shared/motion/` + hook
- [ ] Refactor `impact-stats-section.tsx` to consume `motion-count-up`
- [ ] Apply per-section plan: Home → About → Academy → Community → Partners → Contact
- [ ] Add `AnimatePresence` to multi-step dialogs (Partner + Membership)
- [ ] Update `docs/design-system.md` to point at this spec
- [ ] Run verification (build + visual + reduced-motion + Lighthouse) per page
- [ ] Log the motion pass in `docs/implementation-log.md`
- [ ] Tick the Motion item in the Notion dev notes
