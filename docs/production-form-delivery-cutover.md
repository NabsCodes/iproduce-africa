# Production Form Delivery Cutover

Use this checklist when moving the live public forms from local/preview testing
to production delivery on Vercel. It is derived from the current code paths in:

- `app/api/*/route.ts`
- `lib/api/public-form-post.ts`
- `lib/email/*`
- `lib/turnstile.ts`
- `lib/rate-limit.ts`
- `components/shared/public-form-security-fields.tsx`

## Runtime Shape

All public forms post to one of six API routes. Each route uses
`handlePublicFormPost`, which does the same sequence:

1. Check Upstash rate limit.
2. Read JSON body.
3. Silently accept honeypot submissions without sending mail.
4. Validate with the route Zod schema.
5. Verify Cloudflare Turnstile.
6. Check Resend + route inbox env.
7. Send the internal notification first.
8. Send the submitter receipt best-effort.

The internal notification is the load-bearing record. Receipt failures are
logged and do not fail the user request once the internal email has been sent.

## Required Production Env

Set these in Vercel Production before go-live. Any `NEXT_PUBLIC_*` change needs
a redeploy because the browser bundle reads it.

| Area      | Variables                                                                                                                       | Production value direction                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Resend    | `RESEND_API_KEY`, `EMAIL_FROM`                                                                                                  | Dedicated iProduce project key; `EMAIL_FROM` only switches to `info@...` after DNS verify  |
| Inboxes   | `CONTACT_TO_EMAIL`, `PARTNERS_TO_EMAIL`, `COMMUNITY_TO_EMAIL`, `ACADEMY_TO_EMAIL`, `NEWSLETTER_TO_EMAIL`                        | Confirm with client; all can point to `info@iproduceafrica.com` until routing is separated |
| Turnstile | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`                                                                        | Same Cloudflare Turnstile widget, public site key in browser, secret key on server         |
| Upstash   | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`                                                                            | Required when `VERCEL_ENV=production`; forms fail closed without them                      |
| Vercel    | `NEXT_PUBLIC_SITE_URL`, `EMAIL_ASSETS_BASE_URL`; Vercel injects `VERCEL_ENV`, `VERCEL_URL`, and `VERCEL_PROJECT_PRODUCTION_URL` | Match the active origin; switch both URL vars to `https://iproduceafrica.com` after DNS    |

Do not manually set `VERCEL_ENV`; Vercel owns it. Use `.env.example` for names
only, never for real secret values.

## Account And DNS Checklist

1. Resend

- Client-owned or client-invited Resend project: `iProduce Africa`.
- Add and verify the sending domain, expected to be `iproduceafrica.com`.
- Add required DNS records in the domain/DNS provider.
- Keep `EMAIL_FROM="iProduce Africa <onboarding@resend.dev>"` until domain
  verification is complete.
- After verification, switch production `EMAIL_FROM` to
  `iProduce Africa <info@iproduceafrica.com>`.
- Rotate the production API key if an agency-owned key was used during setup.

2. Turnstile

- Create one Cloudflare Turnstile widget for the public site.
- Include every domain that can host live forms:
  `localhost` for local testing, the Vercel preview/production domains, and
  `iproduceafrica.com` once cut over.
- Put the site key in `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- Put the secret key in `TURNSTILE_SECRET_KEY`.
- Redeploy after changing the public site key.

3. Upstash

- Create a Redis database for public-form rate limiting.
- Copy REST URL and token to Vercel Production.
- Keep preview either intentionally unthrottled or configure the same env there
  if preview spam/testing volume matters.
- Production forms intentionally return `503` when these variables are missing.

4. Vercel

- Set all required env vars in the Production environment.
- Use Preview env separately if preview should send real mail.
- After changing env vars, redeploy production.
- Confirm the active production origin:
  - pre-domain: `https://iproduce-africa.vercel.app`
  - post-domain: `https://iproduceafrica.com`
- Keep `NEXT_PUBLIC_SITE_URL` and `EMAIL_ASSETS_BASE_URL` on the same origin so
  email CTAs and logo images point at the live site.

## Smoke Test Matrix

Run these after the production redeploy:

| Test                  | Expected result                                                              |
| --------------------- | ---------------------------------------------------------------------------- |
| Contact form          | Internal email to `CONTACT_TO_EMAIL`; submitter receipt best-effort          |
| Partner inquiry       | Internal email to `PARTNERS_TO_EMAIL`; submitter receipt best-effort         |
| Become partner dialog | Internal email to `PARTNERS_TO_EMAIL`; submitter receipt best-effort         |
| Community form/dialog | Internal email to `COMMUNITY_TO_EMAIL`; source distinguishes page vs dialog  |
| Academy registration  | Internal email to `ACADEMY_TO_EMAIL`; server resolves course/webinar title   |
| Newsletter            | Internal email to `NEWSLETTER_TO_EMAIL`; subscriber confirmation best-effort |
| Turnstile missing     | UI says verification is unavailable; API fails closed with `503` if reached  |
| Invalid Turnstile     | API returns `400` verification error; no email sends                         |
| Honeypot filled       | API returns success; no email sends                                          |
| Rate limit exceeded   | API returns `429` with `Retry-After`; no email sends                         |
| Missing email env     | API returns `503`; Vercel logs name the missing env key                      |

For failure tests, use preview/staging where possible so production lead capture
is not interrupted.

## Current Guardrails

- Production Upstash misconfiguration fails closed before email delivery.
- Missing Turnstile config outside local development fails closed.
- Missing Resend, sender, or route inbox env fails closed.
- Client-side forms reset Turnstile after success and failure.
- Newsletter has same-session duplicate-submit protection, but not durable
  cross-device uniqueness.
- Server logs now name missing config keys without printing secret values.

## Known Limitations

- Public users still receive intentionally generic delivery errors. Check Vercel
  function logs for the exact missing env or vendor failure.
- Submitter receipts are best-effort; the admin notification remains the source
  of truth.
- Preview deployments are not rate-limited unless Upstash env is configured for
  preview.
- There is no subscriber database or Resend Audience sync yet, so newsletter
  uniqueness is not durable.
- Email logo delivery depends on `EMAIL_ASSETS_BASE_URL` or `NEXT_PUBLIC_SITE_URL`
  pointing at a deployed site that serves `/brand/email-logo.png`.
