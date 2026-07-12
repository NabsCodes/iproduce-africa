import { defineField, defineType } from "sanity";

import { createSlugIsUnique } from "@/sanity/schemaTypes/shared/slug-validator";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Partner name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Click Generate after entering the partner name. This is used internally and normally does not need editing.",
      options: {
        source: "name",
        isUnique: createSlugIsUnique("partner"),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description:
            'Describe the logo briefly, for example "Islamic Development Bank logo".',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "website",
      title: "Website (optional)",
      type: "url",
      description: "Leave blank if the partner does not have a public website.",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "showInMarquee",
      title: "Show in Home marquee",
      type: "boolean",
      description: "Show this logo in the moving partner row on the Home page.",
      initialValue: true,
    }),
    defineField({
      name: "showInVoices",
      title: "Show in Partners logo grid",
      type: "boolean",
      description:
        "Show this logo in the partner grid beside the Partner Voices section.",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display order (optional)",
      type: "number",
      description:
        "Lower numbers appear first. Leave blank to place this partner after numbered partners, sorted by name.",
      validation: (Rule) => Rule.integer().min(1),
    }),
  ],
  preview: {
    select: {
      title: "name",
      showInMarquee: "showInMarquee",
      showInVoices: "showInVoices",
      media: "logo",
    },
    prepare({ title, showInMarquee, showInVoices, media }) {
      const surfaces = [
        showInMarquee ? "Home marquee" : null,
        showInVoices ? "Voices grid" : null,
      ].filter(Boolean);
      return {
        title,
        subtitle:
          surfaces.length > 0
            ? surfaces.join(" · ")
            : "Hidden from logo surfaces",
        media,
      };
    },
  },
});
