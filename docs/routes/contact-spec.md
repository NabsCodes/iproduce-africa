# Contact Page Spec

## Status

Screenshot-driven target spec supplied 2026-06-19. Full static page shipped
2026-06-19. Implementation follows these screenshots, not the temporary
`PageHero` scaffold.

## Purpose

Give visitors a clear, credible path to reach the team for general inquiries,
community questions, Academy interest, or partnership conversations — with live
delivery via Resend when env vars are configured.

## Confirmed Inputs

- Route exists at `/contact`.
- Screenshots supplied 2026-06-19 (hero + reach-out/form, map, FAQ, CTA).
- Static MVP boundaries still apply: no CRM, no chat widget, no auth.
- Form submissions POST to `/api/contact` (Resend internal + receipt, Turnstile,
  honeypot). Missing env returns `503` — no fake success.
- The final page should **not** use the generic shared `PageHero`. It needs a
  route-specific hero + overlapping form composition.
- Contact details in the screenshot should drive copy; reconcile with
  `content/site.ts` where values differ (see Site data notes below).
- FAQ and bottom CTA match the Home/Community shared sections visually — reuse  
  those components with Contact-owned content where copy differs.

## Target Section Order

1. `ContactHeroSection` — split dark hero + support photo + social row.
2. `ContactReachOutSection` — left contact details + right floating form card
   (overlaps hero/footer transition on desktop).
3. `ContactMapSection` — embedded map with hub pin card.
4. Shared `FaqSection` (Home FAQ content or Contact projection).
5. Shared `CtaSection` (Contact-specific copy, single Partner CTA).

No marquee. No dashed decorative ring on this page — CTA reuses the solid
`DecorativeRing` accents already owned by `CtaSection`.

## Reuse Map

| Section          | New / Reused | Notes                                                                                                                                                              |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hero             | **New**      | `components/contact/hero-section.tsx`. Split forest panel + portrait photo. Social icon row. Not `PageHero`.                                                       |
| Reach out + form | **New**      | `components/contact/reach-out-section.tsx` + `contact-form.tsx`. Pattern similar to Partners inquiry split, but simpler fields and overlapping card posture on lg. |
| Map              | **New**      | `components/contact/map-section.tsx`. Static Google Maps iframe + optional info overlay card matching screenshot.                                                  |
| FAQ              | **Reused**   | `FaqSection`. Same categories/tabs/accordion as Home unless Contact gets its own FAQ block later.                                                                  |
| CTA              | **Reused**   | `CtaSection` with `overlapNext={false}` and Contact CTA content (single `Partner with us`).                                                                        |

---

## 1. Hero

### Desktop Composition

- Full-width section with **split background**:
  - **Left (~55%)**: deep forest green (`bg-forest-950` or gradient toward
    forest-900). Contains all hero copy.
  - **Right (~45%)**: support-representative portrait photo, slightly tinted to
    blend with the green family. Photo fills the column height.
- Left content (left-aligned, generous padding):
  - Eyebrow: dash + `LET'S CONNECT` in light leaf / mint uppercase tracking.
  - Title: `Contact` — large white serif (`text-4xl` → `text-5xl` at lg).
  - Body: `We're always happy to hear from you! Reach out to our team for inquiries, partnerships, or support in advancing modern and sustainable agriculture.` — white/70 sans, max ~480px.
  - **Social row**: four square icon buttons with rounded corners, dark forest
    fill, light leaf icon. Platforms (mobile screenshot is canonical):
    - WhatsApp
    - Instagram
    - LinkedIn
    - Telegram
    - Render disabled (`aria-disabled`, reduced opacity) when `href` is
      undefined — same posture as Home Stay Connected social cards.
- The white **contact form card** begins overlapping the hero's lower-right on
  desktop (see section 2). Hero bottom edge transitions into the off-white page
  surface below.

### Mobile Composition

- Confirmed 2026-06-19 mobile screenshot:
  - Single forest column: `EyebrowPill` (`Let's connect`) → title → body →
    social row → portrait inset with `rounded-xl` at bottom.
  - No side-by-side split below `lg`.
- Social icons stay in a horizontal row at 390px.

### Assets

- Portrait: placeholder from `lib/placeholder-images.ts` until final asset lands
  in `public/images/contact/`.
- Do not use generic `PageHero` imagery patterns.

### Implementation Notes

