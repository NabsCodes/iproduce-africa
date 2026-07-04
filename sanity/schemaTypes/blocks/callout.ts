import { defineField, defineType } from "sanity";

export const callout = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "text" },
  },
});
