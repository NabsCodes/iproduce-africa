# CMS Migration Spec (Sanity)

## Status

**Approved with edits** — 2026-06-27. Reviewed with Codex + Claude; blocking gaps
patched below. No Sanity packages, schemas, or fetch code until checklist at
bottom is signed off.

Purpose: agree on **what moves to Sanity**, **what stays in code**, **folder
layout**, **edge-case rules**, and **phased rollout** before any implementation.
Intended for review with Codex, Claude, or the client — not a build ticket yet.

Related:

- `docs/sanity-academy-spec.md` — Phase 1 Academy catalogues (deep dive)
- `docs/file-structure-proposal.md` — repo ownership rules
- `docs/mvp-phases.md` — Phase 3 = CMS
- `docs/resend-integration-spec.md` — forms stay on API (parallel, not replaced)

---

## Reference repos (what to copy vs not)

Unbiased weighting after comparing local checkouts:

| Source                                   | Weight   | Use for                                                                                                                                       |
| ---------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **q-das**                                | ~70%     | `lib/sanity/*`, object blocks (callout/table/code), multi-document CMS, `app/admin` Studio, webhook revalidate, migration script, author refs |
| **nabeels-portfolio**                    | ~30%     | Blog block richness, seed script pattern, `generateStaticParams` + time revalidate on slug routes                                             |
| **Sanity docs / MCP**                    | Required | Embedded Studio layout, singleton desk structure, TypeGen, draft filtering, schema conventions                                                |
| **wardwise-demo / vextra / Zamfara-BPP** | —        | Not Sanity references (forms, system pages, docs workflow only)                                                                               |

**Do not port as-is**

- Portfolio dev-blog categories/tags
- q-das `lib/data/` layout (iProduce uses `content/` + `types/`)
- Drop-in `@portabletext/react` replacing `ArticleBody` (adapter at boundary instead)
- React Query for page content (iProduce uses Server Components + cache)
- q-das empty-testimonial **placeholder section** unless client explicitly wants “coming soon” bands (see Edge cases)

---

## Sanity official structure (adapted to this repo)

Sanity recommends **embedded Studio** for Next.js App Router projects. This repo
keeps a **flat `app/`** (no `src/`), so the target tree is:

```text
iproduce-africa/
├── app/
│   ├── admin/[[...index]]/page.tsx    # Embedded Studio (q-das uses /admin)
│   └── api/
│       └── revalidate/route.ts        # Sanity webhook → revalidatePath
├── lib/
│   └── sanity/
│       ├── client.ts                  # createClient (@sanity/client or next-sanity)
│       ├── fetch.ts                   # Typed fetch helpers per domain
│       ├── image.ts                   # urlFor / image projection helpers
│       ├── queries.ts                 # groq`` fragments (or split by domain)
│       ├── portable-text.ts           # PT → BlogArticleBlock adapter (blog only)
│       └── empty.ts                   # Shared empty/missing-content guards
├── sanity/
│   ├── env.ts
│   ├── structure.ts                   # Desk: singletons, dividers, filtered lists
│   └── schemaTypes/
│       ├── index.ts
│       ├── documents/                 # post-like catalogue + people + partners
│       ├── objects/                   # seo, link, registrationConfig, …
│       └── blocks/                    # PT blocks: callout, table, code, image
├── sanity.config.ts
├── sanity.cli.ts                      # CLI + TypeGen output path
└── sanity.types.ts                    # Generated (optional phase 1b)
```

**Rules (locked)**

- Root `schemas/` = **Zod only** — never Sanity schema definitions
- `sanity/` = Studio config + schema definitions
- `lib/sanity/` = app-side client, GROQ, adapters, guards
- `content/` = static copy until a phase migrates; then **chrome + fallbacks** only
- `types/` = frontend contracts; Sanity projections must satisfy these

Sanity MCP / docs also recommend:

- `documents/` vs `objects/` vs `blocks/` separation
- kebab-case schema files exporting named `defineType` constants
- Singletons enforced in **desk structure** (`documentId` fixed), not a fake schema flag
- TypeGen from `sanity.cli.ts` when the schema stabilises

**Studio path:** `/admin` (matches q-das; less collision with public “studio” language than `/studio`).

### Studio layout vs site chrome (locked)

Root `app/layout.tsx` currently wraps **all** routes in `<Header>` / `<Footer>`.
Nested `app/admin/layout.tsx` does **not** remove that chrome — Studio would
render inside the marketing shell (double scroll, nav over Studio toolbar).

**Decision: pathname-gated chrome skip (option a).** Do **not** adopt the
`(site)` route-group split for Phase 1 — it touches every route file for a
single exception. Do **not** ship Studio wrapped in site chrome (option c).

Implementation:

1. Extract marketing chrome to `components/layout/site-chrome.tsx` (`"use client"`).
2. **Path gate (precise):** `pathname === "/admin" || pathname.startsWith("/admin/")`
   — not bare `startsWith("/admin")` (would false-positive paths like
   `/administration`).
3. **`SiteChrome` receives slots from the server layout** — root `app/layout.tsx`
   passes `header` and `footer` React nodes as props; the client gate renders
   `{children}` only under `/admin`, else `header` + `<main>` + `footer`. Do
   **not** import `Header` / `Footer` inside the client component (keeps server
   components out of the client bundle).
4. Root layout keeps fonts, `AppProviders`, `Analytics`; wraps page body in
   `<SiteChrome header={…} footer={…}>{children}</SiteChrome>`.
