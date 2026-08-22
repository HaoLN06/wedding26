"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { weddingConfig } from "@/config/wedding";
import type { GalleryImage } from "@/types/wedding";
import { Lightbox } from "./Gallery/Lightbox";

type AlbumGalleryProps = {
  images?: GalleryImage[];
};

const rotations = [-5.5, 3.5, -2.5, 5, -4] as const;

export function AlbumGallery({ images = weddingConfig.gallery }: AlbumGalleryProps) {
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const memoryCards = images.slice(0, 3);

  function toggleCard(id: string) {
    setFlippedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  if (!images.length) return null;

  return (
    <section className="relative overflow-hidden bg-[#4a0d22] px-[var(--page-gutter)] py-16 text-[var(--color-on-image)] sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(rgb(250_230_190_/_0.35)_0.6px,transparent_0.6px)] [background-size:8px_8px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[var(--container-wide)]">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-[0.65rem] font-semibold tracking-[0.26em] text-[var(--color-on-image-accent)] uppercase">Mở từng trang ký ức</p>
          <h3 className="mt-4 font-[family-name:var(--font-serif)] text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.05em]">
            Album <span className="italic text-[var(--color-on-image-accent)]">đôi lứa</span>
          </h3>
          <p className="mt-6 text-sm leading-7 text-white/65">Chạm vào những lời nhắn để lật mở, rồi chọn một khung hình để ngắm thật lâu.</p>
        </header>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3 sm:gap-7 [perspective:1200px]">
          {memoryCards.map((image, index) => {
            const isFlipped = flippedIds.includes(image.id);

            return (
              <motion.button
                className="relative aspect-[4/5] w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-on-image-accent)] [transform-style:preserve-3d]"
                key={image.id}
                type="button"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 135, damping: 18 }}
                whileHover={reduceMotion ? undefined : { y: -8 }}
                onClick={() => toggleCard(image.id)}
                aria-label={`${isFlipped ? "Đóng" : "Mở"} ký ức: ${image.caption ?? image.alt}`}
                aria-pressed={isFlipped}
              >
                <span className="absolute inset-0 flex flex-col justify-between border border-yellow-100/30 bg-[#380a1a] p-6 shadow-xl shadow-black/25 [backface-visibility:hidden]">
                  <span className="font-[family-name:var(--font-serif)] text-4xl italic text-[var(--color-on-image-accent)]/70">0{index + 1}</span>
                  <span>
                    <span className="block font-[family-name:var(--font-serif)] text-2xl leading-tight">{image.caption ?? "Một khoảnh khắc của chúng mình"}</span>
                    <span className="mt-5 block text-[0.62rem] font-semibold tracking-[0.18em] text-white/55 uppercase">Chạm để lật mở</span>
                  </span>
                </span>
                <span className="absolute inset-0 overflow-hidden border border-yellow-100/30 bg-[#1e1014] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 639px) 100vw, 33vw" className="object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                  <span className="absolute right-5 bottom-5 text-[0.62rem] font-semibold tracking-[0.18em] text-white/80 uppercase">Khép lại</span>
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="relative mt-20 border-y border-yellow-100/20 py-12 sm:mt-28 sm:py-20">
          <svg className="pointer-events-none absolute inset-x-[8%] top-1/2 hidden h-32 w-[84%] -translate-y-1/2 text-[var(--color-on-image-accent)]/30 lg:block" viewBox="0 0 1000 160" fill="none" aria-hidden="true">
            <path d="M0 90C130 10 215 155 355 72s205 91 320 13 180-77 325 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M0 99c134-78 218 72 354-10s206 89 322 12 180-78 324 7" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.65" />
          </svg>
          <div className="relative mx-auto grid max-w-6xl grid-cols-2 items-center gap-x-3 gap-y-9 px-1 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-5">
            {images.map((image, index) => (
              <motion.button
                className="group relative isolate aspect-[4/5] w-full cursor-zoom-in bg-[#f8efe2] p-2 text-left shadow-[0_12px_30px_rgb(0_0_0_/_0.32)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-on-image-accent)] sm:p-3"
                key={image.id}
                type="button"
                initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: rotations[index % rotations.length] }}
                whileInView={{ opacity: 1, y: 0, rotate: rotations[index % rotations.length] }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: 0, y: -18, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 180, damping: 19, delay: index * 0.06 }}
                onClick={() => setLightboxIndex(index)}
                aria-label={`Mở ảnh ${index + 1}: ${image.alt}`}
              >
                <span className="relative block h-[calc(100%-1.75rem)] overflow-hidden bg-[#251019] sm:h-[calc(100%-2rem)]">
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 20vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </span>
                <span className="mt-1.5 block truncate text-center font-[family-name:var(--font-serif)] text-xs italic text-[#4a0d22] sm:mt-2 sm:text-sm">{image.caption ?? `Khoảnh khắc ${index + 1}`}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && <Lightbox images={images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
    </section>
  );
}
