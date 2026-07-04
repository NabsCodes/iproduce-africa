import { defineField, defineType } from "sanity";

export const registrationConfig = defineType({
  name: "registrationConfig",
  title: "Registration",
  type: "object",
  fields: [
    defineField({
      name: "mode",
      title: "Mode",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Interest", value: "interest" },
          { title: "External", value: "external" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "open",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => parent?.mode !== "external",
    }),
    defineField({
      name: "label",
      title: "Button label override",
      type: "string",
    }),
    defineField({
      name: "closedLabel",
      title: "Closed label",
      type: "string",
    }),
  ],
});
