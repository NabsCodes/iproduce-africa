# Mailchimp Newsletter Integration Spec

**Status:** Implemented in code — account experience configured; controlled
production smoke test pending  
**Scope:** The existing footer and Academy Blog newsletter forms only

## Outcome

Move newsletter subscriber storage and double-opt-in confirmation from Resend
to the client-owned Mailchimp audience without changing the public form design
or the delivery behavior of any other website form.

## Confirmed Account Setup

- Client-owned Mailchimp account: `dev@iproduceafrica.com` is Owner
- Sending domain authentication: complete
- One audience only
- Audience fields: Email Address, optional First Name, optional Last Name
- Source tag: `Website newsletter` (the API creates it on first successful use
  if it is not already present)
- Website/API opt-in: double opt-in through Mailchimp's `pending` member status
- Hosted Mailchimp form: double opt-in enabled so the resubscribe fallback
  records renewed consent consistently
- Opt-in confirmation email and confirmation page: branded in the client-owned
  Mailchimp account; separate final welcome email remains disabled
- Internal subscriber notifications: daily summary only; individual subscribe
  and unsubscribe notifications disabled
- Client-owned hosted signup URL is code-owned public content and is shown as a
  universal rejoin link after successful website submissions
- Server credentials use `MAILCHIMP_API_KEY`,
  `MAILCHIMP_SERVER_PREFIX`, and `MAILCHIMP_AUDIENCE_ID`
- Secrets stay in `.env.local` / Vercel server environments and never enter
  Sanity, client code, screenshots, documentation values, or Git

## Architecture Decision

Keep the existing `POST /api/newsletter` Route Handler. Do not introduce a
Server Action for this form.

The current route already participates in the shared public-form pipeline:

1. client-side React Hook Form + Zod validation
2. synchronous duplicate-submit lock
3. honeypot
4. Cloudflare Turnstile verification
5. Upstash rate limiting
6. server-side schema validation
7. normalized public error handling

A Server Action would create a second transport and security path without a
user-facing benefit. The browser must never call Mailchimp directly because
the Marketing API key grants account access and must remain server-only.

Use native server-side `fetch` for the small Mailchimp surface instead of
adding the Mailchimp SDK. The integration needs only member and member-tag
endpoints, and native fetch is easier to audit, type, mock, and keep out of the
client bundle.

## Current And Target Flows

### Current production flow

```text
Website newsletter form
  -> POST /api/newsletter
  -> shared public-form security
  -> Resend internal notification
  -> Resend subscriber receipt
```

### Target flow

```text
Website newsletter form
  -> POST /api/newsletter
  -> shared public-form security
  -> Mailchimp member sync with pending status
  -> Website newsletter tag
  -> Mailchimp double-opt-in confirmation email
  -> subscriber confirms
  -> Mailchimp changes pending to subscribed
```

The iProduce team receives only its configured Mailchimp daily summary. The
website does not send an individual internal email for every newsletter
signup.

## Provider Boundary

| Form                               | Provider after this slice       |
| ---------------------------------- | ------------------------------- |
| Newsletter                         | Mailchimp                       |
| Contact                            | Resend                          |
| Partner inquiry / Become a Partner | Resend                          |
| Community application              | Resend                          |
| Internal Academy registration      | Resend                          |
| External Academy registration      | External provider, such as Zoom |

Do not add a Sanity or public toggle for choosing Mailchimp versus Resend.
Provider selection is application behavior owned in code.

## Environment Contract

```env
MAILCHIMP_API_KEY=
MAILCHIMP_SERVER_PREFIX=
MAILCHIMP_AUDIENCE_ID=
```

- All three values are required for newsletter delivery.
- They must not use the `NEXT_PUBLIC_` prefix.
- Production values belong in Vercel Production.
- Preview should not receive production Mailchimp credentials by default;
  otherwise preview forms can write into the live client audience.
- Newsletter submissions on a Preview deployment without separate Mailchimp
  credentials are therefore expected to fail closed. This is an intentional
  safety boundary, not a Preview defect.
- Local testing may use `.env.local` with controlled test addresses.
- `NEWSLETTER_TO_EMAIL` remains in place until production Mailchimp testing
  passes, then it is removed from code, Vercel, `.env.example`, and the old
  Resend documentation.

## Implemented Code Shape

```text
app/api/newsletter/route.ts
  -> lib/api/public-form-post.ts
  -> lib/mailchimp/newsletter.ts
  -> Mailchimp Marketing API
```

### `lib/api/public-form-post.ts`

Refactor the provider-specific `toEmailEnv` option into a generic
`requiredEnvNames` option.

- Resend routes pass `RESEND_API_KEY`, `EMAIL_FROM`, and their destination
  inbox variable.
