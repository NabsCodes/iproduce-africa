# Navbar Spec

## Status

Desktop reference captured. Desktop spacing, active-state, and CTA polish updated
against the approved screenshot. Mobile and dropdown polish still open for
screenshot-driven refinement.

## Purpose

The navbar should feel premium, clear, and reliable across desktop and mobile.
It carries the highest repeated visibility on the public site, so it should be
treated as its own spec rather than just another component.

## Confirmed Inputs

- Primary CTAs are `Join our community` and `Partner with us`
- Academy includes a dropdown structure
- Mobile navigation must be intentionally designed, not just collapsed
- Desktop utility bar includes hours on the left, then email, phone, and social
  icons on the right
- Shared site hours, contact details, and social entries should live in
  `content/site.ts`
- The shared logo should come from `public/images/shared/iproduce-logo.webp`

## Approved Desktop Reference

Source: `CleanShot 2026-06-14 at 7.29.01@2x.png`

- dark green utility bar
- white primary bar with the original logo at left
- centered main navigation
- short orange underline for the active route
- `Partner with us` as the quieter text CTA
- `Join our community` as the filled green pill CTA

## Current Questions

- exact mobile header and sheet screenshot
- final social destination URLs
- dropdown open-state parity once the Academy screen is shared

## Checklist

- [x] Approved desktop navbar screenshot documented
- [ ] Approved mobile navbar screenshot documented
- [x] Desktop active-state behavior approved
- [ ] Academy dropdown content and styling approved
- [ ] Mobile menu hierarchy approved
- [x] CTA order and emphasis approved
- [ ] 390px overflow and tap-target QA complete
