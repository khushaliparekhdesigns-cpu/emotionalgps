import { ChevronRight } from "lucide-react";
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
    <aside className="hidden h-screen w-[264px] shrink-0 border-r border-studio-line/70 bg-studio-panel/55 px-4 py-5 md:sticky md:top-0 md:flex md:flex-col">
      <Logo />

      <nav className="mt-9 flex flex-1 flex-col gap-1" aria-label="Primary navigation">
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = route.key === activeRoute.key;

          return (
            <button
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition duration-200 ease-out",
                isActive
                  ? "bg-white/78 text-studio-ink shadow-[0_1px_1px_rgba(33,31,27,0.04)] ring-1 ring-studio-line/75"
                  : "text-studio-muted hover:bg-white/55 hover:text-studio-ink",
              )}
              key={route.key}
              onClick={() => onNavigate(route.path)}
              type="button"
            >
              <Icon
                aria-hidden="true"
                className={cn(
                  "h-[15px] w-[15px] transition duration-200",
                  isActive ? "text-studio-purple" : "text-studio-soft group-hover:text-studio-muted",
                )}
              />
              <span className="min-w-0 flex-1 truncate">{route.label}</span>
              {isActive ? (
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-studio-soft/80" />
              ) : null}
            </button>
          );
        })}
      </nav>

      <div className="rounded-[20px] border border-studio-line/75 bg-white/62 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-studio-soft">
          AI workspace
        </p>
        <p className="mt-2 text-[13px] leading-6 text-studio-muted">
          Draft better scopes, keep client knowledge close, and protect your design focus.
        </p>
      </div>
    </aside>
  );
}
