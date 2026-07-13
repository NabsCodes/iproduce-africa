import { defineField, defineType } from "sanity";

export const legalSection = defineType({
  name: "legalSection",
  title: "Section",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Section ID",
      type: "string",
      description: "Stable anchor id used by the legal page layout.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      of: [{ type: "text" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "table",
      title: "Table",
      type: "legalTable",
    }),
  ],
  preview: {
    select: { title: "title", id: "id" },
    prepare({ title, id }) {
      return { title: title ?? "Section", subtitle: id };
    },
  },
});
