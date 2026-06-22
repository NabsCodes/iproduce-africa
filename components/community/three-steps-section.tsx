import { ArrowDown, ArrowRight } from "lucide-react";

import { MotionFade } from "@/components/shared/motion/motion-fade";
import {
  darkPanelDashedRingClass,
  DashedDecorativeRing,
} from "@/components/ui/decorative-ring";
import { communityPageContent } from "@/content/community";
import { cn } from "@/lib/utils";

export function ThreeStepsSection() {
  const { threeSteps: section } = communityPageContent;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="bg-forest-900 relative overflow-clip rounded-xl px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <DashedDecorativeRing className={darkPanelDashedRingClass} />

          <div className="relative flex flex-col gap-10 lg:gap-12">
            <MotionFade>
              <h2 className="max-w-md font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] text-white sm:text-3xl lg:max-w-lg lg:text-4xl">
                {section.title}
              </h2>
            </MotionFade>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
              {section.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex min-h-0 flex-col lg:flex-1 lg:flex-row lg:items-stretch"
                >
                  <MotionFade
                    delay={index * 0.08}
                    className="border-forest-700 bg-forest-800/60 flex h-full min-h-[168px] flex-1 flex-col gap-3 rounded-xl border p-5 sm:min-h-[180px] sm:p-6"
                  >
                    <span className="text-tangerine-400 text-xs font-semibold tracking-[0.14em] uppercase">
                      {step.label}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-white sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="text-leaf-200/80 mt-auto text-sm leading-6 sm:text-base">
                      {step.description}
                    </p>
                  </MotionFade>

                  {index < section.steps.length - 1 ? (
                    <>
                      <div
                        className="text-tangerine-400 flex items-center justify-center py-2 lg:hidden"
                        aria-hidden
                      >
                        <ArrowDown className="size-5" />
                      </div>
                      <div
                        className={cn(
                          "text-tangerine-400 hidden shrink-0 items-center justify-center self-center px-3 lg:flex",
                        )}
                        aria-hidden
                      >
                        <ArrowRight className="size-5" />
                      </div>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
