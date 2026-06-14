"use client";

import Link from "next/link";
import { ArrowRight, UserPlus, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, ButtonLink } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/icons/logo";
import { mainNavigation } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  activePath?: string;
};

export function MobileNav({ activePath = "/" }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="neutral-outline"
          size="icon-sm"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full max-w-none flex-col gap-0 border-none p-0 sm:max-w-full"
        showCloseButton={false}
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        <div className="flex items-center justify-between px-5 py-5">
          <Logo />
          <SheetClose asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Close menu">
              <X className="size-5" />
            </Button>
          </SheetClose>
        </div>

        <nav className="flex-1 px-5" aria-label="Mobile">
          {mainNavigation.map((link, index) => {
            const number = String(index + 1).padStart(2, "0");

            if ("children" in link && link.children) {
              return (
                <div key={link.href}>
                  <Accordion type="single" collapsible defaultValue={link.href}>
                    <AccordionItem value={link.href} className="border-none">
                      <AccordionTrigger
                        className={cn(
                          "text-grey-950 [&>svg]:text-tangerine-500 py-5 font-serif text-2xl font-semibold hover:no-underline",
                          activePath.startsWith(link.href) &&
                            "text-tangerine-500",
                        )}
                      >
                        <span className="flex items-center gap-4">
                          <span className="text-grey-400 font-sans text-sm font-medium">
                            {number}
                          </span>
                          {link.label}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-2 pl-10">
                        <ul className="space-y-1">
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <SheetClose asChild>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    "text-grey-800 hover:bg-leaf-50 block rounded-xl px-4 py-3 transition-colors",
                                    activePath === child.href && "bg-leaf-100",
                                  )}
                                >
                                  <span className="font-sans text-base font-medium">
                                    {child.label}
                                  </span>
                                  {"description" in child &&
                                  child.description ? (
                                    <span className="text-grey-500 mt-0.5 block text-sm">
                                      {child.description}
                                    </span>
                                  ) : null}
                                </Link>
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Separator />
                </div>
              );
            }

            return (
              <div key={link.href}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-grey-950 flex items-center justify-between py-5 font-serif text-2xl font-semibold",
                      activePath === link.href && "text-tangerine-500",
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-grey-400 font-sans text-sm font-medium">
                        {number}
                      </span>
                      {link.label}
                    </span>
                    <ArrowRight className="text-leaf-600 size-5" />
                  </Link>
                </SheetClose>
                <Separator />
              </div>
            );
          })}
        </nav>

        <div className="space-y-3 px-5 py-6">
          <ButtonLink
            href="/community"
            variant="green"
            size="lg"
            fullWidth
            className="rounded-xl"
          >
            <UserPlus className="size-5" />
            Join our community
          </ButtonLink>
          <ButtonLink
            href="/partners"
            variant="green-ghost"
            size="lg"
            fullWidth
          >
            Partner with us
          </ButtonLink>
        </div>

        <div className="border-grey-200 text-grey-500 flex items-center justify-between border-t px-5 py-4 text-sm">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
