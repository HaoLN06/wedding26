"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, LoaderCircle, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { weddingConfig } from "@/config/wedding";

type Attendance = "attending" | "declined" | null;
type FormErrors = { name?: string; attendance?: string };

const entrance = { duration: 0.38, ease: [0.22, 1, 0.36, 1] } as const;

export function RSVPForm() {
  const { rsvp } = weddingConfig;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<Attendance>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const reduceMotion = useReducedMotion();

  function chooseAttendance(nextAttendance: Exclude<Attendance, null>) {
    setAttendance(nextAttendance);
    setErrors((current) => ({ ...current, attendance: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (name.trim().length < 2) nextErrors.name = "Vui lòng nhập họ và tên của bạn.";
    if (!attendance) nextErrors.attendance = "Hãy cho chúng mình biết bạn có thể tham dự không nhé.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  }

  const inputClassName = "mt-2 w-full border border-gray-200 bg-white/70 px-4 py-3 text-sm text-[#4a0d22] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#4a0d22]/35 focus:border-[#4a0d22] focus:ring-1 focus:ring-[#4a0d22]";

  return (
    <section id="rsvp" className="bg-[#fcfaf5] px-[var(--page-gutter)] py-[var(--section-space-lg)] text-[#4a0d22]" aria-labelledby="rsvp-title">
      <div className="mx-auto max-w-2xl">
        <header className="border-t border-[#4a0d22]/20 pt-7 text-center">
          <p className="text-[0.68rem] font-semibold tracking-[0.24em] text-[#4a0d22]/65 uppercase">05 · Hồi âm</p>
          <h2 id="rsvp-title" className="mt-6 font-[family-name:var(--font-serif)] text-[clamp(3rem,8vw,5.5rem)] leading-[0.96] tracking-[-0.05em]">{rsvp.title}</h2>
          <p className="mx-auto mt-6 max-w-xl leading-8 text-[#4a0d22]/65">{rsvp.description}</p>
          <div className="relative mx-auto mt-14 border-t border-[#4a0d22]/20">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fcfaf5] px-5 font-[family-name:var(--font-serif)] text-3xl italic">Rsvp</span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              className="py-16 text-center sm:py-20"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={entrance}
              role="status"
            >
              <motion.span
                className="mx-auto grid size-16 place-items-center rounded-full border border-[#4a0d22]/25 bg-[#4a0d22]/5 text-[#4a0d22]"
                initial={reduceMotion ? false : { scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
              >
                <Check size={29} strokeWidth={1.6} aria-hidden="true" />
              </motion.span>
              <p className="mt-8 text-[0.68rem] font-semibold tracking-[0.2em] text-[#4a0d22]/55 uppercase">Đã gửi hồi âm</p>
              <h3 className="mt-4 font-[family-name:var(--font-serif)] text-4xl leading-tight sm:text-5xl">{rsvp.successTitle}</h3>
              <p className="mx-auto mt-5 max-w-md leading-8 text-[#4a0d22]/65">{rsvp.successMessage}</p>
              <p className="mt-5 font-[family-name:var(--font-serif)] text-xl italic">Hẹn gặp {name.trim()} trong ngày vui.</p>
            </motion.div>
          ) : (
            <motion.form
              className="mt-14 space-y-8"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={entrance}
              noValidate
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block text-[0.72rem] font-semibold tracking-[0.14em] uppercase" htmlFor="rsvp-name">Họ và tên</label>
                <input
                  className={inputClassName}
                  id="rsvp-name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  placeholder="Tên của bạn"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "rsvp-name-error" : undefined}
                />
                {errors.name && <p id="rsvp-name-error" className="mt-2 text-sm text-[#8b3a3a]" role="alert">{errors.name}</p>}
              </div>

              <fieldset aria-describedby={errors.attendance ? "rsvp-attendance-error" : undefined}>
                <legend className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase">Bạn có thể tham dự không?</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Xác nhận tham dự">
                  {[
                    { value: "attending" as const, title: "Có, mình sẽ tham dự" },
                    { value: "declined" as const, title: "Rất tiếc, mình không thể" },
                  ].map((option) => {
                    const selected = attendance === option.value;

                    return (
                      <button
                        className={`flex items-center gap-3 border-[0.5px] px-4 py-3 text-left font-sans text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a0d22] ${selected ? "border-[#4a0d22] bg-[#4a0d22]/5 ring-1 ring-[#4a0d22]/35" : "border-gray-200 bg-white/45 hover:border-[#4a0d22]/45"}`}
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => chooseAttendance(option.value)}
                      >
                        <span className={`grid size-4 shrink-0 place-items-center rounded-full border transition-colors ${selected ? "border-[#4a0d22]" : "border-[#4a0d22]/35"}`} aria-hidden="true">
                          {selected && <span className="size-1.5 rounded-full bg-[#4a0d22]" />}
                        </span>
                        <span>{option.title}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.attendance && <p id="rsvp-attendance-error" className="mt-2 text-sm text-[#8b3a3a]" role="alert">{errors.attendance}</p>}
              </fieldset>

              <AnimatePresence initial={false}>
                {attendance === "attending" && (
                  <motion.div
                    className="overflow-hidden"
                    initial={reduceMotion ? false : { opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: -10 }}
                    transition={entrance}
                  >
                    <div className="border-y border-[#4a0d22]/20 py-6">
                      <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase">Số lượng người tham dự</p>
                      <div className="mt-4 flex items-center justify-between border border-[#4a0d22]/20 bg-white/60 p-2">
                        <button className="grid size-11 place-items-center border border-[#4a0d22]/20 transition-colors hover:bg-[#4a0d22]/5 disabled:cursor-not-allowed disabled:opacity-35" type="button" onClick={() => setGuestCount((count) => Math.max(1, count - 1))} disabled={guestCount === 1} aria-label="Giảm số lượng khách"><Minus size={18} /></button>
                        <span className="font-[family-name:var(--font-serif)] text-3xl tabular-nums" aria-live="polite">{guestCount}</span>
                        <button className="grid size-11 place-items-center border border-[#4a0d22]/20 transition-colors hover:bg-[#4a0d22]/5 disabled:cursor-not-allowed disabled:opacity-35" type="button" onClick={() => setGuestCount((count) => Math.min(rsvp.maxGuests, count + 1))} disabled={guestCount === rsvp.maxGuests} aria-label="Tăng số lượng khách"><Plus size={18} /></button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {rsvp.allowMessage && (
                <div>
                  <label className="block text-[0.72rem] font-semibold tracking-[0.14em] uppercase" htmlFor="rsvp-message">Lời nhắn <span className="font-normal normal-case tracking-normal text-[#4a0d22]/50">(không bắt buộc)</span></label>
                  <textarea className={`${inputClassName} min-h-32 resize-y`} id="rsvp-message" name="message" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={500} placeholder="Chúc hai bạn trăm năm hạnh phúc nhé! ❤️" />
                </div>
              )}

              <div className="flex justify-center pt-2">
                <button className="inline-flex w-auto items-center justify-center gap-3 bg-[#4a0d22] px-10 py-3 text-sm font-semibold tracking-widest text-[#fcfaf5] uppercase transition-colors hover:bg-[#651a32] disabled:cursor-wait disabled:opacity-75" type="submit" disabled={isSubmitting}>
                  {isSubmitting && <LoaderCircle className="animate-spin" size={18} aria-hidden="true" />}
                  {isSubmitting ? "Đang gửi" : rsvp.submitLabel}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
