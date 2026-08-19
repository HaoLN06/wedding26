"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { WishesConfig } from "@/types/wedding";
import { Button } from "@/components/ui/Button";

type WishErrors = { name?: string; message?: string };

export function WishesBoard({ config }: { config: WishesConfig }) {
  const [wishes, setWishes] = useState(config.items);
  const [errors, setErrors] = useState<WishErrors>({});
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("wishName") ?? "").trim();
    const message = String(formData.get("wishMessage") ?? "").trim();
    const nextErrors: WishErrors = {};

    if (name.length < 2) nextErrors.name = "Vui lòng nhập tên của bạn.";
    if (message.length < 5) nextErrors.message = "Lời chúc cần có ít nhất 5 ký tự.";
    if (message.length > 300) nextErrors.message = "Lời chúc không được vượt quá 300 ký tự.";

    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length) return;

    setWishes((current) => [{ id: crypto.randomUUID(), name, message }, ...current]);
    setNotice("Lời chúc đã được thêm trong phiên xem hiện tại.");
    form.reset();
  }

  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
      <form className="lg:sticky lg:top-10 lg:self-start" noValidate onSubmit={handleSubmit}>
        <div>
          <label className="field-label" htmlFor="wishName">Tên của bạn</label>
          <input className="field-control" id="wishName" name="wishName" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "wishName-error" : undefined} />
          {errors.name && <p className="field-error" id="wishName-error" role="alert">{errors.name}</p>}
        </div>
        <div className="mt-6">
          <label className="field-label" htmlFor="wishMessage">Lời chúc</label>
          <textarea className="field-control min-h-36 resize-y" id="wishMessage" name="wishMessage" maxLength={300} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "wishMessage-error" : "wishMessage-hint"} />
          <p className="mt-2 text-xs text-[var(--color-muted)]" id="wishMessage-hint">Tối đa 300 ký tự</p>
          {errors.message && <p className="field-error" id="wishMessage-error" role="alert">{errors.message}</p>}
        </div>
        <Button className="mt-7 uppercase" type="submit">{config.submitLabel}</Button>
        {notice && <p className="mt-4 text-sm text-[var(--color-primary)]" role="status">{notice}</p>}
      </form>

      <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]" aria-live="polite">
        {wishes.map((wish, index) => (
          <blockquote className="py-8 first:pt-8 md:px-6 md:py-10" key={wish.id}>
            <span className="font-[family-name:var(--font-serif)] text-4xl leading-none text-[var(--color-accent)]" aria-hidden="true">“</span>
            <p className="mt-2 font-[family-name:var(--font-serif)] text-xl leading-8 md:text-2xl md:leading-9">{wish.message}</p>
            <footer className="mt-5 flex items-center gap-3 text-xs font-semibold tracking-[0.14em] uppercase text-[var(--color-muted)]">
              <span className="h-px w-6 bg-[var(--color-accent)]" aria-hidden="true" />
              {wish.name}
              <span className="sr-only">Lời chúc số {index + 1}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
