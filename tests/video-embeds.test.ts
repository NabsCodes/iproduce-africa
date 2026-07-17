import { describe, expect, it } from "vitest";

import { resolveVideoEmbed } from "@/lib/video-embeds";

describe("resolveVideoEmbed", () => {
  it.each([
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://youtu.be/dQw4w9WgXcQ?t=15",
    "https://youtube.com/embed/dQw4w9WgXcQ",
    "https://m.youtube.com/shorts/dQw4w9WgXcQ",
  ])(
    "normalizes supported YouTube URLs without forwarding their query",
    (url) => {
      expect(resolveVideoEmbed(url)).toEqual({
        provider: "YouTube",
        embedUrl:
          "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0",
      });
    },
  );

  it.each([
    "https://vimeo.com/123456789",
    "https://player.vimeo.com/video/123456789?h=secret",
    "https://vimeo.com/channels/staffpicks/123456789",
  ])(
    "normalizes supported Vimeo URLs without forwarding their query",
    (url) => {
      expect(resolveVideoEmbed(url)).toEqual({
        provider: "Vimeo",
        embedUrl: "https://player.vimeo.com/video/123456789?autoplay=1&dnt=1",
      });
    },
  );

  it.each([
    undefined,
    "",
    "not-a-url",
    "javascript:alert(1)",
    "https://example.com/embed/dQw4w9WgXcQ",
    "https://youtube.com/watch?v=<script>",
    "https://vimeo.com/not-a-video",
  ])("rejects blank, malformed, or untrusted input", (url) => {
    expect(resolveVideoEmbed(url)).toBeUndefined();
  });
});
