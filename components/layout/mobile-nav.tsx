"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SiteLogo } from "@/components/layout/site-logo";
import { mainNavigation } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  activePath?: string;
  currentRoute?: string;
};

const rowEntryClass =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-3 motion-safe:duration-500 motion-safe:fill-mode-both motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]";

const rowDelay = (i: number) => ({ animationDelay: `${80 + i * 35}ms` });

export function MobileNav({
  activePath = "/",
  currentRoute = activePath,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | undefined>(undefined);

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setExpanded(activePath.startsWith("/academy") ? "/academy" : undefined);
    }
    setOpen(next);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="text-grey-950 focus-visible:ring-leaf-400 inline-flex size-11 shrink-0 items-center justify-center transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:outline-none md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="data-[side=top]:data-open:slide-in-from-top-20 data-[side=top]:data-closed:slide-out-to-top-16 h-dvh! w-full max-w-none flex-col gap-0 border-none bg-white p-0 duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
        showCloseButton={false}
        aria-describedby={undefined}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        <div className="flex h-full flex-col overflow-y-auto overscroll-contain">
          <div className="flex items-center justify-between px-5 py-3 sm:px-6">
            <SheetClose asChild>
              <SiteLogo />
            </SheetClose>
            <SheetClose
              aria-label="Close menu"
              className="text-grey-950 focus-visible:ring-leaf-400 -mr-2 inline-flex size-11 shrink-0 items-center justify-center transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:outline-none"
            >
              <X className="size-6" strokeWidth={1.75} />
            </SheetClose>
          </div>

          <nav className="flex-1 px-5 sm:px-6" aria-label="Primary">
            <Accordion
              type="single"
              collapsible
              value={expanded}
              onValueChange={setExpanded}
              className="w-full"
            >
              {mainNavigation.map((link, index) => {
                const number = String(index + 1).padStart(2, "0");
                const hasChildren = "children" in link && link.children;
                const isOpenSection = hasChildren && expanded === link.href;
                const isActiveRoute = hasChildren
                  ? activePath.startsWith(link.href)
                  : activePath === link.href;
                const accent = isActiveRoute || isOpenSection;

                if (hasChildren) {
                  return (
                    <AccordionItem
                      key={link.href}
                      value={link.href}
                      style={rowDelay(index)}
                      className={cn(
                        "border-grey-200 border-t-0 border-b",
                        rowEntryClass,
                      )}
                    >
                      <AccordionTrigger
                        className={cn(
                          "border-0 py-5 font-serif text-2xl font-semibold hover:no-underline focus-visible:ring-0",
                          "[&>svg]:text-leaf-600 [&>svg]:size-5 [&>svg]:transition-colors",
                          accent
                            ? "text-tangerine-500 [&>svg]:text-tangerine-500"
                            : "text-grey-950",
                        )}
                      >
                        <span className="flex items-center gap-4">
                          <span
                            className={cn(
                              "font-sans text-sm font-medium",
                              accent ? "text-tangerine-500" : "text-grey-400",
                            )}
                            aria-hidden
                          >
                            {number}
                          </span>
                          {link.label}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-3 [&_a]:no-underline">
                        <ul className="space-y-1 pl-10">
                          {link.children.map((child) => {
                            const isChildActive = currentRoute === child.href;
                            return (
                              <li key={child.href}>
                                <SheetClose asChild>
                                  <Link
                                    href={child.href}
                                    aria-current={
                                      isChildActive ? "page" : undefined
                                    }
                                    className={cn(
                                      "block rounded-2xl px-4 py-3 font-sans text-base font-medium transition-colors",
                                      "focus-visible:ring-leaf-400 focus-visible:ring-2 focus-visible:outline-none",
                                      isChildActive
                                        ? "bg-leaf-100 text-grey-950"
                                        : "text-grey-600 hover:bg-leaf-50 hover:text-grey-900",
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                </SheetClose>
                              </li>
                            );
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }

                return (
                  <div
                    key={link.href}
                    style={rowDelay(index)}
                    className={cn("border-grey-200 border-b", rowEntryClass)}
                  >
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        aria-current={isActiveRoute ? "page" : undefined}
                        className={cn(
                          "focus-visible:ring-leaf-400 flex min-h-11 items-center justify-between py-5 font-serif text-2xl font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none",
                          isActiveRoute
                            ? "text-tangerine-500"
                            : "text-grey-950",
                        )}
                      >
                        <span className="flex items-center gap-4">
                          <span
                            className={cn(
                              "font-sans text-sm font-medium",
                              isActiveRoute
                                ? "text-tangerine-500"
                                : "text-grey-400",
                            )}
                            aria-hidden
                          >
                            {number}
                          </span>
                          {link.label}
                        </span>
                        <ArrowRight
                          className={cn(
                            "size-5 shrink-0",
                            isActiveRoute
                              ? "text-tangerine-500"
                              : "text-leaf-600",
                          )}
                          aria-hidden
                        />
                      </Link>
                    </SheetClose>
                  </div>
                );
              })}
            </Accordion>
          </nav>

          <div
            style={rowDelay(mainNavigation.length)}
            className={cn("space-y-3 px-5 pt-7 pb-2 sm:px-6", rowEntryClass)}
          >
            <ButtonLink
              href="/community#join"
              variant="green"
              size="lg"
              fullWidth
              className="h-14 rounded-3xl text-base font-semibold"
            >
              Join our community
            </ButtonLink>
            <SheetClose asChild>
              <Link
                href="/partners#partner"
                className="text-leaf-700 hover:text-forest-700 focus-visible:ring-leaf-400 block py-3 text-center text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                Partner with us
              </Link>
            </SheetClose>
          </div>

          <div
            style={rowDelay(mainNavigation.length + 1)}
            className={cn(
              "border-grey-200 mt-3 flex items-center justify-between gap-4 border-t px-5 py-5 sm:px-6",
              rowEntryClass,
            )}
          >
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label={`Email ${siteConfig.email}`}
              className="text-grey-700 hover:text-forest-700 focus-visible:ring-leaf-400 truncate text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              aria-label={`Call ${siteConfig.phone}`}
              className="text-grey-700 hover:text-forest-700 focus-visible:ring-leaf-400 shrink-0 text-sm tabular-nums transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
