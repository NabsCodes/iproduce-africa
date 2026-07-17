export type VideoEmbed = {
  provider: "YouTube" | "Vimeo";
  embedUrl: string;
};

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);
const VIMEO_HOSTS = new Set(["vimeo.com", "www.vimeo.com", "player.vimeo.com"]);
const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{6,20}$/;
const VIMEO_ID_PATTERN = /^\d{6,12}$/;

function youtubeIdFromUrl(url: URL): string | undefined {
  if (url.hostname === "youtu.be") {
    return url.pathname.split("/").filter(Boolean)[0];
  }
  if (!YOUTUBE_HOSTS.has(url.hostname)) return undefined;
  if (url.pathname === "/watch") return url.searchParams.get("v") ?? undefined;

  const [prefix, id] = url.pathname.split("/").filter(Boolean);
  return ["embed", "shorts", "live"].includes(prefix) ? id : undefined;
}

function vimeoIdFromUrl(url: URL): string | undefined {
  if (!VIMEO_HOSTS.has(url.hostname)) return undefined;
  return url.pathname
    .split("/")
    .filter(Boolean)
    .reverse()
    .find((part) => VIMEO_ID_PATTERN.test(part));
}

/**
 * Accepts only known YouTube/Vimeo public URLs and builds the iframe URL from
 * a validated video id. Editor input is never passed through as iframe src.
 */
export function resolveVideoEmbed(
  value?: string | null,
): VideoEmbed | undefined {
  const input = value?.trim();
  if (!input) return undefined;

  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return undefined;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;

  const youtubeId = youtubeIdFromUrl(url);
  if (youtubeId && YOUTUBE_ID_PATTERN.test(youtubeId)) {
    return {
      provider: "YouTube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`,
    };
  }

  const vimeoId = vimeoIdFromUrl(url);
  if (vimeoId) {
    return {
      provider: "Vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1`,
    };
  }

  return undefined;
}
