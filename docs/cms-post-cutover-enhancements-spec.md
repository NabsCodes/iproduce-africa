# CMS Post-Cutover Enhancements

Client-review follow-up after the Phase 1–3 production cutover. This work is
split so safe schema/UI improvements can ship without combining them with a
taxonomy migration.

## Slice A — Registration, SEO, and public channels

### Registration contract

- Keep the countdown label as **Next session begins in**. The timer always
  targets the session start; it is not a registration-deadline timer.
- Render a separate registration status line and CTA below the countdown.
- `registration.closesAt` is optional and must be at or before the webinar
  start. If omitted, `open` closes at start; `interest` and `external` remain
  available.
- `registration.providerName` supplies understandable external-platform copy.
  External links always open in a new tab; there is no editor open-mode toggle.
- `resolveWebinarRegistrationState()` is the only state/copy/action resolver.
  UI surfaces and the registration API must not implement parallel rules.

### Academy SEO

- Articles, webinars, and courses have an optional shared SEO object: title,
  description, and social-share image.
- Metadata falls back to the existing content title, description/excerpt, and
  primary image when optional SEO fields are blank.
- Article detail emits `BlogPosting` structured data. Course detail emits
  `Course`; the course listing emits `ItemList` when at least three courses are
  present.
- Do not emit Event rich-result markup for online-only webinars. Page metadata
  still uses the webinar SEO fallback chain.
- Author edits fan out to referenced article detail routes when the webhook
  projection includes `"id": _id`. Until both dataset webhooks are updated,
  the route safely revalidates the whole blog subtree.

### Public channels

- `siteSettings.telegramUrl` and `siteSettings.whatsappUrl` are optional.
- They are consumed by the Community preview and Contact social links only.
- They do not appear in the footer, and blank URLs hide the related action.
- No URLs are seeded or invented. Editors populate each dataset deliberately.

## Slice B — Editorial categories

**Approved and implemented in code; dataset rollout in progress.**

This slice consciously supersedes the earlier idea of separate Article and
Webinar category document types. Both catalogues need the same
name/slug/tone/order contract, so one shared `academyCategory` collection is
the single source of truth.

Each category has two independent switches:

- **Available for Articles** (`appliesToArticles`)
- **Available for Webinars & Events** (`appliesToWebinars`)

Both can be on, one can be on, or both can be off. Both off archives the
category from future reference selectors without breaking existing content
that already references it. References stay strong, so a used category cannot
be deleted until affected content is reassigned.

Articles and Webinars use `categoryRef`; legacy `category` / `type` strings
remain hidden for one stable release. Public fetches prefer the reference and
fall back to the legacy value during rollout. Filters are derived from
categories represented by published content, sorted by the category display
order, and compare by slug. Courses retain fixed curriculum levels.

Rollout order:

1. Deploy schema + fallback queries with warning-level reference validation.
2. Dry-run, migrate, and verify Development.
3. Dry-run Production, export a backup, then execute only with explicit
   Production approval.
4. Verify cards, filters, search tones, related content, and revalidation.
5. Tighten both reference fields to required and deploy the final schema.
6. Retain legacy fields and archived rollback snapshots for one stable release.

The executable runbook and external dashboard checklist live in
`docs/production-closeout-runbook.md`.
