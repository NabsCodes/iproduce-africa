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
