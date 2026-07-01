# CMS Scope — Client Summary

One-page overview for sign-off. Technical detail lives in
`docs/cms-migration-spec.md` and `docs/sanity-academy-spec.md`.

---

## What you get

A **Sanity Studio** at `/admin` on the live site (separate login). Your team can
update content without a developer deploy — starting from the **same placeholder
content** the site shows today, pre-loaded so you edit or delete rather than
starting from blank pages.

---

## What moves to the CMS first

| Priority           | You can edit        | Examples                                           |
| ------------------ | ------------------- | -------------------------------------------------- |
| **1 — Launch**     | Academy content     | Blog articles, webinars & events, courses          |
| **2 — Soon after** | Trust & partners    | Testimonials, partner logos, team & advisors, FAQs |
| **3 — Later**      | Page marketing copy | Home/About section text, site contact details      |

**Phase 1 (Academy)** is the main editorial win: articles, sessions, and courses
with images, dates, and registration settings.

---

## What stays with engineering (for now)

These stay in code so forms, routing, and UX stay reliable:

- Main navigation and footer links
- Contact, community, and partner **forms** (they already send email)
- Academy **registration** flow (sign-up still goes to your inbox via email)
- Error pages (404, etc.)
- Country lists and form validation

We can move more marketing copy into the CMS in later phases if your edit
cadence justifies it.

---

## How handoff works

1. We create a Sanity project (`development` + `production` datasets).
2. **Migration script** copies today’s placeholder content into Studio — you do
   **not** re-enter articles or events by hand.
3. You review on a preview/staging URL, then we point production at the CMS.
4. You own the Sanity account (same pattern as Resend for email).

---

## What we need from you

- [ ] **Approve** the phased scope above (Academy first, then testimonials /
      partners / team / FAQs).
- [ ] Confirm who gets Studio access (names/emails).
- [ ] Confirm whether `info@iproduceafrica.com` (or agency) creates the Sanity
      project, or you create it and invite us.

Questions on anything not in this table — defer to the dev team; the full spec
covers implementation detail.
