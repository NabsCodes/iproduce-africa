import { formatAcademyShortDate } from "@/lib/academy-dates";
import type {
  AcademyListingHeroContent,
  AcademyRelatedItem,
  AcademyScheduledItem,
  AcademyWebinar,
} from "@/types/academy";
import type { CtaSectionContent } from "@/types/content";

/** Code-owned listing chrome. Catalogue items live in Sanity. */
export const webinarsContent = {
  hero: {
    eyebrow: "Webinars & Events",
    title: "Live Learning for African Agribusiness",
    description:
      "Join expert-led webinars, trainings, and live Q&A sessions designed to help agripreneurs build practical skills and stronger networks.",
  } satisfies AcademyListingHeroContent,
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
  relatedSection: {
    eyebrow: "Keep exploring",
    title: "More upcoming sessions",
    description:
      "Discover live webinars, trainings, and forums designed to help you build practical skills and stronger networks.",
    viewAllLabel: "Browse all webinars & events",
    viewAllHref: "/academy/webinars",
  },
};

export function webinarsToHubScheduledItems(
  webinars: readonly AcademyWebinar[],
): AcademyScheduledItem[] {
  return webinars.map((webinar) => ({
    category: webinar.category,
    date: webinar.date,
    endDate: webinar.endDate,
    title: webinar.title,
    description: webinar.description,
    image: webinar.image,
    slug: webinar.slug,
  }));
}

export function webinarToRelatedItem(
  webinar: AcademyWebinar,
): AcademyRelatedItem {
  const card = webinarToCardItem(webinar);
  return {
    key: card.key,
    href: card.href,
    image: card.image,
    imageAlt: card.imageAlt,
    category: card.category,
    categoryTone: card.categoryTone,
    meta: card.meta,
    title: card.title,
    description: card.description,
  };
}

export function webinarToCardItem(webinar: AcademyWebinar) {
  return {
    key: webinar.slug,
    href: `/academy/webinars/${webinar.slug}`,
    image: webinar.image,
    imageAlt: webinar.imageAlt,
    category: webinar.category.name,
    categoryTone: webinar.category.tone,
    meta: formatAcademyShortDate(webinar.date),
    title: webinar.title,
    description: webinar.description,
    filterType: webinar.category.slug,
  };
}

export const webinarsListing = {
  hero: webinarsContent.hero,
  filterEmptyState: {
    icon: "calendar",
    title: "Nothing matches this filter",
    description:
      "Try another type or browse the full webinar and events catalogue.",
    ctaLabel: "View all webinars & events",
    ctaHref: "/academy/webinars",
  },
} as const;
