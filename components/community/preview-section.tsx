import {
  Lightbulb,
  Megaphone,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

import { MotionFade } from "@/components/shared/motion/motion-fade";
import { MotionStagger } from "@/components/shared/motion/motion-stagger";
import { EyebrowBadge } from "@/components/ui/eyebrow-badge";
import { communityPageContent } from "@/content/community";
import type { CommunityPreviewFeature } from "@/types/community";
import { cn } from "@/lib/utils";

const featureIconMap: Record<CommunityPreviewFeature["icon"], LucideIcon> = {
  "message-square": MessageSquare,
  megaphone: Megaphone,
  lightbulb: Lightbulb,
};

export function CommunityPreviewSection() {
  const section = communityPageContent.preview;

  return (
    <section className="bg-subtle py-14 sm:py-16 lg:py-20">
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="order-2 lg:order-1">
            <MotionFade delay={0.12}>
              <ChatMockup chat={section.chat} />
            </MotionFade>
          </div>

          <MotionFade className="order-1 flex flex-col gap-8 lg:order-2">
            <div>
              <EyebrowBadge>{section.eyebrow}</EyebrowBadge>
              <h2 className="text-foreground mt-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.01em] sm:text-4xl sm:leading-[48px]">
                {section.title}
              </h2>
              <p className="text-fg-muted mt-4 text-base leading-7">
                {section.description}
              </p>
            </div>

            <ul className="flex flex-col gap-5">
              {section.features.map((feature) => {
                const Icon = featureIconMap[feature.icon];
                return (
                  <li key={feature.title} className="flex gap-4">
                    <span className="bg-leaf-100 text-leaf-700 flex size-11 shrink-0 items-center justify-center rounded-full">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-foreground text-base font-semibold">
                        {feature.title}
                      </p>
                      <p className="text-fg-muted mt-1 text-sm leading-6">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-wrap gap-3">
              {section.channels.map((channel) => {
                const statusLabel =
                  channel.status === "live" ? "LIVE" : "COMING SOON";
                const statusClass =
                  channel.status === "live"
                    ? "text-leaf-600"
                    : "text-tangerine-600";

                const inner = (
                  <>
                    <span className="text-foreground text-sm font-semibold">
                      {channel.label}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase",
                        statusClass,
                      )}
                    >
                      {channel.status === "live" ? (
                        <span
                          className="bg-leaf-500 size-1.5 shrink-0 rounded-full motion-safe:animate-pulse"
                          aria-hidden
                        />
                      ) : null}
                      {statusLabel}
                    </span>
                  </>
                );

                if ("href" in channel && channel.href) {
                  return (
                    <a
                      key={channel.id}
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border flex items-center gap-2.5 rounded-full border border-dashed bg-white/60 px-4 py-2.5 transition-colors hover:bg-white"
                    >
                      {inner}
                    </a>
                  );
                }

                return (
                  <span
                    key={channel.id}
                    aria-disabled
                    className="border-border flex cursor-not-allowed items-center gap-2.5 rounded-full border border-dashed bg-white/40 px-4 py-2.5"
                  >
                    {inner}
                  </span>
                );
              })}
            </div>
          </MotionFade>
        </div>
      </div>
    </section>
  );
}

function ChatMockup({
  chat,
}: {
  chat: (typeof communityPageContent.preview)["chat"];
}) {
  return (
    <div className="border-default elevation-1 rounded-xl border bg-white p-5 sm:p-6">
      <div className="border-border flex items-center justify-between gap-3 border-b pb-4">
        <div className="flex items-center gap-2.5">
          <span
            className="bg-leaf-500 size-2 shrink-0 rounded-full"
            aria-hidden
          />
          <span className="text-foreground text-sm font-semibold">
            {chat.title}
          </span>
        </div>
        <span className="text-fg-subtle text-xs font-medium">
          {chat.membersOnlineLabel}
        </span>
      </div>

      <div className="flex justify-center py-5">
        <p className="bg-tangerine-100 text-tangerine-800 rounded-full px-3.5 py-1.5 text-xs font-semibold">
          {chat.pinnedBanner}
        </p>
      </div>

      <MotionStagger cap={5} className="flex flex-col gap-5">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.align === "right" ? "flex-row-reverse" : "flex-row",
            )}
          >
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                message.initials === "NO"
                  ? "bg-grey-900 text-white"
                  : "bg-leaf-100 text-leaf-700",
              )}
            >
              {message.initials}
            </span>
            <div
              className={cn(
                "max-w-[88%] min-w-0",
                message.align === "right" ? "text-right" : "text-left",
              )}
            >
              <p className="text-xs leading-5">
                <span
                  className={cn(
                    "font-semibold",
                    message.senderTone === "leaf"
                      ? "text-leaf-700"
                      : "text-tangerine-600",
                  )}
                >
                  {message.senderName}
                </span>
                <span className="text-fg-subtle"> · {message.senderRole}</span>
              </p>
              <p
                className={cn(
                  "mt-1.5 inline-block rounded-xl px-3.5 py-2.5 text-left text-sm leading-6",
                  message.bubbleTone === "green"
                    ? "bg-leaf-100 text-foreground"
                    : "bg-grey-100 text-foreground",
                )}
              >
                {message.text}
              </p>
            </div>
          </div>
        ))}
      </MotionStagger>
    </div>
  );
}
