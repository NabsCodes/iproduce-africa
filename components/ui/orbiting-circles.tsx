import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type OrbitRingProps = {
  diameter: number;
  className?: string;
};

export function OrbitRing({ diameter, className }: OrbitRingProps) {
  const radius = diameter / 2;

  return (
    <div
      aria-hidden
      className={cn(
        "border-grey-200 pointer-events-none absolute top-1/2 left-1/2 rounded-full border",
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
}: OrbitItemProps) {
  const style = {
    "--orbit-angle": angle,
    "--orbit-radius": `${radius}px`,
    "--orbit-duration": `${duration}s`,
    "--orbit-delay": `${delay}s`,
    "--orbit-size": `${size}px`,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "orbit-item absolute top-1/2 left-1/2",
        reverse && "orbit-item-reverse",
        className,
      )}
      style={style}
    >
      {children}
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
