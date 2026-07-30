# Navbar Spec

## Status

Desktop navbar matches the approved screenshot direction and is implemented in
code. Mobile menu now mirrors the approved screenshot — full-screen top-down
sheet, numbered list, label-only Academy children, no-icon Join pill, and a
slim email + phone footer. Academy desktop dropdown polish is implemented;
formal screenshot sign-off is still open.

## LMS Entry Point — Implemented

The desktop header and mobile menu now use a prominent external
`Explore courses` entry point for the standalone iProduce LMS in place of the
repeated `Partner with us` CTA. The destination is code-owned in
`content/site.ts` (`siteConfig.learningPlatform`), so the canonical
`learn.iproduceafrica.com` cutover is a one-line change.

Preserved deliberately:

- `Partners` stays in the main navigation.
- The Partners route, footer link, enquiry form, and contextual partnership
  CTAs are unchanged. This was a header-priority change, not a removal of the
  partnership journey.
- `Courses` stays inside the Academy dropdown/accordion, pointed at the website
  catalogue.
- The Join CTA remains the primary filled action.

Both `Explore courses` links open in a new tab with `rel="noopener noreferrer"`,
carry an `ArrowUpRight` affordance, and use the accessible name
`Explore courses on iProduce LMS (opens in a new tab)`. The mobile link is
wrapped in `SheetClose`, so activating it closes the menu.

The full contract and acceptance criteria live in
`docs/lms-and-mobile-app-promotion-spec.md`.

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

- **Below** `md` **(768px):** compact header — logo, compact `Join` CTA, plain
  hamburger. Utility bar hidden. Full nav lives in the mobile sheet.
- `md` **to below** `desknav`**:** tablet header — utility bar is visible, but
  the primary bar stays compact with logo, compact `Join` CTA, and hamburger.
  Do not show the full desktop nav here; it does not have enough horizontal
  room.
- `desknav` **(1152px) and up:** full desktop nav and `Explore courses`
  external text CTA; the hamburger disappears.
- `xl` **and up:** full `Join our community` button. Below `xl`, the compact
  join trigger remains beside the hamburger.

`desknav` is a project breakpoint registered in `app/globals.css`
(`--breakpoint-desknav: 72rem`). It exists because the full nav plus both
header CTAs overflows its grid column between `lg` and 1152px — browser QA at
1024px showed the logo colliding with `Home`, `Contact` colliding with the LMS
CTA, and horizontal page overflow. Header and mobile-nav must always switch on
the same value; do not split them back onto `lg`.

## Desktop Structure

### Utility bar

- Background: `forest-900`
- Height: `42px`
- Left: hours with clock icon (`siteConfig.hours`)
- Right: email, phone, then social icons
- Email and phone labels are visible from `md`; email truncates if space gets
  tight and phone stays tabular/nowrap
- Social icons stay visible from `md`; tighten gaps and email truncation instead
  of removing the icons on tablet
- Contact groups use the shared `Separator` primitive for vertical dividers
- Social entries without `href` render as muted non-clickable placeholder icons

### Primary bar

- White background, bottom border (`grey-200`, darkens slightly on scroll)
- Height: `72px` default, `80px` at `xl+` (slightly shorter when scrolled)
- Layout: `lg:grid-cols-[auto_1fr_auto]` — logo | nav | CTAs

### Main navigation

- Hidden below `lg`, visible from `lg` up
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
- Academy child items active when the current route matches the listing href
  (for example `/academy/webinars`, `/academy/courses`, `/academy/blog`) or a
  nested slug route.

### Focus and open state

- Nav links use soft `bg-leaf-50` + `text-forest-700` on keyboard focus — no
  offset ring box
- Academy trigger uses the same highlight when open (`data-[state=open]`)
- Chevron rotates 180° when Academy menu is open

### Academy dropdown (split target)

Academy is both a real page (`/academy`) and a parent route to sub-pages.
The desktop nav uses a split-target pattern so clicking the label navigates
and clicking the chevron opens the menu:

- The label `Academy` is a Next.js `<Link href="/academy">` — clicking it
  navigates immediately
- The chevron sits in a small adjacent `DropdownMenuTrigger` button (size-6,
  rounded-md) — clicking it opens the children menu without navigating
- Both elements live inside one `relative inline-flex items-center` wrapper
  so the active underline still spans the label area only
- Panel: white, `min-w-[240px]`, light border, soft shadow, `sideOffset={8}`
- Child links use `leaf-50` hover/active background
- Children now live at the dedicated listing routes:
  `/academy/webinars`, `/academy/courses`, and `/academy/blog`.

### CTAs (desktop)

- `Explore courses` — external text link (`leaf-600`) with an `ArrowUpRight`
  affordance, points to `siteConfig.learningPlatform.href` in a new tab
- `Join our community` — green filled button with `UsersRound` icon, opens the
  membership application dialog through `CommunityJoinButton`

## Mobile Structure

### Header chrome (below `xl`)

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
  when the active path starts with `/academy`. The expanded panel begins with a
  `Visit Academy` link (leaf-700, semibold) that points to `/academy` itself,
  followed by the children. Mirrors the desktop split-target behaviour where
  the parent is reachable as its own page
- Active Academy child shows a full-width leaf-100 pill aligned with the parent
  label column (`pl-10`)
- Open or active Academy parent flips to tangerine (label, number, chevron)
- CTA block order: filled `Join our community` pill (no icon, rounded-full) then
  `Explore courses` as a centered leaf-green external text link
- `Join our community` closes the sheet and opens the membership dialog;
  `Explore courses` closes the sheet and opens the LMS in a new tab
- Footer block: email left, phone right, no hours and no social — those stay on
  the desktop utility bar only
- Radix Dialog handles dismiss (overlay click, ESC, close button); no separate  
  click-outside hook is needed

## Confirmed Inputs

- Header/mobile-menu CTAs are `Join our community` and `Explore courses`;
  `Partner with us` remains the contextual partnership CTA elsewhere
- Main nav links remain overview routes (`/community`, `/partners`). Partner
  CTA lands on `#partnership-enquiry`, while Join opens the membership dialog.
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
- the quieter text CTA (now `Explore courses`; the screenshot predates the
  LMS change and still shows `Partner with us`)
- `Join our community` as the filled green CTA

## Current Questions

- final social destination URLs in `content/site.ts`
- formal Academy dropdown sign-off once a reference screenshot is shared

## Checklist

- [x] Approved desktop navbar screenshot documented
- [x] Repeated Partner CTA replaced with external `Explore courses` on desktop
      and mobile, per `docs/lms-and-mobile-app-promotion-spec.md`
- [ ] Confirm header fit and hierarchy at `lg` and `xl` in a browser
- [x] Approved mobile navbar screenshot documented (`Device=Mobile, Page=Academy, State=Menu open.png`)
- [x] Desktop layout and link spacing implemented (`justify-evenly` center column)
- [x] Desktop active-state behavior implemented (underline under link text)
- [x] Desktop focus/open state implemented (soft leaf highlight, no offset ring)
- [x] CTA order and emphasis approved
- [x] Social placeholder behavior documented (visible, non-clickable when no URL)
- [x] Mobile sheet redirected to top-down full-screen layout matching screenshot
- [x] Academy dropdown formally approved against a reference screenshot
- [x] Mobile menu QA on 360px and 390px viewports (tap targets, overflow)
