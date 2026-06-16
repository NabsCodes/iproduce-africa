import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/utils";

export function TwoJourneysSection() {
  return (
    <section className="bg-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-10 sm:gap-14 lg:flex-row lg:items-start lg:gap-16">
          <div className="max-w-xs shrink-0">
            <EyebrowBadge>Your pathway</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
              Two Journeys. One Ecosystem.
            </h2>
          </div>

          <div className="grid flex-1 gap-5 sm:gap-8 lg:grid-cols-2">
            {homeContent.journeys.map((journey) => {
              const isDark = journey.tone === "dark";

              return (
                <article
                  key={journey.title}
                  className={cn(
                    "flex flex-col gap-8 rounded-2xl p-6 sm:gap-10 sm:p-7",
                    isDark ? "bg-forest-600 text-white" : "bg-leaf-subtle",
                  )}
                >
                  <div>
                    <p
                      className={cn(
                        "text-xs font-semibold tracking-[0.18em] uppercase",
                        isDark ? "text-leaf-emphasized" : "text-leaf-600",
                      )}
                    >
                      {journey.audience}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.005em] sm:text-3xl sm:leading-10">
                      {journey.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-5",
                        isDark ? "text-[#f7f9f5]" : "text-fg-muted",
                      )}
                    >
                      {journey.description}
                    </p>
                    <ul className="mt-5 space-y-3.5 sm:mt-6 sm:space-y-4">
                      {journey.items.map((item) => (
                        <li
                          key={item}
                          className={cn(
                            "flex items-center gap-3 text-sm",
                            isDark ? "text-white" : "text-fg-muted",
                          )}
                        >
                          <CheckCircle2
                            className={cn(
                              "size-5 shrink-0",
                              isDark ? "text-leaf-emphasized" : "text-leaf-600",
                            )}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ButtonLink
                    href={journey.href}
                    variant={isDark ? "green-soft" : "neutral"}
                    size="lg"
                    fullWidth
                    className={cn(
                      !isDark && "bg-forest-600 hover:bg-forest-700",
                    )}
                  >
                    {journey.cta}
                    <ArrowUpRight className="size-5" />
                  </ButtonLink>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
