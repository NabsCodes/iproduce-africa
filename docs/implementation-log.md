# Implementation Log

Keep this log short. It exists so Nabeel, Codex, Cursor, Claude, or any future
agent can continue work without depending on chat history.

## Mailchimp newsletter integration (2026-07-22)

Approved the reviewed architecture and implemented Mailchimp for only the two
existing newsletter surfaces. `POST /api/newsletter` keeps the shared
Turnstile, honeypot, rate-limit, and response pipeline, then performs a
server-only, state-aware member sync with double opt-in and the exact `Website
newsletter` tag. Existing pending/subscribed/unsubscribed contacts are
preserved, cleaned contacts are not overridden, and provider logs contain no
email or key values.

Refactored the shared public-form environment contract so each route declares
its own provider variables; the five operational routes remain on Resend and
the newsletter route no longer depends on Resend configuration. Removed the
obsolete newsletter `sourcePath` request field, aligned public copy and docs,
and added focused provider/state/timeout/tag tests. The previous
newsletter-only Resend files and `NEWSLETTER_TO_EMAIL` remain rollback-only
until the controlled production Mailchimp smoke test passes.

Follow-up review (2026-07-23): verified the account now uses double opt-in and
the client-owned hosted signup URL is available. Removed the API attempt to
force `unsubscribed` contacts back to `pending`; all existing consent states are
preserved, while every successful response exposes the same quiet hosted rejoin
link so membership cannot be enumerated. Centralized shared newsletter response
copy, added clearer browser-local repeat-submit messaging, simplified the footer
reassurance line, and replaced the optimistic resubscribe test with an explicit
no-consent-mutation regression.

## Home What We Do video parity (2026-07-17)

Extended the About Story video pattern to Home so both CMS surfaces stay in
sync: the `homePage` singleton gained an optional `whatWeDoVideoUrl` field
(Section media group) validated by the same `resolveVideoEmbed` normaliser,
projected through `homePageQuery`, and attached to `whatWeDoPoster.video` at
the fetch boundary. `WhatWeDoSection` now renders the shared `VideoPoster`,
which also removes Home's old decorative, non-functional play icon — with no
URL configured the poster renders alone, matching About's honest blank state.
The code-owned `videoAriaLabel` copy was updated from "Intro video coming
soon" to a real play label. No dataset records were written; the client enters
real video URLs per dataset when available.

Review fixes: the normalized Home `video` was being dropped by
`fetchHomePage`'s final projection (poster-only forever, even with a valid
URL) — now returned alongside `image`/`imageAlt`. The `VideoPoster` play
control's inline size/radius/palette overrides moved into proper primitives:
a `video-overlay` button variant and `icon-lg` size in
`components/ui/button.tsx`, consumed without `className` overrides. Added a
focused fetch-layer regression test so a valid Home video cannot be normalized
and then accidentally omitted from the public poster contract again.

## Partner Voices avatar + About Story video (2026-07-17)

Sequenced a small client-visible media slice before the CMS category migration,
which still requires a separate dataset-migration review. Partner Voices now
consumes the photo/initial fallback already supplied by Sanity, uses the shared
Avatar primitive, and keys both testimonial carousels by stable Sanity IDs.

Added an optional About Story YouTube/Vimeo URL with one defensive normaliser
shared by Studio validation and the public fetch boundary. The shared
click-to-play poster mounts no third-party iframe before activation, constructs
only canonical privacy-oriented embed URLs, and degrades blank or invalid URLs
to an honest poster-only state. Home video wiring and direct uploads remain out
of scope. Documented CMS image hotspot/payload handling as a separate
cross-cutting follow-up rather than changing global image behaviour here.

## Site Settings editor UX (2026-07-17)

Grouped the singleton into Contact details and Social & community links, added
plain-language field descriptions, and documented exactly where each value is
used. Optional channel descriptions also explain the blank-state behaviour so a
non-technical editor can make changes without guessing whether a field affects
the footer, Home, Contact, Community, or form-delivery settings.

## CMS post-cutover Slice A — registration, SEO, and channels (2026-07-17)

Implemented the safe client-review follow-up without touching category data or
either Sanity dataset. Webinar registration now has one canonical resolver for
status copy, CTA behaviour, optional deadline, provider label, and the next
client-side time boundary. The Academy countdown remains session-start driven;
registration status is a separate line. External registration always opens in
a new tab.

Added optional SEO fields to Academy articles, webinars, and courses with
fallback metadata, share images, BlogPosting/Course/ItemList structured data,
and author-to-article webhook fan-out. Both existing dataset webhook projections
still need `"id": _id`; a blog-subtree fallback prevents stale author copy until
that dashboard-only step is done.

Added optional Telegram and WhatsApp settings for Community and Contact only,
with blank-link hiding and no invented URLs. Added Vitest for the pure
registration resolver matrix. Editorial categories remain a separate Slice B
that requires migration review before any dataset patch.

Post-review cleanup removed a duplicate happening-state details CTA and changed
the client deadline timer to re-arm itself when a boundary exceeds the browser's
maximum timeout, without making the render revision an effect dependency.

## Production Sanity dataset + Vercel cutover (2026-07-16)

Promoted the client-reviewed `development` dataset into the existing empty
`production` dataset using an asset-inclusive export/import so Studio edits were
preserved exactly. Backups were taken before the import. Post-import production
inventory matches development: 153 total records, including 95 content
documents and 46 image assets, with no drafts.

Vercel Production now explicitly uses `NEXT_PUBLIC_SANITY_DATASET=production`;
Preview explicitly uses `development`. Added the production
`SANITY_REVALIDATE_SECRET` and completed a server-side production redeploy at
commit `b7816e4`. Smoke checks: `/`, `/academy`, and `/admin` return 200; an
unsigned `/api/revalidate` request returns 401, confirming the secret is active.

Created the production document webhook for the 12 CMS-owned document types,
using the matching signing secret and an old/new slug projection. A temporary,
non-rendered marker on `siteSettings` triggered the signed webhook successfully:
Vercel returned HTTP 200. The marker was removed immediately, and the cleanup
publish also returned HTTP 200. Production publish-to-public-route revalidation
is therefore active.

## Docs wording cleanup before archival commit (2026-07-16)

Fixed two half-stale checklist notes from archival review: Academy automatic
promotion is no longer described as deferred in `docs/cms-migration-spec.md`,
and the six date-only webinar placeholders are framed as “confirm when those
events become real launch content” rather than a hard production cutover
blocker (`docs/status-board.md`, `docs/cms-client-summary.md`).

## Academy registration Studio labels (2026-07-16)

Clarified `registrationConfig` editor copy in
`sanity/schemaTypes/objects/registration-config.ts` without changing stored
`mode` values (`open` / `interest` / `external` / `closed`) or runtime
behaviour.

Studio radio titles: Open on this site; Collect interest only; Send to an
external page; Registration closed. Field renamed to “How people register”
with a short description of each option; supporting fields retitled (external
URL, button text, closed message).

Docs: `docs/sanity-academy-spec.md` registrationConfig table, plus a brief
note in `docs/cms-client-summary.md`.

## Static content archival to `content/_archived/` (2026-07-15)

Moved Sanity-owned seed snapshots out of active `content/*` without changing
runtime behaviour or Academy date-only placeholders.

Archive layout:

- Phase 1: `_archived/blog-articles.ts`, `webinars-catalogue.ts`,
  `courses-catalogue.ts`, `academy-catalogues.ts`
- Phase 2: `_archived/trust-and-people.ts`, `about-people.ts`
- Phase 3: `_archived/phase3-page-content.ts`, `legal-pages.ts`

Active content modules retain code-owned chrome (eyebrows, CTAs, forms, nav,
FAQ categories, registration, office hours, hero shell imagery where CMS
rejected ownership). Shared FAQ/testimonial defaults no longer resurrect
archived seed arrays. All three migration scripts now read from
`content/_archived/`. Offline migrate checks pass. Production dataset
migration and one-release archive cleanup remain open.

## Academy date display helpers (2026-07-14)

Consolidated Academy session date formatting into `lib/academy-dates.ts` so
UTC-safe display stays consistent across hub, hero, featured bands,
registration panel, detail pages, listing cards, and Home preview.

Owned helpers:

- `formatAcademyFeaturedDate` — long weekday date (featured / detail)
- `formatAcademyShortDate` — short date with year (hero + listing cards)
- `formatAcademyCardMetaDate` — uppercased short meta (`JUL 14`)
- `resolveAcademyDateLabel` — editor `dateLabel` override or featured format

Blog publish dates and email timestamps stay out of this module. Docs:
`docs/sanity-academy-spec.md` (promotion ownership section).

---

## Resend domain verification complete (2026-07-14)

Verified `iproduceafrica.com` in the dedicated iProduce Resend project.
Client is already Resend **Owner**. cPanel Zone Editor: DKIM TXT
`resend._domainkey` + Sending records on host `send` (MX/TXT). Enable
Receiving left **off** so Zoho MX keep working. Production Vercel env + form
smoke path complete. Website apex / `www` → Vercel remains a separate optional
public DNS cutover (mail/forms are not blocked on it).

Docs: `docs/status-board.md`, `docs/resend-integration-spec.md`,
`docs/production-form-delivery-cutover.md`.

---

## Academy automatic promotion (2026-07-13)

Replaced the webinar-only static featured slug with one automatic retained-set
rule shared by Home, Academy hub/hero/grid, webinar featured band, and related
sessions. `lib/academy-webinars.ts` retains published occurrences while
`effectiveEnd >= now`, where effective end is a valid optional `endDate` or the
required start `date`; results sort by start ascending then slug. A happening
event therefore keeps the slot until its actual end, including the existing
three-day AfriAgri forum. Registration remains start-driven and closes at the
start for default open mode; external mode remains the explicit live-link
escape hatch.

Studio now labels the required start clearly and offers `End date & time
(optional)` with end-after-start validation. GROQ, fetch normalization, and JS
all treat an invalid direct-write end as absent. AfriAgri's known August 14,
4:00 PM WAT end was added to static seed content and safely backfilled in the
development dataset. The exact Building Export QA timestamp was conditionally
restored to its prior July 14 seed value. Six date-only/midnight placeholders
remain explicitly warned by the migration and must receive confirmed real
start times before production cutover; no times were invented.

The featured countdown hydrates with `--`, not zero. It ticks only while
upcoming, switches locally to `Happening now` during a valid start/end window,
and schedules the end transition without a per-second multi-day timer. At
effective end it refreshes immediately, retries after the five-minute ISR
window, then performs one post-regeneration collection refresh. Copy says
`ended` only after a known end; without one it says the session started. The
shared registration action also re-evaluates at start on already-open detail
pages. Missing optional feature metadata falls back/gates cleanly, and webinar
query windows retain the slug tiebreak. No featured toggle, recurrence,
sessions array, cron, or polling loop was introduced.

Verification: overlap/invalid-end fixture passed; migration passed offline,
execute, and idempotent authenticated dry-run (30 skips, 6 intentional
placeholder warnings, 0 errors); format, lint, typecheck, build, and
`git diff --check` pass.

Final re-review fixed the rollover recovery effect so an identical RSC refresh
cannot cancel its own delayed retry chain: the effect now depends on primitive
webinar identity/timestamp fields, and the refresh boundary includes the slug.
A genuine promoted-webinar change remounts the section, while a stale refresh
of the same webinar preserves the 301-second retry and final collection
refresh. The server-computed display state now also seeds the client section,
so a multi-day event renders `Happening now` in the initial HTML instead of
briefly showing an upcoming placeholder until hydration.

## Sanity CMS — Phase 3 implementation (2026-07-12)

Implemented the one-shot Phase 3 delivery: narrowed CMS boundary (organisational
content only), singleton safeguards, `app/(site)/` route-group isolation,
public/legal/settings wiring, and the Phase 3 migration.

Follow-up review on 2026-07-13 narrowed the final boundary further: removed
Academy, Community, and Partners marketing page singletons; restored About hero
copy, Home hero art direction, and office hours to code; retained Home service
and value-chain content, About Story/MVO, Site Settings contact channels, and
four legal documents. Removed the incomplete, unused `CmsImage` wrapper rather
than adding a second image abstraction; CMS images continue through the
existing `next/image` configuration. The development dataset may still contain
the three retired page documents until an explicitly approved cleanup; Studio
and runtime no longer expose or read them. Static archival still waits for
production cutover. Verification after the correction: Phase 3 offline plan
creates seven documents; authenticated development dry-run reports seven
`MATCH`, zero `DIFF`; lint, typecheck, build, and `git diff --check` pass.
Studio navigation was then capped at two levels: Academy groups Articles,
Webinars & Events, Courses, and Authors; Team & Advisors groups Team, Advisors,
and the combined roster. Member Stories remains a separate root collection
because its structured case-study model is distinct from both people records
and testimonials. Existing filtered create templates and document data are
unchanged.

Post-commit cleanup removed the redundant `SiteChrome`, `SiteHeader`, and
`SiteFooter` layers. The `(site)` layout now fetches Site Settings once and
renders Header/Footer directly; `/admin` remains isolated by the route group.
The Studio desk also gained explicit stable IDs for every custom group and
filtered list so future label changes do not invalidate pane routes. The
reported `Pane returned no child` error is consistent with a browser URL
retaining a pre-reorganisation auto-generated pane ID (`Trust & Content` or
`Team Members`); returning once to `/admin` clears that already-stale route.
The same audit removed four provably orphaned files: the old shared Apply
Banner duplicate (the active component is Community-owned), the pre-redesign
Academy date-block card, the unused About roster empty state, and an unused
Sanity guard scaffold. Intentionally dormant impact-stat code remains because
the approved route specs reserve it for future verified metrics.
An independent import-graph pass then removed the unused Tooltip primitive and
two definition-only Academy search exports. It found no orphaned Phase 3
schema, fetch, or query module. Contributor guidance in `AGENTS.md`,
`CLAUDE.md`, `README.md`, and `docs/mvp-phases.md` was brought forward from its
pre-CMS milestone language so future agents follow the committed route-group
and Sanity boundaries.
The Studio group containing Home and About was relabelled from `Pages` to
`Page Content`, clarifying that editors change approved fields inside existing
pages rather than create routes or control page layouts. Its stable `pages` ID
is unchanged.

## Sanity CMS — Phase 3 one-shot scope proposal (2026-07-12)

Added `docs/sanity-phase3-spec.md` as the approval gate for the final CMS code
phase. Phase 3 will ship as one implementation/review delivery, not 3A/3B/3C.
Legal content is mandatory; shared public contact settings and five page
singletons are included, but the exact page-copy fields remain pending Nabeel's
approval. The proposal deliberately keeps route targets, forms, layout counts,
motion, and Academy featured-event/hero-link selection behaviour in code.

Locked archival direction: after development QA, client approval, production
migration, and production cutover, split migrated copy from still-active
structural data and move only the dead snapshots to `content/_archived/`.
Do not move whole files such as `content/about.ts` while journey/motion or other
runtime-owned exports remain active. Updated the CMS master plan, client
summary, status board, and docs index to match. Documentation-only; no runtime
verification required beyond formatting and `git diff --check`.

### Phase 3 scope approval follow-up

Nabeel approved the fixed-slot editorial model: editors may change card titles,
descriptions, and images where the existing component already has an image
slot; engineering keeps card count/order, icons, tones, destinations, and layout
locked. Updated the Phase 3 approval table accordingly.

Home What We Do and About Story currently show static poster images with a
non-interactive play symbol. Phase 3 will make the posters editable but will not
invent an unused video field or player contract. Real video behaviour remains a
separate feature after an approved video, hosting source, captions/transcript,
and loading/consent behaviour exist. Other approved image slots are seeded into
development for client replacement; layout-bound placeholders such as About
journey imagery remain code-owned.

## Sanity CMS — Phase 2 slice 2C: people (team, advisors, member stories) (2026-07-12)

Last Phase 2 slice. Added `teamMember` (`sanity/schemaTypes/documents/team-member.ts`)
and `memberStory` (`.../member-story.ts`). Registered in
`sanity/schemaTypes/index.ts`, added to the Studio desk (`sanity/structure.ts`):
Team Members gets filtered Team/Advisors/All sub-lists (mirrors
Testimonials/FAQs — a person's `group` genuinely changes which page
section they land in), Member Stories is a flat top-level item (mirrors
Partners — one list, one destination). Two new initial-value templates
(`team-member-team`, `team-member-advisor`) prefill `group`; the
auto-generated generic `teamMember` template is hidden from the global
Create menu via `DEFAULT_TEMPLATE_IDS_TO_HIDE` (the two named ones stay
visible — this is the opposite of what an earlier plan draft said, caught
in review before implementation).

**Corrected during planning, before implementation** (this slice's plan
went through one review round, same discipline as 2A/2B):

- `AboutPerson.id` is only ever a React list key, never routed or looked
  up — no `slug` field on `teamMember`, unlike `partner.slug`. `memberStory`
  likewise has no public slug; its later-added `MemberStoryItem.id` is an
  internal React key projected from Sanity's `_id`.
- `photo` has no required `alt` subfield — every person photo always
  renders with a visible name label right next to it (card and dialog
  both show the name), unlike Partner's logo being the only visual.
- `/about` fetches team + advisors with **one** query
  (`teamMembersQuery`), split by `group` in JS
  (`lib/sanity/fetch/team-members.ts`'s `fetchTeamMembers()` returns
  `{team, advisors}`) — not two separate requests. Same
  request-consolidation lesson as 2B's partner marquee/voices split.
- `AboutPerson.order` stays a required `number` on the type; the Sanity
  field is optional, normalized via `order: raw.order ?? 9999` at fetch
  time (matches the GROQ sort's own `coalesce(order, 9999)` fallback so
  the two never disagree). `photo: resolveImageUrl(raw.photo) ?? ""` is a
  defensive fallback too — Studio's `Rule.required()` can be bypassed by a
  direct API write.
- `socials` isn't passed through unchecked: `lib/sanity/social-platforms.ts`
  (new, shared between the schema's `options.list`/`Rule.custom` and the
  fetch layer) defines the known 8 platforms and validates `value`'s
  format per platform (see the review-fix section below); `fetchTeamMembers()`
  drops any entry with an unrecognized `platform`, a blank `value`, or a
  malformed value — same reasoning as `faq.category` filtering in 2A.
- Member-story ids are name-derived (`memberStory.tunde`/`.ngozi`/`.kofi`/`.fatima`),
  not positional index — stable if the static array is ever reordered. No
  public slug field needed; `MemberStoryItem` gained a plain `id` field
  (see the review-fix section below) that both the migration script and
  the fetch layer reuse directly.
- `initialsFromName` (added in 2A for testimonials) is now shared —
  extracted to `lib/sanity/initials.ts`, used by both
  `lib/sanity/fetch/testimonials.ts` and the new
  `lib/sanity/fetch/member-stories.ts`.

Wired: `/about` (`app/about/page.tsx`, now `async` + `revalidate = 3600`,
both of which it was missing) — `TeamSection`/`AdvisorsSection` each hide
independently if their group is empty, no shared fallback between them.
`/community` (`app/community/page.tsx`, already `async` from 2A) —
`fetchMemberStories()` added to the existing `Promise.all`,
`MemberStoriesSection` hides if empty. `app/api/revalidate/route.ts`
gained `teamMember: ["/about"]` and `memberStory: ["/community"]` in
`STATIC_PATHS_BY_TYPE`, plus the webhook setup comment's documented
`_type in [...]` filter and type list updated to match.

**Repo-state note:** this slice was built on top of an already-uncommitted
repair (corrupted testimonial revision history, logged above) — that
diff was preserved untouched; `scripts/migrate-trust-content-to-sanity.ts`
was _extended_ with `migrateTeamMembers()`/`migrateMemberStories()`, not
rewritten.

### Review fixes applied after the initial 2C cutover

An authenticated live-dataset query surfaced two real migration defects
and two code-review findings after the first `--execute`:

- **[P1] Migrated `socials` array objects had no `_key`.** Sanity array
  objects need a `_key` unique within the array; the migration wasn't
  setting one. Fixed the migration to derive each key from the platform and
  array index (for example, `linkedin-0`), then **repaired the three
  already-created documents** (Aisha Waziri Umar, Sidi-Aliyu, and Usman
  Dagona) via a one-off patch script. `createIfNotExists` skips existing
  documents and therefore could not repair them on a future migration run.
  An authenticated query confirmed that all four social entries across those
  three documents now carry a non-null `_key`.
- **[P1] `memberStory.order` was seeded 0-based, violating the schema's
  own `Rule.integer().min(1)`.** `memberStory.tunde` had `order: 0` live.
  Fixed the migration to `order: index + 1`, then patched the 4 existing
  `memberStory` docs from `0–3` to `1–4`.
- **[P2] `MemberStoriesSection` keyed cards by `story.name`.** Names
  aren't unique. Added a required `id` field to `MemberStoryItem`
  (`types/community.ts`), backfilled matching ids on the 4 static
  placeholder entries in `content/community.ts` (`"tunde"`, `"ngozi"`,
  `"kofi"`, `"fatima"` — the same values the migration already derived),
  projected `"id": _id` in `memberStoriesQuery`, and switched the
  component to `key={story.id}`. The migration script now reuses
  `item.id` directly instead of re-deriving a slug from `item.name`.
- **[P2] Social `value` was authored-but-unvalidated.** The schema's help
  text asked for a full `https://` URL but only checked the field was
  non-empty — `linkedin.com/person` (no scheme) would pass Studio
  validation and then render through `next/link`'s `<Link>` as a
  same-origin path instead of an external link. Added
  `isValidSocialValue()` (`lib/sanity/social-platforms.ts`, shared): full
  `http(s)://` URL for link platforms, a plausible email format for
  `email`, a plausible phone format for `phone`. Wired into both the
  schema's `Rule.custom` (authoring-time) and `fetchTeamMembers()`'s
  `normalizeSocials` (defensive, in case a doc is written outside Studio).

