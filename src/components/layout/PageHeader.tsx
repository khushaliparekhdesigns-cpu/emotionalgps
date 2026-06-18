import type { ReactNode } from "react";
import type { StudioRoute } from "../../data/navigation";

type PageHeaderProps = {
  actions?: ReactNode;
  route: StudioRoute;
};

export function PageHeader({ actions, route }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between lg:py-12">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-studio-soft">
          StudioHQ
        </p>
        <h1 className="mt-3 font-display text-5xl leading-[0.95] tracking-[-0.025em] text-studio-ink sm:text-6xl">
          {route.label}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-studio-muted">
          {route.description}
        </p>
      </div>
      {actions ? <div className="flex flex-wrap gap-2.5">{actions}</div> : null}
    </div>
  );
}
