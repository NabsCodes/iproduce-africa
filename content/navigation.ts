import type { SiteNavigationItem } from "@/types/navigation";

export const mainNavigation = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  {
    label: "Academy",
    href: "/academy",
    children: [
      {
        label: "Webinars",
        href: "/academy/webinars",
        description: "Live expert-led sessions on agribusiness trends",
      },
      {
        label: "Courses",
        href: "/academy/courses",
        description: "Structured learning programmes for practical impact",
      },
      {
        label: "Events",
        href: "/academy/events",
        description: "Workshops, conferences and networking",
      },
      {
        label: "Insights",
        href: "/academy/insights",
        description: "Articles, industry updates and thought-leadership",
      },
    ],
  },
  { label: "Community", href: "/community" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly SiteNavigationItem[];
