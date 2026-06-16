# About Page Spec

## Status

Hero implemented. Remaining sections are placeholders.

## Purpose

Introduce iProduce Africa, its mission, and its role in Africa's agribusiness
ecosystem without overloading the page before the Home page is approved.

## Confirmed Inputs

- Route exists at `/about`
- Approved hero screenshot supplied (2026-06-15)
- Lead copy and orbit content live in `content/about.ts`
- Shared chrome stays consistent with the public site

## Hero Composition

### Desktop

- `bg-subtle` two-column hero
- Left: tangerine eyebrow pill, mixed-color serif title, muted body copy
- Right: ecosystem orbit visual with browser mockup, three orbit rings, icon
  badges, decorative dots, and stats pill

### Mobile

- Stack text first, orbit second
- Orbit scales down slightly below `sm` to preserve gutter rhythm

## Component Ownership

- `components/about/hero-section.tsx` — About route hero
- `components/about/ecosystem-orbit.tsx` — orbit visual composition (includes inline icon badges)
- `components/shared/browser-mockup.tsx` — reusable mac-style window shell
- `components/ui/orbiting-circles.tsx` — shared orbit animation primitives
- `lib/pillar-icons.ts` — shared Lucide icon map for pillars/orbit

## Current Placeholders

- supporting sections below the hero
- team/story structure

## Checklist

- [x] Figma or approved screenshot supplied
- [x] Desktop composition documented
- [x] Mobile composition documented
- [x] Copy structure approved for hero
- [x] Hero route implemented
- [ ] Placeholder imagery needs listed for future sections
- [ ] Route implemented beyond hero scaffold
