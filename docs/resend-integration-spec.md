# Resend + React Email + Turnstile Integration Spec

## Status

**Implemented** (2026-06-26) — code shipped; production blocked on client Resend domain
verification + Vercel env. File/folder map: `docs/email-structure.md`.

Original planning reference: mirror patterns from `wardwise-demo` (`src/lib/email/`,
`pnpm email:dev`, API route shape, Turnstile verification, honeypot handling).

## Purpose

Wire all public interest-capture forms to real delivery via **Resend** and
**React Email**, protected by **Cloudflare Turnstile** and a silent honeypot,
while keeping the static UI and Zod schemas already in place.

This is the first production service integration for the marketing site. It
does **not** replace Sanity CMS work — it runs in parallel or slightly ahead of
CMS setup.

## Goals

- Team receives structured internal notifications for every form submission.
- Submitters are sent a short confirmation on a best-effort basis for every
  successful human submission (via `sendEmailQuietly` — receipt failures are
  logged, not surfaced to the user; admin notification remains the source of
  truth for lead capture).
- Internal notification emails set `replyTo` to the submitter's address so the
  team can reply directly from their inbox.
- All public forms include Turnstile verification and a hidden honeypot before
  email delivery.
- Email templates are previewable locally before deploy.
- Missing env config fails safely (503 + friendly copy), not silent success.
- Client can own the Resend project and domain at handoff.

## Out Of Scope For This Integration

- Sanity CMS migration
- Mailchimp / Brevo campaign tooling
- Subscriber database or Resend Audiences sync
- CRM, ticketing, or admin dashboard for submissions
- Storing submissions in a database

## Rate limiting (implemented)

Public form API routes are rate-limited via **Upstash Redis** in
`lib/rate-limit.ts`, enforced centrally in `handlePublicFormPost`.

| Route                                 | Limit                      |
| ------------------------------------- | -------------------------- |
| Contact, partners, community, academy | 5 requests / 10 min per IP |
| Newsletter                            | 3 requests / 5 min per IP  |

**Environment behavior:**

- **Local dev:** skipped unless `ENABLE_DEV_RATE_LIMITS=true`
- **Vercel preview:** active when Upstash env vars are set; otherwise skipped
- **Production (**`VERCEL_ENV=production`**):** Upstash env vars are **required** —
  missing config returns `503` (fail closed) to protect Resend quota

Exceeded limits return `429` with `Retry-After` and
`PUBLIC_FORM_RATE_LIMIT_ERROR` copy on the client.

---

## Account Strategy

### Decision: separate Resend project for iProduce — do not reuse WardWise

| Approach                                           | Verdict                          | Why                                                                             |
| -------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| Reuse your WardWise Resend API key                 | **No**                           | One domain slot on free tier; mixed billing; messy handoff; wrong `from` domain |
| Your key for dev, client creates production later  | **OK for short dev spikes only** | Requires env + template re-test at cutover; easy to forget                      |
| **Dedicated iProduce Resend project from day one** | **Yes — recommended**            | Clean domain, billing, API keys, and client ownership                           |

### Who creates the account?

**Recommended flow:**

1. **You** create a new Resend project: `iProduce Africa` (production).
2. Sign up with `info@iproduceafrica.com` if you already have mailbox access
   for that address — otherwise use your agency email and **invite the client
   as Owner** before go-live.
3. Generate API keys:

- `RESEND_API_KEY` — local + Vercel preview (restricted if Resend supports it)
- `RESEND_API_KEY` — Vercel production (rotate at handoff if needed)

1. **Domain verification** on this project only: `iproduceafrica.com` (or the
   live apex they use). Client adds DNS records in their registrar / Cloudflare.
2. **Handoff:** client is Owner; you remain Developer or are removed.

Do **not** keep iProduce on your personal Resend account after launch unless
the contract says otherwise.

### Dev without verified domain

Resend provides `onboarding@resend.dev` for sending during development.
Use it as `EMAIL_FROM` until `iproduceafrica.com` is verified.