Re-verified after all four fixes: reran the migration script (dry-run →
`--offline` → non-offline dry-run, all 53 docs correctly `SKIP`, 0 new
creates, confirming create-only idempotency);
`pnpm format`/`lint`/`typecheck`/`build` and `git diff --check` all pass;
`/about` and `/community` still render the same real content (including
the repaired LinkedIn/email/phone links) via `curl`+grep against the dev
server.

**Final review follow-up:** the create-only dry-run checks document existence,
not field equality. A separate authenticated comparison found that Mustapha
Yakubu and Wilson Agaba's live `order` values had been swapped during QA even
though the static migration source remained Mustapha `3`, Wilson `2`. Patched
the development documents back to those source values and verified the live
team ordering. External social validation now parses link values as real URLs
and requires an HTTP(S) protocol plus a non-empty hostname; a scheme-only value
such as `https://` no longer passes.

**Verification (initial cutover):** migration script dry-run → `--offline`
→ `--execute` against `development` (9 team members + 4 member stories
created, 0 errors; all other docs correctly `SKIP`ped, untouched).
Confirmed directly against Sanity (with a read/write token — the
`development` dataset is private, unauthenticated reads silently return
`[]`) that every team photo uploaded with the correct `.webp` extension
and real dimensions, `group`/`order`/`socials`/`credentials` all match the
static source. `pnpm format`/`lint`/`typecheck`/`build` all pass; `/about`
and `/community` render real Sanity-sourced content (verified via
`curl`+grep against the dev server, including bio paragraphs, credentials,
and social links reaching the client). Toggled `teamMember.mustapha-yakubu`'s
`group` from `team` to `advisor` and back via a direct field patch (not
delete-and-recreate — see the retired-id lesson below) — team/advisor
counts moved from 6/3 to 5/4 and back correctly.
`docs/cms-migration-spec.md`'s `teamMember`/`memberStory` model tables
corrected (were stale: claimed a required slug, required photo alt,
required `memberStory.initials`, and a two-query `/about` fetch — all four
wrong per the corrections above). `docs/routes/about-spec.md` and
`docs/routes/community-spec.md` updated to note the CMS cutover.

## Fix: corrupted Studio revision history on 3 testimonial docs (2026-07-12)

Studio console error: `Invalid revision id: invalid ID "deleted-2026-07-12T01:30:40Z": contains invalid characters`. Root cause: earlier QA
for the Voices-section independence fix deleted and recreated
`testimonial.partners-voices.{0,1,2}` **under the same ids** (to simulate an
empty testimonial pool), which leaves a "delete" transaction in that
specific id's history. Sanity's document history is immutable — no public
API can remove a past transaction — and Studio's own timeline UI fails its
own ID-pattern validation when it builds a synthetic
`deleted-<ISO timestamp>` label to represent that delete event (the
timestamp's colons aren't valid ID characters).

Fix: recreated all 3 testimonials' exact content (quote/name/role/order)
under fresh, Sanity-assigned ids via `client.create()` (no explicit `_id`,
so history starts clean), then permanently deleted the 3 poisoned ids.
Content, order, and rendering on `/partners` confirmed unchanged before and
after. Added `RETIRED_TESTIMONIAL_IDS` to
`scripts/migrate-trust-content-to-sanity.ts` so a future re-run of
`pnpm migrate:trust-content` explicitly skips those 3 retired ids instead of
recreating them (which would otherwise reintroduce the exact same corrupted
history the moment `createIfNotExists` found the id missing).

**Lesson for future QA**: never delete-and-recreate a document under a
reused id to simulate an empty state — move it to `drafts.<id>` and back
(or just patch a boolean/filter field, as used for the Partner visibility
toggles) so the published id's history never contains a delete event at
all. Re-verified `pnpm format`/`lint`/`typecheck`/`build`, `git diff
--check`, and a full dry-run of the migration script (all 3 retired ids
report `SKIP ... (retired)`, zero attempts to recreate them).

## Partners CMS — editor UX and Spotlight removal (2026-07-12)

Simplified the Studio root so editors see Partners, Testimonials, and FAQs
directly instead of opening the internal-sounding "Trust & Content" group.
Testimonials and FAQs keep their useful page-specific sub-lists and templates;
Partners stays a single catalogue because its Home-marquee and Partners-grid
toggles are independent properties of the same record.

Made the Partner form self-explanatory: Partner name now comes before the slug;
the slug explains Generate and its internal purpose; Website and Display order
are explicitly labelled optional; logo alt, both visibility toggles, and order
have plain-language help. A blank order is valid and intentionally places the
partner after numbered partners, then alphabetically by name. The fetch query's
fallback ordering was corrected to match that contract.

Removed the Partner Spotlight route render, client components, static content,
and types per the client's latest direction. The existing Partner catalogue
continues to drive the Home marquee and the code-owned Voices logo grid; adding
a partner requires no grid-slot editing. Preserved the 2B review fix allowing
the Voices band to render correctly with quotes only, logos only, or both.

Verification: `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm build`, and
`git diff --check` pass. Local Studio browser QA was attempted, but the in-app
browser could not reach the already-running localhost server; the production
build still compiled the updated Studio structure and schema successfully.

## Turnstile UX simplification implementation (2026-07-12)

Reviewed all seven public form surfaces plus the shared Turnstile client/server
path before changing production code. The existing submit lock, server
verification, honeypot, rate limiting, and automatic token refresh remain the
baseline. Implemented the smaller three-state UX: normal verification is
invisible, Cloudflare owns any required challenge, and one compact recovery
message appears only when verification genuinely fails.

Removed the always-visible Cloudflare helper paragraph and the redundant
`turnstileTokenName` / `onTurnstileRetry` props from all seven form surfaces.
The shared widget now handles script load, challenge, timeout, and unsupported
browser failures with one message, one direct reset, and the existing email
fallback. Cloudflare's automatic retry/expiry refresh remains enabled.

Added an 8-second Siteverify timeout. Network, timeout, and upstream failures now
return the verification-unavailable `503` response instead of telling the user
to complete verification again; missing/invalid tokens still return `400`.
Kept durable submission idempotency separate from this small UX cleanup so the
form layer is not broadly rewritten without production evidence.

The production cutover doc still records the separate delivery limitation: a
successful Resend send followed by a lost browser response can be retried as a
second delivery.

Verification: `pnpm format`, `pnpm lint`, `pnpm typecheck`, and `pnpm build` all
pass; `git diff --check` is clean.

## Sanity CMS — Phase 2 slice 2B: partners (2026-07-12)

Second Phase 2 slice. Added `partner` (`sanity/schemaTypes/documents/partner.ts`):
`slug` (stable public id — never Sanity's internal `_id`), `name`, `logo`
(required image, required `alt`), `website`, and two independent booleans,
`showInMarquee`/`showInVoices` (both default `true`). Registered in
`sanity/schemaTypes/index.ts` and the Studio desk's Trust & Content group as
a plain list — no filtered sub-lists needed, since (unlike 2A's
testimonials/FAQs) there's only one creation path, not several
placement/page destinations.

**Corrected during planning, before implementation:** the first plan draft
assumed every partner shows on both the Home marquee and the Partners-page
voices logo grid — wrong. `showInMarquee`/`showInVoices` are independent per
partner, so an editor can pull a logo from one surface without touching the
other or deleting the partner record. `fetchPartners()`
(`lib/sanity/fetch/partners.ts`) runs one GROQ query and splits the result
into `{ marquee, voices }` pools rather than two separate requests. The
`Partner` type moved from `content/partners.ts` to `types/partners.ts`
(repo convention: `types/` owns contracts, `content/` owns data) and gained
`logoAlt?: string`; `PartnerLogo` now renders `alt={partner.logoAlt ?? partner.name}`.

**Real blocker caught during planning, before `--execute`:** every existing
partner logo is a local `/images/partners/*.{webp,png}` path — unlike every
image migrated so far (`lib/placeholder-images.ts` is 100% remote Unsplash
URLs). `scripts/migrate-trust-content-to-sanity.ts`'s asset resolver only
ever did `fetch(url)` and hardcoded the uploaded filename extension to
`.jpg` regardless of source. Fixed: local paths (`/...`) now read via
`node:fs/promises`' `readFile` from `public/<path>`, remote paths still use
`fetch`; `filenameForUrl` extracts the real extension; a local-file
existence check runs unconditionally (including in `--offline`/dry-run, not
just `--execute`) and throws — caught by the calling `migratePartners`'s
per-item try/catch, same isolation as every other migrate function.

Wired: `/` (Home marquee, hidden if `marquee` is empty),
`/partners` (`VoicesSection` — Partners-page voices logo grid, hidden if
`voices` is empty). No marquee added to `/partners` itself (that route
deliberately has none, confirmed during planning). `VoicesSection`'s
previously-fixed two-column layout now degrades to a centered
single-column layout when the logo pool is empty, instead of leaving a
blank grid column next to the quote carousel.

`app/api/revalidate/route.ts` gained a `partner` entry in
`STATIC_PATHS_BY_TYPE` (`["/", "/partners"]`) — no detail-path entry, since
`partner`'s `slug` is an internal stable id, not a public route.

**Verification:** ran the migration script dry-run → `--offline` (correctly
found and reported all 6 local logo files, extensions preserved) →
`--execute` against `development` (6/6 created, 0 errors) before wiring the
routes. Confirmed directly against Sanity (with a read token — see the
`lib/sanity/client.ts` note about the `development` dataset being private
and silently returning empty results for unauthenticated queries, which
produced a false-negative on the first verification attempt here) that all
6 assets uploaded with correct `.webp`/`.png` extensions and real
dimensions. `pnpm format`/`lint`/`typecheck`/`build` all pass. Manual QA by
toggling `showInMarquee`/`showInVoices` directly via the Sanity client
(faster and more reliable than clicking through Studio for this many
combinations) confirmed all three cases independently: marquee-only,
voices-only, hidden-from-both; also confirmed the empty-voices-pool
single-column layout renders correctly (quotes still show, no blank grid
column) by temporarily setting every partner's `showInVoices` to `false`,
then restored all values to their seeded defaults afterward.

## Sanity CMS — Phase 2 slice 2A: testimonials + FAQs (2026-07-11)

First Phase 2 slice ("trust & people" content). Added `testimonial` and
`faq` document types (`sanity/schemaTypes/documents/`), registered in
`sanity/schemaTypes/index.ts`. `testimonial` is tagged by `placement`
(`home` | `academy` | `partners-voices`) since the static copy across those
three surfaces is similar wording, not identical documents. `faq.category`
uses a controlled `options.list` (8 known values spanning every page's
tabs), not free text — a typo'd category would silently drop an item from
its tab filter. Both types sort via `order(coalesce(order, 9999) asc,
_createdAt asc)` so a doc without an explicit `order` doesn't land
ambiguously.

New fetch functions: `fetchTestimonials(placement)`
(`lib/sanity/fetch/testimonials.ts`) and `fetchFaqs(page)`
(`lib/sanity/fetch/faqs.ts` — the latter also defensively filters any doc
whose `category` isn't in the known set, in case something bypasses Studio's
list validation).

**No runtime static fallback** — this is a deliberate change from Phase 1's
pattern. If a fetch returns `[]`, the section hides
(`items.length > 0 ? <Section /> : null`) rather than falling back to the
old static array. A `cmsItems.length ? cmsItems : staticItems` fallback
would mean a deliberate delete-everything in Studio could never actually
empty a section — wrong permanently, not just during rollout. This makes
migration-before-deploy a hard requirement: `scripts/migrate-trust-content-to-sanity.ts
--execute` against `development` must run and be verified before these route
changes ship, or a route briefly renders a hidden section against an empty
collection. (This run already happened this session — see verification
below.)

Wired: `/` (testimonials + FAQs), `/academy` hub (testimonials + FAQs),
`/community` (FAQs), `/partners` (FAQs + `VoicesSection`, which gained a
required `voices` prop instead of reading `partnersPageContent` internally),
`/contact` (FAQs — reuses the `"home"` placement's fetch, mirroring how
`content/contact.ts` already reused `homeContent.faqs` before this cutover).
All five routes are `async` with `revalidate = 3600`. `app/api/revalidate/route.ts`
gained `testimonial` and `faq` entries in `STATIC_PATHS_BY_TYPE` (neither has
a public detail route, so no slug-prefix entry needed).

New script: `scripts/migrate-trust-content-to-sanity.ts` (`pnpm migrate:trust-content`),
mirroring `scripts/migrate-academy-to-sanity.ts`'s dry-run/`--offline`/`--execute`/
dev-dataset-only guard shape. Seeds 34 docs total: 6 home testimonials, 3
academy testimonials, 3 partner voice quotes, 5 home FAQs, 6 academy FAQs, 5
community FAQs, 6 partners FAQs.

**Verification:** ran the migration script dry-run → `--offline` →
`--execute` against `development` (34/34 created, 0 errors) before wiring
the routes, per the plan's required run order. `pnpm format`/`lint`/`typecheck`/`build`
all pass. Manual dev-server QA confirmed real Sanity-seeded copy renders on
all five routes (including the deliberately-reworded Academy testimonial
text, which differs slightly from Home's, proving it's not a stale-static
false positive). Confirmed the hide-if-empty path directly at the query
layer: `testimonialsByPlacementQuery`/`faqsByPageQuery` against a
nonexistent placement/page both return `[]`.

**Out of scope this slice** (separate plan → implement → review cycles):
2B (partner schema + Home marquee + Partners marquee/voices-logo-grid), 2C
(teamMember + memberStory + About/Community wiring). Static array archival,
production dataset migration, and production webhook/env setup remain
deferred until all of Phase 2 ships and passes combined staging QA + client
sign-off.

### Review fixes applied after the initial 2A cutover

- **[P1] Studio desk was missing both new types** — `sanity/structure.ts`'s
  custom desk resolver only listed the Phase 1 Academy types, so
  `testimonial`/`faq` (schemas registered, docs seeded) weren't reachable
  from `/admin` navigation. Added a "Trust & Content" group listing both.
- **[P2] FAQ category validation wasn't page-specific** — the global
  `options.list` blocked unknown strings but still allowed a category valid
  on the _wrong_ page (e.g. `Partnership` tagged `page: "academy"`), which
  would only ever surface under the "All" tab. Added
  `lib/sanity/faq-categories.ts` as the single source of truth for
  per-page allowed categories; the schema's `category` field now has a
  `Rule.custom` validator checking the sibling `page` value, and
  `fetchFaqs` filters against the same per-page map instead of the flat
  global list.
- **[P2] Testimonials with neither `image` nor `initials` would render an
  empty avatar** — `normalizeTestimonial` now derives initials from `name`
  (first + last word) when Studio's `initials` field is blank, while still
  preferring an editor-supplied value.
- **Doc correction** — `app/api/revalidate/route.ts`'s setup comment
  described one Sanity webhook per `_type`; corrected to one combined
  webhook per dataset (`development`, later `production`), filtered on
  `_type in [...]` across every revalidatable type, with a `before()`-based
  projection for old-slug revalidation.

Re-verified after these fixes: `pnpm format`/`lint`/`typecheck`/`build` all
pass; `git diff --check` clean; re-ran `pnpm migrate:trust-content` (no `--execute`
flags) and confirmed all 34 previously-seeded docs report `SKIP` (idempotent,
0 errors) rather than re-creating; confirmed every already-seeded FAQ's
category matches its page under the new per-page map (no data drift to fix).

### Studio desk organization — filtered lists + initial-value templates

Second follow-up round, purely Studio editorial UX — no schema, fetch,
route, or migration-data changes. The flat "Testimonials"/"FAQs" desk
entries from the P1 fix above worked but put an unfiltered, un-prefilled
list in front of editors; this replaces them with filtered sub-lists so
creating from the right place tags the document correctly by construction.

- **`sanity/templates.ts`** (new) — 7 initial-value `Template`s (3
  testimonial placements + 4 FAQ pages), each just prefilling `placement`
  or `page`. Registered via `templates: (prev) => [...prev, ...phase2Templates]`
  in `sanity.config.ts`.
- **`sanity/structure.ts`** — Trust & Content now nests Testimonials (Home /
  Academy / Partner Voices / All testimonials) and FAQs (Home & Contact /
  Academy / Community / Partners / All FAQs). Each named sub-list is a
  `documentList` filtered with a parameterized GROQ filter
  (`placement == $placement` / `page == $page` via `.params()`, not string
  interpolation) and scoped to its one matching `initialValueTemplates`
  entry. The two "All" lists pass `.initialValueTemplates([])` — an empty
  array removes the pane's create button entirely (verified against the
  Sanity Structure Builder source), so editors are steered to create from
  the correctly-labelled destination instead of an untagged document.
- **Schema previews** — `testimonial`'s preview subtitle is now
  `"<placement label> · <role>"`, `faq`'s is `"<page label> · <category>"`,
  both via `prepare()` (a plain `select` can't combine two fields into one
  subtitle string). `faq`'s `page: "home"` option is relabeled "Home &
  Contact" in the Studio UI only (`value` unchanged) since Contact reuses
  Home's FAQ collection. `testimonial`'s `placement` options renamed to
  match the desk list titles exactly (`Academy hub` → `Academy`,
  `Partners voices` → `Partner Voices`). `page`/`placement` remain editable
  fields — an editor can still deliberately move a document between
  surfaces; the destination list only affects what's prefilled on
  _creation_.

**Verification:** `pnpm format`/`lint`/`typecheck`/`build` all pass (the
`Template[]` type needed an explicit annotation on `sanity.config.ts`'s
`templates` resolver — otherwise `prev` typechecked as implicit `any`).
Since Studio is a client-rendered SPA, confirmed the new desk structure and
templates actually reached the served bundle by grepping the dev build
output on disk for `"Partner Voices"`, `"testimonial-home"`, and
`"Home & Contact"` — all three present in the compiled `/admin` chunk.

#### Fix: templates never actually registered + missing `apiVersion`

Live testing in Studio surfaced two console errors typecheck/build didn't
catch (Structure Builder resolves panes lazily, at browser runtime, once an
editor actually opens one):

- `Pane resolution error ... template id ('templateId') is required for
initial value template item nodes` — `templates: (prev) => [...]` had
  been placed at the **top level** of `defineConfig({...})`. Traced the
  actual failure through Sanity's own source
  (`InitialValueTemplateItemBuilder.serialize()` in
  `packages/sanity/src/structure/structureBuilder/InitialValueTemplateItem.ts`,
  and `propertyName: 'schema.templates'` in
  `packages/sanity/src/core/config/prepareConfig.tsx`): Studio only ever
  resolves custom templates from **`schema.templates`**. The top-level key
  wasn't rejected by the config type (no build/typecheck error) — it was
  silently ignored, so `context.templates` never contained our 7 custom
  entries and every `S.initialValueTemplateItem(id)` lookup failed. Fixed by
  moving `templates` inside `schema: {...}` in `sanity.config.ts`.
- `No apiVersion specified for document type list with custom filter` —
  added `.apiVersion(apiVersion)` (from `sanity/env.ts`, already the single
  source of truth for API version elsewhere in the app) to every
  `documentList` in `sanity/structure.ts` that has a custom `.filter()`.

Re-verified: `pnpm format`/`lint`/`typecheck`/`build` all pass; confirmed via
the Sanity monorepo source (fetched directly, not assumed) that
`schema.templates` is the correct, actually-read property path before
applying the fix, rather than guessing a second time.

#### Polish: hide the two generic default templates from global Create

`schema.templates` only ever _adds_ the 7 named templates — Sanity's
auto-generated default template per document type (id equal to the schema
type name) was still present, so the global "+" Create menu offered a
generic "Testimonial"/"FAQ" alongside the 7 destination-specific ones. That
generic option doesn't set `placement`/`page`, undermining the guided
workflow (not a blocker — required validation still stops it from
publishing unclassified — but ambiguous). Added
`DEFAULT_TEMPLATE_IDS_TO_HIDE = ["testimonial", "faq"]` to
`sanity/templates.ts` and filtered them out via `document.newDocumentOptions`
in `sanity.config.ts`. Every other document type's default template (and all
7 named Phase 2 templates) is untouched.

## Sanity CMS — Academy surfaces slice: hub + home + search + sitemap (2026-07-11)

Combined the four remaining Phase 1 Academy surfaces into one slice (per
discussion — hub/home share fetch-layer infrastructure, search/sitemap are
small isolated refactors, one review pass instead of four). All catalogue
surfaces now read from the same Sanity source — previously
`/academy/blog/[slug]` was live on Sanity while `/academy`, `/`, and
`/academy/search` still showed the old static catalogue, so the site could
show inconsistent content between surfaces.

**Confirmed stale scaffolding, rebuilt rather than wired as-is:**
`lib/sanity/fetch/academy-preview.ts` used raw `client.fetch()` (not the
guarded `sanityFetch()`), never passed `$today` to `hubScheduledWebinarsQuery`,
did no image resolution/slug flattening/category collapse. Rebuilt as a thin
composition (`fetchHomeAcademyPreview()`) on top of the already-tested
`fetchHubScheduledWebinars`/`fetchHubCourses` (webinars/courses tracks) and a
new `fetchHubArticles()` (articles track) — no new GROQ queries, only new
display-shape mapping.

**What changed:**

- `content/blog.ts` — exported `toHubArticleCategory()` (was module-private)
  so the fetch layer can reuse the spec-locked 8→3 category collapse instead
  of reimplementing it.
- `lib/sanity/fetch/articles.ts` — added `fetchHubArticles(limit)`, reusing
  `fetchArticlesListing()`.
