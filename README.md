<div align="center">
  <img src="./public/images/shared/iproduce-logo.webp" alt="iProduce Africa" width="220" />

  <h1>iProduce Africa</h1>

  <p>
    A premium digital home for Africa's agribusiness ecosystem, connecting
    agripreneurs, partners, and innovators through learning, community, and
    market opportunities.
  </p>

  <p>
    <a href="https://nextjs.org">
      <img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16" />
    </a>
    <a href="https://react.dev">
      <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
    </a>
    <a href="https://www.typescriptlang.org">
      <img src="https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5" />
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
    </a>
    <a href="https://motion.dev">
      <img src="https://img.shields.io/badge/Motion-FFF312?style=flat-square&logo=framer&logoColor=111111" alt="Motion" />
    </a>
  </p>
</div>

---

## Overview

iProduce Africa is a responsive, static-first marketing platform designed to
showcase the organisation's mission, Academy, community, partnerships, and
agribusiness resources.

The project translates an evolving Figma system into a cohesive production
website. It prioritizes visual fidelity, accessible interactions, responsive
composition, and clear content ownership through Sanity CMS.

## Experience

- Purpose-built Home, About, Community, Partners, and Contact pages
- Academy hub with dedicated Webinar, Course, and Blog catalogues
- Static detail pages with shareable, SEO-friendly slugs
- Unified Academy search across learning and editorial content
- Standalone LMS entry points: the website remains the discovery surface while
  public LMS pages handle enrolment and learning
- Responsive layouts designed intentionally for mobile, tablet, and desktop
- Accessible UI primitives, keyboard-friendly navigation, and reduced-motion support
- Live form validation with Mailchimp newsletter subscriptions, Resend operational email delivery, Cloudflare Turnstile, and honeypot protection
- Metadata, Open Graph, Twitter cards, sitemap, robots, and scoped 404 pages
- Sanity-managed editorial content, contact settings, legal pages, and a
  future mobile-app promotion state shared across Home, Community, and footer

## Main Routes

| Route               | Purpose                                          |
| ------------------- | ------------------------------------------------ |
| `/`                 | Main marketing experience and ecosystem overview |
| `/about`            | Organisation story, vision, values, and people   |
| `/academy`          | Learning and editorial hub                       |
| `/academy/webinars` | Webinars, events, and live sessions              |
| `/academy/courses`  | Structured agribusiness courses                  |
| `/academy/blog`     | Articles and industry insights                   |
| `/community`        | Community value, membership, and participation   |
| `/partners`         | Partnership opportunities and enquiry experience |
| `/contact`          | Contact channels, form, map, and FAQs            |

## Tech Stack

| Area       | Technology                                                  |
| ---------- | ----------------------------------------------------------- |
| Framework  | Next.js 16 with App Router                                  |
| UI         | React 19, Tailwind CSS 4, Radix UI, shadcn-style primitives |
| Language   | TypeScript                                                  |
| CMS        | Sanity Studio, GROQ, signed revalidation                    |
| Forms      | React Hook Form, Zod, Resend, Mailchimp                     |
| Protection | Cloudflare Turnstile, honeypot, Upstash rate limiting       |
| Motion     | Motion for React with reduced-motion safeguards             |
| Analytics  | Vercel Analytics                                            |
| Tooling    | pnpm, ESLint, Prettier                                      |

## Getting Started

### Prerequisites

- Node.js 20 or newer
- pnpm 11

### Installation

```bash
git clone https://github.com/NabsCodes/iproduce-africa.git
cd iproduce-africa
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Scripts

```bash
pnpm dev           # Start the development server
pnpm build         # Create a production build
pnpm start         # Run the production build
pnpm lint          # Run ESLint
pnpm typecheck     # Run TypeScript checks
pnpm format        # Format the repository
pnpm format:check  # Check formatting without writing
pnpm email:dev     # Preview React Email templates at :3001
```

## Project Structure

```text
app/                 Routes, metadata, loading states, and system pages
components/
  academy/           Academy hub, listings, detail pages, and registration UI
  home/              Home-only sections
  layout/            Header, footer, navigation, and shared chrome
  shared/            Cross-page sections and reusable compositions
  ui/                Accessible UI primitives
