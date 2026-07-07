# Legal & Compliance Pages Spec

## Status

**Approved for implementation** — Codex review 2026-07-07 (contact field fix,
cookies honesty rules, replaceable entity/governing-law wording applied).
Footer legal links remain non-interactive placeholders until routes ship.

**Next step:** Implement per checklist below (`content/legal.ts` → components →
four routes → footer/SEO/sitemap).

## Purpose

Ship four real, usable legal/compliance pages that:

1. Match iProduce Africa's public marketing-site voice and design system.
2. Accurately describe how the **current** website collects and processes data
   (forms, email, bot protection, analytics, hosting).
3. Replace footer "Coming soon" placeholders with working internal links.
4. Give the client a **credible baseline** they can hand to counsel for
   replacement — not lorem ipsum, not fake certification claims.

This is **not** a substitute for Nigerian legal counsel. Copy should read as a
genuine operating policy with a short baseline notice that iProduce may update
it and that formal legal review may supersede sections.

## Confirmed Inputs

- Footer already lists four items in `content/site.ts` →
  `footer.legalLinks`: Privacy, Terms, Cookies, Accessibility — all
  `href: undefined` today (rendered as non-clickable spans per
  `docs/shared/footer-spec.md`).
- Site identity and contact from `content/site.ts`:
  - Name: **iProduce Africa**
  - Email: **info@iproduceafrica.com**
  - Phone: **+234 803 410 8745**
  - Address: **3, Baltic Crescent, Maitama, Abuja**
  - Site URL: **https://iproduceafrica.com**
- Public site uses shared chrome (Header + Footer) on all marketing routes —
  same pattern as `app/not-found.tsx`, **not** an isolated legal micro-site.
- Forms and infrastructure are **live in repo** (see Data & processors below).
- `@vercel/analytics` is mounted globally in `app/layout.tsx` — no cookie
  consent banner exists today.
- Sanity Studio embeds at `/admin` (separate surface; mention briefly in Privacy
  for editor/admin context only — not a public visitor flow).

## Open Question for Client (non-blocking for v1 draft)

**Legal entity name** for policy headers:

- Public brand: **iProduce Africa**
- Site copy references **Inara Foundation** as the initiative behind the hub
  (e.g. Partners spotlight / About context).

**v1 default:** Policies address **iProduce Africa** as the website operator
and data controller for site submissions, with a single sentence noting the
platform is an initiative associated with Inara Foundation. Client counsel can
swap in the exact registered entity name later without restructuring pages.

---

## Reference Projects (what to borrow)

| Source                                                                                             | Borrow                                                                                                         | Do not borrow                                                                                                     |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Vextra** (`~/Desktop/vextra/app/privacy/page.tsx`)                                               | Real prose tone; naming actual processors (Resend, Vercel Analytics); section depth for Privacy                | Single-page-only scope; custom header without main nav; company = Vextra Limited                                  |
| **WardWise** (`~/Desktop/wardwise-demo/src/lib/constants/legal-data.ts` + `legal-page-layout.tsx`) | `legal-data.ts` pattern — sections as structured arrays; shared layout + section renderer; legal doc cross-nav | Electoral/PVC/NIN data sections; mono "Legal 01" aesthetic; PostHog + full cookie-consent system (unless phase 2) |
| **iProduce system pages** (`content/system-pages.ts`, `app/not-found.tsx`)                         | Calm voice, no exclamation theatre; content in `content/`; shared site chrome                                  | Error-recovery CTAs — not needed on legal pages                                                                   |

**Recommended blend:** WardWise **structure** + Vextra **honesty** + iProduce
**design system** + **four pages** (footer already promises Accessibility).

---

## Routes

| Route            | Page title              | Footer label  |
| ---------------- | ----------------------- | ------------- |
| `/privacy`       | Privacy Policy          | Privacy       |
| `/terms`         | Terms of Use            | Terms         |
| `/cookies`       | Cookie Policy           | Cookies       |
| `/accessibility` | Accessibility Statement | Accessibility |

All four are static server pages. No forms, no client state required for v1.

---

## Architecture Plan

### File ownership