5. Add `app/admin/layout.tsx` for Studio-only concerns: `robots: noindex`,
   full-viewport height shell (`min-h-dvh`), no extra padding — same pattern as
   q-das `app/admin/layout.tsx`.

q-das uses the `(main)` route-group pattern because its root layout is already
chrome-free. iProduce’s root layout owns chrome today; a one-file gate is the
lower-churn equivalent.

---

## Content inventory: CMS vs code-only

### Recommendation key

| Tag           | Meaning                                                |
| ------------- | ------------------------------------------------------ |
| **CMS**       | Client/editor should change without deploy             |
| **CMS-lite**  | CMS later; static OK for launch if copy is stable      |
| **Code**      | Structure, validation, routing, or engineering-owned   |
| **Singleton** | One Sanity document (fixed id) for page-level settings |

### By domain

| Domain                       | Current source                                                 | Recommendation                 | Rationale                                               |
| ---------------------------- | -------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------- |
| **Academy articles**         | `content/blog-articles.ts` + `content/blog.ts`                 | **CMS** Phase 1                | Editorial, frequent updates, slug catalogue             |
| **Academy webinars/events**  | `content/webinars.ts`                                          | **CMS** Phase 1                | Dated sessions, registration metadata                   |
| **Academy courses**          | `content/courses.ts`                                           | **CMS** Phase 1                | Modules, levels, enrolment copy                         |
| **Academy hub shell**        | `content/academy.ts` (hero, tabs, opportunities, participants) | **CMS-lite** Phase 2 singleton | Marketing copy; changes occasionally                    |
| **Academy hub FAQs**         | `content/academy.ts` `faqs`                                    | **CMS** Phase 2                | Same pattern as q-das `faq` docs                        |
| **Academy hub testimonials** | `content/academy.ts` `testimonials`                            | **CMS** Phase 2                | Reuse shared `testimonial` type                         |
| **Home testimonials**        | `content/home.ts`                                              | **CMS** Phase 2                | Shared collection, filter or reference by placement     |
| **Home FAQs**                | `content/home.ts`                                              | **CMS** Phase 2                | Category + page tag                                     |
| **Community FAQs**           | `content/community.ts`                                         | **CMS** Phase 2                | Same `faq` model, `section: community`                  |
| **Partners FAQs**            | `content/partners.ts`                                          | **CMS** Phase 2                | Same model                                              |
| **Contact FAQs**             | `content/contact.ts`                                           | **CMS** Phase 2                | Same model                                              |
| **Partner logos**            | `content/partners.ts` `partnersList`                           | **CMS** Phase 2                | Home marquee + partners page                            |
| **Partner voice quotes**     | `content/partners.ts` `voices.items`                           | **CMS** Phase 2                | `testimonial` placement `partners-voices`               |
| **Partner voices logo grid** | derived from `partnersList`                                    | **CMS** Phase 2                | `partner.showInVoices` + order                          |
| **About team**               | `content/about-people.ts` (projected in `about.ts`)            | **CMS** Phase 2                | `teamMember` `group: team`                              |
| **About advisors**           | `content/about-people.ts` (projected in `about.ts`)            | **CMS** Phase 2                | `teamMember` `group: advisor`                           |
| **Community member stories** | `content/community.ts` `memberStories`                         | **CMS** Phase 2                | `memberStory` — placeholder case studies today          |
| **About story / mission**    | `content/about.ts`                                             | **CMS-lite** Phase 3           | Long prose; fewer edits than catalogue                  |
| **About journey timeline**   | `content/about.ts`                                             | **Code** for v1                | Motion + sticky UX tightly coupled; CMS later if needed |
| **Home hero / sections**     | `content/home.ts`                                              | **CMS-lite** Phase 3           | Page singletons when client edit cadence justifies      |
| **Community page copy**      | `content/community.ts`                                         | **CMS-lite** Phase 3           | Heavy page; migrate section-by-section                  |
| **Partners page copy**       | `content/partners.ts`                                          | **CMS-lite** Phase 3           | Except logos/FAQs (earlier)                             |
| **Contact page copy**        | `content/contact.ts`                                           | **Code**                       | Mostly static + form; map embed is code                 |
| **Navigation**               | `content/navigation.ts`                                        | **Code**                       | Tied to routes; wrong href breaks site                  |
| **Site identity**            | `content/site.ts`                                              | **Singleton** Phase 3          | Phone, email, social — or stay code until handoff       |
| **SEO defaults**             | `content/seo.ts`                                               | **Code** → **Singleton** later | Per-route metadata can stay in route files              |
| **Countries list**           | `content/countries.ts`                                         | **Code**                       | Reference data for forms                                |
| **System pages**             | `content/system-pages.ts`                                      | **Code**                       | 404/error copy; rare edits                              |
| **Form labels / steps**      | `content/community.ts`, schemas                                | **Code**                       | Zod + RHF; CMS adds drift risk with API                 |
| **Registration dialog copy** | `content/academy.ts`                                           | **Code**                       | Product UX; not editorial                               |
| **Email templates**          | `lib/email/`                                                   | **Code**                       | Resend delivery; separate from CMS                      |
| **CTA section (repeated)**   | per-page `cta` blocks                                          | **CMS-lite** Phase 3           | Optional shared `ctaBand` singleton                     |

### Client-facing summary (for handoff conversations)

**Phase 1:** Academy catalogues (articles, webinars, courses, authors).

**Phase 2 (scoped — not optional):** shared trust & people content across
routes — testimonials, FAQs, partner logos, partner voice quotes, team,
advisors, community member stories. Full placeholder seed into Studio; same
handoff pattern as Academy.

**Phase 3+:** page marketing copy singletons (heroes, long sections).

