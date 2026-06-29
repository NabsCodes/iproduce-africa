# System Pages + Brand Icons Spec

## Status

Shipped 2026-06-20. The static site now has branded Next.js convention files:
`not-found`, `error`, `global-error`, the brand icon set (`icon`,
`apple-icon`), and OG / Twitter share images.

**Architecture (2026-06-20):** System pages render inside the root layout
and therefore inherit Header + Footer + HashScrollHandler. This is the
standard marketing-site pattern (Stripe, Notion, Airbnb, most B2B SaaS):
the header gives free recovery via nav, brand context is reinforced, and
visitors don't feel like they've been bounced to a different site. A
short-lived experiment with a route-group split (`app/(site)/` for
marketing, root for chrome-free system pages) was reverted on the same
day after a fit-check against the institutional audience iProduce is
built for — chrome-free 404s read as "design-tool aesthetic" (Vercel,
Linear) and don't serve agripreneurs / partners / government as well as
the standard marketing pattern does. `global-error.tsx` is still inline-
styled and chrome-free because the root layout has crashed by definition
when it renders.

## Purpose

These pages run when the site fails or a URL doesn't resolve. They are the
quietest surfaces in the build — and the loudest when something goes wrong.
We want them to:

1. **Stay on-brand** — same chrome, type, palette, and tone as the rest of
   the site. No generic Next.js fallback. No stock "Oops!".
2. **Read as agriculture** without leaning into cute slogans or puns that
   would feel small next to the institutional voice we use elsewhere
   (Partners, Inquiry, About). Closer to _quiet horticulture lab_ than
   _farmstand chalkboard_.
3. **Recover the visitor fast** — every system page gives three concrete
   exits: back home, into the community track, and into the partner track,
   plus the page-specific reset where relevant.
4. **Avoid theatrics** — no full-screen illustrations, no parallax. A single
   restrained decorative motif (the existing `sprout.svg` or `logo-mark.svg`  
    used as a watermark) is the visual signature.

## Confirmed inputs / constraints

- Static-first phase. No async data fetching, no Suspense boundaries, so
  **no** `loading.tsx` — it would render a UI surface that never triggers.
  Revisit once Sanity lands.
- Site is fully SSG. `not-found.tsx` will only fire when a visitor types a
  bad URL or when (later) a dynamic route calls `notFound()`. No 404 storm
  at build time, so we can afford a richer page than a typical SPA fallback.
- `app/error.tsx` and `app/global-error.tsx` must be **client components**
  (`"use client"`) per the App Router contract.
- Existing brand assets we can reuse without re-exporting:
  - `public/svgs/logo-mark.svg` (76×76, viewBox 0 0 76 76) — the green
    sprouting M mark.
  - `public/svgs/sprout.svg` — already used elsewhere as a decorative leaf.
  - `public/svgs/lines-1.svg` / `lines-2.svg` / `lines-3.svg` — abstract
    horizon lines, useful as background motifs.
- Vextra's icon pattern is **file-convention only** (`app/icon.png` +
  `app/favicon.ico`, no `.tsx` route handlers). We mirror that here using
  the SVG mark, so the brand can be swapped in one file later without
  touching code.
- Radius cap (`rounded-xl`) and the project's mobile-first rule still apply.
- Reuse `<SiteCtaButton>` (or equivalent existing button surface) — do not  
  spin up new button primitives for these pages.

## Voice direction

Write like the rest of the site — calm, plain, factual. No exclamation
points, no apology theatre, no "Oops". The 404 acknowledges the situation in
one short sentence and points forward. The error page does the same and adds
a single reset action.

