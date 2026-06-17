import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type EyebrowBadgeTone = "tangerine" | "neutral";

type EyebrowBadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: EyebrowBadgeTone;
};

const lineClassByTone: Record<EyebrowBadgeTone, string> = {
  tangerine: "bg-tangerine-600",
  neutral: "bg-grey-700",
};

const textClassByTone: Record<EyebrowBadgeTone, string> = {
  tangerine: "text-tangerine-600",
  neutral: "text-foreground",
};

export function EyebrowBadge({
  children,
  className,
  tone = "tangerine",
}: EyebrowBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3 py-2", className)}>
      <span className={cn("h-px w-9", lineClassByTone[tone])} aria-hidden />
      <Badge variant="eyebrow" className={textClassByTone[tone]}>
        {children}
      </Badge>
    </div>
  );
}
