import { defineField, defineType } from "sanity";

const LEGAL_KEYS = [
  { title: "Privacy", value: "privacy" },
  { title: "Terms", value: "terms" },
  { title: "Cookies", value: "cookies" },
  { title: "Accessibility", value: "accessibility" },
];

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Document key",
      type: "string",
      readOnly: true,
      options: { list: LEGAL_KEYS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last updated",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "baselineNotice",
      title: "Baseline notice",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "position",
          title: "Position",
          type: "string",
          options: {
            list: [
              { title: "Top", value: "top" },
              { title: "Bottom", value: "bottom" },
            ],
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [{ type: "legalSection" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", key: "key" },
    prepare({ title, key }) {
      return { title: title ?? "Legal Page", subtitle: key };
    },
  },
});
