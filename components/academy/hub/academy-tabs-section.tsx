"use client";

import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "motion/react";

import { academyContent } from "@/content/academy";
import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import { cn } from "@/lib/utils";

export function AcademyTabsSection() {
  const tabs = academyContent.tabs;
  const reduce = useReducedMotionSafe();
  const [activeId, setActiveId] = useState<string>(
    tabs[0]?.targetId ?? "overview",
  );

  useEffect(() => {
    const handleScroll = () => {
      const line = window.innerHeight * 0.35;
      let candidate: string = tabs[0]?.targetId ?? "overview";

      for (const tab of tabs) {
        const el = document.getElementById(tab.targetId);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top <= line) candidate = tab.targetId;
      }

      setActiveId((prev) => (prev === candidate ? prev : candidate));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [tabs]);

  return (
    <div className="border-default sticky top-[72px] z-30 border-y bg-white/95 backdrop-blur lg:top-[76px]">
      <div className="max-w-8xl mx-auto w-full overflow-x-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <LayoutGroup>
          <nav
            aria-label="Academy sections"
            className="flex min-w-max items-center justify-center gap-2 py-3 sm:gap-4"
          >
            {tabs.map((tab) => {
              const isActive = activeId === tab.targetId;
              return (
                <a
                  key={tab.targetId}
                  href={`#${tab.targetId}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors",
                    isActive && reduce && "bg-leaf-200 text-foreground",
                    !isActive &&
                      "text-fg-muted hover:bg-muted hover:text-foreground",
                    isActive && !reduce && "text-foreground",
                  )}
                >
                  {isActive && !reduce ? (
                    <motion.span
                      layoutId="academy-active-tab"
                      className="bg-leaf-200 absolute inset-0 rounded-full"
                      transition={{
                        duration: 0.25,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  ) : null}
                  <span className="relative z-10">{tab.label}</span>
                </a>
              );
            })}
          </nav>
        </LayoutGroup>
      </div>
    </div>
  );
}
