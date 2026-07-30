# LMS Entry Point and Mobile App Promotion Spec

## Status

Code implemented and verified by automated checks. Responsive browser QA and
Studio publish/revalidation QA are complete. Development content rollout and
Production publishing remain separate launch tasks.

Implemented on 2026-07-30: the central LMS destination, desktop/mobile entry
points, the mode-aware course registration panel, the Site Settings fields with
query and normalization, the Community section with its code-native
placeholder, and the compact footer status. See the "Implementation Notes"
section at the end for the delivered file map and the deviations from the
proposed one.

Amended and implemented on 2026-07-30: the section moved to
`components/shared/`, Home renders it between Testimonials and Stay Connected,
coming-soon indicators use a neutral Lucide `Smartphone` icon with no
third-party store marks, and the official-badge path is wired but empty until
verified listings exist. See
"Amendment — Home Placement, Shared Component, and Store Assets".

This document is the implementation source of truth for the website changes
agreed after the LMS meeting. It deliberately scopes the LMS as a separate
platform and the mobile apps as an early-stage promotion. Do not start an API,
authentication, enrolment, progress, or app-store integration from this spec.

## Confirmed Product Decisions

- The public website remains the discovery and marketing surface.
- The iProduce LMS remains a standalone learning platform.
- The current LMS destination is
  `https://iproducelms.netlify.app/`.
- The intended canonical LMS destination is
  `https://learn.iproduceafrica.com` once its hosting and DNS are ready.
- The website links to public LMS pages; it does not embed the LMS or duplicate
  learner accounts, enrolment, lessons, progress, or certificates.
- `Explore courses` replaces the repeated `Partner with us` CTA in the desktop
  header and mobile menu.
- The `Partners` navigation item, Partners route, footer link, and contextual
  partnership CTAs remain. This is a header-priority change, not removal of the
  partnership journey.
- `Courses` remains under the Academy dropdown/accordion and continues to lead
  to the website course catalogue.
- Website course cards continue to open website course-detail pages. The
  course-detail CTA deep-links to the corresponding public LMS course page.
- Mobile app promotion appears once as a proper Community-page section and once
  as a compact footer status. It is not duplicated across several large
  sections.
- Sanity owns the mobile app promotion state, copy, optional preview image, and
  eventual store URLs.
- The first release supports one iProduce mobile-app promotion across iOS and
  Android. A catalogue of several future apps is out of scope until real
  products and requirements exist.

The app team confirmed:

> “it’s very early into development so the designs will definitely change. So
> the placeholder will be better 👍”

Therefore, the initial visual must be a branded, code-native placeholder—not a
fabricated app screenshot or an implied final product design.

## Goals

1. Make iProduce courses easy to discover from every public route.
2. Preserve the website's SEO-rich course catalogue while handing enrolment and
   learning to the LMS.
3. Give editors a safe repeatable workflow for connecting each Sanity course to
   its LMS page.
4. Promote the coming mobile experience without presenting unstable designs as
   final.
5. Let editors hide, announce, and later activate the app promotion without a
   code deployment.

## Non-Goals

- LMS API integration, iframe embedding, SSO, or shared authentication
- Website learner accounts, payments, progress, certificates, or dashboards
- Changes to the LMS codebase, hosting, course data, or authentication flow
- Vercel account creation, project transfer, subdomain DNS, or deployment
- Redirecting the website's whole Courses catalogue to the LMS
- Removing the Partners route or partnership enquiry
- Creating realistic mobile-app screens before approved designs exist
- App Store or Google Play submission and release management
- A CMS-managed main navigation or a CMS-managed multi-app catalogue

## Information Architecture: Before and After

### Desktop header

```text
BEFORE
Logo | Home About Academy⌄ Community Partners Contact | Partner with us | Join

AFTER
Logo | Home About Academy⌄ Community Partners Contact | Explore courses ↗ | Join
```

`Academy` retains:

```text
Webinars & Events
Courses
Blog / Insights
```

### Mobile menu

```text
BEFORE
01 Home
02 About us
03 Academy
   Visit Academy
   Webinars & Events
   Courses
   Blog / Insights
04 Community
05 Partners
06 Contact
[ Join our community ]
Partner with us

AFTER
01 Home
02 About us
03 Academy
   Visit Academy
   Webinars & Events
   Courses
   Blog / Insights
04 Community
05 Partners
06 Contact
[ Join our community ]
Explore courses ↗
```

