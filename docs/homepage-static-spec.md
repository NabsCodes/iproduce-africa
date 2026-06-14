# Home Page Static Spec

This is the active milestone for the iProduce Africa website.

## Goal

Translate the approved Home page design into a polished static Next.js
implementation with strong desktop and mobile fidelity.

## Files In Scope

- `app/page.tsx`
- `components/home/*`
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
- Use `Join our community` and `Partner with us` as the primary CTAs

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
