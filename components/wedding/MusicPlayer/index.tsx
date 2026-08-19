"use client";

import { useEffect, useRef, useState } from "react";
import type { MusicConfig } from "@/types/wedding";

type MusicPlayerProps = {
  music: MusicConfig;
  shouldAutoplay: boolean;
  visible: boolean;
};

export function MusicPlayer({ music, shouldAutoplay, visible }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !music.autoplayAfterInvitation || !shouldAutoplay) return;

    void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [music.autoplayAfterInvitation, shouldAutoplay]);

  if (!music.src || hasError) return null;

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  return (
    <aside
      id="music-player"
      className={`fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-20 transition-[opacity,transform] duration-[var(--duration-base)] ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
      aria-label="Trình phát nhạc cưới"
    >
      <audio
        ref={audioRef}
        src={music.src}
        loop={music.loop}
        preload="none"
        onError={() => setHasError(true)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <button
        className="grid size-12 place-items-center border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] shadow-[var(--shadow-floating)] transition-colors duration-[var(--duration-base)] hover:border-[var(--color-primary)]"
        title={`${isPlaying ? "Tạm dừng" : "Phát"} ${music.title}`}
        type="button"
        onClick={togglePlayback}
        aria-pressed={isPlaying}
      >
        <span className="text-lg" aria-hidden="true">{isPlaying ? "Ⅱ" : "♪"}</span>
        <span className="sr-only">{isPlaying ? "Tạm dừng" : "Phát"} {music.title}</span>
      </button>
    </aside>
  );
}
