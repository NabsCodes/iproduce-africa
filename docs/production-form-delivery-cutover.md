# Production Form Delivery Cutover

Use this checklist when moving the live public forms from local/preview testing
to production delivery on Vercel. It is derived from the current code paths in:

- `app/api/*/route.ts`
- `lib/api/public-form-post.ts`
- `lib/email/*`
- `lib/mailchimp/newsletter.ts`
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
6. Check the route's declared provider environment.
7. Run the route-specific delivery handler.

Operational forms use Resend: the internal notification is the load-bearing
record and the submitter receipt is best-effort. Newsletter uses Mailchimp:
member state is preserved, new contacts enter `pending`, and the website source
tag is applied. Self-unsubscribed contacts rejoin through the client-owned
Mailchimp hosted form rather than an API status override.

## Required Production Env

Set these in Vercel Production before go-live. Any `NEXT_PUBLIC_*` change needs
a redeploy because the browser bundle reads it.

| Area      | Variables                                                                                                                       | Production value direction                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Resend    | `RESEND_API_KEY`, `EMAIL_FROM`                                                                                                  | Dedicated iProduce project key and verified `info@...` sender                           |
| Inboxes   | `CONTACT_TO_EMAIL`, `PARTNERS_TO_EMAIL`, `COMMUNITY_TO_EMAIL`, `ACADEMY_TO_EMAIL`                                               | Confirm with client; all can share `info@...` until routing is separated                |
| Mailchimp | `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX`, `MAILCHIMP_AUDIENCE_ID`                                                         | Client-owned account; Production only unless a separate Preview audience is intentional |
| Turnstile | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`                                                                        | Environment-specific widget pair; public site key in browser, secret key on server      |
| Upstash   | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`                                                                            | Required when `VERCEL_ENV=production`; forms fail closed without them                   |
| Vercel    | `NEXT_PUBLIC_SITE_URL`, `EMAIL_ASSETS_BASE_URL`; Vercel injects `VERCEL_ENV`, `VERCEL_URL`, and `VERCEL_PROJECT_PRODUCTION_URL` | Match the active origin; switch both URL vars after custom-domain DNS                   |

Do not manually set `VERCEL_ENV`; Vercel owns it. Use `.env.example` for names
only, never for real secret values.

## Account And DNS Checklist

1. Resend — **complete (2026-07-14)**

- Dedicated iProduce Resend project; **client is Owner**.
- Login/ops mailbox used during setup: `dev@iproduceafrica.com`.
- Domain `iproduceafrica.com` verified: DKIM + Enable Sending (`send` host
  records). Enable Receiving left off (Zoho MX intact).
- Production sender: `iProduce Africa <info@iproduceafrica.com>`.
- Production Vercel env + form delivery: live.

**Not part of Resend:** pointing apex/`www` website DNS at Vercel (schedule with
client when they want the public URL to leave the old cPanel site).

2. Turnstile

- Use separate Turnstile widgets for local/preview testing and production so
  the production widget only trusts production hostnames.
- Allow `localhost` and Vercel preview domains on the non-production widget.
- Allow only the active Vercel production domain and `iproduceafrica.com` on
  the production widget during cutover; remove the temporary Vercel hostname
  when it no longer serves public forms.
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

5. Mailchimp — account experience configured; final website smoke test pending

- Client-owned account and audience; `dev@iproduceafrica.com` is Owner.
- Sending-domain authentication, audience fields, and API credentials are
  configured. The source tag is created automatically by the API on first use.
- Double opt-in is enabled for the hosted form; the confirmation email and
  confirmation page are branded; the separate final welcome email stays off.
- The public hosted signup URL is wired as a universal rejoin link. The API
  never forces an `unsubscribed` member back to `pending`.
- Keep Production credentials out of Preview by default. Preview newsletter
  submissions then fail closed intentionally instead of writing test contacts
  into the live audience.
- Complete the controlled pending → confirmed → unsubscribed → hosted rejoin
  test
  before deleting the Resend rollback files.

## Smoke Test Matrix

Run these after the production redeploy:

| Test                  | Expected result                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Contact form          | Internal email to `CONTACT_TO_EMAIL`; submitter receipt best-effort                                                              |
| Partner inquiry       | Internal email to `PARTNERS_TO_EMAIL`; submitter receipt best-effort                                                             |
| Become partner dialog | Internal email to `PARTNERS_TO_EMAIL`; submitter receipt best-effort                                                             |
| Community form/dialog | Internal email to `COMMUNITY_TO_EMAIL`; source distinguishes page vs dialog                                                      |
| Academy registration  | Internal email to `ACADEMY_TO_EMAIL`; server resolves course/webinar title                                                       |
| Newsletter            | New contact enters `pending`, receives confirmation, gains `Website newsletter`; repeat copy and hosted rejoin link stay generic |
| Turnstile missing     | UI says verification is unavailable; API fails closed with `503` if reached                                                      |
| Invalid Turnstile     | API returns `400` verification error; no email sends                                                                             |
| Turnstile unavailable | API returns `503` after the bounded verification attempt; no email sends                                                         |
| Honeypot filled       | API returns success; no email sends                                                                                              |
| Rate limit exceeded   | API returns `429` with `Retry-After`; no email sends                                                                             |
| Missing provider env  | API returns `503`; Vercel logs name the missing env key                                                                          |

For failure tests, use preview/staging where possible so production lead capture
is not interrupted.

## Current Guardrails

- Production Upstash misconfiguration fails closed before email delivery.
- Missing Turnstile config outside local development fails closed.
- Missing route-specific Resend or Mailchimp environment fails closed.
- Client-side forms reset Turnstile after success and failure.
- Normal Turnstile verification has no persistent helper copy; the challenge is
  visible only when Cloudflare requires interaction.
- Widget load/timeout/unsupported failures show one retry plus email fallback;
  one retry performs one reset.
- Server-side Turnstile verification is bounded to 8 seconds and distinguishes
  service unavailability (`503`) from invalid visitor verification (`400`).
- Newsletter has same-session duplicate-submit protection; Mailchimp provides
  durable cross-device member uniqueness through the normalized subscriber hash.
- Self-unsubscribed contacts keep their consent state until they explicitly
  rejoin through the client-owned hosted form.
- Server logs now name missing config keys without printing secret values.

## Known Limitations

- Public users still receive intentionally generic delivery errors. Check Vercel
  function logs for the exact missing env or vendor failure.
- Submitter receipts are best-effort; the admin notification remains the source
  of truth.
- Preview deployments are not rate-limited unless Upstash env is configured for
  preview.
- There is no local subscriber database or event-registration roster; Mailchimp
  owns newsletter consent and campaign membership only.
- Persistent Mailchimp tag failures are logged without PII and require manual
  repair; background reconciliation is intentionally deferred.
- Email logo delivery depends on `EMAIL_ASSETS_BASE_URL` or `NEXT_PUBLIC_SITE_URL`
  pointing at a deployed site that serves `/brand/email-logo.png`.
- A successful Resend send followed by a lost browser response can still be
  retried as a second submission. Client-side locking prevents concurrent
  repeats, not this uncertain-response case; durable submission idempotency is a
  separate production-hardening decision.
