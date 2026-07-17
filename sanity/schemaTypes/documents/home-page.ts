import { defineField, defineType } from "sanity";

import { resolveVideoEmbed } from "@/lib/video-embeds";

const SLOT_DESCRIPTION =
  "Order, icon, colour, link and layout are controlled by the website.";

function fixedImageTextSlotField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "fixedImageTextSlot",
    description: SLOT_DESCRIPTION,
    validation: (Rule) => Rule.required(),
  });
}

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero message" },
    { name: "media", title: "Section media" },
    { name: "services", title: "Services" },
    { name: "valueChains", title: "Value chains" },
  ],
  fields: [
    defineField({
      name: "heroMessage",
      title: "Hero message",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "title",
          title: "Headline",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatWeDoPoster",
      title: "What We Do poster",
      type: "imageWithAlt",
      group: "media",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatWeDoVideoUrl",
      title: "What We Do video URL (optional)",
      description:
        "Paste the public YouTube or Vimeo video URL. When blank or invalid, the website shows only the poster image and no play button.",
      type: "url",
      group: "media",
      validation: (Rule) =>
        Rule.custom((value) =>
          !value || (typeof value === "string" && resolveVideoEmbed(value))
            ? true
            : "Enter a valid public YouTube or Vimeo video URL.",
        ),
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "object",
      group: "services",
      fields: [
        fixedImageTextSlotField("advisory", "Advisory"),
        fixedImageTextSlotField("training", "Training & Capacity Building"),
        fixedImageTextSlotField("resources", "Resources"),
        fixedImageTextSlotField("dealRoom", "Business Deal Room"),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "valueChains",
      title: "Value chains",
      type: "object",
      group: "valueChains",
      fields: [
        fixedImageTextSlotField("livestock", "Livestock & Poultry"),
        fixedImageTextSlotField("cottonGarment", "Cotton & Garment"),
        fixedImageTextSlotField("cropsGrains", "Crops & Grains"),
        fixedImageTextSlotField("horticulture", "Horticulture"),
        fixedImageTextSlotField("aquaculture", "Aquaculture & Fisheries"),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