| Environment               | `EMAIL_FROM`                                | Notes                                                                   |
| ------------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| Local / preview (pre-DNS) | `iProduce Africa <onboarding@resend.dev>`   | Delivers to your inbox only in test mode rules — check Resend dashboard |
| Production                | `iProduce Africa <info@iproduceafrica.com>` | Requires verified domain on **iProduce** project                        |

Internal `to` addresses can be your email during dev; switch to client inboxes
before launch.

### Client inputs needed (checklist)

- [ ] Confirm primary inbox: `info@iproduceafrica.com` (or alternatives per form)
- [ ] DNS access for Resend domain records and Cloudflare Turnstile setup
- [ ] Who receives: contact, partners, community, academy registrations, newsletter alerts
- [ ] Confirm Turnstile site domain(s): local dev, Vercel preview, production

---

## Reference Implementation (WardWise)

Port these patterns — not the WardWise branding or auth stack.

| WardWise path                                                      | iProduce target                          | Role                                                                                                                                                                  |
| ------------------------------------------------------------------ | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/email/send.ts`                                            | `lib/email/send.ts`                      | Resend client, env guards, `SendEmailResult`                                                                                                                          |
| `src/lib/email/templates/*.tsx`                                    | `lib/email/templates/*.tsx`              | React Email components + `build*Email()`                                                                                                                              |
| `src/lib/email/previews/*.tsx`                                     | `lib/email/previews/*.tsx`               | Fixtures for `react-email` dev server                                                                                                                                 |
| `src/lib/email/components/`                                        | `lib/email/components/`                  | Shared header / footer                                                                                                                                                |
| `src/lib/email/contact.ts`                                         | `lib/email/contact.ts`                   | Thin send helper per domain                                                                                                                                           |
| `src/app/api/contact/route.ts`                                     | `app/api/contact/route.ts`               | Zod validate → send → JSON                                                                                                                                            |
| `src/features/public-site/lib/turnstile.ts`                        | `lib/turnstile.ts`                       | Turnstile server verification                                                                                                                                         |
| `src/features/public-site/components/support/turnstile-widget.tsx` | `components/shared/turnstile-widget.tsx` | Shared client widget — wraps `@marsidev/react-turnstile`; library owns script load, mount/unmount, multi-widget dedupe; wrapper owns retry button + email fallback UX |
| WardWise honeypot fields                                           | form schemas + components                | Silent bot trap; return success without sending                                                                                                                       |
| `package.json` → `email:dev`                                       | `email:dev` script                       | `email dev --dir ./lib/email/previews --port 3001`                                                                                                                    |

Port the email and public-form verification patterns — not WardWise branding,
auth, audit logging, Prisma, or admin stack.

---

## Forms In Scope

All schemas live in `schemas/`. All UI wired to API routes via `usePublicFormSubmit`.

| Form                         | UI entry                                                             | Schema                                         | API route (planned)                                       | Internal email              | Submitter receipt | Spam protection      |
| ---------------------------- | -------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------- | --------------------------- | ----------------- | -------------------- |
| Contact                      | `components/contact/contact-form.tsx`                                | `schemas/contact.ts`                           | `POST /api/contact`                                       | Yes → `CONTACT_TO_EMAIL`    | Yes               | Turnstile + honeypot |
| Partner inquiry (page)       | `components/partners/inquiry-form.tsx`                               | `schemas/partners.ts` → `partnerInquirySchema` | `POST /api/partners/inquiry`                              | Yes → `PARTNERS_TO_EMAIL`   | Yes               | Turnstile + honeypot |
| Become partner (dialog)      | `components/partners/become-partner-dialog.tsx`                      | `becomePartnerSchema`                          | `POST /api/partners/become-partner`                       | Yes → `PARTNERS_TO_EMAIL`   | Yes               | Turnstile + honeypot |
| Community application (page) | `components/community/application-form.tsx`                          | `membershipApplicationSchema`                  | `POST /api/community/application`                         | Yes → `COMMUNITY_TO_EMAIL`  | Yes               | Turnstile + honeypot |
| Community dialog             | `components/community/membership-application-dialog.tsx`             | `membershipApplicationDialogSchema`            | `POST /api/community/application` with `source: "dialog"` | Yes → `COMMUNITY_TO_EMAIL`  | Yes               | Turnstile + honeypot |
| Academy registration         | `components/academy/registration/academy-registration-dialog.tsx`    | `academyRegistrationSubmitSchema`              | `POST /api/academy/register`                              | Yes → `ACADEMY_TO_EMAIL`    | Yes               | Turnstile + honeypot |
| Newsletter                   | `components/shared/newsletter-signup-form.tsx`, footer, blog sidebar | `schemas/newsletter.ts`                        | `POST /api/newsletter`                                    | Yes → `NEWSLETTER_TO_EMAIL` | Yes               | Turnstile + honeypot |

### Academy registration note

The dialog already builds `academyRegistrationSubmitSchema` with `kind`, `slug`,
and fields. The API must **resolve session title server-side** from
`content/webinars.ts` / `content/courses.ts` (or later Sanity) — do not trust
client-sent titles.

### Newsletter note

Newsletter must send an internal notification as well as the subscriber
confirmation. Because this integration does not store subscribers in a DB or
Resend Audience, the internal notification is the operational record for now.

Marketing campaigns (Mailchimp/Brevo) stay out of scope until the client asks.

---

## Email Templates (planned)

Each template file exports:

- `*Template` — React component for preview + render
- `build*Email(input)` — returns `{ subject, html, text }`
- Shared formatters (e.g. `formatSubmittedAt` with `Africa/Lagos` timezone)

### Developer map — what lives where

See `docs/email-structure.md` for the full folder tree, logic vs helper
split, dual UI rules, and UI/config/Resend suggestions.

### Dual UI — internal vs subscriber (do not mix)

Both audiences share the logo asset and palette, but use **separate component sets**:

| Audience                        | Shell                   | Masthead                                                              | Body tokens                                             | Footer                  | Tone                                                 |
| ------------------------------- | ----------------------- | --------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------- | ---------------------------------------------------- |
| **Subscriber** (public receipt) | `audience="subscriber"` | `EmailSubscriberMasthead` — white logo band + **forest** eyebrow band | `emailSubscriberType`, `EmailBody variant="subscriber"` | `EmailSubscriberFooter` | Confirm → reflect → one CTA                          |
| **Internal** (team inbox)       | `audience="internal"`   | `EmailInternalMasthead` — white logo band + **light ops** label strip | `emailInternalType`, `EmailBody variant="internal"`     | `EmailInternalFooter`   | Short headline → compact field card → optional quote |

Logo display sizes: `EMAIL_LOGO_SUBSCRIBER` (176px) and `EMAIL_LOGO_INTERNAL` (148px) in
`lib/email/assets.ts`. Source PNG: `public/brand/email-logo.png` (320×142, 2×).

Internal field lists use `EmailDetailSection` (single bordered card, row dividers).
Subscriber highlights use `EmailHighlightCard` (sage panel, serif value).

### Shared components

- `lib/email/components/email-shell.tsx` — `EmailShell` + `EmailBody`; injects mobile styles per audience
- `lib/email/components/email-subscriber-masthead.tsx` / `email-internal-masthead.tsx`
- `lib/email/components/email-subscriber-footer.tsx` / `email-internal-footer.tsx`
- `lib/email/components/email-detail-section.tsx` — internal field lists
- `lib/email/components/email-highlight-card.tsx` — subscriber highlight panels
- `lib/email/components/email-quote-block.tsx` — free-text excerpts (internal)
- `lib/email/components/email-action-button.tsx` — leaf CTA (subscriber) or outline (internal)

### Template list

| Template                                 | Audience  | Eyebrow                      |
| ---------------------------------------- | --------- | ---------------------------- |
| `contact-notification.tsx`               | Internal  | Contact form                 |
| `contact-receipt.tsx`                    | Submitter | Message received             |
| `partner-inquiry-notification.tsx`       | Internal  | Partner inquiry              |
| `partner-inquiry-receipt.tsx`            | Submitter | Inquiry received             |
| `become-partner-notification.tsx`        | Internal  | Become a partner             |
| `become-partner-receipt.tsx`             | Submitter | Partnership inquiry received |
| `community-application-notification.tsx` | Internal  | Community application        |
| `community-application-receipt.tsx`      | Submitter | Application received         |
| `academy-registration-notification.tsx`  | Internal  | Academy registration         |
| `academy-registration-receipt.tsx`       | Submitter | Registration received        |
| `newsletter-notification.tsx`            | Internal  | Newsletter subscriber        |
| `newsletter-confirm.tsx`                 | Submitter | Newsletter                   |

Partner inquiry and become-partner can share a internal layout variant if the
diff is only field mapping — keep separate `build*` functions either way.

### Visual direction

- Match iProduce palette: forest / leaf greens, off-white panels, serif titles
  in email where WardWise used sans-heavy blocks.
- Inline styles only (React Email constraint) — no Tailwind in templates.
- No box shadows; borders and flat fills only (consistent with site rules).
- `rounded` corners: max 4px in email (email clients are picky; subtle radius).

---

## API Route Contract

Follow WardWise posture: validate with existing Zod schemas, return generic
errors to the client, log server-side on failure.

### Request

- `Content-Type: application/json`
- Body matches the form schema (+ academy `kind` / `slug` where applicable)
- Body also includes:
  - `turnstileToken: string`
  - `hpField: string` hidden honeypot field (`PUBLIC_FORM_HONEYPOT_FIELD`)
  - `source: "page" | "dialog"` for community submissions

### Success

```json
{ "success": true }
```

### Validation error

```json
{ "error": "Please review your details and try again." }
```

Status `400`.

### Bot / verification behavior

- If `hpField` is non-empty, return `{ "success": true }` but send no email.
  This silently neutralises basic bots without teaching them the trap.
- Verify `turnstileToken` server-side before sending any email.
- In local development, allow a documented bypass when Turnstile env vars are
  missing so forms remain testable.
- In production, missing Turnstile config is a `503`.

### Verification error

```json
{ "error": "Please complete the verification step and try again." }
```

Status `400` for missing / invalid tokens.

### Rate limit exceeded

```json
{
  "error": "Too many submissions from this connection. Please wait a few minutes and try again."
}
```

Status `429` with `Retry-After` header (seconds until retry).

### Not configured / delivery failed

```json
{
  "error": "We couldn't send your message right now. Please try again or email us at info@iproduceafrica.com."
}
```

Status `503` when `RESEND_API_KEY`, `EMAIL_FROM`, Turnstile env, or
route-specific `*_TO_EMAIL` is missing; `500` only when the **admin
notification** email fails. The submitter receipt is sent via
`sendEmailQuietly` in `lib/email/send.ts` — failures are logged to the
server (Resend dashboard remains source of truth) and the route still
returns `200`. Rationale: admin already has the submission, so a Resend
rejection on the receipt (e.g. unverified domain in testing mode) must
not be surfaced to the user as a generic failure.

### Client form changes

Replace `setTimeout` placeholders with `fetch("/api/...", { method: "POST", ... })`.
Show loading state on submit button; map `error` to inline alert (and optional
error toast if needed). On success, keep the inline success panel **and** fire a
light Sonner toast via `usePublicFormSubmit({ successToast })` on every public
form surface (page forms, dialogs, footer newsletter).
Add the shared Turnstile widget and hidden `hpField` honeypot to every public
form. Reset the Turnstile token after failed submissions and after successful
submissions.

Update all success UI copy from demo wording to live delivery wording:
contact, partners, community, academy registration, and newsletter. No success
state should say "demo", "preview", "nothing was sent", or "coming soon" after
this integration lands.

---

## Environment Variables

| Variable                         | Required      | Example                                     | Purpose                                                                     |
| -------------------------------- | ------------- | ------------------------------------------- | --------------------------------------------------------------------------- |
| `RESEND_API_KEY`                 | Yes (prod)    | `re_...`                                    | Resend API                                                                  |
| `EMAIL_FROM`                     | Yes (prod)    | `iProduce Africa <info@iproduceafrica.com>` | Default sender                                                              |
| `CONTACT_TO_EMAIL`               | Yes           | `info@iproduceafrica.com`                   | Contact notifications                                                       |
| `PARTNERS_TO_EMAIL`              | Yes           | `info@iproduceafrica.com`                   | Partner forms                                                               |
| `COMMUNITY_TO_EMAIL`             | Yes           | `info@iproduceafrica.com`                   | Community applications                                                      |
| `ACADEMY_TO_EMAIL`               | Yes           | `info@iproduceafrica.com`                   | Academy registrations                                                       |
| `NEWSLETTER_TO_EMAIL`            | Yes           | `info@iproduceafrica.com`                   | Newsletter subscriber alerts                                                |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes (prod)    | `0x4...`                                    | Client widget site key                                                      |
| `TURNSTILE_SECRET_KEY`           | Yes (prod)    | `0x4...`                                    | Server verification secret                                                  |
| `UPSTASH_REDIS_REST_URL`         | Yes (prod)    | `https://...upstash.io`                     | Rate limit Redis REST URL                                                   |
| `UPSTASH_REDIS_REST_TOKEN`       | Yes (prod)    | `...`                                       | Rate limit Redis token                                                      |
| `ENABLE_DEV_RATE_LIMITS`         | No            | `true`                                      | Opt-in local rate limiting                                                  |
| `NEXT_PUBLIC_SITE_URL`           | Yes (pre-DNS) | `https://iproduce-africa.vercel.app`        | Public origin for metadata + email links until `iproduceafrica.com` is live |
| `EMAIL_ASSETS_BASE_URL`          | Yes (pre-DNS) | `https://iproduce-africa.vercel.app`        | Absolute logo URL in sent mail (`/brand/email-logo.png`)                    |

Document in `.env.example` (no secrets). Vercel: set per environment. After domain cutover, point both URL vars at `https://iproduceafrica.com`.

---

## Dependencies (implementation phase)

Add to `package.json` when implementing:

```json
{
  "dependencies": {
    "@react-email/components": "^1.0.12",
    "@react-email/render": "^2.0.8",
    "resend": "^6.12.2"
  },
  "devDependencies": {
    "@react-email/ui": "^6.0.7",
    "react-email": "^6.0.7"
  }
}
```

Script:

```json
"email:dev": "email dev --dir ./lib/email/previews --port 3001"
```

---

## File Layout (target)

```text
lib/
  turnstile.ts
  email/
    send.ts                 # transport — Resend + env
    render.ts               # React Email → html/text
    assets.ts               # logo URL + display sizes
    format-submitted-at.ts  # Lagos timezone helper
    resolve-label.ts        # form option → label
    styles.ts               # tokens (subscriber + internal tracks)
    contact.ts              # orchestration — contact form
    newsletter.ts
    academy-registration.ts
    community.ts
    partners.ts
    components/
      email-shell.tsx
      email-subscriber-masthead.tsx
      email-internal-masthead.tsx
      email-subscriber-footer.tsx
      email-internal-footer.tsx
      email-detail-section.tsx
      email-highlight-card.tsx
      email-quote-block.tsx
      email-action-button.tsx
      email-sign-off.tsx
    templates/
      contact-notification.tsx      # internal + receipt + build*()
      partner-inquiry-notification.tsx
      become-partner-notification.tsx
      community-application-notification.tsx
      academy-registration-notification.tsx
      newsletter-confirm.tsx
    previews/
      contact-notification.tsx      # default export fixtures for email:dev
      contact-receipt.tsx
      ...

app/
  api/
    contact/route.ts
    partners/
      inquiry/route.ts
      become-partner/route.ts
    community/
      application/route.ts
    academy/
      register/route.ts
    newsletter/route.ts

components/
  shared/
    turnstile-widget.tsx

schemas/
  public-form.ts
```

Keep Zod in `schemas/` — do not move validation into `lib/email/`.
Use `schemas/public-form.ts` only for shared anti-spam envelope helpers
(`turnstileToken`, `hpField`, and community `source`), then compose them with
the existing domain schemas in the API route layer.

---

## Implementation Order

1. **Foundation** — deps, `.env.example`, `lib/email/send.ts`, shared email
   components, `lib/turnstile.ts`, `components/shared/turnstile-widget.tsx`,
   and `schemas/public-form.ts`
2. **Contact** — notification + receipt templates/previews, API, Turnstile +
   honeypot wiring, live success copy
3. **Newsletter** — notification + confirmation templates/previews, all
   footer/blog/sidebar instances, Turnstile + honeypot wiring, live success copy
4. **Academy registration** — server title resolution, notification + receipt,
   Turnstile + honeypot wiring, live success copy
5. **Partners** — inquiry form + become-partner dialog, notifications +
   receipts, Turnstile + honeypot wiring, live success copy
6. **Community** — page form + dialog, single API with explicit `source`,
   notification + receipt, Turnstile + honeypot wiring, live success copy
7. **DNS / production** — verify Resend domain, configure Turnstile site,
   swap `EMAIL_FROM`, client inboxes
8. **Docs** — update route specs, `mvp-phases.md`, `implementation-log.md`

---

## Verification

```bash
pnpm email:dev          # visual check all previews at :3001
pnpm format
pnpm lint
pnpm typecheck
pnpm build
```

Manual:

- Submit each form on local with `onboarding@resend.dev` from address
- Confirm internal email arrives with correct fields and `replyTo` on contact
- Confirm submitter receipt for every form when Resend is fully configured (best-effort: if the receipt fails the route still returns success — check the Resend dashboard for bounces rather than the API response)
- Confirm newsletter internal notification arrives; no subscriber is lost
- Break env on purpose → form shows friendly error, not fake success
- Submit with non-empty honeypot → API returns success, sends no email
- Submit without / with invalid Turnstile token in production-like env → `400`
- Remove Turnstile production env → `503`, not fake success
- Reset Turnstile after validation errors, delivery failures, and successful submissions
- After domain verify: send from `info@iproduceafrica.com`, check spam score

---

## Client Handoff (email)

Deliver to client:

1. Resend dashboard access (Owner)
2. List of env vars and which inbox receives which form
3. Cloudflare Turnstile dashboard access or exported site/secret key ownership
4. How to run `pnpm email:dev` if they have devs
5. Note: editing email copy = edit `lib/email/templates/*` until a CMS need appears
6. When to add Brevo/Mailchimp (only if they want self-serve campaigns)

---

## Decisions For Implementation

1. **Inbox routing** — keep separate env vars, pointing to `info@` until the
   client confirms dedicated `partners@`, `academy@`, or community inboxes.
2. **Submitter receipts** — attempt best-effort receipts for all forms via `sendEmailQuietly`; failures are logged and the route still returns success, since the admin notification is the load-bearing send.
3. **Newsletter** — send both internal notification and subscriber confirmation.
4. **Spam protection** — include Turnstile + honeypot in the same implementation
   as Resend; do not ship live forms without them.
5. **Community page vs dialog** — one API route, explicit
   `source: "page" | "dialog"`.

---

## Checklist

- [ ] Account strategy agreed (separate iProduce Resend project)
- [ ] Client DNS / inbox checklist sent
- [x] Turnstile site configured for local / preview / production domains
- [x] Dependencies + `email:dev` added
- [x] `lib/email/send.ts` + shared components
- [x] `lib/turnstile.ts`, `components/shared/turnstile-widget.tsx`, shared anti-spam schema helpers
- [x] All templates + previews
- [x] All API routes
- [x] All form components wired with fetch + Turnstile + honeypot
- [x] All live success copy updated
- [x] `.env.example` + Vercel env
- [ ] Domain verified on production
- [x] Route specs + `implementation-log.md` updated
