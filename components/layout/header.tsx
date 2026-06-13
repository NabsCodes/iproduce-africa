"use client";

import Link from "next/link";
import { ChevronDown, UserPlus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/icons/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeaderProps = {
  activePath?: string;
};

const navLinkClass =
  "relative inline-flex px-4 py-2 font-sans text-sm font-medium text-foreground transition-colors hover:text-grey-950";

function NavUnderline({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <span
      aria-hidden
      className="absolute bottom-0 left-1/2 h-[3px] w-[18px] -translate-x-1/2 rounded-sm bg-tangerine-500"
    />
  );
}

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

      <div className="border-b border-grey-200">
        <Container className="flex h-20 items-center justify-between gap-6">
          <Logo />

          <nav
            className="hidden flex-1 items-center justify-center gap-1 lg:flex"
            aria-label="Main"
          >
            {navLinks.map((link) => {
              if ("children" in link && link.children) {
                const isActive = activePath.startsWith(link.href);

                return (
                  <DropdownMenu key={link.href}>
                    <DropdownMenuTrigger
                      className={cn(
                        navLinkClass,
                        "group relative items-center gap-1 outline-none data-[state=open]:text-foreground",
                      )}
                    >
                      {link.label}
                      <ChevronDown className="size-3.5 opacity-70" aria-hidden />
                      <span
                        aria-hidden
                        className={cn(
                          "absolute bottom-0 left-1/2 h-[3px] w-[18px] -translate-x-1/2 rounded-sm bg-tangerine-500 transition-opacity",
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-data-[state=open]:opacity-100",
                        )}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      sideOffset={12}
                      className="min-w-[220px] rounded-xl border border-[var(--border-subtle)] bg-white p-2 shadow-md ring-0"
                    >
                      {link.children.map((child) => (
                        <DropdownMenuItem
                          key={child.href}
                          asChild
                          className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-[var(--leaf-subtle)] focus:bg-[var(--leaf-subtle)]"
                        >
                          <Link href={child.href}>{child.label}</Link>
                        </DropdownMenuItem>
                      ))}
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
                    isActive && "font-semibold text-forest-600",
                  )}
                >
                  {link.label}
                  <NavUnderline active={isActive} />
                </Link>
              );
            })}
          </nav>

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
