type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ title, eyebrow, description, align = "center" }: SectionHeadingProps) {
  return (
    <header className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="text-eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-heading">{title}</h2>
      {description && <p className="text-body-lg mt-5 text-[var(--color-muted)]">{description}</p>}
    </header>
  );
}
