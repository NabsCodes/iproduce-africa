import { Badge } from "@/components/ui/badge";
import type { ContentCardTone } from "@/types/content";

type ArticleMetaBadgesProps = {
  category: string;
  readTimeMinutes: number;
  categoryTone?: ContentCardTone;
};

export function ArticleMetaBadges({
  category,
  readTimeMinutes,
  categoryTone = "leaf",
}: ArticleMetaBadgesProps) {
  return (
    <>
      <Badge variant={categoryTone}>{category.toUpperCase()}</Badge>
      <Badge variant="meta">{readTimeMinutes} MIN READ</Badge>
    </>
  );
}
