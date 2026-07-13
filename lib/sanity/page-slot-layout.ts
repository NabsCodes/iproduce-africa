import type { ContentCardTone } from "@/types/content";

/** Code-owned presentation metadata for Home service cards. */
export const HOME_SERVICE_SLOT_LAYOUT = [
  {
    key: "advisory",
    icon: "users",
    tone: "leaf" as ContentCardTone,
    imagePosition: "object-[center_35%]",
  },
  {
    key: "training",
    icon: "graduation-cap",
    tone: "tangerine" as ContentCardTone,
    imagePosition: "object-center",
  },
  {
    key: "resources",
    icon: "globe",
    tone: "leaf" as ContentCardTone,
    imagePosition: "object-[center_40%]",
  },
  {
    key: "dealRoom",
    icon: "handshake",
    tone: "tangerine" as ContentCardTone,
    imagePosition: "object-[center_40%]",
  },
] as const;

export const HOME_VALUE_CHAIN_SLOT_LAYOUT = [
  { key: "livestock" },
  { key: "cottonGarment" },
  { key: "cropsGrains" },
  { key: "horticulture" },
  { key: "aquaculture" },
] as const;

export const LEGAL_EYEBROWS = {
  privacy: "Privacy",
  terms: "Terms",
  cookies: "Cookies",
  accessibility: "Accessibility",
} as const;

export function mergeFixedImageTextSlots<
  TLayout extends { key: string },
  TSlot extends {
    title?: string;
    description?: string;
    image?: unknown;
    alt?: string;
  },
>(
  layout: readonly TLayout[],
  slots: Record<string, TSlot | undefined> | null | undefined,
  docId: string,
  resolveImage: (image: unknown) => string | undefined,
): Array<
  TLayout & {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }
> {
  return layout.map((entry) => {
    const slot = slots?.[entry.key] as
      | { title?: string; description?: string; image?: unknown; alt?: string }
      | undefined;
    const image = resolveImage(slot?.image);
    if (!slot?.title || !slot.description || !image || !slot.alt) {
      throw new Error(
        `Missing required fixed image slot "${entry.key}" on ${docId}.`,
      );
    }
    return {
      ...entry,
      title: slot.title,
      description: slot.description,
      image,
      imageAlt: slot.alt,
    };
  });
}
