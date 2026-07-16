# Sanity CMS — Phase 3: Durable Page Content, Legal, and Site Settings

## Status

**Implemented and scope-corrected (2026-07-13).** Phase 3 deliberately avoids
turning Sanity into a mirror of the React component tree. The client edits
durable organisational content; engineering continues to own marketing UI
copy, card systems, interactions, routes, and layouts.

Phase 1 (Academy catalogues) and Phase 2 (trust, partners, and people) remain
complete. Academy featured-event selection and hero-link behaviour remain a
separate post-migration product review.

## Final scope

### Site Settings (`siteSettings`)

Editors control:

- public email;
- public phone;
- address;
- Instagram, LinkedIn, Facebook, and YouTube URLs.

Office hours, organisation identity, canonical URL, SEO, navigation, footer
routes, and newsletter copy remain code-owned. Office hours describe the
current operating UI rather than frequently changing editorial content.

### Home (`homePage`)

Editors control:

- hero headline and description;
- What We Do poster image and alt text;
- four fixed service cards: title, description, image, alt;
- five fixed value-chain cards: title, description, image, alt.

The Home hero image stays in code because its crop and art direction are part
of the approved responsive hero design. Eyebrows, proof points, CTA labels and
destinations, section headings, card order, icons, tones, and layout stay in
code.

### About (`aboutPage`)

Editors control:

- Story paragraphs, poster image, and alt text;
- Mission, Vision, and Objective body copy.

The complete hero, journey timeline, section headings, CTA labels/actions,
team/advisor chrome, poster play treatment, and layout remain code-owned.

### Legal (`legalPage`)

Four fixed documents remain required:

- `legalPage.privacy`;
- `legalPage.terms`;
- `legalPage.cookies`;
- `legalPage.accessibility`.

Editors control each document's last-updated date, title, subtitle, baseline
notice, sections, paragraphs, bullets, and supported tables. Route keys, URLs,
navigation, layout, and legal eyebrow labels stay in code.

Legal table rows are Sanity objects containing `cells[]`; they are not nested
arrays. The schema validates row width against the header count.

## Explicitly not page singletons

Academy, Community, and Partners marketing shells remain in `content/*` and
their components. They do not have Phase 3 singleton schemas or fetches.

This does not remove their real CMS content:

- Academy articles, webinars, courses, authors, testimonials, and FAQs remain
  Sanity-backed;
- Community member stories and FAQs remain Sanity-backed;
- Partners, Partner Voices testimonials, and FAQs remain Sanity-backed.

The removed development documents (`academyPage`, `communityPage`, and
`partnersPage`) may remain as unused data until a separately approved dataset
cleanup. They are not exposed in Studio or read by the application.

## Studio information architecture

```text
Content
├── Site Settings
├── Pages
│   ├── Home
│   └── About
├── Academy
│   ├── Articles
│   ├── Webinars & Events
│   ├── Courses
│   └── Authors
├── Partners
├── Testimonials
│   ├── Home
│   ├── Academy
│   ├── Partner Voices
│   └── All Testimonials
├── FAQs
│   ├── Home & Contact
│   ├── Academy
│   ├── Community
│   ├── Partners
│   └── All FAQs
├── Team & Advisors
│   ├── Team
│   ├── Advisors
│   └── All Team & Advisors
├── Member Stories
└── Legal Pages
    ├── Privacy
    ├── Terms
    ├── Cookies
    └── Accessibility
```

Studio navigation is capped at two levels. Academy content is grouped by its
editorial domain. Team and Advisors share one clearly named roster group;
Member Stories remains a separate root collection because it is a structured
case-study format, not a person record or short testimonial. All Phase 3
documents use fixed IDs. Generic create, duplicate, and delete flows are
unavailable for singleton types.

## Runtime architecture

- Public routes live under `app/(site)/`; URLs are unchanged.
- The public layout owns the settings-backed Header and Footer.
- `/admin` remains outside the public shell and does not evaluate public
  settings fetches.
- Required Phase 3 documents fail loudly when missing; there is no runtime
  resurrection of archived static copy.
- CMS-backed images use the existing `next/image` path and configured Sanity
  remote pattern; Phase 3 adds no second image abstraction.
- Webhook revalidation covers `siteSettings`, `homePage`, `aboutPage`, and the
  exact legal route identified by `key`.

## Migration

`pnpm migrate:phase3` seeds seven documents into `development`:

1. `siteSettings`;
2. `homePage`;
3. `aboutPage`;
4. four `legalPage.*` documents.

The script supports offline validation, read-only dry-run, and `--execute`.
Production promotion completed on 2026-07-16 by exporting the reviewed
`development` dataset and importing it, including assets, into `production`.
The seed script remains development-only by design.

## Placeholder and video policy

The Home What We Do poster, Home fixed-card images, and About Story poster are
replaceable CMS image slots. The Home hero and layout-dependent imagery remain
code-owned.

Home What We Do and About Story still have poster-only coming-soon treatments.
No unused video URL, player, captions, or hosting fields are added until a real
video feature is approved.

## Archival boundary

Development archival is complete under `content/_archived/`. Archives are
grouped by migration phase:

- `academy-catalogues.ts` (+ `blog-articles.ts`, `webinars-catalogue.ts`,
  `courses-catalogue.ts`) — Phase 1 catalogue seeds
- `trust-and-people.ts` (+ `about-people.ts`) — Phase 2 trust/people seeds
- `phase3-page-content.ts` (+ `legal-pages.ts`) — Phase 3 durable copy + legal

Active `content/*` keeps code-owned chrome, forms, nav, registration, and
FAQ categories. Runtime must not import archived files; migration scripts may.
Academy date-only placeholder times were not changed. Production dataset
migration and post-cutover snapshot cleanup remain separate.

## Remaining work

- keep archived rollback snapshots for one release after production is stable;
- separate Academy featured-content follow-ups as needed.
