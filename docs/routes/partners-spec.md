# Partners Page Spec

## Status

Screenshot-driven target spec supplied on 2026-06-18. Implementation should be
done against these screenshots, not against the temporary scaffold or any
generic "v1" page composition.

Current route still exists at `/partners`, but the approved target requires a
bespoke Partners page, similar in ambition to the About and Academy pages.

## Purpose

Explain why organisations should partner with iProduce Africa, show the kinds
of collaborations available, and route serious partner interest into a static
MVP enquiry form without implying backend submission, account creation, or a
live partner portal.

## Confirmed Inputs

- Route exists at `/partners`.
- Primary public CTA language on this page is `Become a Partner` /
  `Partner with us`, with `Speak With Our Team` as a secondary action.
- Static MVP boundaries still apply: no backend submission, no auth, no partner
  dashboard, no CRM workflow, no payments, no donations, and no deal room.
- Client review on 2026-06-23 removed public traction numbers for now.
  Partnership proof copy must stay qualitative until verified metrics are
  approved.
- The final page should not include the generic shared `PageHero`. It needs a
  route-specific hero composition.
- Existing partner logo assets in `public/images/partners/` may be reused, but  
  do not invent extra partner logos.

## Target Section Order

1. `PartnersHeroSection`
2. `BenefitsSection`
3. shared `ImpactStatsSection` only when the impact/proof section is restored
4. `VoicesSection`
5. `OpportunitiesSection`
6. `InquirySection`
7. Shared/prop-driven `FaqSection`
8. Partners-specific CTA band

The screenshots do **not** show the Home-style standalone partners marquee
directly under the hero. Logo repetition appears inside the partner voices
section instead.

## 1. Hero

### Desktop Composition

- Background: pale neutral/green public-page surface.
- Left column:
  - eyebrow pill: `Partner with us`
  - serif h1: `Partner With Us to Transform Africa’s Agribusiness Future`
  - leaf accent on `Transform` and `Future`
  - body copy:
    `We collaborate with organisations, institutions, and ecosystem leaders to create opportunities, build capacity, and strengthen agribusiness across Africa.`
  - CTAs:
    - primary: `Become a Partner`
    - secondary: `Speak With Our Team` with arrow icon
- Right column:
  - large Africa-map mask filled with partner/agripreneur imagery
  - muted world-map backdrop behind the Africa shape
  - Madagascar accent shape in tangerine
  - floating pathway badge:
    - label: `Partnership pathway`
    - value: `For organisations, sponsors and institutions`
    - leaf circular icon chip

### Implementation (shipped 2026-06-18)

The hero visual is composed from **three independent assets layered in DOM**,
not a baked composite. This was reworked after the first pass because the
backdrop needed to break out of the page's `max-w-8xl` content container and
touch the viewport's right edge — which a single inline image inside the
layered wrapper cannot do.

**Asset map** (sources in `content/partners.ts` → `hero.map`):

| Layer | Asset                                 | Native dim | Owner                                        | Notes                                                                                                      |
| ----- | ------------------------------------- | ---------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 0     | `/svgs/north-map.svg` (`backdrop`)    | 567×260    | `<PartnersHeroSection>` (full-bleed sibling) | Light leaf-green silhouette of northern Africa. Extends to viewport's right edge.                          |
| 1     | `/images/partners/africa-map.webp`    | 1001×1123  | `<PartnersAfricaMap>` wrapper                | Masked photo of the agripreneur inside an Africa silhouette. Sets the wrapper aspect.                      |
| 2     | `/svgs/madagascar.svg` (`madagascar`) | 67×117     | `<PartnersAfricaMap>`                        | Tangerine accent island. Sized as % of wrapper so it scales geographically with the photo.                 |
| 3     | Partnership pathway badge             | —          | `<PartnersAfricaMap>`                        | Floating leaf icon + qualitative pathway copy. Sits inside the photo's bottom-left, slightly outset on lg. |

**Backdrop hoisting pattern (key rule).** The backdrop is rendered as a direct
absolute child of the `<section>` (not inside the layered wrapper or the
content container) so it can escape the `max-w-8xl px-4..xl:px-10` content
constraints and touch the viewport's right edge:

