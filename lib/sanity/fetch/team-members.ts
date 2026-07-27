import type { Image } from "sanity";

import { sanityFetch } from "@/lib/sanity/client";
import { buildCroppedImageUrl, resolveImageUrl } from "@/lib/sanity/image";
import { teamMembersQuery } from "@/lib/sanity/queries";
import {
  isValidSocialValue,
  KNOWN_SOCIAL_PLATFORMS,
} from "@/lib/sanity/social-platforms";
import type {
  AboutPerson,
  AboutPersonGroup,
  AboutPersonSocial,
} from "@/types/about";

type RawSocial = {
  platform: string;
  value: string;
  label?: string | null;
};

type RawTeamMemberDoc = {
  id: string;
  name: string;
  role: string;
  group: AboutPersonGroup;
  photo: Image | null;
  credentials?: string | null;
  bioSummary: string;
  bioParagraphs: string[];
  socials?: RawSocial[] | null;
  order?: number | null;
};

export type TeamMemberCatalogue = {
  team: readonly AboutPerson[];
  advisors: readonly AboutPerson[];
};

/**
 * Studio's `options.list`/`Rule.custom` only constrain authoring — a doc
 * written outside Studio validation could carry an unrecognized
 * `platform`, a blank `value`, or a malformed external link (e.g.
 * `linkedin.com/person` missing its scheme). All three are dropped here
 * rather than rendered, same reasoning as `faq.category` filtering in
 * `lib/sanity/fetch/faqs.ts`.
 */
function normalizeSocials(
  raw: RawSocial[] | null | undefined,
): AboutPersonSocial[] {
  if (!raw) return [];
  return raw
    .filter((social) => {
      const value = social.value?.trim();
      return (
        KNOWN_SOCIAL_PLATFORMS.includes(social.platform) &&
        value &&
        isValidSocialValue(social.platform, value)
      );
    })
    .map((social) => ({
      platform: social.platform as AboutPersonSocial["platform"],
      value: social.value.trim(),
      label: social.label?.trim() || undefined,
    }));
}

/**
 * Portrait head-shots crop best with the focal point in the upper third. When
 * an editor hasn't set a hotspot, Sanity crops from the vertical *center* —
 * which cuts heads and shows too much torso. Inject a top-biased default focal
 * point in that case; a real editor hotspot (present) is left untouched and
 * always wins.
 */
function withDefaultFocalPoint(image: Image | null): Image | null {
  if (!image?.asset) return image;
  if (image.hotspot) return image;
  return {
    ...image,
    // The builder currently crops around the hotspot centre; its dimensions
    // do not control zoom. Keep a small, valid footprint around that point
    // rather than a full-height hotspot whose y: 0.32 bounds would extend
    // beyond the image.
    hotspot: {
      _type: "sanity.imageHotspot",
      x: 0.5,
      y: 0.32,
      height: 0.1,
      width: 0.1,
    },
  };
}

function normalizeTeamMember(raw: RawTeamMemberDoc): AboutPerson {
  // Card shape differs by group: team cards are 4:3, advisor cards are square.
  // The dialog is portrait for everyone. Each URL bakes in the editor's Studio
  // crop + hotspot (or the top-biased default), so faces stay framed.
  const [cardW, cardH] = raw.group === "advisor" ? [1000, 1000] : [1000, 750];
  const framed = withDefaultFocalPoint(raw.photo);
  const fallback = resolveImageUrl(raw.photo) ?? "";

  return {
    id: raw.id,
    group: raw.group,
    name: raw.name,
    role: raw.role,
    // Defensive fallback — Studio's `Rule.required()` on `photo` can be
    // bypassed by a direct API write, so the fetch layer can't assume a
    // resolvable image exists.
    photo: fallback,
    photoCard: buildCroppedImageUrl(framed, cardW, cardH) ?? fallback,
    photoPortrait: buildCroppedImageUrl(framed, 750, 1000) ?? fallback,
    bioSummary: raw.bioSummary,
    bioParagraphs: raw.bioParagraphs,
    credentials: raw.credentials ?? undefined,
    // `AboutPerson.order` stays a required `number` on the type; the
    // Sanity field itself is optional, so normalize here — matches the
    // GROQ sort's own `coalesce(order, 9999)` fallback so the displayed
    // order and this value never disagree.
    order: raw.order ?? 9999,
    socials: normalizeSocials(raw.socials),
  };
}

export async function fetchTeamMembers(): Promise<TeamMemberCatalogue> {
  const raw = await sanityFetch<RawTeamMemberDoc[]>(teamMembersQuery);

  const team: AboutPerson[] = [];
  const advisors: AboutPerson[] = [];

  for (const doc of raw) {
    const person = normalizeTeamMember(doc);
    if (doc.group === "team") team.push(person);
    else if (doc.group === "advisor") advisors.push(person);
  }

  return { team, advisors };
}
