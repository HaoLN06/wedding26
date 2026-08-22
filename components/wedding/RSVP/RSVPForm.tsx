"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { RsvpConfig, WeddingEvent } from "@/types/wedding";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";

type Attendance = "attending" | "declined" | "";
type FormField = "guestName" | "attendance" | "guestCount" | "events" | "message";
type FormErrors = Partial<Record<FormField, string>>;

type RSVPFormProps = {
  config: RsvpConfig;
  events: WeddingEvent[];
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p className="field-error" id={id} role="alert">{message}</p>;
}

export function RSVPForm({ config, events }: RSVPFormProps) {
  const [attendance, setAttendance] = useState<Attendance>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedGuest, setSubmittedGuest] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const guestName = String(formData.get("guestName") ?? "").trim();
    const guestCount = Number(formData.get("guestCount"));
    const selectedEvents = formData.getAll("events").map(String);
    const message = String(formData.get("message") ?? "").trim();
    const nextErrors: FormErrors = {};

    if (guestName.length < 2) nextErrors.guestName = "Vui lòng nhập họ tên của bạn.";
    if (!attendance) nextErrors.attendance = "Vui lòng cho chúng mình biết bạn có thể tham dự không.";

    if (attendance === "attending") {
      if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > config.maxGuests) {
        nextErrors.guestCount = `Số khách phải từ 1 đến ${config.maxGuests}.`;
      }
      if (events.length && selectedEvents.length === 0) {
        nextErrors.events = "Vui lòng chọn ít nhất một sự kiện.";
      }
    }

    if (message.length > 500) nextErrors.message = "Lời nhắn không được vượt quá 500 ký tự.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmittedGuest(guestName);
  }

  if (submittedGuest) {
    return (
      <div className="mx-auto max-w-xl border-y border-[var(--color-border)] py-12 text-center" role="status">
        <p className="text-eyebrow mb-5">Đã xác nhận</p>
        <h3 className="font-[family-name:var(--font-serif)] text-[clamp(2.25rem,6vw,3.5rem)] leading-tight">{config.successTitle}</h3>
        <p className="mt-3 font-[family-name:var(--font-serif)] text-xl text-[var(--color-primary)]">{submittedGuest}</p>
        <div className="my-7"><Divider /></div>
        <p className="mx-auto max-w-md leading-7 text-[var(--color-muted)]">{config.successMessage}</p>
        <Button className="mt-8" variant="text" onClick={() => setSubmittedGuest(null)}>Gửi hồi đáp khác</Button>
      </div>
    );
  }

  return (
    <form className="mx-auto max-w-2xl" noValidate onSubmit={handleSubmit}>
      <div>
        <label className="field-label" htmlFor="guestName">Họ và tên</label>
        <input
          className="field-control"
          id="guestName"
          name="guestName"
          type="text"
          autoComplete="name"
          placeholder="Tên của bạn"
          aria-invalid={Boolean(errors.guestName)}
          aria-describedby={errors.guestName ? "guestName-error" : undefined}
        />
        <FieldError id="guestName-error" message={errors.guestName} />
      </div>

      <fieldset className="mt-8" aria-describedby={errors.attendance ? "attendance-error" : undefined}>
        <legend className="field-label">Bạn có thể tham dự không?</legend>
        <div className="grid gap-px border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2">
          <label className="flex min-h-16 cursor-pointer items-center gap-3 bg-[var(--color-surface)] px-5 py-4">
            <input className="size-4 accent-[var(--color-primary)]" type="radio" name="attendance" value="attending" checked={attendance === "attending"} onChange={() => setAttendance("attending")} />
            <span className="text-sm">Có, mình sẽ tham dự</span>
          </label>
          <label className="flex min-h-16 cursor-pointer items-center gap-3 bg-[var(--color-surface)] px-5 py-4">
            <input className="size-4 accent-[var(--color-primary)]" type="radio" name="attendance" value="declined" checked={attendance === "declined"} onChange={() => setAttendance("declined")} />
            <span className="text-sm">Rất tiếc, mình không thể</span>
          </label>
        </div>
        <FieldError id="attendance-error" message={errors.attendance} />
      </fieldset>

      {attendance === "attending" && (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="guestCount">Số người tham dự</label>
            <select className="field-control" id="guestCount" name="guestCount" defaultValue="1" aria-invalid={Boolean(errors.guestCount)} aria-describedby={errors.guestCount ? "guestCount-error" : undefined}>
              {Array.from({ length: config.maxGuests }, (_, index) => index + 1).map((count) => <option value={count} key={count}>{count} người</option>)}
            </select>
            <FieldError id="guestCount-error" message={errors.guestCount} />
          </div>

          {events.length > 0 && (
            <fieldset aria-describedby={errors.events ? "events-error" : undefined}>
              <legend className="field-label">Sự kiện tham dự</legend>
              <div className="space-y-3 pt-2">
                {events.map((weddingEvent) => (
                  <label className="flex cursor-pointer items-center gap-3" key={weddingEvent.id}>
                    <input className="size-4 accent-[var(--color-primary)]" type="checkbox" name="events" value={weddingEvent.id} />
                    <span className="text-sm">{weddingEvent.title}</span>
                  </label>
                ))}
              </div>
              <FieldError id="events-error" message={errors.events} />
            </fieldset>
          )}
        </div>
      )}

      {config.allowMessage && (
        <div className="mt-8">
          <label className="field-label" htmlFor="message">Lời nhắn <span className="font-normal normal-case text-[var(--color-muted)]">(không bắt buộc)</span></label>
          <textarea className="field-control min-h-32 resize-y" id="message" name="message" maxLength={500} placeholder="Chúc hai bạn trăm năm hạnh phúc nhé! ❤️" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-hint"} />
          <p className="mt-2 text-xs text-[var(--color-muted)]" id="message-hint">Tối đa 500 ký tự</p>
          <FieldError id="message-error" message={errors.message} />
        </div>
      )}

      <div className="mt-10 text-center">
        <Button className="min-w-44 uppercase" type="submit">{config.submitLabel}</Button>
        <p className="py-2 mt-4 text-xs text-[var(--color-muted)]">Thông tin chỉ được dùng để chuẩn bị chu đáo cho ngày cưới.</p>
      </div>
    </form>
  );
}
