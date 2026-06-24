import Image from "next/image";

import type { BlogArticleBlock } from "@/types/blog";

type ArticleBodyProps = {
  blocks: readonly BlogArticleBlock[];
};

/**
 * Renders the structured-block body of a blog article. Pure dispatcher
 * by `block.kind`. Stable on the `BlogArticleBlock` shape — when Sanity
 * lands, swap the data source; the renderer doesn't change. The Sanity
 * adapter (PT → BlogArticleBlock, or GROQ projection) is the boundary.
 */
export function ArticleBody({ blocks }: ArticleBodyProps) {
  return (
    <div className="flex w-full flex-col gap-5 sm:gap-6">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-fg-muted text-base leading-7 sm:text-[17px] sm:leading-[28px]"
              >
                {block.text}
              </p>
            );
          case "heading2":
            return (
              <h2
                key={index}
                className="text-foreground mt-4 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:mt-6 sm:text-[28px] sm:leading-[36px]"
              >
                {block.text}
              </h2>
            );
          case "heading3":
            return (
              <h3
                key={index}
                className="text-foreground mt-2 font-serif text-xl leading-tight font-semibold tracking-[-0.01em] sm:text-2xl"
              >
                {block.text}
              </h3>
            );
          case "blockquote":
            return (
              <blockquote
                key={index}
                className="border-leaf-500 text-foreground border-l-4 py-1 pl-5 font-serif text-lg leading-8 italic sm:text-xl"
              >
                {block.text}
              </blockquote>
            );
          case "callout":
            return (
              <aside
                key={index}
                className="border-leaf-200 bg-leaf-50 rounded-xl border px-5 py-4"
              >
                {block.title ? (
                  <p className="text-foreground text-sm font-semibold">
                    {block.title}
                  </p>
                ) : null}
                <p className="text-fg-muted mt-1 text-sm leading-6 sm:text-base sm:leading-7">
                  {block.text}
                </p>
              </aside>
            );
          case "list_unordered":
            return (
              <ul
                key={index}
                className="text-fg-muted marker:text-leaf-600 list-disc space-y-2 pl-6 text-base leading-7 sm:text-[17px] sm:leading-[28px]"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );
          case "list_ordered":
            return (
              <ol
                key={index}
                className="text-fg-muted marker:text-leaf-700 list-decimal space-y-3 pl-6 text-base leading-7 marker:font-semibold sm:text-[17px] sm:leading-[28px]"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <span className="text-foreground font-semibold">
                      {item.title}.
                    </span>{" "}
                    {item.body}
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <figure key={index} className="overflow-x-auto">
                <table className="border-grey-200 w-full min-w-[520px] border text-left text-sm">
                  <thead className="bg-subtle">
                    <tr>
                      {block.headers.map((header, headerIndex) => (
                        <th
                          key={headerIndex}
                          className="text-foreground border-grey-200 border px-4 py-3 font-semibold"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-grey-200 border-t">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="text-fg-muted border-grey-200 border px-4 py-3 align-top"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {block.caption ? (
                  <figcaption className="text-fg-subtle mt-2 text-xs">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "code":
            return (
              <figure
                key={index}
                className="border-grey-200 overflow-hidden rounded-xl border"
              >
                {(block.filename || block.language) && (
                  <figcaption className="border-grey-200 bg-subtle text-fg-subtle border-b px-4 py-2 text-xs font-medium">
                    {block.filename ?? block.language}
                  </figcaption>
                )}
                <pre className="overflow-x-auto p-4 text-sm leading-6">
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
          case "image":
            return (
              <figure key={index} className="overflow-hidden rounded-xl">
                <div className="bg-muted relative aspect-16/10 w-full">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="text-fg-subtle mt-2 text-sm">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
        }
      })}
    </div>
  );
}
