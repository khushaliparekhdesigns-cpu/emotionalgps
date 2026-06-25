import { cn } from "../../lib/utils";

type LogoProps = {
  variant?: "light" | "dark";
};

export function Logo({ variant = "dark" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "grid h-9 w-9 place-items-center rounded-xl border shadow-sm",
          isLight ? "border-white/[0.10] bg-white/[0.10]" : "border-studio-line bg-white",
        )}
      >
        <div className="h-4 w-4 rounded-[7px] bg-[#31C7B7] shadow-[inset_0_0_0_4px_rgba(255,255,255,0.18)]" />
      </div>
      <div>
        <p
          className={cn(
            "text-sm font-semibold tracking-[-0.03em]",
            isLight ? "text-white" : "text-studio-ink",
          )}
        >
          Dreamz UAE
        </p>
        <p className={cn("text-xs", isLight ? "text-white/[0.55]" : "text-studio-soft")}>
          Dubai rental operations
        </p>
      </div>
    </div>
  );
}