- Section owns `max-w-8xl` only where the inner grid needs it; the forest/photo
  split may need a full-bleed outer shell similar to Partners hero backdrop
  hoisting if the photo must touch the viewport edge.
- Extend icon coverage for WhatsApp + Telegram in a Contact-scoped social icon
  helper — do not expand global `SiteSocialLink` unless site-wide links arrive.

---

## 2. Reach Out + Contact Form

### Desktop Composition

- Background: off-white / `bg-background` below the hero.
- Two-column grid on lg:
  - **Left column** — editorial contact details: - Title: `Reach out` (dark serif, `text-3xl` → `text-4xl`). - Availability line: `Reach out to our team through any of these channels. We're available `**siteConfig.hours`**`— render hours from`[content/site.ts](content/site.ts)` (`Monday - Friday, 08 am - 05 pm`),
bold inline. Do not use screenshot 9–5 copy. - Vertical list of three contact rows, each with: - Circular leaf-green icon chip (phone, mail, map-pin). - Label (bold): `Phone`/`Email`/`Location`. - Value(s) below in muted sans. - **Phone values (screenshot):** - `+234 703 783 6030`-`+234 803 410 8745`- **Email:**`info@iproduceafrica.com`- **Location:**`3, Baltic Crescent Maitama, Abuja` - Phone and email should be clickable (`tel:`/`mailto:`) when implemented.
  - **Right column** — floating form card: - White card, `rounded-xl`, soft elevation (`elevation-2` or border-only —  
    match Partners inquiry card; avoid heavy shadow). - On lg, card overlaps upward into the hero transition (negative margin or  
    absolute positioning within a relative section wrapper). - Card header: - Title: `Contact Form` (serif). - Description: `Complete the form and a member of our team will get back to you as soon as possible.` - Fields: - Row: `First Name` | `Last Name` (side-by-side on sm+). - `Email Address` (full width). - `Message` (textarea, min ~140px tall). - Submit: full-width green button `Send Message`. POSTs to `/api/contact`  
     (Resend internal + receipt, Turnstile, honeypot). Inline success panel +  
     Sonner toast on submit.

### Mobile Composition

- Confirmed 2026-06-19 mobile screenshot: single column — reach-out heading,
  availability, contact list, then full-width form card below (no overlap
  float).
- First/last name fields side-by-side from `sm:`; stack on the narrowest widths  
  if needed.

### Form Schema (implementation)

- New `schemas/contact.ts`:
  - `firstName`, `lastName`, `email`, `message` — all required trimmed text.
  - Email validated with Zod email helper.
  - Message min length (~10 chars) with friendly error copy.
- Defaults + types exported from schema file per repo convention.
- Form options/labels in `content/contact.ts`.

### Anchor

- Form section / card wrapper: `id="contact-form"` for in-page deep links.
- FAQ support card on this route should scroll to `#contact-form` instead of
  linking to `/contact` (optional `supportCardHref` prop on `FaqSection`).

---

## 3. Map

### Desktop Composition

- Full-width map container inside the page width baseline (`max-w-8xl`).
- Large rounded rectangle (`rounded-xl`) with clipped iframe embed.
- Google Maps (or Mapbox static embed) centered on **3, Baltic Crescent,
  Maitama, Abuja**.
- Top-left floating info card (screenshot):
  - Title: `iProduce AgriBusiness Hub`
  - Address: `3, Baltic Crescent Maitama, Abuja`
  - `Directions` link (opens maps in new tab).
  - `View larger map` link below in tangerine accent.
- Map height: ~360px mobile → ~480px desktop (adjust to match screenshot ratio).

### Mobile Composition

- Same embed; info card stays top-left overlay or stacks above map if overlay  
  feels cramped at 390px (prefer overlay if readable).

### Static MVP

- Use a Google Maps **embed iframe** with hub coordinates — no Maps JS SDK, no
  API key management beyond embed URL in `content/contact.ts`.
- Store embed URL + external directions URL in content, not hardcoded in JSX.

---

## 4. FAQ

Reuse shared `FaqSection` with Home-equivalent content:

- Eyebrow: `Frequently asked questions`
- Title: `Questions, answered.`
- Description: `Everything about the platform, membership and partnerships — answered plainly.`
- Tabs: `All / Platform / Membership / Partners`
- Accordion items: same set as `homeContent.faqs` (or re-export from
  `content/contact.ts` as a projection to keep the route self-contained for
  CMS).

