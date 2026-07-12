import type { StructureBuilder, StructureResolver } from "sanity/structure";

import { apiVersion } from "@/sanity/env";

/**
 * Filtered testimonial list scoped to one `placement` — editors "create
 * new" from here get exactly that placement prefilled (see
 * `sanity/templates.ts`), so they can't forget to tag it and wonder why it
 * doesn't show up where they expected.
 */
function testimonialsByPlacement(
  S: StructureBuilder,
  title: string,
  placement: string,
  templateId: string,
) {
  return S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .schemaType("testimonial")
        .apiVersion(apiVersion)
        .filter('_type == "testimonial" && placement == $placement')
        .params({ placement })
        .initialValueTemplates([S.initialValueTemplateItem(templateId)]),
    );
}

/** Same idea as `testimonialsByPlacement`, scoped to `faq`'s `page` field. */
function faqsByPage(
  S: StructureBuilder,
  title: string,
  page: string,
  templateId: string,
) {
  return S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .schemaType("faq")
        .apiVersion(apiVersion)
        .filter('_type == "faq" && page == $page')
        .params({ page })
        .initialValueTemplates([S.initialValueTemplateItem(templateId)]),
    );
}

// Academy catalogues + Authors, plus a Trust & Content group with filtered
// Testimonials/FAQs sub-lists — same underlying `testimonial`/`faq`
// documents, organized for editors by `placement`/`page` rather than
// exposed as one flat, unfiltered list. No Vision plugin.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("academyArticle").title("Articles"),
      S.documentTypeListItem("academyWebinar").title("Webinars & Events"),
      S.documentTypeListItem("academyCourse").title("Courses"),
      S.documentTypeListItem("author").title("Authors"),
      S.divider(),
      S.listItem()
        .title("Trust & Content")
        .child(
          S.list()
            .title("Trust & Content")
            .items([
              S.listItem()
                .title("Testimonials")
                .child(
                  S.list()
                    .title("Testimonials")
                    .items([
                      testimonialsByPlacement(
                        S,
                        "Home",
                        "home",
                        "testimonial-home",
                      ),
                      testimonialsByPlacement(
                        S,
                        "Academy",
                        "academy",
                        "testimonial-academy",
                      ),
                      testimonialsByPlacement(
                        S,
                        "Partner Voices",
                        "partners-voices",
                        "testimonial-partners-voices",
                      ),
                      S.divider(),
                      S.listItem().title("All testimonials").child(
                        S.documentList()
                          .title("All testimonials")
                          .schemaType("testimonial")
                          .apiVersion(apiVersion)
                          .filter('_type == "testimonial"')
                          // Browse-only — editors create from the
                          // correctly-labelled placement list above so
                          // `placement` is never left unset.
                          .initialValueTemplates([]),
                      ),
                    ]),
                ),
              S.listItem()
                .title("FAQs")
                .child(
                  S.list()
                    .title("FAQs")
                    .items([
                      faqsByPage(S, "Home & Contact", "home", "faq-home"),
                      faqsByPage(S, "Academy", "academy", "faq-academy"),
                      faqsByPage(S, "Community", "community", "faq-community"),
                      faqsByPage(S, "Partners", "partners", "faq-partners"),
                      S.divider(),
                      S.listItem()
                        .title("All FAQs")
                        .child(
                          S.documentList()
                            .title("All FAQs")
                            .schemaType("faq")
                            .apiVersion(apiVersion)
                            .filter('_type == "faq"')
                            .initialValueTemplates([]),
                        ),
                    ]),
                ),
              // One flat list, unlike Testimonials/FAQs — each partner
              // controls its own visibility via `showInMarquee`/
              // `showInVoices`, so there's no separate destination per
              // surface to filter into.
              S.documentTypeListItem("partner").title("Partners"),
            ]),
        ),
    ]);
