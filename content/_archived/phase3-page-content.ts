/**
 * Pre-Sanity Phase 3 page/singleton seed snapshots (site settings, home,
 * about story/MVO, legal bodies).
 * Runtime must not import this file — migration scripts only.
 */
import { legalContent as archivedLegalFull } from "@/content/_archived/legal-pages";
import { placeholderImages } from "@/lib/placeholder-images";
import type { LegalPageContent } from "@/types/legal";

export const archivedSiteSettingsSeed = {
  email: "info@iproduceafrica.com",
  phone: "+234 803 410 8745",
  address: "3, Baltic Crescent, Maitama, Abuja",
  instagramUrl: undefined as string | undefined,
  linkedinUrl: undefined as string | undefined,
  facebookUrl: undefined as string | undefined,
  youtubeUrl: undefined as string | undefined,
} as const;

export const archivedHomeHeroMessage = {
  title: "Unlocking Local and Global Agribusiness Opportunities",
  description:
    "We connect agripreneurs across Africa with resources, services, and opportunities to grow — with dedicated pathways for women in agriculture.",
} as const;

export const archivedHomeWhatWeDoPoster = {
  image: placeholderImages.whatWeDo,
  imageAlt: "Agripreneurs harvesting crops together",
} as const;

export const archivedHomeServiceItems = [
  {
    icon: "users",
    title: "Agri Business Advisory",
    description:
      "Business advisory and coaching tailored to agripreneurs — from early-stage planning to growth and market readiness.",
    image: placeholderImages.memberServices.advisory,
    imageAlt: "Three women agripreneurs in a business advisory session",
    imagePosition: "object-[center_35%]",
    tone: "leaf",
  },
  {
    icon: "graduation-cap",
    title: "Training & Capacity Building",
    description:
      "Build practical skills through workshops, bootcamps, and academy programmes — from farm fundamentals to export readiness.",
    image: placeholderImages.memberServices.training,
    imageAlt:
      "Facilitator leading a capacity-building session with participants",
    imagePosition: "object-center",
    tone: "tangerine",
  },
  {
    icon: "globe",
    title: "Resources",
    description:
      "Events, market data, policy updates, and sector insights — real-time information when your business decisions matter.",
    image: placeholderImages.memberServices.resources,
    imageAlt:
      "Agripreneur checking market updates and resources on phone and laptop",
    imagePosition: "object-[center_40%]",
    tone: "leaf",
  },
  {
    icon: "handshake",
    title: "Business Deal Room",
    description:
      "Connect with buyers, partners, and investors aligned with your goals — curated introductions that move conversations forward.",
    image: placeholderImages.memberServices.dealRoom,
    imageAlt: "Agripreneurs and partners in a business collaboration meeting",
    imagePosition: "object-[center_40%]",
    tone: "tangerine",
  },
] as const;

export const archivedHomeValueChains = [
  {
    title: "Livestock & Poultry",
    description:
      "Breeding, feed, animal health and market access for livestock and poultry producers.",
    image: "/images/home/livestock.webp",
  },
  {
    title: "Cotton & Garment",
    description:
      "From field to fabric — integrating cotton growers into regional textile and fashion supply chains.",
    image: "/images/home/cotton-garment.webp",
  },
  {
    title: "Crops & Grains",
    description:
      "Staple and cash crops — better inputs, higher yields and reliable market access.",
    image: "/images/home/crops-grains.webp",
  },
  {
    title: "Horticulture",
    description:
      "Fruits, vegetables and high-value produce, from greenhouse to fresh market.",
    image: "/images/home/horticulture.webp",
  },
  {
    title: "Aquaculture & Fisheries",
    description:
      "Sustainable fish farming and value addition across inland and coastal communities.",
    image: "/images/home/aquaculture.webp",
  },
] as const;

export const archivedAboutStory = {
  paragraphs: [
    "We started with a simple observation: agriculture was changing faster than the people in it could keep up. What began with early webinars is growing into a hub for training, evergreen courses and a developing member network.",
    "The world is moving to smart, technology-led agriculture — and Africa will not be left behind. iProduce is where that future is taught, connected and traded.",
  ],
  image: placeholderImages.about.story,
} as const;

export const archivedAboutMvoBodies = {
  mission: "To build an integrated Digital African Agri-business Ecosystem.",
  vision:
    "A prosperous, food-secure Africa where every agri-business — from smallholder farmer to global exporter — thrives through seamless digital connectivity, data-driven insights, and inclusive market access.",
  objective:
    "Seamless digital connectivity. One interoperable platform linking production, logistics, finance, and trade.",
} as const;

export const archivedLegalLastUpdated = archivedLegalFull.lastUpdated;

export const archivedLegalPages = {
  privacy: archivedLegalFull.privacy,
  terms: archivedLegalFull.terms,
  cookies: archivedLegalFull.cookies,
  accessibility: archivedLegalFull.accessibility,
} as const satisfies Record<
  "privacy" | "terms" | "cookies" | "accessibility",
  LegalPageContent
>;
