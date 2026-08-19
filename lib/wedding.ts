export function formatWeddingDate(date: string): string {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (!match) {
    return date;
  }

  const [, year, month, day] = match;
  return `${day} · ${month} · ${year}`;
}

export type WeddingDateParts = {
  weekday: string;
  day: string;
  monthYear: string;
  time: string;
};

const WEDDING_TIME_ZONE = "Asia/Ho_Chi_Minh";

function capitalize(value: string): string {
  return value.charAt(0).toLocaleUpperCase("vi-VN") + value.slice(1);
}

export function formatWeddingDateParts(date: string): WeddingDateParts {
  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return { weekday: "", day: "—", monthYear: date, time: "" };
  }

  const weekday = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    timeZone: WEDDING_TIME_ZONE,
  }).format(value);
  const month = new Intl.DateTimeFormat("vi-VN", {
    month: "long",
    timeZone: WEDDING_TIME_ZONE,
  }).format(value);
  const year = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    timeZone: WEDDING_TIME_ZONE,
  }).format(value);

  return {
    weekday: capitalize(weekday),
    day: new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      timeZone: WEDDING_TIME_ZONE,
    }).format(value),
    monthYear: `${capitalize(month)} · ${year}`,
    time: new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: WEDDING_TIME_ZONE,
    }).format(value),
  };
}

export function normalizeGuestName(value: string | string[] | undefined): string | undefined {
  const rawValue = Array.isArray(value) ? value[0] : value;
  if (!rawValue) return undefined;

  const normalized = rawValue
    .replace(/[\p{Cc}\p{Cf}]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);

  return normalized || undefined;
}
