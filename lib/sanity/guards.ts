/**
 * Shared empty-state guard for the future fetch layer — sections render
 * `null` rather than an empty carousel/grid shell when a collection has no
 * items (per the empty-content rules in docs/cms-migration-spec.md).
 * Not imported by any route yet.
 */
export function hasItems<T>(
  items: readonly T[] | null | undefined,
): items is readonly T[] {
  return Array.isArray(items) && items.length > 0;
}
