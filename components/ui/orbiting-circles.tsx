import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type OrbitRingProps = {
  diameter: number;
  className?: string;
  dashed?: boolean;
};

export function OrbitRing({
  diameter,
  className,
  dashed = false,
}: OrbitRingProps) {
  const radius = diameter / 2;

  return (
    <div
      aria-hidden
      className={cn(
        "border-grey-200 pointer-events-none absolute top-1/2 left-1/2 rounded-full border border-solid",
        dashed && "border-dashed",
        className,
      )}
      style={{
        width: diameter,
        height: diameter,
        marginLeft: -radius,
        marginTop: -radius,
      }}
    />
  );
}

type OrbitItemProps = {
  angle: number;
  radius: number;
  duration: number;
  reverse?: boolean;
  delay?: number;
  children: ReactNode;
  className?: string;
  size?: number;
  /** Center variable-width children (labels) on the orbit path. */
  fit?: boolean;
};

export function OrbitItem({
  angle,
  radius,
  duration,
  reverse = false,
  delay = 0,
  children,
  className,
  size = 44,
  fit = false,
}: OrbitItemProps) {
  const style = {
    "--orbit-angle": angle,
    "--orbit-radius": `${radius}px`,
    "--orbit-duration": `${duration}s`,
    "--orbit-delay": `${delay}s`,
    "--orbit-size": fit ? "1px" : `${size}px`,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "orbit-item absolute top-1/2 left-1/2",
        reverse && "orbit-item-reverse",
        fit && "overflow-visible",
        className,
      )}
      style={style}
    >
      {fit ? (
        <div className="orbit-item-content absolute top-1/2 left-1/2 w-max max-w-max -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

type OrbitDotProps = {
  angle: number;
  radius: number;
  duration: number;
  reverse?: boolean;
  tone?: "leaf" | "tangerine";
  className?: string;
};

export function OrbitDot({
  angle,
  radius,
  duration,
  reverse = false,
  tone = "leaf",
  className,
}: OrbitDotProps) {
  return (
    <OrbitItem
      angle={angle}
      radius={radius}
      duration={duration}
      reverse={reverse}
      size={8}
      className={className}
    >
      <span
        aria-hidden
        className={cn(
          "block size-2 rounded-full",
          tone === "leaf" ? "bg-leaf-500" : "bg-tangerine-500",
        )}
      />
    </OrbitItem>
  );
}
