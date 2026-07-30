import { defineField, defineType } from "sanity";

/**
 * `siteSettings` documents created before the mobile-app fields existed have no
 * `mobileAppStatus` at all, and `initialValue` only applies to new documents.
 * An unset status therefore has to behave exactly like Hidden — in Studio and
 * on the website — so this change never blocks an unrelated publish.
 */
function isAppPromotionVisible(status: unknown): boolean {
  return status === "comingSoon" || status === "live";
}

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  description:
    "Manage the public contact details and official social or community links used across the website.",
  type: "document",
  groups: [
    { name: "contact", title: "Contact details", default: true },
    { name: "social", title: "Social & community links" },
    { name: "mobileApp", title: "Mobile app promotion" },
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
      name: "secondaryPhone",
      title: "Secondary public phone",
      description:
        "Optional additional number shown on the Contact page. Include the country code. Leave blank when the organisation has only one public phone number.",
      type: "string",
      group: "contact",
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
    defineField({
      name: "mobileAppStatus",
      title: "Mobile app status",
      description:
        "Controls the mobile app promotion on the Home page, the Community page, and the website footer together.\n\nHidden — nothing about the app appears on the website. This is also what happens if you leave this unset.\n\nComing soon — Home and Community show the branded coming-soon section and the footer shows a short status line.\n\nLive — the same surfaces show the real store links you add below. Choose Live only once at least one store listing is published.",
      type: "string",
      group: "mobileApp",
      options: {
        list: [
          { title: "Hidden", value: "hidden" },
          { title: "Coming soon", value: "comingSoon" },
          { title: "Live", value: "live" },
        ],
        layout: "radio",
      },
      initialValue: "hidden",
    }),
    defineField({
      name: "mobileAppTitle",
      title: "Mobile app title",
      description:
        "Headline for the app section on the Home page and the Community page, for example “iProduce on mobile, coming soon.”",
      type: "string",
      group: "mobileApp",
      hidden: ({ document }) =>
        !isAppPromotionVisible(document?.mobileAppStatus),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const status = (context.document as { mobileAppStatus?: string })
            ?.mobileAppStatus;
          if (isAppPromotionVisible(status) && !value?.trim()) {
            return "Add a title, or set the mobile app status back to Hidden.";
          }
          return true;
        }),
    }),
    defineField({
      name: "mobileAppDescription",
      title: "Mobile app description",
      description:
        "Two to three short lines, shown under the title on the Home page and the Community page. Keep the wording general until the app team confirms the product name, audiences, and features.",
      type: "text",
      rows: 3,
      group: "mobileApp",
      hidden: ({ document }) =>
        !isAppPromotionVisible(document?.mobileAppStatus),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const status = (context.document as { mobileAppStatus?: string })
            ?.mobileAppStatus;
          if (isAppPromotionVisible(status) && !value?.trim()) {
            return "Add a description, or set the mobile app status back to Hidden.";
          }
          return true;
        }),
    }),
    defineField({
      name: "mobileAppPreview",
      title: "Mobile app preview image (optional)",
      description:
        "Shown on the Home page and the Community page. Leave empty while the app is still being designed — the website shows a branded placeholder instead. Upload an approved mockup or screenshot only once the design is signed off.",
      type: "imageWithAlt",
      group: "mobileApp",
      hidden: ({ document }) =>
        !isAppPromotionVisible(document?.mobileAppStatus),
    }),
    defineField({
      name: "iosAppUrl",
      title: "App Store URL (optional)",
      description:
        "Full App Store listing URL. Shown on the Home page, the Community page, and the footer, and only when the status is Live. Leave blank while iOS is still coming soon.",
      type: "url",
      group: "mobileApp",
      hidden: ({ document }) => document?.mobileAppStatus !== "live",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document as
            | { mobileAppStatus?: string; androidAppUrl?: string }
            | undefined;
          if (
            document?.mobileAppStatus === "live" &&
            !value &&
            !document?.androidAppUrl
          ) {
            return "Add an App Store or Google Play URL, or set the status to Coming soon.";
          }
          return true;
        }),
    }),
    defineField({
      name: "androidAppUrl",
      title: "Google Play URL (optional)",
      description:
        "Full Google Play listing URL. Shown on the Home page, the Community page, and the footer, and only when the status is Live. Leave blank while Android is still coming soon.",
      type: "url",
      group: "mobileApp",
      hidden: ({ document }) => document?.mobileAppStatus !== "live",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document as
            | { mobileAppStatus?: string; iosAppUrl?: string }
            | undefined;
          if (
            document?.mobileAppStatus === "live" &&
            !value &&
            !document?.iosAppUrl
          ) {
            return "Add a Google Play or App Store URL, or set the status to Coming soon.";
          }
          return true;
        }),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