### Course journey

```text
Website course catalogue
        ↓
Website course detail
        ↓  Start learning ↗
Public course page on iProduce LMS
        ↓
LMS enrolment / login / learning
```

Do not link the website course card directly to an LMS login page. The public
website detail page remains useful for discovery and search, and the public LMS
course page decides whether a learner must log in or enrol.

### Community and footer

```text
Community page
... Community preview
... Member stories, when present
[ Mobile app promotion: copy + branded placeholder ]
... Membership application
... FAQ
... CTA

Footer brand column
Logo
Brand description
Social links
Mobile apps — iOS & Android · Coming soon
```

## Slice A — LMS Entry Points

### A1. Central LMS destination

Add a code-owned destination to `SiteConfig` and `content/site.ts`:

```ts
learningPlatform: {
  label: "Explore courses";
  href: "https://iproducelms.netlify.app/";
}
```

Use this value for the repeated header and mobile-menu entry point. Do not
repeat the URL in components. When the canonical subdomain is live, update this
one value to `https://learn.iproduceafrica.com`.

Navigation structure remains code-owned in `content/navigation.ts`. Do not move
presentation chrome or the main navigation into Sanity.

### A2. Header and mobile-menu changes

Desktop:

- Replace only the separate `Partner with us` header CTA with
  `Explore courses`.
- Keep the existing `Partners` top-level navigation item.
- Include an external-link affordance such as `ArrowUpRight`.
- Open the LMS in a new tab with `target="_blank"` and
  `rel="noopener noreferrer"`.
- Give the accessible name enough context to communicate the destination, for
  example `Explore courses on iProduce LMS (opens in a new tab)`.
- Preserve header fit and hierarchy at `lg` and `xl`; the new label must not
  collide with the main navigation or Join CTA.

Mobile:

- Replace the secondary `Partner with us` text action below Join with
  `Explore courses`.
- Keep the Join action first.
- Close the sheet when the external link is activated.
- Use the same external-link and accessible-name treatment as desktop.

Do not add a second top-level `Courses` nav item. The external header CTA and
the internal Academy child serve different purposes:

- `Explore courses` → LMS catalogue/landing page
- `Academy > Courses` → website course catalogue

### A3. Sanity course links

No new course schema fields are required. The existing
`registrationConfig` already supports:

- `mode: "external"`
- `url`
- `providerName`
- `label`
- closed and interest states

For an LMS-backed course, editors should:

1. Create or identify the matching public course page on the LMS.
2. Copy the public course URL—not a hard-coded login URL.
3. Open the matching Course document in Sanity.
4. Set registration mode to `External`.
5. Set provider name to `iProduce LMS`.
6. Paste the LMS public course URL.
7. Set the CTA label to `Start learning`.
8. Preview and publish.

Existing course documents may remain in `Interest`, `Open`, or `Closed` mode
until their LMS pages are ready. Do not bulk-convert courses without verified
course-by-course URLs.

### A4. Mode-aware course registration panel

`CourseRegistrationPanel` currently always says that self-paced enrolment opens
soon. Replace that fixed copy with mode-aware copy so it does not contradict an
active LMS link.

Required behavior:

| Registration state | Panel heading               | Panel body                                                                  | Action                                             |
| ------------------ | --------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------- |
| `external` + URL   | `Learn on iProduce LMS`     | Explain that enrolment and course delivery continue on the learning portal  | External CTA; configured label or `Start learning` |
| `external` no URL  | `Learning link unavailable` | Explain that the course link is not available yet                           | No dead button                                     |
| `interest`         | `Register your interest`    | Explain that the visitor will be notified when the course becomes available | Existing internal interest action                  |
| `open`             | `Registration open`         | Explain that registration is currently open                                 | Existing internal registration action              |
| `closed`           | `Registration closed`       | Use configured closed copy or the existing safe fallback                    | No registration button                             |

Keep the current external link security attributes. The action resolver remains
the canonical source for whether a button, message, or external link renders.
If extracting a pure course-panel state resolver keeps UI copy and behavior
together, add focused unit tests for it.

