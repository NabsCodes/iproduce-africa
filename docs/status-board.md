# Status Board

Use this as the quick checkpoint list across shared sections and public pages.

## Shared

- [x] Navbar spec and implementation documented against current approved screenshots
- [x] Footer spec and implementation documented against current approved screenshots
- [x] Shared CTA language locked — header/mobile use `Join our community` and
      `Explore courses`; `Partner with us` stays the contextual partnership CTA
- [x] Global spacing, typography, and radius rhythm locked in docs

## LMS and Mobile App Enhancement

- [x] Approve the standalone LMS boundary and before/after website direction
- [x] Document the implementation contract in
      `docs/lms-and-mobile-app-promotion-spec.md`
- [x] Replace the repeated header/mobile Partner CTA with `Explore courses`
- [x] Make the course registration panel accurate for external, interest, open,
      and closed states
- [x] Add backward-compatible app-promotion fields to Site Settings
- [x] Build the Community-page branded coming-soon placeholder
- [x] Add the compact footer app status
- [x] Automated checks — lint, typecheck, tests, and build pass; the state
      matrix is covered by `tests/site-settings-fetch.test.ts` and
      `tests/academy-registration.test.ts`
- [x] Move the section to `components/shared/` and render it on Home between
      Testimonials and Stay Connected (spec B7–B8)
- [x] Keep every renderable state free of third-party store trademarks —
      neutral `Smartphone` icon while coming soon, text-only live fallback,
      footer text-only (spec B9)
- [x] Update the Sanity field descriptions to name Home, Community, and the
      footer (spec B10)
- [ ] Add official App Store / Google Play badge artwork to `storeBadgeAssets`
      once verified store listings exist (spec B9)
- [ ] Optional: pursue App Store pre-order / Google Play pre-registration to
      unlock authorized pre-launch badges (needs developer-account access)
- [ ] Populate and verify Development content before Production publishing
- [ ] Configure one Development course with a verified public LMS URL
- [x] Mobile menu at 390px and desktop at 1440px verified in a browser
- [x] Compact header at 1024px/1151px and full navigation at 1152px/1280px
      verified in a browser after the `desknav` change
- [x] Home and Community app sections verified at 390px, tablet, and desktop
- [x] Studio publish + webhook revalidation QA completed
- [x] Update `docs/cms-editor-guide.md` after Studio workflow verification;
      include the shared mobile-app promotion safeguard

## Known Issues

- [ ] Home reports roughly 5px of page-level horizontal overflow at 1024px,
      traced to the existing partner marquee. Unrelated to the header or the
      LMS work; track and fix separately.

## Pages

- [x] Home page static implementation complete enough for review
- [x] About page built and documented beyond scaffold
- [x] Academy hub, listing, search, and detail routes built and documented beyond scaffold
- [x] Community page and membership dialog built and documented beyond scaffold
- [x] Partners page, inquiry form, and partner dialog built and documented beyond scaffold
- [x] Contact page built and documented beyond scaffold

## Legal / Compliance Pages

- [x] `/privacy`, `/terms`, `/cookies`, `/accessibility` routes + shared legal
      layout implemented (`docs/routes/legal-pages-spec.md`)
- [x] Baseline copy grounded in real stack (Resend, Turnstile, Upstash, Vercel,
      Sanity, form data) — clearly a working baseline, client counsel replaces
- [x] Wire `siteConfig.footer.legalLinks` to the new routes
- [x] Add legal routes to `content/seo.ts` + `sitemap.ts`

## Integration Readiness

