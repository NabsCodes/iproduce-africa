import { placeholderImages } from "@/lib/placeholder-images";
import type {
  AcademyFeaturedEvent,
  AcademyListingHeroContent,
  AcademyRelatedItem,
  AcademyScheduledItem,
  AcademyScheduledType,
  AcademyWebinar,
} from "@/types/academy";
import type { ContentCardTone, CtaSectionContent } from "@/types/content";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export const WEBINAR_TYPES = [
  "Webinar",
  "Training",
  "Live Q&A",
  "Event",
] as const;

export type WebinarFilterType = (typeof WEBINAR_TYPES)[number];

const typeLabelByScheduled: Record<AcademyScheduledType, WebinarFilterType> = {
  WEBINAR: "Webinar",
  TRAINING: "Training",
  "LIVE Q&A": "Live Q&A",
  EVENT: "Event",
};

const toneByType: Record<AcademyScheduledType, ContentCardTone> = {
  WEBINAR: "tangerine",
  TRAINING: "tangerine",
  "LIVE Q&A": "leaf",
  EVENT: "forest",
};

const featuredWebinar: AcademyWebinar = {
  slug: "afriagri-leadership-forum-2026",
  type: "EVENT",
  date: "2026-08-12T09:00:00Z",
  title: "AfriAgri Leadership Forum 2026",
  description:
    "A high-level gathering of African agribusiness leaders, policymakers, investors and development partners shaping the continent's agricultural transformation agenda.",
  image: placeholderImages.academySpotlight.presentation,
  imageAlt: "Audience seated at an agribusiness conference",
  excerpt:
    "A high-level gathering of African agribusiness leaders, policymakers, investors and development partners shaping the continent's agricultural transformation agenda.",
  body: [
    "A high-level gathering of African agribusiness leaders, policymakers, investors and development partners shaping the continent's agricultural transformation agenda.",
    "The forum brings together policymakers, investors, cooperatives, and commercial operators to align on financing, standards, and market access priorities for the year ahead.",
    "Sessions combine keynote panels with working groups so participants leave with contacts, frameworks, and follow-up actions — not just slides.",
  ],
  dateLabel: "August 12–14, 2026 · 9:00 AM – 4:00 PM WAT",
  location: "Landmark Centre, Lagos · Livestream available",
  format: "Hybrid · Virtual + Lagos",
  speakers: "Speakers: Dr. Amina Bello, Kofi Mensah, Aïssatou Diallo + 6 more",
  registration: { mode: "open" },
};

const hubScheduledWebinars: AcademyWebinar[] = [
  {
    slug: "scaling-smallholder-farms-with-data",
    type: "WEBINAR",
    date: "2026-06-18",
    title: "Scaling Smallholder Farms with Data",
    description:
      "How farm records and precision tools help small farms lift yields and win buyers.",
    image: placeholderImages.academySpotlight.microphone,
    excerpt:
      "How farm records and precision tools help small farms lift yields and win buyers.",
    body: [
      "How farm records and precision tools help small farms lift yields and win buyers.",
      "Join practitioners and sector leaders for a practical session designed for African agripreneurs — with time for questions and next steps you can apply on your farm or in your business.",
    ],
    registration: {
      mode: "closed",
      closedLabel: "Session ended",
    },
  },
  {
    slug: "post-harvest-handling-essentials",
    type: "TRAINING",
    date: "2026-07-08",
    title: "Post-Harvest Handling Essentials",
    description:
      "Cut losses and protect quality with practical storage, packaging and cold-chain methods.",
    image: placeholderImages.academySpotlight.workshop,
    excerpt:
      "Cut losses and protect quality with practical storage, packaging and cold-chain methods.",
    body: [
      "Cut losses and protect quality with practical storage, packaging and cold-chain methods.",
      "Join practitioners and sector leaders for a practical session designed for African agripreneurs — with time for questions and next steps you can apply on your farm or in your business.",
    ],
    registration: { mode: "open" },
  },
  {
    slug: "ask-an-agronomist-soil-health",
    type: "LIVE Q&A",
    date: "2026-07-10",
    title: "Ask an Agronomist: Soil Health",
    description:
      "A live session on soil testing, fertility and regenerative practices — bring your questions.",
    image: placeholderImages.academySpotlight.presentation,
    excerpt:
      "A live session on soil testing, fertility and regenerative practices — bring your questions.",
    body: [
      "A live session on soil testing, fertility and regenerative practices — bring your questions.",
      "Join practitioners and sector leaders for a practical session designed for African agripreneurs — with time for questions and next steps you can apply on your farm or in your business.",
    ],
    registration: { mode: "open" },
  },
  {
    slug: "building-export-ready-business",
    type: "WEBINAR",
    date: "2026-07-14",
    title: "Building an Export-Ready Business",
    description:
      "Standards, certification and the paperwork behind successful cross-border trade.",
    image: placeholderImages.academySpotlight.market,
    excerpt:
      "Standards, certification and the paperwork behind successful cross-border trade.",
    body: [
      "Standards, certification and the paperwork behind successful cross-border trade.",
      "Join practitioners and sector leaders for a practical session designed for African agripreneurs — with time for questions and next steps you can apply on your farm or in your business.",
    ],
    registration: { mode: "open" },
  },
];

