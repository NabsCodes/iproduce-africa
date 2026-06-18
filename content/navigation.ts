import type { SiteNavigationItem } from "@/types/navigation";

export const mainNavigation = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  {
    label: "Academy",
    href: "/academy",
    children: [
      {
        label: "Webinars & Events",
        href: "/academy#webinars-events",
        description: "Live expert-led sessions, trainings and meetups",
      },
      {
        label: "Courses",
        href: "/academy#courses",
        description: "Structured learning programmes for practical impact",
      },
      {
        label: "Blog/Insights",
        href: "/academy#blog",
        description: "Articles, industry updates and thought-leadership",
      },
    ],
  },
  { label: "Community", href: "/community" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly SiteNavigationItem[];
