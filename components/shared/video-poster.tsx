"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VideoEmbed } from "@/lib/video-embeds";

type VideoPosterProps = {
  poster: string;
  posterAlt: string;
  video?: VideoEmbed;
  title: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Click-to-play facade. No provider iframe, script, or cookie-capable request
 * exists before the visitor explicitly activates the video.
 */
export function VideoPoster({
  poster,
  posterAlt,
  video,
  title,
  className,
  priority = false,
  sizes = "100vw",
}: VideoPosterProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const frameId = window.requestAnimationFrame(() =>
      iframeRef.current?.focus(),
    );
    return () => window.cancelAnimationFrame(frameId);
  }, [isPlaying]);

  return (
    <div
      className={cn("bg-muted relative overflow-hidden rounded-xl", className)}
    >
      {isPlaying && video ? (
        <iframe
          ref={iframeRef}
          src={video.embedUrl}
          title={`${title} on ${video.provider}`}
          className="absolute inset-0 size-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          tabIndex={-1}
        />
      ) : (
        <>
          <Image
            src={poster}
            alt={posterAlt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
          {video ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                type="button"
                variant="video-overlay"
                size="icon-lg"
                aria-label={title}
                onClick={() => setIsPlaying(true)}
              >
                <Play className="size-5 fill-current" aria-hidden />
              </Button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