**Stays with engineering:** navigation, forms, registration, system pages,
journey/timeline motion.

---

## Phased rollout

### Phase 1 — Academy catalogues (implementation spec: `sanity-academy-spec.md`)

- Document types: `academyArticle`, `academyWebinar`, `academyCourse`, `author`
- Swap fetch on **all** Academy listing/detail routes, **`/academy/search`**, Home
  `academyHomePreview` catalogue slices, and email session title resolver
- **No Algolia, no Phase 1b** for search — server fetches three catalogues and
  passes them into the existing client filter (`lib/academy-search.ts`)
- Seed from static `content/*` via migration script (default dataset:
  `development`)
- Hub/page shell copy stays in `content/academy.ts`; only catalogue rows move

**Exit criteria:** all Academy slug routes build; search + home preview use Sanity
catalogues; related/featured/empty rules pass QA.

### Phase 2 — Trust, partners & people (scoped)

Phase 2 is **in the delivery plan**, not a backlog nice-to-have. Implements all
Tier 1 + Tier 2 CMS surfaces agreed for sign-off.

#### Document types

| Type          | Maps to                  | Static source                                                                 |
| ------------- | ------------------------ | ----------------------------------------------------------------------------- |
| `testimonial` | `TestimonialItem`        | `content/home.ts`, `content/academy.ts`, `content/partners.ts` `voices.items` |
| `faq`         | `FaqItem`                | FAQs on home, community, partners, contact, academy                           |
| `partner`     | `Partner`                | `content/partners.ts` `partnersList`                                          |
| `teamMember`  | About team/advisor cards | `content/about.ts` `team`, `advisors`                                         |
| `memberStory` | `MemberStoryItem`        | `content/community.ts` `memberStories.items`                                  |

`author` remains Phase 1 (Academy).

#### Routes wired in Phase 2

| Route        | CMS-fed sections                                                  |
| ------------ | ----------------------------------------------------------------- |
| `/` (Home)   | Testimonials, FAQs, partner marquee                               |
| `/about`     | Team, advisors                                                    |
| `/academy`   | Hub testimonials, hub FAQs (catalogues already Phase 1)           |
| `/community` | FAQs, member stories                                              |
| `/partners`  | Partner logos (marquee + voices grid), partner voice quotes, FAQs |
| `/contact`   | FAQs                                                              |

Page heroes and section intros stay static in Phase 2 unless noted in Phase 3.

#### Implementation bundle (Phase 2 — ship as three internal slices)

Same phase, smaller PRs. Each slice: schemas + fetch + migrate seed to
`development` + wire routes + guards + webhook paths for its types.

**2A — Testimonials & FAQs**

- `testimonial`, `faq` schemas + fetch
- Wire: Home/Academy testimonials, Partners voice quotes, all five FAQ sections
- FAQ projection pattern (see `faq` model below)

**2B — Partners**

- `partner` schema + fetch + `buildVoicesLogoGrid()` helper (code-owned layout)
- Wire: Home marquee, Partners marquee + voices logo grid + voice quotes already
  in 2A for quotes — order 2A before 2B or ship quotes with 2A and logos in 2B

**2C — People**

- `teamMember`, `memberStory` schemas + fetch
- Wire: About team/advisors, Community member stories

Shared across slices:

1. Empty-state guards (Rules 1–3)
2. Hybrid cutover: static fallback until CMS returns ≥1 doc per section, then
   CMS-only; hide if empty after cutover
3. `scripts/migrate-phase2-to-sanity.ts` — can run per slice or once at end of
   Phase 2; always targets **`development` first**

**Production dataset:** migrate placeholders only after client/staging review —
see Migration & seeding.

**Exit criteria:** editors can add/edit/delete testimonials, FAQs, partners,
team, advisors, and member stories from `/admin` without deploy; no empty layout
bands; all Phase 2 placeholders visible in Studio on handoff.

#### Phase 2 revalidation paths (add to webhook map)

| `_type`       | `revalidatePath`                                       |
| ------------- | ------------------------------------------------------ |
| `testimonial` | `/`, `/academy`, `/partners`                           |
| `faq`         | `/`, `/community`, `/partners`, `/contact`, `/academy` |
| `partner`     | `/`, `/partners`                                       |
| `teamMember`  | `/about`                                               |
| `memberStory` | `/community`                                           |

### Phase 3 — Page singletons & marketing copy

- `siteSettings`, `homePage`, `aboutPage` (partial), etc.
- Only where Phase 2 proved stable and client needs self-serve edits

### Phase 4 — Polish (optional)

- Visual Editing / draft preview if client UAT requires it
- TypeGen in CI after schema stabilises
- Algolia or dedicated search service only if catalogue scale demands it

---

## Locked decisions (post-review)

| Topic                  | Decision                                                                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Studio path            | `/admin`                                                                                                                                            |
| Datasets               | `development` + `production` from day one                                                                                                           |
| Authors                | **Reference** `author` docs (minimal fields v1: name, role, optional photo)                                                                         |
| FAQs (Phase 2)         | Flat `faq` docs with controlled `section` + `category` list options                                                                                 |
| Testimonials at launch | **Hybrid:** keep static seed until CMS returns ≥1 published testimonial for that placement, then cut over; after cutover, **hide section** if empty |
| Course/webinar bodies  | `string[]` v1 (not Portable Text)                                                                                                                   |
| Publish visibility     | Sanity draft filter only — **no `isPublished` field** on catalogue docs                                                                             |
| Search (Phase 1)       | Same three catalogue fetches → existing client filter                                                                                               |
| Revalidation v1        | `revalidatePath` only (no tags); listing paths must revalidate on every publish because they are the index                                          |
| Webhook auth           | Sanity signed payload / HMAC verification (not bare query secret alone)                                                                             |
| Vision plugin          | Omit from client-facing Studio desk; dev-only if needed                                                                                             |
| Read token             | Not required for published reads on a **public** dataset; token for preview/drafts/write/migration only                                             |

