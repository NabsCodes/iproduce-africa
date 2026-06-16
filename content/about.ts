import type { AboutHeroContent } from "@/types/content";

export const aboutPageContent = {
  hero: {
    eyebrow: "we are iPRODUCE AFRICA",
    eyebrowTone: "tangerine",
    title: {
      lineOne: {
        lead: "Building ",
        accent: "Africa's Most",
      },
      lineTwo: "Connected Agribusiness",
      lineThree: "Ecosystem.",
    },
    description:
      "iProduce Africa is creating a digital ecosystem that empowers agripreneurs with the tools, partnerships, knowledge, and market access needed to build sustainable and profitable agricultural businesses.",
    orbit: {
      url: "iproduce.africa",
      statsLabel: "2,400+ members · 12 countries",
      rings: [
        {
          radius: 165,
          duration: 36,
          items: [
            { icon: "users", tone: "leaf", angle: 274 },
            { icon: "globe", tone: "tangerine", angle: 82 },
          ],
        },
        {
          radius: 231,
          duration: 44,
          reverse: true,
          items: [
            { icon: "handshake", tone: "tangerine", angle: 322 },
            { icon: "user-round", tone: "leaf", angle: 168 },
          ],
          dots: [{ tone: "tangerine", angle: 78 }],
        },
        {
          radius: 299,
          duration: 52,
          items: [
            { icon: "graduation-cap", tone: "leaf", angle: 213 },
            { icon: "sprout", tone: "leaf", angle: 312 },
          ],
          dots: [{ tone: "leaf", angle: 22 }],
        },
      ],
    },
  },
} as const satisfies { hero: AboutHeroContent };
