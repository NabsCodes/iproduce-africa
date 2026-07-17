import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  description:
    "Manage the public contact details and official social or community links used across the website.",
  type: "document",
  groups: [
    { name: "contact", title: "Contact details", default: true },
    { name: "social", title: "Social & community links" },
  ],
  fields: [
    defineField({
      name: "email",
      title: "Public email",
      description:
        "Shown in the website footer and on the Contact page. This does not change where form notifications are delivered.",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Public phone",
      description:
        "Shown as the main contact number in the website footer and on the Contact page. Include the country code.",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Public address",
      description:
        "Shown in the website footer, Contact details and map section. Enter the complete visitor-facing address.",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      description:
        "Used in the footer, the Home page's Stay Connected section and the Contact page. Leave blank if there is no official Instagram page yet.",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      description:
        "Used in the footer and on the Contact page. Leave blank if there is no official LinkedIn page yet.",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      description:
        "Used in the footer and the Home page's Stay Connected section. Leave blank if there is no official Facebook page yet.",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      description:
        "Used in the footer and the Home page's Stay Connected section. Leave blank if there is no official YouTube channel yet.",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "telegramUrl",
      title: "Telegram community URL",
      description:
        "Used by the Telegram card on the Community page and the Telegram icon on the Contact page. It is not shown in the footer. Leave blank to show Coming soon on Community and hide the Contact link.",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "whatsappUrl",
      title: "WhatsApp community URL",
      description:
        "Used by the WhatsApp card on the Community page and the WhatsApp icon on the Contact page. It is not shown in the footer. Leave blank to show Coming soon on Community and hide the Contact link.",
      type: "url",
      group: "social",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