---

## Branded CMS fallbacks (not generic placeholders)

For **live CMS content**, prefer on-brand fallbacks — same philosophy as
`content/system-pages.ts` and scoped `not-found.tsx` surfaces — instead of
q-das-style “coming soon” bands or anonymous stock placeholders.

| Case                         | Approach                                                                                                                                        |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Missing catalogue card image | Branded **no-image** frame (iProduce mark + neutral `bg-subtle`), e.g. `components/shared/cms-fallback-image.tsx` + asset under `public/brand/` |
| Missing optional avatar      | Initials fallback (already in `TestimonialsSection`) — no full-width placeholder section                                                        |
| Empty marketing section      | `return null` (Rule 1) — no silent empty carousel                                                                                               |
| Empty listing catalogue      | Honest inline empty copy on the listing route only                                                                                              |
| Broken featured pointer      | Coalesce GROQ fallback (see academy spec) — never a visible error state                                                                         |

`lib/placeholder-images.ts` remains for **static dev seeding and migration QA**,
not as the long-term fallback for missing Sanity assets on production pages.

---

## Phase 2 document models

Full field definitions for Phase 2 implementation. Types must satisfy existing
contracts in `types/content.ts` and `types/community.ts`.

### `testimonial`

Maps to `types/content.ts` → `TestimonialItem`.

| Field        | Type                    | Notes                                |
| ------------ | ----------------------- | ------------------------------------ |
| `quote`      | text                    | required                             |
| `name`       | string                  | required                             |
| `role`       | string                  | required                             |
| `image`      | image + alt             | optional → initials in UI            |
| `initials`   | string                  | optional override                    |
| `placements` | array (controlled list) | `home`, `academy`, `partners-voices` |
| `order`      | number                  | sort within placement                |

**Partner voice quotes** (`/partners` carousel) use placement `partners-voices`.
Home and Academy hub carousels use `home` and `academy` respectively. One doc
can list multiple placements if the same quote should appear in more than one
surface.

### `faq`

Maps to `FaqItem` + page filter.

| Field      | Type   | Notes                                                                        |
| ---------- | ------ | ---------------------------------------------------------------------------- |
| `question` | string | required                                                                     |
| `answer`   | text   | required                                                                     |
| `category` | string | **controlled `list`** — must match target page tab labels exactly            |
| `section`  | string | **controlled `list`:** `home`, `community`, `partners`, `contact`, `academy` |
| `order`    | number | optional                                                                     |

**`FaqSection` projection (matches `FaqSectionContent` in `types/content.ts`):**

| Part                              | Source                                       | Notes                                                                                                                      |
| --------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `eyebrow`, `title`, `description` | **Code** — per-page in `content/*.ts`        | Section chrome unchanged in Phase 2                                                                                        |
| `categories`                      | **Code** — per-page controlled list          | Must include `"All"` first (e.g. `homeContent.faqCategories`). **Do not** derive tabs from CMS in v1 — avoids filter drift |
| `items`                           | **CMS** — `faq` docs where `section == page` | Each doc `category` must match a value in that page's `categories` list (excluding `All`)                                  |

Fetch helper returns `{ categories, items }` merged with static section chrome at
the page boundary.

**Alternative (heavier):** FAQ groups embedded in page singletons — rejected
for Phase 2 in favour of flat `faq` docs + `section` filter.

### `partner`

Maps to `content/partners.ts` → `Partner` (`id`, `name`, `logo`, `href?`).

| Sanity field    | Type                    | Projects to                                                                    |
| --------------- | ----------------------- | ------------------------------------------------------------------------------ |
| `slug`          | slug (required, unique) | `id` — stable key, e.g. `icreate-africa` (matches current `partnersList[].id`) |
| `name`          | string                  | `name`                                                                         |
| `logo`          | image + alt (required)  | `logo` URL string                                                              |
| `website`       | url optional            | `href` — omit when unset                                                       |
| `showInMarquee` | boolean                 | Home + partners logo marquee bands                                             |
| `showInVoices`  | boolean                 | Eligible for voices logo grid (see layout rule below)                          |
| `order`         | number                  | Sort within marquee / voices pool                                              |

**Voices logo grid — CMS data vs code layout**

Static v1: `partnersList` feeds **both** the marquee and the voices grid. There
is **no** per-cell logo array in content — the grid is derived at render time.

| Layer                                         | Owner                                                                   |
| --------------------------------------------- | ----------------------------------------------------------------------- |
| Partner catalogue (name, logo, href, order)   | **CMS** — `partner` documents                                           |
| Which partners are eligible for marquee       | **CMS** — `showInMarquee` (static v1: all entries)                      |
| Which partners are eligible for voices grid   | **CMS** — `showInVoices` (static v1: all entries)                       |
| Sort order within each pool                   | **CMS** — `order` (lower first), then `name`                            |
| 12-cell layout, fair repeats, window rotation | **Code** — `lib/partners/voices-logo-grid.ts` → `buildVoicesLogoGrid()` |
| Crossfade between windows                     | **Code** — `components/partners/voices-logo-grid.tsx`                   |

Do **not** model per-cell repeats or a 12-slot logo array in Sanity for v1.
Editors add real partners; the layout helper fills or rotates the grid.

