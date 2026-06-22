# Motion Spec

## Status

Drafted 2026-06-19. Refreshed 2026-06-22 after client MVP sign-off and the
system-pages / OG-share work shipped. Build section by section against
this spec.

**Where we are**

- Motion pass Slices A–E shipped in code (primitives, all six routes, dialogs,
  Academy tabs/countdown, scroll reveals).
- Remaining: browser QA + reduced-motion sweep. Lighthouse optional.
- CMS migration does **not** block or change motion — primitives wrap JSX
  regardless of whether copy comes from `content/*.ts` or Sanity later.

**Order this fits inside (post-MVP queue):**

1. **Motion pass** _(this spec)_ — system-level, restrained, brand-on.
2. **Combobox swap** — _one_ shared searchable select pattern, used only
   where it earns its keep (countries, sectors, future Academy filters).
   Do not blanket-replace small selects.
3. **Blog / article pages** — designs are now available. Build static
   surfaces first, wire to Sanity later. The motion primitives from
   step 1 apply here on day one.
4. **CMS migration alignment doc** — content-shape map + what stays
   static (see "Out of scope" below for a hint at the boundary).
5. **Sanity setup** — `sanity/` + `lib/sanity/` only. Sanity schemas
   must NOT live in root `schemas/` because that folder now owns
   Zod / runtime validation.
6. **Resend wiring** — server-side validation reuses the root Zod
   schemas so client and server can't drift. Account + DNS work can
   start in parallel with step 5.

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

- `motion-fade.tsx` — fade + small rise on enter; uses no-op variants under
  reduced motion. Props: `delay`, `as`, `className`, `duration`, `yFrom`,
  `scaleFrom`.
- `motion-stagger.tsx` — wraps peer children with a capped stagger parent; the
  primitive owns each child wrapper so callers cannot bypass the cap.
- `motion-count-up.tsx` — extract the existing count-up logic from
  `impact-stats-section.tsx` so future stat surfaces can reuse it without
  copy-paste.
- `use-reduced-motion-safe.ts` (hook) — thin wrapper around
  `motion/react`'s `useReducedMotion` that defaults to `true` during SSR to
  avoid hydration mismatches.

Do **not** add a generic `<AnimateOnScroll>` god-component; it always ends up
overgrown. Keep each primitive narrow.

## UX rhythm — scroll reveals

This is the default mental model for the whole site. When in doubt, follow
this section before inventing a one-off.

### Motion decision tree (site-wide rule)

Two primitives cover almost everything — no third abstraction needed:

| Primitive       | Use when                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------- |
| `MotionFade`    | Section headers, copy bands, single panels, carousel items (with `delay={index * 0.08}`) |
| `MotionStagger` | Grids of **peer cards** (benefits, people, content cards, icon tiles)                    |

**Ask in order:**

1. **Does the section have a title/header?** → `MotionFade` on the header block first.
2. **How many peer cards are visible at once (≤6)?** → `MotionStagger` on the grid, **or** per-item `MotionFade` with staggered `delay` inside a carousel.
3. **More than 6 cards (listings, long grids)?** → Header fade only; cards rely on `<ContentCard>` hover. `MotionStagger` caps at 6 by default — items past the cap appear instantly.
4. **Single featured panel** (event hero card, overlap form)? → One `MotionFade` only: **opacity + small rise (`yFrom` 12–16px), no scale**. Slightly slower (`duration` ~0.48s, `delay` ~0.16s). Scale reads as a “pop” on marketing pages — reserve it for dialogs/success states.
5. **Already kinetic inside** (marquee, orbit, countdown tick)? → Header fade; do not stagger inner motion.
6. **Live forms / map embeds?** → Copy column fades; fields stay static (Contact overlap card is the one exception).

This matches what most polished marketing sites do (Stripe, Linear, Vercel-style): **section confirms hierarchy, cards confirm structure, nothing bounces for attention**. Stagger gaps stay at **80ms** (`MotionStagger` default); total entrance under **~600ms** for a 6-card row.

### Timing ownership (sibling triggers)

> If a section’s cards, logos, tiles, or carousel are the main content, animate the **major section header** and the **component group** as **separate sibling triggers** — not one wrapper around both.
>
> If the section is copy-first, form-first, FAQ, map, listing-heavy, or CTA-only, keep it as **one calm band** or static.

**Do:**

```tsx
<MotionFade>{/* eyebrow + h2 (+ description) */}</MotionFade>
<MotionStagger>{/* card grid */}</MotionStagger>
```

