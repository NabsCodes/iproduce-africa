import type { Image } from "sanity";

import { sanityFetch } from "@/lib/sanity/client";
import { resolveImageWithAlt } from "@/lib/sanity/fetch/site-settings";
import { resolveImageUrl } from "@/lib/sanity/image";
import {
  HOME_SERVICE_SLOT_LAYOUT,
  HOME_VALUE_CHAIN_SLOT_LAYOUT,
  mergeFixedImageTextSlots,
} from "@/lib/sanity/page-slot-layout";
import { homePageQuery } from "@/lib/sanity/queries";
import type { ContentCardTone } from "@/types/content";

export type HomePageContent = {
  hero: {
    title: string;
    description: string;
  };
  whatWeDoPoster: {
    image: string;
    imageAlt: string;
  };
  services: Array<{
    icon: (typeof HOME_SERVICE_SLOT_LAYOUT)[number]["icon"];
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    imagePosition: string;
    tone: ContentCardTone;
  }>;
  valueChains: Array<{
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }>;
};

type RawHomePage = {
  heroMessage?: { title?: string | null; description?: string | null } | null;
  whatWeDoPoster?: { image?: Image | null; alt?: string | null } | null;
  services?: Record<
    string,
    {
      title?: string;
      description?: string;
      image?: Image;
      alt?: string;
    }
  > | null;
  valueChains?: Record<
    string,
    {
      title?: string;
      description?: string;
      image?: Image;
      alt?: string;
    }
  > | null;
};

const DOC_ID = "homePage";

function resolveSlotImage(image: unknown): string | undefined {
  return resolveImageUrl(image as Image | null | undefined);
}

export async function fetchHomePage(): Promise<HomePageContent> {
  const raw = await sanityFetch<RawHomePage | null>(homePageQuery);
  if (!raw) {
    throw new Error(`Missing required singleton "${DOC_ID}".`);
  }

  const heroMessage = raw.heroMessage;
  if (!heroMessage?.title || !heroMessage.description) {
    throw new Error(`Missing required hero message on ${DOC_ID}.`);
  }

  const whatWeDoPoster = resolveImageWithAlt(
    raw.whatWeDoPoster,
    DOC_ID,
    "whatWeDoPoster",
  );

  const services = mergeFixedImageTextSlots(
    HOME_SERVICE_SLOT_LAYOUT,
    raw.services,
    DOC_ID,
    resolveSlotImage,
  ).map((item) => ({
    icon: item.icon,
    title: item.title,
    description: item.description,
    image: item.image,
    imageAlt: item.imageAlt,
    imagePosition: item.imagePosition,
    tone: item.tone,
  }));

  const valueChains = mergeFixedImageTextSlots(
    HOME_VALUE_CHAIN_SLOT_LAYOUT,
    raw.valueChains,
    DOC_ID,
    resolveSlotImage,
  ).map(({ title, description, image, imageAlt }) => ({
    title,
    description,
    image,
    imageAlt,
  }));

  return {
    hero: {
      title: heroMessage.title,
      description: heroMessage.description,
    },
    whatWeDoPoster: {
      image: whatWeDoPoster.image,
      imageAlt: whatWeDoPoster.alt,
    },
    services,
    valueChains,
  };
}
