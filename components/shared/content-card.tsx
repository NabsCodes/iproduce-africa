import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ContentCardTone = "tangerine" | "leaf" | "forest";

export type ContentCardTag = {
  label: string;
  tone?: ContentCardTone;
};

type ContentCardProps = {
  image: string;
  imageAlt?: string;
  href: string;
  primaryTag: ContentCardTag;
  secondaryTag?: { label: string };
  title: string;
  description?: string;
  className?: string;
};

export function ContentCard({
  image,
  imageAlt = "",
  href,
  primaryTag,
  secondaryTag,
  title,
  description,
  className,
}: ContentCardProps) {
  const primaryTone: ContentCardTone = primaryTag.tone ?? "tangerine";

  return (
    <Card
      className={cn(
        "border-border bg-subtle flex flex-col gap-0 rounded-[20px] border p-4 shadow-none ring-0",
        className,
      )}
    >
      <CardContent className="flex flex-1 flex-col p-0">
        <Link href={href} className="group flex flex-1 flex-col">
          <div className="relative aspect-4/3 overflow-hidden rounded-[14px]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant={primaryTone}>{primaryTag.label}</Badge>
            {secondaryTag ? (
              <span className="border-border text-fg-muted inline-flex h-5 items-center rounded-full border bg-transparent px-2 text-[11px] font-semibold tracking-wide">
                {secondaryTag.label}
              </span>
            ) : null}
          </div>

          <h3 className="text-foreground group-hover:text-leaf-700 mt-3 font-serif text-lg leading-[26px] font-semibold transition-colors">
            {title}
          </h3>
          {description ? (
            <p className="text-fg-muted mt-2 text-sm leading-[22px]">
              {description}
            </p>
          ) : null}
        </Link>
      </CardContent>
    </Card>
  );
}
