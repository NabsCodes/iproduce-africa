"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

/**
 * SSR-safe wrapper around motion/react's `useReducedMotion`.
 *
 * `motion/react`'s hook reads `prefers-reduced-motion` from
 * `window.matchMedia`, which is unavailable during server rendering. If a
 * component reads the raw hook and uses it to gate variants, the SSR pass
 * and first client pass can disagree → hydration mismatch.
 *
 * This wrapper returns `true` (treat as reduced) during SSR and on the
 * first client paint, then resolves to the real preference after mount.
 * The static-rendered HTML always matches the reduced-motion variant, and
 * motion only kicks in after hydration. Effectively: no animation on
 * first paint, full animation after.
 *
 * Implementation note: uses `useSyncExternalStore` rather than
 * `useState + useEffect` because React Compiler flags `setState` in
 * `useEffect` even when the purpose is mount detection. The two
 * snapshots (server: false, client: true) give us hydration-safe gating
 * without tripping that lint rule.
 */

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function useReducedMotionSafe(): boolean {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const prefersReduced = useReducedMotion();

  if (!mounted) return true;
  return prefersReduced ?? false;
}