```tsx
<section className="bg-subtle relative overflow-x-clip ...">
  {/* Decorative backdrop — full-bleed, top-right anchored, behind everything */}
  <Image src={hero.map.backdrop} ... className="absolute top-0 right-0 z-0 ..." />
  <div className="max-w-8xl relative z-10 mx-auto w-full px-4 ...">
    {/* normal content grid */}
  </div>
</section>
```

> **General rule for decorative elements that need to break the content
> container:** hoist them out of the layout grid, position them `absolute`
> relative to the `relative overflow-x-clip` section, and z-index them below
> the content. Keep `priority` on the LCP image only (the masked photo), not
> on the decorative backdrop.

**Sizing the backdrop responsively without horizontal scroll:** the section
already carries `overflow-x-clip`, so any minor overshoot at odd viewport
widths gets clipped at the viewport edge rather than introducing horizontal
scroll. Width scales `w-[60vw] sm:w-[55vw] lg:w-[42vw] xl:w-[43vw]` and caps
at `max-w-[760px]` so it never explodes on ultrawides. Height is auto-locked
by the SVG's 2.18:1 ratio.

**Layered wrapper sizing.** `<PartnersAfricaMap>` caps at
`max-w-[400px] sm:max-w-[460px] lg:w-[min(38vw,520px)] xl:w-[min(38vw,580px)]`.
The masked photo's intrinsic 1001×1123 aspect drives the wrapper's effective
height, which Madagascar and the partnership badge reference via percentages
(`h-[19%]`, `top-[68%]`, `bottom-[5%] sm:bottom-[7%]`).

**Z-index stack:** backdrop `z-0` → photo `z-10` → Madagascar `z-20` →
partnership badge `z-30`.

**Mobile (390px):** backdrop stays visible per the supplied mobile design
(it sits behind the upper-right of the text content when stacked), Madagascar
stays visible, partnership badge sits inside the photo's bottom-left at a
slightly smaller scale (`p-3 + size-10` icon).

### Mobile / Tablet

- Stack copy before map visual.
- CTAs become full-width or comfortably stacked on 390px.
- Africa/map visual should remain inspectable, not tiny decoration.
- Floating pathway badge can sit below or overlap the lower edge of the map, but
  must not cover the face or create horizontal overflow.
- Keep all rounded rectangles capped at `rounded-xl`; map/mask shapes are  
  imagery, not rectangle radii.

## 2. Why Organizations Choose To Partner With Us

### Desktop Composition

- White section.
- Header row:
  - left: eyebrow `Trusted Partnerships`, h2
    `Why Organizations Choose to Partner With Us`
  - right: paragraph:
    `iProduce Africa serves as a platform that connects stakeholders across the agricultural ecosystem. Through partnerships, we help create meaningful impact by fostering collaboration, knowledge exchange, innovation, and industry growth.`
- Six-card grid, 3 columns x 2 rows:
  1. `Pan-African Reach` — `Connect with stakeholders across African markets and value chains.`
  2. `Capacity Building` — `Support programmes that empower youth, women, and agribusiness entrepreneurs.`
  3. `Industry Network` — `Engage with professionals and organisations shaping agribusiness across Africa.`
  4. `Knowledge Exchange` — `Promote learning through shared expertise, research, and industry insights.`
  5. `Innovation Focus` — `Advance technology adoption and future-ready agribusiness solutions.`
  6. `Sustainable Impact` — `Create measurable outcomes that strengthen communities and agricultural ecosystems.`

### Mobile / Tablet

- Header stacks into one column.
- Cards: 1 column on 390px, 2 columns on tablet, 3 columns on desktop.
- Icon chips use the peach/tangerine inactive state by default and only move to  
  the stronger tangerine treatment on card hover. Do not mark the first card as  
  active by default.

## 3. Partnership Focus

### Desktop Composition

- White section with centered header.
- Eyebrow: `Our Impact`
- H2: `Partnership Focus`
- Paragraph:
  `Partnerships are shaped around practical collaboration areas while verified impact metrics are still being formalised.`
- Four proof cards in one row:
  1. `Capacity building`
  2. `Market access`
  3. `Events & convening`
  4. `Knowledge exchange`

### Implementation Notes

- This section is currently commented out on the route per client request.
- If restored before verified metrics exist, render qualitative proof cards
  instead of public numbers.
