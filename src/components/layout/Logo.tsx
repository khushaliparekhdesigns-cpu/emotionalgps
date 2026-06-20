export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl border border-studio-line bg-white shadow-sm">
        <div className="h-4 w-4 rounded-[7px] bg-studio-ink shadow-[inset_0_0_0_4px_rgba(255,255,255,0.18)]" />
      </div>
      <div>
        <p className="text-sm font-semibold tracking-[-0.03em] text-studio-ink">
          Dreamz UAE
        </p>
        <p className="text-xs text-studio-soft">Dubai rental operations</p>
      </div>
    </div>
  );
}
