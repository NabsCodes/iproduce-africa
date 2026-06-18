import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { partnersPageContent } from "@/content/partners";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

export function PartnerSection() {
  const partner = partnersPageContent.partner;
  const partnerMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    partner.primaryEmailSubject,
  )}`;

  return (
    <section
      id={partner.id}
      className="scroll-mt-32 bg-white py-16 sm:py-20 md:scroll-mt-36"
    >
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="border-border bg-subtle rounded-xl border">
          <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-12 lg:px-12 lg:py-12">
            <div className="max-w-2xl">
              <EyebrowBadge>{partner.eyebrow}</EyebrowBadge>
              <h2 className="text-foreground mt-4 font-serif text-3xl leading-tight font-semibold sm:text-4xl">
                {partner.title}
              </h2>
              <p className="text-fg-muted mt-5 text-base leading-7 sm:text-lg">
                {partner.description}
              </p>
            </div>

            <div className="border-border bg-background rounded-xl border p-6 sm:p-7">
              <ul className="space-y-4">
                {partner.highlights.map((item) => (
                  <li
                    key={item}
                    className="text-grey-700 flex gap-3 text-sm leading-6 sm:text-[15px]"
                  >
                    <span
                      className="bg-tangerine-500 mt-2 size-2 shrink-0 rounded-full"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={partnerMailto}
                  className={cn(
                    buttonVariants({ variant: "green", size: "lg" }),
                    "w-full sm:w-auto",
                  )}
                >
                  {partner.primaryCtaLabel}
                </a>
                <ButtonLink
                  href="/contact"
                  variant="green-outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {partner.secondaryCtaLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
