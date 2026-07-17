import type { Image } from "sanity";

import { sanityFetch } from "@/lib/sanity/client";
import { resolveImageUrl } from "@/lib/sanity/image";
import { aboutPageQuery } from "@/lib/sanity/queries";
import { resolveVideoEmbed, type VideoEmbed } from "@/lib/video-embeds";

export type AboutPageContent = {
  story: {
    paragraphs: string[];
    image: string;
    imageAlt: string;
    video?: VideoEmbed;
  };
  missionVisionObjective: {
    mission: { body: string };
    vision: { body: string };
    objective: { body: string };
  };
};

type RawAboutPage = {
  story?: {
    paragraphs?: string[] | null;
    image?: Image | null;
    imageAlt?: string | null;
    videoUrl?: string | null;
  } | null;
  missionVisionObjective?: {
    mission?: string | null;
    vision?: string | null;
    objective?: string | null;
  } | null;
};

const DOC_ID = "aboutPage";

export async function fetchAboutPage(): Promise<AboutPageContent> {
  const raw = await sanityFetch<RawAboutPage | null>(aboutPageQuery);
  if (!raw) {
    throw new Error(`Missing required singleton "${DOC_ID}".`);
  }

  const storyImage = resolveImageUrl(raw.story?.image);
  const storyAlt = raw.story?.imageAlt?.trim();
  const paragraphs = raw.story?.paragraphs?.filter(Boolean) ?? [];
  if (!storyImage || !storyAlt || paragraphs.length === 0) {
    throw new Error(`Missing required story content on ${DOC_ID}.`);
  }

  const mvo = raw.missionVisionObjective;
  if (!mvo?.mission || !mvo.vision || !mvo.objective) {
    throw new Error(`Missing required missionVisionObjective on ${DOC_ID}.`);
  }

  return {
    story: {
      paragraphs,
      image: storyImage,
      imageAlt: storyAlt,
      video: resolveVideoEmbed(raw.story?.videoUrl),
    },
    missionVisionObjective: {
      mission: { body: mvo.mission },
      vision: { body: mvo.vision },
      objective: { body: mvo.objective },
    },
  };
}
