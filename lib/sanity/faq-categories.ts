/**
 * Single source of truth for which FAQ categories are valid on which page —
 * imported by both the Studio schema (`sanity/schemaTypes/documents/faq.ts`,
 * for authoring-time validation) and the fetch layer
 * (`lib/sanity/fetch/faqs.ts`, for defensive filtering) so the two can't
 * drift. A category valid on one page but not another (e.g. `Partnership`
 * on an Academy FAQ) would only ever show up under the "All" tab — silently
 * missing its own filtered tab.
 */

export type FaqPage = "home" | "academy" | "community" | "partners";

export const FAQ_CATEGORIES_BY_PAGE: Record<FaqPage, readonly string[]> = {
  home: ["Platform", "Membership", "Partners"],
  academy: ["Courses", "Webinars & Events", "Membership"],
  community: ["Platform", "Membership", "Partners"],
  partners: ["Partnership", "Sponsorship", "Process"],
};

export const ALL_FAQ_CATEGORIES: readonly string[] = Array.from(
  new Set(Object.values(FAQ_CATEGORIES_BY_PAGE).flat()),
);