Support card:

- `Still curious?` / `Our team replies within one business day.`
- Button: `Talk to the team` → `#contact-form` on this route.

---

## 5. CTA

Reuse shared `CtaSection` with Contact-specific content:

- `overlapNext={false}` (no footer overlap on this page).
- Eyebrow: `Be part of the future`
- Title: `Let's Build the Future of Agriculture Together`
- Description: `Join a growing network of organisations committed to innovation, capacity building, and sustainable growth across Africa.`
- **Single CTA:** `Partner with us` (green leaf variant with handshake icon) →
  `/partners#partnership-enquiry`
- Solid `DecorativeRing` accents + sprout/tree/lines SVGs ship with the shared
  component — do not fork.

---

## Site Data Notes

Reconcile these when implementing `content/contact.ts` / `content/site.ts`:

| Field        | Screenshot                              | Current `site.ts`                      | Action                                                    |
| ------------ | --------------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| Phone        | Two numbers (703…, 803…)                | Single `+234 803 410 8745`             | Primary from `site.ts`; secondary in contact content only |
| Hours        | Mon–Fri, 9:00 AM – 5:00 PM              | Mon–Fri, 08 am – 05 pm                 | Use `siteConfig.hours` on Contact page                    |
| Address      | 3, Baltic Crescent Maitama, Abuja       | Comma after Crescent                   | Use `siteConfig.address`                                  |
| Social       | WhatsApp, Instagram, LinkedIn, Telegram | facebook, instagram, linkedin, youtube | Contact hero uses screenshot set; Contact-scoped icons    |
| Map hub name | iProduce AgriBusiness Hub               | —                                      | Contact-only content                                      |

Global footer/nav contact details can stay on `site.ts` until a deliberate
site-wide copy pass; the Contact page should match the approved screenshot.

---

## Content Shape (target)

```ts
// content/contact.ts (illustrative)
export const contactPageContent = {
  hero: { eyebrow, title, description, socialLinks, image },
  reachOut: { title, availability, channels: { phone[], email, location } },
  form: { title, description, fields, submitLabel, success },
  map: { title, address, embedUrl, directionsUrl, viewLargerUrl },
  faqs: { ...homeFaqProjection },
  cta: { eyebrow, title, description, ctas: [partnerOnly] },
};
```

Types in `types/contact.ts` (or extend `types/content.ts` if shapes stay small).

---

## Mobile Behaviour (general rules)

- Hero: copy → photo → social; no side-by-side split below `lg`.
- Reach out list: full-width rows with comfortable tap targets on `tel:` /
  `mailto:` links.
- Form: full-width card, stacked name fields at base if needed.
- Map: maintain minimum touch-friendly link targets on overlay card.
- FAQ: horizontal tab scroll on mobile (existing `FaqSection` behaviour).
- CTA: single full-width button on mobile.

---

## Verification

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm build
```

Browser walk at desktop (1440px), tablet (~900px), mobile (390px):

- Hero split + photo render without horizontal overflow.
- Form card overlap on desktop; clean stack on mobile.
- Contact links (`tel:`, `mailto:`) work.
- Form: empty submit shows field errors; happy path shows success after API delivery.
- Map embed loads; directions / larger-map links open externally.
- FAQ tabs filter correctly; support CTA scrolls to `#contact-form`.
- CTA Partner button routes to `/partners#partnership-enquiry`.
- No regression to shared FAQ/CTA on other routes.

---

## Checklist

- [x] Figma / screenshots supplied (hero, map, FAQ, CTA)
- [x] Desktop composition documented per section
- [x] Reuse map documented
- [x] Static form scope documented (Resend + Turnstile wired)
- [x] Site data reconciliation notes captured
- [x] Mobile composition confirmed per section (mobile hero + reach-out supplied)
- [x] `ContactHeroSection` implemented
- [x] `ContactReachOutSection` + `ContactForm` implemented
- [x] `ContactMapSection` implemented
- [x] `schemas/contact.ts` + `types/contact.ts` added
- [x] `content/contact.ts` expanded beyond scaffold
- [x] `FaqSection` consumed (support card → `#contact-form`)
- [x] `CtaSection` consumed with Contact content
- [x] WhatsApp / Telegram icons supported in hero social row
- [x] Placeholder hero + map assets wired
- [x] `pnpm format / lint / typecheck / build` green