| Path                                         | Role                                                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `content/legal.ts`                           | All legal copy: entity block, `lastUpdated`, nav items, section arrays per page                  |
| `types/legal.ts`                             | `LegalSection`, `LegalPageMeta`, `LegalPagesContent` contracts                                   |
| `components/legal/legal-page-layout.tsx`     | Shared shell: eyebrow, h1, optional subtitle, last-updated badge, cross-doc nav, prose body slot |
| `components/legal/legal-section-content.tsx` | Renders `LegalSection[]` (h2 + paragraphs; optional bullet lists)                                |
| `app/privacy/page.tsx`                       | Route + metadata                                                                                 |
| `app/terms/page.tsx`                         | Route + metadata                                                                                 |
| `app/cookies/page.tsx`                       | Route + metadata                                                                                 |
| `app/accessibility/page.tsx`                 | Route + metadata                                                                                 |
| `content/seo.ts`                             | Four `pageSeo.*` entries                                                                         |
| `content/site.ts`                            | Wire `footer.legalLinks[].href`                                                                  |
| `content/seo.ts` → `sitemapRoutes`           | Add four hrefs (low priority)                                                                    |

Do **not** put legal copy in `schemas/` (Zod only). Do **not** add legal
documents to Sanity in v1 — static `content/legal.ts` is correct for this
milestone.

### Layout rules

- **Chrome:** Standard Header + Footer via root layout (no route group).
- **Section wrapper:**
  `max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-14 sm:py-16 lg:py-20`
- **Content column:** `max-w-3xl` for readable measure (legal prose).
- **Typography:**
  - Eyebrow: `EyebrowBadge` (tone `neutral` or `leaf`)
  - Title: serif `h1`, same scale family as other page intros
  - Body: `text-fg-muted text-sm sm:text-[15px] leading-7`
  - Section headings: serif or sans semibold `h2` — pick one and stay consistent
- **Radius:** cap at `rounded-xl` (project rule).
- **Motion:** none on v1 (legal pages stay static per `docs/motion-spec.md`
  system-page posture).
- **Cross-navigation:**
  - Desktop (`lg+`): sticky side nav listing all four docs; active route
    highlighted.
  - Mobile: horizontal scroll or compact pill row under the title.
- **Last updated:** visible date badge; value from `content/legal.ts`
  (`LEGAL_LAST_UPDATED`).

### Baseline notice (all four pages)

Short paragraph near the top or bottom (Privacy/Terms: top; Cookies/A11y:
bottom is fine):

> This document describes how the iProduce Africa website operates today. We
> may update it from time to time. iProduce Africa may replace or refine this
> text following formal legal review.

Tone: factual, not apologetic. No "placeholder" or "lorem" language.

### Entity & governing-law copy (Codex-approved)

Keep visibly **replaceable** until client counsel confirms:

- **Operator / data controller:** default to **iProduce Africa** with one sentence
  that the platform is associated with **Inara Foundation** — do not present
  either as finally settled legal entity language.
- **Governing law / venue:** draft as *"laws of the Federal Republic of Nigeria"*
  and *"courts in Abuja, Nigeria"* with wording like *"as applicable"* or the
  baseline notice above — counsel may substitute registered entity name and
  exact venue.

---

## Data Flows & Processors (must appear in copy)

### Form surfaces → API routes

| User action           | Component                         | API route                           | Typical fields (verify in `schemas/`)                                                                 |
| --------------------- | --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Contact form          | `contact-form.tsx`                | `POST /api/contact`                 | `firstName`, `lastName`, `email`, `subject`, optional `subjectOther`, `message` — **no phone** (`schemas/contact.ts`) |
| Partner inquiry       | `inquiry-form.tsx`                | `POST /api/partners/inquiry`        | `fullName`, `organisation`, `role`, optional `roleOther`, `country`, `sector`, optional `sectorOther`, `email`, `phone`, `areaOfInterest`, optional `areaOfInterestOther`, `reason` |
| Become partner dialog | `become-partner-dialog.tsx`       | `POST /api/partners/become-partner` | org profile, interests, contact (`schemas/partners.ts` → `becomePartnerSchema`)                       |
| Community application | `application-form.tsx` / dialog   | `POST /api/community/application`   | membership fields (`schemas/community.ts`)                                                            |
| Academy registration  | `academy-registration-dialog.tsx` | `POST /api/academy/register`        | name, email, phone, organisation, slug/kind (`schemas/academy-registration.ts`)                     |
| Newsletter            | `newsletter-signup-form.tsx`      | `POST /api/newsletter`              | email                                                                                                 |

All public forms use:

