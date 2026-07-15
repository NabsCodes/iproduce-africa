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

| Phase        | You can edit    | Where it appears                                                                 |
| ------------ | --------------- | -------------------------------------------------------------------------------- |
| **1 — Done** | Academy         | Blog articles, webinars & events, courses, authors                               |
| **2 — Done** | Trust & people  | Testimonials, FAQs, partner logos/quotes, team/advisors, member stories          |
| **3 — Done** | Durable content | Home services/value chains, About story/MVO, legal pages, public contact details |

All three implementation phases are complete in code. Phase 3 intentionally
keeps Academy, Community, and Partners marketing/UI copy in the website code;
their real catalogue, FAQ, testimonial, partner, and people records remain
editable in Sanity. Legal content is required, not an optional follow-up.

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
- Academy **registration** flow (sign-up still goes to your inbox via email).
  In Studio, each webinar/course has **How people register**: open on this
  site, collect interest only, send to an external page, or closed.
- Error pages (404, etc.)
- Country lists and form validation
- FAQ section headings and category tabs (the questions/answers move to CMS)
- About journey timeline/motion, route anchors, and other layout-coupled configuration
- Academy, Community, and Partners marketing hero/card copy
- Home hero image and About hero copy
- Office hours
- Academy promotion controls — the site automatically prioritises a happening event, then the nearest upcoming published webinar

---

## How handoff works

1. We create a Sanity project (`development` + `production` datasets).
2. **Migration scripts** copy today's placeholder content into the **staging**
   Studio (`development`) — Academy, trust/people, then the durable Phase 3
   settings/page/legal content.
3. You review on staging, replace placeholders with real content where ready.
4. After your approval, we migrate approved content to **production** CMS.
5. You own the Sanity account (same pattern as Resend for email).

---

## What we need from you

- [ ] **Approve** the full Phase 1–3 CMS scope and staging content
- [ ] Confirm who gets Studio access (names/emails)
- [ ] Confirm who creates the Sanity project and invites the other party
- [ ] Review staging placeholders before we point the live site at production CMS
- [ ] Confirm real start times only when those six Academy placeholder events become real launch content

Questions on anything not in this table — defer to the dev team; the full spec
covers implementation detail.