content/             Editable page copy and canonical static collections
schemas/             Zod schemas and schema-derived form value types
types/               Content and component contracts
lib/                 Search, metadata, email, forms API, and utility helpers
providers/           Application-wide provider composition
public/              Images, SVG assets, and brand media
docs/                Design, route, workflow, and implementation documentation
```

The key ownership rule is simple: `content/` owns editable data, `schemas/`
owns runtime validation, `types/` owns contracts, and components own
presentation.

## Project Status

The public frontend, operational form delivery, and approved Sanity CMS phases
are implemented. The Production CMS dataset powers the live deployment,
signed webhook revalidation is active, and the custom domain is live. The
website also includes the approved LMS entry points and a CMS-controlled
mobile-app promotion foundation; those new CMS content and Production rollout
steps remain separate from code completion.

**Shipped in repo**

- Seven public form surfaces → six protected API routes; newsletter subscriptions use Mailchimp double opt-in while operational forms use Resend notification + receipt delivery
- Cloudflare Turnstile + honeypot on every submission path
- React Email templates previewable via `pnpm email:dev`
- Sanity-managed Academy catalogues, trust/people content, selected Home/About
  copy, public contact settings, legal documents, and mobile-app promotion
  state
- Embedded editor at `/admin` with organised two-level navigation
- `Explore courses` links to the standalone iProduce LMS without duplicating
  learner accounts, enrolment, or course delivery inside this website
- Mode-aware course registration panels for external LMS, interest, open, and
  closed course states
- Vercel Analytics included in the public app shell

**Next steps**

- Populate and verify the LMS/mobile-app content in Sanity Development, then
  obtain approval before publishing it to Production
- Configure each LMS-backed course with its verified public course URL; update
  the central LMS destination when `learn.iproduceafrica.com` is ready
- Complete final production review, client access checks, and handover materials
- Record the remaining Mailchimp unsubscribe and hosted-rejoin lifecycle
  evidence before declaring newsletter closeout complete
- Keep the archived Sanity seed snapshots for one stable production release,
  then remove them after sign-off
- Optional preview, TypeGen, search-at-scale, and site-wide image-payload work

## Documentation

This repository uses lightweight working specifications so contributors can
continue without relying on chat history.

- [`AGENTS.md`](./AGENTS.md) — repository rules and ownership boundaries
- [`CLAUDE.md`](./CLAUDE.md) — implementation guidance
- [`docs/README.md`](./docs/README.md) — documentation index
- [`docs/design-system.md`](./docs/design-system.md) — visual language and tokens
- [`docs/layout-system.md`](./docs/layout-system.md) — responsive layout rules
- [`docs/routes/`](./docs/routes) — route-by-route specifications
- [`docs/resend-integration-spec.md`](./docs/resend-integration-spec.md) — form delivery, Resend, Turnstile
- [`docs/mailchimp-newsletter-integration-spec.md`](./docs/mailchimp-newsletter-integration-spec.md) — newsletter subscriber delivery and cutover
- [`docs/email-structure.md`](./docs/email-structure.md) — email folder map and dual UI
- [`docs/lms-and-mobile-app-promotion-spec.md`](./docs/lms-and-mobile-app-promotion-spec.md) — standalone LMS links and mobile-app promotion rollout
- [`docs/cms-editor-guide.md`](./docs/cms-editor-guide.md) — client-friendly Studio editing guide
- [`docs/status-board.md`](./docs/status-board.md) — current delivery and rollout checklist
- [`docs/production-closeout-runbook.md`](./docs/production-closeout-runbook.md) — final QA, access, search, and handover runbook

## Environment Variables

Form delivery, Mailchimp, Turnstile, Upstash, and Sanity need environment
variables on Vercel (and locally in `.env.local`). See the form-delivery,
Mailchimp, and CMS specifications. Missing production provider configuration
fails closed with **503** rather than returning fake success.

## Quality Gate

Before handing off a completed change:

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Deployment

The application is optimized for Vercel and can be deployed to any platform
that supports Next.js. Set Mailchimp, Resend, Turnstile, route inbox, and Sanity
variables in the appropriate deployment environments before production use.

---

<div align="center">
  <strong>Building Africa's connected agribusiness ecosystem.</strong>
</div>
