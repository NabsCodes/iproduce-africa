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
- Screenshots show stats and testimonial copy. Treat these as design-provided
  placeholder/proof copy that must remain editable in `content/partners.ts`;
  confirm before presenting them as final verified metrics.
- The final page should not include the generic shared `PageHero`. It needs a
  route-specific hero composition.
- Existing partner logo assets in `public/images/partners/` may be reused, but
  do not invent extra partner logos.

## Target Section Order

1. `PartnersHeroSection`
2. `WhyPartnerSection`
3. `PartnershipImpactSection`
4. `PartnerVoicesSection`
5. `PartnershipOpportunitiesSection`
6. `PartnershipInquirySection`
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
  - floating stat card:
    - label: `Sustainable development`
    - value: `10+ Industry Collaborations`
    - leaf circular icon chip
- Implementation decision: render the Africa photo, north-map backdrop, and
  Madagascar accent as one baked composite WebP
  (`public/images/partners/partners-map-composite.webp`) so those exported map
  layers cannot drift independently across responsive layouts.

### Mobile / Tablet

- Stack copy before map visual.
- CTAs become full-width or comfortably stacked on 390px.
- Africa/map visual should remain inspectable, not tiny decoration.
- Floating stat card can sit below or overlap the lower edge of the map, but
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
- Icon chips use tangerine/peach fills from the design; first card uses a
  stronger tangerine chip.

## 3. Partnership Impact

### Desktop Composition

- White section with centered header.
- Eyebrow: `Our Impact`
- H2: `Partnership Impact`
- Paragraph:
  `Our trainings, network and alliances are organised around high-opportunity value chains — with more being added.`
- Four stat cards in one row:
  1. `Participants Trained` — `5,000+`
  2. `Countries Reached` — `20+`
  3. `Events Hosted` — `100+`
  4. `Active Community Members` — `500+`

### Implementation Notes

- These metrics are shown in the design but should stay editable and clearly
  centralized in `content/partners.ts`.
- If final metrics are not confirmed, label them in code/docs as placeholder
  design copy rather than invented business truth.
- Cards can reuse a generic stat-card helper if one already exists, but avoid
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
  - static logo grid using the confirmed partner logos, repeated as shown
  - 3 columns x 4 rows on desktop
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
  - eyebrow in screenshot: `Become a Member`
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
    - textarea: `Why do you want to join?`
  - submit button: `Submit Inquiry`
  - consent/help text:
    `By making inquiry you agree to receive community updates and event invitations by email.`

### Copy Confirmations Needed

The screenshot appears to carry some community/member language inside the
partner form:

- eyebrow says `Become a Member`
- checklist says `Community invite sent on approval`
- textarea says `Why do you want to join?`
- consent mentions community updates

Before implementation, confirm whether those should remain exactly as designed
or be adjusted to partner-specific language (`Become a Partner`,
`Partnership next step sent on approval`, `Tell us about your partnership
goals`, etc.).

### MVP Behaviour

- Static-first only.
- Form may validate locally and show a local success state, but it must not
  claim data was saved or submitted to a backend.
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

## Checklist

- [x] Screenshots supplied
- [x] Desktop composition documented
- [x] Mobile/tablet decisions documented
- [x] CTA hierarchy documented
- [x] Placeholder stats/testimonial risks listed
- [x] Static form scope documented
- [ ] Copy confirmations resolved for partner form wording
- [ ] Route implemented against screenshots
- [x] Hero browser QA at desktop, tablet, and 390px
- [ ] Full route browser QA at desktop, tablet, and 390px