- `lib/sanity/fetch/academy-preview.ts` — full rewrite (see above).
- `app/academy/page.tsx` — now `async`, `revalidate = 3600`. Fetches hub-scoped
  - full-listing (for count labels) webinars/courses/articles in parallel,
    plus the featured webinar. `countLabel` strings now computed from real
    counts instead of a hardcoded static string (strictly more correct — the
    old version always claimed "4 highlighted" regardless of actual data).
    `content/academy.ts` untouched structurally — the page just stopped
    reading its now-superseded `.items`/`.countLabel`/`.total`/`.featuredEvent`
    fields, still reads `.eyebrow`/`.title`/`.viewMoreLabel`/`.emptyState` and
    destructures the copy-only subset of `.featuredEvent` (`eyebrow`,
    `sectionTitle`, `category`, `registerLabel`).
- `components/academy/hub/featured-event-section.tsx` — now takes
  `featured`/`webinar` props instead of reading static content internally;
  hidden entirely if the featured-webinar coalesce query returns null (Rule 4).
- `app/page.tsx` — now `async`, `revalidate = 3600`, calls
  `fetchHomeAcademyPreview()` once, merges with the still-static
  `opportunities`/`spotlightEmptyState` from `content/academy.ts`.
- `components/home/academy-spotlight-section.tsx` — takes `spotlight`/
  `spotlightEmptyState` props instead of a static import.
- `components/home/featured-articles-section.tsx` — takes an `articles`
  prop; also added a missing empty-state guard (`if (articles.length === 0)
return null`) — it had none before, would have rendered an empty grid.
- `components/home/what-we-do-section.tsx` — **not touched**, per explicit
  direction (`opportunities` stays code-owned).
- `lib/academy-search.ts` — `searchAcademy()` now takes catalogues as a
  parameter instead of importing `content/*` directly; matching logic
  unchanged.
- `components/academy/search/academy-search-results.tsx` — now `async`,
  fetches the three catalogues only when there's an actual query (skips the
  fetch entirely on a bare `/academy/search` page load).
- `app/sitemap.ts` — now `async`, `revalidate = 3600`, reads slugs from the
  Sanity fetch functions instead of static content.

**Verification:** `pnpm format`/`lint`/`typecheck`/`build` all pass. Manual
QA in dev confirmed: hub's featured event matches the webinars listing's
featured webinar; hub bands (4 webinars / 3 courses / 3 articles) correctly
exclude past webinars via the same `$today` UTC-date comparison fixed
during the webinars-track review; Home's spotlight "upcoming" tab and
featured articles match the hub bands exactly (the actual cross-surface
consistency this slice was for); Home's "training" tab data was verified via
the client hydration payload rather than raw HTML, since Radix Tabs doesn't
mount inactive tab panels into static HTML — a curl-based check alone would
have been a false negative here, not a real gap; search correctly matches
across all three catalogues (verified with a real query hitting an article,
a course, and content mentioning "trade"); sitemap contains 20 CMS-derived
detail URLs (10 articles + 7 webinars + 3 courses), matching the seeded
dataset, alongside the static base/listing routes (33 URLs total).

**Still deferred:** archiving/deleting static catalogue arrays in
`content/*.ts` (kept for rollback + page chrome — separate step after this
slice is QA'd on staging), production dataset migration, Vercel env vars,
Sanity dashboard webhook configuration (all manual, external steps), Phase 2
(testimonials, partners, team, FAQs, member stories).

**Review fixes applied after the initial cutover:**

1. **CMS image alt text was being discarded** — `AcademyCourse`/`AcademyArticle`
   (the reduced hub/home display types) had no `imageAlt` field at all, so
   Studio's required editorial alt text for course and article images never
   reached `ContentCard`, which defaulted to an empty `alt`. Added
   `imageAlt?: string` to both types, populated it in
   `fetchHubCourses`/`fetchHubArticles`/`normalizeCourse`, and wired it
   through `academy-preview.ts`'s card mappers, `academy-spotlight-section.tsx`,
   `featured-articles-section.tsx`, and all three hub bands in
   `app/academy/page.tsx`. Webinars already carried `imageAlt` at the fetch
   layer — only the consumption sites were missing it.
2. **Sitemap fetched full documents just for slugs** — `app/sitemap.ts` was
   calling `fetchArticlesListing`/`fetchWebinarsListing`/`fetchCoursesListing`,
   which normalize complete documents (Portable Text, image resolution,
   author dereference) the sitemap never uses. Switched webinars/courses to
   the existing bare-slug fetchers (`fetchWebinarSlugs`/`fetchCourseSlugs`)
   and added a narrow `fetchArticleSitemapEntries()` (new
   `articleSitemapEntriesQuery`, just `slug` + `publishedAt`) for articles,
   which need per-item `lastModified`.
3. **Hub page made redundant/duplicate Sanity requests** — it called
   `fetchHubArticles()` (which internally re-fetches the full article
   listing) _and_ `fetchArticlesListing()` again separately for the
   total-count label — an exact duplicate request. Courses/webinars had the
   same pattern (a hub-scoped query plus a separate full-listing query).
   Refactored the hub page to fetch each full listing once and derive both
   the hub band (filter/slice in JS, reusing `isUpcomingSession` from
   `lib/academy-registration.ts` for webinars and the exported
   `articleToHubShape` mapper for articles) and the total count from that
   single result — down from 7 Sanity requests to 4. `fetchHubScheduledWebinars`/
   `fetchHubCourses` are unchanged and still used by Home's
   `fetchHomeAcademyPreview()`, which has no separate full-listing fetch to
   derive from.

Re-verified after these fixes: `pnpm format`/`lint`/`typecheck`/`build` all
pass; real editorial alt text (course/article titles used as alt where no
dedicated alt differs) now appears in the hub page's rendered HTML; hub
count labels are unchanged (`4 highlighted · 7 in the full catalogue`, etc.)
confirming the request consolidation didn't change behavior; sitemap still
has 20 CMS-derived URLs.

## Footer verification contrast polish (2026-07-10)

Added a dark-surface tone to the shared Turnstile security UI and applied it
to the footer newsletter. Error, retry, fallback-email, privacy, and terms
states now retain accessible contrast against the forest footer without
duplicating the shared verification behavior used by light form surfaces.

- Files: `components/shared/turnstile-widget.tsx`,
  `components/shared/public-form-security-fields.tsx`,
  `components/shared/newsletter-signup-form.tsx`
- Verification: `pnpm exec prettier --write` (pass), `git diff --check`
  (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)

## Registration resolver: `external` mode fix (2026-07-09)

Review found `resolveAcademySession` treated any non-`closed` registration
mode as open — but per `docs/sanity-academy-spec.md`, `mode: "external"`
means "UI links out; API not used." Also found the actual client bug this
was guarding against: `components/academy/registration/academy-registration-action.tsx`
only rendered the external "View recording"-style link when
`registration.mode === "external" && registration.url` — if an editor picked
External without setting a URL, that condition was false and the component
fell through to the **internal** register button, which would have POSTed
to `/api/academy/register` for a session that's supposed to be managed
elsewhere.

**Fixed:**

- `resolveAcademySession` (`lib/email/academy-registration.ts`) now returns
  a third `"external"` status alongside `"closed"`/`"open"`/`"not_found"`.
- `app/api/academy/register/route.ts` throws `"registration_external"` for
  it, mapped in `lib/api/public-form-post.ts` to the same
  `{error: PUBLIC_FORM_VALIDATION_ERROR}`/400 response as `closed`/`not_found`
  — no new client-visible error string, per direction. Refactored the
  matching condition into a `VALIDATION_ERROR_MESSAGES` Set now that there
  are three internal messages mapping to one client response.
- `sanity/schemaTypes/objects/registration-config.ts` — `url` now has
  `Rule.custom` requiring a value when `mode === "external"`, closing the
  authoring gap at the source.
- `components/academy/registration/academy-registration-action.tsx` — the
  `external` branch now fails closed: if `registration.url` is missing, it
  renders a plain "Registration for this session is managed externally."
  message instead of falling through to the internal register button. This
  is defense-in-depth alongside the Studio validation above — old/bad CMS
  data (published before the validation existed, or written outside Studio)
  can't silently trigger the internal registration flow either.

**Verification:** `pnpm format`/`lint`/`typecheck`/`build` all pass.
Temporarily patched a real seeded webinar
(`digital-tools-cooperative-management`) to `mode: "external"` via a
one-off script (bypassing the app's guarded client, same pattern as the
migration script), confirmed the API now correctly returns
`400 {error: PUBLIC_FORM_VALIDATION_ERROR}` for it, then reverted the
document back to `mode: "open"` and confirmed the revert via a direct
document fetch.

## Sanity CMS fetch-layer cutover — registration email resolver (2026-07-09)

Final Academy-specific piece after blog/webinars/courses: `/api/academy/register`
now resolves session title + registration status from Sanity instead of
static content. Narrow scope per direction — the Resend/email-template
pipeline, rate limiting, Turnstile, and `handlePublicFormPost`'s envelope are
untouched.

**Two real gaps fixed, not just the static→Sanity swap:**

- The old `resolveAcademySessionTitle` was called _twice_ per submission —
  once in the route to short-circuit on `session_not_found`, again inside
  `sendAcademyRegistrationEmails`. Harmless as a sync in-memory lookup;
  would've been two redundant Sanity fetches per registration. Consolidated
  to one resolve in the route (`resolveAcademySession`), with the title
  passed into `sendAcademyRegistrationEmails` as a plain input instead of
  being re-derived.
- There was no closed-session rejection anywhere in the code despite the
  spec calling for it — `handlePublicFormPost`'s catch block only
  special-cased `"session_not_found"`. Added a `"registration_closed"`
  branch mapping to the same client-facing `{error: PUBLIC_FORM_VALIDATION_ERROR}`/400
  shape (distinct internal `Error` message, same client response — no new
  client-visible error string, per spec).

`resolveAcademySession` reuses the already-tested
`resolveWebinarRegistration()`/`resolveCourseRegistration()` from
`lib/academy-registration.ts` (the same functions the UI already uses to
decide whether to show a register button) rather than re-implementing the
"closed, or open but the date already passed" rule server-side. Reuses
`fetchWebinarBySlug`/`fetchCourseBySlug` from the already-shipped fetch
layer — no new GROQ query needed.

**Verification:** `pnpm format`/`lint`/`typecheck`/`build` all pass. Manual
`curl` testing against a real dev server (temporarily blanked the Turnstile
env vars to hit the existing `NODE_ENV=development` bypass, restored
afterward) confirmed all three paths: an open future-dated webinar and an
"interest"-mode course both succeed; the seeded `scaling-smallholder-farms-with-data`
webinar (explicit `mode: "closed"`) and a nonexistent slug both correctly
return `400 {error: PUBLIC_FORM_VALIDATION_ERROR}`, not a 500. Also caught
the `post-harvest-handling-essentials` webinar organically auto-closing
during testing — its seeded date (2026-07-08) had passed relative to the
test date (2026-07-09), confirming the reused past-date-closes rule works
correctly server-side, not just in the UI.

This completes the Academy-specific Sanity cutover other than the
`/academy` hub page, `/academy/search`, and Home spotlight preview — still
static, still separate checkpoints. `content/webinars.ts`/`content/courses.ts`
untouched.

## Article read-time auto-calculation fix (2026-07-09)

`readTimeMinutes` was already falling back to a word-count estimate when a
Studio editor left the field blank, but two things were off: the extractor
in `lib/sanity/fetch/articles.ts` only counted words inside native `block`
(paragraph/heading/blockquote) entries, ignoring text in `callout`, `table`,
`codeBlock`, `bodyImage`, and `orderedStep` — every other block kind
`ArticleBody` actually renders. Replaced the single `_type === "block"`
filter with a small `blockText()` switch covering all six kinds, and
switched the final calculation from `Math.round` to `Math.ceil` (a partial
minute should round up, not down — a 3.2-minute article shouldn't display
as "3 min read"). Also added a Studio field description on
`readTimeMinutes` (`sanity/schemaTypes/documents/academy-article.ts`)
clarifying it's an optional override and auto-calculation is the default —
there was no description at all before.

Verified against the real seeded articles (including
`cold-chain-economics-for-fresh-produce`, which has a `table` block) that
read-time values render sensibly and nothing crashes. `pnpm format`/`lint`/
`typecheck`/`build` all pass.

## Sanity CMS fetch-layer cutover — courses track (2026-07-09)

Third public route cutover, same checkpoint discipline: only
`/academy/courses` + `/academy/courses/[slug]` moved to Sanity this pass.
Simplest track so far — no author, no date-based filtering (courses have no
`date` field), `resolveCourseRegistration()` is trivial (`registration ??
{mode: "interest"}`). `CoursesListingBody` confirmed to already do its own
client-side filter/sort on raw `AcademyCourseDetail[]`, same as webinars.

**Real gap found and fixed:** `coursesListingQuery`, `hubCoursesQuery`, and
`relatedCoursesQuery` had no `order()` clause — Sanity returns unordered
results without one. The static content's curriculum order (Foundations →
Financing → Market Access) doesn't map to any content field, but the
migration script created the three documents in that exact sequence, so
`order(_createdAt asc)` reproduces it (same field `featuredCourseQuery`
already used for its fallback). Also fixed `fetchHubCourses`'s return type —
it claimed the full `AcademyCourseDetail` shape but the hub band only ever
needs the reduced `AcademyCourse` projection.

**What changed:**

- `lib/sanity/queries.ts` — added `COURSE_PROJECTION`, `order(_createdAt asc)`
  on all three unordered queries (including `hubCoursesQuery`, not wired
  into a route yet — hub checkpoint).
- `lib/sanity/fetch/courses.ts` — rewritten to real projections via
  `sanityFetch()`; `fetchRelatedCourses` reuses the existing
  `courseToRelatedItem()` from `content/courses.ts`.
- `app/academy/courses/(listing)/page.tsx`, `[slug]/page.tsx` — now `async`,
  fetch from Sanity, `revalidate = 3600`. `content/courses.ts` untouched.
- `app/api/revalidate/route.ts` — added the `academyCourse` row.

**Verification:** `pnpm format`/`lint`/`typecheck`/`build` all pass; all 3
course slugs generate with `revalidate: 1h`, listing order confirmed correct
(Foundations → Financing → Market Access). Manually confirmed in dev: all 3
detail pages render, "interest" registration mode shows "Register interest"
CTA (all three seeded courses use `mode: "interest"`), related-courses band
on `foundations-of-agribusiness` correctly shows the other two.

**Registration email resolver is now unblocked** (needed both webinars and
courses done) — next checkpoint.

## Sanity CMS fetch-layer cutover — webinars track (2026-07-09)

Second public route cutover, same checkpoint discipline as blog: only
`/academy/webinars` + `/academy/webinars/[slug]` moved to Sanity this pass.
Courses, the `/academy` hub, search, Home spotlight, and the registration
email resolver are still fully static.

**Two things the spec suggested that turned out unnecessary, confirmed by
reading the actual components before writing any code:**

- No `dateLabel` compute-from-`date` helper — `webinar-registration-panel.tsx`
  already does `webinar.dateLabel ?? dateFormatter.format(new Date(webinar.date))`,
  so the fallback lives in the component and needs no fetch-layer duplicate.
- No card-shaping in the fetch layer — `WebinarsListingBody` is a client
  component that takes raw `AcademyWebinar[]` and does its own client-side
  filter/sort via the existing `webinarToCardItem()`. The fetch layer just
  returns the same shape the static content did.

**What changed:**

- `lib/sanity/queries.ts` — added `WEBINAR_PROJECTION` (flattens
  `slug.current` → `slug`; no author dereference needed) applied to all
  webinar queries including `hubScheduledWebinarsQuery` (fixed for
  correctness even though it's not wired into a route yet — that's the hub
  checkpoint).
- `lib/sanity/fetch/webinars.ts` — rewritten from raw scaffolding to real
  projections using the guarded `sanityFetch()`: image resolution,
  `body` passed through as-is (schema stores it as plain strings, no
  Portable Text for webinars), `fetchRelatedWebinars` reusing the existing
  `webinarToRelatedItem()` mapper from `content/webinars.ts`.
- `app/academy/webinars/(listing)/page.tsx`, `[slug]/page.tsx` — now
  `async`, fetch from Sanity, `revalidate = 3600`. `content/webinars.ts`
  itself untouched — still owns page chrome and is used internally by
  client components and the still-static hub/featured-event wrapper.
- `app/api/revalidate/route.ts` — added the `academyWebinar` row (refactored
  the old/new-slug branch into a small `DETAIL_PATH_PREFIX_BY_TYPE` lookup
  instead of duplicating the `if` block, since courses will add a third).

**Verification:** `pnpm format`/`lint`/`typecheck`/`build` all pass; all 7
seeded webinar slugs generate with `revalidate: 1h`. Manually confirmed in
dev: listing + featured band + all 7 detail pages render correctly; the
seeded `scaling-smallholder-farms-with-data` webinar
(`registration.mode: "closed"`) correctly shows "Session ended" instead of a
register button; related-sessions band on `post-harvest-handling-essentials`
correctly returns exactly 3 items, excluding the current slug and past dates.

**Two review findings patched before commit:**

- `hubScheduledWebinarsQuery`/`relatedWebinarsQuery` compared `date >= now()`.
  Since some seeded `date` values are date-only strings (no time component),
  a lexicographic string comparison against `now()`'s full timestamp
  excludes a same-day webinar the moment any time has passed today — it
  would only count as "upcoming" exactly at midnight. Fixed by passing a
  date-only `$today` (`YYYY-MM-DD`) param instead, matching
  `content/webinars.ts`'s `sessionDateKey`/`isUpcomingSession` exactly.
- `sanity/schemaTypes/documents/academy-webinar.ts`'s `dateLabel` field
  description said "computed from date in the fetch layer" — stale now that
  the fallback correctly lives in `WebinarRegistrationPanel` instead (see
  above). Reworded to describe the actual behavior.

**Next checkpoint:** courses track, queued separately.

## Sanity CMS fetch-layer cutover — blog track (2026-07-09)

First public route cutover from static `content/*.ts` to real Sanity fetches,
scoped deliberately to **blog only** per explicit review direction — webinars,
courses, the `/academy` hub, `/academy/search`, Home spotlight, and the
registration email resolver are still 100% static and untouched. Each of
those is its own follow-up checkpoint, not started yet.

**Constraint change (approved):** the foundation slice's "`pnpm build` must
pass with zero Sanity env vars" now applies only to `/admin`. Public
CMS-backed routes (starting with the two blog routes) require
`NEXT_PUBLIC_SANITY_PROJECT_ID` and a read-capable token, and fail loudly at
module-eval time if missing — `lib/sanity/client.ts` throws a specific error
naming the exact env var, instead of `next-sanity`'s own generic
"Configuration must contain `projectId`".

**Real bug found and fixed during this slice:** the `development` dataset is
private. `lib/sanity/client.ts` didn't pass a `token` to `createClient()` at
all, so every unauthenticated query silently returned an **empty result set**
(not a 403) — `generateStaticParams` for blog quietly produced 0 pages at
first build. Fixed by adding `token` (prefers `SANITY_API_READ_TOKEN`, falls
back to `SANITY_API_WRITE_TOKEN` since a write token can read too) and adding
the module-level config guard described above so this class of failure is
loud next time, not silent.

**What changed:**

- `lib/sanity/client.ts` — added the config guard + token wiring.
- `lib/sanity/image.ts` — added `resolveImageUrl()` (Sanity image field →
  plain URL string, since every existing content type has `image: string`,
  not a Sanity image object).
- `lib/sanity/queries.ts` — added a shared `ARTICLE_PROJECTION` fragment
  (flattens `slug.current` → `slug`, dereferences `author`) applied
  consistently across every article query, including the coalesce
  featured-article query (previously had no projection at all).
- `lib/sanity/fetch/articles.ts` — rewritten from raw `client.fetch(query)`
  scaffolding to real projections: image resolution, the existing Portable
  Text → `BlogArticleBlock[]` adapter, `readTimeMinutes` fallback
  (word-count estimate) when a Studio override isn't set, and
  `fetchRelatedArticles` reproducing the same-category-first ordering from
  `content/blog.ts`'s `getRelatedArticles` (reuses its `articleToRelatedItem`
  mapper rather than duplicating it).
- `components/shared/cms-fallback-image.tsx` — new, per
  `docs/cms-migration-spec.md` Rule 6 (branded fallback for a missing CMS
  image). Wired into the blog detail hero image only this pass.
- `app/academy/blog/(listing)/page.tsx`, `app/academy/blog/[slug]/page.tsx` —
  now `async`, fetch from Sanity; `export const revalidate = 3600` added to
  both. Page chrome (hero copy, newsletter, share controls, related-section
  labels, CTA) stays imported from `content/blog.ts`, unchanged.
- `app/api/revalidate/route.ts` — new webhook route using `next-sanity/webhook`'s
  `parseBody()` for HMAC signature verification. Only the `academyArticle`
  row from the spec's revalidation table is wired; webinar/course rows get
  added when those tracks cut over.

**Verification:** `pnpm format`/`lint`/`typecheck`/`build` all pass with real
env vars. Confirmed via a standalone script that all 10 seeded articles fetch
and normalize correctly, including every real block kind in the fixture data
(paragraph, heading2, blockquote, callout, table, bullet list, ordered list —
`heading3`/`code`/`image` block kinds have zero real fixtures to test
against, pre-existing limitation, not new). Confirmed in both `pnpm dev` and
`pnpm start` (production mode): listing + all 10 detail pages return correct
content; a nonexistent slug returns the not-found UI (noted: HTTP status is
200 not 404 for this, but confirmed identical, pre-existing behavior on the
still-static `/academy/courses/[missing]` and `/academy/webinars/[missing]`
routes too — not a regression from this slice, left alone). Deliberately
unset `NEXT_PUBLIC_SANITY_PROJECT_ID` and confirmed the build fails with the
new clear config-guard error.

