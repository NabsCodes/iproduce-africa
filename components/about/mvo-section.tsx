import { MotionFade } from "@/components/shared/motion/motion-fade";
import { DecorativeRing } from "@/components/ui/decorative-ring";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { aboutPageContent } from "@/content/about";
import { cn } from "@/lib/utils";

type MvoCardProps = {
  eyebrow: string;
  body: string;
  bodyClassName?: string;
  className?: string;
  children?: React.ReactNode;
};

function MvoCard({
  eyebrow,
  body,
  bodyClassName,
  className,
  children,
}: MvoCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-6 sm:p-8 lg:p-10",
        className,
      )}
    >
      <EyebrowBadge tone="neutral">{eyebrow}</EyebrowBadge>
      <p
        className={cn(
          "text-foreground mt-4 font-serif text-xl leading-[30px] font-semibold tracking-[-0.005em] sm:text-2xl sm:leading-[34px]",
          bodyClassName,
        )}
      >
        {body}
      </p>
      {children}
    </div>
  );
}

export function MvoSection() {
  const { mission, vision, objective } =
    aboutPageContent.missionVisionObjective;

  return (
    <section className="bg-white pb-14 sm:pb-16 lg:pb-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-4 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-6">
          <MotionFade className="lg:col-start-1 lg:row-start-1">
            <MvoCard
              eyebrow={mission.eyebrow}
              body={mission.body}
              className="bg-leaf-subtle h-full"
            />
          </MotionFade>
          <MotionFade
            className="lg:col-start-2 lg:row-span-2 lg:row-start-1"
            delay={0.14}
          >
            <MvoCard
              eyebrow={vision.eyebrow}
              body={vision.body}
              bodyClassName="lg:max-w-[36ch]"
              className="bg-tangerine-subtle h-full min-h-[260px]"
            >
              <DecorativeRing
                strokeWidth={6}
                className="text-tangerine-400 -right-16 -bottom-16 hidden size-[260px] opacity-40 lg:block"
              />
            </MvoCard>
          </MotionFade>
          <MotionFade className="lg:col-start-1 lg:row-start-2" delay={0.28}>
            <MvoCard
              eyebrow={objective.eyebrow}
              body={objective.body}
              className="bg-muted h-full"
            />
          </MotionFade>
        </div>
      </div>
    </section>
  );
}
