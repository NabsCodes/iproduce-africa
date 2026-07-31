"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CommunityJoinButton } from "@/components/layout/community-join-button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteLogo } from "@/components/layout/site-logo";
import { ReadingProgress } from "@/components/shared/reading-progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mainNavigation } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { useRouteHash } from "@/hooks/use-route-hash";
import { useScrolled } from "@/hooks/use-scrolled";
import type { PublicSiteSettings } from "@/lib/sanity/fetch/site-settings";
import { cn } from "@/lib/utils";

const blogArticlePath = /^\/academy\/blog\/[^/]+$/;

const navLinkClass =
  "relative inline-flex shrink-0 items-center whitespace-nowrap rounded-lg px-2 py-0.5 font-sans text-[15px] font-medium tracking-[-0.01em] text-grey-800 transition-colors hover:text-forest-700 focus-visible:bg-leaf-50 focus-visible:text-forest-700 focus-visible:outline-none";

function NavIndicator({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <span
      aria-hidden
      className="bg-tangerine-500 pointer-events-none absolute -bottom-0.5 left-1/2 h-0.75 w-5 -translate-x-1/2 rounded-full"
    />
  );
}

export function Header({ contact }: { contact: PublicSiteSettings }) {
  const pathname = usePathname();
  const currentRoute = useRouteHash();
  const activePath = currentRoute.split("#")[0] || "/";
  const scrolled = useScrolled();
  const showReadingProgress = blogArticlePath.test(pathname);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div
        className={cn(
          "relative bg-white transition-[border-color]",
          !showReadingProgress && "border-grey-200 border-b",
          !showReadingProgress && scrolled && "border-grey-300",
        )}
      >
        <div
          className={cn(
            "max-w-8xl desknav:grid-cols-[auto_1fr_auto] mx-auto grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-4 transition-[height] sm:gap-3 sm:px-6 lg:gap-6 lg:px-8 xl:px-10",
            scrolled ? "h-18 lg:h-19" : "h-18 lg:h-20",
          )}
        >
          <SiteLogo priority className="shrink-0 justify-self-start" />

          <nav
            className="desknav:flex hidden w-full min-w-0 flex-nowrap items-center justify-center gap-2 xl:gap-4"
            aria-label="Main"
          >
            {mainNavigation.map((link) => {
              if ("children" in link && link.children) {
                const isActive = activePath.startsWith(link.href);

                return (
                  <div
                    key={link.href}
                    className="relative inline-flex items-center"
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        navLinkClass,
                        "pr-1",
                        isActive && "text-grey-950 font-semibold",
                      )}
                    >
                      {link.label}
                      <NavIndicator active={isActive} />
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        aria-label={`${link.label} menu`}
                        className="group/trigger text-grey-700 hover:text-forest-700 focus-visible:bg-leaf-50 focus-visible:text-forest-700 data-[state=open]:bg-leaf-50 data-[state=open]:text-forest-700 inline-flex size-6 items-center justify-center rounded-md transition-colors focus-visible:outline-none"
                      >
                        <ChevronDown
                          aria-hidden
                          className="size-3.5 opacity-70 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        sideOffset={8}
                        className="border-grey-200 w-auto min-w-60 border bg-white p-2.5 ring-0"
                      >
                        {link.children.map((child) => {
                          const isChildActive =
                            activePath === child.href ||
                            activePath.startsWith(`${child.href}/`);

                          return (
                            <DropdownMenuItem
                              key={child.href}
                              asChild
                              className="p-0 focus:bg-transparent"
                            >
                              <Link
                                href={child.href}
                                className={cn(
                                  "text-grey-900 hover:bg-leaf-50 focus-visible:bg-leaf-50 block cursor-pointer px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none",
                                  isChildActive &&
                                    "bg-leaf-50 text-forest-700 font-semibold",
                                )}
                              >
                                {child.label}
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              }

              const isActive = activePath === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    navLinkClass,
                    isActive && "text-grey-950 font-semibold",
                  )}
                >
                  {link.label}
                  <NavIndicator active={isActive} />
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 justify-self-end sm:gap-3 md:gap-5">
            <a
              href={siteConfig.learningPlatform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={siteConfig.learningPlatform.accessibleLabel}
              className="text-leaf-600 hover:text-leaf-700 focus-visible:bg-leaf-50 focus-visible:text-leaf-700 desknav:inline-flex hidden items-center gap-1 px-2 py-1 text-[15px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-none"
            >
              {siteConfig.learningPlatform.label}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <CommunityJoinButton
              showIcon
              className="hidden h-13 px-6 text-[15px] font-semibold xl:inline-flex"
            >
              Join our community
            </CommunityJoinButton>
            <CommunityJoinButton className="h-11 min-w-11 px-4 text-sm font-semibold xl:hidden">
              Join our community
            </CommunityJoinButton>
            <MobileNav
              activePath={activePath}
              currentRoute={currentRoute}
              contact={contact}
            />
          </div>
        </div>

        {showReadingProgress ? <ReadingProgress /> : null}
      </div>
    </header>
  );
}
