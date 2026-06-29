# Documentation Index

This folder is the lightweight working-docs system for iProduce Africa.

The goal is the same one you use in larger repos: any new agent should be able
to catch up quickly without relying on chat history. The difference here is
scope. This site is simpler than `Zamfara-BPP`, so the docs should stay tighter
and more task-oriented.

## Read Order

1. `../CLAUDE.md`
2. `../AGENTS.md`
3. `workflow.md`
4. `mvp-phases.md`
5. `homepage-static-spec.md` when the Home page is in scope
6. `routes/README.md`
7. `layout-system.md`
8. `design-system.md`
9. `email-structure.md` when touching transactional email
10. `cms-migration-spec.md` + `sanity-academy-spec.md` when CMS work is in scope
11. `implementation-log.md`

## Documents

| File                         | Purpose                                                                           |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `workflow.md`                | Explains the screenshot-to-spec-to-code loop for this repo.                       |
| `mvp-phases.md`              | Defines what is in scope now, what comes next, and what is deliberately deferred. |
| `homepage-static-spec.md`    | Working spec for the current Home page milestone.                                 |
| `file-structure-proposal.md` | Recommended long-term folder ownership and migration direction.                   |
| `routes/`                    | Route-by-route specs and checklists.                                              |
| `shared/`                    | Shared-section specs such as navbar and footer.                                   |
| `layout-system.md`           | Shared page structure, section rhythm, and responsive composition rules.          |
| `design-system.md`           | Visual language for tokens, typography, buttons, cards, imagery, and UI tone.     |
| `status-board.md`            | Quick to-do board across shared sections and pages.                               |
| `implementation-log.md`      | Short running log so future agents can catch up quickly.                          |
| `handoff-template.md`        | Copy-paste structure for incomplete work or QA handoff.                           |
| `resend-integration-spec.md` | Resend + React Email + Turnstile integration (env, API, account strategy).        |
| `email-structure.md`         | Email folder tree, logic vs helpers, dual UI, config suggestions.                 |
| `cms-migration-spec.md`      | Sanity master plan: phases, CMS vs code, edge cases, folder layout.               |
| `sanity-academy-spec.md`     | Phase 1 Academy catalogues: schemas, GROQ, migration, acceptance criteria.        |
| `cms-client-summary.md`      | One-page client sign-off: what moves to CMS and when.                              |

## Source Of Truth Order

1. Approved Figma screens once supplied
2. The active milestone spec in this folder
3. Content files in `content/`
4. Shared primitives in `components/ui/` and `components/layout/`

If those sources disagree, align the code to the most recent approved design
direction and then update the docs.
