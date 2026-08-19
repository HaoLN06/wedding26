import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "text";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant };
type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant };

const variants: Record<ButtonVariant, string> = {
  primary: "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-surface)] hover:border-[var(--color-primary-hover)] hover:bg-[var(--color-primary-hover)] active:border-[var(--color-primary-hover)] active:bg-[var(--color-primary-hover)]",
  secondary: "border-[var(--color-border)] bg-transparent text-[var(--color-foreground)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
  text: "border-transparent bg-transparent px-2 text-[var(--color-primary)] underline decoration-[var(--color-border)] underline-offset-4 hover:text-[var(--color-primary-hover)]",
};

function getButtonClassName(variant: ButtonVariant, className: string): string {
  return `inline-flex min-h-[var(--control-height)] items-center justify-center border px-6 py-3 text-sm font-semibold tracking-[0.04em] transition-colors duration-[var(--duration-base)] disabled:cursor-wait disabled:opacity-65 ${variants[variant]} ${className}`;
}

export function Button({ className = "", variant = "primary", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={getButtonClassName(variant, className)} {...props} />;
}

export function ButtonLink({ className = "", variant = "secondary", ...props }: ButtonLinkProps) {
  return <a className={getButtonClassName(variant, className)} {...props} />;
}
