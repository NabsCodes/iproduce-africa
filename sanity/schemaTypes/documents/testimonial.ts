import { defineField, defineType } from "sanity";

/** Titles here match `sanity/structure.ts`'s "Testimonials" sub-list names. */
const PLACEMENT_OPTIONS = [
  { title: "Home", value: "home" },
  { title: "Academy", value: "academy" },
  { title: "Partner Voices", value: "partners-voices" },
];

const PLACEMENT_LABEL_BY_VALUE = Object.fromEntries(
  PLACEMENT_OPTIONS.map(({ title, value }) => [value, title]),
);

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "initials",
      title: "Initials",
      type: "string",
      description: "Fallback avatar text shown when no photo is set.",
    }),
    defineField({
      name: "placement",
      title: "Placement",
      type: "string",
      description:
        "Kept editable so an editor can deliberately move a testimonial between surfaces — the Studio list an editor created from (see the Trust & Content desk group) just prefills this.",
      options: { list: PLACEMENT_OPTIONS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers surface first within this placement.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      role: "role",
      placement: "placement",
      media: "image",
    },
    prepare({ title, role, placement, media }) {
      const placementLabel = PLACEMENT_LABEL_BY_VALUE[placement] ?? placement;
      return {
        title,
        subtitle: [placementLabel, role].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
