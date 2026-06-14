# Layout System

This project needs a strong shared layout rhythm so the Home page can be
designed precisely without every section inventing its own structure.

## Page Architecture

- the root app layout owns header, main, and footer for now
- `PageHero` is the current shared intro pattern for secondary public pages
- `Container` is the main width constraint and should stay the default outer
  wrapper unless a full-bleed design reason exists.

## Container Rules

`components/ui/container.tsx` is the baseline layout wrapper:

- max width: `1312px`
- horizontal padding: `20px` mobile, `32px` small screens, `64px` desktop

Do not create one-off container widths without a clear design need.

## Section Postures

Use a small set of repeatable section postures.

### 1. Editorial / Open

Use for story-led sections with more white space and less chrome.

- typography and spacing do most of the work
- background can stay open or lightly tinted
- ideal for intros, narrative blocks, and simple CTAs

### 2. Framed Product Surface

Use for sections that need more structure or proof.

- rounded surface
- subtle border or tinted fill
- stronger internal rhythm for cards, stats, or filters

### 3. Split Narrative + Media

Use for sections where copy and imagery need equal weight.

- keep one clear dominant side
- avoid making both sides equally noisy

### 4. Repeated Card Grid

Use for pillars, value chains, testimonials, or article previews.

- define one repeated card language
- avoid changing radius, shadow, and padding from card to card

## Spacing Rhythm

Default to a predictable vertical rhythm:

- standard section padding: generous on desktop, slightly tighter on mobile
- large section gaps should feel intentional, not accidental
- inner card spacing should tighten as density increases

When a section breaks rhythm, it should be because the design needs contrast,
not because the classes drifted.

## Radius Discipline

Keep a clear hierarchy:

- large outer modules
- one smaller repeated inner-card radius
- circular elements only for intentional pills, avatars, or icon buttons

Avoid mixing too many radius values on one screen.

## Desktop And Mobile Are Different Layouts

390px is a required design checkpoint.

Mobile rules:

- stack content with a clear reading order
- allow cards to become full-width or horizontally scrollable only when the
  pattern truly needs it
- simplify decorative layers before sacrificing readability
- keep tap targets comfortable

Desktop rules:

- preserve the intended negative space
- avoid oversized line lengths
- keep split layouts balanced and anchored

## Secondary Route Structure

For now, the public route pattern is:

1. shared header
2. page lead
3. route-specific sections when ready
4. shared footer

This keeps `/about`, `/academy`, `/community`, `/partners`, and `/contact`
consistent while the Home page remains the primary design milestone.

Route groups are intentionally deferred for now because all current pages share
the same public structure. Introduce them later only if route behavior or shells
start to diverge.

## Abstraction Rule

Introduce a new shared layout primitive only when:

- the pattern appears in at least a few places, and
- the abstraction clarifies the code instead of hiding layout decisions

This repo should feel structured, not over-engineered.
