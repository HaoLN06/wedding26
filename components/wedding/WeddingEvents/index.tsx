import type { WeddingEvent } from "@/types/wedding";
import { formatWeddingDateParts } from "@/lib/wedding";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { TrongDong } from "@/components/ui/QuanHoIcons";

type WeddingEventsProps = { events: WeddingEvent[] };

const weekdayLabels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

function parseCalendarDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const firstDayOffset = (new Date(Date.UTC(year, month - 1, 1)).getUTCDay() + 6) % 7;

  return { year, month, day, daysInMonth, firstDayOffset };
}

function WeddingCalendar({ date }: { date: string }) {
  const calendar = parseCalendarDate(date);
  if (!calendar) return null;

  const slots = Array.from(
    { length: calendar.firstDayOffset + calendar.daysInMonth },
    (_, index) => index - calendar.firstDayOffset + 1,
  );

  return (
    <div className="mx-auto w-full max-w-md border-y border-white/25 py-8 md:py-10">
      <div className="mb-8 flex items-baseline justify-between">
        <p className="font-[family-name:var(--font-serif)] text-3xl italic">Tháng {calendar.month}</p>
        <p className="text-xs font-semibold tracking-[0.22em] text-white/65 uppercase">{calendar.year}</p>
      </div>
      <div className="grid grid-cols-7 gap-y-3 text-center">
        {weekdayLabels.map((label) => (
          <span className="text-[0.62rem] font-semibold tracking-[0.14em] text-white/50" key={label}>{label}</span>
        ))}
        {slots.map((day, index) => (
          <span className="grid min-h-9 place-items-center text-sm" key={`${day}-${index}`}>
            {day > 0 && (
              day === calendar.day
                ? <strong className="grid size-9 place-items-center rounded-full bg-[var(--color-on-image)] font-semibold text-[var(--color-wine)]">{day}</strong>
                : day
            )}
          </span>
        ))}
      </div>
      <p className="mt-8 text-center font-[family-name:var(--font-serif)] text-lg italic text-white/70">Ngày lành tháng tốt</p>
    </div>
  );
}

function EventDetails({ event, index }: { event: WeddingEvent; index: number }) {
  const date = formatWeddingDateParts(event.date);

  return (
    <article className="grid gap-7 border-t border-white/20 py-9 first:border-t-0 first:pt-0 md:grid-cols-[7.5rem_1fr] md:gap-8 md:py-11">
      <Reveal delay={index * 0.08} amount={0.25}>
        <time className="block" dateTime={event.date}>
          <span className="block font-[family-name:var(--font-serif)] text-5xl leading-none tracking-[-0.05em]">{date.day}</span>
          <span className="mt-2 block text-[0.62rem] font-semibold tracking-[0.16em] text-white/55 uppercase">{date.monthYear}</span>
        </time>
      </Reveal>

      <Reveal delay={0.08 + index * 0.08} amount={0.22}>
        <p className="mb-3 text-[0.65rem] font-semibold tracking-[0.2em] text-[var(--color-on-image-accent)] uppercase">
          {String(index + 1).padStart(2, "0")} · {date.weekday}
        </p>
        <h3 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4vw,2.8rem)] leading-tight tracking-[-0.025em]">{event.title}</h3>
        <p className="mt-2 font-[family-name:var(--font-serif)] text-xl italic text-white/85">{date.time} · {event.venue}</p>
        {event.description && <p className="mt-5 max-w-xl leading-7 text-white/65">{event.description}</p>}

        <address className="mt-5 text-sm leading-6 not-italic text-white/75">{event.address}</address>
        {(event.dressCode || event.note) && (
          <p className="mt-4 text-xs leading-6 tracking-[0.04em] text-white/55">
            {[event.dressCode, event.note].filter(Boolean).join(" · ")}
          </p>
        )}

        {event.mapUrl && (
          <a
            className="mt-7 inline-flex min-h-11 items-center border-b border-white/55 text-xs font-semibold tracking-[0.16em] text-white uppercase hover:border-white hover:text-white"
            href={event.mapUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Xem bản đồ đến ${event.venue}`}
          >
            Chỉ đường <span className="ml-3" aria-hidden="true">↗</span>
          </a>
        )}
      </Reveal>
    </article>
  );
}

export function WeddingEvents({ events }: WeddingEventsProps) {
  return (
    <Section id="wedding-events" width="wide" className="bg-[var(--color-wine)] text-[var(--color-on-image)]">
      <Reveal>
        <header className="relative grid gap-8 border-t border-white/25 pt-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-[0.67rem] font-semibold tracking-[0.22em] text-[var(--color-on-image-accent)] uppercase">03 · Ngày lành tháng tốt</p>
          <TrongDong size={52} className="mt-4 text-[var(--color-on-image-accent)]/40" />
        </div>
        <div>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.9rem,7vw,6.5rem)] leading-[1.01] tracking-[-0.04em]">
            Ngày mình<br /><span className="inline-block italic text-[var(--color-on-image-accent)]">về chung nhà</span>
          </h2>
          <p className="mt-10 max-w-xl leading-8 text-white/65">Chúng mình mong được đón bạn tại những khoảnh khắc ý nghĩa nhất của ngày trọng đại.</p>
        </div>
        </header>
      </Reveal>

      {events.length ? (
        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-24">
          <Reveal amount={0.25}><WeddingCalendar date={events[0].date} /></Reveal>
          <div>{events.map((event, index) => <EventDetails event={event} index={index} key={event.id} />)}</div>
        </div>
      ) : (
        <p className="mt-16 border-y border-white/25 py-10 text-white/65">Thông tin ngày cưới sẽ sớm được cập nhật.</p>
      )}
    </Section>
  );
}