**Avoid:**

```tsx
<MotionFade>
  {/* header */}
  <MotionStagger>{/* cards */}</MotionStagger>
</MotionFade>
```

Nested fade + stagger shares one viewport trigger; the grid can finish animating before the user scrolls to it. Split columns (Voices, Preview) get independent triggers per column or block.

**Non-clickable surfaces** (logo walls, decorative tiles) may entrance-animate but must **not** get hover affordances — motion must not imply interactivity.

### Interaction + motion behavior

Scroll entrance says “this section exists.” Hover/focus says “this item can be acted on.” Keep both layers distinct:

1. **Motion guides attention, not decoration** — calmer after motion, not busier.
2. **Hero content feels instant** — title may fade; CTAs stay immediately clickable; no aggressive scale on hero cards (`scaleFrom` max `0.98`, prefer rise-only).
3. **Interactive elements need micro-feedback** — border tint, 2–4px lift, arrow/icon move on clickable cards (`JumpSectionCard` pattern).
4. **Forms stay calm** — no field animation; dialog step transitions are fine.
5. **Motion density decreases as content density increases** — listings, FAQ, forms are quietest.
6. **One personality** — calm, organic, premium: rise/fade, soft pill morph, gentle count-up. No bounce, elastic, or dramatic scale (except dialog success).
7. **Hover carries more UX weight than entrance** on marketing card grids.
8. **Reduced motion** — static final states; hover/focus color transitions remain.

### What “slide fade in on scroll” means here

`MotionFade` is **opacity + 16px rise** (`y: 16 → 0`) triggered by
`whileInView` once. It is deliberately subtle — not a dramatic slide. Users
feel “the section arrived” without the motion pulling focus from copy.

### Default rule: every major section band fades up

Wrap each section's **header / copy** in `MotionFade`. Card bodies use
`MotionStagger` or per-card delayed fade when the decision tree above says so.

| Pattern                   | Motion                                                                   | Example                                                              |
| ------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **Section header**        | `MotionFade` on eyebrow + title (+ description)                          | All major sections                                                   |
| **Card grid (≤6 peers)**  | Header `MotionFade` + `MotionStagger` on grid                            | Benefits, Advisors, Member Stories, Home ContentCards, Opportunities |
| **Card carousel (≤6)**    | Header `MotionFade` + per-slide `MotionFade` with `delay={index * 0.08}` | Team, Core Focus                                                     |
| **Card grid (7+)**        | Header fade only; cards use `<ContentCard>` hover                        | Academy listing pages                                                |
| **Single featured panel** | Slow `MotionFade` — rise only, ~0.48s, no scale                          | Featured Event card, Contact overlap form                            |
| **Kinetic section**       | Header `MotionFade`; marquee/orbit/carousel inner motion unchanged       | Home Partners marquee, About orbit                                   |
| **Hero**                  | Title block fades; CTAs static; image/stat may delay                     | All route heroes                                                     |
| **Forms**                 | Copy column fades; form fields static except Contact overlap card        | Inquiry, Membership Application, Contact                             |
| **Map / embed**           | No motion                                                                | Contact map                                                          |

### Gaps we closed (2026-06-19 polish)

- **Full section-band pass** — unified scroll reveal across sections that
  previously only faded headers: Benefits (all consumers), Learning
  Opportunities / Participants / Listings, Who Should Join, Member Stories,
  Opportunities, Team, Advisors, Journey, Impact Stats header, Stay Connected
  (incl. social tiles), Voices (testimonial + logo grid), Community Preview
  chat column, Home Partners marquee, Featured Articles.
- **Academy Featured Event** — header fade + slow rise on event card (no scale).
- **About Team / Advisors** — header fade + card stagger (carousel delay / grid stagger).
- **Community Who Should Join** — header fade + stagger (cap 6 on 9 tiles).
- **Timing ownership pass** — sibling triggers for Voices, Stay Connected, Two Journeys, Testimonials; un-nested fade+stagger in Benefits, Learning Opportunities, Participants, Opportunities, Member Stories; Academy hero card rise-only (removed `scaleFrom={0.95}`).
- **Academy hero Next Live card** — hover affordance (border, lift, arrow,
  icon chip) so the overlay reads as a link.

### When _not_ to add more motion

- **Do not** stagger every card on long listing pages — Academy has three
  listing grids; staggering 12+ cards feels busy and slows scanning.
- **Do not** re-animate on scroll back (`viewport once: true` is locked).
- **Do not** animate body paragraphs, form fields, or CTA buttons on their
  own — fade the band they sit in, or leave CTAs static in heroes.