- Cards can reuse the shared impact/proof helper if useful, but avoid  
  over-abstracting just for this page.

## 4. Hear From Our Valuable Partners

### Desktop Composition

- Light muted/green background.
- Left side:
  - eyebrow: `Trusted by many`
  - h2: `Hear From Our Valuable Partners`
  - large white testimonial card with oversized decorative quote marks
  - quote:
    `iProduce Africa's strong network and commitment to innovation make them an ideal partner for organisations seeking measurable impact in agriculture.`
  - name: `Musa Fajuyi`
  - role: `Partnerships Director, DGT Ltd`
  - small carousel dots with tangerine active state
- Right side:
  - logo grid from `partnersList` via `<VoicesLogoGrid />` — 12 cells on
    desktop (3×4), 6 on mobile; fill/rotation rules are **code-owned** (see
    [Voices logo grid — CMS contract](../cms-migration-spec.md#partner) in
    `cms-migration-spec.md`)
- Decorative tangerine ring partially clipped at the top-right.

### Mobile / Tablet

- Stack testimonial before logo grid.
- Logo grid can become 2 columns on mobile/tablet; avoid tiny unreadable logos.
- If only one testimonial is available, keep the dots as design decoration only
  or hide them until multiple testimonials exist.
- Do not invent partner quotes beyond the provided one.

## 5. Ways We Can Work Together

### Desktop Composition

- White page background with a large `bg-leaf-subtle` rounded-xl panel.
- Eyebrow: `Partnership Opportunities`
- H2: `Ways We Can Work Together`
- Paragraph:
  `Every partnership is unique. Whether you're looking to support a programme, sponsor an event, or co-create initiatives, we'll work with you to identify the right collaboration approach`
- Six white cards inside the panel, 2 columns x 3 rows:
  1. `Training & Capacity Building`
     `Support workshops, mentorship programmes, and professional development initiatives that empower agricultural stakeholders.`
  2. `Sponsorship Opportunities`
     `Support programmes and events that create measurable impact across the agricultural ecosystem.`
  3. `Events & Industry Engagement`
     `Collaborate on conferences, forums, networking events, and knowledge-sharing opportunities.`
  4. `Research & Knowledge Sharing`
     `Partner on industry insights, publications, thought leadership, and collaborative research projects.`
  5. `Strategic Partnerships`
     `Work together on initiatives that strengthen agricultural value chains, innovation, and market access.`
  6. `Community Development Initiatives`
     `Support programmes that improve livelihoods, encourage entrepreneurship, and foster agricultural growth.`

### Mobile / Tablet

- Outer panel keeps comfortable internal padding.
- Cards stack to one column on 390px, 2 columns on tablet/desktop as space
  allows.
- Icon chips use forest/leaf square treatment from screenshot.

## 6. Partnership Inquiry Form

### Desktop Composition

- Light muted/green section.
- Two-column layout:
  - left: copy/checklist
  - right: white form card
- Left copy:
  - eyebrow: `Become a Partner` (screenshot showed `Become a Member`; shipped copy is partner-specific)
  - h2: `Ready to partner with iproduce?`
  - paragraph:
    `Interested in collaborating with iProduce Africa? Tell us about your organization and partnership goals, and a member of our team will be in touch.`
  - checklist:
    - `Co-develop programmes & initiatives`
    - `Free to apply — no card required`
    - `Open to individuals and organisations`
    - `Reviewed within 5 working days`
    - `Community invite sent on approval`
- Form card:
  - title: `Partnership Enquiry Form`
  - note: `All fields are required. Takes about two minutes.`
  - fields:
    - `Full name`
    - `Organisation`
    - `Role`
    - `Country`
    - `Sector`
    - `Email`
    - phone field with country selector, default `+234`
    - `Area of Interest`
    - textarea: `Why do you want to partner with us?`
  - submit button: `Submit Inquiry`
  - consent/help text:
    `By making inquiry you agree to receive community updates and event invitations by email.`

### Copy notes (client review)

Some screenshot-era community language may still be worth revising with the
client:

- checklist item `Community invite sent on approval` (partnership flow, not membership)
- consent mentions community updates

Resolved in shipped copy:

- eyebrow → `Become a Partner`
- reason textarea → `Why do you want to partner with us?`

### MVP Behaviour

- Form POSTs to `/api/partners/inquiry` (Resend internal + receipt, Turnstile,
  honeypot, Upstash rate limit). Inline success panel + Sonner toast on submit.
- Keep form field options in `content/partners.ts`.
- If a select primitive is not available, use an accessible native/select
  approach first rather than overbuilding.

### Mobile / Tablet

- Stack copy first, form second.
- Inputs become single-column at 390px.
- Phone country selector and phone input must not overflow.
- Submit button is full-width.

## 7. FAQ

Use the shared `FaqSection`, but pass partner-aware copy/data if the final
content differs from Home.

Visible screenshot content currently matches the existing shared FAQ shape:

- Eyebrow: `Frequently Asked Questions`
- Title: `Questions, answered.`
- Categories: `All`, `Platform`, `Membership`, `Partners`
- CTA card: `Still curious?` / `Talk to the team`

## 8. Final CTA

Use the shared CTA visual language, but the copy must be Partners-specific:

- Eyebrow: `Be part of the future`
- H2: `Let's Build the Future of Agriculture Together`
- Paragraph:
  `Join a growing network of organisations committed to innovation, capacity building, and sustainable growth across Africa.`
- Button: `Partner with us`

Keep the dark forest band, decorative sprout/tree/ring assets, and radius cap
from the shared CTA rules.

## Content Ownership

- Keep editable page copy and repeated collections in `content/partners.ts`.
- If the Partners content model grows, move page-domain contracts to
  `types/partners.ts`, matching the About and Academy pattern.
- Shared partner logos remain in `partnersList`.
- Do not put SEO copy inside section content; keep metadata in `content/seo.ts`.

## Implementation Notes For Cursor / Claude

- Build section components under `components/partners/`.
- Replace the current generic `PageHero` scaffold with `PartnersHeroSection`.
- Do not leave the generic shared `PartnersSection` directly under the hero
  unless the final Figma screen explicitly includes that marquee there.
- Reuse existing primitives: `ButtonLink`, `EyebrowBadge`/`EyebrowPill`,
  `PartnerLogo`, `FaqSection`, CTA visual assets, and shadcn form primitives
  where they fit.
- Follow the project radius rule: max `rounded-xl` for rounded rectangles.
- Make 390px and tablet decisions in the same implementation pass.

## Implementation status (sections 2-8 shipped 2026-06-18)

### New shadcn-style UI primitives

| Path                            | Purpose                                                                        |
| ------------------------------- | ------------------------------------------------------------------------------ |
| `components/ui/form.tsx`        | Wraps `react-hook-form` (`FormProvider`, `Controller`) with shadcn API surface |
| `components/ui/select.tsx`      | Radix Select (umbrella `radix-ui` import) with project tokens                  |
| `components/ui/textarea.tsx`    | Basic `<textarea>` wrapper matching `<Input>` border/focus tokens              |
| `components/ui/phone-input.tsx` | `react-phone-number-input` wrapper styled to project tokens via globals.css    |

New dependencies: `react-hook-form`, `zod`, `@hookform/resolvers`,
`react-phone-number-input`. The library's CSS overrides live at the bottom of
`app/globals.css` under the `Phone input overrides` heading.

### Shared `<ImpactStatsSection>` is now prop-driven

Same neutral-types-with-defaults pattern as `<TestimonialsSection>` /
`<FaqSection>`. `types/content.ts` now exports `ImpactStatItem`, and the
section accepts optional `{ eyebrow, title, description, items }` props.
About page consumer unchanged (falls back to `aboutPageContent.impactStats`);
Partners consumer passes `partnersPageContent.impact`.

### Shared `<CtaSection>` is now prop-driven

Optional `{ eyebrow, title, description, leadDescription, buttons }` props,
with Home defaults preserved. Partners passes a single-button override
(`Partner with us` → `#partnership-enquiry`).

### Partners section components

| Path                                            | Notes                                                                                          |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `components/partners/benefits-section.tsx`      | 6-card grid; icon chips stay inactive until card hover. Header split layout.                   |
| `components/partners/voices-section.tsx`        | Testimonial carousel + `<VoicesLogoGrid />`; tangerine `DecorativeRing` top-right (md+ only). Grid contract: `cms-migration-spec.md` → `partner` → Voices logo grid. |
| `components/partners/opportunities-section.tsx` | `bg-leaf-subtle rounded-xl` outer panel + 6 white cards (2-col) with forest chips.             |
| `components/partners/inquiry-form.tsx`          | Client form consuming shared field wrappers and `schemas/partners.ts`; phone via shared input. |
| `components/partners/inquiry-section.tsx`       | Split layout: copy + 5-item checklist (left) + form card (right). `id="partnership-enquiry"`.  |

### Anchor migration: `#partner` → `#partnership-enquiry`

The old internal action-anchor `#partner` (rendered by the deleted
`partner-section.tsx`) is replaced site-wide by `#partnership-enquiry` (the
new inquiry section's id):

- `content/home.ts`: two CTAs updated
- `components/layout/header.tsx`: "Partner with us" desktop link
- `components/layout/mobile-nav.tsx`: "Partner with us" mobile link

### Form behaviour

- All fields required; zod schema enforces basic constraints (min lengths,
  email format, valid international phone via `libphonenumber-js` in
  `schemas/fields.ts`).
- `onSubmit` POSTs to `/api/partners/inquiry` (Resend internal + receipt,
  Turnstile, honeypot). Inline success panel + Sonner toast. Success card uses
  live copy from `content/partners.ts` and includes **Send another inquiry**
  (resets form + Turnstile).
- Page submit buttons use shared `FormSubmitButton` (spinner + **Submitting…**
  label). Multi-step dialog footer uses flex layout (not equal grid columns):
  mobile keeps short **Submit** label + spinner; sm+ shows **Submitting…** +
  spinner so the step counter does not collide.
- Become Partner **Review** step (mobile): summary header with org name wrapping,
  **Partner inquiry** badge top-right, partnership interests as leaf chips, extra
  scroll padding so fields clear the sticky footer.
- Phone field defaults to Nigeria (`NG`), country code editable via
  `react-phone-number-input` in `components/ui/phone-input.tsx`.
- Validation mode is `onBlur` so errors don't show on first focus.

### Form schema and shared dialog refactor (shipped 2026-06-19)

Validation and repeated dialog mechanics have been moved out of
`components/partners/`:

- `schemas/fields.ts` owns reusable Zod helpers such as trimmed text, email,
  optional URL, international phone, and "Other requires detail" refinements.
- `schemas/partners.ts` owns the Partners inquiry and Become Partner dialog
  schemas, schema-derived value types, default values, step keys, step schemas,
  and step field maps.
- `components/shared/form-fields.tsx` owns the repeated RHF text, select,
  textarea, phone, and checkbox-group wrappers.
- `components/shared/multi-step-dialog/` owns reusable dialog chrome:
  shell, stepper, heading, footer, and success panel.
- `components/shared/form-submit-button.tsx` owns page-form submit loading
  (spinner + submitting label).
- Partners-specific step bodies and copy remain in
  `components/partners/become-partner-dialog.tsx` and `content/partners.ts`.

Keep this ownership split for future Contact/Community dialogs: page folders
own the fields and copy that are unique to the page, while `schemas/` owns
validation and `components/shared/multi-step-dialog/` owns reusable modal
structure.

### Files removed

- `components/partners/partner-section.tsx` (replaced by inquiry section)
- `partnersPageContent.partner` content block (replaced by `inquiry`)

## Checklist

- [x] Screenshots supplied
- [x] Desktop composition documented
- [x] Mobile/tablet decisions documented
- [x] CTA hierarchy documented
- [x] Placeholder metrics/testimonial risks listed
- [x] Static form scope documented
- [x] Hero browser QA at desktop, tablet, and 390px
- [x] All sections built against screenshots
- [x] Form primitives shipped (`form.tsx`, `select.tsx`, `textarea.tsx`, `phone-input.tsx`)
- [x] Shared `ImpactStatsSection` and `CtaSection` refactored to prop-driven
- [x] `#partner` → `#partnership-enquiry` anchor migration complete
- [x] Partners forms moved to root `schemas/` and shared multi-step dialog primitives
- [x] Full route browser QA at desktop, tablet, and 390px
- [x] Dialog/form browser QA for validation states and close/reset behaviour
- [x] Motion polish on chosen sections (separate plan after static UI approved)