## Slice B — Mobile App Promotion

### B1. Site Settings model

Add a `Mobile app promotion` group to the `siteSettings` singleton. The first
version can use direct fields because there is one promotion, not a collection:

| Sanity field           | Type           | Requirement                                                             |
| ---------------------- | -------------- | ----------------------------------------------------------------------- |
| `mobileAppStatus`      | string         | Required selection: `hidden`, `comingSoon`, or `live`; default `hidden` |
| `mobileAppTitle`       | string         | Required when visible                                                   |
| `mobileAppDescription` | text           | Required when visible; keep to approximately 2–3 short lines            |
| `mobileAppPreview`     | `imageWithAlt` | Optional; an approved mockup can replace the code placeholder later     |
| `iosAppUrl`            | URL            | Optional; render only when status is live and the URL exists            |
| `androidAppUrl`        | URL            | Optional; render only when status is live and the URL exists            |

Validation:

- `hidden` needs no copy, image, or store URLs.
- `comingSoon` requires title and description.
- `live` requires title, description, and at least one store URL.
- The URL fields use Sanity's URL validation.
- An image must retain its required alt text through the existing
  `imageWithAlt` object.

Existing `siteSettings` documents will not contain these fields. The frontend
must normalize missing values to hidden so this change is backward compatible
and does not require a migration script.

Extend the site-settings query and fetch normalization to expose:

```ts
mobileAppPromotion?: {
  status: "comingSoon" | "live";
  title: string;
  description: string;
  preview?: {
    image: string;
    alt: string;
  };
  iosUrl?: string;
  androidUrl?: string;
};
```

Normalization rules:

- Missing fields, `hidden`, or incomplete visible copy → `undefined`.
- `comingSoon` never exposes clickable store URLs.
- `live` with no valid store URL degrades safely to `comingSoon`; it must not
  produce dead store buttons.
- The optional preview uses a non-throwing image resolver. Do not call the
  required-image helper in a way that can fail the whole public layout when the
  preview is absent.

The existing `siteSettings` webhook already revalidates the public layout.
Keep that behavior; extend only the query/fetch data required by these
surfaces.

### B2. Initial Development content

After the schema and frontend are ready, populate the Development dataset in
Studio:

- Status: `Coming soon`
- Suggested title: `iProduce on mobile, coming soon.`
- Suggested description:
  `We’re building a new way to access iProduce on mobile. More details will be
shared as development progresses.`
- Preview: leave empty so the code-native placeholder is exercised
- iOS URL: empty
- Android URL: empty

The wording must remain deliberately general until the app team confirms the
product name, audiences, functionality, and store listings. Production content
is published only after browser QA and stakeholder approval.

### B3. Community-page placement

> Amended by B7–B8: the section is shared rather than Community-owned, and also
> renders on Home. The Community insertion rule below is unchanged.

Create one app-promotion section and insert it on Community:

- after `MemberStoriesSection` when stories exist;
- otherwise immediately after `CommunityPreviewSection`;
- before `MembershipApplicationSection` in both cases.

This placement connects a future mobile product with community engagement
without interrupting the page's main Join journey.

Layout:

- Route/section wrapper:
  `mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8 xl:px-10`
- Section rhythm: `py-14 sm:py-16 lg:py-20`
- Desktop: two-column split with copy and status/store actions on the left and
  the placeholder/preview on the right.
- Mobile at 390px: copy first, artwork second, full readable labels, no cramped
  desktop card squeezed into one column.
- Use semantic theme utilities and keep radii at `rounded-xl` or below.

### B4. Placeholder visual

Build the placeholder with existing brand assets and CSS/React composition:

- iProduce logo or wordmark
- restrained forest, leaf, and tangerine shapes
- one or two abstract phone silhouettes
- a visible `Coming soon` badge
- optional simple leaf/agriculture motif

Do not include:

- fabricated app dashboards, navigation, charts, profiles, or feature screens
- product claims that have not been supplied
- fake ratings, download counts, launch dates, or store approval
- a new generated bitmap that becomes harder to adapt than the component

