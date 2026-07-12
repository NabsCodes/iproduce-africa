import { defineField, defineType } from "sanity";

import {
  isValidSocialValue,
  SOCIAL_PLATFORM_OPTIONS,
} from "@/lib/sanity/social-platforms";

/** Titles here match `sanity/structure.ts`'s "Team Members" sub-list names. */
const GROUP_OPTIONS = [
  { title: "Team", value: "team" },
  { title: "Advisor", value: "advisor" },
];

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
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
      name: "group",
      title: "Group",
      type: "string",
      description:
        "Which About-page section this person appears in. Creating from a Team Members sub-list prefills this value.",
      options: { list: GROUP_OPTIONS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "credentials",
      title: "Credentials (optional)",
      type: "string",
      description:
        "Shown under the role in the profile dialog, for example degrees or licences.",
    }),
    defineField({
      name: "bioSummary",
      title: "Bio summary",
      type: "text",
      rows: 3,
      description: "Short excerpt shown on the card.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bioParagraphs",
      title: "Bio paragraphs",
      type: "array",
      description:
        "Full biography shown in the profile dialog, one paragraph per entry.",
      of: [{ type: "text", rows: 3 }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "socials",
      title: "Social links (optional)",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: { list: SOCIAL_PLATFORM_OPTIONS },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description:
                "Full https:// URL for social/website links, the plain email address for Email, or the plain phone number for Phone.",
              validation: (Rule) =>
                Rule.required().custom((value, context) => {
                  const platform = (
                    context.parent as { platform?: string } | undefined
                  )?.platform;
                  if (!value || !platform) return true;
                  if (isValidSocialValue(platform, value)) return true;
                  if (platform === "email") {
                    return "Enter a valid email address.";
                  }
                  if (platform === "phone") {
                    return "Enter a valid phone number.";
                  }
                  return "Enter a full URL starting with http:// or https://.";
                }),
            }),
            defineField({
              name: "label",
              title: "Label (optional)",
              type: "string",
              description:
                "Overrides the default accessible name for this link.",
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display order (optional)",
      type: "number",
      description:
        "Lower numbers appear first. Leave blank to place this person after numbered entries, sorted by name.",
      validation: (Rule) => Rule.integer().min(1),
    }),
  ],
  preview: {
    select: { title: "name", role: "role", group: "group", media: "photo" },
    prepare({ title, role, group, media }) {
      const groupLabel =
        GROUP_OPTIONS.find((option) => option.value === group)?.title ?? group;
      return {
        title,
        subtitle: [groupLabel, role].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
