import type { SitemapRoute } from "@/types/site";

// Descriptions are tuned to ~115–125 characters so social previews don't
// truncate on mobile (LinkedIn / WhatsApp cap around 125). Titles compose
// as `{title} | iProduce Africa` via the metadata factory, so home is the
// one entry that needs an explicit tagline-style title.
export const pageSeo = {
  home: {
    title: "Building Africa's Agribusiness Ecosystem",
    description:
      "Africa's agribusiness hub — connecting agripreneurs, partners, and innovators with training, community, and market access.",
    path: "/",
  },
  about: {
    title: "About Us",
    description:
      "How iProduce Africa is building an agribusiness ecosystem that supports African agripreneurs through learning and market access.",
    path: "/about",
  },
  academy: {
    title: "Academy",
    description:
      "Programmes, webinars, and training built to help African agripreneurs grow practical skills and stronger agribusinesses.",
    path: "/academy",
  },
  community: {
    title: "Community",
    description:
      "Join African agripreneurs in a community built for shared learning, opportunities, and collaboration across the continent.",
    path: "/community",
  },
  partners: {
    title: "Partners",
    description:
      "Partner with iProduce Africa to expand agricultural impact, support agripreneurs, and co-create ecosystem programmes.",
    path: "/partners",
  },
  contact: {
    title: "Contact",
    description:
      "Contact iProduce Africa about partnerships, community membership, Academy programmes, or agribusiness collaboration.",
    path: "/contact",
  },
} as const;

export const sitemapRoutes = [
  { href: "/", priority: 1, changeFrequency: "weekly" },
  { href: "/about", priority: 0.8, changeFrequency: "monthly" },
  { href: "/academy", priority: 0.9, changeFrequency: "weekly" },
  { href: "/community", priority: 0.9, changeFrequency: "weekly" },
  { href: "/partners", priority: 0.8, changeFrequency: "monthly" },
  { href: "/contact", priority: 0.7, changeFrequency: "monthly" },
] as const satisfies readonly SitemapRoute[];
