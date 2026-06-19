import { ArrowUpRight } from "lucide-react";

import { MembershipOrbit } from "@/components/community/membership-orbit";
import { SiteCtaButton } from "@/components/shared/site-cta-button";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { EyebrowPill } from "@/components/ui/eyebrow-pill";
import { communityPageContent } from "@/content/community";

export function CommunityHeroSection() {
  const { hero } = communityPageContent;

  return (
    <section className="bg-subtle overflow-x-clip py-16 pb-0 lg:pb-16">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex max-w-3xl min-w-0 flex-col gap-6">
            <div className="flex flex-col gap-4">
              <EyebrowPill tone={hero.eyebrowTone ?? "tangerine"} size="sm">
                {hero.eyebrow}
              </EyebrowPill>

              <h1 className="text-foreground font-serif text-3xl leading-[1.1] font-semibold tracking-[-0.01em] sm:text-5xl sm:leading-[1.05]">
                <span className="inline">{hero.title.lead}</span>
                <span className="text-leaf-600 inline">
                  {hero.title.accent}
                </span>
              </h1>
            </div>

            <p className="text-fg-muted text-base leading-7">
              {hero.description}
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-4">
                <SiteCtaButton
                  href={hero.primaryCta.href}
                  action={hero.primaryCta.action}
                  size="lg"
                >
                  {hero.primaryCta.label}
                  <ArrowUpRight className="size-5" />
                </SiteCtaButton>
                <SiteCtaButton
                  href={hero.secondaryCta.href}
                  variant="green-soft"
                  size="lg"
                >
                  {hero.secondaryCta.label}
                </SiteCtaButton>
              </div>

              <div className="flex items-center gap-3">
                <AvatarGroup className="*:data-[slot=avatar]:ring-background *:data-[slot=avatar]:size-8 *:data-[slot=avatar]:ring-2">
                  {hero.members.map((member) => (
                    <Avatar key={member.initials}>
                      {member.image ? (
                        <AvatarImage src={member.image} alt={member.name} />
                      ) : null}
                      <AvatarFallback className="bg-leaf-muted text-forest-600 text-[10px] font-semibold">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
                <p className="text-fg-subtle text-sm leading-5 font-semibold">
                  {hero.membersLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full min-w-0 justify-center lg:justify-end">
            <MembershipOrbit orbit={hero.orbit} />
          </div>
        </div>
      </div>
    </section>
  );
}
