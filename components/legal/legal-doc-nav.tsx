"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { legalContent } from "@/content/legal";
import { cn } from "@/lib/utils";

export function LegalDocNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Legal documents"
      className={cn("flex flex-col gap-1", className)}
    >
      {legalContent.nav.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "focus-visible:ring-leaf-300 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-normal transition-colors focus-visible:ring-2 focus-visible:outline-none",
              isActive
                ? "bg-leaf-subtle text-leaf-700"
                : "text-fg-muted hover:bg-subtle hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
