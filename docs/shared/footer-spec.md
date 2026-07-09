# Footer Spec

## Status

Desktop footer direction is now implemented against the supplied screenshot.
Newsletter is live (see below), and the four legal links are live internal
routes. Social icons remain placeholder pending final destinations (see
Current Questions).

Newsletter signup is live via `NewsletterSignupForm` → `/api/newsletter`.
Success shows inline copy plus **Subscribe with another email** (resets form +
Turnstile). Submit button swaps to a spinner while posting. The footer passes
the current pathname as `sourcePath`, so footer submissions from article pages
no longer appear as homepage submissions in the inbox.

Footer `legalLinks` (Privacy, Terms, Cookies, Accessibility) are now live
internal links to `/privacy`, `/terms`, `/cookies`, `/accessibility` — see
`docs/routes/legal-pages-spec.md`. They are no longer non-interactive
placeholder spans.

## Purpose

The footer should close the site with confidence, useful navigation, and strong
brand tone without pretending final integrations already exist.

## Confirmed Inputs

- Approved desktop screenshot supplied: `footer.png`
- Shared footer exists across all public routes
- Current social destinations are data-driven from `content/site.ts`, but final
  URLs are still pending
- Address data now lives in `content/site.ts`
- Newsletter treatment is live (Resend + Turnstile); subscribe-again reset matches Contact form UX
- Newsletter duplicate-submit protection is client-side for now: same-instance
  in-flight lock plus current-session normalized email de-dupe across footer and
  sidebar newsletter forms
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
- [x] Newsletter block wired to `/api/newsletter` with spinner, subscribe-again reset, current-path source attribution, and current-session de-dupe
- [x] Legal links (Privacy, Terms, Cookies, Accessibility) live — routes shipped
