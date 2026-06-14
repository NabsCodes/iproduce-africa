import type { SitemapRoute } from "@/types/site";

export const pageSeo = {
  home: {
    description:
      "iProduce Africa connects agripreneurs, partners, and agricultural innovators with training, community, and market-access opportunities across Africa.",
    path: "/",
  },
  about: {
    title: "About Us",
    description:
      "Learn how iProduce Africa is building an agribusiness ecosystem that supports African agripreneurs through collaboration, learning, and market opportunities.",
    path: "/about",
  },
  academy: {
    title: "Academy",
    description:
      "Explore iProduce Africa Academy programmes, webinars, and training opportunities built to help agripreneurs grow practical skills and stronger businesses.",
    path: "/academy",
  },
  community: {
    title: "Community",
    description:
      "Join the iProduce Africa community to connect with agripreneurs, discover opportunities, and grow through shared learning and collaboration.",
    path: "/community",
  },
  partners: {
    title: "Partners",
    description:
      "See how organisations can partner with iProduce Africa to expand agricultural impact, support agripreneurs, and co-create ecosystem programmes.",
    path: "/partners",
  },
  contact: {
    title: "Contact",
    description:
      "Contact iProduce Africa to discuss partnerships, community opportunities, Academy programmes, or other agribusiness collaboration needs.",
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
