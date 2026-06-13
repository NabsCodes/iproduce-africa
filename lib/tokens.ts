/**
 * iProduce Africa design tokens — sourced from Figma Foundations.
 * Update hex values here when the designer exports final variables.
 */

export const fonts = {
  heading: "var(--font-fraunces)",
  body: "var(--font-plus-jakarta)",
} as const;

export const buttonSizes = {
  sm: { height: 40, paddingX: 16, radius: 12, icon: 16, gap: 8 },
  md: { height: 48, paddingX: 20, radius: 12, icon: 20, gap: 8 },
  lg: { height: 56, paddingX: 24, radius: 16, icon: 24, gap: 8 },
} as const;

export const palettes = [
  "acid",
  "forest",
  "grey",
  "tangerine",
  "emerald",
  "honey",
  "rose",
  "sky",
] as const;

export type Palette = (typeof palettes)[number];

export type ButtonEmphasis = "filled" | "soft" | "outline" | "ghost" | "link";

export const semanticRoles = {
  brand: {
    primary: "forest",
    accent: "acid",
    cta: "tangerine",
  },
  surface: {
    page: "grey-50",
    subtle: "acid-50",
    elevated: "white",
  },
  text: {
    primary: "grey-950",
    secondary: "grey-600",
    inverse: "white",
  },
} as const;
