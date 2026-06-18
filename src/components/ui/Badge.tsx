import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: "neutral" | "accent" | "success";
};

const tones = {
  neutral: "border-studio-line/75 bg-studio-panel/70 text-studio-muted",
  accent: "border-studio-purple/15 bg-studio-purple-soft/72 text-studio-purple",
  success: "border-emerald-200/70 bg-emerald-50/70 text-emerald-700",
};

export function Badge({
  children,
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[-0.005em]",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
