"use client";

import { Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { legalContent } from "@/content/legal";
import { cn } from "@/lib/utils";

export function LegalDocSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const current =
    legalContent.nav.find((item) => item.href === pathname) ??
    legalContent.nav[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "border-border data-[state=open]:border-leaf-emphasized focus-visible:ring-leaf-300 flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none",
          className,
        )}
      >
        <span className="flex min-w-0 flex-col">
          <span className="text-fg-subtle text-[11px] font-semibold tracking-[0.14em] uppercase">
            Legal documents
          </span>
          <span className="text-foreground truncate text-sm font-semibold">
            {current.label}
          </span>
        </span>
        <ChevronDown aria-hidden className="text-fg-muted size-4 shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="border-grey-200 w-(--radix-dropdown-menu-trigger-width) min-w-[240px] border bg-white p-2 ring-0"
      >
        {legalContent.nav.map((item) => {
          const isActive = item.href === pathname;
          return (
            <DropdownMenuItem
              key={item.key}
              asChild
              className="p-0 focus:bg-transparent"
            >
              <Link
                href={item.href}
                className={cn(
                  "text-grey-900 hover:bg-leaf-50 focus-visible:ring-leaf-300 flex cursor-pointer items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  isActive && "bg-leaf-50 text-forest-700 font-semibold",
                )}
              >
                {item.label}
                {isActive ? (
                  <Check aria-hidden className="size-4 shrink-0" />
                ) : null}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
