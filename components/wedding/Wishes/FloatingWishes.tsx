"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { WishesConfig } from "@/types/wedding";
import { HoaSen } from "@/components/ui/QuanHoIcons";

type WishErrors = { name?: string; message?: string };

export const OPEN_WISHES_POPUP_EVENT = "wedding:open-wishes-popup";

export function FloatingWishes({ config, showTrigger = true }: { config: WishesConfig; showTrigger?: boolean }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<WishErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
      setSubmitted(false);
      setErrors({});
    }

    window.addEventListener(OPEN_WISHES_POPUP_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_WISHES_POPUP_EVENT, handleOpen);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("floatWishName") ?? "").trim();
    const message = String(formData.get("floatWishMessage") ?? "").trim();
    const nextErrors: WishErrors = {};

    if (name.length < 2) nextErrors.name = "Vui lòng nhập tên của bạn.";
    if (message.length < 5) nextErrors.message = "Lời chúc cần có ít nhất 5 ký tự.";
    if (message.length > 300) nextErrors.message = "Lời chúc không được vượt quá 300 ký tự.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitted(true);
    form.reset();
  }

  function handleClose() {
    setOpen(false);
    setSubmitted(false);
    setErrors({});
  }

  return (
    <>
      {/* Floating trigger button */}
      {showTrigger && (
        <button
          className="fixed bottom-5 left-5 z-30 flex items-center gap-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-xs font-semibold tracking-[0.08em] text-[var(--color-muted)] shadow-[var(--shadow-floating)] transition-all duration-[var(--duration-base)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Gửi lời chúc"
        >
          <span>Gửi lời chúc</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </button>
      )}

      {/* Popup overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="Gửi lời chúc">
          <div className="absolute inset-0 bg-[var(--color-foreground)]/30 backdrop-blur-[2px]" onClick={handleClose} />

          <div className="relative mx-4 mb-4 w-full max-w-md overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_20px_60px_rgb(57_46_42/18%)] sm:mb-0">
            {/* Header */}
            <div className="relative border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-primary)_4%,var(--color-surface))] px-6 pb-5 pt-6 text-center">
              <span className="mx-auto mb-4 grid size-12 place-items-center border border-[var(--color-primary)]/30 bg-[var(--color-surface)]" aria-hidden="true">
                <HoaSen size={24} className="text-[var(--color-primary)]" />
              </span>
              <h3 className="font-[family-name:var(--font-serif)] text-2xl tracking-[-0.02em]">Lời chúc</h3>
              <button
                className="absolute top-4 right-4 grid size-8 place-items-center text-[var(--color-muted)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-foreground)]"
                type="button"
                onClick={handleClose}
                aria-label="Đóng"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 pb-6 pt-5">
              {submitted ? (
                <div className="py-4 text-center">
                  <HoaSen size={40} className="mx-auto text-[var(--color-primary)]" />
                  <p className="mt-4 font-[family-name:var(--font-serif)] text-xl">Cảm ơn bạn!</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Lời chúc đã được ghi nhận.</p>
                  <button
                    className="mt-6 text-sm font-medium text-[var(--color-primary)] underline decoration-[var(--color-border)] underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-primary-hover)] hover:decoration-current"
                    type="button"
                    onClick={() => setSubmitted(false)}
                  >
                    Gửi lời chúc khác
                  </button>
                </div>
              ) : (
                <form className="space-y-5" noValidate onSubmit={handleSubmit}>
                  <div>
                    <label className="field-label" htmlFor="floatWishName">Tên của bạn</label>
                    <input
                      className="field-control"
                      id="floatWishName"
                      name="floatWishName"
                      type="text"
                      placeholder="Tên của bạn"
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "floatWishName-error" : undefined}
                    />
                    {errors.name && <p className="field-error" id="floatWishName-error" role="alert">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="field-label" htmlFor="floatWishMessage">Lời chúc</label>
                    <textarea
                      className="field-control min-h-28 resize-y"
                      id="floatWishMessage"
                      name="floatWishMessage"
                      rows={4}
                      maxLength={300}
                      placeholder="Lời chúc của bạn"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "floatWishMessage-error" : "floatWishMessage-hint"}
                    />
                    <p className="mt-1.5 text-xs text-[var(--color-muted)]" id="floatWishMessage-hint">Tối đa 300 ký tự</p>
                    {errors.message && <p className="field-error" id="floatWishMessage-error" role="alert">{errors.message}</p>}
                  </div>
                  <button
                    className="inline-flex min-h-[var(--control-height)] w-full items-center justify-center border border-[var(--color-primary)] bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold tracking-[0.04em] text-[var(--color-surface)] transition-colors duration-[var(--duration-base)] hover:border-[var(--color-primary-hover)] hover:bg-[var(--color-primary-hover)] active:scale-[0.98]"
                    type="submit"
                  >
                    {config.submitLabel}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
