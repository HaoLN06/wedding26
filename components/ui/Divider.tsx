import { HoaSen } from "./QuanHoIcons";

export function Divider() {
  return (
    <div className="mx-auto flex w-32 items-center gap-3 text-[var(--color-primary)]" aria-hidden="true">
      <span className="h-px flex-1 bg-[var(--color-border)]" />
      <HoaSen size={18} />
      <span className="h-px flex-1 bg-[var(--color-border)]" />
    </div>
  );
}