const extraWebinars: AcademyWebinar[] = [
  {
    slug: "cold-chain-basics-fresh-produce",
    type: "TRAINING",
    date: "2026-07-16",
    title: "Cold Chain Basics for Fresh Produce",
    description:
      "Practical handling and transport decisions that protect quality from farm gate to buyer.",
    image: placeholderImages.academySpotlight.presentation,
    excerpt:
      "Practical handling and transport decisions that protect quality from farm gate to buyer.",
    body: [
      "Learn how temperature, timing, and packaging choices affect shelf life and buyer confidence.",
      "The session covers low-cost improvements for smallholders as well as options for scaling cooperatives.",
    ],
    registration: { mode: "open" },
  },
  {
    slug: "digital-tools-cooperative-management",
    type: "WEBINAR",
    date: "2026-07-23",
    title: "Digital Tools for Cooperative Management",
    description:
      "How member records, payments, and reporting tools help cooperatives scale with confidence.",
    image: placeholderImages.academySpotlight.workshop,
    excerpt:
      "How member records, payments, and reporting tools help cooperatives scale with confidence.",
    body: [
      "Walk through the records cooperatives need before adopting software — and the workflows that break when data is missing.",
      "Compare lightweight tools suitable for early-stage groups with platforms built for larger membership bases.",
    ],
    registration: { mode: "open" },
  },
];

export const webinarsContent = {
  hero: {
    eyebrow: "Webinars & Events",
    title: "Live Learning for African Agribusiness",
    description:
      "Join expert-led webinars, trainings, and live Q&A sessions designed to help agripreneurs build practical skills and stronger networks.",
  } satisfies AcademyListingHeroContent,
  featuredSlug: featuredWebinar.slug,
  webinars: [featuredWebinar, ...hubScheduledWebinars, ...extraWebinars],
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

/** Hub featured-event band — presentation copy layered on the canonical webinar. */
export const academyFeaturedEvent = {
  slug: featuredWebinar.slug,
  eyebrow: "Featured Event",
  sectionTitle: "Don't miss what's next",
  category: "Agribusiness Development",
  format: featuredWebinar.format ?? "Event",
  title: featuredWebinar.title,
  description: featuredWebinar.description,
  image: featuredWebinar.image,
  imageAlt: featuredWebinar.imageAlt ?? featuredWebinar.title,
  date: featuredWebinar.date,
  dateLabel: featuredWebinar.dateLabel ?? "",
  location: featuredWebinar.location ?? "",
  speakers: featuredWebinar.speakers ?? "",
  registerLabel: "Register Now",
} satisfies AcademyFeaturedEvent;

export function webinarsToHubScheduledItems(
  webinars: readonly AcademyWebinar[],
): AcademyScheduledItem[] {
  return webinars.map((webinar) => ({
    type: webinar.type,
    date: webinar.date.slice(0, 10),
    title: webinar.title,
    description: webinar.description,
    image: webinar.image,
    slug: webinar.slug,
  }));
}

export const academyHubScheduledWebinars = hubScheduledWebinars;

export function getWebinar(slug: string): AcademyWebinar | undefined {
  return webinarsContent.webinars.find((webinar) => webinar.slug === slug);
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

function webinarDateKey(webinar: AcademyWebinar) {
  return webinar.date.slice(0, 10);
}

export function getRelatedWebinars(excludeSlug: string, limit = 3) {
  const today = new Date().toISOString().slice(0, 10);

  return webinarsContent.webinars
    .filter(
      (webinar) =>
        webinar.slug !== excludeSlug && webinarDateKey(webinar) >= today,
    )
    .sort((a, b) => webinarDateKey(a).localeCompare(webinarDateKey(b)))
    .slice(0, limit)
    .map(webinarToRelatedItem);
}

export function webinarToCardItem(webinar: AcademyWebinar) {
  return {
    key: webinar.slug,
    href: `/academy/webinars/${webinar.slug}`,
    image: webinar.image,
    imageAlt: webinar.imageAlt,
    category: typeLabelByScheduled[webinar.type],
    categoryTone: toneByType[webinar.type],
    meta: dateFormatter.format(new Date(webinar.date)),
    title: webinar.title,
    description: webinar.description,
    filterType: typeLabelByScheduled[webinar.type],
  };
}

export const webinarsListing = {
  hero: webinarsContent.hero,
  featuredSlug: webinarsContent.featuredSlug,
  filterTypes: WEBINAR_TYPES,
  items: webinarsContent.webinars.map(webinarToCardItem),
  filterEmptyState: {
    icon: "calendar",
    title: "Nothing matches this filter",
    description:
      "Try another type or browse the full webinar and events catalogue.",
    ctaLabel: "View all webinars & events",
    ctaHref: "/academy/webinars",
  },
} as const;
