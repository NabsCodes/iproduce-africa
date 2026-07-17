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
      description:
        "Optional profile photo shown beside the person's name. Choose a clear portrait and use the hotspot to keep the face centred.",
      options: { hotspot: true },
    }),
    defineField({
      name: "initials",
      title: "Initials",
      type: "string",
      description:
        "Optional fallback shown when no photo is set. Leave blank to generate initials automatically from the person's name.",
      validation: (Rule) =>
        Rule.max(4).warning(
          "Keep avatar initials to four characters or fewer.",
        ),
    }),
    defineField({
      name: "placement",
      title: "Placement",
      type: "string",
      description:
        "The page area where this testimonial appears. Creating it from a Testimonials sub-list prefills this value.",
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
