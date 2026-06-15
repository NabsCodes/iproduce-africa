# Footer Spec

## Status

Desktop footer direction is now implemented against the supplied screenshot.
Newsletter remains UI-only, and placeholder footer links stay non-interactive
until the matching routes or flows exist.

## Purpose

The footer should close the site with confidence, useful navigation, and strong
brand tone without pretending final integrations already exist.

## Confirmed Inputs

- Approved desktop screenshot supplied: `footer.png`
- Shared footer exists across all public routes
- Current social destinations are data-driven from `content/site.ts`, but final
  URLs are still pending
- Address data now lives in `content/site.ts`
- Newsletter treatment is static-only until a later phase
- Footer can include visible placeholder items from the design, but they should
  not become dead links

## Current Questions

- final social/contact destinations
- exact mobile footer sign-off against a dedicated reference, if one is shared
- future legal and careers routes once those pages are in scope

## Checklist

- [x] Approved footer screenshot documented
- [x] Information architecture approved for the static MVP
- [x] Placeholder links identified clearly
- [x] Desktop composition approved in code
- [ ] Mobile composition approved
- [x] Footer copy aligned with static MVP boundaries
- [x] Newsletter block marked for later integration
