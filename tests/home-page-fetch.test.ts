import { describe, expect, it, vi } from "vitest";

const { resolveImageUrl, resolveImageWithAlt, sanityFetch } = vi.hoisted(
  () => ({
    resolveImageUrl: vi.fn(),
    resolveImageWithAlt: vi.fn(),
    sanityFetch: vi.fn(),
  }),
);

vi.mock("@/lib/sanity/client", () => ({ sanityFetch }));
vi.mock("@/lib/sanity/fetch/site-settings", () => ({ resolveImageWithAlt }));
vi.mock("@/lib/sanity/image", () => ({ resolveImageUrl }));

import { fetchHomePage } from "@/lib/sanity/fetch/home-page";

const serviceKeys = ["advisory", "training", "resources", "dealRoom"];
const valueChainKeys = [
  "livestock",
  "cottonGarment",
  "cropsGrains",
  "horticulture",
  "aquaculture",
];

function imageTextSlots(keys: string[]) {
  return Object.fromEntries(
    keys.map((key) => [
      key,
      {
        title: `${key} title`,
        description: `${key} description`,
        alt: `${key} alt`,
      },
    ]),
  );
}

describe("fetchHomePage", () => {
  it("preserves a validated What We Do video through the public poster shape", async () => {
    resolveImageWithAlt.mockReturnValue({
      image: "https://cdn.sanity.io/poster.jpg",
      alt: "What We Do poster",
    });
    resolveImageUrl.mockReturnValue("https://cdn.sanity.io/card.jpg");
    sanityFetch.mockResolvedValue({
      heroMessage: {
        title: "Connected agribusiness",
        description: "Description",
      },
      whatWeDoPoster: {},
      whatWeDoVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      services: imageTextSlots(serviceKeys),
      valueChains: imageTextSlots(valueChainKeys),
    });

    await expect(fetchHomePage()).resolves.toMatchObject({
      whatWeDoPoster: {
        image: "https://cdn.sanity.io/poster.jpg",
        imageAlt: "What We Do poster",
        video: {
          provider: "YouTube",
          embedUrl:
            "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
        },
      },
    });
  });
});
