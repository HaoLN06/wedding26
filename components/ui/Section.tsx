import type { ComponentPropsWithoutRef } from "react";

type SectionWidth = "reading" | "content" | "wide";
type SectionProps = ComponentPropsWithoutRef<"section"> & { width?: SectionWidth; surface?: boolean };

const widths: Record<SectionWidth, string> = {
  reading: "max-w-[var(--container-reading)]",
  content: "max-w-[var(--container-content)]",
  wide: "max-w-[var(--container-wide)]",
};

export function Section({ children, className = "", width = "content", surface = false, ...props }: SectionProps) {
  return (
    <section className={`py-[var(--section-space-md)] ${surface ? "bg-[var(--color-surface)]" : ""} ${className}`} {...props}>
      <div className={`mx-auto w-full px-[var(--page-gutter)] ${widths[width]}`}>{children}</div>
    </section>
  );
}
