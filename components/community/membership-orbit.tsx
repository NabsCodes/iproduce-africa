import type { CSSProperties } from "react";
import Image from "next/image";
import type {
  CommunityOrbitChip,
  CommunityOrbitContent,
} from "@/types/content";
import { communityOrbitIcons } from "@/lib/community-orbit-icons";
import { DecorativeRing } from "@/components/ui/decorative-ring";
import { OrbitItem, OrbitRing } from "@/components/ui/orbiting-circles";
import { cn } from "@/lib/utils";

type MembershipOrbitProps = {
  orbit: CommunityOrbitContent;
  className?: string;
};

/** Space beyond the outer ring so labeled chips stay inside the scaled frame. */
const LABEL_INSET = 90;

function OrbitChip({
  label,
  icon,
  tone,
}: Pick<CommunityOrbitChip, "label" | "icon" | "tone">) {
  const Icon = communityOrbitIcons[icon];

  return (
    <div className="border-border bg-background flex w-max max-w-max shrink-0 items-center gap-2 rounded-full border py-[7px] pr-4 pl-2 whitespace-nowrap shadow-[0_1px_2px_0_rgb(15_20_10/0.06)]">
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full",
          tone === "leaf"
            ? "bg-leaf-subtle text-leaf-700"
            : "bg-tangerine-subtle text-tangerine-600",
        )}
      >
        <Icon className="size-4 stroke-[1.75]" aria-hidden />
      </span>
      <span className="text-forest-800 text-sm leading-5 font-semibold">
        {label}
      </span>
    </div>
  );
}

export function MembershipOrbit({ orbit, className }: MembershipOrbitProps) {
  const rings = [...orbit.rings].sort((a, b) => a.radius - b.radius);
  const outerRadius = rings[rings.length - 1]?.radius ?? 230;
  const designSize = outerRadius * 2 + LABEL_INSET * 2;

  return (
    <div
      aria-hidden
      className={cn(
        "ecosystem-orbit-frame mx-auto w-full overflow-hidden",
        className,
      )}
      style={{ "--orbit-design-size": `${designSize}px` } as CSSProperties}
    >
      <div className="ecosystem-orbit-stage">
        {rings.map((ring, index) => {
          const isOuterRing = index === rings.length - 1;

          return (
            <OrbitRing
              key={ring.radius}
              diameter={ring.radius * 2}
              dashed={isOuterRing}
              className={
                isOuterRing
                  ? "border-grey-200 border-3"
                  : "border-leaf-subtle border-3 border-solid"
              }
            />
          );
        })}

        {rings.map((ring) =>
          ring.items.map((item) => (
            <OrbitItem
              key={`${item.label}-${item.angle}`}
              angle={item.angle}
              radius={ring.radius}
              duration={ring.duration}
              reverse={ring.reverse}
              fit
            >
              <OrbitChip {...item} />
            </OrbitItem>
          )),
        )}

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative flex size-[76px] items-center justify-center rounded-full bg-white shadow-[0_1px_2px_0_rgb(15_20_10/0.06)]">
            <DecorativeRing
              strokeWidth={2.5}
              className="text-tangerine-500 inset-0 size-full"
            />
            <Image
              src="/images/shared/logo-mark.webp"
              alt=""
              width={56}
              height={56}
              className="relative object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
