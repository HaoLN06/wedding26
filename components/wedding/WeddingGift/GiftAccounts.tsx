"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { GiftAccount, Person } from "@/types/wedding";
import { editorialEase, fadeUp } from "@/lib/motion";

type GiftAccountsProps = {
  accounts: GiftAccount[];
  bride: Person;
  groom: Person;
};

const roleLabels: Record<Person["role"], string> = {
  bride: "Cô dâu",
  groom: "Chú rể",
};

function isPlaceholder(value: string): boolean {
  return value.startsWith("[") && value.endsWith("]");
}

function Portrait({ person }: { person: Person }) {
  return (
    <div className="relative mx-auto aspect-square w-36 rounded-full border-[7px] border-dashed border-[color-mix(in_srgb,var(--color-primary)_45%,transparent)] p-2 sm:w-40 lg:w-48">
      <div className="relative h-full overflow-hidden rounded-full bg-[var(--color-border)]">
        {person.image ? (
          <Image
            src={person.image}
            alt={`Chân dung ${roleLabels[person.role].toLowerCase()} ${person.fullName}`}
            fill
            sizes="(max-width: 639px) 128px, (max-width: 1023px) 144px, 176px"
            className={`object-cover ${person.role === "bride" ? "object-[62%_38%]" : "object-[43%_38%]"}`}
          />
        ) : (
          <div className="grid h-full place-items-center bg-[var(--color-surface)]" role="img" aria-label={`Chưa có ảnh của ${person.fullName}`}>
            <span className="font-[family-name:var(--font-serif)] text-5xl italic text-[var(--color-primary)]" aria-hidden="true">{person.firstName.charAt(0)}</span>
          </div>
        )}
      </div>
      <span className="absolute right-0 bottom-3 grid size-8 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] font-[family-name:var(--font-serif)] text-xs italic text-[var(--color-primary)]" aria-hidden="true">&amp;</span>
    </div>
  );
}

function QrVisual({ account }: { account: GiftAccount }) {
  return (
    <div className="relative mx-auto grid aspect-square w-28 shrink-0 place-items-center overflow-hidden border border-[var(--color-border)] bg-[var(--color-background)] sm:w-32">
      {account.qrImage ? (
        <Image src={account.qrImage} alt={`Mã QR mừng cưới ${account.label}`} fill sizes="128px" className="object-contain p-2" />
      ) : (
        <div className="grid h-full w-full p-2" role="img" aria-label={`Mã QR giả định cho ${account.label}`}>
          <div className="grid h-full w-full grid-cols-7 gap-[2px] bg-white p-[3px]">
            {Array.from({ length: 49 }, (_, index) => {
              const dark = ((index * 17 + 9) % 5 === 0) || [0, 1, 7, 8, 40, 41, 47, 48].includes(index);
              return <span className={dark ? "bg-[var(--color-foreground)]" : "bg-white"} key={index} />;
            })}
          </div>
          <span className="mt-1 block text-center text-[0.5rem] font-semibold tracking-[0.1em] text-[var(--color-muted)] uppercase">QR giả định</span>
        </div>
      )}
    </div>
  );
}

export function GiftAccounts({ accounts, bride, groom }: GiftAccountsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);

  async function copyAccount(account: GiftAccount) {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopiedId(account.id);
      setCopyError(null);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setCopyError(account.id);
    }
  }

  if (!accounts.length) {
    return <p className="border-y border-[var(--color-border)] py-10 text-center text-[var(--color-muted)]">Thông tin mừng cưới đang được cập nhật.</p>;
  }

  return (
    <div>
      <div className="text-center">
        <button
          className="inline-flex min-h-12 items-center gap-4 border-y border-[var(--color-border)] px-2 text-xs font-semibold tracking-[0.16em] text-[var(--color-primary)] uppercase transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          type="button"
          aria-expanded={isOpen}
          aria-controls="gift-account-list"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? "Khép thông tin" : "Mở thông tin quà mừng"}
          <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.24, ease: editorialEase }} className="text-base" aria-hidden="true">+</motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="mx-auto mt-14 max-w-5xl space-y-14 md:mt-20 md:space-y-20"
            id="gift-account-list"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 12 }}
            variants={fadeUp}
          >
            {accounts.map((account, index) => {
              const person = account.id === "bride" ? bride : account.id === "groom" ? groom : index % 2 === 0 ? groom : bride;
              const portraitLast = index % 2 === 1;
              const unavailable = isPlaceholder(account.accountNumber);

              return (
                <article
                  className={`grid items-center gap-7 sm:gap-10 lg:gap-14 ${portraitLast ? "sm:grid-cols-[minmax(0,1fr)_10rem] lg:grid-cols-[minmax(0,1fr)_12rem]" : "sm:grid-cols-[10rem_minmax(0,1fr)] lg:grid-cols-[12rem_minmax(0,1fr)]"}`}
                  key={account.id}
                >
                  <div className={portraitLast ? "sm:order-2" : ""}><Portrait person={person} /></div>

                  <div className={`relative border border-[color-mix(in_srgb,var(--color-border)_78%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_92%,var(--color-primary))] px-6 py-8 shadow-[0_12px_32px_rgb(57_46_42_/_7%)] sm:px-8 lg:px-10 ${portraitLast ? "sm:order-1" : ""}`}>
                    <span className={`absolute top-1/2 hidden h-px w-10 bg-[var(--color-primary)]/35 sm:block ${portraitLast ? "-right-10" : "-left-10"}`} aria-hidden="true" />
                    <div className="grid items-center gap-7 sm:grid-cols-[minmax(0,1fr)_auto]">
                      <div className={portraitLast ? "sm:text-right" : ""}>
                        <p className="text-eyebrow mb-3">{account.label} · {roleLabels[person.role]}</p>
                        <h3 className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,4vw,2.6rem)] leading-[1.08] tracking-[-0.02em]">{person.fullName}</h3>
                        <dl className="mt-5 space-y-2 text-sm">
                          <div><dt className="sr-only">Ngân hàng</dt><dd className="font-semibold tracking-[0.04em]">{account.bankName}</dd></div>
                          <div><dt className="sr-only">Chủ tài khoản</dt><dd className="text-[var(--color-muted)]">{account.accountName}</dd></div>
                          <div><dt className="sr-only">Số tài khoản</dt><dd className="break-all font-semibold tracking-[0.08em] text-[var(--color-primary)]">{account.accountNumber}</dd></div>
                        </dl>
                        <button
                          className="mt-5 min-h-10 border-b border-[var(--color-primary)] text-[0.65rem] font-semibold tracking-[0.13em] text-[var(--color-primary)] uppercase transition-colors hover:text-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:border-[var(--color-border)] disabled:text-[var(--color-muted)]"
                          type="button"
                          disabled={unavailable}
                          onClick={() => copyAccount(account)}
                        >
                          {unavailable ? "Đang cập nhật" : copiedId === account.id ? "Đã sao chép" : "Sao chép số tài khoản"}
                        </button>
                        {copyError === account.id && <p className="field-error" role="status">Không thể sao chép. Vui lòng thử lại.</p>}
                      </div>
                      <QrVisual account={account} />
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