#### Section wireframe (`/partners` — Voices band)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  PARTNERS PAGE — "Voices" section (bg-subtle)                           │
│                                                                         │
│  ┌──────────────────────────────┐  ┌──────────────────────────────────┐ │
│  │  Eyebrow + title             │  │                                  │ │
│  │                              │  │     LOGO GRID  (VoicesLogoGrid) │ │
│  │  ┌────────────────────────┐  │  │                                  │ │
│  │  │  Quote carousel        │  │  │                                  │ │
│  │  │  (testimonial docs)    │  │  │                                  │ │
│  │  │  • • • dots            │  │  │                                  │ │
│  │  └────────────────────────┘  │  │                                  │ │
│  └──────────────────────────────┘  └──────────────────────────────────┘ │
│         LEFT (quotes)                      RIGHT (logos)                  │
│                                                                         │
│  Mobile: stacks — quotes on top, grid below (full width)                │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Logo cell chrome (code-owned)

```
┌─────────────────────┐
│                     │
│      [  LOGO  ]     │  white card, border, logo centered (aspect ~5:3)
│                     │
└─────────────────────┘
```

Reuses `<PartnerLogo />` from `components/shared/partner-logo.tsx`. Card
wrapper lives in `voices-logo-grid.tsx` — not the marquee card.

#### Desktop grid — 12 slots (3 columns × 4 rows)

Target constant: `VOICES_LOGO_GRID_TARGET = 12`.

```
┌─────────┬─────────┬─────────┐
│    1    │    2    │    3    │  row 1
├─────────┼─────────┼─────────┤
│    4    │    5    │    6    │  row 2
├─────────┼─────────┼─────────┤
│    7    │    8    │    9    │  row 3
├─────────┼─────────┼─────────┤
│   10    │   11    │   12    │  row 4
└─────────┴─────────┴─────────┘
```

#### Mobile grid — 6 visible slots (2 columns × 3 rows)

Same 12-cell build; cells 7–12 use `hidden sm:flex`. Mobile shows indices 0–5
only.

```
┌─────────┬─────────┐
│    1    │    2    │  row 1
├─────────┼─────────┤
│    3    │    4    │  row 2
├─────────┼─────────┤
│    5    │    6    │  row 3
└─────────┴─────────┘
   (rows 4–6 hidden below sm)
```

#### Fill rules (`buildVoicesLogoGrid`)

Partners are sorted by `order` asc, then `name`. Let `N` = eligible partner
count, `T` = 12.

| Condition | Behaviour                                                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `N === 0` | Return `[]`; section guard may hide grid                                                                                                        |
| `N < T`   | **Round-robin** fill to `T` cells — fair rotation through the pool; skip a candidate when it would sit **adjacent** to the same `id`            |
| `N ≥ T`   | **Rotating window** — always `T` cells; start at `(windowIndex × T) % N`, walk forward with **modulo wrap** through the sorted pool (see below) |

Example with 5 partners and `T = 12` (round-robin):

```
Pool (by order):  [1][2][3][4][5]

12 cells:         [1][2][3][4][5][1][2][3][4][5][1][2]
```

Not random — deterministic for QA and sponsor fairness.

#### Overflow rotation (`N > T`)

When the catalogue exceeds 12, advance `windowIndex` on a timer; the entire grid
crossfades (not per-cell shuffle). Each window always shows **exactly `T`
cells** — the grid never shrinks.

**Window selection (intentional — matches `selectPartnerWindow`):**

```
start = (windowIndex × T) % N
cell[i] = pool[(start + i) % N]   for i = 0 … T−1
```

`windowCount = ceil(N / T)` — same as `getVoicesLogoWindowCount()`.

When `N` is an exact multiple of `T` (e.g. 24), windows are non-overlapping
chunks with no wrap inside a window:

```
Window 0: partners  1–12
Window 1: partners 13–24
```

When `T < N < 2T` (e.g. `N = 15`), later windows **wrap** through the pool to
fill all 12 cells — some partners reappear within that window. That is
acceptable for sponsor exposure; we do **not** use strict non-overlapping slices
(option B rejected for v1).

```
N = 15, T = 12

Window 0 (start 0):  [1][2][3]…[12]
Window 1 (start 12): [13][14][15][1][2][3][4][5][6][7][8][9]
                     └── wrap ──┘
```

```
┌── Window 0 ──┐     ~10s crossfade     ┌── Window 1 (wraps) ──┐
│ 1 … 12       │  ───────────────────►  │ 13,14,15,1,2,3,4,5,6,7,8,9 │
└──────────────┘                        └──────────────────────────┘
```

| Motion rule                        | Implementation                                  |
| ---------------------------------- | ----------------------------------------------- |
| Rotate only when `windowCount > 1` | `getVoicesLogoWindowCount()`                    |
| Interval ~10s                      | `ROTATE_INTERVAL_MS` in `voices-logo-grid.tsx`  |
| Pause on hover                     | `onMouseEnter` / `onMouseLeave` on grid wrapper |
| `prefers-reduced-motion`           | No rotation; show window 0 only                 |

Home/About **marquee** is separate: infinite horizontal scroll of the marquee
pool (`showInMarquee`), not this 3×4 grid.

#### CMS fetch (Phase 2)

```groq
// Marquee pool
*[_type == "partner" && showInMarquee == true && !(_id in path("drafts.**"))]
  | order(order asc, name asc) { "id": slug.current, name, "logo": logo.asset->url, website }

// Voices grid pool
*[_type == "partner" && showInVoices == true && !(_id in path("drafts.**"))]
  | order(order asc, name asc) { "id": slug.current, name, "logo": logo.asset->url, website }
```

