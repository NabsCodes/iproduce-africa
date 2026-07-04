import { defineArrayMember, defineField, defineType } from "sanity";

const tableRow = defineField({
  name: "rows",
  title: "Rows",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      name: "tableRow",
      fields: [
        defineField({
          name: "cells",
          title: "Cells",
          type: "array",
          of: [{ type: "string" }],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
      preview: {
        select: { cells: "cells" },
        prepare({ cells }: { cells?: string[] }) {
          return { title: cells?.join(" | ") ?? "Row" };
        },
      },
    }),
  ],
  validation: (Rule) =>
    Rule.required()
      .min(1)
      .custom((rows, context) => {
        const headers = (context.parent as { headers?: string[] } | undefined)
          ?.headers;
        if (!headers?.length || !rows?.length) return true;

        const mismatched = (rows as { cells?: string[] }[]).some(
          (row) => (row.cells?.length ?? 0) !== headers.length,
        );

        return mismatched
          ? `Every row must have exactly ${headers.length} cells to match the headers`
          : true;
      }),
});

export const table = defineType({
  name: "table",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
    defineField({
      name: "headers",
      title: "Headers",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    tableRow,
  ],
  preview: {
    select: { title: "caption" },
    prepare({ title }) {
      return { title: title || "Table" };
    },
  },
});
