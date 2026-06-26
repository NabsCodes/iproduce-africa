import Image from "next/image";
import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { BenefitTone } from "@/types/content";

type WhyJoinServiceCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  tone: BenefitTone;
  imagePosition?: string;
};

const iconChipClass: Record<BenefitTone, string> = {
  leaf: "bg-leaf-100 text-leaf-700",
  tangerine: "bg-tangerine-100 text-tangerine-700",
};

export function WhyJoinServiceCard({
  title,
  description,
  image,
  imageAlt,
  icon: Icon,
  tone,
  imagePosition = "object-center",
}: WhyJoinServiceCardProps) {
  return (
    <article className="group border-border flex h-full flex-col rounded-xl border bg-white p-4">
      <div className="relative h-[232px] overflow-hidden rounded-xl sm:h-[256px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-[1.03]",
            imagePosition,
          )}
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/10" aria-hidden />
      </div>

      <span
        className={cn(
          "mt-4 flex size-11 items-center justify-center rounded-full",
          iconChipClass[tone],
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>

      <h3 className="text-foreground mt-3 font-serif text-lg leading-[26px] font-semibold">
        {title}
      </h3>
      <p className="text-fg-muted mt-2 text-sm leading-6">{description}</p>
    </article>
  );
}
