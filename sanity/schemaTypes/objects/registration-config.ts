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
        "Open on this site — use the iProduce registration form. Webinar registration closes at the optional deadline, or when the session starts if no deadline is set.\n\nCollect interest only — use the iProduce form as an interest or waitlist signup. Without a deadline, this remains open after a webinar starts.\n\nSend to an external page — open Zoom, Eventbrite, or another provider in a new tab. That provider owns registration records and emails; the iProduce form is not used.\n\nRegistration closed — hide signup and show the closed message.",
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
      name: "providerName",
      title: "External provider name (optional)",
      description:
        'Name shown in public copy, for example "Zoom" or "Eventbrite". When empty, the website uses "external platform".',
      type: "string",
      hidden: ({ parent }) => parent?.mode !== "external",
    }),
    defineField({
      name: "closesAt",
      title: "Registration closes at (optional)",
      description:
        "For webinars only. Leave blank to close normal on-site registration when the session starts. Interest and external registration remain available unless a deadline or closed mode is set.",
      type: "datetime",
      hidden: ({ document }) => document?._type !== "academyWebinar",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!value) return true;
          const document = context.document as { date?: string } | undefined;
          if (!document?.date) return true;
          return Date.parse(value) <= Date.parse(document.date)
            ? true
            : "Registration must close at or before the session start time.";
        }),
    }),
    defineField({
      name: "label",
      title: "Button text (optional)",
      description:
        'Override the default button wording, e.g. "Reserve a seat" or "Join the waitlist". External links open in a new tab.',
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
