# Email — File Structure & Ownership

Quick map for anyone touching transactional email. Integration behaviour (Resend,
Turnstile, env vars, API contracts) lives in `docs/resend-integration-spec.md`.

## Folder tree

```text
lib/email/
├── send.ts                      # Resend transport (env + sendEmail)
├── render.ts                    # React Email → html + plain text
├── assets.ts                    # Logo URL + display sizes
├── styles.ts                    # Design tokens (subscriber + internal tracks)
├── format-submitted-at.ts       # Timestamp helper (Africa/Lagos)
├── resolve-label.ts             # Form option → label for email copy
├── contact.ts                   # Orchestration — contact form
├── newsletter.ts
├── academy-registration.ts
├── community.ts
├── partners.ts                  # inquiry + become-partner
├── components/                  # Shared markup + inline styles only
│   ├── email-shell.tsx          # Html wrapper, audience switch, EmailBody
│   ├── email-subscriber-masthead.tsx
│   ├── email-internal-masthead.tsx
│   ├── email-subscriber-footer.tsx
│   ├── email-internal-footer.tsx
│   ├── email-detail-section.tsx # internal field lists
│   ├── email-highlight-card.tsx # subscriber highlight panels
│   ├── email-quote-block.tsx    # internal free-text excerpts
│   ├── email-action-button.tsx
│   └── email-sign-off.tsx
├── templates/                   # One file per form — internal + receipt + build*()
│   ├── contact-notification.tsx
│   ├── newsletter-confirm.tsx
│   ├── academy-registration-notification.tsx
│   ├── community-application-notification.tsx
│   ├── partner-inquiry-notification.tsx
│   └── become-partner-notification.tsx
└── previews/                    # Fixtures for pnpm email:dev (default export only)
    ├── static/email-logo.png    # Mirror of public/brand/email-logo.png
    └── *.tsx

public/brand/email-logo.png      # Production logo asset (320×142, 2×)

app/api/
├── contact/route.ts
├── newsletter/route.ts
├── academy/register/route.ts
├── community/application/route.ts
└── partners/
    ├── inquiry/route.ts
    └── become-partner/route.ts

hooks/use-public-form-submit.ts
lib/forms/submit-public-form.ts
lib/api/public-form-post.ts
lib/turnstile.ts
components/shared/turnstile-widget.tsx
components/shared/public-form-security-fields.tsx
schemas/public-form.ts           # turnstileToken + hpField honeypot envelope only
```

## Logic vs helpers vs markup

| Kind              | Files                                                                                   | Responsibility                                                               |
| ----------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Transport**     | `send.ts`                                                                               | `RESEND_API_KEY`, `EMAIL_FROM`, `sendEmail()`, `isEmailDeliveryConfigured()` |
| **Render**        | `render.ts`                                                                             | `renderEmailTemplate()`                                                      |
| **Orchestration** | `contact.ts`, `newsletter.ts`, `academy-registration.ts`, `community.ts`, `partners.ts` | Read `*_TO_EMAIL`, call `build*Email()`, send internal then receipt          |
| **Helpers**       | `assets.ts`, `format-submitted-at.ts`, `resolve-label.ts`, `styles.ts`                  | Logo, timestamps, labels, tokens — no Resend calls                           |
| **Templates**     | `templates/*.tsx`                                                                       | React Email JSX + `build*NotificationEmail()` / `build*ReceiptEmail()`       |
| **Chrome**        | `components/*.tsx`                                                                      | Reusable layout pieces — markup and styles only, no send logic               |
| **Previews**      | `previews/*.tsx`                                                                        | Sample props for local preview — not used at runtime                         |

**Call chain:** `app/api/*/route.ts` → `lib/api/public-form-post.ts` → domain
orchestrator → `build*Email()` in templates → `renderEmailTemplate()` →
`sendEmail()`.

Validation stays in `schemas/`. Orchestrators receive validated payloads only.

## Dual UI — two audiences, do not mix

