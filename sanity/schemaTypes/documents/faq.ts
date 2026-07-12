import { defineField, defineType } from "sanity";

import {
  ALL_FAQ_CATEGORIES,
  FAQ_CATEGORIES_BY_PAGE,
  type FaqPage,
} from "@/lib/sanity/faq-categories";

/**
 * Titles here match `sanity/structure.ts`'s "FAQs" sub-list names. "Home &
 * Contact" (not just "Home") is deliberate — Contact intentionally reuses
 * the `page: "home"` FAQ collection, so the Studio label should say so.
 */
const PAGE_OPTIONS = [
  { title: "Home & Contact", value: "home" },
  { title: "Academy", value: "academy" },
  { title: "Community", value: "community" },
  { title: "Partners", value: "partners" },
];

const PAGE_LABEL_BY_VALUE = Object.fromEntries(
  PAGE_OPTIONS.map(({ title, value }) => [value, title]),
);

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        "Studio lists every known category across all pages; must still match one of the categories valid for the selected Page below.",
      options: {
        list: ALL_FAQ_CATEGORIES.map((value) => ({ title: value, value })),
      },
      validation: (Rule) =>
        Rule.required().custom((category, context) => {
          const page = (context.document as { page?: FaqPage } | undefined)
            ?.page;
          if (!page || !category) return true;
          const allowed = FAQ_CATEGORIES_BY_PAGE[page];
          if (!allowed) return true;
          return allowed.includes(category as string)
            ? true
            : `"${category}" isn't a valid category for the "${page}" page. Valid categories: ${allowed.join(", ")}.`;
        }),
    }),
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      description:
        "Kept editable so an editor can deliberately move an FAQ between pages — the Studio list an editor created from (see the Trust & Content desk group) just prefills this.",
      options: { list: PAGE_OPTIONS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers surface first within this page.",
    }),
  ],
  preview: {
    select: { title: "question", page: "page", category: "category" },
    prepare({ title, page, category }) {
      const pageLabel = PAGE_LABEL_BY_VALUE[page] ?? page;
      return {
        title,
        subtitle: [pageLabel, category].filter(Boolean).join(" · "),
      };
    },
  },
});
