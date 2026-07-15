import { defineField, defineType } from "sanity";

export const registrationConfig = defineType({
  name: "registrationConfig",
  title: "Registration",
  type: "object",
  fields: [
    defineField({
      name: "mode",
      title: "How people register",
      description:
        "Open on this site — show the iProduce registration form. For webinars, registration closes automatically when the session starts.\n\nCollect interest only — use the same form as an interest / waitlist signup (typical for courses).\n\nSend to an external page — button opens your Zoom, Eventbrite, or other link instead of our form.\n\nRegistration closed — hide signup and show the closed message.",
      type: "string",
      options: {
        list: [
          {
            title: "Open on this site",
            value: "open",
          },
          {
            title: "Collect interest only",
            value: "interest",
          },
          {
            title: "Send to an external page",
            value: "external",
          },
          {
            title: "Registration closed",
            value: "closed",
          },
        ],
        layout: "radio",
      },
      initialValue: "open",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "External registration page",
      description:
        "Full URL for Zoom, Eventbrite, or another signup page. Only used when “Send to an external page” is selected.",
      type: "url",
      hidden: ({ parent }) => parent?.mode !== "external",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mode?: string } | undefined;
          if (parent?.mode === "external" && !value) {
            return "Add the external page URL, or choose a different registration option.";
          }
          return true;
        }),
    }),
    defineField({
      name: "label",
      title: "Button text (optional)",
      description:
        'Override the default button wording, e.g. "Reserve a seat" or "Join the waitlist".',
      type: "string",
    }),
    defineField({
      name: "closedLabel",
      title: "Closed message (optional)",
      description:
        'Shown when registration is closed, e.g. "Registration has closed for this session."',
      type: "string",
    }),
  ],
});
