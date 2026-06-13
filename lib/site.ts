export const siteConfig = {
  name: "iProduce Africa",
  tagline: "Agribusiness Hub",
  description:
    "Unlocking local and global agribusiness opportunities for African agripreneurs.",
  email: "hello@iproduce.africa",
  phone: "+234 800 000 0000",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  {
    label: "Academy",
    href: "/academy",
    children: [
      {
        label: "Webinars (events)",
        href: "/academy/webinars",
        description: "Live sessions, AMAs and online events",
      },
      {
        label: "Training programmes",
        href: "/academy/training",
        description: "Structured cohort-based learning",
      },
      {
        label: "Mini courses",
        href: "/academy/courses",
        description: "Short, self-paced skill modules",
      },
      {
        label: "Blog / insights",
        href: "/blog",
        description: "Articles, guides and market updates",
      },
    ],
  },
  { label: "Community", href: "/community" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
