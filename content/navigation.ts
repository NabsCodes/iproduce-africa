import type { SiteNavigationItem } from "@/types/navigation";

export const mainNavigation = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  {
    label: "Academy",
    href: "/academy",
    children: [
      {
        label: "Webinars (events)",
        href: "/academy#webinars",
        description: "Live sessions, AMAs and online events",
      },
      {
        label: "Training programmes",
        href: "/academy#training",
        description: "Structured cohort-based learning",
      },
      {
        label: "Mini courses",
        href: "/academy#courses",
        description: "Short, self-paced skill modules",
      },
      {
        label: "Blog / insights",
        href: "/academy#insights",
        description: "Articles, guides and market updates",
      },
    ],
  },
  { label: "Community", href: "/community" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly SiteNavigationItem[];
