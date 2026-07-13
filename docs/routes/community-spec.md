# Community Page Spec

## Status

Full static page shipped 2026-06-19 (sections 1–12). Membership application
dialog shipped same day. See
`[community-membership-dialog-spec.md](community-membership-dialog-spec.md)`
for the wizard contract. Phase 2 member stories and FAQs are Sanity-backed;
the marketing page shell and cards remain code-owned.

## Purpose

Convert visitors into community members. Explain what membership unlocks
(beyond what the Academy already provides), prove it with member stories +
a live community preview, and route serious interest into a static membership
application without implying backend submission, account creation, or a live
member portal.

## Confirmed inputs

- Route exists at `/community`.
- Primary public CTA language on this page is `Join our Community` (green) with
  `Explore Member Benefits` as a soft secondary action.
- Static MVP boundaries still apply: no backend submission, no auth, no member
  dashboard, no payments, no donations.
- Approved hero already shipped (Figma node `25:8893`, screenshot
  2026-06-16). Do not regress it.
- Screenshots include member names + countries (Tunde, Ngozi, Kofi, Fatima)
  for Member Stories — treat as design-supplied placeholder copy. Mark with
  `// PLACEHOLDER` in `content/community.ts` until real stories arrive.
- Community channel chips show `Telegram LIVE`, `WhatsApp COMING SOON`,  
  `Circle COMING SOON`. Telegram is the only live link; the others render  
  disabled with a "Coming soon" affordance.

## Target section order

