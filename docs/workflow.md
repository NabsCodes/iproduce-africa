# Workflow

This repo should support screenshot-driven implementation without forcing a new
agent to reconstruct context from chat history.

## Standard Loop

1. User shares a page or section target, often with a screenshot.
2. Update or create the matching spec under `docs/routes/` or `docs/shared/`.
3. Capture what is approved, what is placeholder, and what still needs review.
4. Implement against that spec.
5. Tick the checklist items that are genuinely complete.
6. Add a short `implementation-log.md` entry.

## Verification Rule

Before a code handoff:

1. run `pnpm format`
2. run `pnpm lint`
3. run `pnpm typecheck`
4. run `pnpm build`

If you are iterating on a narrow slice, targeted `pnpm exec prettier --write <changed-files>` is fine during the work, but the final pass should still
include the repo-level format command.

## Screenshot Rule

If the user sends a navbar, hero, or page screenshot:

- document it in the matching spec
- write down the exact scope for that pass
- keep a short checklist for desktop, mobile, copy, and QA

This keeps the repo useful across Codex, Claude, Cursor, and human review.

## Spec Shape

Each page or shared-section spec should stay practical:

- current status
- purpose
- confirmed inputs
- open placeholders
- checklist

## Completion Rule

Do not tick a checklist item just because code was written.

Tick it only when the relevant part is actually aligned, for example:

- desktop composition matches
- mobile composition is intentional
- links/CTAs work
- overflow is checked

## Current Focus

The active priority remains:

1. shared foundation
2. navbar/footer/shared chrome quality
3. Home page fidelity
4. secondary-page expansion after Home approval
