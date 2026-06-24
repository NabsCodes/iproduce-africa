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
        }
      })}
    </div>
  );
}
