import { academyContent } from "@/content/academy";
import { placeholderImages } from "@/lib/placeholder-images";
import type { AcademyTrackHeroContent } from "@/types/academy";
import type { CtaSectionContent } from "@/types/content";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export const webinarsContent = {
  hero: {
    eyebrow: "Webinars & Events",
    title: "Live Learning for African Agribusiness",
    description:
      "Join expert-led webinars, trainings, and live Q&A sessions designed to help agripreneurs build practical skills and stronger networks.",
  } satisfies AcademyTrackHeroContent,
  /** Cards link to the hub section until `/academy/webinars/[slug]` ships. */
  items: academyContent.scheduled.items.map((item) => ({
    key: item.slug,
    href: "/academy#webinars-events",
    image: item.image,
    category: item.type,
    categoryTone: "forest" as const,
    meta: dateFormatter.format(new Date(item.date)),
    title: item.title,
    description: item.description,
  })),
  cta: {
    eyebrow: "Be part of the future",
    title: "Let's Build the Future of Agriculture Together",
    description:
      "Join a growing network of organisations committed to innovation, capacity building, and sustainable growth across Africa.",
    ctas: [
      {
        label: "Partner with us",
        href: "/partners#partnership-enquiry",
        variant: "green",
        icon: "handshake",
      },
    ],
  } satisfies CtaSectionContent,
};

export const webinarsListing = {
  hero: webinarsContent.hero,
  items: [
    ...webinarsContent.items,
    {
      key: "placeholder-webinar-5",
      href: "/academy#webinars-events",
      image: placeholderImages.academySpotlight.presentation,
      category: "TRAINING",
      categoryTone: "forest" as const,
      meta: dateFormatter.format(new Date("2026-07-16")),
      title: "Cold Chain Basics for Fresh Produce",
      description:
        "Practical handling and transport decisions that protect quality from farm gate to buyer.",
    },
    {
      key: "placeholder-webinar-6",
      href: "/academy#webinars-events",
      image: placeholderImages.academySpotlight.workshop,
      category: "WEBINAR",
      categoryTone: "forest" as const,
      meta: dateFormatter.format(new Date("2026-07-23")),
      title: "Digital Tools for Cooperative Management",
      description:
        "How member records, payments, and reporting tools help cooperatives scale with confidence.",
    },
  ],
};
