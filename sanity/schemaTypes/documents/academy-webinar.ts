import { defineArrayMember, defineField, defineType } from "sanity";

import { createSlugIsUnique } from "@/sanity/schemaTypes/shared/slug-validator";

export const academyWebinar = defineType({
  name: "academyWebinar",
  title: "Webinar / Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: createSlugIsUnique("academyWebinar"),
      },
      validation: (Rule) => Rule.required(),
      description:
        "Treat as append-only once published — editing the slug after first publish breaks existing links.",
    }),
    defineField({
      name: "categoryRef",
      title: "Category",
      type: "reference",
      to: [{ type: "academyCategory" }],
      description:
        "Choose the label used on Webinar/Event cards and public filters. Manage options under Academy → Categories.",
      options: {
        filter: "appliesToWebinars == true",
      },
      validation: (Rule) =>
        Rule.required().error(
          "Choose a Webinar/Event category before publishing.",
        ),
    }),
    defineField({
      name: "type",
      title: "Legacy type",
      type: "string",
      hidden: true,
      readOnly: true,
      description:
        "Temporary rollback value retained for one stable release after category migration.",
    }),
    defineField({
      name: "date",
      title: "Start date & time",
      type: "datetime",
      description:
        "Controls the countdown and when automatic registration closes.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date & time (optional)",
      type: "datetime",
      description:
        "Add this when the event should display as Happening now after it starts. Without an end time, the next scheduled webinar is promoted when this event starts.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!value) return true;

          const parent = context.parent as { date?: string } | undefined;
          if (!parent?.date) return true;

          return Date.parse(value) > Date.parse(parent.date)
            ? true
            : "End date & time must be after the start date & time.";
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Used on Academy cards, webinar detail pages, and as the fallback social sharing image.",
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
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "text",
          validation: (Rule) => Rule.max(2000),
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "dateLabel",
      title: "Date label override",
      type: "string",
      description:
        "Optional display override. The public UI falls back to the formatted date when this is empty.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
    }),
    defineField({
      name: "speakers",
      title: "Speakers",
      type: "string",
    }),
    defineField({
      name: "registration",
      title: "Registration",
      type: "registrationConfig",
    }),
    defineField({
      name: "seo",
      title: "Search & sharing",
      type: "seoMetadata",
    }),
  ],
  preview: {
    select: {
      title: "title",
      categoryName: "categoryRef.name",
      legacyType: "type",
      media: "image",
    },
    prepare({ title, categoryName, legacyType, media }) {
      return {
        title,
        subtitle: categoryName ?? legacyType ?? "Category not selected",
        media,
      };
    },
  },
});
