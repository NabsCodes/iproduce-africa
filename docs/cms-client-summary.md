# CMS Scope — Client Summary

One-page overview for sign-off. Technical detail lives in
`docs/cms-migration-spec.md` and `docs/sanity-academy-spec.md`.

---

## What you get

An **iProduce Africa CMS** workspace powered by Sanity Studio at `/admin` on
the live site (separate login). Your team can update content without a
developer deploy. The editor is excluded from public search indexing; its
document-specific `/admin/...` addresses are private editing links rather than
public website pages.

The live website reads from the **Production** CMS dataset. A separate
`development` dataset remains available for controlled testing and rollout
work, but it is not a substitute for the live editorial workflow. Publish live
content only through the agreed CMS process and check the public page after a
meaningful change.

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

## What stays with the website team (for now)

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

The **LMS and mobile app are separate products with separate development
teams**. The website team does not operate learner accounts, enrolment,
lessons, progress, certificates, app functionality, store releases, or support
inside those products. Sanity only holds the approved public links and
promotional content that the website displays for them.

---

## How handoff works

1. Tobi Seun Ajayi (`ibotajayi@gmail.com`), the nominated iProduce Africa CMS
   and technical contact, signs in at `/admin` using his individual Sanity
   invitation.
2. They make and publish the approved editorial change, then check its public
   page on the live site.
3. Development/testing and any bulk migration work stay controlled by the
   agreed technical process; they are not a reason to share deployment or
   migration credentials with editors.
4. The client administrator keeps the named Sanity owner, editor roles,
   recovery method, and billing responsibility current in the access register.

---

## What we need from you

- [x] **Approve** the full Phase 1–3 CMS scope and staging content
- [x] Confirm Studio access and assign the client content manager
- [x] Confirm the Sanity project, datasets, and editor access
- [ ] Confirm real start times only when those six Academy placeholder events become real launch content
- [ ] Have client counsel approve or replace the working legal-page copy before
      treating it as final legal guidance

Questions on anything not in this table — defer to the dev team; the full spec
covers implementation detail.
