"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/types/wedding";

type LightboxProps = {
  images: GalleryImage[];
  initialIndex: number;
  onClose: () => void;
};

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const image = images[currentIndex];

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }

  function handleTouchEnd() {
    if (Math.abs(touchDeltaX.current) > 60) {
      if (touchDeltaX.current > 0) goPrev();
      else goNext();
    }
    touchDeltaX.current = 0;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh toàn màn hình"
      onClick={(e) => { if (e.target === containerRef.current) onClose(); }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        className="absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/60"
        type="button"
        onClick={onClose}
        aria-label="Đóng"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/60 sm:left-5"
            type="button"
            onClick={goPrev}
            aria-label="Ảnh trước"
          >
            ←
          </button>
          <button
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/60 sm:right-5"
            type="button"
            onClick={goNext}
            aria-label="Ảnh tiếp"
          >
            →
          </button>
        </>
      )}

      <figure className="relative mx-auto flex h-[85vh] w-[90vw] max-w-5xl flex-col items-center justify-center">
        <div className="relative h-full w-full">
          <Image
            key={image.id}
            src={image.src}
            alt={image.alt}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>
        {image.caption && (
          <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-6 pt-16 pb-4 text-center font-[family-name:var(--font-serif)] text-lg italic text-white/90">
            {image.caption}
          </figcaption>
        )}
      </figure>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-[0.16em] text-white/60">
        {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}
