import { randomUUID } from "node:crypto";
import type { BlogArticleBlock } from "@/types/blog";

/**
 * Migration-direction converter: BlogArticleBlock[] (static content) → Sanity
 * Portable Text (for academyArticle.body). This is the reverse of
 * lib/sanity/portable-text.ts's fetch-direction adapter — deliberately kept
 * out of lib/sanity/ since it's one-off migration tooling, not an app-side
 * fetch concern.
 */

export type PortableTextEntry = Record<string, unknown> & {
  _type: string;
  _key: string;
};

/** Resolves an already-uploaded image asset for a given source URL, or throws if unresolved. */
export type ImageAssetResolver = (src: string) => {
  _type: "reference";
  _ref: string;
};

function key(): string {
  return randomUUID().slice(0, 12);
}

function textBlock(style: string, text: string): PortableTextEntry {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

export function blocksToPortableText(
  blocks: readonly BlogArticleBlock[],
  resolveImageAsset: ImageAssetResolver,
): PortableTextEntry[] {
  const result: PortableTextEntry[] = [];

  for (const block of blocks) {
    switch (block.kind) {
      case "paragraph":
        result.push(textBlock("normal", block.text));
        break;
      case "heading2":
        result.push(textBlock("h2", block.text));
        break;
      case "heading3":
        result.push(textBlock("h3", block.text));
        break;
      case "blockquote":
        result.push(textBlock("blockquote", block.text));
        break;
      case "callout":
        result.push({
          _type: "callout",
          _key: key(),
          title: block.title,
          text: block.text,
        });
        break;
      case "list_unordered":
        for (const item of block.items) {
          result.push({
            _type: "block",
            _key: key(),
            style: "normal",
            listItem: "bullet",
            level: 1,
            markDefs: [],
            children: [{ _type: "span", _key: key(), text: item, marks: [] }],
          });
        }
        break;
      case "list_ordered":
        for (const item of block.items) {
          result.push({
            _type: "orderedStep",
            _key: key(),
            title: item.title,
            body: item.body,
          });
        }
        break;
      case "table":
        result.push({
          _type: "table",
          _key: key(),
          caption: block.caption,
          headers: [...block.headers],
          rows: block.rows.map((cells) => ({
            _type: "tableRow",
            _key: key(),
            cells: [...cells],
          })),
        });
        break;
      case "code":
        result.push({
          _type: "codeBlock",
          _key: key(),
          language: block.language,
          filename: block.filename,
          code: block.code,
        });
        break;
      case "image":
        result.push({
          _type: "bodyImage",
          _key: key(),
          image: resolveImageAsset(block.src),
          alt: block.alt,
          caption: block.caption,
        });
        break;
    }
  }

  return result;
}
