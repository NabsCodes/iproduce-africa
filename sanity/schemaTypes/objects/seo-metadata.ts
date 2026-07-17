import { defineField, defineType } from "sanity";

export const seoMetadata = defineType({
  name: "seoMetadata",
  title: "Search & sharing",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO title (optional)",
      description:
        "Overrides the public page title used by search engines and social previews. Leave blank to use the content title.",
      type: "string",
      validation: (Rule) =>
        Rule.max(60).warning(
          "Titles above roughly 60 characters may be shortened in search results.",
        ),
    }),
    defineField({
      name: "description",
      title: "Meta description (optional)",
      description:
        "Short search-result summary. Leave blank to use the existing excerpt or description.",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning(
          "Descriptions above roughly 160 characters may be shortened in search results.",
        ),
    }),
    defineField({
      name: "image",
      title: "Social sharing image (optional)",
      description:
        "Used when this page is shared. Leave blank to use the article hero/card image or the webinar/course image.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
