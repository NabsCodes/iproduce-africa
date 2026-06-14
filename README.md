# iProduce Africa Website

Static-first implementation of the approved iProduce Africa redesign. The
current milestone translates the Figma screens into responsive Next.js pages;
Sanity CMS integration comes after the interface and content structure are
approved.

## Current Milestone

Right now the focus is foundation plus Home page fidelity:

- establish the docs, layout system, and design system first
- complete the Home page as a polished static experience
- keep secondary public routes scaffolded but lightweight
- defer Sanity, live forms, and backend integrations until the interface is
  approved

## Project Structure

```text
app/                  Root app shell, fonts, and public routes
components/[page]/    Page-specific sections, such as Home and About
components/layout/    Shared site chrome and page-intro patterns
components/ui/        Small reusable UI primitives
content/              Static MVP content, site config, and page copy
types/                Shared content and navigation shapes
lib/                  Metadata helpers, temporary imagery helpers, and utilities
public/               Final exported assets, including route-based images
```

Keep copy and collection data in `content/`. Components own presentation and
interaction. Temporary imagery stays in `lib/placeholder-images.ts` until final
assets are exported into `public/images/`, organized by route or shared usage
such as `public/images/home/` and `public/images/shared/`.

Shared content ownership should stay simple:

- `content/site.ts` for site identity and contact details
- `content/navigation.ts` for shared navigation structure
- `content/seo.ts` for page metadata copy and sitemap routes
- page-specific `content/*.ts` files for presentation copy

For now, all six public pages share the same top-level layout in `app/layout.tsx`.
If route behavior diverges later, a route group can be introduced then.

## Working Docs

Start here before making product-facing changes:

- `CLAUDE.md`
- `AGENTS.md`
- `docs/README.md`
- `docs/workflow.md`
- `docs/mvp-phases.md`
- `docs/homepage-static-spec.md` for the active Home page milestone
- `docs/routes/README.md`
- `docs/layout-system.md`
- `docs/design-system.md`
- `docs/status-board.md`
- `docs/implementation-log.md`

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Use `pnpm format`, `pnpm lint`, `pnpm typecheck`, and `pnpm build` before
handing off a completed page.

## MVP Boundaries

- Build the approved static pages and responsive interactions first.
- Keep Academy content on the single `/academy` route for the MVP.
- Do not add Sanity, authentication, payments, e-commerce, or a deal room yet.
- Forms may validate locally but must not imply that data has been saved.
- Custom `loading.tsx`, `error.tsx`, `not-found.tsx`, and a wider motion system
  are future scope unless the current design pass specifically requires them.
