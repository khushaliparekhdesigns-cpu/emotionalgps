import type { ReactNode } from "react";
import type { StudioRoute } from "../../data/navigation";

type PageHeaderProps = {
  actions?: ReactNode;
  route: StudioRoute;
};

export function PageHeader({ actions, route }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-end sm:justify-between lg:py-10">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-studio-soft">
          StudioHQ
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-studio-ink sm:text-4xl">
          {route.label}
        </h1>
        <p className="mt-3 text-sm leading-6 text-studio-muted sm:text-base">
          {route.description}
        </p>
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
