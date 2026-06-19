# File Structure Proposal

This is the balanced target structure I would recommend for iProduce Africa
after comparing:

- `nabeels-portfolio`
- `q-das`
- the current `iproduce-africa` repo

The goal is not to copy any one repo exactly. The goal is to keep this project:

- clean for humans
- easy for agents to catch up on
- ready for Sanity later
- not over-engineered for a mostly marketing-focused site

## What The References Get Right

### From `q-das`

- layout ownership for shared public chrome
- page-specific component folders like `components/about`, `components/home`
- separate buckets for `lib/data`, `lib/types`, `lib/sanity`, `lib/schemas`
- a dedicated `sanity/` folder for schema definitions

### From `nabeels-portfolio`

- clean split between `components/layout`, `components/sections`, `components/ui`
- `lib/data` and `lib/types` kept out of component files
- Sanity isolated under `sanity/`
- service/integration concerns kept outside presentation

## What Senior Developers Usually Optimize For

A good structure is usually:

- shallow enough to scan quickly
- explicit about ownership
- stable as the project grows
- boring in the right places

What senior teams usually avoid:

- putting data in `lib/` with no clear reason
- mixing content, utilities, types, and integrations together
- creating huge `shared` or `common` buckets with no boundaries
- overusing `features/` for a simple marketing site

## Recommendation For iProduce Africa

Keep the structure simple for now because the current app surface is only six
similar public pages.

### Recommended Target Tree

```text
app/
  layout.tsx
  globals.css
  page.tsx
  about/page.tsx
  academy/page.tsx
  community/page.tsx
  partners/page.tsx
  contact/page.tsx
  api/
    ...later as needed
  admin/
    [[...index]]/page.tsx        # later, when Sanity is added

components/
  ui/                            # primitives only
  layout/                        # shared public-site chrome and repeated sections
    header.tsx
    footer.tsx
    mobile-nav.tsx
    page-hero.tsx
  home/
  about/
  academy/
  community/
  partners/
  contact/

content/
  site.ts                        # site identity and contact details
  navigation.ts                  # shared header/mobile nav structure
  seo.ts                         # metadata copy and sitemap route data
  home.ts
  about.ts
  academy.ts
  community.ts
  partners.ts
  contact.ts

types/
  content.ts
  site.ts
  navigation.ts
  shared.ts
  sanity.ts                      # later

lib/
  utils.ts
  metadata.ts
  placeholder-images.ts
  constants.ts                   # only if needed later
  sanity/                        # later
    client.ts
    fetch.ts
    image.ts
    queries.ts
  email/                         # later
  services/                      # later, only if real integrations grow

schemas/
  contact.ts                     # later, when form validation becomes real

sanity/
  env.ts
  lib/
  schemas/
    documents/
    objects/

docs/
  README.md
  workflow.md
  implementation-log.md
  design-system.md
  layout-system.md
  mvp-phases.md
  file-structure-proposal.md
  routes/
  shared/

public/
  images/
```

## Why This Is Balanced

### 1. `app/` stays about routing

`app/` should own route structure, layout files, metadata, and route handlers.
It should not become the dumping ground for marketing data or component logic.

### 2. `components/layout/` is good enough and understandable here

Because this repo is a small public site with six core pages, keeping
`components/layout/` is a reasonable and understandable choice.

Senior teams often prefer the lowest-churn name that the whole team already
understands, especially when the project is still small.

For this repo, `components/layout/` should own:

- header
- footer
- mobile nav
- shared public-site hero blocks

### 3. `content/` should own static copy

For this project, `content/` is a better home than `lib/data/` because the data
is mostly editable site content, not business logic.

Use `content/` for:

- page copy
- repeated card collections
- navigation items
- SEO copy and sitemap route data
- CTA labels

Do not use `content/` for utility functions or runtime helpers.

### 4. `types/` deserves to be first-class

This repo now has a small root `types/` folder, and that is the right
direction. It is cleaner than burying shared shapes inside `lib/` because the
project is likely to gain:

- page-content types
- navigation/footer item types
- Sanity document types later

Recommended rule:

- shared content and domain shape types go in `types/`
- tiny local component prop types stay beside the component

### 5. `lib/` should stay small and infrastructure-focused

Use `lib/` for:

- utilities
- metadata helpers
- placeholder-image helpers
- future Sanity client/fetch/query helpers
- future service integrations

Do not turn `lib/` into a second junk drawer.

Current rule:

- do not create a `tokens.ts` file unless multiple TypeScript modules actually
  need the same token object at runtime
- for this repo now, `app/globals.css` is the token source of truth and
  component primitives own their own variants

### 6. `sanity/` should stay top-level when it arrives

This is one thing both `q-das` and your portfolio point toward clearly.

When Sanity is added, keep:

- schema definitions
- studio structure
- Sanity-specific config

inside a top-level `sanity/` folder.

Then use `lib/sanity/` only for app-side fetch helpers and image/query helpers.

## What We Have Already Aligned

These are the structure choices now agreed for this repo:

1. Keep the top-level `app/` route structure flat for now
2. Keep `components/layout` as the shared chrome bucket
3. Keep editable content in `content/`
4. Keep shared shapes in a small root `types/` folder
5. Keep final exported assets under `public/images/`
6. Use a root `schemas/` folder once forms need reusable Zod/runtime validation

## What I Would Change Next

These are the remaining structure improvements I’d make as the build grows:

1. Add empty page folders under `components/` only when a page actually gains
   real sections
2. Split `content/home.ts` further only if the Home page becomes too large
3. Add `sanity/` and `lib/sanity/` only when the CMS phase actually starts

## What I Would Not Change Yet

These would be premature right now:

- introducing a heavy `features/` architecture
- creating a `src/` folder just for aesthetics
- splitting every section into its own nested micro-folder
- adding `hooks/` or `services/` folders before real usage exists

## Future Structure Rules

Create later folders only when there is real code to justify them.

- add `sanity/` when the CMS phase actually starts
- add `lib/sanity/` when the app needs Sanity fetch, image, or query helpers
- keep `schemas/` focused on runtime validation and schema-derived form value
  types; do not use it for Sanity document definitions
- add `email/` or `lib/email/` when email templates or delivery helpers exist
- add `analytics/` only when tracking grows beyond a tiny provider snippet
- avoid empty placeholder folders that make the repo look larger than it is

## Practical Structure For The Next Milestone

If we stay pragmatic, the next near-term target should be:

```text
app/**
components/
  ui/
  layout/
  home/
  about/
content/
  site.ts
  navigation.ts
  seo.ts
  home.ts
  about.ts
  academy.ts
  community.ts
  partners.ts
  contact.ts
types/
  site.ts
  navigation.ts
  content.ts
lib/
  utils.ts
  metadata.ts
  placeholder-images.ts
docs/
  ...
```

That gives us enough structure to grow properly without doing a huge refactor
before the Home page is approved.

## Final Recommendation

If you want the most balanced move now:

1. keep the current flat `app/` route structure
2. keep `components/layout` as the shared chrome bucket
3. separate `content/site.ts`, `content/navigation.ts`, and `content/seo.ts`
   by concern
4. keep editable site copy and site config in `content/`
5. keep a small root `types/` folder for shared shapes
6. leave boilerplate route states and richer infrastructure for later

That is the level I think most strong senior developers would choose here:

- organized
- scalable
- CMS-ready
- not overbuilt
