import { IconChevronRight } from "@tabler/icons-react";
import { routes } from "../../data/navigation";
import type { StudioRoute } from "../../data/navigation";
import { cn } from "../../lib/utils";
import { Logo } from "./Logo";

type SidebarProps = {
  activeRoute: StudioRoute;
  onNavigate: (path: string) => void;
};

export function Sidebar({ activeRoute, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-white/[0.10] bg-[#081B33] px-4 py-5 md:sticky md:top-0 md:flex md:flex-col">
      <Logo variant="light" />

      <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Primary navigation">
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = route.key === activeRoute.key;

          return (
            <button
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition duration-200 ease-out",
                isActive
                  ? "bg-[#31C7B7] text-[#061B33] shadow-sm shadow-[#31C7B7]/20"
                  : "text-white/[0.62] hover:bg-white/[0.08] hover:text-white",
              )}
              key={route.key}
              onClick={() => onNavigate(route.path)}
              type="button"
            >
              <Icon
                aria-hidden="true"
                className={cn(
                  "h-4 w-4 transition duration-200",
                  isActive ? "text-[#061B33]" : "text-white/[0.42] group-hover:text-white/[0.80]",
                )}
              />
              <span className="min-w-0 flex-1 truncate">{route.label}</span>
              {isActive ? (
                <IconChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-[#061B33]/60" />
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="rounded-2xl border border-white/[0.10] bg-white/[0.06] p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#31C7B7]">
          Today requires attention
        </p>
        <p className="mt-2 text-sm leading-6 text-white/[0.62]">
          6 conversations are awaiting reply, 4 returns are due, and 3 cars need cleaning before pickup.
        </p>
      </div>
    </aside>
  );
}
