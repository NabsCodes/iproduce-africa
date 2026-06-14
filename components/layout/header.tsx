"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { cn } from "@/lib/utils";

const navLinkClass =
  "relative inline-flex shrink-0 items-center whitespace-nowrap px-3 py-1.5 font-sans text-[15px] font-medium tracking-[-0.01em] text-grey-800 transition-colors hover:text-forest-700";

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
  const pathname = usePathname();
  const activePath = pathname || "/";

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-forest-900 hidden text-white md:block">
        <Container className="flex h-[42px] items-center justify-between gap-8 text-[14px]">
          <p className="flex items-center gap-2.5 font-medium tracking-[-0.01em] text-white/95">
            <Clock3 className="size-4" aria-hidden />
            <span>{siteConfig.hours}</span>
          </p>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-leaf-100 flex items-center gap-2 text-white/95 transition-colors"
            >
              <Mail className="size-4" aria-hidden />
              <span>{siteConfig.email}</span>
            </a>
            <span className="h-4 w-px bg-white/25" aria-hidden />
            <a
              href={`tel:${siteConfig.phone}`}
              className="hover:text-leaf-100 flex items-center gap-2 text-white/95 transition-colors"
            >
              <Phone className="size-4" aria-hidden />
              <span>{siteConfig.phone}</span>
            </a>
            <span className="h-4 w-px bg-white/25" aria-hidden />
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
                      className="inline-flex size-6 items-center justify-center rounded-md border border-white/20 text-white/95 transition-colors hover:border-white/35 hover:text-white"
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
                    className="inline-flex size-6 items-center justify-center rounded-md border border-white/20 text-white/95"
                  >
                    <SocialIcon platform={social.platform} />
                  </span>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      <div className="border-grey-200 border-b bg-white">
        <Container className="grid h-20 grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[auto_1fr_auto] md:gap-6">
          <SiteLogo priority className="shrink-0 justify-self-start" />

          <nav
            className="hidden min-w-0 flex-nowrap items-center justify-center gap-0.5 md:flex"
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
                        "group/trigger data-[state=open]:text-forest-700 gap-1 outline-none",
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
                      {link.children.map((child) => (
                        <DropdownMenuItem
                          key={child.href}
                          asChild
                          className="text-grey-900 hover:bg-leaf-50 focus:bg-leaf-50 cursor-pointer px-4 py-3 text-sm font-medium"
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
                    isActive && "text-grey-950 font-semibold",
                  )}
                >
                  {link.label}
                  <NavIndicator active={isActive} />
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3 justify-self-end md:gap-5">
            <Link
              href="/partners"
              className="text-leaf-600 hover:text-leaf-700 hidden text-[15px] font-semibold whitespace-nowrap transition-colors md:inline-flex"
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
              className="h-11 px-5 text-sm font-semibold md:hidden"
            >
              Join
            </ButtonLink>
            <MobileNav activePath={activePath} />
          </div>
        </Container>
      </div>
    </header>
  );
}
