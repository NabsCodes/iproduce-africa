import type { SiteConfig } from "@/types/site";

export const siteConfig = {
  name: "iProduce Africa",
  description:
    "Unlocking local and global agribusiness opportunities for African agripreneurs.",
  siteUrl: "https://iproduceafrica.com",
  keywords: [
    "iProduce Africa",
    "agribusiness Africa",
    "African agripreneurs",
    "agriculture training Africa",
    "agritech Africa",
    "agribusiness community",
    "market access for farmers",
    "African agriculture ecosystem",
  ],
  email: "info@iproduceafrica.com",
  phone: "+234 803 410 8745",
  hours: "Monday - Friday, 08 am - 05 pm",
  address: "3, Baltic Crescent, Maitama, Abuja",
  socialLinks: [
    { label: "Instagram", platform: "instagram", href: undefined },
    { label: "LinkedIn", platform: "linkedin", href: undefined },
    { label: "Facebook", platform: "facebook", href: undefined },
    { label: "YouTube", platform: "youtube", href: undefined },
  ],
  footer: {
    description:
      "Building Africa's connected agribusiness ecosystem through learning, networking, and strategic partnerships.",
    linkGroups: [
      {
        title: "Explore",
        links: [
          { label: "About us", href: "/about" },
          { label: "Academy", href: "/academy" },
          { label: "Community", href: "/community" },
          { label: "Partnerships", href: "/partners" },
        ],
      },
      {
        title: "Academy",
        links: [
          { label: "Webinars & Events", href: "/academy/webinars" },
          { label: "Courses", href: "/academy/courses" },
          { label: "Blog/Insights", href: "/academy/blog" },
        ],
      },
    ],
    newsletter: {
      title: "Stay in the loop",
      description: "Get updates on new trainings and ecosystem news.",
      placeholder: "Your email address",
      submitLabel: "Subscribe to newsletter",
      submittingLabel: "Subscribing...",
      successMessage:
        "Thanks for subscribing. A confirmation may arrive in your inbox shortly.",
      subscribeAgainLabel: "Subscribe with another email",
    },
    legalLinks: [
      { label: "Privacy", href: undefined },
      { label: "Terms", href: undefined },
      { label: "Cookies", href: undefined },
      { label: "Accessibility", href: undefined },
    ],
  },
} satisfies SiteConfig;
