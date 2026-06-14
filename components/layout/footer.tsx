import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SiteLogo } from "@/components/layout/site-logo";
import { SocialIcon } from "@/components/layout/social-icon";
import { siteConfig } from "@/content/site";
import { isInternalRoute } from "@/lib/routes";

const footerLinks = {
  Explore: [
    { label: "About us", href: "/about" },
    { label: "Academy", href: "/academy" },
    { label: "Community", href: "/community" },
    { label: "Partners", href: "/partners" },
  ],
  Academy: [
    { label: "Webinars", href: "/academy#webinars" },
    { label: "Training", href: "/academy#training" },
    { label: "Courses", href: "/academy#courses" },
    { label: "Insights", href: "/academy#insights" },
  ],
  Contact: [
    { label: "Get in touch", href: "/contact" },
    { label: "Email us", href: `mailto:${siteConfig.email}` },
    { label: "FAQs", href: "/#faq" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-green-950 text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(3,1fr)_1.4fr]">
          <div>
            <SiteLogo panel imageClassName="w-[176px]" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              {siteConfig.socialLinks.map((social) => {
                if (social.href) {
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-stone-300 transition-colors hover:border-white/30 hover:text-white"
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
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-stone-300"
                  >
                    <SocialIcon platform={social.platform} className="size-4" />
                  </span>
                );
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold tracking-wider text-stone-300 uppercase">
                {title}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    {isInternalRoute(link.href) ? (
                      <Link
                        href={link.href}
                        className="text-sm text-stone-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-stone-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold tracking-wider text-stone-300 uppercase">
              Newsletter
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Get agribusiness insights and community updates in your inbox.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
                className="h-11 min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-stone-500 focus:border-green-400"
              />
              <Button
                type="submit"
                variant="tangerine"
                size="md"
                className="shrink-0 px-4"
              >
                →
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-stone-300">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-stone-300">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
