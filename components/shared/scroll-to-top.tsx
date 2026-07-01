"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useReducedMotionSafe } from "@/hooks/use-reduced-motion-safe";
import { cn } from "@/lib/utils";

const BUTTON_SIZE = 48;
const STROKE_WIDTH = 2;
const RING_RADIUS = BUTTON_SIZE / 2 - STROKE_WIDTH;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const SHOW_AFTER_PX = 400;
const LONG_PAGE_HEIGHT_RATIO = 1.5;

const blogArticlePath = /^\/academy\/blog\/[^/]+$/;

export function ScrollToTop() {
  const pathname = usePathname();
  const reduce = useReducedMotionSafe();
  const showProgressRing = blogArticlePath.test(pathname);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const viewportHeight = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const scrollableDistance = pageHeight - viewportHeight;
      const isLongPage = pageHeight > viewportHeight * LONG_PAGE_HEIGHT_RATIO;
      const nextProgress =
        scrollableDistance > 0
          ? (window.scrollY / scrollableDistance) * 100
          : 0;

      setProgress(nextProgress);
      setIsVisible(isLongPage && window.scrollY > SHOW_AFTER_PX);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const ringOffset = RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * progress) / 100;

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.9,
            transition: { duration: reduce ? 0 : 0.15, ease: "easeIn" },
          }}
          whileHover={reduce ? undefined : { scale: 1.05, y: -2 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
          transition={{
            type: reduce ? "tween" : "spring",
            stiffness: 400,
            damping: 25,
          }}
          onClick={scrollToTop}
          className={cn(
            "group border-grey-200 text-leaf-600 hover:border-leaf-300 hover:bg-leaf-50 focus-visible:ring-leaf-600/30 fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full border bg-white/90 p-0 backdrop-blur-sm transition-colors focus-visible:ring-2 focus-visible:outline-none sm:right-6 sm:bottom-6",
          )}
          aria-label="Scroll to top"
        >
          {showProgressRing ? (
            <svg
              className="pointer-events-none absolute inset-0 size-full -rotate-90"
              aria-hidden
            >
              <circle
                cx="50%"
                cy="50%"
                r={RING_RADIUS}
                stroke="currentColor"
                strokeWidth={STROKE_WIDTH}
                fill="transparent"
                className="text-leaf-200"
              />
              <circle
                cx="50%"
                cy="50%"
                r={RING_RADIUS}
                stroke="currentColor"
                strokeWidth={STROKE_WIDTH}
                fill="transparent"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={ringOffset}
                strokeLinecap="round"
                className="text-leaf-600 transition-[stroke-dashoffset] duration-200"
              />
            </svg>
          ) : null}

          <ArrowUp
            className="relative z-10 size-5 transition-transform duration-200 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
