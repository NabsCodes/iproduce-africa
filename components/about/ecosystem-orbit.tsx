import type { CSSProperties } from "react";
import type { AboutOrbitContent } from "@/types/content";
import type { PillarIconKey } from "@/lib/pillar-icons";
import { pillarIcons } from "@/lib/pillar-icons";
import { BrowserMockup } from "@/components/shared/browser-mockup";
import {
  OrbitDot,
  OrbitItem,
  OrbitRing,
} from "@/components/ui/orbiting-circles";
import { cn } from "@/lib/utils";

type EcosystemOrbitProps = {
  orbit: AboutOrbitContent;
  className?: string;
};

function OrbitBadge({
  icon,
  tone,
}: {
  icon: PillarIconKey;
  tone: "leaf" | "tangerine";
}) {
  const Icon = pillarIcons[icon];

  return (
    <span
      className={cn(
        "flex size-12 items-center justify-center rounded-full",
        "shadow-[0_2px_4px_-1px_rgb(15_20_10/0.08),0_1px_2px_0_rgb(15_20_10/0.06)]",
        tone === "leaf"
          ? "bg-leaf-muted text-leaf-700"
          : "bg-tangerine-subtle text-tangerine-600",
      )}
    >
      <Icon className="size-5 stroke-[1.75]" aria-hidden />
    </span>
  );
}

export function EcosystemOrbit({ orbit, className }: EcosystemOrbitProps) {
  const outerRadius = Math.max(...orbit.rings.map((ring) => ring.radius));
  const designSize = outerRadius * 2;

  return (
    <div
      aria-hidden
      className={cn("ecosystem-orbit-frame mx-auto", className)}
      style={{ "--orbit-design-size": `${designSize}px` } as CSSProperties}
    >
      <div className="ecosystem-orbit-stage">
        {orbit.rings.map((ring) => (
          <OrbitRing key={ring.radius} diameter={ring.radius * 2} />
        ))}

        {orbit.rings.map((ring) => (
          <div key={`ring-${ring.radius}`}>
            {ring.items.map((item) => (
              <OrbitItem
                key={`${item.icon}-${item.angle}`}
                angle={item.angle}
                radius={ring.radius}
                duration={ring.duration}
                reverse={ring.reverse}
                size={48}
              >
                <OrbitBadge icon={item.icon} tone={item.tone} />
              </OrbitItem>
            ))}

            {ring.dots?.map((dot, index) => (
              <OrbitDot
                key={`dot-${ring.radius}-${index}`}
                angle={dot.angle}
                radius={ring.radius}
                duration={ring.duration}
                reverse={ring.reverse}
                tone={dot.tone}
              />
            ))}
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <BrowserMockup url={orbit.url} />
        </div>

        <div className="bg-panel border-border text-foreground absolute bottom-[4%] left-[2%] z-20 flex items-center gap-2 rounded-full border px-4 py-2.5 shadow-[0_4px_8px_-2px_rgb(15_20_10/0.1),0_2px_4px_-2px_rgb(15_20_10/0.06)]">
          <span
            aria-hidden
            className="bg-leaf-600 size-2 shrink-0 rounded-full"
          />
          <p className="font-serif text-[12.5px] leading-none font-semibold whitespace-nowrap">
            {orbit.statsLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