The placeholder is decorative and must be `aria-hidden`. If an editor later
uploads an approved preview, display it in the same media area and use its
required alt text. Preserve a stable media aspect ratio so the future asset
does not require redesigning the section.

### B5. Coming-soon and live actions

Coming soon:

- Render display-only indicators such as `iOS · Coming soon` and
  `Android · Coming soon`.
- Use non-interactive elements, not dead anchors, disabled buttons, or fake
  official store badges.

Live:

- Render only the store links whose URLs exist.
- If one platform is live first, show its real link and keep the other platform
  as a coming-soon indicator.
- External links open in a new tab with `noopener noreferrer`, visible focus
  treatment, and accessible new-tab context.
- Use official store-badge assets only when approved assets or authoritative
  store listings are available. B9 is the fuller rule and supersedes this line:
  no third-party brand logos at all while coming soon.

### B6. Footer placement

Add a compact app-status row below the social icons in the existing footer
brand column. Do not create a new footer column.

- Hidden: render nothing.
- Coming soon: `Mobile apps — iOS & Android · Coming soon`.
- Live: show compact iOS and/or Android links; leave any unavailable platform
  marked coming soon.
- Reuse the normalized Site Settings state used by the Community section.
- Keep the footer's existing newsletter, contact, links, and legal structure
  unchanged.
- The footer stays text-only, or extremely compact. Do not add the platform
  icons introduced in B7 here; the brand column has no room for them.

## Amendment — Home Placement, Shared Component, and Store Assets (2026-07-30)

Approved and implemented after the first implementation pass.

Many visitors never reach the Community page, so the app promotion should also
appear on Home. It must reuse the same CMS record and the same presentation
logic — no second set of app fields, and no page-placement toggles.

### B7. Shared section ownership

Move the section out of the Community folder:

```text
components/community/mobile-app-promotion-section.tsx
        ↓
components/shared/mobile-app-promotion-section.tsx
```

This matches the existing cross-page precedent in `components/shared/`
(`cta-section`, `faq-section`, `partners-section`, `testimonials-section`).
Home and Community both render the same component with the same props. The
placeholder, the media aspect ratio, and the platform indicators stay identical
across both pages — this is one section used twice, not two variants.

### B8. Home placement

Home already calls `fetchSiteSettings()`, so it passes
`siteSettings.mobileAppPromotion` straight through and renders nothing when the
promotion is `undefined`, exactly like Community.

Insert between Testimonials and Stay Connected:

```text
Academy Spotlight
Testimonials, when present
Mobile App Promotion, when Site Settings exposes a promotion
Stay Connected
FAQ
Featured Articles
Final CTA
```

The reading order is deliberate: learning → social proof → the upcoming mobile
experience → social channels.

One CMS status continues to control Home, Community, and the footer together.
Per-surface visibility toggles are unnecessary complexity at this stage.

### B9. Platform indicators and official store assets

The governing rule: **no third-party store or platform trademark appears on any
state the website can currently render.** Store branding enters only as the
platform owner's own badge artwork, and only once a matching real store state
exists.

Coming-soon state:

- No Apple logo, App Store icon, Google logo, or Google Play icon.
- Plain-text platform indicators with a neutral Lucide `Smartphone` icon.
- The neutral icon is decorative and `aria-hidden`; the text communicates the
  platform and status.
- Indicators remain non-interactive and outside the keyboard tab order.
- The footer remains text-only — no icons, no badges.

Live state, before official artwork is registered:

- Text-only external link plus the neutral `ArrowUpRight` affordance.
- No store glyph may stand in for a badge that has not been approved.

Live or pre-order state, with official artwork:

- Register the badge in `storeBadgeAssets` (`lib/mobile-app-promotion.ts`) and
  place the files in `public/images/shared/`. The map is intentionally empty
  until listings exist, so the text-only link above is what ships today.
- Use the official, unmodified asset from Apple Marketing Tools or the Google
  Play Console, matched to the real store state: download, pre-order (Apple),
  or pre-registration (Google).
- Add a badge only when its corresponding verified listing exists, and link it
  directly to that listing.
- Render at Apple's 40px on-screen minimum height (`h-10 w-auto`) with clear
  space of at least one quarter of the badge height.
- Preserve `target="_blank"`, `rel="noopener noreferrer"`, accessible new-tab
  context, and visible focus treatment.
