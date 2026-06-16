# iProduce Africa Claude Guide

This file gives Claude-style working guidance for this repository. It complements
`AGENTS.md` and should keep any agent aligned on structure, scope, and handoff.

## What This Project Is

iProduce Africa is a public-facing agribusiness website being built in a
static-first way. The immediate goal is strong UI fidelity, clean layout
systems, and durable docs before Sanity or backend integrations begin.

This is not yet a complex application surface. Do not import app-like patterns
just because they worked in heavier repos.

## Docs First

Before changing a page or shared section, read:

1. `README.md`
2. `AGENTS.md`
3. `docs/README.md`
4. `docs/workflow.md`
5. the matching page or shared-section spec

Current docs structure:

- `docs/routes/` for page-level specs and checklists
- `docs/shared/` for navbar, footer, and cross-page sections
- `docs/design-system.md` for visual rules
- `docs/layout-system.md` for structure rules
- `docs/implementation-log.md` for continuity

After each meaningful session, update:

- the touched spec checklist
- `docs/implementation-log.md`
- `docs/handoff-template.md` if work stops mid-task

## Working Style

- Inspect `git diff` first and build on the existing scaffold.
- Keep the repo fast to read for the next agent.
- When the user shares a screenshot for a page or section, document it in the
  matching spec before or alongside implementation.
- Use specs like working contracts, not passive notes.
- Write the simplest code a human dev would write. No premature abstractions,
  no perf shims, no animation systems no one asked for. Inline classes over
  extracted constants. Direct state over `useMemo` unless something is
  actually expensive.

## Mobile First

Write base styles for mobile, scale up at `sm:` / `md:` / `lg:` / `xl:`.
Never the other way around.

- Title sizes start small (`text-[28px]` / `text-3xl`) and grow at `sm:` and
  `lg:` for desktop comfort.
- Paddings start tight (`py-12`/`py-14`) and grow at `sm:` and `lg:`.
- A two-column desktop layout starts as a single `flex-col` and adds
  `lg:flex-row` at the breakpoint.
- A grid-of-three desktop layout starts as `grid-cols-1`, then `sm:grid-cols-2`,
  then `lg:grid-cols-3`.

For sections that swap layout entirely on mobile (a hero with overlay text on
desktop vs. a stacked card on mobile, for example), it's fine to render two
JSX blocks gated by `lg:hidden` / `hidden lg:block` — that's clearer than
fighting one structure into both.

Aim to keep each section visually contained on mobile (the bulk of it visible
without long scroll within the section), unless the section is genuinely
content-heavy.

## Respect the Design System

Variant components own their own visual tokens. Do **not** override them
inline via `className`.

- ❌ `<ButtonLink variant="green" size="lg" className="h-14 rounded-2xl" />`
- ✅ `<ButtonLink variant="green" size="lg" />`

If a button needs a different height, corner radius, or palette than any
existing variant, add a new variant to `components/ui/button.tsx`
(`buttonVariants`) — don't patch it from the consumer. Same rule for any
other primitive that ships variants.

Project radius cap: components that look like controls (buttons, chips, inputs,
small badges) cap at `rounded-lg` (8px). Larger radii (`rounded-2xl`,
`rounded-3xl`, custom `rounded-[20px]`) are only valid on bespoke layout
containers — cards, panels, image frames, hero blocks — where the design
explicitly calls for them. If you find yourself reaching for `rounded-2xl` on
a `ButtonLink`, that's the signal to add a variant instead.

Likewise for sizes: don't pass `h-14`, `px-6`, etc. onto a variant button.
Pick the right `size` prop or add a new one.

## UI Primitives — shadcn First

Before building a new component from scratch, check what is already in
`components/ui/`. The repo already has shadcn primitives for: `accordion`,
`avatar`, `button`, `card`, `dropdown-menu`, `field`, `input`, `label`,
`popover`, `separator`, `sheet`, `sonner`, `tabs`, `tooltip`, plus our own
`carousel`, `carousel-dots`, `decorative-ring`, `eyebrow-badge`,
`eyebrow-pill`.

When a UI need maps to an existing shadcn primitive (tabs, accordion, dialog,
combobox, etc.), use it — you get accessibility, keyboard nav, and ARIA
wiring for free. Override styling via `className`; don't roll your own
`<button role="tab">` clones.

If the primitive's default trigger/content needs heavier customization,
re-export the underlying `*Primitive` (as we did in `accordion.tsx`) and
compose at the consumer rather than forking the file.

## Layout Direction

Prefer the simpler marketing-site pattern that fits the current scope:

- root layout owns the shared chrome for now
- pages focus on page composition
- shared page-intro primitives stay light

Do not add a route group yet just for aesthetics. Introduce one later only when
the app genuinely needs different route shells or behaviors.

## Product Boundaries

- Keep the current milestone static-first.
- Do not add Sanity, auth, payments, donations, dashboards, e-commerce, or
  fake integrations yet.
- Use `Join our community` and `Partner with us` as the primary CTA language.
- Keep placeholder imagery centralized until final assets are provided.
- Treat custom `loading.tsx`, `error.tsx`, `not-found.tsx`, and a broader
  motion system as later scope unless the current milestone explicitly needs
  them.

## Verification

Before handoff on code changes, run:

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm build
```

While iterating on a smaller slice, it is also fine to run targeted formatting
with `pnpm exec prettier --write <changed-files>`, but the final handoff check
should still include `pnpm format`.
