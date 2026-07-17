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

## Slice B — Editorial categories (separate review)

Add CMS-managed categories for Academy articles, webinars/events, and the
public blog filtering experience. Courses retain their fixed curriculum levels.

Before implementation:

1. Review the category document shape, seed set, slug policy, badge tone, and
   duplicate-name behaviour.
2. Deploy reference fields with warning-level validation and legacy fallback.
3. Patch and verify `development`, then explicitly approve the production patch.
4. Tighten the reference to required only after both datasets are complete.
5. Keep strong references and retain legacy fields for one stable release.

No category migration or dataset write belongs to Slice A.
