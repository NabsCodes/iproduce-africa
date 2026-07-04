import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "@/lib/sanity/client";

const builder = createImageUrlBuilder(client);

/** Not imported by any route yet — scaffolding for the fetch-layer slice. */
export function urlFor(source: Image) {
  return builder.image(source);
}