**Explicitly deferred, in order, each its own review checkpoint:** webinars
track, courses track, `/academy` hub page, `/academy/search`, Home spotlight
preview, registration email resolver (only after webinars+courses land),
then finally archiving the static catalogue arrays once everything is cut
over and QA'd.

## Sanity CMS Phase 1 — first live dataset seed + Studio boot fix (2026-07-09)

Ran the migration script for real against the actual `development` dataset
(project ID + `SANITY_API_WRITE_TOKEN` now in `.env.local`, not committed):
dry-run first, then `--execute`. Created 30 documents — 10 authors, 10
articles, 7 webinars, 3 courses — 0 errors/warnings. Verified count via an
authenticated GROQ `count()` query against the live dataset.

Also fixed two real bugs surfaced only once real credentials/a live project
existed:

- `pnpm migrate:academy` read `SANITY_API_WRITE_TOKEN` etc. via bare
  `process.env`, but a standalone `tsx` script doesn't auto-load `.env.local`
  the way Next's own dev/build does. Fixed by changing the script to
  `tsx --env-file-if-exists=.env.local scripts/migrate-academy-to-sanity.ts`
  (Node 22.6+ / this repo's Node 25 supports that flag natively).
- `/admin` threw "Invalid hook call" / "Cannot read properties of null
  (reading 'useMemoCache')" on every request, in both dev (Turbopack and
  webpack) and `next start` production builds. Root cause:
  `serverExternalPackages: ["sanity", "next-sanity"]` (added in the
  foundation slice to fix an unrelated `swr` "react-server" export-condition
  build error) fully externalizes those packages, which skips Turbopack's
  RSC client-boundary analysis. `next-sanity/studio`'s entry point isn't
  itself marked `"use client"` — it does a server-safe `preloadModule()`
  call, then lazily loads the real Studio component from a separate
  `"use client"` file. With the whole package externalized, that lazy-loaded
  component ends up running against a detached React module instance instead
  of the one used by the client bundle. Fixed by switching to
  `transpilePackages: ["sanity", "next-sanity"]` in `next.config.ts` instead
  — this keeps both packages in Next's own controlled compilation pass
  (respecting `"use client"` boundaries correctly) rather than raw external
  Node resolution, and still resolves the original `swr` build error.
  `app/admin/[[...index]]/page.tsx` was also marked `"use client"` directly
  (was a plain Server Component passing `config` as a prop to `<NextStudio>`)
  since `sanity.config`'s schema is full of validation/structure functions
  that can't cross a Server→Client serialization boundary once Turbopack
  properly recognizes that boundary exists. Also bumped `react`/`react-dom`
  to `19.2.7` (from `19.2.4`) to match a stricter peer-dependency range pulled
  in transitively by `@portabletext/editor`, and `next`/`eslint-config-next`
  to `16.2.10` (from `16.2.9`) while investigating — the version bump alone
  did not fix the hook error, `transpilePackages` did, but keeping the newer
  patch versions since they're strictly newer and nothing regressed.

**Verification:** `pnpm format`/`lint`/`typecheck`/`build` all pass. Confirmed
via `next start` (production mode, not just dev) that `/admin` returns 200
with no console errors across repeated requests, page HTML contains
`<title>Studio | iProduce Africa</title>`, and `SiteChrome` isolation still
holds (`/` renders header/footer, `/admin` renders neither).

**Still unwired, unchanged from the foundation slice:** `lib/sanity/fetch/*`
is not imported by any `app/` route yet; no `/api/revalidate` route; no
`production` dataset support in the migration script.

## Legal pages: review cleanup (2026-07-07)

Applied three P3 review findings: the desktop sidebar had a `nav` nested
inside another `nav` (both labelled "Legal documents") — outer wrapper is now
a plain `div`, `LegalDocNav` owns the sole landmark. Removed
`tracking-[-0.01em]` from the legal H1 (project rule: letter-spacing should
be `0`, not negative). Refreshed two stale doc status lines that predated
implementation — `legal-pages-spec.md` no longer says footer hrefs are
`undefined`, and `footer-spec.md`'s top status no longer says newsletter/legal
links are placeholder-only (now notes social icons are the only remaining
placeholder).

**Verification:** `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck`
(pass), `pnpm build` (pass). Manual: confirmed via dev server HTML that only
one `nav aria-label="Legal documents"` landmark renders and the H1 no longer
carries negative tracking.

---

## Legal pages: dropped docs-site polish (2026-07-07)

Reverted the heading hash/permalink icons and the desktop "On this page"
section TOC added in the prior pass. On reflection those are docs-site
conventions (MDN, GitHub docs) that most legal/privacy pages (Apple, Stripe,
GitHub ToS) don't actually use — plain scroll + a static cross-doc nav is the
norm, and the TOC duplicated functionality already covered by the section
`id`s. Kept: section `id`s + `scroll-mt-*` (harmless, keeps `/privacy#contact`
style deep links usable later), the desktop sticky "Legal documents" cross-doc
card, and the mobile sticky doc switcher — none of those were in question.

**Verification:** `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck`
(pass), `pnpm build` (pass). Manual: confirmed via dev server HTML that hash
icons and "On this page" are gone, cross-doc nav and section `id`s remain.

---

## Legal pages nav/UX follow-up (2026-07-07)

Fixed desktop sticky sidebar (root cause: `lg:items-start` on the grid
container collapsed the aside to content height, leaving `position: sticky`
no room to travel — removed it so the aside stretches to the row height).
Replaced the mobile horizontal-scroll pill bar with a sticky "Legal
documents" dropdown switcher (`legal-doc-switcher.tsx`) — these are separate
pages, not tabs, so a segmented-pill bar was the wrong pattern; a single
"jump to document" trigger reads correctly and takes far less mobile screen
real estate. Also: fixed a `focus-visible:outline-none` regression with no
replacement ring on the new switcher (now `focus-visible:ring-2
focus-visible:ring-leaf-300`, matching the rest of the design system); added
an in-page "On this page" section TOC to the desktop sidebar; added
`print:hidden` / `print:block` / `print:max-w-none` so a printed policy
doesn't waste a page on chrome; added a small `#` deep-link icon next to each
`h2` so a specific clause can be linked directly.

Docs updated: `docs/implementation-log.md` only (no architecture change to
the approved spec).

**Verification:** `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck`
(pass), `pnpm build` (pass). Manual: verified via dev server that the sticky
mobile switcher, sticky desktop card, `focus-visible:ring-2` classes, section
TOC anchors, and heading deep-links all render correctly in HTML.

---

## Legal pages implementation (2026-07-07)

Implemented the four legal/compliance routes per the approved spec
(`docs/routes/legal-pages-spec.md`): `types/legal.ts`, `content/legal.ts`
(baseline copy for Privacy, Terms, Cookies, Accessibility grounded in the real
stack — Resend, Turnstile, Upstash, Vercel Analytics, Sanity `/admin`),
`components/legal/legal-page-layout.tsx` + `legal-doc-nav.tsx` +
`legal-section-content.tsx` (shared shell with sticky `lg+` cross-doc nav,
mobile pill row, last-updated badge, category table support for Cookies), and
`app/privacy`, `app/terms`, `app/cookies`, `app/accessibility` route pages.
Wired `siteConfig.footer.legalLinks` to real hrefs and added four `pageSeo` +
`sitemapRoutes` entries (priority 0.3, yearly). Cookies page uses a category
table instead of inventing cookie names/durations, per Codex review. No
consent banner in v1.

Docs updated: `docs/status-board.md`, `docs/shared/footer-spec.md`,
`docs/routes/README.md`.

**Verification:** `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck`
(pass), `pnpm build` (pass — all four routes prerender static, appear in
`sitemap.xml`). Manual: `/privacy`, `/terms`, `/cookies`, `/accessibility`
return 200 via dev server; footer links resolve to the new routes; cross-doc
nav and last-updated date render correctly in the rendered HTML.

---

## Production form-delivery cutover audit (2026-07-07)

Audited the live Resend + Turnstile + Upstash + Vercel form-delivery path from
the six API routes through `handlePublicFormPost`, email orchestrators,
Turnstile verification, and rate limiting. Added non-secret server logs for
missing production config, blocked doomed submits when the public Turnstile key
is absent in production, clarified `.env.example`, and added
`docs/production-form-delivery-cutover.md` for the actual DNS/env handoff.

Docs updated: `docs/README.md`, `docs/resend-integration-spec.md`,
`docs/status-board.md`.

**Verification:** `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck`
(pass), `pnpm build` (pass).

---

## Newsletter duplicate-submit hardening (2026-07-07)

Investigated the July 1 inbox pattern for newsletter notifications and found
repeated notification/receipt pairs for the same address, including article
sidebar + footer paths. Patched `usePublicFormSubmit` with a synchronous
in-flight lock, added same-session normalized-email de-dupe inside
`NewsletterSignupForm`, and made the footer pass the current pathname as
`sourcePath` instead of always reporting `/`.

Docs updated: `docs/resend-integration-spec.md`, `docs/shared/footer-spec.md`,
and `docs/routes/blog-spec.md`.

**Verification:** `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck`
(pass), `pnpm build` (pass).

---

## Legal pages spec — Codex approved (2026-07-07)

Codex approved `docs/routes/legal-pages-spec.md` with edits applied: contact
fields match `schemas/contact.ts` (no phone); cookies copy rules (Vercel Analytics
= no analytics cookies; Turnstile = necessary signals only, no invented names);
entity/governing-law wording marked replaceable for counsel. **Ready to
implement** — blocked only on next agent session.

---

## Legal pages spec draft (2026-07-07)

Drafted `docs/routes/legal-pages-spec.md` for Codex review: four routes
(Privacy, Terms, Cookies, Accessibility), WardWise-style `content/legal.ts`
structure, iProduce shared chrome + design system, processor/form disclosure
table grounded in repo (Resend, Turnstile, Upstash, Vercel Analytics). v1
explicitly **no cookie consent banner** — policy disclosure only. Implementation
blocked until Codex approves spec.

---

## Team roster + partners + dialog polish (2026-07-07)

- **About team** now six members in `content/about-people.ts`: added Umma Umar
  (Director of Partnerships), Usman Umar Dagona (Project Coordinator, North),
  Tobi Seun Ajayi (Project Coordinator, South). Corrected Mustapha Yakubu to
  Director of IT and Wilson Agaba to Director of Programs.
- **Partners** — added Flowdiary to `partnersList` (`order: 7`), so it renders
  in the Voices logo grid + shared marquee. Logo at
  `public/images/partners/flowdiary.png`.
- **Partner story dialog** — mixed Figma + live: softened logo panel into a
  centred brand lockup on `bg-subtle` (kept right-hand `border-r`), kept the
  subtle header/footer bands for scroll affordance, `View website` now leaf
  underline + external icon. Label `Visit website` → `View website`.
- **Voices** — reverted to original headings + three quotes (two intentional
  placeholders) and the carousel; removed the single-quote / logoGridLabel
  experiment.
- **Catalogue empty states** — Academy courses/webinars/blog filters now render
  the shared `CatalogueEmptyState` (with an in-place "view all" reset) instead
  of muted one-liner text.

**Next:** legal pages (Privacy, Terms, Cookies, Accessibility) — real baseline
content grounded in the actual stack; plan goes to Codex before build.

**Verification:** `pnpm typecheck` green on each change.

---

## Partners page — section order + copy refresh (2026-07-05)

Reordered `/partners`: Hero → Spotlight → Benefits → Opportunities → Voices →
Inquiry. Refreshed hero, why-partner, spotlight intro, and opportunities copy;
reframed Voices (ecosystem partners description, removed placeholder quotes,
single static quote card); fixed inquiry title and checklist language. Spotlight
roster content: WIMA → IsDB → Jaiz → CFG with researched copy; Malam Alu replaced
by IsDB. UI remains compact advisor-style cards pending designer pass.

**Verification:** `pnpm format`, `lint`, `typecheck`, `build`.

---

## Partner Spotlight — compact grid (2026-07-05)

Removed bento; partner spotlight uses compact horizontal cards in a 2-col grid +
story dialog (advisor-card pattern).

---

## Partners page content refresh (2026-07-05)

Reordered `/partners` to proof-first flow: Hero → Spotlight → Benefits →
Opportunities → Voices → Inquiry. Tightened Benefits copy (why iProduce) vs
Opportunities (what to co-create). Reframed Voices as ecosystem section with
`logoGridLabel`, removed placeholder testimonials, kept Musa Fajuyi quote only.
Spotlight partners: WIMA, IsDB, Jaiz Bank, CFG Advisory with researched
copy. Inquiry copy: iProduce capitalisation, partnership follow-up checklist,
partnership consent text. Hero description nods to partner types.

**Verification:** `pnpm format`, `lint`, `typecheck`, `build`.

---

## Partner Spotlight — alternating rows (2026-07-05, superseded)

Removed the founding-partner bento experiment (`components/ui/bento-grid.tsx`
deleted; inline bento cards removed from `partner-spotlight-section.tsx`).
Partner Spotlight now uses Mustafa's original template: one alternating
image + write-up row per partner, dialog for full story, "Show more" after
the first four. Dropped `featured`, `featuredLabel`, `featuredCtaLabel`, and
`moreLabel` from spotlight types/content.

**Verification:** `pnpm format`, `lint`, `typecheck`, `build`.

---

## Partner Spotlight — founding-partner bento (2026-07-04, superseded)

Replaced the "featured banner + tile grid + show more" Partner Spotlight
layout with a hand-composed bento: the first four partners (by `order`) form
a fixed hero (large, `featured: true` item) + wide card + two square tiles,
auto-placed via plain CSS grid (`lg:grid-cols-4`, hero gets
`lg:col-span-2 lg:row-span-2`, everything else default — no explicit
`col-start`/`row-start` needed, the grid's own auto-flow slots the rest in
correctly). This composition only works cleanly for a known, closed set of
four, which is exactly what the real roster is today — going with a true
Aceternity-style bento for the _whole_, ever-growing partner list would break
every time a partner is added. Partner #5 onward renders in a plain
`MotionStagger` grid below (`section.moreLabel` heading + existing
`PartnerTile` + "show more" pagination), hidden entirely while the roster
stays at four. Same `PartnerStoryDialog` opens from every card (hero, wide,
tile, growth-grid). New content fields: `PartnerSpotlightContent.moreLabel`
/ `showMoreLabel`; `featuredLabel` copy changed from "Featured partner" to
"Founding partner" to match the new framing.

Rejected alternatives (see chat discussion): a full Aceternity-style bento
for all partners (breaks past a fixed curated set, and cells are too small
for real partner copy), and a full "journey"-style sticky-crossfade scroll
list (scales better long-term but bigger build, better revisited once the
roster is large enough that the fixed bento stops making sense).

**Verification:** `pnpm format`, `lint`, `typecheck`, `build`; visually
checked in-browser at desktop width (bento renders hero/wide/tile-tile as
designed, story dialog opens from a tile).

---

## Empty-state handling for Academy hub bands + Home Spotlight (2026-07-04)

New shared `components/shared/catalogue-empty-state.tsx` (quiet, on-brand —
same visual family as `PeopleRosterEmpty`). Refined the CMS empty-content
rules: hub bands (`Webinars & Events`/`Courses`/`Blog` on `/academy`) can
never hide since the tab strip + Opportunities cards scroll-link to their
anchors — only the grid swaps for the empty-state panel, header stays. Home
Spotlight tabs (`upcoming`/`training`) get the same panel per-tab; the tab
strip and sibling tab are unaffected. Listing routes (`/academy/blog` etc.)
are unchanged. New `CatalogueEmptyStateContent` type (`types/content.ts`),
wired via `AcademyListing.emptyState` and
`AcademyHomePreview.spotlightEmptyState`; copy added to `content/academy.ts`.
Full rationale + rule tables: `docs/cms-migration-spec.md` Rule 2/3,
`docs/routes/academy-spec.md` "Empty-state behaviour" section.

Verified live: the Home Spotlight's "Upcoming Events" tab was organically
empty for a window around 2026-07-04 (all four hub-scheduled demo webinar
dates in `content/webinars.ts` had passed) and correctly rendered the new
panel — confirmed via direct HTML inspection, not just typecheck. Three of
those dates were then pushed into July (`post-harvest-handling-essentials`,
`ask-an-agronomist-soil-health`, `building-export-ready-business`) so the
demo shows real upcoming sessions again; `scaling-smallholder-farms-with-data`
stays in the past on purpose — it's the deliberate "closed/session ended"
registration-state demo entry.

**Verification:** `pnpm format`, `lint`, `typecheck`, `build`.

---

## Sanity CMS Phase 1 — foundation slice (2026-07-02)

Scaffolded Sanity schemas (`academyArticle`, `academyWebinar`, `academyCourse`,
`author`, `registrationConfig`, PT blocks `callout`/`table`/`codeBlock`/
`bodyImage`/`orderedStep`), embedded Studio at `/admin` (`SiteChrome` skips
Header/Footer for `/admin*`, Header/Footer passed as slots so `Footer` stays
server-only), and `scripts/migrate-academy-to-sanity.ts` (deterministic
`{type}.{slug}` IDs, `--offline`/dry-run/`--execute` modes, asset dedup +
image-recovery patch, hard-refuses any dataset but `development`). Body
`block` marks (bold/italic/link) are disabled in Studio v1 — no adapter yet
to render them publicly. `lib/sanity/{client,image,queries,fetch/*,
portable-text,guards}.ts` scaffolded but **unwired** — no `app/` route reads
from Sanity yet; Academy pages still run on `content/*.ts`. No
`app/api/revalidate/route.ts` yet (next slice). Never touches the
`production` dataset.

**Verification:** `pnpm format`, `lint`, `typecheck`, `build` (all pass with
zero Sanity env vars set); `pnpm migrate:academy -- --offline` prints a
correct manifest with no network calls.

---

## Scroll-to-top — site-wide (2026-07-01)

Moved `<ScrollToTop />` to `app/layout.tsx`. Visible on long pages only
(`scrollHeight > 1.5× viewport`, `scrollY > 400px`). Progress ring stays
blog-slug-only; other routes get plain arrow. Removed `showScrollToTop` from
`AcademyDetailShell`.

**Verification:** `pnpm typecheck`, `pnpm lint`.

---

## Partners voices grid — CMS contract + window rule (2026-07-01)

Documented shipped `buildVoicesLogoGrid` / `VoicesLogoGrid` behaviour in
`docs/cms-migration-spec.md` (wireframes, fill table, GROQ pools, editor vs
engineering split). Locked **option A**: modulo wrap when `T < N < 2T` (e.g.
`N=15` window 1 shows 13–15 then wraps 1–9) — matches `selectPartnerWindow`.
Cross-link from `docs/routes/partners-spec.md`; fixed `expandVoicesLogoGrid`
typo in implementation-log.

**Verification:** Docs-only.

---

## About team & advisors — profile dialogs (2026-06-24)

**People registry:** `content/about-people.ts` — canonical `aboutPeople[]` with
`group: 'team' | 'advisor'`, `bioSummary`, `bioParagraphs`, optional
`credentials` / contact fields. `content/about.ts` projects team/advisor
`members[]` via `getAboutPeopleByGroup`. Wilson Agaba omitted until photo +
bio arrive.

**UI:** `PersonProfileDialog` (shared Radix dialog — mobile stacked, desktop
side-by-side, scrollable bio). Team carousel: whole card + **View profile**
opens modal; social links stop propagation. Advisors grid: **Read more** per
Figma. Real photos in `public/images/about/`.

**Docs:** `about-spec` (sections 6–7, data shapes), `cms-migration-spec`
(`teamMember` fields aligned to `AboutPerson`).

**Verification:** `pnpm format`, `lint`, `typecheck`, `build`.

---

## Newsletter submit UX (2026-07-01)

**`NewsletterSignupForm`:** send button shows spinner + `aria-busy` while
posting; email input disabled during submit. Success panel adds **Subscribe with
another email** (resets RHF + Turnstile, same pattern as Contact). Copy in
`content/site.ts` (footer) and `content/blog.ts` (sidebar). Docs: `footer-spec`,
`blog-spec`.

**Verification:** `pnpm format`, `lint`, `typecheck`, `build`.

---

## Form + dialog UX pass (2026-06-24)

**Multi-step dialogs (Become Partner, Membership Application, Academy
registration):** `MultiStepDialogFooter` switched from equal `grid-cols-3` to
flex (fixed back/submit, centered step counter). Mobile submit keeps **Submit**

- spinner; sm+ uses **Submitting…** + spinner. `MultiStepDialogShell` uses
  slightly tighter mobile width/height and extra scroll padding. **Become Partner
  review:** stacked header, interest chips, wrapping org name. **Membership
  review:** static **Community application** badge (parallel to Partner inquiry)
  - dynamic **Your sector** chip; organisation-only subtitle; sector removed
    from detail grid. **2026-07-01 follow-up:** membership review uses **Option B**
    — tangerine badge shows selected sector label only (no static application badge,
    no chip row).

**Page forms:** Added `components/shared/form-submit-button.tsx` (spinner +
submitting label). Wired Contact, Partners inquiry, Community application.
Inline success panels aligned: **Send another** on Contact, Partners inquiry,
and Community application (resets RHF + Turnstile).

**Docs:** `partners-spec`, `contact-spec`, `community-spec`,
`community-membership-dialog-spec`.

**Verification:** `pnpm format`, `lint`, `typecheck`, `build`.

---

## CMS Phase 2 scope + contract fixes (2026-06-28)

