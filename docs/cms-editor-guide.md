# iProduce Africa — Content Editor Guide

A plain-language guide for editing the website content yourself. No code, no
technical setup — everything here happens inside the Studio in your browser.

This doubles as the script outline for the training video (see
[Recording outline](#recording-outline) at the end).

---

## 1. Getting in

- **Where:** `https://iproduceafrica.com/admin`
- **Login:** your iProduce Africa Sanity account (the email/Google account you
  were invited with).
- Works in any modern browser. Nothing to install.
- The browser address changes as you open sections and documents. A long
  `/admin/...` address containing an Article slug or document name is normal:
  it lets Sanity reopen or share that exact editor screen and does not change
  the public website address.

## 2. The one golden rule: Draft → Publish

Everything you type **saves automatically as a draft**. Drafts are **not live**
— visitors don't see them. A change only reaches the public website when you
click the green **Publish** button (bottom of the document).

- Unpublished edits show a small "Draft" / changed indicator.
- After you **Publish**, the live site updates on its own **within a few
  seconds** — you do not need to call anyone or "deploy" anything.
- Changed your mind before publishing? You can discard the draft and the live
  version stays as it was.

> If you ever edit something and it "doesn't show on the site," the answer is
> almost always: **you haven't hit Publish yet.**

## 3. The Studio map (left menu)

| Section             | What lives here                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------- |
| **Page Content**    | The Home and About page copy                                                                 |
| **Academy**         | Articles, Webinars & Events, Courses, Authors, Categories                                    |
| **Partners**        | Partner logos/entries                                                                        |
| **Testimonials**    | Grouped by where they appear (Home, Academy, Partner Voices)                                 |
| **FAQs**            | Grouped by page (Home & Contact, Academy, Community, Partners)                               |
| **Team & Advisors** | Grouped into Team and Advisors                                                               |
| **Member Stories**  | Community member stories                                                                     |
| **Legal Pages**     | Privacy, Terms, Cookies, Accessibility                                                       |
| **Site Settings**   | Contact details, social/community links, and future mobile-app promotion (one shared record) |

## 4. Common tasks

### Publish a new Article

1. **Academy → Articles → "+"** (create new).
2. Enter the **Title**, then generate the **Slug**. Treat the slug as permanent
   after the first publication because changing it can break shared links.
3. Write an **Excerpt** of no more than 220 characters, then choose an
   Article-enabled **Category** and an existing **Author**.
4. Set **Published at** for the displayed date and article ordering. This field
   does not schedule publication: only **Publish** makes the article public.
5. Leave **Read time** blank to calculate it from the body, or enter a positive
   whole-number override when necessary.
6. Add the required **Card image** and Alt text. **Hero image** is optional and
   falls back to the card image when omitted.
7. Build the **Body** with Normal text, H2/H3 headings, quotes, bullet lists,
   callouts, tables, code blocks, body images, or structured ordered steps.
8. Fill **Search & sharing** only when a custom SEO title, description, or share
   image is needed; otherwise the normal defaults are used.
9. Click **Publish**, then check the public article page and listing card.

**Example:** for an article titled “Five ways agribusinesses can prepare for
export”, generate the slug once, write a short card excerpt, select the correct
category and author, leave Read time blank unless a specific value is required,
upload a clear card image with descriptive Alt text, and use H2 headings for the
five main sections.

Important article cases:

- A future **Published at** date does not hide a published document. Keep it as
  a Draft until the approved release time.
- Leave Hero image empty when a separate one is unnecessary; Card image becomes
  the fallback.
- Use the supported Body blocks rather than pasting complex Word formatting and
  assuming it will look identical online.
- For a normal correction, edit and Publish again without changing the slug.

### Add a Webinar or Event

1. **Academy → Webinars & Events**. You'll see **Upcoming**, **Past**, and
   **All** — open **Upcoming** and click **"+"**.
2. Add the **Title**, generate the slug, choose a Webinar/Event-enabled
   **Category**, and set the required **Start date & time** carefully.
3. Add **Description**, **Excerpt**, **Image** and Alt text, Body details,
   **Location**, **Format**, and **Speakers** where relevant.
4. Add **End date & time** when the website should show “Happening now” between
   the start and end. The end must be after the start.
5. Choose the correct **Registration** mode based on who owns the signup process.
6. Click **Publish**, then check the event page and Academy listing.

**About Upcoming vs Past — this is automatic.** You never move an event by hand.
The Studio sorts it for you based on its date:

- Future and in-progress events appear under **Upcoming**.
- With a valid end time, an event can show **Happening now** until that end.
- Without an end time, it stops being upcoming when its start time arrives.
- After its effective end, it appears under **Past**.
- A brand-new event you haven't dated yet stays under **Upcoming** so you don't
  lose it in Studio, but do not publish it until its real time is confirmed.

The public website already hides finished events from the "upcoming" areas, so
this is just to keep your editing list tidy.

#### Registration choices

- **Open on this site:** use the iProduce form. It closes at the optional
  deadline, or at the webinar start when no deadline is set.
- **Collect interest only:** use the iProduce form as an interest/waitlist
  signup. Without a deadline, it can stay available after the event starts.
- **Send to an external page:** use Zoom, Eventbrite, or another provider. A
  full URL is required; that provider owns registrations and emails.
- **Registration closed:** remove signup and show a closed message.

Examples:

- A webinar runs from 10:00 to 11:30 and accepts the iProduce form until 09:00:
  set the start, end, **Open on this site**, and a 09:00 deadline.
- An event uses Eventbrite: select **Send to an external page**, add the full
  Eventbrite URL, and name Eventbrite as the provider. The website form is not
  used.
- Registration is full: select **Registration closed** and add a message such
  as “Registration is full for this session.”

The registration deadline must be at or before the start. Changing an event
time can alter Upcoming/Past, the countdown, Happening now, and registration
state, so check the listing and detail page after publishing.

### Manage Categories

**Academy → Categories.** Each category has:

- **Category name** and **Slug**.
- **Available for Articles** and **Available for Webinars & Events** — toggles
  that decide where the category can be used. A category can serve one, both, or
  neither.
- **Badge colour** — Orange, Light green, or Dark green.
- **Display order** — controls the order categories appear in filters.

> You **cannot delete** a category that's still used by an article or event —
> the Studio protects you from breaking those pages. Reassign them first, or just
> switch the category's toggles off to stop new use.

### Academy website versus the separate LMS and mobile app

The website CMS manages public Academy catalogue content: articles, event
pages, course descriptions, and approved links. It does not manage the LMS or
mobile app themselves.

- The separate LMS team owns learner accounts, enrolment, lessons, progress,
  payments, certificates, availability, and LMS support.
- The separate mobile-app team owns app functionality, accounts, releases,
  store listings, and mobile-app support.
- Tobi may update an approved LMS course URL or approved app-promotion text in
  Sanity. Problems inside the LMS or app go to the corresponding product team.

Simple rule: if the public website page, Sanity content, or outbound link is
wrong, contact the website team. If the link opens correctly but the LMS course
or app has a problem, contact that separate development team.

### Update contact details or social links

**Site Settings** (one shared record at the bottom of the menu):

- **Contact details:** public email, primary public phone, optional secondary
  public phone, and address. The Contact page shows both phone numbers when
  both are filled; the footer keeps the primary number only.
- **Social & community links:** Instagram, LinkedIn, Facebook, YouTube, Telegram,
  WhatsApp.

Changing these updates them **everywhere on the site at once** (footer, contact
page, etc.). Publish when done.

### Mobile app promotion — leave hidden until approved

**Site Settings** also includes a **Mobile app promotion** group that controls
the shared app message on Home, Community, and the footer. These fields only
control website promotion; they do not publish, configure, or support the app.

- Leave its status as **Hidden** until the mobile-app rollout has written
  approval.
- Use **Coming soon** only with approved copy. Do not add store links, badges,
  dates, or app claims that are not yet confirmed.
- Use **Live** only after each public store link is real and verified. Official
  store badge artwork is added separately when the relevant listing and rights
  are confirmed.
- The setting is shared: publishing it can affect more than one public page.
  Check Home, Community, and the footer after changing it.

### Add a Testimonial, FAQ, or Team member

These are grouped so they land in the right place automatically. **Create from
the specific sub-list**, not a generic one:

- **Testimonials →** Home / Academy / Partner Voices — create inside the group
  where you want it to appear.
- **FAQs →** Home & Contact / Academy / Community / Partners.
- **Team & Advisors →** Team or Advisors.

Creating from the right sub-list pre-tags the item so it shows up where you
expect.

### Add or update a Team / Advisor photo

1. Open **Team & Advisors → Team** or **Team & Advisors → Advisors**, then open
   the person's record.
2. Upload a clear, good-quality portrait in **Photo**. An original around
   1200×1600 pixels or larger is a useful target; do not enlarge a small image
   before uploading it.
3. Open the image's **crop / hotspot** tool:
   - Use the **crop box** only to remove an edge or background area that should
     never appear.
   - Put the **hotspot target on the person's face**. This is the focal point
     the site protects when it makes the Team card, Advisor card, and profile
     dialog versions.
4. Switch between the named previews — **Team card (4:3)**, **Advisor card
   (square)**, and **Profile dialog (portrait)** — to see how the same hotspot
   behaves in each website shape. These are previews, not three separate crops.
5. Avoid cropping tightly around the head. The same source must work as a wide
   Team card, a square Advisor card, and a tall profile image.
6. Click **Publish**, then check the person's card on `/about` and open
   **View profile / Read more** to check the dialog. For an Advisor, also check
   the square card on a desktop-sized screen.

If you do not set a hotspot, the site uses a gentle top-biased default that
usually suits head-shots. Any hotspot you set replaces that default. You do not
need to resize or upload separate versions of the photo.

## 5. Images & a few good habits

- **Where an image asks for Alt text, always fill it in** — use a short
  description of what the image shows. Team / Advisor photos use the person's
  name automatically, so that Photo field does not ask for separate Alt text.
- **Crop and hotspot do different jobs:** crop removes an area from every
  version; hotspot tells the site what to keep in view when the shape changes.
  For people, place the hotspot on the face and keep the crop reasonably loose.
- **Slugs** (the web address piece) auto-fill from the title. **Avoid changing a
  slug after publishing** — it changes the page's URL, and any links people
  already shared will break.
- **Don't worry about the "Legacy" fields** you may see marked hidden/legacy —
  they're kept for safety and aren't used for editing.
- **Don't delete** Site Settings, Home, or About — they're single shared records
  the site depends on.

## 6. Do's and don'ts (quick reference)

| Do                                               | Don't                                  |
| ------------------------------------------------ | -------------------------------------- |
| Hit **Publish** to go live                       | Assume a draft is live                 |
| Fill **Alt text** wherever the field asks for it | Leave images undescribed               |
| Put a Team / Advisor hotspot on the face         | Crop a portrait tightly for one shape  |
| Reassign content before removing a category      | Try to delete an in-use category       |
| Change a slug only if truly necessary            | Rename slugs on popular pages casually |
| Edit Site Settings for contact/social changes    | Hunt for contact info page-by-page     |
| Leave the app promotion hidden until approval    | Announce an unverified app or store    |

---

## Recording outline

Suggested ~10–12 minute training video, in this order. Screen-record the live
Studio while narrating.

1. **Intro & login (0:00–1:00)** — open `iproduceafrica.com/admin`, log in, quick
   tour of the left menu.
2. **The golden rule (1:00–2:00)** — draft vs publish; show that a draft doesn't
   appear on the site, then publish and show the live page updating.
3. **Write & publish an Article (2:00–4:30)** — the full flow, emphasise Alt text
   and Category/Author.
4. **Add a Webinar/Event (4:30–6:30)** — fill it in, publish, then show it under
   Upcoming; explain that Past happens automatically (show the Past list).
5. **Team / Advisor photo (6:30–8:00)** — show a loose crop, move the hotspot
   onto the face, switch through the three named shape previews, publish, then
   check the card and profile dialog on `/about`.
6. **Categories (8:00–9:00)** — toggles, colour, order, and the "can't delete
   while in use" safety.
7. **Site Settings (9:00–10:00)** — change a phone number or social link, publish,
   show it update in the footer; point out that the mobile-app setting remains
   hidden until its rollout is approved.
8. **Wrap-up (10:00–end)** — recap the golden rule, where to get help.

Keep each step slow and literal — pause on the **Publish** button every time so
it becomes muscle memory.
