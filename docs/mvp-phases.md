# MVP Phases

This project should be built like a scalable product, but delivered in clean
phases so the first release stays focused and reviewable.

## Phase 0: Foundation — complete

Shipped:

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

## Phase 1: Static Interface Approval — complete

Primary milestone:

- Complete the Home page with strong desktop fidelity
- Build a deliberate 390px mobile version
- Keep nav, dropdowns, FAQ filtering, accordions, and links working
- Keep secondary pages scaffolded but not overbuilt yet
- Prioritize visible UI quality over boilerplate route states

Original constraints:

- No live CMS
- No real form submission
- No fake social/community integrations
- No made-up business statistics or partner brands

## Phase 2: Guided Interactions — complete in code

After the static UI is approved:

- Add polished contact and interest-capture forms
- Add local validation and submission states
- Expand secondary pages beyond their current lead sections
- Add richer Academy, Community, and Partners content models

**Shipped (2026-06-26):** All seven public forms POST to API routes with Resend
dual-email delivery, Turnstile, and honeypot. **Complete (2026-07-14):** domain
verified on `iproduceafrica.com`, client owns Resend, production Vercel form
delivery live. Optional later: website apex/`www` DNS → Vercel.

This phase may still stay backend-light beyond form delivery if needed.

Examples that can land here if they become useful:

- custom `loading.tsx`
- custom `error.tsx`
- custom `not-found.tsx`
- broader `motion/react` conventions

## Phase 3: Content And Platform Integrations — CMS complete in code

Shipped:

- Sanity CMS for Academy catalogues, testimonials, FAQs, partners, people,
  member stories, selected Home/About copy, public settings, and legal pages
- Embedded Studio editorial organization and webhook revalidation endpoint

Remaining operational work:

- Academy automatic promotion rule implemented; production behavior remains part of staging QA
- Staging/editor QA, production dataset migration, Vercel environment setup,
  webhook verification, and client sign-off
- Static snapshot archival after a stable production cutover

Optional later work includes analytics, preview/TypeGen, translation, and
search-at-scale improvements.

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
