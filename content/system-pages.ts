import { siteConfig } from "@/content/site";
import type { SystemPagesContent } from "@/types/system-pages";

export const systemPagesContent: SystemPagesContent = {
  notFound: {
    eyebrow: "404 — Off the map",
    title: "This page isn't part of our network yet.",
    description:
      "The URL you followed may have moved, been renamed, or never existed. From here, you can head back to the homepage or jump straight into one of our two tracks.",
    ctas: [
      { label: "Back to home", href: "/", variant: "green" },
      {
        label: "Join the community",
        href: "/community",
        variant: "green-soft",
      },
      { label: "Partner with us", href: "/partners", variant: "tangerine" },
    ],
    popularEyebrow: "Or browse popular sections",
    popularLinks: [
      { label: "About iProduce Africa", href: "/about" },
      { label: "The Academy", href: "/academy" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  error: {
    eyebrow: "Something stalled",
    title: "We hit an unexpected issue loading this page.",
    description:
      "Our team has been notified. You can try again, head back to the homepage, or reach out if it keeps happening.",
    retryLabel: "Try again",
    homeLabel: "Back to home",
    supportLabel: "Contact support",
    supportHref: "/contact",
    referenceLabel: "Reference",
    referenceFallback: "—",
  },
  globalError: {
    eyebrow: "Something stalled",
    title: `Something went wrong loading ${siteConfig.name}.`,
    body: "Please refresh the page. If it keeps happening, reach out to",
    supportEmail: siteConfig.email,
    retryLabel: "Try again",
    homeLabel: "Back to home",
  },
};
