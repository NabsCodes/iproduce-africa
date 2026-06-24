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
frontend. The current implementation prioritizes visual fidelity, accessible
interactions, responsive composition, content ownership, and a clean migration
path to Sanity CMS.

## Experience

- Purpose-built Home, About, Community, Partners, and Contact pages
- Academy hub with dedicated Webinar, Course, and Blog catalogues
- Static detail pages with shareable, SEO-friendly slugs
- Unified Academy search across learning and editorial content
- Responsive layouts designed intentionally for mobile, tablet, and desktop
- Accessible UI primitives, keyboard-friendly navigation, and reduced-motion support
- Local form validation and transparent demo states for deferred submissions
- Metadata, Open Graph, Twitter cards, sitemap, robots, and scoped 404 pages
- Content-first architecture prepared for a future Sanity migration

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

| Area      | Technology                                                  |
| --------- | ----------------------------------------------------------- |
| Framework | Next.js 16 with App Router                                  |
| UI        | React 19, Tailwind CSS 4, Radix UI, shadcn-style primitives |
| Language  | TypeScript                                                  |
| Motion    | Motion for React with reduced-motion safeguards             |
| Forms     | React Hook Form and Zod                                     |
| Carousels | Embla Carousel                                              |
| Icons     | Lucide React and React Icons                                |
| Tooling   | pnpm, ESLint, Prettier                                      |

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
lib/                 Search, metadata, projection, and utility helpers
providers/           Application-wide provider composition
public/              Images, SVG assets, and brand media
docs/                Design, route, workflow, and implementation documentation
```

The key ownership rule is simple: `content/` owns editable data, `schemas/`
owns runtime validation, `types/` owns contracts, and components own
presentation.

## Project Status

The public frontend and static Academy content surfaces are implemented. The
next major phase is production content and service integration:

- Sanity CMS and editorial workflows
- Resend-backed form and newsletter delivery
- Real partner, social, programme, and organisational content
- Analytics, content search, and launch hardening

Until those services are connected, forms remain clearly labelled preview
experiences and no submission is presented as saved or delivered.

## Documentation

This repository uses lightweight working specifications so contributors can
continue without relying on chat history.

- [`AGENTS.md`](./AGENTS.md) — repository rules and ownership boundaries
- [`CLAUDE.md`](./CLAUDE.md) — implementation guidance
- [`docs/README.md`](./docs/README.md) — documentation index
- [`docs/design-system.md`](./docs/design-system.md) — visual language and tokens
- [`docs/layout-system.md`](./docs/layout-system.md) — responsive layout rules
- [`docs/routes/`](./docs/routes) — route-by-route specifications
- [`docs/implementation-log.md`](./docs/implementation-log.md) — development history and handoffs

## Quality Gate

Before handing off a completed change:

```bash
pnpm format
pnpm lint
pnpm typecheck
pnpm build
```

## Deployment

The application is optimized for Vercel and can be deployed to any platform
that supports Next.js. The current static-first build does not require
environment variables; future Sanity and email integrations will introduce
their own documented configuration.

---

<div align="center">
  <strong>Building Africa's connected agribusiness ecosystem.</strong>
</div>
