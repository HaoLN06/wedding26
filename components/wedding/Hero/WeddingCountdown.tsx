"use client";

import { useEffect, useState } from "react";

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

type WeddingCountdownProps = { date: string };

const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function getCountdown(date: string): CountdownValue {
  const difference = new Date(date).getTime() - Date.now();

  if (!Number.isFinite(difference) || difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(difference / DAY),
    hours: Math.floor((difference % DAY) / HOUR),
    minutes: Math.floor((difference % HOUR) / MINUTE),
    seconds: Math.floor((difference % MINUTE) / SECOND),
    isPast: false,
  };
}

const labels = [
  ["days", "Ngày"],
  ["hours", "Giờ"],
  ["minutes", "Phút"],
  ["seconds", "Giây"],
] as const;

export function WeddingCountdown({ date }: WeddingCountdownProps) {
  const [countdown, setCountdown] = useState<CountdownValue | null>(null);

  useEffect(() => {
    const initialCountdown = getCountdown(date);
    const initialTimer = window.setTimeout(() => setCountdown(initialCountdown), 0);

    if (initialCountdown.isPast) {
      return () => window.clearTimeout(initialTimer);
    }

    const updateCountdown = () => setCountdown(getCountdown(date));
    const interval = window.setInterval(updateCountdown, SECOND);
    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, [date]);

  if (countdown?.isPast) {
    return <p className="font-[family-name:var(--font-serif)] text-2xl tracking-wide text-[var(--color-on-image)]">Về chung một nhà</p>;
  }

  return (
    <div className="grid w-full max-w-lg grid-cols-4" aria-label="Đếm ngược đến ngày cưới">
      {labels.map(([key, label], index) => (
        <div className={`px-2 text-center ${index > 0 ? "border-l border-white/25" : ""}`} key={key}>
          <span className="block font-[family-name:var(--font-serif)] text-[clamp(1.55rem,6vw,2.7rem)] leading-none tabular-nums text-[color-mix(in_srgb,var(--color-on-image)_96%,white)]">
            {countdown ? String(countdown[key]).padStart(2, "0") : "--"}
          </span>
          <span className="mt-2 block text-[0.62rem] font-semibold tracking-[0.16em] uppercase text-[color-mix(in_srgb,var(--color-on-image)_82%,transparent)] sm:text-[0.7rem]">{label}</span>
        </div>
      ))}
    </div>
  );
}
