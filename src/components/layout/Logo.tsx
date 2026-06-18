export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl border border-studio-line bg-white shadow-sm">
        <div className="h-3.5 w-3.5 rounded-[6px] bg-studio-purple" />
      </div>
      <div>
        <p className="text-sm font-semibold tracking-[-0.03em] text-studio-ink">
          StudioHQ
        </p>
        <p className="text-xs text-studio-soft">Design headquarters</p>
      </div>
    </div>
  );
}