- Do not recreate, recolor, animate, or imitate official badge artwork. No CSS
  filters on badge images.

Why store icons are excluded, not merely deferred:

Two earlier drafts were rejected. The first proposed `FaApple`, which is the
standalone Apple logo — the mark Apple's guidelines name outright ("Don't use
the standalone Apple logo"). The second proposed `FaAppStoreIos` and
`FaGooglePlay` on the reasoning that store marks are not company logos. That
distinction is real but does not grant permission:

- Apple licenses App Store icon artwork in connection with applications
  available for download. iProduce has no listing, so that condition is unmet;
  Apple's pre-launch answer is the pre-order badge.
- Google identifies the Play icon as its trademark, directs developers to
  official badges rather than logo lockups, and asks for brand review of
  creatives referencing Google marks.
- Font Awesome redistributing the vector conveys none of this. Its licence
  covers its own icon files, not the platform owners' trademark permissions.

A store mark beside "Coming soon" is the weakest case of all: it uses a store's
trademark to signal presence on a store where nothing exists. That also
conflicts with this spec's own rule against implying store approval. The store
glyphs may only return if iProduce obtains explicit brand or legal approval —
this is an open clearance question, not a settled interim allowance.

The clean route to real store branding before launch is App Store pre-order and
Google Play pre-registration, which unlock unambiguously authorized badges that
drop straight into the registry above. Both require developer-account access
and store-submission work this spec lists as a non-goal.

- <https://fontawesome.com/license/free>
- <https://developer.apple.com/app-store/marketing/guidelines/>
- <https://developer.android.com/distribute/marketing-tools/brand-guidelines>

### B10. CMS, queries, and webhooks

No new coalescing, GROQ projection, query group, or webhook is required:

- `siteSettingsQuery` already returns every app-promotion field.
- Home already fetches the normalized Site Settings object.
- `normalizeMobileAppPromotion()` already handles missing, hidden, coming-soon,
  and live states.
- Publishing `siteSettings` already calls `revalidatePath("/", "layout")`,
  which covers Home, Community, and the shared footer.
- The external Sanity webhook still listens to the same `siteSettings` document
  type, so the new page usage needs no filter or payload change.

The only CMS change is wording: update the `mobileApp*` field descriptions to
say the promotion appears on the **Home page, Community page, and footer**.

## Ownership and Proposed Files

Claude may adjust names to match nearby conventions, but ownership should stay
within these boundaries:

| Concern                           | Expected ownership                                                                     |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| General LMS destination           | `types/site.ts`, `content/site.ts`                                                     |
| Desktop header CTA                | `components/layout/header.tsx`                                                         |
| Mobile-menu CTA                   | `components/layout/mobile-nav.tsx`                                                     |
| Course registration panel state   | `lib/academy-registration.ts` and/or `components/academy/courses/`                     |
| App-promotion CMS fields          | `sanity/schemaTypes/documents/site-settings.ts`                                        |
| App-promotion query/normalization | `lib/sanity/queries.ts`, `lib/sanity/fetch/site-settings.ts`                           |
| App-promotion public type         | `lib/sanity/fetch/site-settings.ts` or the nearest existing public-content type        |
| Shared app-promotion section      | `components/shared/mobile-app-promotion-section.tsx`                                   |
| Store badge asset registry        | `lib/mobile-app-promotion.ts` (`storeBadgeAssets`), artwork in `public/images/shared/` |
| Community placement               | `app/(site)/community/page.tsx`                                                        |
| Home placement                    | `app/(site)/page.tsx`                                                                  |
| Footer compact state              | `components/layout/footer.tsx` or a small footer-owned child                           |
| Automated coverage                | existing Academy registration and Sanity fetch test suites                             |
| Editor instructions               | `docs/cms-editor-guide.md` after implementation is verified                            |

Do not move code-owned placeholder structure into Sanity. Sanity owns editor
content and release state; components own layout and presentation.

## State Matrix

Home and Community render the identical section, so one column covers both.