Projection uses `logo.asset->url` for documentation clarity. Implementation should
map logos through the shared Sanity image helper (`urlFor()` or equivalent) for
CDN params and consistent sizing — not raw URLs inlined in components.

Map `website` → `href`. Pass voices pool into `<VoicesLogoGrid partners={...} />`.
Do not persist grid cells in Sanity.

#### What editors control vs engineering

| Editors (CMS)                           | Engineering (code)                                         |
| --------------------------------------- | ---------------------------------------------------------- |
| Add/remove partner logos                | 12-cell target count                                       |
| Set `order` for tiering                 | Round-robin + anti-adjacent-repeat                         |
| Toggle `showInMarquee` / `showInVoices` | Modulo window walk when `N ≥ 12` (wrap on partial windows) |
| Upload logo image + alt                 | Crossfade timing, pause-on-hover, reduced motion           |
| Partner `website` URL                   | Mobile 6 / desktop 12 visibility split                     |

### `teamMember`

Maps to `types/about.ts` → `AboutPerson`. One document type serves both
About team carousel and advisors grid; query twice on `/about` with
`group == 'team'` and `group == 'advisor'`. Static v1 mirror:
`content/about-people.ts`.

| Sanity field       | Type                                   | Projects to                  | Required                                                                                                                                       |
| ------------------ | -------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug` / stable id | slug                                   | `id`                         | yes — React keys, dialog state                                                                                                                 |
| `name`             | string                                 | `name`                       | yes                                                                                                                                            |
| `role`             | string                                 | `role`                       | yes                                                                                                                                            |
| `bioSummary`       | text                                   | `bioSummary`                 | yes — card teaser (`line-clamp-3`)                                                                                                             |
| `bioParagraphs`    | array of text / portable text blocks   | `bioParagraphs[]`            | yes — profile dialog body                                                                                                                      |
| `credentials`      | string                                 | `credentials`                | optional — modal header under role                                                                                                             |
| `photo`            | image + alt                            | `photo` URL string           | yes                                                                                                                                            |
| `group`            | list                                   | `team` \| `advisor`          | yes                                                                                                                                            |
| `socials`          | array of `{ platform, value, label? }` | `socials[]` on `AboutPerson` | optional — `platform`: `linkedin` \| `facebook` \| `x` \| `instagram` \| `telegram` \| `website` \| `email` \| `phone`; email/phone modal-only |
| `order`            | number                                 | carousel/grid sort           | optional                                                                                                                                       |

Section chrome (`eyebrow`, `title`, `description`, `viewProfileLabel`,
`readMoreLabel` on `AboutTeam` / `AboutAdvisors`) stays **code-owned** in
`content/about.ts` for Phase 2 — only `members[]` from CMS.

### `memberStory`

Maps to `types/community.ts` → `MemberStoryItem`. Community page only.

| Field          | Type   | Notes                       |
| -------------- | ------ | --------------------------- |
| `result`       | text   | required — outcome headline |
| `challenge`    | text   | required                    |
| `withIProduce` | text   | required                    |
| `name`         | string | required                    |
| `role`         | string | required                    |
| `country`      | string | required                    |
| `initials`     | string | required                    |
| `age`          | number | optional                    |
| `order`        | number | carousel/grid sort          |

Studio seeds all four current placeholder stories from `content/community.ts`.

_No `isPublished` on Phase 2 types — Sanity publish + drafts filter only._

---

## Edge cases & empty content (mandatory rules)

Lesson from q-das: wiring CMS data without **render guards** leaves empty bands
(testimonials mapped but array empty → heading with no cards, or “coming soon”
shell the client did not ask for).

### Rule 1 — Section-level guard (default)

Every CMS-fed **section component** must treat “no displayable items” as **hide
the entire section** (`return null`), not an empty carousel/grid shell.

```tsx
// Pattern — apply at section boundary, not inside carousel only
if (!items?.length) return null;
```

Applies to: `TestimonialsSection`, `FaqSection`, partners marquee/voices,
About team/advisors grids, community member stories, Academy related grids,
listing grids (fallback to empty state copy only on **listing routes**).

### Rule 2 — Listing pages vs marketing bands vs anchor-linked hub bands

Not every empty band is the same kind of empty. Split by whether the section
has an identity other pieces of the page depend on:

| Surface                                                             | Empty catalogue behaviour                                                                                                                                                                                                                |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/academy/blog` (etc.), listing routes                              | Show listing hero + honest "No articles yet" empty state (unchanged)                                                                                                                                                                     |
| Home Academy Spotlight tab (upcoming events / training)             | Swap **that tab's** grid for a quiet on-brand empty-state panel (`CatalogueEmptyState`) — the tab strip and the other tab stay live; nothing about the section hides                                                                     |
| Academy hub band (Webinars & Events / Courses / Blog on `/academy`) | **Never hide.** Header, eyebrow, and anchor id (`#webinars-events` etc.) must survive — the tab strip and the Learning Opportunities "Jump to section" cards scroll-link straight to it. Swap the grid for `CatalogueEmptyState` instead |
| Related section on detail slug                                      | **Omit block** if no related items                                                                                                                                                                                                       |

**Why the hub row changed (2026-07-04):** the original rule treated "Home /
Academy hub preview band" as one case and said "omit band if below minimum
items." That's correct for Home (its Spotlight tabs are pure marketing
teasers with no anchor dependency) but wrong for the hub page — `/academy`'s
three catalogue bands are the actual scroll targets for the sticky tab strip
and the Opportunities "Jump to section" cards elsewhere on the same page.
Hiding the section would leave those links scrolling to nothing. So the hub
gets its own row: never hidden, always shows its header, only the grid
underneath swaps to an empty-state panel.

