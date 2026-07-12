"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;

  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Browsers skip navigation when a same-page hash link targets the current
 * hash. One document listener fixes every anchor site-wide. Also scrolls to
 * in-page targets after client-side route changes (e.g. /community#membership-application
 * lands on the inline form — it does not open the dialog).
 */
export function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const frame = requestAnimationFrame(() => scrollToHash(hash));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref?.includes("#")) return;

      let url: URL;
      try {
        url = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash !== window.location.hash) return;

      event.preventDefault();
      scrollToHash(url.hash);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
