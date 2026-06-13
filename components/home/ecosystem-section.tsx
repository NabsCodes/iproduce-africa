import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";

const growItems = [
  "Advisory & 1-on-1 coaching",
  "Resource centre & learning hub",
  "Community peer network",
  "Grant & funding alerts",
  "Structured training programmes",
  "Business deal room access",
];

const partnerItems = [
  "Co-develop programmes & initiatives",
  "Funding & grant facilitation",
  "Market expansion opportunities",
  "Agribusiness talent pipeline",
  "Strategic ecosystem partnerships",
  "Impact measurement & reporting",
];

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
            <article className="flex flex-col gap-10 rounded-2xl bg-[var(--leaf-subtle)] p-7">
              <div>
                <p className="text-acid-600 text-xs font-semibold tracking-[0.18em] uppercase">
                  For agripreneurs & individuals
                </p>
                <h3 className="mt-3 font-serif text-[32px] leading-10 font-semibold tracking-[-0.005em] text-[#111]">
                  Grow Your Agribusiness
                </h3>
                <p className="mt-3 text-sm leading-5 text-[var(--text-fg-muted)]">
                  Access the training, mentorship, resources, and community you
                  need to build a thriving agribusiness in Africa and beyond.
                </p>
                <ul className="mt-6 space-y-4">
                  {growItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-[var(--text-fg-muted)]"
                    >
                      <CheckCircle2 className="text-acid-600 size-5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <ButtonLink
                href="/community"
                variant="neutral"
                size="lg"
                fullWidth
                className="bg-forest-600 hover:bg-forest-700"
              >
                Apply for Membership
                <ArrowUpRight className="size-5" />
              </ButtonLink>
            </article>

            <article className="bg-forest-600 flex flex-col gap-10 rounded-2xl p-7 text-white">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-[var(--leaf-emphasized)] uppercase">
                  For organisations & partners
                </p>
                <h3 className="mt-3 font-serif text-[32px] leading-10 font-semibold tracking-[-0.005em]">
                  Drive Agricultural Impact at Scale
                </h3>
                <p className="mt-3 text-sm leading-5 text-[#f7f9f5]">
                  Partner with us to co-create programmes, deploy funding, and
                  expand your footprint across Africa&apos;s agribusiness
                  landscape.
                </p>
                <ul className="mt-6 space-y-4">
                  {partnerItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-white"
                    >
                      <CheckCircle2 className="size-5 shrink-0 text-[var(--leaf-emphasized)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <ButtonLink
                href="/partners"
                variant="green-soft"
                size="lg"
                fullWidth
              >
                Become a Partner
                <ArrowUpRight className="size-5" />
              </ButtonLink>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
