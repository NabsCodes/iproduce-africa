import Image from "next/image";
import { TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PartnersHeroMap, PartnersHeroStat } from "@/types/partners";

type AfricaMapProps = {
  map: PartnersHeroMap;
  stat: PartnersHeroStat;
  className?: string;
};

export function AfricaMap({ map, stat, className }: AfricaMapProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[400px] sm:max-w-[460px] lg:w-[min(38vw,520px)] lg:max-w-none lg:shrink-0 xl:w-[min(38vw,580px)]",
        className,
      )}
    >
      <Image
        src={map.base}
        alt={map.baseAlt}
        width={1001}
        height={1123}
        priority
        sizes="(min-width: 1280px) 560px, (min-width: 1024px) 38vw, (min-width: 640px) 460px, 100vw"
        className="relative z-10 h-auto w-full select-none"
      />

      <Image
        src={map.madagascar}
        alt=""
        aria-hidden
        width={67}
        height={117}
        sizes="80px"
        className="pointer-events-none absolute top-[68%] right-[1%] z-20 h-[19%] w-auto select-none"
      />

      <div className="border-default elevation-3 absolute bottom-[5%] left-[-2%] z-30 flex items-center gap-3 rounded-lg border bg-white p-3 sm:bottom-[7%] sm:left-[-4%] sm:max-w-[300px] sm:p-3.5 lg:left-[14%]">
        <span className="bg-leaf-subtle text-leaf-700 flex size-10 shrink-0 items-center justify-center rounded-full sm:size-11">
          <TrendingUp className="size-4 sm:size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-fg-muted text-[11px] leading-4 sm:text-xs">
            {stat.label}
          </p>
          <p className="text-foreground mt-0.5 text-sm leading-5 font-semibold">
            {stat.value}
          </p>
        </div>
      </div>
    </div>
  );
}
