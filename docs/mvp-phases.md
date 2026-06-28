# MVP Phases

This project should be built like a scalable product, but delivered in clean
phases so the first release stays focused and reviewable.

## Phase 0: Foundation

Current work:

- Lock repo structure, docs, layout rules, and visual-system rules
- Keep top-level public routing flat while all pages share the same public
  shell; use nested route groups only when route behavior genuinely diverges
- Keep reusable copy in `content/`
- Centralize temporary imagery
- Establish a public asset layout under `public/images/`
- Preserve simple route scaffolds for all six public pages

Outcome:

- Any new agent can understand the repo quickly
- Home page work can proceed without re-deciding layout rules every session

## Phase 1: Static Interface Approval

Primary milestone:

- Complete the Home page with strong desktop fidelity
- Build a deliberate 390px mobile version
- Keep nav, dropdowns, FAQ filtering, accordions, and links working
- Keep secondary pages scaffolded but not overbuilt yet
- Prioritize visible UI quality over boilerplate route states

Constraints:

- No live CMS
- No real form submission
- No fake social/community integrations
- No made-up business statistics or partner brands

## Phase 2: Guided Interactions

After the static UI is approved:

- Add polished contact and interest-capture forms
- Add local validation and submission states
- Expand secondary pages beyond their current lead sections
- Add richer Academy, Community, and Partners content models

**Shipped (2026-06-26):** All seven public forms POST to API routes with Resend
dual-email delivery, Turnstile, and honeypot. Production requires client env +
domain verification — see `docs/resend-integration-spec.md`.

This phase may still stay backend-light beyond form delivery if needed.

Examples that can land here if they become useful:

- custom `loading.tsx`
- custom `error.tsx`
- custom `not-found.tsx`
- broader `motion/react` conventions

## Phase 3: Content And Platform Integrations

Only after the interface is approved:

- Sanity CMS integration
- Analytics and tracking
- Translation or multilingual rollout
- Search, content publishing workflows, and operational handoffs

Form submission workflows (Resend + Turnstile) landed in Phase 2 — production
DNS/env handoff remains client ops.

## Explicitly Not In Scope Now

- Authentication
- Payments or donations
- E-commerce
- Dashboards
- APIs beyond what the frontend absolutely needs later
- Deal-room or complex business workflow logic
- Early boilerplate polish that does not materially improve the current design
  approval milestone
