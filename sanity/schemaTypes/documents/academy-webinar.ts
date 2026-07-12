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
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Webinar", value: "WEBINAR" },
          { title: "Training", value: "TRAINING" },
          { title: "Live Q&A", value: "LIVE Q&A" },
          { title: "Event", value: "EVENT" },
        ],
      },
      initialValue: "WEBINAR",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
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
  ],
  preview: {
    select: { title: "title", subtitle: "type", media: "image" },
  },
});
