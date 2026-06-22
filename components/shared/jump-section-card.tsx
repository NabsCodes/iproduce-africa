import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Lightbulb,
  Newspaper,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { JumpSectionIconKey } from "@/types/content";

const jumpSectionIcons = {
  "graduation-cap": GraduationCap,
  lightbulb: Lightbulb,
  users: Users,
  newspaper: Newspaper,
} satisfies Record<JumpSectionIconKey, LucideIcon>;

const cardHoverBorderClass = {
  home: "hover:border-leaf-400 focus-visible:border-leaf-500",
  academy: "hover:border-tangerine-300 focus-visible:border-tangerine-400",
} as const;

const iconChipClass = {
  home: "bg-leaf-subtle text-leaf-700 group-hover:bg-leaf-600 group-hover:text-white",
  academy:
    "bg-leaf-subtle text-leaf-700 group-hover:bg-tangerine-400 group-hover:text-white",
} as const;

type JumpSectionCardProps = {
  href: string;
  icon: JumpSectionIconKey;
  title: string;
  description: string;
  variant?: keyof typeof iconChipClass;
  ctaLabel?: string;
  className?: string;
};

export function JumpSectionCard({
  href,
  icon,
  title,
  description,
  variant = "academy",
  ctaLabel = "Jump to section",
  className,
}: JumpSectionCardProps) {
  const Icon = jumpSectionIcons[icon];

  return (
    <Link
      href={href}
      className={cn(
        "group focus-visible:ring-leaf-200 border-default flex h-full flex-col rounded-xl border bg-white p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none sm:p-6",
        cardHoverBorderClass[variant],
        className,
      )}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-full transition-colors",
          iconChipClass[variant],
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="text-foreground mt-5 font-serif text-lg font-semibold sm:mt-6">
        {title}
      </h3>
      <p className="text-fg-subtle mt-2 flex-1 text-sm leading-5">
        {description}
      </p>
      <span className="text-leaf-700 group-hover:text-leaf-800 mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors">
        {ctaLabel}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
