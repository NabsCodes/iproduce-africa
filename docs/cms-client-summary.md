# CMS Scope — Client Summary

One-page overview for sign-off. Technical detail lives in
`docs/cms-migration-spec.md` and `docs/sanity-academy-spec.md`.

---

## What you get

A **Sanity Studio** at `/admin` on the live site (separate login). Your team can
update content without a developer deploy.

Placeholder content from today's site is **pre-loaded into a staging Studio**
(`development` dataset) so you edit or delete — not start from blank pages.
**Production** CMS is populated only after you review and approve that content.

---

## What moves to the CMS

| Phase | You can edit | Where it appears |
| ----- | ------------ | ---------------- |
| **1 — Launch** | Academy | Blog articles, webinars & events, courses, authors |
| **2 — Next** | Trust & people | Testimonials (Home, Academy, Partners), FAQs (all main pages), partner logos, partner quotes, team & advisors (About), member stories (Community) |
| **3 — Later** | Page marketing copy | Home/About section text, site contact details |

Phases 1 and 2 are both **in scope** for the CMS rollout — not optional add-ons.

### Phase 2 detail (what editors get after Academy)

- **Testimonials** — carousel quotes on Home and Academy; partner voice quotes on Partners
- **FAQs** — Home, Community, Partners, Contact, Academy (each page shows its own set)
- **Partners** — logo marquee (Home + Partners) and voices section logos
- **Team & advisors** — About page people cards (photo, bio, social links)
- **Member stories** — Community page case-study cards

---

## What stays with engineering (for now)

- Main navigation and footer links
- Contact, community, and partner **forms** (they already send email)
- Academy **registration** flow (sign-up still goes to your inbox via email)
- Error pages (404, etc.)
- Country lists and form validation
- FAQ section headings and category tabs (the questions/answers move to CMS)
- Long marketing heroes and motion-heavy sections (e.g. About journey timeline) until Phase 3

---

## How handoff works

1. We create a Sanity project (`development` + `production` datasets).
2. **Migration scripts** copy today's placeholder content into the **staging**
   Studio (`development`) — Phase 1 (Academy) then Phase 2 (trust & people).
3. You review on staging, replace placeholders with real content where ready.
4. After your approval, we migrate approved content to **production** CMS.
5. You own the Sanity account (same pattern as Resend for email).

---

## What we need from you

- [ ] **Approve** Phase 1 (Academy) + Phase 2 (testimonials, FAQs, partners, team, member stories)
- [ ] Confirm who gets Studio access (names/emails)
- [ ] Confirm who creates the Sanity project and invites the other party
- [ ] Review staging placeholders before we point the live site at production CMS

Questions on anything not in this table — defer to the dev team; the full spec
covers implementation detail.
