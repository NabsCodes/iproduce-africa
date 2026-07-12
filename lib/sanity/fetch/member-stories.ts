import { sanityFetch } from "@/lib/sanity/client";
import { initialsFromName } from "@/lib/sanity/initials";
import { memberStoriesQuery } from "@/lib/sanity/queries";
import type { MemberStoryItem } from "@/types/community";

type RawMemberStoryDoc = {
  id: string;
  result: string;
  challenge: string;
  withIProduce: string;
  name: string;
  age?: number | null;
  initials?: string | null;
  role: string;
  country: string;
};

function normalizeMemberStory(raw: RawMemberStoryDoc): MemberStoryItem {
  return {
    id: raw.id,
    result: raw.result,
    challenge: raw.challenge,
    withIProduce: raw.withIProduce,
    name: raw.name,
    age: raw.age ?? undefined,
    initials: raw.initials?.trim() || initialsFromName(raw.name),
    role: raw.role,
    country: raw.country,
  };
}

export async function fetchMemberStories(): Promise<MemberStoryItem[]> {
  const raw = await sanityFetch<RawMemberStoryDoc[]>(memberStoriesQuery);
  return raw.map(normalizeMemberStory);
}
