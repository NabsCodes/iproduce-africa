import { useEffect, useRef } from "react";

type MaybeRef<T> = { current: T | null };

type UseClickOutsideOptions = {
  /** Only listen when true */
  active?: boolean;
  /** Elements to ignore when clicked (treated as inside) */
  ignoreRefs?: Array<MaybeRef<HTMLElement>>;
};

// Fires a callback when the user clicks or touches outside of a target element.
export function useClickOutside<T extends HTMLElement>(
  targetRef: MaybeRef<T>,
  onOutsideClick: () => void,
  options?: UseClickOutsideOptions,
) {
  const active = options?.active ?? true;
  const onOutsideClickRef = useRef(onOutsideClick);
  const ignoreRefsRef = useRef(options?.ignoreRefs);

  useEffect(() => {
    onOutsideClickRef.current = onOutsideClick;
    ignoreRefsRef.current = options?.ignoreRefs;
  });

  useEffect(() => {
    if (!active) return;

    function handleEvent(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      const element = targetRef.current;
      if (!element || !target) return;

      if (element.contains(target)) return;

      for (const ref of ignoreRefsRef.current ?? []) {
        const ignoreEl = ref.current;
        if (ignoreEl && ignoreEl.contains(target)) return;
      }

      onOutsideClickRef.current();
    }

    document.addEventListener("mousedown", handleEvent, true);
    document.addEventListener("touchstart", handleEvent, true);

    return () => {
      document.removeEventListener("mousedown", handleEvent, true);
      document.removeEventListener("touchstart", handleEvent, true);
    };
  }, [active, targetRef]);
}