- **Marquee / orbit** already carry kinetic weight; don't add stagger on top.

### Partners page note

`BenefitsSection` (first section after hero) **does** scroll-reveal via shared
`MotionFade` + `MotionStagger`. If it felt static, the animation is subtle
(360ms, 16px rise) and fires once — not a bug.

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

1. **Hero** — title fade-up; mobile image `scaleFrom={0.98}`; desktop stats
   card delayed fade. CTA pair does not animate.
2. **Partners marquee** — section band fade-up (`MotionFade`); marquee logos
   do not stagger individually.
3. **What we do / Core focus** — section-level entrance fade only
   (`MotionFade`). No per-card stagger; internal marquee/carousel carries
   kinetic weight.
4. **Two journeys** — header fade + two-panel `MotionStagger` as sibling
   triggers.
5. **Featured Articles** — section band fade-up; individual cards rely on
   `<ContentCard>` hover (no per-card stagger).
6. **Stay Connected (dark)** — header fade + social tile `MotionStagger`.
7. **CTA section** — fade-up only; the decorative ring should _not_ spin.

### About

1. **Hero** — title fade-up. Ecosystem orbit already animates; leave it.
2. **Story** — single fade-up.
3. **MVO** — three cards rise in stagger (140ms between).
4. **Impact Stats** — already shipped (count-up). Extract logic to shared
   `motion-count-up` primitive without changing behavior.
5. **Journey** — already shipped (sticky cross-fade). Re-test under reduced
   motion and document the contract in this file as the upper bound for
   scroll-driven work.
6. **Team / Advisors** — header fade; team carousel uses per-card delayed
   fade; advisors grid uses `MotionStagger`.

### Academy

1. **Hero** — title fade-up; search bar settles with a 200ms delay. NEXT LIVE
   SESSION image block uses rise-only `MotionFade`; the next-live overlay link
   uses hover affordance (border tint, slight lift, trailing arrow, icon chip
   activation) — it must read as clickable.
2. **Sticky Tabs** — active pill morphs with `layoutId`. Falls back to instant
   color swap under reduced motion.
3. **Featured Event** — header fade-up; event card slow rise only (~0.48s,
   `yFrom` 12px, no scale). Countdown digits crossfade on tick (`tabular-nums`).
4. **Learning Opportunities + Participants** — `MotionStagger` on the card
   grid, 80ms between children, capped at 6.
5. **Listings** — header fade-up only; individual cards rely on `<ContentCard>`
   hover.

### Community

1. **Hero** — title fade-up; orbit continues to spin (already shipped). Avatar
   row fades in last (240ms delay) so the eye lands on the title first.
2. **Why Join / Member Benefits** — `MotionStagger` on the 6-card grids.
3. **Apply Banner** (×2) — band fade-up; the CTA button does not
   independently animate.
4. **Three Steps** — dashed ring stays static; cards rise in left-to-right
   stagger (`whileInView`).
5. **Who Should Join** — header fade + `MotionStagger` on icon tiles (cap 6).
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
- **System pages** (`not-found.tsx`, `error.tsx`, `global-error.tsx`).
  These are recovery surfaces — adding animation would make a broken
  state feel performative. They stay static. `global-error.tsx`
  especially cannot rely on Tailwind or `motion/react` (renders when
  the root layout has crashed).
- **OG / Twitter share images.** Static raster, by definition.
- **Forms in active use.** Never animate inputs, labels, or messages
  while a user is filling out a form. Step _transitions_ in the two
  multi-step dialogs (Become Partner, Membership Application) are in
  scope; field-level motion is not.

## Checklist

- [x] Add the three motion primitives in `components/shared/motion/` + reduced-motion hook
- [x] Refactor `impact-stats-section.tsx` to consume `motion-count-up`
- [x] Apply per-section plan: Home → About → Academy → Community → Partners → Contact
- [x] Add `AnimatePresence` to multi-step dialogs (Partner + Membership)
- [x] Academy tabs `layoutId` + featured countdown crossfade
- [x] Scroll-reveal gaps: Home Partners marquee, Featured Articles, Academy Featured Event
- [x] Update `docs/design-system.md` to point at this spec
- [ ] Browser QA + reduced-motion sweep (all routes + dialogs)
- [x] Log the motion pass in `docs/implementation-log.md`
- [ ] Tick the Motion item in the Notion dev notes (QA remaining)
- [ ] Lighthouse baseline + delta (optional / deferred)
