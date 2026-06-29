# Partners section — shared spec

Single shared section that displays the partner logo strip. Used on the home,
about, and `/partners` routes so the same source of truth drives all partner
logo bands.

## Component

- File: `components/shared/partners-section.tsx`
- Imports: `<Marquee />` from `components/ui/marquee.tsx`, `<PartnerLogo />`
  from `components/shared/partner-logo.tsx`, `partnersList` from
  `content/partners.ts`.
- Used in: `app/page.tsx`, `app/about/page.tsx`, `app/partners/page.tsx`.

## Pieces

- `<PartnerLogo partner={...} />` — renders the bare logo image (grayscale,
  hover lifts to color). Reusable wherever a single partner needs to render
  without surrounding chrome.
- The white rounded card wrapping each logo is **specific to this section**  
  and lives inline in `partners-section.tsx`. Other surfaces that consume  
  `<PartnerLogo />` should not inherit the card — render the logo bare.

## Behavior

- Continuous horizontal marquee, paused on hover.
- Logos render in `<Marquee repeat={4}>` so the track stays visually dense
  even with only a few partners.
- Gradient fade masks (matched to the section background) soften the left and
  right edges.
- Each logo is rendered grayscale at 70% opacity; hover lifts to full color and
  full opacity.
- Respects `prefers-reduced-motion`: animation halts, layout stays intact
  (see `app/globals.css`).

## Placement

Default section rhythm: `py-14 sm:py-16 lg:py-20`. On Home it sits directly
under the hero. On About it follows `<CtaSection />`; the CTA’s negative
margin overlap is intentional — no extra Partners padding needed.

## Data shape

```ts
type Partner = {
  id: string;
  name: string;
  logo: string; // path under /public
  href?: string; // optional external partner URL
};
```

The list lives in `content/partners.ts` as `partnersList: Partner[]`.

## Adding / removing a partner

1. Drop the logo (square or wide WebP/PNG; transparent background preferred)
   into `public/images/partners/`.
2. Add a new entry to `partnersList` in `content/partners.ts`.
3. Done — the marquee re-renders automatically. No further code changes.

## Future: CMS migration

When Sanity (or any CMS) comes online, replace the `partnersList` import in
`partners-section.tsx` with the equivalent query result. Keep the `Partner`
type as the contract — the component does not need to change.

## Why a marquee primitive lives in `components/ui/`

`<Marquee />` is a generic, CSS-driven primitive (custom properties
`--duration`, `--gap`; pause-on-hover via `group`; vertical variant). It is
not partner-specific and can be reused for testimonial strips, certification
badges, etc. The keyframes are registered globally in `app/globals.css` via
`@theme inline`, so the `animate-marquee` / `animate-marquee-vertical`
utilities are available anywhere.