- **Cloudflare Turnstile** (`@marsidev/react-turnstile`, `lib/turnstile.ts`)
- **Honeypot** field (`components/shared/public-form-security-fields.tsx`)
- **Upstash Redis** rate limiting (`lib/rate-limit.ts`)
- **Resend** dual email: internal notification + user receipt
  (`lib/email/*`, `docs/resend-integration-spec.md`)

Missing production env returns **503** — policies should not claim data is
stored in a user account portal (there is none).

### Non-form processing

| Service                          | Purpose                                                            | Disclose on                              |
| -------------------------------- | ------------------------------------------------------------------ | ---------------------------------------- |
| **Vercel**                       | Hosting, deployment                                                | Privacy                                  |
| **Vercel Analytics**             | Aggregate page-view analytics (`@vercel/analytics` in root layout); [Vercel docs](https://vercel.com/docs/analytics) state Web Analytics uses anonymized data and **does not use cookies** | Privacy, Cookies                         |
| **Resend**                       | Transactional email delivery                                       | Privacy                                  |
| **Cloudflare Turnstile**         | Bot/spam protection on forms; may use strictly necessary cookies or security signals per [Cloudflare](https://www.cloudflare.com/turnstile-privacy-policy/) | Privacy, Cookies                         |
| **Upstash**                      | Rate-limit counters (request metadata)                             | Privacy                                  |
| **Sanity**                       | CMS / Studio at `/admin` for editorial content                     | Privacy (brief)                          |
| **Google Fonts via `next/font`** | Fraunces + Plus Jakarta (self-hosted through Next.js)              | Cookies (note: not third-party font CDN) |

### Explicitly out of scope for policies

Do **not** claim or imply:

- User accounts, logins, or passwords
- Payments, donations, e-commerce, or subscriptions
- Selling or renting personal data to marketers
- Formal WCAG audit / certification (Accessibility page = commitment + practices,
  not a badge)
- PostHog or session replay (not in this repo)
- Resend Audiences / marketing automation lists (newsletter is
  operational notification today — describe as email list for updates, not
  a full ESP product unless client confirms)

---

## Page-by-Page Section Outlines

### 1. Privacy Policy (`/privacy`)

**Subtitle:** How we collect, use, and protect your information.

| #   | Section ID                | Title                    | Key points                                                                                                                                                    |
| --- | ------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `introduction`            | Introduction             | iProduce Africa public website; agreement by use; link to Terms                                                                                               |
| 2   | `information-we-collect`  | Information we collect   | **You provide:** form fields per table above. **Automatic:** IP, browser/device, referrer, timestamps, pages viewed                                           |
| 3   | `how-we-use`              | How we use information   | Respond to inquiries; process applications/registrations; send transactional emails; secure the site; improve the site (aggregate analytics); comply with law |
| 4   | `legal-bases`             | Legal bases              | Contract/steps at request; legitimate interests (security, analytics); consent where applicable (newsletter, non-essential cookies if added later)            |
| 5   | `sharing`                 | How we share information | **No sale.** Processors: Resend, Cloudflare, Upstash, Vercel — link to their privacy policies. Legal disclosure if required                                   |
| 6   | `international-transfers` | International transfers  | Processors may process outside Nigeria; reasonable safeguards                                                                                                 |
| 7   | `retention`               | Data retention           | Keep as long as needed for purpose + legal obligations; deletion requests                                                                                     |
| 8   | `security`                | Security                 | TLS, access controls, rate limits; no absolute guarantee                                                                                                      |
| 9   | `your-rights`             | Your rights              | Access, correction, deletion, objection, withdrawal of consent — contact info@                                                                                |
| 10  | `children`                | Children's privacy       | Not directed at under-18; don't knowingly collect                                                                                                             |
| 11  | `changes`                 | Changes to this policy   | Post updates; revise last-updated date                                                                                                                        |
| 12  | `contact`                 | Contact us               | info@, phone, address                                                                                                                                         |

### 2. Terms of Use (`/terms`)

**Subtitle:** Rules for using the iProduce Africa website.

| #   | Section ID                | Title                   | Key points                                                                                                          |
| --- | ------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1   | `acceptance`              | Acceptance of terms     | By using the site you agree; link to Privacy                                                                        |
| 2   | `about-the-site`          | About the site          | Informational marketing site; Academy/Community/Partners pathways; **no user accounts**                             |
| 3   | `form-submissions`        | Form submissions        | Accurate info; permission to contact you; no guarantee of acceptance (community/partnership/academy)                |
| 4   | `acceptable-use`          | Acceptable use          | No unlawful use, scraping abuse, malware, impersonation, harassment                                                 |
| 5   | `intellectual-property`   | Intellectual property   | Site content owned by iProduce Africa / licensors; limited personal viewing; no commercial reuse without permission |
| 6   | `third-party-links`       | Third-party links       | Partner sites, social, map embeds — not responsible for external content                                            |
| 7   | `disclaimers`             | Disclaimers             | Training/content is general information, not professional/legal/financial advice                                    |
| 8   | `limitation-of-liability` | Limitation of liability | Standard marketing-site limitation; no indirect damages; cap where lawful                                           |
| 9   | `governing-law`           | Governing law           | Federal Republic of Nigeria; courts in Abuja, Nigeria — **draft wording, confirm with counsel** (see Entity & governing-law copy above) |
| 10  | `changes`                 | Changes                 | Updates posted on this page                                                                                         |
| 11  | `contact`                 | Contact                 | info@                                                                                                               |

### 3. Cookie Policy (`/cookies`)

**Subtitle:** How this website uses cookies and similar technologies.

**Copy rules (Codex-approved — do not invent cookie names or durations):**

- **Vercel Web Analytics:** State that it collects **anonymized** usage data and,
  per current Vercel documentation, **does not use analytics cookies** on this
  site.
- **Cloudflare Turnstile:** State that it processes **security / bot-protection
  signals** and may set **strictly necessary** cookies or similar technologies
  where Cloudflare requires them for challenge verification — link to
  Cloudflare's Turnstile privacy policy; **do not** fabricate `_cf_*` names or
  expiry times unless verified in browser devtools at implementation QA.
- **First-party:** Only describe cookies this app explicitly sets (e.g. future
  consent preference cookie in phase 2) — none in v1.
- Prefer a short **category table** (Essential / Analytics / Preferences) with
  honest "not used" or "provider-dependent" cells over a fake exhaustive list.

| #   | Section ID             | Title                | Key points                                                                                   |
| --- | ---------------------- | -------------------- | -------------------------------------------------------------------------------------------- |
| 1   | `what-are-cookies`     | What are cookies?    | Short plain-language definition; mention similar technologies (local storage, signals)       |
| 2   | `how-we-use`           | How we use cookies   | Turnstile = necessary security; Vercel Analytics = anonymized metrics **without analytics cookies**; no advertising cookies in v1 |
| 3   | `cookies-we-use`       | Cookies & similar technologies we use | Category table per copy rules above — honest, no invented names/durations              |
| 4   | `managing-cookies`     | Managing cookies     | Browser controls; blocking Turnstile may break forms; **no consent banner in v1** — state clearly |
| 5   | `third-party-policies` | Third-party policies | Links: [Cloudflare Turnstile](https://www.cloudflare.com/turnstile-privacy-policy/), [Vercel](https://vercel.com/docs/analytics) |
| 6   | `changes`              | Changes              | Updates to this policy                                                                       |
| 7   | `contact`              | Contact              | info@                                                                                        |

### 4. Accessibility Statement (`/accessibility`)

**Subtitle:** Our commitment to an accessible experience.

| #   | Section ID               | Title                   | Key points                                                                                                                                    |
| --- | ------------------------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `commitment`             | Our commitment          | Aim for inclusive access for agripreneurs, partners, institutions                                                                             |
| 2   | `measures`               | Measures we take        | Semantic HTML; keyboard focus on interactive controls; form labels; Radix/shadcn primitives; `prefers-reduced-motion` CSS; responsive layouts |
| 3   | `known-limitations`      | Known limitations       | No third-party audit yet; some third-party embeds (map, Turnstile); evolving content                                                          |
| 4   | `feedback`               | Feedback and assistance | Report barriers via Contact or info@; reasonable timeframe to respond                                                                         |
| 5   | `continuous-improvement` | Continuous improvement  | Update as we ship fixes                                                                                                                       |

---

## Cookie Consent Banner — Decision

| Phase                       | Scope                                                                                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **v1 (this spec)**          | Cookies **policy page** only; disclose Turnstile + Vercel Analytics per copy rules above; **no** new banner component |
| **v2 (optional follow-up)** | WardWise-style consent banner if client targets EU-grade opt-in or counsel requires it — only if non-cookie analytics or marketing trackers are added later |

Codex (2026-07-07): v1 without banner is **approved** — Vercel Web Analytics is
cookie-free per current Vercel docs; Turnstile disclosure is sufficient for
launch baseline.

---

## SEO & Discovery

Add to `content/seo.ts`:

```ts
privacy: { title: "Privacy Policy", description: "...", path: "/privacy" },
terms: { title: "Terms of Use", description: "...", path: "/terms" },
cookies: { title: "Cookie Policy", description: "...", path: "/cookies" },
accessibility: { title: "Accessibility Statement", description: "...", path: "/accessibility" },
```

Add to `sitemapRoutes` with `priority: 0.3`, `changeFrequency: "yearly"`.

`robots.ts`: allow all four (public compliance pages).

---

## Footer Wiring

Update `content/site.ts`:

```ts
legalLinks: [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
  { label: "Accessibility", href: "/accessibility" },
],
```

`FooterLink` already renders internal `Link` when `href` is set.

Optional follow-up: add Privacy link near form consent text (not required for v1).

---

## Implementation Checklist (post-approval)

- [ ] Codex review of this spec — approved / edits noted
- [ ] `types/legal.ts`
- [ ] `content/legal.ts` — full section copy (all four pages)
- [ ] `components/legal/legal-page-layout.tsx`
- [ ] `components/legal/legal-section-content.tsx`
- [ ] `app/privacy/page.tsx`
- [ ] `app/terms/page.tsx`
- [ ] `app/cookies/page.tsx`
- [ ] `app/accessibility/page.tsx`
- [ ] `content/seo.ts` — four entries
- [ ] `content/site.ts` — legal link hrefs
- [ ] `sitemapRoutes` — four hrefs
- [ ] `docs/shared/footer-spec.md` — update status (live links)
- [ ] `docs/status-board.md` — tick Legal section
- [ ] `docs/implementation-log.md` — session row
- [ ] `docs/routes/README.md` — add legal-pages-spec to mapping
- [ ] Notion iProduce Dev Notes — tick Legal pages; note baseline for counsel
- [ ] `pnpm format && pnpm lint && pnpm typecheck && pnpm build`
- [ ] Manual: open all four routes desktop + 390px; footer links; sitemap.xml

---

## Codex Review Checklist

**Result (2026-07-07):** Approved with edits — now incorporated above.

Original review items:

1. **Accuracy** — Every processor and form route listed matches the repo
   (`docs/resend-integration-spec.md`, `app/api/*`, `package.json`).
2. **Scope** — No invented product features (accounts, payments, data selling).
3. **Tone** — Reads as a real baseline policy, not a placeholder disclaimer.
4. **Entity** — iProduce Africa vs Inara Foundation wording is acceptable for v1
   or flag what client must confirm.
5. **Cookies** — v1 without consent banner is defensible given current
   `@vercel/analytics` usage; flag if banner should block v1 merge.
6. **Accessibility** — Statement does not over-claim (no false WCAG certification).
7. **Nigeria** — Governing law / contact details appropriate for operator.
8. **Architecture** — `content/legal.ts` + shared layout matches repo conventions
   (`AGENTS.md`, `CLAUDE.md`).
9. **Footer** — Four routes match existing footer labels exactly.
10. **Sitemap/SEO** — Low-priority yearly entries are reasonable.

**Codex follow-up edits applied:**

- [P2] Contact form fields aligned to `schemas/contact.ts` (no phone).
- [P3] Cookies copy rules: Vercel Analytics = no analytics cookies; Turnstile =
  necessary signals/cookies only — no invented names/durations.
- [P3] Entity / governing-law marked as replaceable pending counsel.

---

## Verification (post-build)

1. `pnpm format && pnpm lint && pnpm typecheck && pnpm build`
2. `/privacy`, `/terms`, `/cookies`, `/accessibility` — 200, correct metadata
3. Footer legal links navigate correctly
4. Cross-doc nav highlights active page
5. `sitemap.xml` includes four URLs
6. No horizontal overflow at 390px
7. Print-friendly enough (optional: `print:` hide side nav)

---

## References

- `docs/shared/footer-spec.md` — placeholder posture until these routes ship
- `docs/resend-integration-spec.md` — form + email processor detail
- `docs/routes/system-pages-spec.md` — voice direction for quiet surfaces
- `content/site.ts` — contact + legal link labels
- WardWise: `~/Desktop/wardwise-demo/src/lib/constants/legal-data.ts`
- Vextra: `~/Desktop/vextra/app/privacy/page.tsx`
- Notion: [iProduce Dev Notes](https://app.notion.com/p/3751a20509a080cab65ed784b4bf33e0) → Launch prep & QA → Legal pages
