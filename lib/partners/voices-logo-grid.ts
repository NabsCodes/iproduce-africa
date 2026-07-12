import type { Partner } from "@/types/partners";

export const VOICES_LOGO_GRID_TARGET = 12;

export type VoicesLogoCell = Partner & {
  cellId: string;
};

type BuildVoicesLogoGridOptions = {
  targetCount?: number;
  windowIndex?: number;
};

function sortPartners(partners: readonly Partner[]): Partner[] {
  return [...partners].sort((left, right) => {
    const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return left.name.localeCompare(right.name);
  });
}

function expandWithRoundRobin(
  partners: readonly Partner[],
  targetCount: number,
): Partner[] {
  const result: Partner[] = [];
  let cursor = 0;

  while (result.length < targetCount) {
    const candidate = partners[cursor % partners.length];

    if (
      result.length > 0 &&
      result[result.length - 1]?.id === candidate.id &&
      partners.length > 1
    ) {
      cursor += 1;
      continue;
    }

    result.push(candidate);
    cursor += 1;
  }

  return result;
}

function selectPartnerWindow(
  partners: readonly Partner[],
  targetCount: number,
  windowIndex: number,
): Partner[] {
  const start = (windowIndex * targetCount) % partners.length;

  return Array.from({ length: targetCount }, (_, index) => {
    return partners[(start + index) % partners.length]!;
  });
}

/** Build the 12-cell voices logo grid (repeat fairly or rotate a window). */
export function buildVoicesLogoGrid(
  partners: readonly Partner[],
  {
    targetCount = VOICES_LOGO_GRID_TARGET,
    windowIndex = 0,
  }: BuildVoicesLogoGridOptions = {},
): VoicesLogoCell[] {
  const pool = sortPartners(partners);

  if (!pool.length) {
    return [];
  }

  const selected =
    pool.length >= targetCount
      ? selectPartnerWindow(pool, targetCount, windowIndex)
      : expandWithRoundRobin(pool, targetCount);

  return selected.map((partner, index) => ({
    ...partner,
    cellId: `${partner.id}-w${windowIndex}-${index}`,
  }));
}

/** How many rotation windows exist when the catalogue exceeds the grid size. */
export function getVoicesLogoWindowCount(
  partnerCount: number,
  targetCount = VOICES_LOGO_GRID_TARGET,
): number {
  if (partnerCount <= 0) {
    return 0;
  }

  if (partnerCount <= targetCount) {
    return 1;
  }

  return Math.ceil(partnerCount / targetCount);
}
