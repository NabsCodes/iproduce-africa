import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type CmsFallbackImageProps = {
  alt?: string;
  className?: string;
};

/**
 * Defensive placeholder for a catalogue image that failed to resolve from
 * Sanity — shouldn't trigger in practice since Studio requires an image +
 * alt whenever the field is set, but a resolver gap shouldn't render a
 * broken `<img>` on the public site.
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