|                     | **Subscriber (receipt)**                                | **Internal (notification)**                         |
| ------------------- | ------------------------------------------------------- | --------------------------------------------------- |
| **Who**             | Person who submitted the form                           | iProduce team inbox                                 |
| **Shell**           | `audience="subscriber"`                                 | `audience="internal"`                               |
| **Masthead**        | White logo band + **forest** eyebrow band               | White logo band + **light ops** label strip         |
| **Body**            | `EmailBody variant="subscriber"`, `emailSubscriberType` | `EmailBody variant="internal"`, `emailInternalType` |
| **Content pattern** | Confirm → highlight → one CTA → sign-off                | Short headline → field card → optional quote        |
| **Fields**          | `EmailHighlightCard`                                    | `EmailDetailSection` (single card, row dividers)    |
| **CTA**             | Leaf green button                                       | Outline button (where used, e.g. Reply)             |
| **Footer**          | Forest band + explore links                             | Muted internal disclaimer                           |
| **Logo width**      | 176px (`EMAIL_LOGO_SUBSCRIBER`)                         | 148px (`EMAIL_LOGO_INTERNAL`)                       |

Same PNG asset; different chrome and typography rhythm.

## Local preview

```bash
pnpm email:dev   # http://localhost:3001 — previews in lib/email/previews/
```

Check both `*-notification` and `*-receipt` at **375px** before deploy.

## Adding a new form email

1. Add Zod schema + API route (existing pattern).
2. Add orchestrator in `lib/email/<domain>.ts` (or extend `partners.ts`).
3. Add `templates/<name>.tsx` with internal + receipt components and `build*()` exports.
4. Add two preview files under `previews/` (default export each).
5. Wire the form to the API via `usePublicFormSubmit`.

## Suggestions — UI / UX

- **Subscriber receipts:** Keep one CTA per email; no numbered “what happens next” blocks; mature tone (already the pattern).
- **Internal notifications:** Keep headlines short (fixed label, not session/org name in the display line). Put long values in the field card.
- **Mobile:** Always preview at 375px — internal emails should fit above the fold for name + email + primary context.
- **Dark mode:** Spot-check Gmail iOS and Apple Mail; inline styles are light-mode only today.
- **Reply path:** Contact internal already has `replyTo` + outline Reply button; consider the same on partners/community/academy internal templates if the team replies from mobile often.
- **Logo:** Commit `public/brand/email-logo.png` after visual sign-off; keep `previews/static/` copy in sync.

## Suggestions — configuration

| Variable                                                  | Purpose                                                                                                                                                       |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`                                          | Resend API key (dedicated iProduce project — not shared with other clients)                                                                                   |
| `EMAIL_FROM`                                              | `iProduce Africa <info@iproduceafrica.com>` in prod; `onboarding@resend.dev` pre-DNS                                                                          |
| `NEXT_PUBLIC_SITE_URL`                                    | **Until custom domain handover:** `https://iproduce-africa.vercel.app` — drives metadata, email CTAs, and footer links in sent mail via `getEmailSiteUrl()`   |
| `EMAIL_ASSETS_BASE_URL`                                   | **Match `NEXT_PUBLIC_SITE_URL` for now** — absolute logo URL (`/brand/email-logo.png`). Unset only for local `pnpm email:dev` (uses `/static/email-logo.png`) |
| `CONTACT_TO_EMAIL`                                        | Internal inbox per form (can share one ops address early)                                                                                                     |
| `PARTNERS_TO_EMAIL`                                       |                                                                                                                                                               |
| `COMMUNITY_TO_EMAIL`                                      |                                                                                                                                                               |
| `ACADEMY_TO_EMAIL`                                        |                                                                                                                                                               |
| `NEWSLETTER_TO_EMAIL`                                     | Operational record until a list tool exists                                                                                                                   |
| `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Production keys on live domain                                                                                                                                |

Missing `RESEND_API_KEY` or `EMAIL_FROM` → API returns **503** with friendly copy (no silent success).

## Suggestions — Resend

- **Separate project:** `iProduce Africa` Resend project; client owns domain + billing at handoff.
- **Domain verification:** DKIM + SPF on `iproduceafrica.com` before switching `EMAIL_FROM` off `onboarding@resend.dev`.
- **Keys:** Use restricted preview key on Vercel preview; rotate production key at handoff if agency held it during build.
- **Deliverability:** Sequential — notification first (load-bearing; failure → `500`), then submitter receipt via `sendEmailQuietly` (best-effort; failures are logged, route still returns `200`). Rationale: admin already has the submission, so receipt rejections (e.g. Resend testing mode pre-DNS) must not surface to the user as a generic failure. Surface bounces via the Resend dashboard, not the API response.
- **Later (out of scope):** Resend Audiences for newsletter list, webhooks for bounce logging, BCC archive address for compliance.
- **Testing matrix:** Human submit, honeypot (success, no send), Turnstile fail, missing env (503), `replyTo` on contact/partners/community/academy internal mail.
