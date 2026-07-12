import Image from "next/image";

import { cn } from "@/lib/utils";

type BrowserMockupProps = {
  url: string;
  className?: string;
};

export function BrowserMockup({ url, className }: BrowserMockupProps) {
  return (
    <div
      className={cn(
        "bg-panel border-border h-[252px] w-[360px] overflow-hidden rounded-xl border",
        "shadow-[0_24px_40px_-8px_rgb(15_20_10/0.16),0_8px_16px_-8px_rgb(15_20_10/0.08)]",
        className,
      )}
    >
      <div className="bg-subtle border-border relative h-7 border-b">
        <div
          className="absolute top-2.5 left-3 flex items-center gap-1"
          aria-hidden
        >
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </div>

        <div className="bg-muted absolute top-1.5 left-1/2 h-4 w-[132px] -translate-x-1/2 rounded-md">
          <p className="text-fg-subtle text-center text-[11px] leading-4">
            {url}
          </p>
        </div>
      </div>

      <div className="flex h-[calc(100%-28px)] flex-col">
        <div className="flex flex-1 items-center justify-center px-8">
          <Image
            src="/images/shared/iproduce-logo.webp"
            alt="iProduce Agribusiness Hub"
            width={2595}
            height={1164}
            sizes="190px"
            className="h-auto w-[190px] max-w-full object-contain"
          />
        </div>
        <div aria-hidden className="bg-subtle h-4 shrink-0" />
      </div>
    </div>
  );
}