### Rule 3 — Minimum items before showing a band

| Band                                              | Minimum | Fallback                                                                                    |
| ------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| Testimonials carousel                             | 1       | hide section                                                                                |
| FAQ accordion                                     | 1       | hide section                                                                                |
| Partners marquee                                  | 1       | hide section (hybrid static until Phase 2 cutover)                                          |
| Partner voices quotes                             | 1       | hide quotes band; logo grid uses `buildVoicesLogoGrid` (may repeat few logos)               |
| Team / advisors grid                              | 1       | hide section                                                                                |
| Community member stories                          | 1       | hide section                                                                                |
| Home Academy Spotlight tab (webinars/courses)     | 1       | swap that tab's grid for `CatalogueEmptyState` — never hides the whole section (see Rule 2) |
| Academy hub band (webinars & events/courses/blog) | 1       | **never hide** — swap grid for `CatalogueEmptyState`, header/anchor stays (see Rule 2)      |
| Related items                                     | 1       | hide related block                                                                          |

Document thresholds in the spec checklist when implementing each page.

**Implementation (shipped 2026-07-04, ahead of the fetch-layer cutover):**
`components/shared/catalogue-empty-state.tsx` is the shared quiet on-brand
panel (leaf-tinted circle badge, serif heading, muted description, `green`
button CTA — same visual language as `PeopleRosterEmpty`). Content shape is
`CatalogueEmptyStateContent` (`types/content.ts`): `icon` (`"calendar"` |
`"graduation-cap"` | `"newspaper"`), `title`, `description`, `ctaLabel`,
`ctaHref`. Wired via `AcademyListing<TItem>.emptyState?` (hub bands,
`components/academy/hub/learning-listing-section.tsx`) and
`AcademyHomePreview.spotlightEmptyState.{upcoming,training}` (Home,
`components/home/academy-spotlight-section.tsx`). Copy lives in
`content/academy.ts` alongside each band/tab's existing chrome — no new
content module. This is static-content-only today (the current
`content/academy.ts` catalogues are never actually empty), but the branch is
real and was verified live: as of 2026-07-04 the Home Spotlight's "Upcoming
Events" tab was organically empty (demo webinar dates had passed) and
correctly rendered the empty-state panel before dates were pushed forward.

### Rule 4 — Featured / pointer fields

- Resolve in **fetch layer** with a **single coalesce GROQ** per catalogue (not
  two round-trips). Pattern:

```groq
coalesce(
  *[_type == "academyArticle" && slug.current == $featuredSlug && !(_id in path("drafts.**"))][0],
  *[_type == "academyArticle" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0]
)
```

- If coalesce returns null → omit featured band on marketing surfaces; listing
  route shows honest empty state if entire catalogue is empty.
- Never `throw` at render time for bad editor pointers.

### Rule 4b — Slug changes and deletes

- **Uniqueness:** `slug.current` unique per `_type` (Studio validation).
- **After first publish:** treat slug as **append-only** — Studio warning if
  editor changes slug on a published doc; no redirects table in v1.
- **`generateStaticParams`:** built from current published slugs; rely on Next
  default `dynamicParams = true` so removed slugs 404 until revalidation.
- **Webhooks:** on slug change, revalidate **old and new** detail paths plus all
  listing/index paths (blog/webinars/courses, hub, home, search).
- **Unpublish/delete:** detail URL → `notFound()`; remove from listings on next
  revalidation.

### Rule 5 — Drafts and publish state

- All public GROQ includes:

```groq
!(_id in path("drafts.**"))
```

- **Do not add `isPublished`** on catalogue documents — editors use Sanity
  Publish; a second flag creates “published but hidden” confusion.

### Rule 6 — Images

- Studio: **alt required** whenever an image field is set.
- Runtime: missing CMS image on catalogue cards → **branded `CmsFallbackImage`**
  (see Branded CMS fallbacks above).
- Optional avatars: initials fallback or omit image — never a full-width empty band.

### Rule 7 — Studio validation vs runtime

| Concern                        | Studio                          | Runtime                 |
| ------------------------------ | ------------------------------- | ----------------------- |
| Required title/slug            | `validation: Rule.required()`   | `notFound()` on detail  |
| Empty testimonial list on home | warn in desk description        | hide section            |
| Broken featured pointer        | optional reference validation   | fallback query          |
| FAQ category typo              | `list` options matching `types` | filter out non-matching |

### Rule 8 — No silent “coming soon” placeholders

Do **not** add full-width placeholder sections (q-das testimonials empty state)
unless **explicit copy** is approved in `content/` or a CMS `emptyState` singleton.
Default = **omit section**.

---

## Fetch & cache strategy (agreed direction)

Align with `docs/routes/academy-spec.md`:

| Concern              | Choice                                                                        |
| -------------------- | ----------------------------------------------------------------------------- |
| Data loading         | Server Components                                                             |
| Client state         | No React Query for CMS content                                                |
| Default cache        | Time-based `revalidate` (e.g. 3600s) on marketing pages                       |
| On publish           | Sanity webhook → `app/api/revalidate/route.ts` — **signed/HMAC** verification |
| Revalidation scope   | **Paths only in v1** — always include listing routes, not just detail slugs   |
| Live preview         | **Deferred** until client UAT asks                                            |
| CDN                  | `useCdn: false` on server fetch when using path revalidation                  |
| Public dataset reads | No read token for published content; token only for drafts/preview/write      |

