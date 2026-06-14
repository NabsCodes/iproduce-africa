import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { homeContent } from "@/content/home";
import { cn } from "@/lib/utils";

export function EcosystemSection() {
  return (
    <section className="bg-[var(--bg-subtle)] py-20">
      <Container>
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
          <div className="max-w-sm shrink-0">
            <EyebrowBadge>Your pathway</EyebrowBadge>
            <h2 className="text-foreground mt-3 font-serif text-[40px] leading-[48px] font-semibold tracking-[-0.01em]">
              Two Journeys. One Ecosystem.
            </h2>
          </div>

          <div className="grid flex-1 gap-8 lg:grid-cols-2">
            {homeContent.journeys.map((journey) => {
              const isDark = journey.tone === "dark";

              return (
                <article
                  key={journey.title}
                  className={cn(
                    "flex flex-col gap-10 rounded-2xl p-7",
                    isDark
                      ? "bg-forest-600 text-white"
                      : "bg-[var(--leaf-subtle)]",
                  )}
                >
                  <div>
                    <p
                      className={cn(
                        "text-xs font-semibold tracking-[0.18em] uppercase",
                        isDark
                          ? "text-[var(--leaf-emphasized)]"
                          : "text-leaf-600",
                      )}
                    >
                      {journey.audience}
                    </p>
                    <h3 className="mt-3 font-serif text-[32px] leading-10 font-semibold tracking-[-0.005em]">
                      {journey.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-5",
                        isDark
                          ? "text-[#f7f9f5]"
                          : "text-[var(--text-fg-muted)]",
                      )}
                    >
                      {journey.description}
                    </p>
                    <ul className="mt-6 space-y-4">
                      {journey.items.map((item) => (
                        <li
                          key={item}
                          className={cn(
                            "flex items-center gap-3 text-sm",
                            isDark
                              ? "text-white"
                              : "text-[var(--text-fg-muted)]",
                          )}
                        >
                          <CheckCircle2
                            className={cn(
                              "size-5 shrink-0",
                              isDark
                                ? "text-[var(--leaf-emphasized)]"
                                : "text-leaf-600",
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
      </Container>
    </section>
  );
}
