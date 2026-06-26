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
- `components/home/` owns Home-only sections. Name files after the section eyebrow or role (for example `what-we-do-section.tsx`, `core-focus-section.tsx`).
- `components/layout/` owns shared site chrome and shared page-intro patterns.
- `components/ui/` owns reusable primitives.
- `content/` owns editable site copy and repeated collections.
- `schemas/` owns Zod/runtime validation and schema-derived form value types.
- `types/` owns content and component contracts, not runtime validation.
- `providers/` owns the app-wide provider composition root (`app-providers.tsx`)
  that the root layout wraps. Add future cross-cutting providers (theme, query
  client, auth, analytics) here. Domain-specific providers keep their
  implementation in their own folder and are composed at the narrowest stable
  shell: site-wide in `providers/`, or route-scoped in a matching route
  `layout.tsx` when the provider only belongs to that area.
- Keep site identity, contact details, hours, and social links in
  `content/site.ts`.
- Keep shared navigation data in `content/navigation.ts`.
- Keep route SEO copy and sitemap route data in `content/seo.ts`.
- Keep page content in per-page `content/*.ts` files as the site grows.
- When one page previews another page's domain content, the source domain owns
  both the canonical data and a small preview/projection export. For example,
  Home should consume an Academy-owned `academyHomePreview` shape rather than
  duplicating Academy events or mapping Academy internals inside Home JSX.
- Keep SEO copy separate from presentation copy. Route metadata content should
  live in `content/seo.ts` or the route metadata file, not inside hero or page
  section content.
- `lib/placeholder-images.ts` is the only source for temporary imagery.
- `app/globals.css` owns visual tokens and theme variables.
- Shared component variants should stay in the component primitive that owns
  them, such as `components/ui/button.tsx`.
- Shared multi-step dialog primitives live outside page folders once more than
  one page is expected to need the same shell, stepper, footer, or success
  chrome.
- `public/images/` is the destination for final exported assets, organized by
  route or shared usage.

## Implementation Rules

- Mobile is not a compressed desktop layout. Build intentional 390px
  compositions.
- A desktop screenshot is not enough to mark a section complete. When changing
  UI, make the mobile and tablet layout decisions in the same pass unless the
  user explicitly scopes the work to desktop only.
- Keep mobile vertical padding tighter than desktop by default; current Home
  sections generally use `py-14 sm:py-16 lg:py-20` unless the design needs a
  custom rhythm.
- Layout width belongs to the page or section boundary, not to small reusable
  primitives.
- Use `mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8 xl:px-10` on route-level
  and section-level wrappers by default.
- Do not hide `max-w-*` page-width constraints inside cards, buttons, nav
  items, badges, or other small reusable UI pieces.
- Consume registered semantic colors through Tailwind utilities such as
  `bg-subtle`, `text-fg-muted`, and `border-border`. Avoid direct
  `var(--...)` color utilities in component JSX when a theme utility exists.
- Keep rounded rectangles capped at `rounded-xl`. Do not introduce Tailwind
  radius utilities or custom radii above the `xl` scale; use `rounded-full`
  only for true pills, avatars, and circular icon controls.
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
