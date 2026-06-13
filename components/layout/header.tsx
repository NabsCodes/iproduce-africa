"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/icons/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeaderProps = {
  activePath?: string;
};

export function Header({ activePath = "/" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="border-b border-forest-900/10 bg-forest-900 text-white">
        <Container className="flex h-9 items-center justify-between text-xs">
          <p className="hidden sm:block">Mon – Fri, 8:00 – 17:00 WAT</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-acid-200">
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden hover:text-acid-200 md:inline"
            >
              {siteConfig.phone}
            </a>
          </div>
        </Container>
      </div>

      <div className="relative overflow-visible border-b border-grey-200">
        <Container className="flex h-20 items-center justify-between gap-6">
          <Logo />

          <NavigationMenu
            viewport={false}
            className="hidden max-w-none flex-1 justify-center lg:flex"
          >
            <NavigationMenuList className="gap-1">
              {navLinks.map((link) =>
                "children" in link && link.children ? (
                  <NavigationMenuItem key={link.href} className="relative">
                    <NavigationMenuTrigger
                      className={cn(
                        "relative h-auto bg-transparent px-4 py-2 font-sans text-sm font-medium text-grey-800 hover:bg-transparent hover:text-grey-950 data-[state=open]:text-tangerine-500",
                        activePath.startsWith(link.href) &&
                          "text-tangerine-500 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:rounded-full after:bg-tangerine-500",
                      )}
                    >
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="top-full left-1/2 z-50 mt-3 w-[min(360px,calc(100vw-2.5rem))] -translate-x-1/2 rounded-2xl border border-[var(--border-subtle)] bg-white p-3 md:absolute">
                      <div className="border-b border-[var(--border-subtle)] px-3 pb-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tangerine-600">
                          Academy
                        </p>
                        <p className="mt-1 text-sm text-[var(--text-fg-muted)]">
                          Learning, events and insights for agripreneurs
                        </p>
                      </div>
                      <ul className="space-y-1 pt-2">
                        {link.children.map((child, index) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className={cn(
                                  "flex gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[var(--bg-subtle)]",
                                  activePath === child.href && "bg-[var(--leaf-subtle)]",
                                )}
                              >
                                <span className="w-6 shrink-0 font-serif text-sm font-semibold text-tangerine-400">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span>
                                  <span className="block text-sm font-medium text-foreground">
                                    {child.label}
                                  </span>
                                  <span className="mt-0.5 block text-xs text-[var(--text-fg-muted)]">
                                    {child.description}
                                  </span>
                                </span>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 border-t border-[var(--border-subtle)] px-3 pt-3">
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="text-sm font-semibold text-acid-600 hover:text-acid-700"
                          >
                            View all Academy →
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          "relative inline-flex px-4 py-2 font-sans text-sm font-medium text-grey-800 transition-colors hover:text-grey-950",
                          activePath === link.href &&
                            "font-semibold text-forest-600 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:rounded-full after:bg-tangerine-500",
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3">
            <ButtonLink
              href="/partners"
              variant="green-link"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Partner with us
            </ButtonLink>
            <ButtonLink
              href="/community"
              variant="green"
              size="sm"
              className="hidden rounded-2xl sm:inline-flex"
            >
              <UserPlus className="size-4" />
              Join our community
            </ButtonLink>
            <MobileNav activePath={activePath} />
          </div>
        </Container>
      </div>
    </header>
  );
}
