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
    "border-studio-purple bg-studio-purple text-white shadow-sm shadow-studio-purple/20 hover:bg-[#695bdd]",
  secondary:
    "border-studio-line bg-white text-studio-ink shadow-sm hover:border-studio-soft/60 hover:bg-studio-panel",
  ghost:
    "border-transparent bg-transparent text-studio-muted hover:bg-white/70 hover:text-studio-ink",
  quiet:
    "border-transparent bg-studio-purple-soft text-studio-purple hover:bg-[#e9e5ff]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 rounded-lg px-3 text-xs",
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
        "inline-flex items-center justify-center border font-medium tracking-[-0.01em] transition duration-200 ease-out",
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
