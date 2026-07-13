import type { StructureBuilder, StructureResolver } from "sanity/structure";

import { apiVersion } from "@/sanity/env";

function singletonItem(
  S: StructureBuilder,
  schemaType: string,
  title: string,
  documentId: string,
) {
  return S.listItem()
    .title(title)
    .id(documentId)
    .child(
      S.document().schemaType(schemaType).documentId(documentId).title(title),
    );
}

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

/** Same idea as `testimonialsByPlacement`, scoped to `teamMember`'s `group`
 * field — a person is Team or Advisor, never both. */
function teamMembersByGroup(
  S: StructureBuilder,
  title: string,
  group: string,
  templateId: string,
) {
  return S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .schemaType("teamMember")
        .apiVersion(apiVersion)
        .filter('_type == "teamMember" && group == $group')
        .params({ group })
        .initialValueTemplates([S.initialValueTemplateItem(templateId)]),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singletonItem(S, "siteSettings", "Site Settings", "siteSettings"),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              singletonItem(S, "homePage", "Home", "homePage"),
              singletonItem(S, "aboutPage", "About", "aboutPage"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Academy")
        .child(
          S.list()
            .title("Academy")
            .items([
              S.documentTypeListItem("academyArticle").title("Articles"),
              S.documentTypeListItem("academyWebinar").title(
                "Webinars & Events",
              ),
              S.documentTypeListItem("academyCourse").title("Courses"),
              S.documentTypeListItem("author").title("Authors"),
            ]),
        ),
      S.documentTypeListItem("partner").title("Partners"),
      S.listItem()
        .title("Testimonials")
        .child(
          S.list()
            .title("Testimonials")
            .items([
              testimonialsByPlacement(S, "Home", "home", "testimonial-home"),
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
              S.listItem()
                .title("All testimonials")
                .child(
                  S.documentList()
                    .title("All testimonials")
                    .schemaType("testimonial")
                    .apiVersion(apiVersion)
                    .filter('_type == "testimonial"')
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
      S.listItem()
        .title("Team & Advisors")
        .child(
          S.list()
            .title("Team & Advisors")
            .items([
              teamMembersByGroup(S, "Team", "team", "team-member-team"),
              teamMembersByGroup(
                S,
                "Advisors",
                "advisor",
                "team-member-advisor",
              ),
              S.divider(),
              S.listItem()
                .title("All Team & Advisors")
                .child(
                  S.documentList()
                    .title("All Team & Advisors")
                    .schemaType("teamMember")
                    .apiVersion(apiVersion)
                    .filter('_type == "teamMember"')
                    .initialValueTemplates([]),
                ),
            ]),
        ),
      S.documentTypeListItem("memberStory").title("Member Stories"),
      S.divider(),
      S.listItem()
        .title("Legal Pages")
        .child(
          S.list()
            .title("Legal Pages")
            .items([
              singletonItem(S, "legalPage", "Privacy", "legalPage.privacy"),
              singletonItem(S, "legalPage", "Terms", "legalPage.terms"),
              singletonItem(S, "legalPage", "Cookies", "legalPage.cookies"),
              singletonItem(
                S,
                "legalPage",
                "Accessibility",
                "legalPage.accessibility",
              ),
            ]),
        ),
    ]);