Patched after review: `teamMember` aligned to `AboutTeamMember`/`AboutAdvisor`
(required bio + photo, social URLs), `partner` slug→`id` + `website`→`href`,
voices grid repetition stays code-owned (`buildVoicesLogoGrid`), FAQ
categories code-owned + items from CMS, Phase 2 slices 2A/2B/2C, production
migrate only after client approval.

**Verification:** Docs-only.

---

## CMS Phase 2 scope locked (2026-06-28)

Expanded `docs/cms-migration-spec.md` and `docs/cms-client-summary.md`: Phase 2
is explicitly scoped (not backlog) — testimonial, faq, partner, teamMember,
memberStory across Home, About, Academy hub, Community, Partners, Contact.
Full placeholder seed + route wiring + revalidation map documented.

**Verification:** Docs-only.

---

## CMS specs — review locked + client summary (2026-06-27)

Second pass: author references locked (no “optional/split” wording), closed
registration API returns `PUBLIC_FORM_VALIDATION_ERROR` shape, full placeholder
**seed-to-development** policy (no empty Studio on handoff), added
`docs/cms-client-summary.md` for client sign-off. Status: **approved with
edits** — implementation waits on client CMS scope approval.

**Verification:** Docs-only. Checkpoint commit recommended before Sanity code.

---

## CMS specs — external review incorporated (2026-06-27)

Codex + Claude review: approve with minor edits. Patched both specs — Phase 1
search locked, category collapse table, coalesce featured GROQ, drop
`isPublished`, PT mark stripping, slug/revalidate rules, author references,
registration API reject when closed, branded `CmsFallbackImage` policy, hybrid
testimonial cutover, migration manifest + `content/_archived/` rollback.

**Verification:** Docs-only.

---

## CMS migration specs drafted (2026-06-27)

Added `docs/cms-migration-spec.md` (master plan: CMS vs code inventory, phased
rollout, edge-case rules including empty CMS sections, folder layout aligned with
Sanity MCP + q-das/portfolio references) and `docs/sanity-academy-spec.md`
(Phase 1 Academy catalogues: document types, GROQ map, PT adapter boundary,
migration/cutover). No Sanity code yet — pending review.

**Verification:** Docs-only.

---

## Review fixes — honeypot + Turnstile (2026-06-27)

Renamed honeypot field from `website` to `hpField` (`PUBLIC_FORM_HONEYPOT_FIELD`)
to avoid collision with Become Partner's real `website` field. Turnstile widget
uses a stable script id and initializes when `window.turnstile` already exists
(late-mounted dialogs). pnpm `esbuild` build approval set; README updated.

**Verification:** `pnpm typecheck`, `pnpm lint`, `pnpm build` — pass.

---

## Rate limiting + form UX polish (2026-06-27)

Added centralized Upstash rate limiting in `lib/rate-limit.ts`, wired through
`handlePublicFormPost` on all six API routes (429 + `Retry-After`; production
fail-closed 503 when Upstash env is missing). Client maps `PUBLIC_FORM_RATE_LIMIT_ERROR`.
Turnstile retry UI simplified (stable script id, lazy init when `window.turnstile`
exists, retry + email fallback without script remount tricks). Sonner success
toast on **all** public forms (inline success panel + light toast via
`usePublicFormSubmit({ successToast })` and `lib/forms/form-success-toast.ts`).
Contact success copy mentions inbox confirmation.

Email links and logo URLs now resolve through `getEmailSiteUrl()` /
`getEmailLogoUrl()` — set `NEXT_PUBLIC_SITE_URL` and `EMAIL_ASSETS_BASE_URL` to
`https://iproduce-africa.vercel.app` until `iproduceafrica.com` is live.

**Verification:** `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm build` — pass.

---

## Route spec doc sync (2026-06-27)

Aligned `docs/routes/partners-spec.md`, `contact-spec.md`, and `blog-spec.md`
with shipped form wiring (live API, partner reason copy, newsletter no longer
placeholder toast). Older historical rows in this log left unchanged.

---

## Resend + React Email + Turnstile — polish pass (2026-06-27)

Email architecture split into focused components; subscriber vs internal UI kept
separate (forest receipt chrome vs compact ops notifications). Logo sizes bumped
(subscriber 176px, internal 148px). Internal field lists use single-card row layout.
Docs: `docs/email-structure.md` (folder map + suggestions); `docs/resend-integration-spec.md`
updated to implemented status.

**Verification:** `pnpm typecheck`, `pnpm lint` — pass. Visual check via `pnpm email:dev`.

---

## Resend + React Email + Turnstile implementation (2026-06-26)

Full production wiring for all seven public forms: six API routes, 12 React Email
templates (6 notification + 6 receipt pairs), shared Turnstile/honeypot helpers,
`usePublicFormSubmit` client hook, and live success copy across contact, partners,
community, academy, footer, and blog sidebar.

**Build fixes:** Server-side phone validation uses `libphonenumber-js` (not
`react-phone-number-input`, which breaks Next server bundling). Zod 4 envelope
composition uses `withPublicFormEnvelope()` / `.and()` instead of `.extend()` on
refined schemas.

**Verification:** `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm build` — pass.
Manual email/Turnstile matrix requires client env vars (see
`docs/resend-integration-spec.md`).

---

## Stale docs audit (2026-06-26)

Updated route and shared specs that had fallen behind shipped code: Home order
and Why Join Us ownership, navbar breakpoints/listing routes/CTA behavior,
Academy featured-event registration details, Blog route groups and
webinars/courses detail routes, Community dialog CTA handling, ContentCard
consumer status, system-page convention files, and route/provider structure
guidance. Left backend, browser-QA, Notion, real imagery, Sanity, and
Resend/Turnstile items open where the current checkout still does not prove
them done.

**Verification:** Docs-only change; compared docs against `app/`, `components/`,
`content/`, `lib/`, `schemas/`, `types/`, and targeted stale-phrase searches.

---

## Status board refresh (2026-06-26)

Updated `docs/status-board.md` against the current checkout: static shared
chrome and public pages are now marked complete/built beyond scaffold, the
placeholder imagery source is marked known, and the Resend + React Email +
Turnstile implementation remains open because no API/email implementation files
exist in this working tree yet.

**Verification:** Docs-only change; inspected current files with `git status`,
route/spec searches, and form TODO searches.

---

## Resend + Turnstile full launch scope (2026-06-26)

Updated the form-delivery spec to require one full production slice: Resend,
React Email, submitter receipts for every form, newsletter internal alerts,
Cloudflare Turnstile, honeypot handling, live success copy, and explicit
Community `source` tracking. Removed the earlier deferred anti-spam posture so
Cursor can implement from the spec without relying on chat context.

**Verification:** Docs-only change; not run.

---

## Home — Why join us + section reorder (2026-06-24)

Client review: **Why join us** as image-led 2×2 grid (`why-join-service-card.tsx`, Core Focus card rhythm + benefit icon chips); placed **after Core Focus, before Your pathway**; women-in-agric copy in hero, why-join intro, grow journey, core-focus intro. Order: Hero → Partners → What we do → Core Focus → Why join us → Your pathway → Academy spotlight.

**Verification:** `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm build` — pass.

---

Client request: keep timeline **years**; remove unverified **numeric stats** from the right sticky card and mobile pills. Replaced `stats[]` with `focusPoints[]` + shared `focusPanelLabel` ("What we focused on"). Scrubbed hard numbers from milestone body copy. Files: `types/about.ts`, `content/about.ts`, `components/about/journey-section.tsx`, `docs/routes/about-spec.md`.

**Verification:** `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm build` — pass.

---

## Pre-Sanity lock — blog UX + editorial content (2026-06-24, session 7)

**Blog reading UX**

- Header-integrated reading progress on blog article slugs only (`ReadingProgress` in `components/layout/header.tsx`; pathname gate `/academy/blog/[slug]`)
- Scroll-to-top with progress ring on blog detail via `AcademyDetailShell` `showScrollToTop` (`components/shared/scroll-to-top.tsx`)
- Breadcrumbs on detail pages — **rejected** (visual clutter); not shipping
- Aceternity-style side tracing beam — **rejected**; removed

**Newsletter forms**

- `schemas/newsletter.ts` + shared `NewsletterSignupForm` (RHF + Zod)
- Footer + blog sidebar consume the shared form; submit still placeholder toast

**Editorial content**

- Article bodies moved to `content/blog-articles.ts`; `content/blog.ts` owns page chrome + helpers
- 10 articles with realistic agribusiness copy and varied read lengths (3–14 min)
- Featured flagship: `unlocking-intra-african-trade` (~14 min) for long-scroll QA

**Verification:** `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm build` — pass (38 routes)

**Before Sanity**

- [ ] Browser QA on blog listing + one long + one short article (progress bar, scroll-to-top, sidebar)
- [ ] Optional Lighthouse row on `/academy/blog` + one detail slug
- [ ] Draft `docs/sanity-academy-spec.md` (content-shape map from `types/` + `content/`)

---

## Codex review brief — Academy foundation lock (2026-06-24, session 6)

**Hygiene + P2 fixes**

- `useListingFilter` hook — shared filter/sort across blog/webinars/courses listing bodies (no `useMemo`)
- `useDialogFormLifecycle` — registration dialog close/submit race fixed
- `MultiStepDialogFooter` `singleStep` mode for one-step academy registration
- `Input` — `bg-background`, removed dead `dark:` utilities; `h-11` preserved
- `AcademyDetailShell` flattened to `listings/academy-detail-shell.tsx`
- Home `academyHomePreview.upcoming` filters past sessions via `isUpcomingSession()`
- `/academy/search` — `noindex, follow` for entire route
- Docs drift corrected in `academy-spec.md` + `blog-spec.md`

**Verification:** `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm build` — pass (38 routes)

---

**Fixes from user QA**

| Issue                               | Fix                                                                          |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| Toast at top of page                | Sonner `position="bottom-right"` in `app-providers.tsx`                      |
| Hub search looked like topic filter | Removed combobox; single search field → `/academy/search?q=` unified results |
| Register → partners form            | New `AcademyRegistrationDialog` (webinar + course) — not partnership enquiry |

**New routes / modules**

- `/academy/search` — cross-catalogue static search (`lib/academy-search.ts`)
- `schemas/academy-registration.ts` + `components/academy/registration/*`
- `AcademyRegistrationProvider` composed in `app/academy/layout.tsx`

**Registration UX (static MVP)**

- Featured event **Register Now**, webinar detail sidebar, course detail sidebar → open dialog
- Simulated submit (800ms) → success panel in dialog; wire to API later
- Copy in `academyRegistrationContent` (`content/academy.ts`)

**Ask Codex**

1. Search page is static client-side filter — OK until Sanity unified search?

## Codex review brief — Academy slug + search polish (2026-06-24, session 3)

**Slug detail alignment**

- Shared `AcademyRelatedSection` + `AcademyRelatedSectionContent` / `AcademyRelatedItem` in `types/academy.ts`
- Blog slugs: related **articles** (not courses); `getRelatedArticles()` in `content/blog.ts`
- Course slugs: **Continue learning** related courses via `getRelatedCourses()`
- Webinar slugs: **More upcoming sessions** via `getRelatedWebinars()`
- Shared metadata header (`AcademyDetailMetadata`), hero image skeleton (`AcademyDetailHeroImage`), route `loading.tsx` skeletons for all slug types

**Search UX**

- `Back to Academy` moved to top of `/academy/search`
- Inline search field on results page (`AcademySearchForm` shared with hub hero)
- Dedicated `/academy/search?q=` kept for shareable URLs + SEO (standard pattern)

**Nav**

- Academy dropdown hover-to-open via `AcademyNavDropdown` (controlled menu + mouse enter/leave delay)
- Child active state uses pathname prefix match for nested slug routes

**Removed**

- `ContinueLearningSection` (blog-only duplicate)
- `academyBlogRelatedCourses` projection from `content/academy.ts`

**Verification:** `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm build` — pass (38 routes)

## Codex review brief — Academy hardening (2026-06-24, session 4)

**P1–P3 fixes**

- Registration success copy → explicit demo/preview (no “we will email you”)
- Listing routes static again — removed catalogue `?q=`; hub search → `/academy/search` only
- Content ownership: `webinars.ts` / `courses.ts` own canonical records; `academy.ts` projects hub previews
- Meaningful slugs (no `placeholder-slug-*` in URLs/sitemap)
- Related webinars filter future dates only
- Search: `imageAlt` on results; `noindex` when `?q=` present
- Stale types removed (`AcademyTrackHeroContent`, `AcademyBlogRelatedCourse`, `AcademySearchCategory`, `registerHref`, `BlogDetailSkeleton`)
- Navbar dropdown reverted to original inline `DropdownMenu` (no hover refactor)
- Loading boundaries: route groups `(listing)/` vs `[slug]/` so skeletons don’t override each other

**Verification:** build shows `○ /academy/blog`, `○ /academy/courses`, `○ /academy/webinars` (static)

## Codex review brief — Academy truthfulness + boundaries (2026-06-24, session 5)

**P1**

- Contact form success copy → demo/preview wording (`content/contact.ts`)
- Hub catalogue totals derive from `webinarsContent`, `coursesContent`, `blogContent` lengths
- Meaningful slugs only — sitemap uses build-time `lastModified` for webinar pages (not event dates)

**P2**

- `registration` lifecycle on webinars/courses (`AcademyRegistrationAction`, `lib/academy-registration.ts`); past sessions show closed state
- Blog hub preview from `getBlogHubPreviewItems()` in `content/blog.ts` (no duplicate article arrays in `academy.ts`)
- Registration submit payload includes `kind` + `slug` (`academyRegistrationSubmitSchema`)
- Scoped `not-found.tsx` for `/academy/webinars` and `/academy/courses`
- Mobile nav child active state uses pathname prefix match (matches desktop)
- `academy-spec.md` — registration wires to API/Resend/CRM, not Sanity

**P3**

- `ContentCardTone` moved to `types/content.ts`
- `BLOG_CATEGORIES` + `getBlogHeroImage()` moved to `content/blog.ts`; `types/blog.ts` contracts only
- Hub browse control uses `ButtonLink`; search submit uses button `size="lg"` without inline overrides

**Verification:** `pnpm format`, `pnpm lint`, `pnpm typecheck`, `pnpm build` — pass (38 routes)

1. Registration schema fields sufficient for events vs courses?
2. Should course dialog differ further from webinar (e.g. cohort date field later)?

---

| Date       | Agent  | Task                                                                                                                                                                                                                                                                                                       | Files touched                                                                                                                                                                                                                                                                                                                                                                                                                  | Checks run | Status   | Next step                                                       |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | -------- | --------------------------------------------------------------- |
| 2026-06-24 | Cursor | **Academy polish — search, toast, registration.** Sonner → `bottom-right`. Hub search: removed category combobox; single field → `/academy/search?q=` unified results (`lib/academy-search.ts`). Registration dialog for webinars/courses (featured event + detail sidebars) — no longer partners enquiry. | `providers/app-providers.tsx`, `components/academy/{hub/academy-hero-search-form.tsx,hub/featured-event-section.tsx,registration/*,search/*,webinars/webinar-registration-panel.tsx,courses/course-registration-panel.tsx}`, `app/academy/{search/page.tsx,webinars/[slug]/page.tsx,courses/[slug]/page.tsx}`, `lib/academy-search.ts`, `schemas/academy-registration.ts`, `content/academy.ts`, `types/academy.ts`, `docs/`\* | pending    | Complete | Browser QA search + register dialog + copy-link toast position. |
| 2026-06-24 | Cursor | **Academy listings pass** — `tracks`→`listings`, catalogue pages, slug routes, browse-all CTAs. Hub search since superseded by unified `/academy/search`.                                                                                                                                                  | (see prior row in git)                                                                                                                                                                                                                                                                                                                                                                                                         | pass       | Complete | —                                                               |

