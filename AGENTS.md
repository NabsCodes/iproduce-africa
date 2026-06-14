# iProduce Africa Agent Guide

This repository is the static-first iProduce Africa marketing site. The current
milestone is to lock the design system, layout rhythm, and Home page fidelity
before any CMS or backend integration work begins.

## Start Here

1. Read `README.md`.
2. Read `CLAUDE.md`.
3. Read `docs/README.md`.
4. Read `docs/workflow.md`.
5. Read `docs/mvp-phases.md`.
6. If you are touching the Home page, read `docs/homepage-static-spec.md`.
7. Read `docs/layout-system.md` and `docs/design-system.md` before changing UI.
8. Inspect `git diff` first. Build on the current scaffold work. Do not revert
   existing uncommitted changes unless the user explicitly asks.

## Current Product Boundaries

- Treat this repo as a premium public-facing marketing site, not an app shell.
- Keep the current MVP static-first.
- Sanity CMS, form submissions, automation, authentication, payments,
  e-commerce, dashboards, donations, and deal-room workflows are later phases.
- Use `Join our community` and `Partner with us` as the primary CTA language.
- Do not invent final partner logos, statistics, community channels, or
  integrations that have not been confirmed.

## File Ownership

- `app/` owns public routes and metadata.
- Keep the top-level `app/` structure flat for now. Introduce route groups only
  when route behavior or shells genuinely diverge.
- `components/home/` owns Home-only sections.
- `components/layout/` owns shared site chrome and shared page-intro patterns.
- `components/ui/` owns reusable primitives.
- `content/` owns editable site copy and repeated collections.
- Keep site identity and contact details in `content/site.ts`.
- Keep shared navigation data in `content/navigation.ts`.
- Keep route SEO copy and sitemap route data in `content/seo.ts`.
- Keep page content in per-page `content/*.ts` files as the site grows.
- Keep SEO copy separate from presentation copy. Route metadata content should
  live in `content/seo.ts` or the route metadata file, not inside hero or page
  section content.
- `lib/placeholder-images.ts` is the only source for temporary imagery.
- `app/globals.css` owns visual tokens and theme variables.
- Shared component variants should stay in the component primitive that owns
  them, such as `components/ui/button.tsx`.
- `public/images/` is the destination for final exported assets, organized by
  route or shared usage.

## Implementation Rules

- Mobile is not a compressed desktop layout. Build intentional 390px
  compositions.
- Reuse existing primitives before creating new abstractions.
- Promote a new primitive only when the pattern is stable and repeated enough
  to earn reuse.
- Keep copy and lists in `content/` whenever they need to stay editable.
- Preserve the `/about`, `/academy`, `/community`, `/partners`, and `/contact`
  scaffolds while the Home page milestone is in progress.

## Working Style

- Keep docs short, practical, and fast for the next agent to read.
- Update the matching route or shared-section spec when a screenshot-driven task
  changes the approved direction.
- After each meaningful work session, append a row to
  `docs/implementation-log.md`.
- If work is incomplete, use `docs/handoff-template.md` for the next handoff.
- Format code changes with Prettier before final verification. Use
  `pnpm format` for a full pass, or `pnpm exec prettier --write <changed-files>`
  while iterating.
- Before handoff on code changes, run `pnpm format`, `pnpm lint`,
  `pnpm typecheck`, and `pnpm build`.
