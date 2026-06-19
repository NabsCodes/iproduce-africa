import { TrendingUp } from "lucide-react";

import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { communityPageContent } from "@/content/community";

export function MemberStoriesSection() {
  const section = communityPageContent.memberStories;

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-[640px]">
          <EyebrowBadge>{section.eyebrow}</EyebrowBadge>
          <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
            {section.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {section.items.map((story) => (
            <article
              key={story.name}
              className="group border-default hover:border-leaf-300 flex flex-col rounded-xl border bg-white transition-colors duration-300"
            >
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center gap-1.5">
                  <TrendingUp
                    className="text-leaf-600 size-4 shrink-0"
                    aria-hidden
                  />
                  <span className="text-leaf-600 text-[11px] font-semibold tracking-[0.12em] uppercase">
                    The result
                  </span>
                </div>
                <p className="text-foreground border-leaf-500 mt-3 border-l-[3px] pl-3 font-serif text-base leading-6 font-semibold">
                  {story.result}
                </p>

                <hr className="border-border my-5" />

                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-tangerine-600 text-[11px] font-semibold tracking-[0.12em] uppercase">
                      The challenge
                    </p>
                    <p className="text-fg-muted mt-1.5 text-sm leading-6">
                      {story.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="text-tangerine-600 text-[11px] font-semibold tracking-[0.12em] uppercase">
                      With iProduce
                    </p>
                    <p className="text-fg-muted mt-1.5 text-sm leading-6">
                      {story.withIProduce}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-leaf-50 flex items-center gap-3 rounded-b-xl px-5 py-4 sm:px-6">
                <span className="bg-leaf-100 text-leaf-700 flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                  {story.initials}
                </span>
                <div className="min-w-0">
                  <p className="text-foreground text-sm font-semibold">
                    {story.name}
                    {"age" in story && story.age ? `, ${story.age}` : ""}
                  </p>
                  <p className="text-fg-muted text-xs leading-5">
                    {story.role} · {story.country}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
