# Community Page Spec

## Status

Hero implemented. Join section scaffold remains below the hero.

## Purpose

Explain the community value clearly and support the primary CTA `Join our
community`.

## Confirmed Inputs

- Route exists at `/community`
- Approved hero screenshot and Figma node `25:8893` supplied (2026-06-16)
- Lead copy, CTAs, member avatars, and orbit content live in `content/community.ts`
- Shared chrome stays consistent with the public site

## Hero Composition

### Desktop

- `bg-subtle` two-column hero
- Left: tangerine eyebrow pill, two-line serif title with leaf accent, body copy,
  primary/secondary CTAs, overlapping member avatars + countries label
- Right: membership orbit with dashed rings, labeled member chips, Africa mark
  centerpiece

### Mobile

- Stack text first, orbit second
- Orbit scales via container query like the About hero

## Component Ownership

- `components/community/hero-section.tsx` — Community route hero
- `components/community/membership-orbit.tsx` — labeled chip orbit visual
- `components/ui/orbiting-circles.tsx` — shared orbit animation primitives
- `lib/community-orbit-icons.ts` — Lucide map for membership chip icons

## Current Placeholders

- benefit blocks below hero
- participation model beyond join scaffold
- final member avatar photography

## Checklist

- [x] Figma or approved screenshot supplied
- [x] Desktop composition documented
- [x] Mobile composition documented
- [x] CTA hierarchy approved for hero
- [x] Copy structure approved for hero
- [x] Hero route implemented
- [ ] Route implemented beyond hero scaffold
