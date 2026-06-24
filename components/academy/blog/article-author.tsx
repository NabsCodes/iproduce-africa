import type { BlogAuthor } from "@/types/blog";

type ArticleAuthorProps = {
  author: BlogAuthor;
  publishedAt: string;
  publishedAtIso: string;
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ArticleAuthor({
  author,
  publishedAt,
  publishedAtIso,
}: ArticleAuthorProps) {
  const initials = getInitials(author.name);

  return (
    <p className="text-fg-muted flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
      <span className="bg-leaf-subtle text-leaf-700 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold tracking-wide">
        {initials}
      </span>
      <span className="text-foreground/90 font-medium">{author.name}</span>
      {author.role ? (
        <>
          <span className="text-fg-subtle" aria-hidden>
            ·
          </span>
          <span className="text-fg-subtle">{author.role}</span>
        </>
      ) : null}
      <span className="text-fg-subtle" aria-hidden>
        ·
      </span>
      <time className="text-fg-subtle" dateTime={publishedAtIso}>
        {publishedAt}
      </time>
    </p>
  );
}
