"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { OvIcon } from "./OvIcon";

/// Full-bleed image viewer with prev/next navigation. Arrow keys step through the
/// set, Escape closes, and the body scroll is locked while it is open.
export function Lightbox({
  images,
  index,
  alt,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const count = images.length;

  const step = useCallback(
    (delta: number) => {
      if (count === 0) return;
      onNavigate((index + delta + count) % count);
    },
    [count, index, onNavigate]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, step]);

  if (count === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} screenshot ${index + 1} of ${count}`}
      className="animate-ov-fade-up fixed inset-0 z-[100] flex flex-col bg-[rgba(4,6,12,0.95)] backdrop-blur-[3px]"
      onClick={onClose}
    >
      <div className="flex shrink-0 items-center gap-4 px-4 py-3.5 lg:px-7">
        <span className="font-orbitron text-[11px] font-bold tracking-[2px] text-ov-teal">
          {String(index + 1).padStart(2, "0")}
          <span className="text-ov-muted"> / {String(count).padStart(2, "0")}</span>
        </span>
        <span className="hidden truncate text-[12px] tracking-[1px] text-ov-dim md:inline">
          {alt}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="ml-auto border border-ov-border px-3 py-1.5 text-[11px] tracking-[1px] text-ov-dim transition-colors duration-150 hover:border-ov-rose hover:text-ov-rose active:scale-95"
        >
          <OvIcon name="close" className="mr-1.5 text-[11px]" />
          CLOSE
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-2 lg:px-16">
        {/* Stop propagation so clicking the image itself does not dismiss. */}
        <div
          className="relative h-full w-full"
          onClick={(event) => event.stopPropagation()}
        >
          <Image
            key={images[index]}
            src={images[index]}
            alt={`${alt} screenshot ${index + 1}`}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                step(-1);
              }}
              className="ov-clip-sm absolute left-1 top-1/2 -translate-y-1/2 border border-ov-border bg-[rgba(10,18,32,0.85)] px-3 py-4 text-[16px] text-ov-text transition-all duration-150 hover:border-ov-teal hover:text-ov-teal active:scale-90 lg:left-3"
            >
              ◂
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                step(1);
              }}
              className="ov-clip-sm absolute right-1 top-1/2 -translate-y-1/2 border border-ov-border bg-[rgba(10,18,32,0.85)] px-3 py-4 text-[16px] text-ov-text transition-all duration-150 hover:border-ov-teal hover:text-ov-teal active:scale-90 lg:right-3"
            >
              ▸
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div
          className="shrink-0 overflow-x-auto px-4 pb-4 lg:px-7"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex gap-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => onNavigate(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className="relative h-[44px] w-[74px] shrink-0 overflow-hidden transition-all duration-150 hover:scale-105"
                style={{
                  border: `1px solid ${i === index ? "#2dd4bf" : "#16324a"}`,
                  opacity: i === index ? 1 : 0.5,
                }}
              >
                <Image src={src} alt="" fill sizes="74px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
