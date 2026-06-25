import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: "neutral" | "accent" | "success";
};

const tones = {
  neutral: "border-studio-line bg-studio-panel text-studio-muted",
  accent: "border-[#31C7B7]/30 bg-[#E7FAF7] text-[#087A70]",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
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
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
