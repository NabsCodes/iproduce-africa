import { defineField, defineType } from "sanity";

export const fixedImageTextSlot = defineType({
  name: "fixedImageTextSlot",
  title: "Fixed image + text slot",
  type: "object",
  description:
    "Order, icon, colour, link and layout are controlled by the website.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
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
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
