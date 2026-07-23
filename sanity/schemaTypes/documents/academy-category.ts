import { defineField, defineType } from "sanity";

import { createSlugIsUnique } from "@/sanity/schemaTypes/shared/slug-validator";

const toneOptions = [
  { title: "Orange", value: "tangerine" },
  { title: "Light green", value: "leaf" },
  { title: "Dark green", value: "forest" },
];

export const academyCategory = defineType({
  name: "academyCategory",
  title: "Academy Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Category name",
      type: "string",
      description:
        'The public label shown on cards and filter buttons, for example "Market Insights".',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Click Generate after entering the name. This stable value is used internally for filtering.",
      options: {
        source: "name",
        maxLength: 80,
        isUnique: createSlugIsUnique("academyCategory"),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "appliesToArticles",
      title: "Available for Articles",
      type: "boolean",
      description:
        "Allow editors to choose this category when creating or updating an Academy Article.",
      initialValue: false,
    }),
    defineField({
      name: "appliesToWebinars",
      title: "Available for Webinars & Events",
      type: "boolean",
      description:
        "Allow editors to choose this category when creating or updating a Webinar or Event.",
      initialValue: false,
    }),
    defineField({
      name: "tone",
      title: "Badge colour",
      type: "string",
      description:
        "Controls the category badge colour everywhere this category appears.",
      options: { list: toneOptions, layout: "radio" },
      initialValue: "tangerine",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description:
        "Lower numbers appear first in public filters. Use 10, 20, 30 so categories can be inserted later.",
      validation: (Rule) => Rule.required().integer().min(1),
    }),
  ],
  preview: {
    select: {
      title: "name",
      articles: "appliesToArticles",
      webinars: "appliesToWebinars",
      tone: "tone",
    },
    prepare({ title, articles, webinars, tone }) {
      const surfaces = [
        articles ? "Articles" : null,
        webinars ? "Webinars & Events" : null,
      ].filter(Boolean);

      return {
        title,
        subtitle: `${surfaces.join(" · ") || "Archived from new assignments"} · ${tone ?? "No colour"}`,
      };
    },
  },
});
