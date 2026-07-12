import { defineField, defineType } from "sanity";

import { createSlugIsUnique } from "@/sanity/schemaTypes/shared/slug-validator";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The stable public identifier for this partner.",
      options: {
        source: "name",
        isUnique: createSlugIsUnique("partner"),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
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
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "showInMarquee",
      title: "Show in Home marquee",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showInVoices",
      title: "Show in Partners voices logo grid",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers surface first.",
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
