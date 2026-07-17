import { defineField, defineType } from "sanity";

import { resolveVideoEmbed } from "@/lib/video-embeds";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "story", title: "Story" },
    { name: "mvo", title: "Mission, Vision & Objective" },
  ],
  fields: [
    defineField({
      name: "story",
      title: "Story",
      type: "object",
      group: "story",
      fields: [
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text" }],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: "image",
          title: "Poster image",
          type: "image",
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "imageAlt",
          title: "Poster alt text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "videoUrl",
          title: "Story video URL (optional)",
          description:
            "Paste the public YouTube or Vimeo video URL. When blank or invalid, the website shows only the poster image and no play button.",
          type: "url",
          validation: (Rule) =>
            Rule.custom((value) =>
              !value || (typeof value === "string" && resolveVideoEmbed(value))
                ? true
                : "Enter a valid public YouTube or Vimeo video URL.",
            ),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "missionVisionObjective",
      title: "Mission, Vision & Objective",
      type: "object",
      group: "mvo",
      fields: [
        defineField({
          name: "mission",
          title: "Mission body",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "vision",
          title: "Vision body",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "objective",
          title: "Objective body",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
