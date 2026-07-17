import { defineArrayMember, defineField, defineType } from "sanity";

import { createSlugIsUnique } from "@/sanity/schemaTypes/shared/slug-validator";

export const academyCourse = defineType({
  name: "academyCourse",
  title: "Course",
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
        isUnique: createSlugIsUnique("academyCourse"),
      },
      validation: (Rule) => Rule.required(),
      description:
        "Treat as append-only once published — editing the slug after first publish breaks existing links.",
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "BEGINNER" },
          { title: "Intermediate", value: "INTERMEDIATE" },
          { title: "Advanced", value: "ADVANCED" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g. "6 WEEKS"',
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
      description:
        "Used on Academy cards, course detail pages, and as the fallback social sharing image.",
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
      name: "modules",
      title: "Modules",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.required().min(1),
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
    select: { title: "title", subtitle: "level", media: "image" },
  },
});
