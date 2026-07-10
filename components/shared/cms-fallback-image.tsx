import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type CmsFallbackImageProps = {
  alt?: string;
  className?: string;
};

/**
 * Themed placeholder when a catalogue card or detail hero image is missing or
 * fails to load — keeps broken-browser-icon UX off public surfaces.
 */
export function CmsFallbackImage({ alt, className }: CmsFallbackImageProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "bg-leaf-50 border-leaf-100 flex items-center justify-center rounded-xl border",
        className,
      )}
    >
      <ImageOff className="text-leaf-600 size-6" aria-hidden />
    </div>
  );
}
