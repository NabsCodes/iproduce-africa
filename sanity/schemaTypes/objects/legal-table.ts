import { defineField, defineType } from "sanity";

export const legalTable = defineType({
  name: "legalTable",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "headers",
      title: "Headers",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [{ type: "legalTableRow" }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
