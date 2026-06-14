import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className}>
      <span className="flex items-center gap-3">
        <span className="relative flex h-11 w-11 items-center justify-center">
          <span className="border-tangerine-500 absolute inset-0 rounded-full border-[5px]" />
          <span className="bg-forest-900 h-5 w-5 rounded-full" />
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-grey-950 font-sans text-xl font-bold tracking-tight">
            iProduce
          </span>
          <span className="text-tangerine-500 mt-1 text-[10px] font-semibold tracking-[0.22em] uppercase">
            {siteConfig.tagline}
          </span>
        </span>
      </span>
    </Link>
  );
}
