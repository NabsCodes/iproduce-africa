import {
  Globe,
  GraduationCap,
  Handshake,
  type LucideIcon,
  Sprout,
  UserRound,
  Users,
} from "lucide-react";

export const pillarIconKeys = [
  "sprout",
  "graduation-cap",
  "globe",
  "handshake",
  "user-round",
  "users",
] as const;

export type PillarIconKey = (typeof pillarIconKeys)[number];

export const pillarIcons = {
  sprout: Sprout,
  "graduation-cap": GraduationCap,
  globe: Globe,
  handshake: Handshake,
  "user-round": UserRound,
  users: Users,
} satisfies Record<PillarIconKey, LucideIcon>;
