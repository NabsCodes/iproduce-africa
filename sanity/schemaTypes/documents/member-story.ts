import { defineField, defineType } from "sanity";

export const memberStory = defineType({
  name: "memberStory",
  title: "Member Story",
  type: "document",
  fields: [
    defineField({
      name: "result",
      title: "Result",
      type: "text",
      rows: 2,
      description: "The outcome headline shown at the top of the card.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "challenge",
      title: "Challenge",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "withIProduce",
      title: "With iProduce",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "age",
      title: "Age (optional)",
      type: "number",
      validation: (Rule) => Rule.integer().min(1),
    }),
    defineField({
      name: "initials",
      title: "Initials (optional)",
      type: "string",
      description: "Fallback avatar text. Derived from the name if left blank.",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order (optional)",
      type: "number",
      description:
        "Lower numbers appear first. Leave blank to place this story after numbered entries, sorted by name.",
      validation: (Rule) => Rule.integer().min(1),
    }),
  ],
  preview: {
    select: { title: "name", role: "role", country: "country" },
    prepare({ title, role, country }) {
      return {
        title,
        subtitle: [role, country].filter(Boolean).join(" · "),
      };
    },
  },
});
