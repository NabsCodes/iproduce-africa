"use client";

import { useEffect, useState } from "react";

import { academyContent } from "@/content/academy";
import { cn } from "@/lib/utils";

export function AcademyTabsSection() {
  const tabs = academyContent.tabs;
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
    <div className="border-default sticky top-[72px] z-30 border-y bg-white/95 backdrop-blur md:top-[114px] lg:top-[118px]">
      <div className="max-w-8xl mx-auto w-full overflow-x-auto px-4 sm:px-6 lg:px-8 xl:px-10">
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
                  "inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-leaf-200 text-foreground"
                    : "text-fg-muted hover:bg-muted hover:text-foreground",
                )}
              >
                {tab.label}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
