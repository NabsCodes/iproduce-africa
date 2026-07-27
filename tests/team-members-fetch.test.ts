import { beforeEach, describe, expect, it, vi } from "vitest";

const { buildCroppedImageUrl, resolveImageUrl, sanityFetch } = vi.hoisted(
  () => ({
    buildCroppedImageUrl: vi.fn(),
    resolveImageUrl: vi.fn(),
    sanityFetch: vi.fn(),
  }),
);

vi.mock("@/lib/sanity/client", () => ({ sanityFetch }));
vi.mock("@/lib/sanity/image", () => ({
  buildCroppedImageUrl,
  resolveImageUrl,
}));

import { fetchTeamMembers } from "@/lib/sanity/fetch/team-members";

const basePerson = {
  role: "Role",
  bioSummary: "Summary",
  bioParagraphs: ["Biography"],
  socials: [],
  order: 1,
};

describe("fetchTeamMembers photo framing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resolveImageUrl.mockImplementation(
      (image: { asset?: { _ref?: string } } | null) =>
        image?.asset?._ref ? `original:${image.asset._ref}` : undefined,
    );
    buildCroppedImageUrl.mockImplementation(
      (
        image: { asset?: { _ref?: string } } | null,
        width: number,
        height: number,
      ) =>
        image?.asset?._ref
          ? `cropped:${image.asset._ref}:${width}x${height}`
          : undefined,
    );
  });

  it("builds each card shape and a portrait while preserving editor hotspots", async () => {
    const editorHotspot = {
      _type: "sanity.imageHotspot",
      x: 0.7,
      y: 0.25,
      height: 0.2,
      width: 0.2,
    };

    sanityFetch.mockResolvedValue([
      {
        ...basePerson,
        id: "team-1",
        name: "Team member",
        group: "team",
        photo: { asset: { _ref: "team-photo" } },
      },
      {
        ...basePerson,
        id: "advisor-1",
        name: "Advisor",
        group: "advisor",
        photo: {
          asset: { _ref: "advisor-photo" },
          hotspot: editorHotspot,
        },
      },
    ]);

    await expect(fetchTeamMembers()).resolves.toMatchObject({
      team: [
        {
          photo: "original:team-photo",
          photoCard: "cropped:team-photo:1000x750",
          photoPortrait: "cropped:team-photo:750x1000",
        },
      ],
      advisors: [
        {
          photo: "original:advisor-photo",
          photoCard: "cropped:advisor-photo:1000x1000",
          photoPortrait: "cropped:advisor-photo:750x1000",
        },
      ],
    });

    const teamFramedImage = buildCroppedImageUrl.mock.calls[0]?.[0];
    expect(teamFramedImage.hotspot).toEqual({
      _type: "sanity.imageHotspot",
      x: 0.5,
      y: 0.32,
      height: 0.1,
      width: 0.1,
    });

    const advisorFramedImage = buildCroppedImageUrl.mock.calls[2]?.[0];
    expect(advisorFramedImage.hotspot).toBe(editorHotspot);
  });

  it("keeps the original URL as a defensive framed-image fallback", async () => {
    sanityFetch.mockResolvedValue([
      {
        ...basePerson,
        id: "team-1",
        name: "Team member",
        group: "team",
        photo: { asset: { _ref: "team-photo" } },
      },
    ]);
    buildCroppedImageUrl.mockReturnValue(undefined);

    await expect(fetchTeamMembers()).resolves.toMatchObject({
      team: [
        {
          photo: "original:team-photo",
          photoCard: "original:team-photo",
          photoPortrait: "original:team-photo",
        },
      ],
    });
  });
});
