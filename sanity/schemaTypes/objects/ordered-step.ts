import { defineField, defineType } from "sanity";

/**
 * Inserted as individual sibling entries in an article `body` array (not
 * nested in a list container). The fetch-side PT adapter groups consecutive
 * `orderedStep` entries into one `list_ordered` block.
 */
export const orderedStep = defineType({
  name: "orderedStep",
  title: "Ordered step",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "body" },
  },
});
