import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "quiet";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-studio-purple/90 bg-studio-purple text-white shadow-[0_1px_1px_rgba(33,31,27,0.08),0_8px_20px_rgba(116,98,214,0.16)] hover:bg-[#6858c8]",
  secondary:
    "border-studio-line bg-white/80 text-studio-ink shadow-[0_1px_1px_rgba(33,31,27,0.04)] hover:border-studio-soft/50 hover:bg-white",
  ghost:
    "border-transparent bg-transparent text-studio-muted hover:bg-white/60 hover:text-studio-ink",
  quiet:
    "border-transparent bg-studio-purple-soft/80 text-studio-purple hover:bg-studio-purple-soft",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 rounded-[10px] px-3 text-xs",
  md: "h-10 gap-2 rounded-xl px-4 text-sm",
  lg: "h-11 gap-2.5 rounded-xl px-5 text-sm",
};

export function Button({
  children,
  className,
  variant = "secondary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center border font-medium tracking-[-0.012em] transition duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-studio-purple/35 focus-visible:ring-offset-2 focus-visible:ring-offset-studio-bg",
        "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