---

## Migration & seeding

**Handoff rule:** editors receive a **pre-filled** Studio on **`development`**
first — all current static placeholders migrated by script, not typed manually.
Clients edit or delete from `/admin` while reviewing on staging.

**`production` dataset:** run the same migration scripts **only after**
client/staging sign-off on placeholder content. Demo team names, partner quotes,
and member stories must not become live CMS truth by accident. Promote
`development` → `production` via explicit `--dataset production --confirm` after
approval.

1. **Script** (from q-das `scripts/migrate-to-sanity.ts`): read static
   `content/*` collections → create documents + upload images from `public/`.
2. **Phase 1:** all Academy catalogues + authors → `development`, then production
   when approved.
3. **Phase 2:** testimonials, FAQs, partners, team/advisors, member stories —
   `scripts/migrate-phase2-to-sanity.ts`; same dataset policy.
4. **Default target:** `development` dataset; require
   `--dataset production --confirm` for production writes.
5. **Idempotent:** deterministic document `_id` per record (see below); use
   `createIfNotExists` on write. **Do not** rely on auto `_id` + slug GROQ
   lookup alone.
6. **`--dry-run`:** API read-only against the target dataset (see below).
7. **Manifest:** log image upload failures, slug/id collisions, skipped records.
8. **Rollback:** move static files to `content/_archived/` for one release after
   cutover — do not delete immediately.

### Deterministic `_id` + idempotency (locked)

| Document type    | `_id` pattern              | Example                                |
| ---------------- | -------------------------- | -------------------------------------- |
| `academyArticle` | `academyArticle.{slug}`    | `academyArticle.unlocking-trade`       |
| `academyWebinar` | `academyWebinar.{slug}`    | `academyWebinar.intro-to-export`       |
| `academyCourse`  | `academyCourse.{slug}`     | `academyCourse.agribusiness-basics`    |
| `author`         | `author.{slug}`            | `author.ada-okonkwo`                   |
| Phase 2 types    | `{_type}.{slug}` or `{id}` | `partner.{id}`, `teamMember.{slug}`, … |

- Slug segment = `slug.current` from static source (already kebab-case).
- **Write order (required images):** upload assets from `public/` first, then
  `createIfNotExists` with complete image refs. Do **not** create documents with
  missing required images and patch later on first execute — that leaves invalid
  Studio rows. Re-runs / failed-image recovery use `patch` on existing `_id`.
- Write path: `client.createIfNotExists({ _id, _type, … })` with asset refs
  already set when images are required.
- Re-run behaviour: existing `_id` → **SKIP** (manifest line); no duplicate docs.
- Slug edits after publish are editorial (append-only policy already locked);
  changing slug without a migration leaves an orphan `_id` — acceptable v1 risk.

Published-content GROQ still filters `!(_id in path("drafts.**"))`; listing
queries continue to use `slug.current`, not `_id`.

### `--dry-run` semantics (locked)

**Default `--dry-run` = read-only against Sanity** (accurate CREATE/SKIP preview):

- Requires `NEXT_PUBLIC_SANITY_PROJECT_ID` + target `--dataset` (read access;
  write token **not** required).
- For each planned document: `getDocument(_id)` (or equivalent).
  - Missing → manifest `CREATE`
  - Present → manifest `SKIP`
  - Present but `slug.current` differs from static source → `SKIP` + `WARN` slug
    drift (do not mutate in dry-run).
- **No** asset uploads, **no** `create` / `patch` / `delete` mutations.
- Image step: scan `public/` paths and report `WOULD_UPLOAD` / missing file
  errors without calling Sanity assets API.

**Optional `--dry-run --offline`:** validate static `content/*` sources and print
the same manifest shape without calling Sanity — for local/CI before the project
exists. Idempotency preview is **plan only** in this mode (no verified SKIP).

**Default-safe:** running the script with no flags performs **no writes**; pass
`--execute` (or `--confirm` combined with dataset flags) to mutate.

---

## Studio desk structure (draft)

```
Site Settings (singleton)          — Phase 3
─────────────────────────────────
Academy
  Articles
  Webinars & Events
  Courses
  Authors
─────────────────────────────────
People & trust                     — Phase 2
  Team & advisors
  Testimonials
  Partners
  Member stories                   — Community page
─────────────────────────────────
FAQs                               — Phase 2
  All sections (filtered desk views)
```

Academy Phase 1 desk: three catalogues + Authors. **No Vision plugin** in the
client-facing desk (add only for internal dev if needed).

---

## Environment variables (preview)

| Variable                        | Purpose                                |
| ------------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Client + server                        |
| `NEXT_PUBLIC_SANITY_DATASET`    | `production` / `development`           |
| `SANITY_API_READ_TOKEN`         | Draft/preview reads only (optional v1) |
| `SANITY_API_WRITE_TOKEN`        | Migration script only (local/CI)       |
| `SANITY_REVALIDATE_SECRET`      | Webhook signature verification         |

---

## Review checklist (before implementation)

- [x] Phase boundaries approved (1–4)
- [x] CMS vs code table agreed
- [x] Edge-case rules accepted (hide-vs-placeholder, branded fallbacks)
- [x] Folder tree approved
- [x] External review (Codex + Claude) incorporated
- [ ] Client sign-off on CMS scope
- [ ] `docs/sanity-academy-spec.md` checklist signed off
- [ ] Sanity project ownership / handoff aligned with Resend pattern

---

## Implementation log

When implementation starts, append to `docs/implementation-log.md` — do not mark
Sanity “done” until seed + build + empty-state QA pass.
