"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock3, Mail, Phone, UserPlus, X } from "lucide-react";
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
import { SiteLogo } from "@/components/layout/site-logo";
import { SocialIcon } from "@/components/layout/social-icon";
import { mainNavigation } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  activePath?: string;
};

export function MobileNav({ activePath = "/" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useClickOutside(menuRef, () => setOpen(false), {
    active: open,
    ignoreRefs: [triggerRef],
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className="text-grey-950 inline-flex size-10 items-center justify-center transition-opacity hover:opacity-70 md:hidden"
          aria-label="Open menu"
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
        side="right"
        className="flex w-full max-w-none flex-col gap-0 border-none p-0 sm:max-w-full"
        showCloseButton={false}
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        <div ref={menuRef} className="flex h-full flex-col gap-0">
          <div className="flex items-center justify-between px-5 py-5">
            <SiteLogo />
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
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue={link.href}
                    >
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
                                      "text-grey-800 hover:bg-leaf-50 block px-4 py-3 transition-colors",
                                      activePath === child.href &&
                                        "bg-leaf-100",
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
            <ButtonLink href="/community" variant="green" size="lg" fullWidth>
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

          <div className="border-grey-200 bg-grey-50 space-y-4 border-t px-5 py-5">
            <p className="text-grey-600 flex items-center gap-2 text-sm font-medium">
              <Clock3 className="text-leaf-600 size-4" aria-hidden />
              <span>{siteConfig.hours}</span>
            </p>
            <div className="grid gap-3 text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-grey-700 hover:text-forest-700 flex items-center gap-2.5 transition-colors"
              >
                <Mail className="size-4" aria-hidden />
                <span>{siteConfig.email}</span>
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-grey-700 hover:text-forest-700 flex items-center gap-2.5 transition-colors"
              >
                <Phone className="size-4" aria-hidden />
                <span>{siteConfig.phone}</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              {siteConfig.socialLinks.map((social) => {
                if (social.href) {
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="border-grey-200 text-grey-700 hover:border-leaf-300 hover:text-leaf-700 inline-flex size-10 items-center justify-center border bg-white transition-colors"
                    >
                      <SocialIcon
                        platform={social.platform}
                        className="size-4"
                      />
                    </a>
                  );
                }

                return (
                  <span
                    key={social.label}
                    role="img"
                    aria-label={social.label}
                    className="border-grey-200 text-grey-700 inline-flex size-10 items-center justify-center border bg-white"
                  >
                    <SocialIcon platform={social.platform} className="size-4" />
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
