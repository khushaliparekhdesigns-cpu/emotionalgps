import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ className, label, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-studio-soft">
          {label}
        </span>
      ) : null}
      <input
        className={cn(
          "h-10 w-full rounded-xl border border-studio-line/85 bg-white/72 px-3 text-sm text-studio-ink outline-none",
          "placeholder:text-studio-soft transition duration-200 ease-out",
          "focus:border-studio-purple/60 focus:ring-4 focus:ring-studio-purple/10",
          className,
        )}
        id={inputId}
        {...props}
      />
    </label>
  );
}
