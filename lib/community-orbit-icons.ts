import {
  Factory,
  Lightbulb,
  Package,
  Sprout,
  TrendingUp,
  Truck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export const communityOrbitIconKeys = [
  "sprout",
  "truck",
  "trending-up",
  "package",
  "user-round",
  "factory",
  "lightbulb",
] as const;

export type CommunityOrbitIconKey = (typeof communityOrbitIconKeys)[number];

export const communityOrbitIcons = {
  sprout: Sprout,
  truck: Truck,
  "trending-up": TrendingUp,
  package: Package,
  "user-round": UserRound,
  factory: Factory,
  lightbulb: Lightbulb,
} satisfies Record<CommunityOrbitIconKey, LucideIcon>;
