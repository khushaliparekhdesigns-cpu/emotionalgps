export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl border border-studio-line/80 bg-white/80 shadow-[0_1px_1px_rgba(33,31,27,0.04)]">
        <div className="h-3.5 w-3.5 rounded-[7px] bg-studio-purple/90" />
      </div>
      <div>
        <p className="font-display text-lg leading-none tracking-[-0.02em] text-studio-ink">
          StudioHQ
        </p>
        <p className="mt-1 text-[11px] text-studio-soft">Design headquarters</p>
      </div>
    </div>
  );
}