- Newsletter passes the three Mailchimp variables.
- The helper's two current hardcoded checks for `RESEND_API_KEY` and
  `EMAIL_FROM` must be removed completely. `requiredEnvNames` becomes the only
  source of route-specific delivery requirements; the Mailchimp route must not
  silently depend on Resend configuration.
- Existing fail-closed production behavior remains unchanged.
- The helper continues to own security, validation, rate limiting, and the
  public response shell; it does not own Mailchimp business logic.

Move the provider-neutral `readTrimmedEnv` helper out of
`lib/email/send.ts` into `lib/env.ts`. Resend, Turnstile, the public-form
handler, and Mailchimp should consume the neutral helper instead of making
non-email infrastructure import an email transport module.

### `lib/mailchimp/newsletter.ts`

The server-only module owns:

- trimmed environment parsing and server-prefix validation
- Mailchimp API base URL construction
- Basic authentication header construction
- lowercase email normalization
- Mailchimp subscriber hash generation
- member lookup/upsert behavior
- double-opt-in `pending` state
- assignment of the exact `Website newsletter` tag
- response/error normalization without logging email addresses or secrets
- a bounded request timeout

Normalize with `email.trim().toLowerCase()` before generating the subscriber
hash. The subscriber hash is the MD5 digest of that normalized address.

For a contact that does not exist, use the member PUT endpoint with
`status_if_new: "pending"`; do not send an unconditional top-level `status` in
the general upsert payload. This makes a create enter double opt-in without
downgrading an existing subscribed contact.

Do not mutate an existing `unsubscribed` member through the API. Mailchimp
requires self-unsubscribed contacts to rejoin through its hosted form so renewed
consent is recorded. The website shows that public hosted-form link to everyone
after a successful submission rather than exposing a contact's stored status.

Mailchimp requests reuse the existing server-provider timeout convention of
eight seconds.

Do not place Mailchimp calls in a React component or expose a Mailchimp client
through a browser-accessible module.

## Subscriber State Rules

The integration must preserve Mailchimp consent history and must not blindly
overwrite every contact with `pending`.

| Existing state          | Website submission behavior                                                                          | Public result                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Contact does not exist  | Create as `pending`, apply source tag, Mailchimp sends confirmation                                  | Generic success + universal hosted rejoin link                     |
| `pending`               | Do not create a duplicate; preserve pending state and ensure source tag                              | Generic success + universal hosted rejoin link                     |
| `subscribed`            | Do not downgrade to pending; ensure source tag                                                       | Generic success + universal hosted rejoin link                     |
| `unsubscribed`          | Preserve consent state, ensure source tag, and rely on the Mailchimp-hosted form for renewed consent | Generic success + universal hosted rejoin link                     |
| `cleaned`               | Do not override Mailchimp's bounce state                                                             | Generic non-enumerating response; log a redacted operational error |
| Provider/config failure | Do not claim success                                                                                 | Existing public delivery error and server-side redacted log        |

The response must not reveal whether an arbitrary email is already subscribed.
Use one public success message for new, pending, and existing subscribed
contacts.

The hosted rejoin link is rendered for every successful public response. It
must not be conditional on the member state returned by Mailchimp; a
status-specific response would let visitors test whether arbitrary addresses
belong to the audience.

Tag assignment follows a successful member sync. A transient tag request may
retry once, but a final tag failure must not tell the visitor that the entire
subscription failed after Mailchimp may already have sent the confirmation
email. Log the failure without PII and repair the controlled test contact in
the dashboard before production approval.

There is intentionally no background tag-reconciliation job in this slice.
After launch, a persistent tag failure is an operational exception: it is
logged without PII and repaired manually in Mailchimp. Webhook or scheduled
reconciliation remains deferred unless real volume justifies it.

## Public Copy

Use copy that is truthful for new and existing contacts without exposing
audience membership:

> Thanks. If you haven't confirmed yet, check your inbox for the confirmation
> email.

When the same normalized address is submitted again in the same browser
session, the client may acknowledge only that local fact:

> We already received this email during this session. If you haven't confirmed
> yet, check your inbox for the confirmation email.

This second message does not come from Mailchimp status and therefore does not
expose audience membership.

Keep `Subscribe with another email` unless client review requests a shorter
label. Always show a quiet `Previously unsubscribed? Rejoin the mailing list`
link to the client-owned hosted form. Do not promise a separate Resend receipt.

The current `sourcePath` field exists only to make the Resend internal
notification useful. Remove it from the newsletter request contract and form
props when that internal notification is retired; the approved Mailchimp
source record is the single `Website newsletter` tag, not one tag per page.

## Mailchimp Confirmation Experience

Configured in the client-owned account:

- opt-in confirmation email
- confirmation thank-you page
- sender name and reply-to address
- logo, colors, and plain-language confirmation copy
- required address and unsubscribe information

A separate final welcome email is not active in this slice. The confirmation
email is the single subscriber-facing signup email for the approved double
opt-in flow.

