# Community Membership Application Dialog Spec

## Status

Shipped 2026-06-19. Three-step dialog + success panel driven by supplied
screenshots (About you → Your work → Review → Application received).

## Purpose

Offer a focused, step-by-step membership application flow from primary
`Join our Community` CTAs without replacing the inline form at
`#membership-application`. POSTs to `/api/community/application` with
`source: "dialog"` (Resend internal + receipt, Turnstile on review step).

## Trigger points

| Location                 | Component                   | Behaviour                                      |
| ------------------------ | --------------------------- | ---------------------------------------------- |
| Hero primary CTA         | `CommunityHeroSection`      | Opens dialog                                   |
| Apply banner green CTA   | `CommunityApplyBanner`      | Opens dialog                                   |
| Apply banner outline CTA | `CommunityApplyBanner`      | Scroll link to `#member-benefits`              |
| Inline form (section 10) | `MembershipApplicationForm` | Full single-page form with role field          |
| Bottom CTA green button  | `CtaSection`                | Opens dialog via `action: "membership-dialog"` |

## Wizard steps

1. **About you** — `fullName`, `country` (+ Other specify), `email`, `phone` (2×2 grid on sm+)
2. **Your work** — `organisation`, `sector` (+ Other specify), `reason` textarea
3. **Review** — read-only summary card (avatar initials, org · sector, badge, six fields, why-join quote)

No `role` field in the dialog (design omission). Inline form still collects role.

## Reuse map

| Piece                    | Location                                                      | Notes                                               |
| ------------------------ | ------------------------------------------------------------- | --------------------------------------------------- |
| Shell / stepper / footer | `components/shared/multi-step-dialog/*`                       | Same as Become Partner                              |
| Form fields              | `components/shared/form-fields.tsx`                           | Text, Select, Phone, Textarea                       |
| Schema                   | `schemas/community.ts`                                        | `membershipApplicationDialogSchema` + per-step maps |
| Content                  | `content/community.ts` → `application.dialog`                 | Steps, labels, success copy, next steps             |
| Types                    | `types/community.ts`                                          | `MembershipApplicationDialogContent`                |
| Review UI                | `components/community/membership-application-review-step.tsx` | Bespoke review card                                 |
| Dialog                   | `components/community/membership-application-dialog.tsx`      | Orchestrates wizard                                 |

## Success state

Extended shared `MultiStepDialogSuccessPanel` supports optional `nextSteps[]`
(three numbered items in leaf-50 box). Description uses
`{firstName}` template from submitted `fullName`.

Demo copy removed — live success copy from `content/community.ts`. Turnstile on
review step; honeypot on all steps.

## Verification

```bash
pnpm format && pnpm lint && pnpm typecheck && pnpm build
```

Browser:

- Open dialog from hero + both apply banners
- Step 1 → 2 → 3 navigation; Back works
- Other → specify on country/sector
- Review reflects entered values
- Submit → success with three next steps + Done / Explore the Academy
- Inline form at `#membership-application` still works independently

## Checklist

- [x] Three-step dialog implemented
- [x] Review step matches screenshot structure
- [x] Success panel with next steps
- [x] Hero + apply banner triggers wired
- [x] Schema split (dialog vs inline form)
- [x] Content in `content/community.ts`
- [x] Wire dialog to real submission endpoint (later phase)
- [x] Bottom CTA opens dialog through shared CTA action handling
