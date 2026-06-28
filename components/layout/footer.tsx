import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { SiteLogo } from "@/components/layout/site-logo";
import { SocialIcon } from "@/components/layout/social-icon";
import { siteConfig } from "@/content/site";
import { isInternalRoute } from "@/lib/routes";

function FooterLink({
  label,
  href,
  className,
  placeholderClassName,
}: {
  label: string;
  href?: string;
  className: string;
  placeholderClassName: string;
}) {
  if (!href) {
    return (
      <span title="Coming soon" className={placeholderClassName}>
        {label}
      </span>
    );
  }

  if (isInternalRoute(href)) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-white">
      <div className="max-w-8xl mx-auto w-full px-6 pt-14 pb-10 sm:px-8 md:px-12 md:pt-20 md:pb-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1.2fr_1.6fr] lg:gap-x-6 lg:gap-y-0 xl:gap-x-10">
          <div className="col-span-2 lg:col-auto">
            <SiteLogo
              className="inline-flex"
              imageClassName="w-[140px] sm:w-[148px] md:w-[156px]"
            />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
              {siteConfig.footer.description}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {siteConfig.socialLinks.map((social) =>
                social.href ? (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="bg-leaf-900/70 text-leaf-300 hover:bg-leaf-700 focus-visible:ring-leaf-300 inline-flex size-10 items-center justify-center rounded-xl transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none"
                    >
                      <SocialIcon
                        platform={social.platform}
                        className="size-[18px]"
                      />
                    </a>
                  </li>
                ) : (
                  <li key={social.label}>
                    <span
                      role="img"
                      aria-label={social.label}
                      title="Coming soon"
                      className="bg-leaf-900/50 text-leaf-300/70 inline-flex size-10 items-center justify-center rounded-xl"
                    >
                      <SocialIcon
                        platform={social.platform}
                        className="size-[18px]"
                      />
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>

          {siteConfig.footer.linkGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-leaf-300 text-xs font-semibold tracking-[0.14em] uppercase">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <FooterLink
                      label={link.label}
                      href={link.href}
                      className="text-[15px] text-white/70 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                      placeholderClassName="cursor-default text-[15px] text-white/45"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 min-w-0 lg:col-auto">
            <h2 className="text-leaf-300 text-xs font-semibold tracking-[0.14em] uppercase">
              Contact
            </h2>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label={`Email ${siteConfig.email}`}
                  className="flex items-start gap-2.5 text-[15px] text-white/75 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                >
                  <Mail
                    className="text-leaf-300 mt-0.5 size-[18px] shrink-0"
                    aria-hidden
                  />
                  <span className="min-w-0 break-all">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  aria-label={`Call ${siteConfig.phone}`}
                  className="flex items-start gap-2.5 text-[15px] text-white/75 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                >
                  <Phone
                    className="text-leaf-300 mt-0.5 size-[18px] shrink-0"
                    aria-hidden
                  />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[15px] leading-normal text-white/75">
                <MapPin
                  className="text-leaf-300 mt-0.5 size-[18px] shrink-0"
                  aria-hidden
                />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>

          <div className="col-span-2 min-w-0 lg:col-auto">
            <h2 className="text-leaf-300 text-xs font-semibold tracking-[0.14em] uppercase">
              {siteConfig.footer.newsletter.title}
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">
              {siteConfig.footer.newsletter.description}
            </p>

            <NewsletterForm />
            <p className="mt-3 text-xs text-white/40">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 md:mt-16 md:pt-8">
          <div className="flex flex-col gap-3 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>

            <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {siteConfig.footer.legalLinks.map((link, index) => (
                <li
                  key={link.label}
                  className="flex items-center gap-x-3 gap-y-1.5"
                >
                  <FooterLink
                    label={link.label}
                    href={link.href}
                    className="text-sm text-white/55 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
                    placeholderClassName="cursor-default text-sm text-white/40"
                  />
                  {index < siteConfig.footer.legalLinks.length - 1 ? (
                    <span aria-hidden className="text-white/25">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
