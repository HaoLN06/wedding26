"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/types/wedding";
import { Lightbox } from "./Lightbox";
import { ChimLac } from "@/components/ui/QuanHoIcons";

type AlbumExperienceProps = { images: GalleryImage[] };

const framePositions = ["object-[48%_40%]", "object-[62%_38%]", "object-[44%_50%]"];

export function AlbumExperience({ images }: AlbumExperienceProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedImage = images[selectedIndex];
  const filmFrames = Array.from({ length: Math.max(3, images.length) }, (_, index) => images[index % images.length]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>("[data-album-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  function selectPrevious() {
    setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  }

  function selectNext() {
    setSelectedIndex((current) => (current + 1) % images.length);
  }

  return (
    <div ref={rootRef}>
      <div className="relative bg-[#11100f] text-[var(--color-on-image)]">
        <div className="album-grain pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)] py-8 md:py-12">
          <div className="mb-8 grid grid-cols-3 border-b border-white/25 pb-5 text-[0.62rem] font-semibold tracking-[0.22em] uppercase md:text-xs">
            <span>Duyên</span>
            <span className="text-center">quan họ</span>
            <span className="text-right">Bắc Ninh</span>
          </div>

          <div className="relative border-x border-white/25 px-4 py-5 sm:px-7 md:px-10 md:py-10">
            <span className="album-film-rail absolute inset-y-0 left-1 w-1.5 opacity-65" aria-hidden="true" />
            <span className="album-film-rail absolute inset-y-0 right-1 w-1.5 opacity-65" aria-hidden="true" />
            <span className="absolute top-8 -left-1 -rotate-90 text-[0.52rem] tracking-[0.18em] text-white/55" aria-hidden="true">KODAK · 400</span>
            <span className="absolute right-0 bottom-8 rotate-90 text-[0.52rem] tracking-[0.18em] text-white/55" aria-hidden="true">FRAME · 01—03</span>

            <div className="grid gap-1.5 md:grid-cols-12 md:gap-2">
              {filmFrames.slice(0, 3).map((image, index) => (
                <figure
                  className={`album-reveal relative overflow-hidden bg-[#26221f] ${index === 0 ? "aspect-[4/5] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[52rem]" : "aspect-[4/3] md:col-span-5 md:min-h-[25.75rem]"}`}
                  data-album-reveal
                  style={{ transitionDelay: `${index * 110}ms` }}
                  key={`${image.id}-film-${index}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={index === 0 ? "(max-width: 767px) calc(100vw - 64px), 58vw" : "(max-width: 767px) calc(100vw - 64px), 38vw"}
                    className={`album-film-image object-cover ${framePositions[index]}`}
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pt-16 pb-5 text-center text-xs leading-5 text-white md:px-7 md:pb-7 md:text-sm">
                    {image.caption || "You are my favorite place to be."}
                  </span>
                  <span className="absolute top-4 left-4 text-[0.58rem] font-semibold tracking-[0.16em] text-white/75" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </figure>
              ))}
            </div>
          </div>

          <p className="mt-6 text-right text-[0.58rem] tracking-[0.18em] text-white/40 uppercase">Duyên quan họ · Đông 2026</p>
        </div>
      </div>

      <div className="bg-[var(--color-wine)] text-[var(--color-on-image)]">
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--page-gutter)] py-[var(--section-space-md)]">
          <header className="album-reveal mb-12 grid items-end gap-8 border-t border-white/25 pt-7 md:mb-16 md:grid-cols-[1fr_auto]" data-album-reveal>
            <div className="relative">
              <h3 className="font-[family-name:var(--font-serif)] text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.92] tracking-[-0.05em] uppercase">
                <span className="block">Album</span>
                <span className="block pl-[22%] text-[0.42em] leading-none font-normal italic normal-case text-[var(--color-on-image-accent)]">đôi lứa</span>
                <span className="block pl-[34%] leading-[0.92]">Yêu</span>
              </h3>
              <ChimLac size={64} className="absolute -right-2 top-2 hidden text-[var(--color-on-image-accent)]/25 md:block" />
            </div>
            <p className="max-w-xs pb-2 text-sm leading-7 text-white/60 md:text-right">Chọn một khung hình để mở lại khoảnh khắc của chúng mình.</p>
          </header>

          <div className="album-reveal" data-album-reveal>
            <div className="relative border border-white/25 bg-[#1a1715] p-2 sm:p-3">
              <button
                className="relative block w-full cursor-zoom-in overflow-hidden focus-visible:outline-offset-4"
                type="button"
                onClick={() => setLightboxIndex(selectedIndex)}
                aria-label="Xem ảnh toàn màn hình"
              >
                <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10]">
                  <Image
                    key={`${selectedImage.id}-${selectedIndex}`}
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 56px), 88vw"
                    className={`album-stage-image object-cover ${framePositions[selectedIndex % framePositions.length]}`}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 bg-gradient-to-t from-black/75 to-transparent px-5 pt-24 pb-5 sm:px-8 sm:pb-8">
                    <p className="max-w-xl font-[family-name:var(--font-serif)] text-xl italic sm:text-2xl" aria-live="polite">
                      {selectedImage.caption || "Một khoảnh khắc của chúng mình"}
                    </p>
                    <p className="shrink-0 text-[0.62rem] font-semibold tracking-[0.16em] text-white/65">
                      {String(selectedIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </button>

              {images.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between sm:inset-x-7">
                  <button className="album-arrow" type="button" onClick={selectPrevious} aria-label="Xem ảnh trước">←</button>
                  <button className="album-arrow" type="button" onClick={selectNext} aria-label="Xem ảnh tiếp theo">→</button>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3 overflow-x-auto pb-3" aria-label="Chọn ảnh trong album">
              {images.map((image, index) => (
                <button
                  className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden border transition-[opacity,border-color] duration-[var(--duration-base)] sm:w-32 ${index === selectedIndex ? "border-white opacity-100" : "border-white/25 opacity-55 hover:opacity-90"}`}
                  type="button"
                  onClick={() => {
                    setSelectedIndex(index);
                    setLightboxIndex(index);
                  }}
                  aria-label={`Xem ảnh ${index + 1}: ${image.alt}`}
                  aria-pressed={index === selectedIndex}
                  key={image.id}
                >
                  <Image src={image.src} alt="" fill sizes="128px" className={`object-cover ${framePositions[index % framePositions.length]}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox images={images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  );
}
