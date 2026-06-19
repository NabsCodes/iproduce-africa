import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactSocialIcon } from "@/components/contact/contact-social-icon";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import { contactPageContent } from "@/content/contact";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";
import type { ContactSocialLink } from "@/types/contact";

function formatTel(phone: string) {
  return phone.replace(/\s/g, "");
}

function SocialButton({ social }: { social: ContactSocialLink }) {
  if (!social.href) {
    return (
      <span
        aria-disabled="true"
        title="Coming soon"
        className={cn(
          "bg-forest-900/70 border-forest-700 inline-flex size-11 items-center justify-center rounded-lg border transition-colors sm:size-12",
          "cursor-default opacity-75",
        )}
      >
        <ContactSocialIcon
          platform={social.platform}
          className="text-leaf-300"
        />
        <span className="sr-only">{social.label}</span>
      </span>
    );
  }

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer"
      aria-label={social.label}
      className={cn(
        "bg-forest-900/70 border-forest-700 inline-flex size-11 items-center justify-center rounded-lg border transition-colors sm:size-12",
        "hover:border-leaf-400/30 hover:bg-forest-800 focus-visible:ring-leaf-300 focus-visible:ring-2 focus-visible:outline-none",
      )}
    >
      <ContactSocialIcon platform={social.platform} className="text-leaf-300" />
    </a>
  );
}

function HeroCopy({ className }: { className?: string }) {
  const { hero } = contactPageContent;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <EyebrowPill tone="leaf" size="sm" className="max-w-fit">
        {hero.eyebrow}
      </EyebrowPill>

      <div className="flex flex-col gap-4">
        <h1 className="font-serif text-4xl leading-tight font-semibold tracking-[-0.01em] text-white sm:text-5xl lg:text-[56px] lg:leading-[1.05]">
          {hero.title}
        </h1>
        <p className="max-w-md text-base leading-7 text-white/70">
          {hero.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {hero.socialLinks.map((social) => (
          <SocialButton key={social.platform} social={social} />
        ))}
      </div>
    </div>
  );
}

export function ContactIntroSection() {
  const { hero, reachOut, form } = contactPageContent;

  return (
    <section
      id="contact-form"
      className="bg-subtle scroll-mt-28 pb-14 sm:pb-16 lg:pb-20"
    >
      {/* Mobile: stacked hero */}
      <div className="bg-forest-950 px-4 py-10 sm:px-6 sm:py-12 lg:hidden">
        <HeroCopy />
        <div className="relative mt-8 aspect-4/3 overflow-hidden rounded-xl">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            sizes="(max-width: 640px) calc(100vw - 2rem), calc(100vw - 3rem)"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Desktop: full-bleed split hero */}
      <div className="relative hidden overflow-x-clip lg:block lg:min-h-[580px]">
        <div
          aria-hidden
          className="bg-forest-950 absolute inset-y-0 left-0 w-1/2"
        />
        <div className="absolute inset-y-0 right-0 w-1/2">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            sizes="50vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="from-forest-950 via-forest-950/50 pointer-events-none absolute inset-0 bg-linear-to-r to-transparent"
          />
        </div>

        <div className="max-w-8xl relative mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid min-h-[580px] grid-cols-2">
            <div className="flex flex-col justify-center py-16">
              <HeroCopy />
            </div>
            <div aria-hidden />
          </div>
        </div>
      </div>

      {/* Reach out + overlapping form */}
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-14">
          <div className="pt-10 sm:pt-12 lg:col-start-1 lg:row-start-1 lg:pt-14">
            <h2 className="text-foreground font-serif text-3xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              {reachOut.title}
            </h2>
            <p className="text-fg-muted mt-4 max-w-lg text-base leading-7">
              {reachOut.availabilityIntro}{" "}
              <strong className="text-foreground font-semibold">
                {siteConfig.hours}
              </strong>
              .
            </p>

            <ul className="mt-8 flex flex-col gap-6 sm:mt-10">
              <li className="flex items-start gap-4">
                <span className="bg-leaf-700 flex size-10 shrink-0 items-center justify-center rounded-full text-white">
                  <Phone className="size-[18px]" aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-foreground text-sm font-semibold">
                    Phone
                  </span>
                  <div className="text-fg-muted flex flex-col gap-0.5 text-sm leading-6 sm:text-base">
                    <a
                      href={`tel:${formatTel(reachOut.secondaryPhone)}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {reachOut.secondaryPhone}
                    </a>
                    <a
                      href={`tel:${formatTel(siteConfig.phone)}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="bg-leaf-700 flex size-10 shrink-0 items-center justify-center rounded-full text-white">
                  <Mail className="size-[18px]" aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-foreground text-sm font-semibold">
                    Email
                  </span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-fg-muted hover:text-foreground text-sm leading-6 transition-colors sm:text-base"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="bg-leaf-700 flex size-10 shrink-0 items-center justify-center rounded-full text-white">
                  <MapPin className="size-[18px]" aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-foreground text-sm font-semibold">
                    Location
                  </span>
                  <p className="text-fg-muted text-sm leading-6 sm:text-base">
                    {siteConfig.address}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="relative z-10 mt-8 lg:col-start-2 lg:row-start-1 lg:-mt-36">
            <ContactForm content={form} />
          </div>
        </div>
      </div>
    </section>
  );
}
