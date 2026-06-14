"use client";

import Link from "next/link";
import { ChevronDown, Clock3, Mail, Phone, UsersRound } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteLogo } from "@/components/layout/site-logo";
import { SocialIcon } from "@/components/layout/social-icon";
import { mainNavigation } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { useRouteHash } from "@/hooks/use-route-hash";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

const navLinkClass =
  "relative inline-flex shrink-0 items-center whitespace-nowrap rounded-lg px-2 py-0.5 font-sans text-[15px] font-medium tracking-[-0.01em] text-grey-800 transition-colors hover:text-forest-700 focus-visible:bg-leaf-50 focus-visible:text-forest-700 focus-visible:outline-none";

function NavIndicator({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <span
      aria-hidden
      className="bg-tangerine-500 pointer-events-none absolute -bottom-0.5 left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full"
    />
  );
}

export function Header() {
  const currentRoute = useRouteHash();
  const activePath = currentRoute.split("#")[0] || "/";
  const scrolled = useScrolled();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-forest-900 hidden text-white md:block">
        <Container className="flex h-[42px] items-center justify-between gap-4 text-[13px] lg:gap-8 lg:text-[14px]">
          <p className="flex min-w-0 items-center gap-2 font-medium tracking-[-0.01em] text-white/95 lg:gap-2.5">
            <Clock3 className="size-4 shrink-0" aria-hidden />
            <span className="truncate lg:whitespace-normal">
              {siteConfig.hours}
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-2.5 lg:gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label={`Email ${siteConfig.email}`}
              className="hover:text-leaf-100 inline-flex items-center gap-2 text-white/95 transition-colors focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
            >
              <Mail className="size-4 shrink-0" aria-hidden />
              <span className="hidden lg:inline">{siteConfig.email}</span>
            </a>
            <span
              className="hidden h-4 w-px bg-white/25 lg:block"
              aria-hidden
            />
            <a
              href={`tel:${siteConfig.phone}`}
              aria-label={`Call ${siteConfig.phone}`}
              className="hover:text-leaf-100 inline-flex items-center gap-2 text-white/95 transition-colors focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
            >
              <Phone className="size-4 shrink-0" aria-hidden />
              <span className="hidden lg:inline">{siteConfig.phone}</span>
            </a>
            <span
              className="hidden h-4 w-px bg-white/25 lg:block"
              aria-hidden
            />
            <div className="flex items-center gap-2.5">
              {siteConfig.socialLinks.map((social) => {
                if (social.href) {
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="inline-flex size-7 items-center justify-center rounded-md border border-white/20 text-white/95 transition-colors hover:border-white/35 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none lg:size-6"
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  );
                }

                return (
                  <span
                    key={social.label}
                    role="img"
                    aria-label={social.label}
                    className="inline-flex size-7 items-center justify-center rounded-full border border-white/20 text-white/60 lg:size-6"
                  >
                    <SocialIcon platform={social.platform} />
                  </span>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      <div
        className={cn(
          "border-grey-200 border-b bg-white transition-[border-color]",
          scrolled && "border-grey-300",
        )}
      >
        <Container
          className={cn(
            "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 transition-[height] sm:gap-3 md:grid-cols-[auto_1fr_auto] md:gap-6",
            scrolled ? "h-[72px] md:h-[76px]" : "h-[72px] md:h-20",
          )}
        >
          <SiteLogo
            priority
            className="max-w-[calc(100%-7.5rem)] shrink-0 justify-self-start sm:max-w-none"
          />

          <nav
            className="hidden w-full min-w-0 flex-nowrap items-center justify-evenly md:flex"
            aria-label="Main"
          >
            {mainNavigation.map((link) => {
              if ("children" in link && link.children) {
                const isActive = activePath.startsWith(link.href);

                return (
                  <DropdownMenu key={link.href}>
                    <DropdownMenuTrigger
                      className={cn(
                        navLinkClass,
                        "group/trigger data-[state=open]:bg-leaf-50 data-[state=open]:text-forest-700 gap-1",
                        isActive && "text-grey-950 font-semibold",
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        aria-hidden
                        className="size-3.5 opacity-70 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180"
                      />
                      <NavIndicator active={isActive} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      sideOffset={8}
                      className="border-grey-200 w-auto min-w-[240px] border bg-white p-2.5 shadow-[0_22px_54px_-28px_rgba(15,37,12,0.42)] ring-0"
                    >
                      {link.children.map((child) => {
                        const isChildActive = currentRoute === child.href;

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
            <Link
              href="/partners"
              className="text-leaf-600 hover:text-leaf-700 focus-visible:bg-leaf-50 focus-visible:text-leaf-700 hidden px-2 py-1 text-[15px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-none md:inline-flex"
            >
              Partner with us
            </Link>
            <ButtonLink
              href="/community"
              variant="green"
              className="hidden h-[52px] px-6 text-[15px] font-semibold md:inline-flex"
            >
              <UsersRound className="size-4" />
              Join our community
            </ButtonLink>
            <ButtonLink
              href="/community"
              variant="green"
              className="h-11 min-w-11 px-4 text-sm font-semibold md:hidden"
            >
              Join
            </ButtonLink>
            <MobileNav activePath={activePath} currentRoute={currentRoute} />
          </div>
        </Container>
      </div>
    </header>
  );
}