| Date       | Agent  | Task                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Files touched                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Checks run                                                                                                                                                                                                                                   | Status                                                                                                                                                                                  | Next step                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-06-24 | Cursor | **Academy listings pass — hub search, catalogue UX, slug routes.** Renamed `components/academy/tracks/` → `listings/` (`AcademyListingHeroSection`, `ListingCardGrid`, `ListingFilterBar`, skeletons). Hub search Option A: category combobox + keyword navigates to `/academy/{webinars,courses,blog}?q=`. Webinars/courses listings: featured band + filter pills + shared grid (mirrors blog). Static detail pages: `/academy/webinars/[slug]` (7) + `/academy/courses/[slug]` (3) on `AcademyDetailShell`. All hub/home/listing cards → real slug URLs; featured event register + next-live → featured webinar slug. Hub catalogue CTAs: **Browse all …** + arrow (not load-more pattern); listing grids use **Load more**. Content: `content/webinars.ts` + `content/courses.ts` own webinar/course detail shapes; `AcademyFeaturedEvent.slug` added. Sitemap extended. Sanity not wired.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `components/academy/{listings/*,hub/academy-hero-search-form.tsx,learning-listing-section.tsx,hub/academy-event-card.tsx,webinars/*,courses/*,blog/{category-filter-bar,article-grid,blog-listing-body}.tsx}`, `app/academy/{page.tsx,webinars/**,courses/**,blog/page.tsx}`, `content/{academy,blog,webinars,courses}.ts`, `types/{academy,blog}.ts`, `app/sitemap.ts`, `docs/{implementation-log.md,routes/academy-spec.md,routes/blog-spec.md}`                                                                                                                                      | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass — 37 routes)                                                                                                                                           | Complete                                                                                                                                                                                | Codex review brief above; browser QA; optional webinar/course `not-found.tsx`; Sanity spec after UI sign-off.                                                                                                                                                                                                                                                                                                                                                |
| 2026-06-24 | Claude | **Combobox swap — closed via audit (shipped via direct user/Cursor polish between sessions).** Searchable combobox replaces the country `Select` across every form/dialog surface. New primitives: `components/ui/combobox-select.tsx` (the consumer-facing primitive), `components/ui/command.tsx` (cmdk-based command palette under the hood), `components/ui/popover.tsx` (Radix popover wrapper). Shared form binding: `ComboboxFormField` added to `components/shared/form-fields.tsx` alongside the existing `SelectFormField` so callers pick by intent (large searchable list vs short native select). Centralized country data: `content/countries.ts` with a `CountryOption` shape that includes an optional `searchKeywords` field (e.g. `"Cape Verde"` matches the official `"Cabo Verde"`) — small UX detail not in the original ask but worth keeping. Schemas updated: `schemas/partners.ts`, `schemas/community.ts`. All 4 country selects swapped: `become-partner-dialog.tsx`, `inquiry-form.tsx`, `membership-application-dialog.tsx`, `application-form.tsx` — plus the review-step components (`become-partner-review-step.tsx`, `membership-application-review-step.tsx`) that render the chosen country label. Per Codex's restraint note, the combobox is used **only where it earns its keep** (country, with 50+ options) — short selects like Role / Sector / Organisation Type stay on the native `Select`. The "Other → specify" fallback on the country field can now be retired in a follow-up since every country is in the list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | (audit-only — no code edits in this row; everything above shipped directly via the user/Cursor between sessions) `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                           | `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                                             | Complete                                                                                                                                                                                | Retire the country-specific "Other → specify" fallback in `schemas/{partners,community}.ts` and the conditional inputs in the four form surfaces — no longer needed now that the combobox covers every country. Next post-MVP item per Notion is the blog/article pages (spec in progress today).                                                                                                                                                            |
| 2026-06-24 | Claude | **Motion pass Slices D + E — closed via audit (work shipped via direct user/Cursor polish between sessions).** Audited every route-specific section file in scope for Slice D and the three Slice E files; everything documented in the original plan is shipped and consistent with the expanded `docs/motion-spec.md` (UX rhythm section, motion decision tree, sibling-trigger rule, "non-clickable surfaces don't get hover affordances" rule, `MotionFade` extended with `scaleFrom`/`yFrom`/`duration` props). **Slice D — all route-specific sections wired**: About (Hero/Story/MVO/Team/Advisors; Journey was already shipped untouched), Academy (Hero/Tabs/Featured Event/Learning Opportunities/Target Participants + 3 Learning Listing consumers — headers only on listings per "7+ cards → header fade only" rule), Community (Hero/Three Steps/Who Should Join/Preview chat with `cap={5}`/Member Stories/Application + Why Join + Member Benefits delegating to shared `BenefitsSection`), Partners (Hero with image scale-in/Voices with sibling triggers/Opportunities/Inquiry — form stays static), Contact (Intro wired; map intentionally static per spec). **Slice E — multi-step dialog motion shipped**: `multi-step-dialog/shell.tsx` got `<AnimatePresence mode="wait" initial={false}>` keyed on `stepIndex` (180ms enter, 120ms exit, opacity + y 4→0); `stepper.tsx` got `LayoutGroup` + `layoutId="stepper-active-indicator"` on a `motion.span` with the critical `!reduce` guard (reduced-motion path renders the static styled span instead of the morphing one — `motion/react`'s shared-element layout does not honour the preference on its own); `success-panel.tsx` got the 280ms `opacity + scale 0.96→1` mount entrance. Both dialog consumers (`become-partner-dialog`, `membership-application-dialog`) inherit automatically. **Phase 4 bespoke surfaces also shipped during the same window**: `academy/academy-tabs-section.tsx` (active pill morph via inline `motion.div` + `LayoutGroup`), `academy/featured-event-section.tsx` (countdown digit crossfade via inline `AnimatePresence`). The full motion pass (Slices A → E) is now complete. **Lighthouse baseline + delta** still deferred per user — to be captured on next prod push. | (audit-only — no code edits in this row; everything above shipped directly via the user/Cursor between sessions) `docs/{motion-spec,implementation-log}.md`                                                                                                                                                                                                                                                                                                                                                                                                                             | `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                                             | Complete                                                                                                                                                                                | Browser walk routes at 390 / tablet / 1440 confirming sibling-trigger pattern reads cleanly; reduced-motion sweep across every page + open every dialog/sheet/popover/tooltip; dialog walk (Become Partner + Membership Application) — step transitions feel clean, stepper indicator morphs, success panel scales in once; Lighthouse delta vs an in-browser baseline on prod push. Motion pass closed; next post-MVP item per Notion is the combobox swap. |
| 2026-06-23 | Codex  | **Client feedback — CTA + no public numbers** — changed the Home hero to a single `Join our community` action and replaced hero traction stats with qualitative proof points. Refined the desktop hero proof treatment from a heavy glass stats replacement into a compact right-side community pathway card after visual review. Removed/softened visible unverified scale claims from About hero/story, Partners hero badge/impact content, Community hero/preview labels, and Academy hero trust copy. Kept the About Journey section unchanged per request. Updated the shared impact/proof card renderer so inactive impact sections can display qualitative proof cards until verified metrics are approved.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `components/home/hero-section.tsx`, `content/home.ts`, `components/about/ecosystem-orbit.tsx`, `content/about.ts`, `components/partners/{africa-map,hero-section}.tsx`, `content/partners.ts`, `components/shared/impact-stats-section.tsx`, `content/{academy,community}.ts`, `types/{about,content,partners}.ts`, `docs/{homepage-static-spec.md,routes/{about,academy,community,partners}-spec.md,implementation-log.md}`                                                                                                                                                            | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA Home hero and the softened proof labels at 390px/tablet/desktop; confirm with client whether Partners should remain a form route or become contact/email-only in the next pass.                                                                                                                                                                                                                                                                   |
| 2026-06-19 | Cursor | **Combobox — country fields** — ported WardWise `cmdk` + Popover pattern as `ComboboxSelect` + `ComboboxFormField`. Added `content/countries.ts` (54 African countries + rest-of-world group, searchable, no Other). Wired country combobox on Partners inquiry, Become Partner dialog, Community application form + membership dialog. Removed `countryOther` from schemas, types, content, and review step (`getCountryLabel`). Sectors/roles stay on Select + Other.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `package.json`, `content/countries.ts`, `components/ui/{command,combobox-select}.tsx`, `components/shared/form-fields.tsx`, `schemas/{partners,community}.ts`, `content/{partners,community}.ts`, `types/{partners,community}.ts`, `components/{partners/{inquiry-form,become-partner-dialog},community/{application-form,membership-application-dialog,membership-application-review-step}}.tsx`, `docs/implementation-log.md`                                                                                                                                                         | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA country combobox on `/partners` inquiry + Become Partner + `/community` application + membership dialog — search, keyboard, validation, review labels. Then blog static pages.                                                                                                                                                                                                                                                                    |
| 2026-06-19 | Cursor | **Motion timing ownership (P1/P2)** — split sibling scroll triggers so component groups animate when they enter view, not when the section top does. **P1:** Voices (header / quote carousel / logo stagger), Stay Connected, Two Journeys, shared Testimonials. **P2:** un-nested `MotionFade`+`MotionStagger` in Benefits, Learning Opportunities, Target Participants, Opportunities, Member Stories. **Hero soften:** Academy Next Live image block — rise-only (`delay`), removed `scaleFrom={0.95}`. Logo cells in Voices: entrance only, no hover. Spec: timing ownership + interaction behavior rules in `docs/motion-spec.md`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `components/{partners/voices,home/{stay-connected,two-journeys},shared/{testimonials,benefits},academy/{learning-opportunities,target-participants,academy-hero-section},community/member-stories,partners/opportunities}-section.tsx`, `docs/motion-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                             | `pnpm format` (pending), `pnpm lint` (pending), `pnpm typecheck` (pending), `pnpm build` (pending)                                                                                                                                           | Complete                                                                                                                                                                                | Browser QA Partners Voices + Home Stay Connected / Two Journeys at scroll speed; confirm logos have no hover. Visual QA batch then combobox.                                                                                                                                                                                                                                                                                                                 |
| 2026-06-19 | Cursor | **Motion scroll-reveal sweep + Slice E review fixes** — unified section-band `MotionFade` across sections that previously only faded headers: Benefits (all consumers), Learning Opportunities / Participants / Listings, Who Should Join, Member Stories, Opportunities, Team, Advisors, Journey, Stay Connected social tiles, Voices (testimonial + logo grid), Community Preview chat column, Community apply banner. **Review fixes**: dialog footer submit `disabled={isSubmitting}` only (final step can click to surface validation); removed duplicate `"use client"` in stepper. Fixed JSX closures in `journey-section`, `team-section`, `member-stories-section`. Updated `docs/motion-spec.md` UX rhythm + card-grid table to match one-band default.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `components/shared/multi-step-dialog/{footer,stepper}.tsx`, `components/{about/{journey,team,advisors},academy/{learning-opportunities,target-participants,learning-listing},community/{who-should-join,member-stories,preview,community-apply-banner},partners/{opportunities,voices},shared/benefits-section,home/stay-connected-section}.tsx`, `docs/{motion-spec,implementation-log}.md`                                                                                                                                                                                            | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass), `git diff --check` (pass)                                                                                                                            | Complete                                                                                                                                                                                | Pause new motion. Browser visual QA: dialogs (step swap, stepper morph, submit validation UX), Academy sticky tabs, countdown tick, equal-height cards, reduced-motion at 390/tablet/desktop. Then combobox.                                                                                                                                                                                                                                                 |
| 2026-06-19 | Cursor | **Motion polish** — Academy Featured Event scroll reveal (header + card `scaleFrom={0.98}`); Academy hero Next Live overlay link hover affordance (border tint, lift, arrow, icon chip — removed `shadow-lg`). Filled scroll-reveal gaps: Home `PartnersSection` marquee band + `FeaturedArticlesSection` section fade. Documented **UX rhythm — scroll reveals** in `docs/motion-spec.md` (default section-band rule, when to stagger vs hover-only, CMS unrelated).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `components/academy/{academy-hero-section,featured-event-section}.tsx`, `components/shared/partners-section.tsx`, `components/home/featured-articles-section.tsx`, `docs/motion-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                  | `pnpm format` (pending), `pnpm lint` (pending), `pnpm typecheck` (pending), `pnpm build` (pending)                                                                                                                                           | Complete                                                                                                                                                                                | Browser QA scroll reveals on Home + Academy; confirm Next Live card reads as link on hover/focus.                                                                                                                                                                                                                                                                                                                                                            |
| 2026-06-19 | Cursor | **Motion pass Slice E** — bespoke surfaces + card-height fix. **Dialogs**: `MultiStepDialogShell` wraps step body in `AnimatePresence mode="wait"` (180ms enter / 120ms exit, `useReducedMotionSafe` instant fallback); stepper active ring morphs via `layoutId="stepper-active-indicator"` inside `LayoutGroup` (ring omitted under reduced motion); success panel scales in from `0.96` once. **Academy**: sticky tabs active pill morphs with `layoutId="academy-active-tab"`; featured countdown digits crossfade via `AnimatePresence` keyed on value (`tabular-nums` preserved). **Home hero**: mobile image container gets `scaleFrom={0.98}` settle. **Card heights**: restored equal-height Learning Opportunities row — `JumpSectionCard` now `h-full` + `flex-1` on description; `MotionStagger` child wrappers get `h-full` so grid stretch propagates (also helps What We Do + benefit/member-story grids). Lighthouse deferred per product decision.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `components/shared/{jump-section-card,motion/motion-stagger,multi-step-dialog/{shell,stepper,success-panel}}.tsx`, `components/academy/{academy-tabs-section,featured-event-section}.tsx`, `components/home/hero-section.tsx`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                             | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA: Academy tab pill morph + countdown tick; open Become Partner + Membership dialogs — step swap, stepper morph, success scale-in; confirm Learning Opportunities cards equal height at lg. Reduced-motion sweep. Lighthouse optional later.                                                                                                                                                                                                        |
| 2026-06-19 | Cursor | **Motion pass Slice D** — route-specific entrances for About → Academy → Community → Partners → Contact per `docs/motion-spec.md`. Extended `MotionFade` with optional `scaleFrom` for Academy NEXT LIVE card + Partners Africa composite. **About**: hero title fade, story copy fade, MVO three-card staggered delays, team/advisors header-only fades (orbit/journey untouched). **Academy**: hero title + delayed search + scale-in session card; Learning Opportunities + Participants `MotionStagger` grids; listings header fade only. **Community**: hero title + delayed avatar row (CTAs static); three-steps title + per-card fades; who-should-join header fade; preview copy-column fade + chat bubble `MotionStagger` (cap 5) + LIVE dot pulse only; member stories header fade + 4-card stagger (`h-full` on cards); application copy-column fade (form static). **Partners**: hero title fade + `scaleFrom={0.98}` Africa map reveal (CTAs/description static); opportunities header fade + stagger grid; voices testimonial column fade (logo grid + ring static); inquiry copy fade (form static). **Contact**: hero + reach-out copy fades; form card + map static. Slice E deferred: academy sticky-tab `layoutId`, countdown crossfade, dialog `AnimatePresence`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `components/shared/motion/motion-fade.tsx`, `components/about/{hero,story,mvo,team,advisors}-section.tsx`, `components/academy/{academy-hero,learning-opportunities,target-participants,learning-listing}-section.tsx`, `components/community/{hero,three-steps,who-should-join,preview,member-stories,application}-section.tsx`, `components/partners/{hero,opportunities,voices,inquiry}-section.tsx`, `components/contact/intro-section.tsx`, `docs/implementation-log.md`                                                                                                           | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA all six routes at 390 / tablet / 1440 — entrances once, no layout shift, reduced motion settled, FAQ accordion + benefit/member-story card heights. Capture Lighthouse baselines for `/`, `/about`, `/partners` before Slice E. Then Slice E: multi-step dialog step swap + academy bespoke surfaces.                                                                                                                                             |
| 2026-06-22 | Claude | **Motion pass Slice C** — shared sections motion pass. `CtaSection` content block wraps in `MotionFade` while decorative rings / sprout / tree / horizon lines stay static per spec ("decorative ring should not spin"). `FaqSection`, `TestimonialsSection`, `ApplyBanner` each get a single `MotionFade` wrapping the inner content — header + cards/accordion/carousel/CTA fade as one band so the CTA does not animate independently. `BenefitsSection` (consumed by Partners Why Partner + Community Why Join + Community Member Benefits) gets the first real `MotionStagger` use: split + stacked header layouts both wrap in `MotionFade`, the 6-card grid is wrapped in `MotionStagger` (default cap 6 — every benefit card animates). Added `h-full` to `BenefitCard`'s outer div so card heights still stretch evenly inside MotionStagger's per-child `motion.div` wrappers (the grid's `align-items: stretch` propagates through). Spec's "FAQ + CTA — global section fade-up" now ships across every consumer page without per-page wiring.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `components/shared/{cta,faq,testimonials,benefits}-section.tsx`, `components/shared/apply-banner.tsx`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser walk Home + Community + Partners + Contact — confirm shared section entrances feel cohesive, benefit-card grid heights stay even after MotionStagger wrap, FAQ accordion still toggles correctly inside the fade. Then start Slice D (route-specific sections: About → Academy → Community → Partners → Contact).                                                                                                                                    |
| 2026-06-22 | Claude | **Motion pass Slice B** — Home entrance pass against the spec. Hero: text column (eyebrow + h1 + description) fades up, mobile image gets a delayed fade, desktop stats card gets a delayed fade. CTAs deliberately stay static per spec ("CTA pair does not animate"). Desktop background hero image left untouched — it's the LCP. WhatWeDo, TwoJourneys, CoreFocus, AcademySpotlight got a single `MotionFade` wrapping the inner content per the spec's "section-level entrance fade only, no per-card stagger — the marquee and carousel carry the kinetic weight". StayConnected: only the eyebrow + h2 + description block fades; social tiles stay static per spec. Featured Articles intentionally skipped — spec says the existing hover lift carries it. Shared sections (Cta, Faq, Testimonials, Partners) deliberately untouched in this slice; they land in Slice C per Codex's "don't sweep shared too broadly before primitive validates on one full page". Also folded in three Slice A review notes: added `animation-delay: 0.01ms !important` to the global reduced-motion block so future delayed keyframe animations don't pause in their hidden state; swapped ImpactStatsSection's card-level `useReducedMotion` to `useReducedMotionSafe` for SSR consistency. MotionStagger `itemClassName` request not added — no consumer needs it yet, will address when first card-grid stagger surface needs `h-full` to keep heights even.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `app/globals.css`, `components/shared/impact-stats-section.tsx`, `components/home/{hero,what-we-do,two-journeys,core-focus,academy-spotlight,stay-connected}-section.tsx`                                                                                                                                                                                                                                                                                                                                                                                                               | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Capture Lighthouse baselines for `/`, `/about`, `/partners` if not done yet. Browser-walk Home at 390 / tablet / 1440 — confirm entrances fire once, no LCP regression on the hero. Then start Slice C (shared sections — `cta`, `faq`, `testimonials`, `apply-banner`, `benefits`).                                                                                                                                                                         |
| 2026-06-22 | Claude | **Motion pass Slice A** — landed the foundation before any per-section motion code. Added a global `prefers-reduced-motion` CSS rule in `app/globals.css` that nullifies `animation-duration` on `*` / `*::before` / `*::after` so every CSS-driven animation (Radix `animate-in/out`, our `marquee` + `orbit` keyframes, future libraries) collapses to instant under reduced motion. Deliberately left `transition-`\* alone so hover/focus colour shifts stay usable. Built the SSR-safe `useReducedMotionSafe` hook on top of `useSyncExternalStore` (avoids the React Compiler `set-state-in-effect` rule). Shipped three motion primitives under `components/shared/motion/`: `MotionFade` (entrance fade + rise via `whileInView once`), `MotionStagger` (parent-wraps API with the stagger cap enforced in the primitive itself — children past index `cap` render plain), and `MotionCountUp` (extracted intact from the inline logic in `impact-stats-section.tsx`). Refactored `impact-stats-section.tsx` to consume `MotionCountUp` — behaviour visually identical, just no longer duplicated. Per-section motion lands in Slices B–E. **Lighthouse baselines TODO**: capture `/`, `/about`, `/partners` scores in-browser and record here before Slice E runs the delta check.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `app/globals.css`, `hooks/use-reduced-motion-safe.ts`, `components/shared/motion/{motion-fade,motion-stagger,motion-count-up}.tsx`, `components/shared/impact-stats-section.tsx`, `docs/{motion-spec,implementation-log}.md`                                                                                                                                                                                                                                                                                                                                                            | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Capture Lighthouse baseline scores for `/`, `/about`, `/partners` in-browser and log here before Slice E. Start Slice B (Home entrance pass) when ready.                                                                                                                                                                                                                                                                                                     |
| 2026-06-20 | Claude | Added the four Next.js convention pages the site was missing: `app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx`, and `app/icon.svg` (file-convention brand mark mirroring vextra's pattern). Drafted `docs/routes/system-pages-spec.md` first — picks a quiet, on-brand voice (calm, no exclamation theatre), reuses `<EyebrowPill>` + `<ButtonLink>`, gives every system page three exits (Home / Community / Partners), and uses a single subtle decorative motif per page (`logo-mark.svg` watermark on 404, `lines-3.svg` on error). `global-error.tsx` ships inline-styled so it survives a root-layout crash. Spec carries a "Follow-up — per-route `not-found.tsx`" section noting scoped Academy/Blog/slug 404s arrive only when dynamic routes exist. Content lives in `content/system-pages.ts` so a Sanity migration is one query later. `lib/metadata.ts` OG/Twitter slot remains reserved until the share asset is exported; favicon left as-is (already a real multi-size .ico, not the Next default).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `app/{not-found,error,global-error}.tsx`, `app/icon.svg`, `content/system-pages.ts`, `types/system-pages.ts`, `docs/{design-system,implementation-log}.md`, `docs/routes/system-pages-spec.md`                                                                                                                                                                                                                                                                                                                                                                                          | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA: visit a bad URL to confirm 404 chrome; temporarily `throw` inside a server component to confirm `error.tsx` reset works; drop `app/apple-icon.png` (180×180 mark on leaf-100 padding) when ready; drop `app/opengraph-image.png` (1200×630) when share asset lands. Build out per-route `not-found.tsx` for Academy/Blog when slug routes ship.                                                                                                  |
| 2026-06-19 | Cursor | Implemented `/contact` against route spec: bespoke hero (split desktop / stacked mobile), reach-out + overlapping form card, map embed, shared FAQ + CTA. Hours/email/address/primary phone from `siteConfig`; secondary phone Contact-only. Added `schemas/contact.ts`, Contact-scoped social icons (WhatsApp, Telegram).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `components/contact/*`, `app/contact/page.tsx`, `content/contact.ts`, `schemas/contact.ts`, `types/contact.ts`, `components/shared/faq-section.tsx`, `lib/placeholder-images.ts`, `docs/routes/contact-spec.md`                                                                                                                                                                                                                                                                                                                                                                         | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA `/contact` at 390px / tablet / 1440px; wire social hrefs when URLs confirmed.                                                                                                                                                                                                                                                                                                                                                                     |
| 2026-06-19 | Cursor | Polished Community Preview chat mockup; added 3-step `MembershipApplicationDialog` (About you / Your work / Review + success next-steps), wired hero + apply-banner triggers, split dialog vs inline schemas, documented in `community-membership-dialog-spec.md`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `components/community/{preview-section,membership-application-dialog,membership-application-review-step,hero-actions,community-apply-banner}.tsx`, `components/shared/multi-step-dialog/success-panel.tsx`, `schemas/community.ts`, `content/community.ts`, `types/community.ts`, `docs/routes/{community-spec,community-membership-dialog-spec}.md`                                                                                                                                                                                                                                    | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Optional: wire bottom CTA to dialog; supply Telegram URL.                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2026-06-19 | Cursor | Documented Contact page from supplied screenshots (`contact-spec.md`); added decorative ring guidance + `darkPanelDashedRingClass` preset to design system; deduped Stay Connected and Three Steps ring classes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `components/ui/decorative-ring.tsx`, `components/home/stay-connected-section.tsx`, `components/community/three-steps-section.tsx`, `docs/{design-system,implementation-log}.md`, `docs/routes/contact-spec.md`                                                                                                                                                                                                                                                                                                                                                                          | docs only (no build)                                                                                                                                                                                                                         | Complete                                                                                                                                                                                | Implement `/contact` against `contact-spec.md`; confirm mobile hero/form layout when mobile screenshot supplied.                                                                                                                                                                                                                                                                                                                                             |
| 2026-06-19 | Cursor | Polished Community card hovers (Why Join, Member Benefits, Who Should Join, Member Stories) to match Partners-style interactions; extracted shared `DashedDecorativeRing` from Stay Connected for the Three Steps panel; equalized step card heights on desktop. Updated Notion dev notes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `components/ui/decorative-ring.tsx`, `components/home/stay-connected-section.tsx`, `components/community/{three-steps,who-should-join,member-stories,why-join,member-benefits}-section.tsx`, `components/shared/benefits-section.tsx`, `docs/routes/community-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                    | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass)                                                                                                                                                                            | Complete                                                                                                                                                                                | Browser QA Three Steps equal heights at lg; confirm dashed ring placement matches Stay Connected.                                                                                                                                                                                                                                                                                                                                                            |
| 2026-06-19 | Cursor | Finished `/community` sections 2–12 against the supplied screenshots and route spec. Promoted `BenefitsSection` to shared (`chipShape`, `headerLayout`, `interactive`) with a thin Partners wrapper; added shared `ApplyBanner`. Built Why Join, Three Steps, Who Should Join, Member Benefits, Community Preview (chat mockup + channel chips), Member Stories (4 placeholder stories), and Membership Application (RHF + Zod, partners option reuse, simulated success). Wired shared FAQ + CTA with community content; repointed site-wide `#join` anchors to `#membership-application`; removed the interim join scaffold. Telegram channel href left undefined with a TODO until the live URL is supplied.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `components/shared/{benefits-section,apply-banner}.tsx`, `components/community/{why-join,three-steps,who-should-join,member-benefits,preview,member-stories,application-section,application-form}.tsx`, `components/partners/benefits-section.tsx`, `content/community.ts`, `types/{content,community,partners}.ts`, `schemas/community.ts`, `app/community/page.tsx`, `content/{home,about}.ts`, `components/layout/{header,mobile-nav}.tsx`, `docs/routes/community-spec.md`, `docs/implementation-log.md`                                                                            | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA `/community` at 390px / tablet / 1440px; supply Telegram URL in content when confirmed; tick Community items in Notion dev notes manually (Notion MCP not authenticated).                                                                                                                                                                                                                                                                         |
| 2026-06-19 | Codex  | Refactored the Partners form/dialog mechanics into shared, CMS-ready boundaries. Added root `schemas/` ownership for Zod/runtime validation, schema-derived form value types, defaults, and Become Partner step maps. Added shared RHF wrappers for repeated text/select/textarea/phone/checkbox-group fields, plus shared multi-step dialog shell, stepper, heading, footer, and success panel. Updated the inline inquiry form and Become Partner dialog to consume those shared modules while leaving Partners-specific copy and step bodies in the Partners page folder. Documented the `schemas/` vs `types/` vs `content/` rule and the shared-dialog reuse rule.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `schemas/{constants,fields,partners}.ts`, `components/shared/form-fields.tsx`, `components/shared/multi-step-dialog/*`, `components/partners/{inquiry-form,become-partner-dialog}.tsx`, `content/partners.ts`, `README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/{design-system,file-structure-proposal,implementation-log}.md`, `docs/routes/partners-spec.md`                                                                                                                                                                                                                              | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser/manual QA remains: exercise inline inquiry and Become Partner dialog validation, step navigation, success state, and close/reset behaviour when browser use is allowed.                                                                                                                                                                                                                                                                              |
| 2026-06-18 | Codex  | Reviewed the Claude-built Partners page changes and fixed the Benefits/Why Partner card icon state. The first card had `tone: "solid"` in content, which made its icon chip render in the active tangerine state before hover. Removed that special-case tone from the content/type/component and updated the Partners spec so all benefit icon chips stay inactive until card hover.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `components/partners/benefits-section.tsx`, `content/partners.ts`, `types/partners.ts`, `docs/routes/partners-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                    | `pnpm exec prettier --write components/partners/benefits-section.tsx content/partners.ts types/partners.ts docs/routes/partners-spec.md docs/implementation-log.md` (pass), `pnpm typecheck` (pass), `pnpm lint` (pass), `pnpm build` (pass) | Complete                                                                                                                                                                                | Continue route QA for `/partners` at desktop, tablet, and 390px when browser QA is allowed.                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-06-18 | Claude | Built Partners sections 2-8 against the supplied Figma screenshots. Added four new shadcn-style UI primitives (`form.tsx` wrapping `react-hook-form`, `select.tsx` wrapping Radix Select, `textarea.tsx`, `phone-input.tsx` wrapping `react-phone-number-input`). New deps: `react-hook-form`, `zod`, `@hookform/resolvers`, `react-phone-number-input` — phone library CSS imported in `phone-input.tsx`, with project-token overrides appended to `globals.css`. Refactored shared `<ImpactStatsSection>` and `<CtaSection>` to neutral-types-with-defaults (Home/About consumers unchanged). New Partners sections: `WhyPartnerSection` (6-card grid, first card solid tangerine chip), `PartnerVoicesSection` (testimonial + 3×4 logo grid + tangerine DecorativeRing top-right), `PartnershipOpportunitiesSection` (leaf-subtle outer panel + 6 forest-chip cards), `PartnershipInquirySection` + `PartnershipInquiryForm` (RHF + zod, phone defaults to NG, simulated 800ms latency → local success card, no backend call). Anchor migration site-wide: `#partner` → `#partnership-enquiry` (home content, header, mobile-nav). Deleted obsolete `components/partners/partner-section.tsx` and `partnersPageContent.partner`. CTA on Partners overrides to a single tangerine "Partner with us" button targeting the inquiry section. Project radius cap (`rounded-xl`) observed throughout — opportunities outer panel uses `rounded-xl` rather than the figma's larger curve per CLAUDE.md rule. Spec doc updated with implementation-status table and a "Files removed" note.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `package.json`, `pnpm-lock.yaml`, `components/ui/{form,select,textarea,phone-input}.tsx`, `components/shared/{impact-stats,cta}-section.tsx`, `components/partners/{why-partner,partner-voices,partnership-opportunities,partnership-inquiry,partnership-inquiry-form}-section.tsx`, `components/partners/partner-section.tsx` (deleted), `content/{partners,home}.ts`, `types/{content,partners}.ts`, `components/layout/{header,mobile-nav}.tsx`, `app/partners/page.tsx`, `app/globals.css`, `docs/routes/partners-spec.md`, `docs/implementation-log.md`                            | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA `/partners` end-to-end at desktop, tablet, and 390px: walk every section, drive the form happy path and error states (empty fields, invalid email, invalid phone "123"), confirm submit shows success card after ~800ms. Then capture modal/dialog screenshots and start the modal pass. Animation/motion polish is a separate plan after static UI approval.                                                                                     |
| 2026-06-18 | Codex  | Reworked the Partners hero map after the separate north-map and Madagascar SVG layers proved too fragile in the responsive hero. Baked the Africa photo mask, north backdrop, and Madagascar accent into one composite WebP, simplified the hero map component to render that single asset, kept the stat card as live UI, and verified the hero at desktop, tablet, and 390px with no horizontal overflow.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `components/partners/partners-africa-map.tsx`, `components/partners/hero-section.tsx`, `content/partners.ts`, `types/partners.ts`, `public/images/partners/partners-map-composite.webp`, `docs/routes/partners-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                   | `pnpm exec prettier --write ...` (pass), `pnpm typecheck` (pass), browser QA `/partners` hero                                                                                                                                                | Complete                                                                                                                                                                                | Continue building the remaining Partners sections from the route spec; run full-route QA once those sections exist.                                                                                                                                                                                                                                                                                                                                          |
| 2026-06-18 | Codex  | Replaced the temporary Partners route notes with a screenshot-driven Partners target spec. Documented the bespoke hero, why-partner cards, partnership impact stats, partner testimonial/logo section, partnership opportunities panel, static enquiry form, FAQ reuse, final CTA, mobile/tablet decisions, copy confirmations, and implementation notes for Cursor/Claude. No Partners UI implementation was carried forward in this pass.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `docs/routes/partners-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `pnpm exec prettier --write docs/routes/partners-spec.md docs/implementation-log.md` (pass)                                                                                                                                                  | Complete                                                                                                                                                                                | Cursor/Claude can implement `/partners` against the screenshots and this spec; confirm the partner form's member/community wording before coding that section.                                                                                                                                                                                                                                                                                               |
| 2026-06-18 | Claude | **Note for Codex**: Renamed the Academy "Insights" category to `blog` across code, routes, anchors, and types — visible label inside the Academy page is "Blog" (tab, eyebrow, Opportunities card), and the global navbar Academy dropdown + footer Academy column now say "Blog/Insights" (descriptive hover-target wording kept for navigation surfaces). Why: (1) `/academy/blog` is a higher-volume search query than `/academy/insights` — free SEO win on the future listing route, (2) one-syllable "Blog" reads truer to the actual content mix (how-to + analysis + commentary) than the more corporate "Insights" — overpromising deep thought leadership creates expectation drift, (3) the Figma was already hedging with "Blog / insights" / "Blog Insights" eyebrow, so we committed to one in code and kept "Blog/Insights" as the descriptive nav label. Done while the rename was cheap (placeholder data, no published URLs). Renames: `AcademyInsight` → `AcademyArticle`, `AcademyInsightCategory` → `AcademyArticleCategory`, `academyContent.insights` → `academyContent.blog`, `academyHomePreview.insights` → `academyHomePreview.blog`, `insightToneByCategory` → `articleToneByCategory`, `insightCategoryToneMap` → `articleCategoryToneMap`, anchor `#insights` → `#blog`, future route `/academy/insights` → `/academy/blog`, slug prefix `placeholder-slug-insight-N` → `placeholder-slug-article-N`. Section/file structure unchanged; the spec doc's Taxonomy section now carries a "Naming rule" subsection explaining the code-vs-nav split so future agents don't reintroduce "insights" anchors. Body-copy English uses of the word "insights" (e.g. "data-driven insights" in About vision text) were deliberately left alone — they're prose, not category references.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `types/academy.ts`, `content/academy.ts`, `content/navigation.ts`, `content/site.ts`, `app/academy/page.tsx`, `components/home/featured-articles-section.tsx`, `docs/routes/academy-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                              | `pnpm typecheck` (pass), `pnpm lint` (pass), `pnpm build` (pass), `pnpm exec prettier --write` (pass)                                                                                                                                        | Complete                                                                                                                                                                                | When the dedicated listing route is built next phase, use `/academy/blog` not `/academy/insights`; restore the navbar dropdown child from anchor to route as `{ label: "Blog/Insights", href: "/academy/blog" }`.                                                                                                                                                                                                                                            |
| 2026-06-18 | Codex  | Audited live UI radius usage after the new radius cap decision. Replaced oversized Tailwind radius utilities and custom radii above the `xl` scale with `rounded-xl`; kept `rounded-full` only for true circular/pill elements and left the tooltip arrow's tiny corner radius unchanged. Also updated affected specs so future implementations reference `rounded-xl` instead of oversized custom radii.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `app/{community,partners}/page.tsx`, `components/{about,academy,home,layout,shared}/**/*.tsx`, `AGENTS.md`, `CLAUDE.md`, `docs/{design-system,layout-system,implementation-log,routes/academy-spec,shared/content-card-spec}.md`                                                                                                                                                                                                                                                                                                                                                        | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA affected surfaces at desktop and 390px when local browser use is allowed, since the sharper radius changes are visual.                                                                                                                                                                                                                                                                                                                            |
| 2026-06-18 | Claude | Reworked the Academy hub UI after the previous pass missed key Figma sections. Rebuilt `<AcademyHeroSection>` with the split title `{ lead, accent, trail }` shape (green "Innovate & Grow" accent), compound search input (dropdown category selector + input + dark forest button), tangerine `DecorativeRing` overlay, "Trusted by 8,400+ learners…" trust row, and a floating "NEXT LIVE SESSION" card on the image — removed the in-hero four-card tab strip in the process. Added three new sections: `<AcademyTabsSection>` (sticky `top-0` pill nav with passive scroll-spy via a 35%-viewport reading line, mobile horizontal scroll), `<FeaturedEventSection>` (split image+content card with leaf/forest pills, icon list, live Days/Hours/Minutes/Seconds countdown in `bg-forest-900` cards using `tabular-nums` — first tick deferred via `setTimeout(tick, 0)` to bypass `react-hooks/set-state-in-effect`), and `<LearningOpportunitiesSection>` (centered eyebrow + h2 + 4-card grid with data-driven `iconTone: "leaf"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | "tangerine"`). Updated `content/academy.ts` with new shapes (`hero.title.{lead,accent,trail}`, `hero.searchCategories`, `hero.nextLive`, `tabs[]`, `featuredEvent`, `opportunities`). Updated `app/academy/page.tsx`to render Hero → Tabs → Featured Event → Opportunities → Participants → listings → Testimonials → FAQ → CTA in that order. Updated`docs/routes/academy-spec.md`to document all four new/changed sections, the sticky-header`scroll-mt` offset rule, the countdown hydration pattern, and the new checklist items.                                                   | `components/academy/{academy-hero,academy-tabs,featured-event,learning-opportunities}-section.tsx`, `content/academy.ts`, `app/academy/page.tsx`, `docs/routes/academy-spec.md`, `docs/implementation-log.md`                                | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                  | Complete                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Browser QA `/academy` end-to-end at desktop and 390px: confirm sticky tabs + sticky header don't double-cover section titles when anchor-jumping, verify the countdown ticks smoothly without SSR/client mismatch flicker, and check the decorative ring + NEXT LIVE SESSION card placement at `lg:`. |
| 2026-06-18 | Codex  | Closed the Academy review fixes: removed remaining live links to unbuilt `/academy/{type}` routes from Home/footer/blog CTAs, moved About and Academy page-domain contracts into `types/about.ts` and `types/academy.ts`, added the Academy-owned `academyHomePreview` projection so Home renders simple preview cards without duplicating or transforming Academy internals, changed the Academy CTA to non-overlap mode, offset sticky Academy tabs below the sticky header, made the featured-event countdown hydrate from a stable zero state before client ticking, and added mock search feedback using the shared spinner. Documented the general source-domain preview rule for future cross-page sections.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `app/academy/page.tsx`, `components/academy/{academy-hero,academy-hero-search,academy-tabs,featured-event,learning-listing,learning-opportunities,target-participants}-section.tsx`, `components/about/{advisors,ecosystem-orbit,impact-stats,journey,team}-section.tsx`, `components/home/{academy-spotlight,featured-articles,what-we-do}-section.tsx`, `content/{academy,about,home,navigation,site}.ts`, `types/{about,academy,content}.ts`, `AGENTS.md`, `CLAUDE.md`, `docs/{design-system,routes/academy-spec,shared/navbar-spec,implementation-log}.md`                          | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA `/academy` and the Home Academy preview sections at desktop, tablet, and 390px once local browser use is allowed.                                                                                                                                                                                                                                                                                                                                 |
| 2026-06-17 | Claude | Built the Academy hub `/academy` against the supplied Figma frame after a Codex-reviewed plan. Added a bespoke `<AcademyHeroSection>` (eyebrow + h1 + body + search bar + learner trust row + right-side image with overlaid next-live-session card + 4-card category tab strip), a `<TargetParticipantsSection>` (3×3 audience grid), and a reusable `<LearningListingSection>` that drives the Webinars & Events / Courses / Insights bands via a single component. Rewrote `content/academy.ts` with CMS-ready typed data (`AcademyHeroContent`, `AcademyScheduledItem`, `AcademyCourse`, `AcademyInsight`, plus participant + category icon unions). Refactored `<TestimonialsSection>` and `<FaqSection>` to accept their data via neutral `TestimonialItem` / `FaqItem` / `FaqCategory` props (`types/content.ts`) with home defaults preserved. Fixed the navbar Academy dropdown's previously-404ing children to point at hub anchors (`/academy#webinars-events`, `/academy#courses`, `/academy#insights`) until the dedicated listing routes are built. Shipped "View More" buttons as disabled controls (no `href`) to avoid dead-link UX. Three Codex P2 polish fixes from earlier in the session also landed: about-page social `"#"` placeholders → `undefined`, the story play-button → decorative `<span>`, and an about-spec note flagging placeholder copy/stats.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `app/academy/page.tsx`, `components/academy/{academy-hero,target-participants,learning-listing}-section.tsx`, `components/shared/{testimonials,faq}-section.tsx`, `content/{academy,navigation,home,about}.ts`, `types/content.ts`, `components/about/story-section.tsx`, `docs/routes/{about,academy}-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                           | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA `/academy` end-to-end at desktop and 390px. Next phase: build the four dedicated listing routes (`/academy/{webinars,events,courses,insights}`) + slug pages with `generateStaticParams`/`notFound()`, restore navbar children to those routes, and flip View More controls to live `<Link>` per call site.                                                                                                                                       |
| 2026-06-17 | Codex  | Re-aligned Home to the June 17 screenshots: moved Partners directly under Hero with standard section rhythm, converted Academy spotlight to the shared image-led `<ContentCard />` four-card layout, added the dark Stay Connected social module, and gave the shared CTA a non-overlap mode for Home. Documented the new Home source of truth, the content-card consumer update, partner placement modes, and the no-fake-social-URLs rule.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `app/page.tsx`, `app/about/page.tsx`, `components/home/{academy-spotlight,stay-connected}-section.tsx`, `components/shared/{cta,partners}-section.tsx`, `content/home.ts`, `lib/placeholder-images.ts`, `docs/{homepage-static-spec,shared/content-card-spec,shared/partners-spec,implementation-log}.md`                                                                                                                                                                                                                                                                               | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Visual QA Home against the shared screenshots at desktop, tablet, and 390px once local browser use is allowed; replace social placeholders when final channel URLs are confirmed.                                                                                                                                                                                                                                                                            |
| 2026-06-17 | Claude | Built out the remaining eight About sections (Story, Mission/Vision/Objective, Impact stats, Journey, Team carousel, Advisors grid, plus reused CTA + Partners) against the supplied Figma frame. Introduced `motion/react` as a scoped dependency — used **only** in the Journey section for sticky scroll-jacked image cross-fades and active-milestone detection via `useInView`. Extended `content/about.ts` with CMS-shaped data (`AboutStory`, `AboutJourney`, `AboutTeam`, `AboutAdvisors` types exported) and added an `about` namespace to `lib/placeholder-images.ts`. Updated the spec doc to document each section's composition and the motion-scope rule (don't extend `motion/react` to other sections without specific UX justification). Also simplified `<ContentCard>` props in the same session: nested `primaryTag`/`secondaryTag` objects flattened to `category`/`categoryTone`/`meta`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `package.json`, `pnpm-lock.yaml`, `components/about/{story,mvo,impact-stats,journey,team,advisors}-section.tsx`, `app/about/page.tsx`, `content/about.ts`, `lib/placeholder-images.ts`, `components/shared/content-card.tsx`, `components/home/featured-articles-section.tsx`, `docs/{routes/about-spec,shared/content-card-spec,implementation-log}.md`                                                                                                                                                                                                                                | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA `/about` end-to-end: scroll through Journey at desktop width to confirm cross-fades; swipe Team carousel on mobile; verify Advisors photo-top stack on phones. Then start the Academy spec next.                                                                                                                                                                                                                                                  |
| 2026-06-16 | Cursor | Built the Community hero to match Figma node `25:8893`: two-column layout with membership eyebrow pill, split serif title, dual CTAs, shadcn avatar stack social proof, and a labeled-chip membership orbit reusing the shared orbit primitives. Added content-driven orbit config, community icon map, exported Africa mark asset, and replaced the generic `PageHero` on `/community`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `components/community/{hero-section,membership-orbit}.tsx`, `content/community.ts`, `types/content.ts`, `lib/{community-orbit-icons,placeholder-images}.ts`, `app/community/page.tsx`, `public/images/community/africa-mark.png`, `docs/routes/community-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                         | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA `/community` at desktop and 390px; tune orbit chip angles if any labels collide.                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-06-16 | Claude | Closed out the homepage milestone with a unified `<ContentCard>` primitive that the Featured Articles section now consumes — same image-led shape the upcoming Academy Courses / Webinars & Events / Articles surfaces will reuse. Reshaped the `homeContent.articles` data into a CMS-ready (`category`, `readTime`, `title`, `description`, `image`, `href`) shape with exported `HomeArticle` / `HomeArticleCategory` types so Sanity can bind directly later. Also quieted the Next.js partner-logo aspect-ratio warning with an inline `style={{ width: "auto" }}` (no visual change) and wrote `docs/shared/content-card-spec.md` documenting anatomy, props, and the four intended consumers. motion/react remains deferred — homepage is ready for client review.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `components/shared/content-card.tsx`, `components/home/featured-articles-section.tsx`, `content/home.ts`, `components/shared/partner-logo.tsx`, `docs/shared/content-card-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                        | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Use `<ContentCard>` when building the Academy page (Courses, Webinars & Events, Articles); start the dedicated `academy-spec.md` for that phase next.                                                                                                                                                                                                                                                                                                        |
| 2026-06-16 | Claude | Replaced the placeholder partners grid with a shared CSS-only marquee that the homepage and `/partners` page now both consume. Ported the q-das `<Marquee />` primitive (custom-property driven, pause-on-hover, optional reverse/vertical) into `components/ui/`, registered the `marquee` / `marquee-vertical` keyframes plus `--animate-marquee*` tokens in `app/globals.css`, added a `prefers-reduced-motion` fallback, introduced a typed `partnersList` in `content/partners.ts` so adding/removing logos is a one-line edit, and wrote a `partners-spec.md` covering the CMS migration path.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `components/ui/marquee.tsx`, `app/globals.css`, `content/partners.ts`, `components/shared/partners-section.tsx`, `app/partners/page.tsx`, `docs/shared/partners-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                  | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Browser QA the marquee on home and `/partners`, then swap the temporary partner logos with finalized brand artwork as they arrive.                                                                                                                                                                                                                                                                                                                           |
| 2026-06-16 | Codex  | Fixed the tablet navbar overlap by moving the full desktop primary nav, Partner text CTA, and full Join button from the `md` breakpoint to `xl`. Tablets now keep the utility bar but use the compact primary bar with logo, short Join button, and hamburger sheet, preventing nav/CTA collision around iPad widths. Documented the corrected breakpoint rule in the navbar spec.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `components/layout/header.tsx`, `components/layout/mobile-nav.tsx`, `docs/shared/navbar-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Visually confirm the compact tablet header at the reported viewport, then keep full desktop nav reserved for `xl+`.                                                                                                                                                                                                                                                                                                                                          |
| 2026-06-16 | Codex  | Tightened Home mobile responsiveness across the shared and Home-specific sections without changing the desktop direction. Reduced default mobile section padding, made the CTA use a phone-specific content/decorative composition, collapsed Academy event cards into compact mobile rows, improved carousel gutters/card density, changed FAQ category tabs into a horizontal mobile rail, and documented that desktop screenshot work must include mobile and tablet layout decisions in the same pass.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `AGENTS.md`, `components/academy/academy-event-card.tsx`, `components/home/{academy-spotlight,core-focus,featured-articles,two-journeys,what-we-do}-section.tsx`, `components/home/core-focus-card.tsx`, `components/shared/{cta,faq,partners,testimonials}-section.tsx`, `docs/{homepage-static-spec,layout-system,implementation-log}.md`                                                                                                                                                                                                                                             | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Review the Home page on an actual 390px device/browser viewport, then continue with the next page once mobile spacing and section flow feel approved.                                                                                                                                                                                                                                                                                                        |
| 2026-06-16 | Codex  | Reviewed the current Home/About/shared-section diff after the latest UI changes, confirmed that the approved direction is back to the shared Embla-based carousel primitive for Core Focus, and updated the Home spec so future agents do not replace it with the earlier native-scroll rail approach. Also repaired the implementation-log table so the handoff doc stays readable.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `docs/homepage-static-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                                             | Complete                                                                                                                                                                                | Continue the next Home UI section polish pass on top of the current Embla carousel direction.                                                                                                                                                                                                                                                                                                                                                                |
| 2026-06-15 | Cursor | Tightened the About hero against the approved Figma screenshot after the first pass landed too loose. Reworked the title into three explicit lines with forest green only on the middle phrase, rebuilt the mac-style browser mockup with a pill URL bar and stronger shadow, rescale the orbit layout to a 600px grid column, retuned icon positions/radii/dots to match the reference orbit art, and softened badge/ring styling to the mint and peach tints from the design.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `components/about/{hero-section,ecosystem-orbit,orbit-icon-badge}.tsx`, `components/shared/browser-mockup.tsx`, `components/ui/orbiting-circles.tsx`, `content/about.ts`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                  | `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                                             | Complete                                                                                                                                                                                | Grant Figma view access for node `147:2626` if pixel-level diffs remain, then continue with the next About placeholder sections.                                                                                                                                                                                                                                                                                                                             |
| 2026-06-15 | Codex  | Normalized the Tailwind v4 semantic color bridge and removed direct CSS-variable color utilities from route and component JSX. Replaced awkward or mixed arbitrary-variable forms with `bg-subtle`, `bg-panel`, `text-fg-muted`, `text-fg-subtle`, brand-subtle utilities, and standard shadcn `border-border`/`bg-border`. Documented the rule for future agents while preserving the existing visual values.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `app/globals.css`, `app/{academy,community,partners}/page.tsx`, `components/{home,layout,ui}/**`, `AGENTS.md`, `docs/{design-system,implementation-log}.md`                                                                                                                                                                                                                                                                                                                                                                                                                             | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Keep new JSX on registered Tailwind semantic utilities; use direct CSS variables only in CSS or third-party configuration objects where classes cannot apply.                                                                                                                                                                                                                                                                                                |
| 2026-06-15 | Codex  | Kept the approved Two Journeys composition static and upgraded the Core Focus strip from a plain overflow row with three hard-coded dots to a shadcn-style Embla carousel. Extracted the repeated Home-specific focus card, connected pagination count and active state to Embla's real snap list, made dots clickable and accessible, retained touch dragging and arrow-key navigation, and added a restrained card-image hover without changing the approved section structure.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `components/home/{focus-area-card,value-chains-carousel,value-chains-section}.tsx`, `components/ui/{carousel,carousel-dots}.tsx`, `package.json`, `pnpm-lock.yaml`, `docs/{homepage-static-spec,implementation-log}.md`                                                                                                                                                                                                                                                                                                                                                                 | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Visually confirm the Core Focus snap rhythm and dynamic dot count at desktop and 390px, then continue with the next Home section.                                                                                                                                                                                                                                                                                                                            |
| 2026-06-15 | Codex  | Added a reusable eyebrow-pill component for repeated hero-style pills, switched the Home hero to the provided local public image, moved the remaining hero/about copy and CTA targets deeper into `content/home.ts`, and aligned the Home journey CTAs with the newer action-anchor destinations on the Community and Partners pages. Kept the original what-we-do layout and corrected the capability-icon behavior so the green state appears on hover instead of looking active by default.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `components/{home/{hero,about}-section,layout/page-hero,ui/eyebrow-pill}.tsx`, `content/{home,about,academy,community,contact,partners}.ts`, `types/content.ts`, `lib/placeholder-images.ts`, `docs/{homepage-static-spec,implementation-log}.md`                                                                                                                                                                                                                                                                                                                                       | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Review the updated Home hero and what-we-do section visually before moving to the next Home section polish pass.                                                                                                                                                                                                                                                                                                                                             |
| 2026-06-15 | Codex  | Expanded the shared public-page gutter rhythm from the earlier two-step layout to `px-4 sm:px-6 lg:px-8 xl:px-10`, then rebuilt the footer against the supplied screenshot. Moved footer copy, address data, link groups, newsletter placeholder content, and legal placeholders into `content/site.ts`, rendered design-only items as honest non-interactive placeholders instead of dead links, and kept the newsletter signup as UI-only with a TODO for later integration.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `AGENTS.md`, `docs/{layout-system,shared/footer-spec,implementation-log}.md`, `types/site.ts`, `content/site.ts`, `components/layout/footer.tsx`, `components/layout/header.tsx`, `components/layout/page-hero.tsx`, `app/{academy,community,partners}/page.tsx`, `components/home/{about,cta,ecosystem,faq,hero,ideas,news,partners,testimonials,value-chains}-section.tsx`                                                                                                                                                                                                            | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Review the footer at desktop and 390px widths, then carry the same tightened rhythm into the next Home-section fidelity pass.                                                                                                                                                                                                                                                                                                                                |
| 2026-06-15 | Codex  | Split navbar overview-vs-action intent so the global CTAs no longer duplicate the plain nav destinations. Pointed `Join our community` to `/community#join` and `Partner with us` to `/partners#partner`, then added real action-anchor sections on the Community and Partners scaffolds with static next-step copy and direct email/contact actions while fuller membership and partner flows are still deferred.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `app/{community,partners}/page.tsx`, `components/layout/{header,mobile-nav}.tsx`, `content/{community,partners}.ts`, `types/content.ts`, `docs/{shared/navbar-spec,implementation-log}.md`                                                                                                                                                                                                                                                                                                                                                                                              | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Move on to footer UX next, keeping the same rule: overview links stay informational while footer CTAs should point to distinct action states or sections.                                                                                                                                                                                                                                                                                                    |
| 2026-06-15 | Codex  | Documented the agreed layout-ownership rule after the baseline refactor: page and section boundaries own `mx-auto w-full max-w-8xl px-4 md:px-6`, while reusable UI primitives inherit width from their parent and should not hide page-width constraints. This locks the repo into a visible, shallow layout pattern before the next navbar and Home UX pass.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `AGENTS.md`, `docs/{layout-system,implementation-log}.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Review navbar CTA intent next so navigation labels and conversion actions do not collapse into redundant same-destination links.                                                                                                                                                                                                                                                                                                                             |
| 2026-06-15 | Codex  | Replaced the shared `Container` wrapper with the agreed inline public-layout baseline so the structure stays visible in JSX while we build the six-page marketing site. Added a custom Tailwind v4 `max-w-8xl` width token in `app/globals.css`, switched shared chrome and current public sections to `mx-auto w-full max-w-8xl px-4 md:px-6`, updated the layout rules doc to make that string the default, and removed `components/ui/container.tsx`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `app/globals.css`, `app/academy/page.tsx`, `components/home/{about,cta,ecosystem,faq,hero,ideas,news,partners,testimonials,value-chains}-section.tsx`, `components/layout/{footer,header,page-hero}.tsx`, `components/ui/container.tsx`, `docs/{layout-system,implementation-log}.md`                                                                                                                                                                                                                                                                                                   | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Continue the next Home/UI fidelity phase on top of the inline `max-w-8xl px-4 md:px-6` baseline instead of reintroducing a container primitive.                                                                                                                                                                                                                                                                                                              |
| 2026-06-14 | Claude | Rebuilt the mobile nav against the approved Academy/menu-open screenshot. Switched the sheet to a full-screen top-down layout (`side="top"`, `h-dvh`), replaced the bordered close button with a plain `X`, dropped Academy child descriptions, added a leaf-100 active-child pill, swapped the CTA block to a no-icon `Join our community` pill plus a centered `Partner with us` text link, and trimmed the footer to email + phone (hours and social now live only on the desktop utility bar). Kept Radix Dialog for dismiss/ESC/scroll-lock instead of a custom click-outside hook.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `components/layout/mobile-nav.tsx`, `docs/shared/navbar-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                                             | Complete                                                                                                                                                                                | Browser QA on 360px and 390px viewports, then capture the Academy desktop dropdown reference for final sign-off.                                                                                                                                                                                                                                                                                                                                             |
| 2026-06-14 | Cursor | Synced the navbar spec to the current implementation: `md` breakpoint split, three-column grid with `justify-evenly` nav spacing, underline under link text, soft leaf focus/open highlight on Academy, inline social placeholders via `social-icon.tsx`, hash-aware Academy child active state, scroll border tweak, and mobile sheet structure with accordion Academy + Partner-before-Join CTA order.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `docs/shared/navbar-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | —                                                                                                                                                                                                                                            | Complete                                                                                                                                                                                | Capture approved mobile and Academy screenshots, then close the remaining navbar checklist items.                                                                                                                                                                                                                                                                                                                                                            |
| 2026-06-14 | Cursor | Polished the shared navbar after desktop fidelity work: switched desktop/mobile split to `md`, replaced absolute nav centering with a grid layout, improved link spacing, replaced the offset focus ring with a soft leaf highlight, kept social placeholders visible with per-surface inline rendering, simplified the Academy dropdown to label-only items, and added `useRouteHash`, `useScrolled`, and `useClickOutside` for active-state, scroll, and mobile dismiss behavior.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `components/layout/{header,mobile-nav,footer,social-icon}.tsx`, `hooks/{use-route-hash,use-scrolled,use-click-outside}.ts`, `content/site.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                           | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass)                                                                                                                                                                            | Complete                                                                                                                                                                                | Sync navbar docs to code, then capture mobile screenshot sign-off.                                                                                                                                                                                                                                                                                                                                                                                           |
| 2026-06-14 | Cursor | Retouched the shared navbar against the approved desktop screenshot. Centered the main nav with an absolute layout so links no longer wrap, aligned the orange active underline to the bar edge, tightened utility-bar and primary-bar heights, switched the primary CTA to a pill with `UserPlus`, kept `Partner with us` as a text link, and added a compact tablet CTA for the `lg`-`xl` range while the full desktop nav stays at `xl+`. Superseded by later grid, `md` breakpoint, and spacing polish above.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `components/layout/{header,mobile-nav,site-logo}.tsx`, `docs/shared/navbar-spec.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | pending                                                                                                                                                                                                                                      | Complete                                                                                                                                                                                | Review desktop fidelity in the browser, then capture the approved mobile navbar screenshot before further sheet polish.                                                                                                                                                                                                                                                                                                                                      |
| 2026-06-14 | Codex  | Started the navbar implementation against the approved desktop screenshot. Moved the shared logo to the real public image asset, removed the old TSX logo under `components/icons`, added hours and social-link data to `content/site.ts`, kept social rendering local to each surface, and refreshed the navbar/footer docs so logo ownership and top-bar content are now explicit before deeper page work continues.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `components/layout/{header,mobile-nav,footer,site-logo}.tsx`, `content/site.ts`, `types/site.ts`, `README.md`, `AGENTS.md`, `docs/shared/{navbar-spec,footer-spec}.md`, `docs/file-structure-proposal.md`, `docs/implementation-log.md`, `components/icons/logo.tsx`                                                                                                                                                                                                                                                                                                                    | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Review the navbar spacing and desktop fidelity in the browser, then adjust the mobile composition and Academy dropdown styling against the next screenshots.                                                                                                                                                                                                                                                                                                 |
| 2026-06-14 | Codex  | Ran a final redundancy pass before the Home implementation work. Removed the unused fake About team section, the heading and badge primitives that only existed for that section, the unused navigation-menu primitive, and an unused navigation export so the repo starts the main UI pass with less scaffold carryover.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `components/about/team-section.tsx`, `components/ui/{badge,navigation-menu,section-heading}.tsx`, `content/navigation.ts`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                 | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Start the real page build on the slimmer shared system and only add primitives back when a concrete design needs them.                                                                                                                                                                                                                                                                                                                                       |
| 2026-06-14 | Codex  | Removed the unused `lib/tokens.ts` layer after confirming it was not imported anywhere in the app. Simplified the guidance so `app/globals.css` owns shared visual tokens, component primitives own their own variant APIs, and future folders should only be introduced when real code exists for them.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `lib/tokens.ts`, `AGENTS.md`, `README.md`, `docs/design-system.md`, `docs/file-structure-proposal.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Keep the structure shallow for the MVP, and add new infrastructure folders only when the next phase genuinely needs them.                                                                                                                                                                                                                                                                                                                                    |
| 2026-06-14 | Codex  | Removed the redundant `acid` brand-green naming and standardized the repo on `leaf` only. Updated the global token bridge, button variants, Home sections, header/mobile-nav styling, and design docs so the foundations language and code language now use one canonical green scale.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `app/globals.css`, `lib/tokens.ts`, `components/ui/button.tsx`, `components/layout/{header,mobile-nav}.tsx`, `components/home/{about,ideas,news,testimonials,hero,ecosystem,faq}-section.tsx`, `docs/design-system.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                    | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Keep future green color usage on the `leaf` scale only, and avoid reintroducing duplicate palette names.                                                                                                                                                                                                                                                                                                                                                     |
| 2026-06-14 | Codex  | Revamped the shared marketing-site data structure so each file has one job: `content/site.ts` now holds site identity, `content/navigation.ts` holds shared nav data, and `content/seo.ts` holds metadata copy plus sitemap routes. Also split `SiteConfig` out of `types/navigation.ts` into a dedicated `types/site.ts` file so the ownership is easier to understand before the navbar implementation pass.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `content/site.ts`, `content/navigation.ts`, `content/seo.ts`, `types/site.ts`, `types/navigation.ts`, `components/layout/{header,mobile-nav}.tsx`, `app/sitemap.ts`, `README.md`, `AGENTS.md`, `docs/file-structure-proposal.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                          | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Review the shared content structure, then start the navbar implementation on the clearer ownership model.                                                                                                                                                                                                                                                                                                                                                    |
| 2026-06-14 | Codex  | Moved route SEO descriptions out of page hero content and into a dedicated `content/seo.ts` source so metadata copy stays separate from presentation copy. Public routes now consume explicit SEO entries instead of deriving descriptions from page-section content.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `content/seo.ts`, `app/{page,about,academy,community,partners,contact}/page.tsx`, `AGENTS.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Continue keeping SEO copy separate from UI copy as more routes and final messaging are approved.                                                                                                                                                                                                                                                                                                                                                             |
| 2026-06-14 | Codex  | Tightened the metadata helper so page descriptions stay explicit instead of silently falling back to the site description, and updated the repo workflow docs so Prettier is always part of handoff verification alongside lint, typecheck, and build.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `lib/metadata.ts`, `AGENTS.md`, `CLAUDE.md`, `README.md`, `docs/workflow.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `pnpm format` (pass), `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                       | Complete                                                                                                                                                                                | Keep page SEO descriptions deliberate, and use the format-first verification order on future work.                                                                                                                                                                                                                                                                                                                                                           |
| 2026-06-14 | Codex  | Reworked the marketing-site metadata structure to fit a six-page public app: added a shared `lib/metadata.ts` helper, upgraded the root metadata to include `metadataBase`, Open Graph, Twitter, robots, viewport, and canonical defaults, switched public pages to a single page-metadata helper, and added file-based `app/robots.ts` and `app/sitemap.ts`. Left TODO comments for final OG/Twitter images so the asset hookup can happen later without changing the structure again.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `lib/metadata.ts`, `app/layout.tsx`, `app/{page,about,academy,community,partners,contact}/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, `content/site.ts`, `types/navigation.ts`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                          | `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                                             | Complete                                                                                                                                                                                | Replace placeholder SEO copy and wire final social-share images once approved assets and final positioning are available.                                                                                                                                                                                                                                                                                                                                    |
| 2026-06-14 | Codex  | Translated the provided Figma foundations into a practical Tailwind v4 + shadcn guidance doc. Kept the system intentionally lightweight: typography, spacing, and most radius values stay with Tailwind primitives, while shared brand roles stay in the CSS variable bridge. Established `leaf` as the canonical brand-green language in the system.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `docs/design-system.md`, `app/globals.css`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass)                                                                                                                                                                             | Complete                                                                                                                                                                                | Use the foundations rules to document the navbar and then refine Home sections against approved screenshots.                                                                                                                                                                                                                                                                                                                                                 |
| 2026-06-14 | Codex  | Flattened the route structure after the decision to avoid route groups for now. Moved the current public pages back to top-level `app/`, moved shared chrome ownership into `app/layout.tsx`, and updated the docs to say route groups are deferred until route behavior genuinely diverges.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `app/**`, `README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/**`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass), `git diff --check` (pass)                                                                                                                                                  | Complete                                                                                                                                                                                | Continue with design-system and navbar work on the flatter structure.                                                                                                                                                                                                                                                                                                                                                                                        |
| 2026-06-14 | Codex  | Documented the agreed priority order: visible UI and shared chrome first, boilerplate route states later. Moved site config into `content/site.ts`, split the shared secondary-page content file into page-specific content modules, added a root `types/` folder for shared shapes, created the initial `public/images/` route-based folder layout for final asset exports, and stabilized standalone typecheck with `tsconfig.typecheck.json` because Next rewrites generated `.next/types` includes during build.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `content/**`, `types/**`, `public/images/**`, `README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/**`, `app/(site)/**`, `components/layout/**`, `components/icons/logo.tsx`, `app/layout.tsx`, `package.json`, `tsconfig.typecheck.json`                                                                                                                                                                                                                                                                                                                                                       | `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass), `git diff --check` (pass)                                                                                                                                                  | Complete                                                                                                                                                                                | Start the design-system and navbar pass with the new content and asset structure in place.                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-06-14 | Codex  | Compared `nabeels-portfolio`, `q-das`, and the current repo to propose a balanced, CMS-ready folder structure. Captured a practical target tree and what to change now vs later in a dedicated structure proposal doc.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `docs/file-structure-proposal.md`, `docs/README.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Not run for this docs-only addition                                                                                                                                                                                                          | Complete                                                                                                                                                                                | Review the proposal, then align on the first low-risk structure moves before deeper page work.                                                                                                                                                                                                                                                                                                                                                               |
| 2026-06-14 | Codex  | Added the Claude-style docs contract the repo was missing: root `CLAUDE.md`, screenshot-driven workflow guidance, status board, page-by-page specs, and shared navbar/footer specs. Refactored the public site toward the `q-das` / `vextra` pattern so the route layout now owns shared chrome, removed `SiteShell`, and renamed the generic secondary-page intro pattern from `PageLead` to `PageHero`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `CLAUDE.md`, `README.md`, `AGENTS.md`, `docs/**`, `app/(site)/**`, `components/layout/{header,page-hero}.tsx`, `content/pages.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass), `git diff --check` (pass)                                                                                                                                                  | Complete                                                                                                                                                                                | Continue with screenshot-driven navbar and Home page refinement using the new shared/page spec workflow.                                                                                                                                                                                                                                                                                                                                                     |
| 2026-06-13 | Codex  | Audited the current iProduce Africa scaffold, compared it with the reusable docs patterns from Zamfara-BPP, WardWise, and Q-DAS, then created the foundation docs stack for agent workflow, MVP phases, layout rules, design rules, and Home page scope.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `AGENTS.md`, `README.md`, `docs/*`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `pnpm lint` (pass), `pnpm typecheck` (pass), `pnpm build` (pass), `git diff --check` (pass)                                                                                                                                                  | Complete                                                                                                                                                                                | Use `docs/homepage-static-spec.md` to start the Home page fidelity pass and run full UI checks afterward.                                                                                                                                                                                                                                                                                                                                                    |
| 2026-06-17 | Gemini | Academy Hero UI Polish                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `components/academy/academy-hero-section.tsx`, `content/academy.ts`, `docs/routes/academy-spec.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `pnpm format`                                                                                                                                                                                                                                | Complete                                                                                                                                                                                | Continue with Academy page UI polish if needed.                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-06-18 | Codex  | Added the project radius cap rule: rounded rectangles now stop at `rounded-xl`, while `rounded-full` is reserved for true pills, avatars, and circular icon controls. Updated the agent guide, Claude guide, design system, and layout system docs so future UI work does not introduce larger Tailwind or custom radii.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `AGENTS.md`, `CLAUDE.md`, `docs/design-system.md`, `docs/layout-system.md`, `docs/implementation-log.md`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `pnpm format`                                                                                                                                                                                                                                | Complete                                                                                                                                                                                | Audit existing oversized radii opportunistically when touching each section; do not refactor unrelated sections only for radius cleanup.                                                                                                                                                                                                                                                                                                                     |
| 2026-07-23 | Codex  | Implemented the reviewed CMS-managed Academy category compatibility slice: one shared category schema with independent Article/Webinar switches, strong reference selectors, hidden legacy rollback fields, normalized category objects across cards/previews/details/filters/related content/search, the real Article search tone fix, category-wide revalidation, guarded idempotent migration tooling, and focused tests. Added the Production closeout runbook and updated the active specs/status without changing Mailchimp. Development dry-run found 12 category creates and 18 exact reference patches with zero warnings/errors; no dataset writes or DNS changes were made in this checkpoint.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `sanity/schemaTypes/documents/academy-category.ts`, `sanity/schemaTypes/documents/academy-article.ts`, `sanity/schemaTypes/documents/academy-webinar.ts`, `lib/academy-categories.ts`, `lib/sanity/fetch/articles.ts`, `lib/sanity/fetch/webinars.ts`, `lib/academy-search.ts`, `app/api/revalidate/route.ts`, Academy listing/hub/detail components, `scripts/migrate-academy-categories-to-sanity.ts`, `tests/academy-categories.test.ts`, `docs/cms-post-cutover-enhancements-spec.md`, `docs/sanity-academy-spec.md`, `docs/production-closeout-runbook.md`, `docs/status-board.md` | `pnpm typecheck`; `pnpm test` (41/41); `pnpm lint`; Development migration dry-run                                                                                                                                                            | In progress — deploy compatibility code, migrate/verify Development, then back up and migrate Production before tightening validation. DNS remains behind its separate client go/no-go. |
| 2026-07-23 | Codex  | Completed the guarded Academy category data rollout. Development created 12 deterministic categories and patched 18 Article/Webinar records (including one draft); Production created the same 12 and patched 17 published records. Both post-migration dry-runs returned only matches/skips with zero warnings/errors. Exported and checksummed a complete pre-migration Production backup, confirmed the deployed Home/Academy/Blog/Webinar/Search/Admin routes return 200, verified all CMS labels render, and confirmed the Trade search badge uses the real tangerine tone. Tightened Article/Webinar category references to required for the final schema deploy. Mailchimp and DNS were unchanged.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sanity `development` + `production` datasets; `/private/tmp/iproduce-production-before-academy-categories-2026-07-23.tar.gz`; `sanity/schemaTypes/documents/{academy-article,academy-webinar}.ts`; `docs/{production-closeout-runbook,status-board,cms-post-cutover-enhancements-spec,implementation-log}.md`                                                                                                                                                                                                                                                                           | Clean pre/post migration manifests; Production backup 96 docs + 46 assets; deployed route and HTML smoke checks; final repo checks pending                                                                                                   | In progress — deploy required-reference schema, update external Sanity webhooks, then hold DNS behind client go/no-go.                                                                  |