1. `CommunityHeroSection` — already shipped (Membership eyebrow, "Join our
   Agribusiness community.", member avatars + qualitative member label, orbit).
2. `WhyJoinSection` — 6-card benefits grid.
3. `ApplyBanner` (instance #1) — "It only takes two minutes" leaf-100 band.
4. `ThreeStepsSection` — dark forest rounded-xl panel with Join → Connect →
   Collaborate.
5. `WhoShouldJoinSection` — 9-card role grid.
6. `MemberBenefitsSection` — 6-card benefits grid (alternating chip tones).
7. `ApplyBanner` (instance #2) — "Ready to unlock every benefit?".
8. `CommunityPreviewSection` — split: chat mockup + bullets + channel chips.
9. `MemberStoriesSection` — 4 structured "result / challenge / with iProduce"
   cards.
10. `MembershipApplicationSection` — split: copy + checklist + application
    form.
11. Shared `FaqSection` (community content).
12. Shared `CtaSection` (community-specific content).

No marquee on this page. The orbit lives in the hero only.

## Reuse map

| Section                | New / Reused                  | Notes                                                                                                                                                                                       |
| ---------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero                   | Already built                 | `CommunityHeroSection` + `MembershipOrbit`. Verify orbit chips match screenshot (Farmers, Logistics, Exporters, Investors, Youth Agripreneurs, Women in Agric, Processors).                 |
| Why Join               | **New shared**                | Promote `components/partners/benefits-section.tsx` to `components/shared/benefits-section.tsx`. Takes content prop with `items[].tone`. Partners becomes a thin consumer.                   |
| Apply banner           | **New shared**                | `components/shared/apply-banner.tsx`. Used twice on this page. Props: `title`, `subtitle`, `ctas` (reuse `CtaSectionCta` shape from `types/content.ts`).                                    |
| Three steps            | **New**                       | `components/community/three-steps-section.tsx`. Bespoke dark-forest panel; not yet reused elsewhere. Promote later if a second consumer appears.                                            |
| Who should join        | **New**                       | `components/community/who-should-join-section.tsx`. Visually different from the benefits grid (white cards, smaller, all leaf chips, denser).                                               |
| Member benefits        | **Reused shared**             | Same shared `BenefitsSection` as Why Join, with different content + alternating tones (potential new `chipShape` prop for the round vs square icon chip).                                   |
| Community preview      | **New**                       | `components/community/preview-section.tsx`. Includes a hand-rolled chat mockup left + bullets + channel chips right.                                                                        |
| Member stories         | **New**                       | `components/community/member-stories-section.tsx`. 4 cards with `THE RESULT` / `THE CHALLENGE` / `WITH IPRODUCE` / footer (avatar + name + role/country).                                   |
| Membership application | **New, partner-form pattern** | Inline: `application-section.tsx` + `application-form.tsx`. Dialog: `membership-application-dialog.tsx` + `membership-application-review-step.tsx`. Schema split in `schemas/community.ts`. |
| FAQ                    | **Reused shared**             | `FaqSection` with `content={communityPageContent.faqs}`. Categories: `All / Platform / Membership / Partners`.                                                                              |
| CTA                    | **Reused shared**             | `CtaSection` with `content={communityPageContent.cta}` and `overlapNext={false}`.                                                                                                           |

---

## 1. Hero (shipped)

Existing `CommunityHeroSection` + `MembershipOrbit`. Verify against the new
screenshot that the orbit chips, member avatars, qualitative member microcopy,
and dual CTAs all match. Client review on 2026-06-23 removed public traction
numbers for now, so do not restore a country/member count until verified.

## 2. Why Join

White section.

- Header (left-aligned, max ~640px):
  - Dash + `WHY JOIN` tangerine uppercase eyebrow
  - Title `The Academy teaches. Membership connects.` (font-serif, two lines)
  - Subtitle: `Belonging, access, networking and opportunity — everything that happens beyond the classroom.`
- 3-column × 2-row grid (1-col mobile, 2-col sm, 3-col lg). Each card:
  - Square icon chip (`rounded-md`), alternating leaf-100 / tangerine-100
  - Card title (font-serif, ~18px)
  - Body copy (~14–15px, `text-fg-muted`)
  - `border-default rounded-xl bg-white`
- Six cards: Idea for startups / Build valuable connections / Discover new
  opportunities / Stay informed / Expand your network / Increase your
  visibility.
- Promote the partners `BenefitsSection` to shared; consume here with
  community-specific content.

## 3. Apply banner #1 — "It only takes two minutes"

Full-width `bg-leaf-100` band.

- Single row on desktop: left = title + subtitle; right = `Join our Community`
  (green filled) + `Explore Member Benefits` (outline).
- Stacks on mobile (text top, buttons bottom).
- `ApplyBanner` shared component takes `{ title, subtitle, ctas: CtaSectionCta[] }`.

## 4. Three Steps Section

Bespoke dark forest panel.

- Outer panel: `bg-forest-900 text-white rounded-xl` with subtle decorative
  dashed ring on top-right corner.
- Left: serif heading `Three steps from application to alliance`.
- Right: 3 step cards in a row with arrow icons between them.
  - Each step card: tangerine `STEP n` uppercase tracked label, serif step
    title (`Join` / `Connect` / `Collaborate`), short body copy.
  - Cards sit inside the dark panel with darker forest stroke + slight inner
    background.
- Mobile: heading on top, steps stack vertically with downward arrows.

## 5. Who Should Join

`bg-subtle` section.

- Header: dash + `DESIGNED FOR` eyebrow, `Who should join?` title (serif),
  subtitle `The community is built for every link in the agricultural value chain.`
- 3-column × 3-row grid of compact white cards (`rounded-xl`,
  `border-default`):
  - Square leaf-100 icon chip
  - Role title (font-serif, ~16–17px)
  - One-line description (`text-fg-muted`)
- Nine roles: Farmers / Input Suppliers / Processors / Logistics Providers /
  Traders & Retailers / Investors / Women in Agriculture / Youth Agripreneurs
  / Agribusiness Organisations.
- Mobile: 1-col, sm: 2-col, lg: 3-col.

## 6. Member Benefits

White section.

- Header: dash + `MEMBER BENEFITS` eyebrow, `What membership unlocks` title.
- 3-column × 2-row grid (`rounded-xl border-default bg-white`):
  - Round icon (`size-12 rounded-full`) with alternating leaf-100 / tangerine-100
  - Card title (font-serif, ~18px)
  - Body copy
- Six benefits: Academy access / Community access / Business connections /
  Industry opportunities / Event invitations / Updates & insights.
- Reuses the shared `BenefitsSection`. Change from section 2 is the chip shape
  (round vs square). Add a `chipShape: "square" | "round"` prop on
  `BenefitsSection` and let the consumer pick.

## 7. Apply banner #2 — "Ready to unlock every benefit?"

Same `ApplyBanner` shared component as section 3. Title + subtitle from
content, single `Join our Community` CTA.

## 8. Community Preview

`bg-subtle` section, two-column on lg.

- **Left**: chat mockup card (`bg-white rounded-xl border-default elevation-1`)
  - Header row: green dot + `iProduce Africa · Community` left, `Member discussions` right.
  - Pinned banner pill: peach `bg-tangerine-100` with `📌 Opportunity board · This week` (emoji ok inside content, not in code identifiers).
  - 3 message bubbles:
    - `Ngozi · Processor, Nigeria` (avatar NO, grey bubble) — shea suppliers
      ask, without a volume number
    - `Kwame · Farmer co-op, Ghana` (avatar KA, green bubble) — sends
      connection request
    - `iProduce Africa · Events` (avatar iP, grey bubble) — webinar
      announcement
- **Right**:
  - Dash + `COMMUNITY PREVIEW` (tangerine) eyebrow
  - Title `Connect with Africa's agribusiness ecosystem`
  - Lead paragraph
  - 3 bullets, each with leaf icon chip + title + one-line body:
    - Community discussions
    - Event announcements
    - Opportunity sharing
  - Channel chips row:
    - `Telegram` + green `LIVE` badge — links to Telegram channel
    - `WhatsApp` + tangerine `COMING SOON` badge — disabled
    - `Circle` + tangerine `COMING SOON` badge — disabled
- Mobile: stack right column above left (confirm against mobile screenshot  
  when supplied).

## 9. Member Stories

White section.

- Header: dash + `MEMBER STORIES` eyebrow, `What members build here` title.
- 4-card grid (1-col mobile, 2-col sm, 4-col lg):
  - Top: `↗ THE RESULT` micro-label (leaf), bold serif result statement with
    leaf left-border accent
  - Divider
  - `THE CHALLENGE` (tangerine eyebrow) + body
  - `WITH IPRODUCE` (tangerine eyebrow) + body
  - Footer (light leaf background): avatar disc + name + role/country
  - Card uses `border-default rounded-xl bg-white`
- Four PLACEHOLDER stories: Tunde (Young Agripreneur, Nigeria) / Ngozi  
  (Processor, Nigeria) / Kofi (Trader, Ghana) / Fatima (Woman Entrepreneur,  
  Senegal). Mark each entry with `// PLACEHOLDER` in content.
- **CMS-fed (Phase 2 slice 2C):** `MemberStoriesSection` now takes an
  `items` prop from `fetchMemberStories()` (`lib/sanity/fetch/member-stories.ts`,
  Sanity `memberStory` document type); the section hides entirely if there
  are no stories. `content/community.ts`'s `memberStories.items` is the
  migration-script source and rollback reference, not the live path —
  `eyebrow`/`title` stay static/code-owned.

## 10. Membership Application

`bg-subtle` section. Two columns on lg (left ~5 cols, right ~7 cols).
Anchor `id="membership-application"`.

- **Left**:
  - Tangerine eyebrow `BECOME A MEMBER`
  - Title `Ready to join the ecosystem?`
  - Paragraph
  - 5-item checklist with green `CheckCircle` icons:
    - Co-develop programmes & initiatives
    - Free to apply — no card required
    - Open to individuals and organisations
    - Reviewed within 5 working days
    - Community invite sent on approval
- **Right**: white form card (`elevation-2 rounded-xl`).
  - Heading `Membership application`
  - Note `All fields are required. Takes about two minutes.`
  - Fields (use shared `components/shared/form-fields`):
    - Full name (text)
    - Organisation (text) + Role (select) — 2-col on sm+
    - Country (select) + Sector (select) — 2-col on sm+
    - Email (text) + Phone (`PhoneFormField`) — 2-col on sm+
    - Why do you want to join? (textarea)
  - Primary button `Join our Community` (forest filled, full-width)
  - Consent microcopy: `By applying you agree to receive community updates and event invitations by email.`
- Schema (`schemas/community.ts`):
  - Reuse helpers from `schemas/fields.ts` (`emailSchema`,
    `internationalPhoneSchema`, `requiredTrimmedText`, `requireOtherDetail`).
  - Role / Country / Sector all reuse the partners option lists (import from
    `content/partners.ts` or extract to a shared `content/options.ts` if
    repeated more).
  - "Other → specify" pattern applies to Role / Country / Sector.
- Submit: POST to `/api/community/application` with `source: "page"` (Resend
  internal + receipt, Turnstile, honeypot). Success copy confirms receipt and
  follow-up window from `content/community.ts`.

## 11. FAQ

Reuses shared `FaqSection`. Pass `content={communityPageContent.faqs}`.

- Eyebrow `Frequently asked questions`
- Title `Questions, answered.`
- Description `Everything about joining, approval and the community — answered plainly.`
- Tab categories: `All / Platform / Membership / Partners`
- Items (from screenshot — expand):
  - Who can join?
  - Is membership free?
  - How long does approval take?
  - Can organisations join?
  - How do I access networking opportunities?
- Right sidebar `Still curious? Our team replies within one business day.`  
  — uses the existing FAQ side card pattern.

## 12. CTA

Reuses shared `CtaSection`. Pass community-specific content:

- Eyebrow `Be part of the future`
- Title `Join the Future of African Agribusiness`
- Description lead: `Connect, learn and grow with a community committed to transforming agriculture across Africa.`
- Description: `Join free, connect across borders, and turn conversations into alliances.`
- CTAs: `Join our community` (green, users icon) + `Partner with us`
  (tangerine, handshake icon).
- `overlapNext={false}`.

---

## Content shape (additions to `content/community.ts`)

Top-level keys to add alongside existing `hero` and `join`:

```ts
export type CommunityPageContent = {
  hero: CommunityHeroContent; // existing
  whyJoin: BenefitsSectionContent; // new shared type
  applyBannerPrimary: ApplyBannerContent;
  threeSteps: ThreeStepsContent;
  whoShouldJoin: WhoShouldJoinContent;
  memberBenefits: BenefitsSectionContent;
  applyBannerSecondary: ApplyBannerContent;
  preview: CommunityPreviewContent;
  memberStories: MemberStoriesContent;
  application: MembershipApplicationContent;
  faqs: FaqSectionContent;
  cta: CtaSectionContent;
};
```

The old `join` block has been replaced by the current application content.
Site-wide `#join` references now resolve through `#membership-application`
or the membership dialog action.

## Anchors

- Application form section: `id="membership-application"`.
- Existing community CTAs use `href="/community#membership-application"` plus  
  `action: "membership-dialog"` where they should open the dialog instead of  
  scrolling.

## Mobile behaviour (general rules)

- Banners: stack title/subtitle above buttons.
- Three Steps panel: heading top, steps stacked vertically with down arrows.
- Who Should Join: 1-col → 2-col at sm → 3-col at lg.
- Member Stories: 1-col → 2-col at sm → 4-col at lg.
- Application: copy/checklist on top, form below.
- Preview: confirm stack order against mobile screenshot when supplied.

## Verification

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm build
```

Then browser walk at desktop (1440px), tablet (~900px), mobile (390px):

- Hero unchanged (regression check).
- Every section matches its screenshot (spacing, type sizes, chip tones).
- Apply banner appears twice with matching styling.
- Three Steps panel renders cleanly on mobile (no horizontal overflow from
  arrows).
- Community Preview channel chips: only Telegram is interactive.
- Application form: happy path → success state with **Submit another
  application** link (resets form + Turnstile); empty submit shows
  per-field errors; phone validation rejects `123`; selects with "Other"
  reveal the specify input; soft → bold submit button reads as draft vs
  ready.
- FAQ tabs scroll horizontally on mobile, stay clean on desktop.
- CTA: green Join + tangerine Partner buttons, both functional.

## Checklist

- [x] Figma / screenshots supplied (sections 1–12)
- [x] Desktop composition documented per section
- [x] CTA hierarchy approved
- [x] Notion dev notes updated (Active → Done)
- [x] Card hover polish (benefits, who-should-join, member stories)
- [x] Three Steps dashed ring + equal card heights
- [x] Community Preview fidelity pass (chat mockup + channel chips)
- [x] Membership application dialog (3 steps + success)
- [x] Mobile composition confirmed per section (currently inferred)
- [x] Hero implemented
- [x] Promote `BenefitsSection` to `components/shared/`
- [x] `ApplyBanner` shared component implemented
- [x] `WhyJoinSection` implemented (consume shared BenefitsSection)
- [x] `ThreeStepsSection` implemented
- [x] `WhoShouldJoinSection` implemented
- [x] `MemberBenefitsSection` implemented (consume shared BenefitsSection)
- [x] `CommunityPreviewSection` implemented (chat mockup + channels)
- [x] `MemberStoriesSection` implemented (4 placeholder stories marked)
- [x] `MemberStoriesSection` cut over to Sanity `memberStory` (Phase 2 2C)
- [x] `MembershipApplicationSection` + `MembershipApplicationForm` implemented
- [x] `FaqSection` consumed with community content
- [x] `CtaSection` consumed with community content
- [x] `#membership-application` anchor + any `#join` repoints
- [x] Phase 3 scope review kept Community marketing copy code-owned