## Files Expected To Change

### Add

- `lib/env.ts`
- `lib/mailchimp/newsletter.ts`
- `tests/mailchimp-newsletter.test.ts`

### Modify

- `app/api/newsletter/route.ts`
- `lib/api/public-form-post.ts`
- `lib/email/send.ts` and current `readTrimmedEnv` consumers
- the five Resend-backed API routes that pass delivery environment requirements
- `schemas/newsletter.ts`
- `components/shared/newsletter-signup-form.tsx`
- `components/layout/newsletter-form.tsx`
- `components/academy/blog/blog-article-sidebar.tsx`
- `content/site.ts`
- `content/blog.ts`
- `.env.example`
- `README.md`
- `docs/resend-integration-spec.md`
- `docs/email-structure.md`
- `docs/production-form-delivery-cutover.md`
- `docs/status-board.md`
- `docs/implementation-log.md`

### Remove only after live Mailchimp testing passes

- `lib/email/newsletter.ts`
- `lib/email/templates/newsletter-confirm.tsx`
- newsletter-only files under `lib/email/previews/`
- `NEWSLETTER_TO_EMAIL` from configuration and deployment environments

Do not remove or alter shared Resend primitives used by other forms.

## Tests

Add Vitest coverage for:

- missing/invalid Mailchimp configuration
- normalized email and deterministic subscriber hash
- correct server-prefix URL
- new member -> `pending`
- pending member -> no duplicate contact
- subscribed member -> never downgraded
- unsubscribed member -> status preserved; no API consent mutation
- cleaned member -> no forced subscription
- exact `Website newsletter` tag assignment
- tag failure behavior
- Mailchimp 4xx, 5xx, malformed JSON, timeout, and network failure
- redacted logging (no API key or subscriber email)
- generic response that does not expose membership state
- existing Resend-backed form configuration remains fail-closed

## Rollout

1. Approve this spec.
2. Verify the credentials can read the intended audience without printing or
   recording secret values. **Complete (2026-07-22).**
3. Implement the server-only Mailchimp module and generic form-env contract.
4. Run unit tests, formatting, lint, typecheck, and production build.
5. Use local credentials with a controlled test email.
6. Verify the contact appears as `pending` with `Website newsletter`.
7. Verify the Mailchimp confirmation email arrives.
8. Click confirmation and verify the contact becomes `subscribed`.
9. Verify repeat submission does not create a duplicate or downgrade status.
10. Verify the unsubscribe link changes the contact to `unsubscribed`.
11. Verify repeat website submission preserves `unsubscribed` and shows the
    universal hosted rejoin link.
12. Complete the hosted form and confirm Mailchimp records renewed consent.
13. Add/confirm Production-only Vercel credentials and deploy.
14. Run the same production smoke test from the live website.
15. Monitor Mailchimp and Vercel logs.
16. Remove newsletter-only Resend delivery and `NEWSLETTER_TO_EMAIL` only after
    the production smoke test passes.

## Rollback

Keep the current Resend newsletter module and environment variable available
until production Mailchimp validation is complete. If the provider cutover
fails, revert only `app/api/newsletter/route.ts` to the Resend handler while
leaving every other public form unchanged.

## Acceptance Criteria

- Existing footer and Blog newsletter UI remains responsive and accessible.
- New contacts enter the correct Mailchimp audience as `pending`.
- Mailchimp sends one double-opt-in confirmation email.
- Confirmed contacts become `subscribed`.
- Every website subscriber receives the `Website newsletter` tag.
- Existing subscribed contacts are not downgraded or duplicated.
- Unsubscribed and cleaned states are respected; renewed consent uses the
  Mailchimp-hosted form.
- Repeat submissions receive clear current-session copy without exposing stored
  audience status.
- No per-subscriber internal Resend email is sent after cutover.
- Contact, partnership, community, and Academy Resend flows still pass live
  checks.
- API key and subscriber email values never appear in browser code or logs.
- Missing production Mailchimp configuration fails closed with the existing
  public delivery message.

## Deferred / Out Of Scope

- Adding Academy or Community applicants to Mailchimp
- A marketing-consent checkbox on non-newsletter forms
- Mailchimp campaigns or multi-email automation journeys
- CRM/event-attendance rosters
- Additional audiences
- Sanity-managed provider toggles
- Mailchimp webhooks or local subscriber database synchronization

These can be reviewed later as separate consent and workflow decisions.

## Official References

- [Create your first Mailchimp audience](https://mailchimp.com/developer/marketing/guides/create-your-first-audience/)
- [Add or remove member tags](https://mailchimp.com/developer/marketing/api/list-member-tags/add-or-remove-member-tags/)
- [Resubscribe a contact](https://mailchimp.com/help/resubscribe-a-contact/)
- [Mailchimp API errors](https://mailchimp.com/developer/marketing/docs/errors/)
