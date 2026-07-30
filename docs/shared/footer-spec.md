# Footer Spec

## Status

Desktop footer direction is now implemented against the supplied screenshot.
Newsletter is live (see below), and the four legal links are live internal
routes. Social icons remain placeholder pending final destinations (see
Current Questions).

Newsletter signup is live via `NewsletterSignupForm` → `/api/newsletter`.
Success shows clear first-submit/current-session-repeat copy,
**Subscribe with another email** (resets form + Turnstile), and the universal
Mailchimp-hosted rejoin link required for previously unsubscribed contacts.
Submit swaps to a spinner while posting. The protected route stores subscribers
in Mailchimp with double opt-in and one website source tag; it does not send
per-subscriber internal Resend notifications.

Footer `legalLinks` (Privacy, Terms, Cookies, Accessibility) are now live
internal links to `/privacy`, `/terms`, `/cookies`, `/accessibility` — see
`docs/routes/legal-pages-spec.md`. They are no longer non-interactive
placeholder spans.

## Mobile App Status — Implemented

`FooterAppStatus` renders a compact status below the social icons in the
existing brand column. No new footer column was added, and the newsletter,
contact, navigation, and legal structure are unchanged.

- Hidden Site Settings state (including missing fields): renders nothing.
- Coming soon: `Mobile apps — iOS & Android · Coming soon` as plain text, so it
  never enters the keyboard tab order.
- Live: only the platforms with a real store URL become links; any unavailable
  platform stays in the coming-soon text.

The footer stays text-only, always. No third-party brand logos and no official
store badges belong in the brand column — it has no room for them, and the
coming-soon state must not carry Apple, App Store, or Google Play marks on any
surface. See `docs/lms-and-mobile-app-promotion-spec.md` (B9).

State comes from `settings.mobileAppPromotion`, normalized once in
`lib/sanity/fetch/site-settings.ts` and split per platform by
`lib/mobile-app-promotion.ts` — the same source the Community section uses, so
the two surfaces cannot disagree.

The full CMS state model, responsive rules, and acceptance criteria live in
`docs/lms-and-mobile-app-promotion-spec.md`.

## Purpose

The footer should close the site with confidence, useful navigation, and strong
brand tone without pretending final integrations already exist.

## Confirmed Inputs

- Approved desktop screenshot supplied: `footer.png`
- Shared footer exists across all public routes
- Current social destinations are data-driven from `content/site.ts`, but final
  URLs are still pending
- Address data now lives in `content/site.ts`
- Newsletter treatment is live in code (Mailchimp + Turnstile); subscribe-again reset matches Contact form UX
- Newsletter duplicate-submit protection is client-side for now: same-instance
  in-flight lock plus current-session normalized email de-dupe across footer and
  sidebar newsletter forms
- Newsletter responses never reveal audience membership; the hosted rejoin link
  is visible after every successful submission
- Footer can include visible placeholder items from the design, but they should
  not become dead links

## Current Questions

- final social/contact destinations
- exact mobile footer sign-off against a dedicated reference, if one is shared
- future careers route once that page is in scope

## Checklist

- [x] Approved footer screenshot documented
- [x] Information architecture approved for the static MVP
- [x] Placeholder links identified clearly
- [x] Desktop composition approved in code
- [x] Mobile composition approved
- [x] Footer copy aligned with static MVP boundaries
- [x] Newsletter block wired to `/api/newsletter` with spinner, subscribe-again reset, Mailchimp source tag, current-session de-dupe, and hosted rejoin fallback
- [x] Legal links (Privacy, Terms, Cookies, Accessibility) live — routes shipped
- [x] Compact CMS-controlled mobile-app status added per
      `docs/lms-and-mobile-app-promotion-spec.md`
- [x] Confirmed the brand column does not wrap or overflow at 390px and tablet
      widths with the mobile-app status present