Approved copy candidates (pick one per page, don't stack):

**404 —** `not-found.tsx`

- Eyebrow: `404 — Off the map`
- Title: `This page isn't part of our network yet.`
- Body: `The URL you followed may have moved, been renamed, or never existed. From here, you can head back to the homepage or jump straight into one of our two tracks.`

**Recoverable error —** `error.tsx`

- Eyebrow: `Something stalled`
- Title: `We hit an unexpected issue loading this page.`
- Body: `Our team has been notified. You can try again, head back to the homepage, or reach out if it keeps happening.`
- Primary action: `Try again` (calls `reset()`).
- Secondary: `Back to home`.
- Tertiary: `Contact support` → `/contact`.

**Root layout crash —** `global-error.tsx`

- Title: `Something went wrong loading iProduce Africa.`
- Body: `Please refresh the page. If it keeps happening, contact us at hello@iproduceafrica.com.`
- Inline-styled (no Tailwind), no shared chrome, no logo dependency on a
  failed layout tree.

## Page-by-page design

### `app/not-found.tsx`

**Layout (desktop,** `lg+`**)**

A single centered card on the standard page chrome (header + footer render
because Next.js renders `not-found.tsx` inside the root layout). The card
sits in the page's main `mx-auto w-full max-w-8xl px-4 md:px-6 lg:px-8` so
spacing matches every other page.

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   ┌──[ leaf-100 watermark behind ]──────────────────────────┐  │
│   │                                                          │  │
│   │     ◐ logo-mark.svg @ size-12 inside leaf-100 chip       │  │
│   │                                                          │  │
│   │     404 — OFF THE MAP                  (eyebrow pill)    │  │
│   │                                                          │  │
│   │     This page isn't part of our                          │  │
│   │     network yet.                       (serif h1)        │  │
│   │                                                          │  │
│   │     The URL you followed may have moved, been renamed,   │  │
│   │     or never existed. From here, you can head back to    │  │
│   │     the homepage or jump straight into one of our two    │  │
│   │     tracks.                                              │  │
│   │                                                          │  │
│   │   [ Back to home ]  [ Join the community ]  [ Partner ]  │  │
│   │                                                          │  │
│   │   — or browse popular sections —                         │  │
│   │   • About iProduce Africa                                │  │
│   │   • The Academy                                          │  │
│   │   • Contact us                                           │  │
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                │
│   [ subtle horizon lines-2.svg motif anchored bottom-right ]   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Visual treatment**

- Outer wrapper: `min-h-[70vh]` so the card sits roughly centered on first
  paint even at long viewports.
- Card: `bg-white border border-grey-200 rounded-xl p-8 sm:p-10 lg:p-14`.
- Behind the card: a single decorative element — `logo-mark.svg` scaled up
  to ~480px, positioned absolute top-right, `opacity-[0.06]`, hidden below
  `lg:`. This is the only "art" — no illustrations.
- Mark chip: 48×48 leaf-100 square with `rounded-xl` housing the small
  logo mark, sits above the eyebrow.
- Eyebrow: reuse `<EyebrowPill tone="leaf">` so it matches every other
  section opener.
- Title: `font-serif text-3xl sm:text-4xl lg:text-5xl`.
- Body: `text-fg-muted text-base sm:text-lg leading-7`.
- CTA row: three buttons stacked on mobile (`flex-col gap-3`), inline on
  `sm+` (`sm:flex-row sm:flex-wrap`).
  - Primary: forest, "Back to home" → `/`.
  - Secondary: leaf, "Join the community" → `/community`.
  - Tertiary: outline, "Partner with us" → `/partners`.
- Popular links: simple `<ul>` of three text links under a thin
  separator. Quiet — these are an "in case the buttons aren't what you
  meant" net, not a duplicate nav.

**Mobile (**`<sm`**)**

- Card padding tightens to `p-6`.
- Decorative mark hidden.
- Buttons stack full-width.
- Popular links list stays single-column.

**Metadata**

- `export const metadata = createPageMetadata({ title: "Page not found", description: "...", path: "/404" })`.
- Add `robots: { index: false, follow: true }` so 404 URLs never enter the  
  index.

### `app/error.tsx`

**Layout** — same shape as `not-found.tsx` so the two read as a family.
Differences:

- Eyebrow tone: `tangerine` (warning, not error-red).
- Mark chip swaps logo for a `RefreshCw` icon (lucide) sized `size-5` inside
  the same 48×48 chip — signals "retry-able", not "broken forever".
- Decorative background uses `lines-3.svg` instead of the logo-mark
  watermark, again at `opacity-[0.06]`. Keeps the system pages visually
  distinct from each other at a glance.
- CTA row: `Try again` (forest, calls `reset()`), `Back to home` (leaf
  outline), `Contact support` (text link only).
- Below the CTA row, render a tiny **details disclosure** that shows
  `error.digest` only (never the raw message — could leak internals):
  `<p className="text-xs text-fg-subtle mt-6">Reference: {digest || "—"}</p>`.
  Lets support match a report to a server log without exposing a stack.

**Required props** (Next.js contract)

```ts
type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
```

**Behavior**

- `"use client"` at the top.
- `useEffect` to log to console in dev and to a TODO-marked telemetry sink in
  prod (`if (process.env.NODE_ENV === "production") { /* TODO(telemetry) */ }`).
- Static rendering: don't dynamically import anything; this file must always
  ship in the initial chunk.

**No metadata export** — error.tsx in App Router doesn't take metadata; the
nearest layout's metadata is used.

### `app/global-error.tsx`

Only renders when `app/layout.tsx` itself throws (extremely rare). Must
ship its own `<html>` and `<body>` — the failed root layout is bypassed.
Cannot rely on Tailwind classes being applied (the global stylesheet may
not have loaded if the layout crashed), so styles are inlined.

**Shape**

```tsx
"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          backgroundColor: "#f7f9f5",
          color: "#0f1d12",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          Something went wrong loading iProduce Africa.
        </h1>
        <p style={{ color: "#516057", maxWidth: 420, lineHeight: 1.6 }}>
          Please refresh the page. If it keeps happening, reach out to{" "}
          <a
            href="mailto:hello@iproduceafrica.com"
            style={{ color: "#1f6b3a" }}
          >
            hello@iproduceafrica.com
          </a>
          .
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: 24,
            padding: "10px 20px",
            borderRadius: 10,
            border: 0,
            background: "#0f1d12",
            color: "#fff",
            fontSize: "0.95rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
```

Inline hex colors mirror `--forest-900` / `--leaf-700` / `--fg-muted` so the
fallback is still on-brand even if Tailwind never runs. Document the source
of those hex values inline above the style object so they get updated when
the palette does.

### Brand icons (`app/icon.png`, `app/apple-icon.png`)

**Pattern (mirroring vextra)** — file-convention only. No `.tsx` route
handlers, so the icons cache hard and ship as static assets.

- `app/icon.png` — 360×360 brand mark PNG. Next.js serves it as the
  modern favicon at every browser-required density (16/32/192/512). No
  `favicon.ico` needed; that's a legacy IE/old-Safari format we don't
  support.
- `app/apple-icon.png` — same 360×360 source. Apple home-screen ideally
  wants 180×180, but Next.js + the browser downscale cleanly from a
  larger square. If a dedicated 180×180 with leaf-100 padding is exported
  later, drop it here to replace.

The user-supplied 360×360 source replaces the earlier plan to use
`logo-mark.svg` (which was 200KB with embedded raster data) as `icon.svg`.
The raster route is lighter for browser tabs and avoids the SVG payload
hit. If a vector mark is exported later, drop `app/icon.svg` alongside —
Next.js prefers SVG when both exist.

## File-by-file delta

| Path                               | Action                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| `app/not-found.tsx`                | **New** — server component, brand 404                                               |
| `app/error.tsx`                    | **New** — client component, recoverable error                                       |
| `app/global-error.tsx`             | **New** — client component, layout crash fallback                                   |
| `app/icon.png`                     | **New** — 360×360 brand mark (shipped 2026-06-20)                                   |
| `app/apple-icon.png`               | **New** — same 360×360 source (shipped 2026-06-20)                                  |
| `content/system-pages.ts`          | **New** — copy block for 404 + error pages so a Sanity migration is one query later |
| `types/system-pages.ts`            | **New** — `SystemPagesContent` contracts                                            |
| `docs/routes/system-pages-spec.md` | **This file**                                                                       |
| `docs/implementation-log.md`       | **Updated** — pass logged                                                           |
| `docs/design-system.md`            | **Updated** — "System pages" guidance added                                         |

Do **not** introduce a `loading.tsx` in this pass.

## Verification

1. `pnpm format && pnpm lint && pnpm typecheck && pnpm build` — clean.
2. Manual walk:

- `pnpm dev` and visit `/does-not-exist` → confirm the brand 404 renders
  with header + footer.
- Temporarily throw inside a server component (e.g. `app/about/page.tsx`)
  and reload → confirm `error.tsx` catches it and `Try again` calls
  `reset()` cleanly. Remove the throw before committing.
- Temporarily throw inside `app/layout.tsx` to trigger `global-error.tsx`
  → confirm the inline-styled fallback renders. Remove the throw before
  committing.

3. Devtools network: confirm `/icon.png` and `/apple-icon.png` are requested and served (200).
4. Lighthouse a11y on `/does-not-exist` — must score the same as the rest
   of the site (no missing landmarks, headings, link text).
5. View-source check on each system page — confirm `<title>` and
   `<meta name="robots">` are correct (`noindex` on 404).

## Out of scope

- `loading.tsx` — site is SSG.
- `manifest.ts` / PWA install — not needed for an institutional marketing
  site.
- ~~OG / Twitter share image files~~ — shipped 2026-06-20 as
  `app/opengraph-image.png` (2400×1260) and `app/twitter-image.png`
  (2400×1200). Both are 2x source assets that downscale cleanly to the
  1200×630 / 1200×600 platform standards. Per-page override is a one-file
  drop into the route folder.
- Real telemetry wiring inside `error.tsx` — TODO marker only until a  
  monitoring tool is picked.

## Scoped `not-found.tsx` Status

The root `app/not-found.tsx` remains the safety net. Academy catalogue tracks
now also ship scoped recovery pages:

- `app/academy/blog/not-found.tsx` — Blog-specific CTAs.
- `app/academy/webinars/not-found.tsx` — Webinars & Events-specific CTAs.
- `app/academy/courses/not-found.tsx` — Course-specific CTAs.

Any future dynamic route under `/community/<resource>` or
`/partners/<resource>` should follow the same pattern: keep the root not-found
as the safety net, scope a local one when the section becomes navigable.

## Checklist

- [x] Add convention pages (`not-found.tsx`, `error.tsx`, `global-error.tsx`)
- [x] Add branded icons (`app/icon.png` + `app/apple-icon.png`)
- [x] Add `content/system-pages.ts` + `types/system-pages.ts`
- [x] Replace placeholder icons with branded `app/icon.png` + `app/apple-icon.png`
- [x] Pointer in `docs/design-system.md`
- [x] Verify locally (bad URL + forced throw)
- [x] Run full check suite
- [x] Log entry in `docs/implementation-log.md`
- [x] Tick the system-pages item in the Notion dev notes
- [x] (Follow-up) Drop `app/apple-icon.png` once the 180×180 export is ready
- [x] Drop `app/opengraph-image.png` + `app/twitter-image.png` (shipped 2026-06-20)
