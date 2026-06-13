import { cn } from "@/lib/utils";

type EyebrowBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function EyebrowBadge({ children, className }: EyebrowBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3 py-2", className)}>
      <span className="bg-tangerine-600 h-px w-9" aria-hidden />
      <span className="text-tangerine-600 text-xs font-semibold tracking-[0.18em] uppercase">
        {children}
      </span>
    </div>
  );
}