| CMS/app state                  | Home + Community section       | Footer                         |
| ------------------------------ | ------------------------------ | ------------------------------ |
| Fields missing                 | Hidden                         | Hidden                         |
| `hidden`                       | Hidden                         | Hidden                         |
| `comingSoon`, no preview       | Code-native placeholder        | Coming-soon text               |
| `comingSoon`, approved preview | Uploaded preview               | Coming-soon text               |
| `live`, iOS URL only           | iOS link + Android coming soon | iOS link + Android coming soon |
| `live`, Android URL only       | Android link + iOS coming soon | Android link + iOS coming soon |
| `live`, both URLs              | Both real store links          | Both compact links             |
| Invalid `live`, neither URL    | Safe coming-soon presentation  | Safe coming-soon text          |

## Responsive and Accessibility Requirements

- Verify the full header at `lg` and `xl`, not only at 1440px.
- Verify the app-promotion section on both Home and Community at 390px, tablet
  width, and desktop. Confirm it reads correctly against each page's
  neighbouring sections, which differ.
- External destinations must be visually identifiable and have accessible
  new-tab context.
- Coming-soon indicators must not enter the keyboard tab order.
- Decorative placeholder artwork must be ignored by assistive technology.
- Uploaded previews require meaningful alt text.
- Preserve visible focus states and sufficient color contrast.
- Respect reduced-motion preferences; the placeholder must communicate without
  animation.
- No horizontal overflow in the mobile menu, app section, or footer.

## Verification

### Automated

Run after implementation:

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Add focused tests for:

- Site Settings normalization with fields missing/hidden
- complete `comingSoon` state
- optional preview absent and present
- `live` with iOS only, Android only, both URLs, and neither URL
- course external mode with and without URL
- preserved interest, open, and closed course behavior

### Browser and Studio QA

- Desktop header: LMS CTA visible, fits, opens the correct public LMS root
- Mobile menu: LMS CTA closes the sheet and opens the correct destination
- Academy active state and dropdown/accordion behavior unchanged
- Partners nav, Partners route, and partnership enquiry still work
- Course listings still open website detail routes
- A configured course `Start learning` CTA opens the matching public LMS course
- Interest/open/closed course panels remain accurate
- Development Site Settings publish updates Home, Community, and footer
  surfaces from the single `siteSettings` publish
- Hidden, coming-soon, and live states match the state matrix
- Missing preview uses the branded placeholder without a broken image
- Uploaded preview respects alt text and layout
- Footer does not wrap or overflow at supported widths

Automated checks do not replace browser interaction or Studio publish/revalidate
verification.

## Rollout Order

1. Add the central LMS destination and update desktop/mobile entry points.
2. Make the course registration panel mode-aware.
3. Add the Site Settings fields, query, normalization, and tests.
4. Build the code-native app placeholder and Community section.
5. Add the compact footer state.
6. Move the section to `components/shared/`, add the Home placement, and apply
   the neutral indicator treatment (B7–B9). Official store badges wait for
   verified listings.
7. Update the Sanity field descriptions to name Home, Community, and the
   footer (B10).
8. Populate Development Site Settings with the approved coming-soon copy.
9. Configure one Development course with a verified public LMS URL.
10. Run automated checks and responsive browser/Studio QA.
11. Update the CMS editor guide with the verified editing workflow.
12. Obtain stakeholder approval.
13. Publish matching Production content and course links.
14. Replace the central LMS root and per-course Sanity URLs when the canonical
    subdomain is live.

Steps 1–7 and the responsive browser/Studio QA in step 10 are complete. Content
population, the Development LMS course configuration, editor-guide update,
stakeholder approval, and Production rollout remain outstanding.

## Definition of Done

- `Explore courses` replaces only the repeated Partner header/mobile CTA.
- The Partners navigation and partnership journey remain intact.
- The LMS root is defined once in code.
- Website course details remain public and their configured CTAs reach the
  correct public LMS pages.
- Course registration-panel copy is accurate in every supported mode.
- Mobile app promotion is fully controlled by backward-compatible Site Settings
  fields.
- Hidden, coming-soon, and partial/full live states behave safely.
- The initial visual is clearly a placeholder and invents no app interface.
- Home, Community, and footer placements work at 390px, tablet, and desktop.
- Home and Community share one section component and one CMS record, with no
  duplicated app fields and no per-surface visibility toggles.
