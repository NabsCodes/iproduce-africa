import { CommunityHeroSection } from "@/components/community/hero-section";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { communityPageContent } from "@/content/community";
import { siteConfig } from "@/content/site";
import { pageSeo } from "@/content/seo";
import { createPageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata(pageSeo.community);

export default function CommunityPage() {
  const joinSection = communityPageContent.join;
  const joinMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    joinSection.primaryEmailSubject,
  )}`;

  return (
    <>
      <CommunityHeroSection />

      <section
        id={joinSection.id}
        className="scroll-mt-32 bg-white py-16 sm:py-20 md:scroll-mt-36"
      >
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="border-border bg-subtle rounded-[32px] border">
            <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-12 lg:px-12 lg:py-12">
              <div className="max-w-2xl">
                <EyebrowBadge>{joinSection.eyebrow}</EyebrowBadge>
                <h2 className="text-foreground mt-4 font-serif text-3xl leading-tight font-semibold sm:text-4xl">
                  {joinSection.title}
                </h2>
                <p className="text-fg-muted mt-5 text-base leading-7 sm:text-lg">
                  {joinSection.description}
                </p>
              </div>

              <div className="border-border bg-background rounded-[28px] border p-6 sm:p-7">
                <ul className="space-y-4">
                  {joinSection.highlights.map((item) => (
                    <li
                      key={item}
                      className="text-grey-700 flex gap-3 text-sm leading-6 sm:text-[15px]"
                    >
                      <span
                        className="bg-leaf-500 mt-2 size-2 shrink-0 rounded-full"
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={joinMailto}
                    className={cn(
                      buttonVariants({ variant: "green", size: "lg" }),
                      "w-full sm:w-auto",
                    )}
                  >
                    {joinSection.primaryCtaLabel}
                  </a>
                  <ButtonLink
                    href="/contact"
                    variant="green-outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {joinSection.secondaryCtaLabel}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
