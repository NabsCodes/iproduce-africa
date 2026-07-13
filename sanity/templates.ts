import type { Template } from "sanity";

/**
 * Initial-value templates for the filtered Studio lists in
 * `sanity/structure.ts`. Each corresponds 1:1 to one "create from here"
 * destination, so creating a testimonial from the Academy list (for
 * example) prefills `placement: "academy"` instead of leaving an editor to
 * remember to set it themselves — a document with an unset/wrong
 * `placement`/`page` simply wouldn't show up in the list they created it
 * from.
 */
export const customTemplates: Template[] = [
  {
    id: "testimonial-home",
    title: "Testimonial (Home)",
    schemaType: "testimonial",
    value: { placement: "home" },
  },
  {
    id: "testimonial-academy",
    title: "Testimonial (Academy)",
    schemaType: "testimonial",
    value: { placement: "academy" },
  },
  {
    id: "testimonial-partners-voices",
    title: "Testimonial (Partner Voices)",
    schemaType: "testimonial",
    value: { placement: "partners-voices" },
  },
  {
    id: "faq-home",
    title: "FAQ (Home & Contact)",
    schemaType: "faq",
    value: { page: "home" },
  },
  {
    id: "faq-academy",
    title: "FAQ (Academy)",
    schemaType: "faq",
    value: { page: "academy" },
  },
  {
    id: "faq-community",
    title: "FAQ (Community)",
    schemaType: "faq",
    value: { page: "community" },
  },
  {
    id: "faq-partners",
    title: "FAQ (Partners)",
    schemaType: "faq",
    value: { page: "partners" },
  },
  {
    id: "team-member-team",
    title: "Team Member (Team)",
    schemaType: "teamMember",
    value: { group: "team" },
  },
  {
    id: "team-member-advisor",
    title: "Team Member (Advisor)",
    schemaType: "teamMember",
    value: { group: "advisor" },
  },
];

/**
 * Sanity auto-generates one default template per document type, id equal
 * to the schema type name (`testimonial`, `faq`, `teamMember`) — it
 * doesn't set `placement`/`page`/`group`. With `customTemplates` above
 * covering every real destination, these defaults are pure ambiguity: the
 * global "+" Create menu would otherwise offer a generic
 * "Testimonial"/"FAQ"/"Team Member" alongside the named ones, and creating
 * from there leaves the document unclassified until an editor manually
 * sets `placement`/`page`/`group`. Filtered out in `sanity.config.ts` via
 * `document.newDocumentOptions`.
 */
export const DEFAULT_TEMPLATE_IDS_TO_HIDE = [
  "testimonial",
  "faq",
  "teamMember",
  "siteSettings",
  "homePage",
  "aboutPage",
  "legalPage",
];