- Coming-soon promotion uses neutral imagery and text only; live store actions
  use official approved badge assets linked to verified listings.
- Automated checks and browser/Studio QA pass.
- Editor documentation is updated only after the workflow is verified.
- No LMS API, auth, hosting, DNS, or app-release work has been implied complete.

## Implementation Notes (2026-07-30)

### Delivered file map

| Concern                       | Delivered in                                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| LMS destination               | `types/site.ts` (`SiteLearningPlatformConfig`), `content/site.ts`                                              |
| Desktop / mobile entry points | `components/layout/header.tsx`, `components/layout/mobile-nav.tsx`                                             |
| Course panel state resolver   | `lib/academy-registration.ts` (`resolveCourseRegistrationState`), `types/academy.ts`                           |
| Course panel + action wiring  | `components/academy/courses/course-registration-panel.tsx`, `.../registration/academy-registration-action.tsx` |
| App-promotion CMS fields      | `sanity/schemaTypes/documents/site-settings.ts`                                                                |
| Query / normalization / type  | `lib/sanity/queries.ts`, `lib/sanity/fetch/site-settings.ts`                                                   |
| Per-platform state            | `lib/mobile-app-promotion.ts`                                                                                  |
| Community section             | `components/community/mobile-app-promotion-section.tsx`, `app/(site)/community/page.tsx`                       |
| Footer compact state          | `components/layout/footer.tsx` (`FooterAppStatus`)                                                             |
| Automated coverage            | `tests/academy-registration.test.ts`, `tests/site-settings-fetch.test.ts`                                      |

### Deviations from the proposed file map

- `resolveMobileAppPlatforms` was added in a new `lib/mobile-app-promotion.ts`
  rather than living in either surface. The Community section and the footer
  must agree about partial-live releases, so the per-platform decision is
  shared and unit-tested instead of duplicated in two components.
- The external course panel heading derives from the configured provider name
  (`Learn on iProduce LMS` when provider is `iProduce LMS`) instead of being a
  fixed string, so a course pointed at a non-LMS provider is not mislabelled.
  With no provider name the heading falls back to `Learn on the platform`.
- The closed-course fallback message is now
  `Registration has closed for this course.` The previous shared fallback said
  "session", which was wrong on a course page.
- The Community section renders inside a framed `rounded-xl` panel on a white
  section. Both neighbouring sections (`MemberStories` white,
  `MembershipApplication` subtle) already vary, so the panel keeps the section
  distinct with or without member stories.
- The footer coming-soon line collapses to the spec's
  `Mobile apps — iOS & Android · Coming soon`, and only splits per platform
  once at least one store URL is live.
- `content/academy.ts` still owns the interest-mode button label; the resolver
  accepts it as `defaultLabel` and owns the per-mode headings and body copy,
  matching how `resolveWebinarRegistrationState` already holds its copy.
- The full desktop navigation and the LMS CTA now appear at a new `desknav`
  breakpoint (1152px) instead of `lg`. Browser QA at 1024px found the nav
  column overflowing into the logo and the CTAs, with horizontal page
  overflow — the header did not fit at `lg` even before the slightly wider
  `Explore courses` label. The compact header and its sheet cover 1024–1151px,
  and the sheet still carries the LMS entry point. See `docs/shared/navbar-spec.md`.
- `mobileAppStatus` is intentionally **not** `Rule.required()`. `initialValue`
  only applies to new documents, so requiring it would block unrelated Site
  Settings publishes on the existing singletons until an editor picked a value.
  An unset status is treated exactly like `hidden`, in Studio and on the site.

### Verification status

- `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` pass.
- Every state in the state matrix was verified against rendered dev-server HTML
  using a temporary local normalization override, which was then removed.
- Browser review confirmed the mobile menu at 390px and desktop at 1440px, and
  found the `lg` header collision fixed by the `desknav` breakpoint above.
- Browser QA is complete for the compact/full header breakpoints and the shared
  Home and Community app-promotion section at mobile, tablet, and desktop.
- Studio publish + webhook revalidation QA is complete.
- Not yet done: final Development content rollout (B2) and the Development
  course configured with a real LMS URL (A3).
- `docs/cms-editor-guide.md` is deliberately unchanged until the Studio
  workflow is documented for editors.
