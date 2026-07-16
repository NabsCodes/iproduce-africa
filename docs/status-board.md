# Status Board

Use this as the quick checkpoint list across shared sections and public pages.

## Shared

- [x] Navbar spec and implementation documented against current approved screenshots
- [x] Footer spec and implementation documented against current approved screenshots
- [x] Shared CTA language locked (`Join our community`, `Partner with us`)
- [x] Global spacing, typography, and radius rhythm locked in docs

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
- [x] Resend + React Email + Turnstile implementation (6 API routes, 7 form surfaces, dual-email delivery)
- [x] Email folder structure + dual UI documented (`docs/email-structure.md`)
- [x] Client mail host confirmed — **Zoho Mail** (`dev@`, `content@` created; temp passwords, rotate at handover)
- [x] Production form-delivery cutover checklist documented (`docs/production-form-delivery-cutover.md`)
- [x] Resend domain verified (`iproduceafrica.com`, DKIM + `send` sending; Zoho MX intact) + production Vercel env + smoke path — **complete** (client is Resend Owner)
- [ ] Website DNS cutover — point `iproduceafrica.com` / `www` at Vercel when client wants the public URL switch (forms/mail already live on Vercel)
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
- [ ] Delete one-release rollback snapshots from `content/_archived/` only after production is stable and signed off
