import type { BlogArticleBlock } from "@/types/blog";

/**
 * Scaffold for the Portable Text (from Sanity) → BlogArticleBlock[] adapter.
 * Not imported by any route yet — the real wiring happens when the blog
 * detail route cuts over to Sanity.
 *
 * Studio v1 disables decorators/annotations on the body `block` type (see
 * sanity/schemaTypes/documents/academy-article.ts), so there are no marks to
 * strip in practice right now — `span.text` can be read verbatim. The moment
 * a later slice re-enables marks in the schema, this adapter needs mark
 * handling (strip to plain text per the v1 fidelity contract in
 * docs/sanity-academy-spec.md) before that schema change ships, not after.
 */

type PortableTextBlock = {
  _type: string;
  _key: string;
  style?: string;
  listItem?: string;
  children?: { _type: string; text: string }[];
  [key: string]: unknown;
};

export function portableTextToBlogArticleBlocks(
  blocks: readonly PortableTextBlock[],
): BlogArticleBlock[] {
  const result: BlogArticleBlock[] = [];
  let pendingListItems: string[] = [];

  const flushList = () => {
    if (pendingListItems.length > 0) {
      result.push({ kind: "list_unordered", items: pendingListItems });
      pendingListItems = [];
    }
  };

  for (const block of blocks) {
    if (block._type === "block" && block.listItem === "bullet") {
      pendingListItems.push(plainText(block));
      continue;
    }

    flushList();

    switch (block._type) {
      case "block":
        result.push(blockToArticleBlock(block));
        break;
      case "callout":
        result.push({
          kind: "callout",
          title: block.title as string | undefined,
          text: block.text as string,
        });
        break;
      case "table":
        result.push({
          kind: "table",
          caption: block.caption as string | undefined,
          headers: block.headers as string[],
          rows: (block.rows as { cells: string[] }[]).map((row) => row.cells),
        });
        break;
      case "codeBlock":
        result.push({
          kind: "code",
          language: block.language as string | undefined,
          filename: block.filename as string | undefined,
          code: block.code as string,
        });
        break;
      case "bodyImage":
        result.push({
          kind: "image",
          src: (block.image as { asset?: { url?: string } })?.asset?.url ?? "",
          alt: block.alt as string,
          caption: block.caption as string | undefined,
        });
        break;
      case "orderedStep":
        result.push({
          kind: "list_ordered",
          items: [{ title: block.title as string, body: block.body as string }],
        });
        break;
    }
  }

  flushList();
  return mergeConsecutiveOrderedSteps(result);
}

function plainText(block: PortableTextBlock): string {
  return (block.children ?? []).map((span) => span.text).join("");
}

function blockToArticleBlock(block: PortableTextBlock): BlogArticleBlock {
  const text = plainText(block);
  switch (block.style) {
    case "h2":
      return { kind: "heading2", text };
    case "h3":
      return { kind: "heading3", text };
    case "blockquote":
      return { kind: "blockquote", text };
    default:
      return { kind: "paragraph", text };
  }
}

/** Consecutive `orderedStep` entries collapse into one `list_ordered` block. */
function mergeConsecutiveOrderedSteps(
  blocks: BlogArticleBlock[],
): BlogArticleBlock[] {
  const merged: BlogArticleBlock[] = [];

  for (const block of blocks) {
    const previous = merged[merged.length - 1];
    if (block.kind === "list_ordered" && previous?.kind === "list_ordered") {
      merged[merged.length - 1] = {
        kind: "list_ordered",
        items: [...previous.items, ...block.items],
      };
      continue;
    }
    merged.push(block);
  }

  return merged;
}