- [x] Static content structure is stable enough for Sanity mapping
- [x] Placeholder imagery source is known (`lib/placeholder-images.ts` + `public/images/`)
- [x] Form integration scope documented (`docs/resend-integration-spec.md`)
- [x] Resend + React Email + Turnstile implementation for operational forms; newsletter route now uses Mailchimp while preserving the shared security pipeline
- [x] Email folder structure + dual UI documented (`docs/email-structure.md`)
- [x] Client mail host confirmed — **Zoho Mail** (`dev@`, `content@` created; temp passwords, rotate at handover)
- [x] Production form-delivery cutover checklist documented (`docs/production-form-delivery-cutover.md`)
- [x] Resend domain verified (`iproduceafrica.com`, DKIM + `send` sending; Zoho MX intact) + production Vercel env + smoke path — **complete** (client is Resend Owner)
- [ ] Mailchimp newsletter integration is live and Production-only; pending → subscribed + source tag passed, while unsubscribe, repeat-after-unsubscribe, and hosted rejoin still need recorded end-to-end evidence
- [x] Website DNS cutover — apex and `www` resolve through Vercel with HTTPS; canonical `www` → apex `308` redirect verified live
- [x] `docs/cms-migration-spec.md` drafted — **approved with edits** (Codex/Claude review incorporated)
- [x] `docs/sanity-academy-spec.md` drafted — **approved with edits**
- [x] Sanity Phase 1 implementation (Academy catalogues, hub/home/search/sitemap/registration surfaces)
- [x] Sanity Phase 2 implementation (testimonials, FAQs, partners, team/advisors, member stories)
- [x] Approve Phase 3 field inventory (`docs/sanity-phase3-spec.md`)
- [x] Review Phase 3 implementation plan before code changes
- [x] Implement Phase 3 as one delivery (durable Home/About content + mandatory legal + site settings)
- [x] Narrow Phase 3 after implementation review: remove Academy/Community/Partners page singletons, About hero copy, Home hero image, and CMS office hours
- [x] Post-migration Academy promotion review + automatic nearest-upcoming webinar behavior
- [ ] Confirm real start times only when those six Academy placeholder events become real launch content
- [x] Staging QA pass (edit in Studio → confirm hub/home/search/detail routes reflect it)
- [x] Client sign-off on the full Phase 1–3 CMS scope (`docs/cms-client-summary.md`)
- [x] Archive migrated static content blocks to `content/_archived/` (retained as rollback snapshots for one stable production release)
- [x] Production dataset migration + Vercel prod env cutover (reviewed `development` dataset promoted on 2026-07-16; Production targets `production`, Preview targets `development`)
- [x] Create/verify the Sanity production webhook for `https://iproduce-africa.vercel.app/api/revalidate` using the Vercel production `SANITY_REVALIDATE_SECRET` (signed publish smoke test returned HTTP 200 on 2026-07-16)
- [x] Post-cutover Slice A code: registration deadline/status resolver, Academy SEO fields + structured data, Telegram/WhatsApp channel settings
- [x] Client-visible media slice: Partner Voices avatars + stable testimonial IDs + secure About Story click-to-play video
- [ ] Confirm the client-supplied About Story YouTube/Vimeo URL in both datasets when available (optional; no migration)
- [x] Team/advisor image crops and Sanity hotspots now affect their card/profile surfaces, with editor previews documented
- [ ] Review remaining site-wide image payload sizing and crop/hotspot handling only if prioritised before handover (optional cross-cutting follow-up)
- [x] Add `"id": _id` to both Sanity webhook projections for targeted author-detail revalidation — live on Production + Development; author/category publish fan-out verified
  - Plain terms: editing an author in the CMS now refreshes just that author's
    pages instead of rebuilding the whole blog section. (A safe rebuild-the-blog
    fallback still runs if a payload ever arrives without the ID.)
- [x] CMS-managed category code: shared Article/Webinar collection, fallback reads, real badge tones, filters, search, and guarded migration tooling
- [x] Category migration verified in Development and Production after a clean dry-run and Production backup; both post-runs are idempotent
- [x] Required Article/Webinar category references deployed after both dataset migrations; Production deployment and public route smoke checks passed
- [x] Add `academyCategory` to the external Sanity webhook filter and verify category/author publish fan-out — filter includes it on both webhooks; fan-out verified
- [x] Custom-domain launch: apex/`www` DNS switched to Vercel at TTL 300; canonical URLs and email asset origins moved to `https://iproduceafrica.com`
- [ ] Restore the website-record TTL to `3600`/`14400` after 24–48 stable production hours — done (raised back off the cutover `300`)
- [ ] Production QA and client handover (`docs/production-closeout-runbook.md`)
  - [x] Client-facing handover source pack prepared in `docs/client-handover/`
  - [x] Branded editable Word masters and visually verified client PDFs prepared
        in `docs/client-handover/client-ready/`
  - [ ] Confirm support period, final issue date, Tobi's access through
        `ibotajayi@gmail.com`, recording, and final delivery email
