# Academy Page Spec

## Status

Scaffold only with anchor sections. The current generic `PageHero` use is a
temporary placeholder, not the approved Academy hero direction.

## Purpose

Present Academy learning pathways clearly while keeping the MVP on a single
route.

## Confirmed Inputs

- Route exists at `/academy`
- MVP keeps Academy content on one page
- Current anchors: webinars, training, courses, insights
- The Figma Academy frame calls for a custom Academy hero, similar in intent
  to the Home/About/Community bespoke heroes, not the shared secondary-page
  `PageHero`.

## Current Placeholders

- generic `PageHero` lead section
- cards and section layouts
- programme detail treatment
- final content density

## Planned Hero Direction

Build `components/academy/academy-hero-section.tsx` for the Academy hub. It
should own the full Figma hero composition: headline, body copy, search bar,
learner trust row, right-side image/card composition, next-live-session card,
and the Academy tab/jump navigation. Reuse shared primitives where they fit,
but do not extend `PageHero` to carry this page-specific layout.

## Checklist

- [ ] Figma or approved screenshot supplied
- [ ] Anchor structure confirmed
- [ ] Desktop composition documented
- [ ] Mobile composition documented
- [ ] Copy structure approved
- [ ] Route implemented beyond scaffold
