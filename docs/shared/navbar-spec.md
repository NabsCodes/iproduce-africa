# Navbar Spec

## Status

Desktop navbar matches the approved screenshot direction and is implemented in
code. Mobile menu now mirrors the approved screenshot — full-screen top-down
sheet, numbered list, label-only Academy children, no-icon Join pill, and a
slim email + phone footer. Academy desktop dropdown polish is still open.

## Purpose

The navbar should feel premium, clear, and reliable across desktop and mobile.
It carries the highest repeated visibility on the public site, so it should be
treated as its own spec rather than just another component.

## File Ownership

- `components/layout/header.tsx` — sticky header, utility bar, desktop nav, CTAs
- `components/layout/mobile-nav.tsx` — full-screen mobile sheet menu
- `components/layout/site-logo.tsx` — shared logo image
- `components/layout/social-icon.tsx` — react-icons brand map (Facebook,
  Instagram, YouTube)
- `content/navigation.ts` — `mainNavigation` link tree
- `content/site.ts` — hours, email, phone, `socialLinks`
- `hooks/use-route-hash.ts` — pathname + hash sync for Academy child active state
- `hooks/use-scrolled.ts` — scroll threshold for primary-bar border/height tweak

Social links are rendered inline in each surface. Do not reintroduce a shared
`social-links.tsx` wrapper.

## Breakpoints

- **Below `md` (768px):** compact header — logo, compact `Join` CTA, plain
  hamburger. Utility bar hidden. Full nav lives in the mobile sheet.
- **`md` and up:** utility bar visible, full desktop nav, `Partner with us` text
  CTA, full `Join our community` button.

## Desktop Structure

### Utility bar

- Background: `forest-900`
- Height: `42px`
- Left: hours with clock icon (`siteConfig.hours`)
- Right: email, phone, then social icons
- Email and phone labels truncate on smaller desktop widths; full text from `lg`
- Social entries without `href` render as muted non-clickable placeholder icons

### Primary bar

- White background, bottom border (`grey-200`, darkens slightly on scroll)
- Height: `72px` default, `80px` at `md+` (slightly shorter when scrolled)
- Layout: `md:grid-cols-[auto_1fr_auto]` — logo | nav | CTAs

### Main navigation

- Hidden below `md`, visible from `md` up
- Spans the center grid column with `w-full justify-evenly` so links distribute
  evenly between logo and CTAs
- Items from `mainNavigation`: Home, About us, Academy (dropdown), Community,
  Partners, Contact
- Link style: `15px` sans, `grey-800`, hover `forest-700`
- Per-link padding: `px-2 py-0.5`

### Active state

- Active route: `grey-950` + `font-semibold`
- Orange underline (`tangerine-500`): short `3px` pill centered under link text
  at `-bottom-0.5` — not full bar width
- Academy parent active when pathname starts with `/academy`
- Academy child items active when full route matches hash href (e.g.
  `/academy#webinars`) via `useRouteHash`

### Focus and open state

- Nav links use soft `bg-leaf-50` + `text-forest-700` on keyboard focus — no
  offset ring box
- Academy trigger uses the same highlight when open (`data-[state=open]`)
- Chevron rotates 180° when Academy menu is open

### Academy dropdown

- shadcn `DropdownMenu` on desktop
- Label-only items (no descriptions, no footer CTA)
- Panel: white, `min-w-[240px]`, light border, soft shadow, `sideOffset={8}`
- Child links use `leaf-50` hover/active background

### CTAs (desktop)

- `Partner with us` — text link (`leaf-600`), points to `/partners#partner`
- `Join our community` — green filled button with `UsersRound` icon, points to
  `/community#join`

## Mobile Structure

### Header chrome (below `md`)

- Logo left
- Compact green `Join` button (`/community`)
- Plain square hamburger (`size-11`, three lines, no bordered button shell)

### Sheet menu

- Full-screen top-down sheet (`side="top"`, `h-dvh`, white background, no border)
- Custom header: shared `SiteLogo` left, plain `X` close right (no bordered
  button shell — matches the hamburger weight)
- Numbered nav list (`01`, `02`, …) in serif `2xl` with subtle row separators
- Top-level links: leaf-green right arrow on inactive; tangerine arrow, label,
  and number when the route is active
- Academy: shadcn `Accordion` in `type="single"` controlled mode; auto-expands
  when the active path starts with `/academy`. Children are label-only (no
  description) to mirror the desktop dropdown
- Active Academy child shows a full-width leaf-100 pill aligned with the parent
  label column (`pl-10`)
- Open or active Academy parent flips to tangerine (label, number, chevron)
- CTA block order: filled `Join our community` pill (no icon, rounded-full) then
  `Partner with us` as a centered leaf-green text link
- Mobile CTA destinations follow the same split-intent rule as desktop:
  `/community#join` and `/partners#partner`
- Footer block: email left, phone right, no hours and no social — those stay on
  the desktop utility bar only
- Radix Dialog handles dismiss (overlay click, ESC, close button); no separate
  click-outside hook is needed

## Confirmed Inputs

- Primary CTAs are `Join our community` and `Partner with us`
- Main nav links remain overview routes (`/community`, `/partners`), while CTA
  links land on action anchors (`#join`, `#partner`)
- Academy includes a dropdown on desktop and accordion on mobile
- Mobile navigation is intentionally designed, not a compressed desktop row
- Desktop utility bar includes hours on the left, then email, phone, and social
  icons on the right
- Shared site hours, contact details, and social entries live in
  `content/site.ts`
- The shared logo comes from `public/images/shared/iproduce-logo.webp`
- Social placeholders stay visible until final URLs are confirmed

## Approved Desktop Reference

Source: `CleanShot 2026-06-14 at 7.29.01@2x.png`

- dark green utility bar
- white primary bar with the original logo at left
- main navigation spread evenly in the center column
- short orange underline under the active link text
- `Partner with us` as the quieter text CTA
- `Join our community` as the filled green CTA

## Current Questions

- final social destination URLs in `content/site.ts`
- formal Academy dropdown sign-off once a reference screenshot is shared

## Checklist

- [x] Approved desktop navbar screenshot documented
- [x] Approved mobile navbar screenshot documented (`Device=Mobile, Page=Academy, State=Menu open.png`)
- [x] Desktop layout and link spacing implemented (`justify-evenly` center column)
- [x] Desktop active-state behavior implemented (underline under link text)
- [x] Desktop focus/open state implemented (soft leaf highlight, no offset ring)
- [x] CTA order and emphasis approved
- [x] Social placeholder behavior documented (visible, non-clickable when no URL)
- [x] Mobile sheet redirected to top-down full-screen layout matching screenshot
- [ ] Academy dropdown formally approved against a reference screenshot
- [ ] Mobile menu QA on 360px and 390px viewports (tap targets, overflow)
