import { routes } from "../../data/navigation";
import type { StudioRoute } from "../../data/navigation";
import { cn } from "../../lib/utils";

type MobileNavProps = {
  activeRoute: StudioRoute;
  onNavigate: (path: string) => void;
};

export function MobileNav({ activeRoute, onNavigate }: MobileNavProps) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="studio-scrollbar -mx-4 flex gap-2 overflow-x-auto border-b border-studio-line/65 bg-studio-panel/58 px-4 py-3 md:hidden"
    >
      {routes.map((route) => {
        const Icon = route.icon;
        const isActive = route.key === activeRoute.key;

        return (
          <button
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition duration-200",
              isActive
                ? "border-studio-purple/15 bg-studio-purple-soft/80 text-studio-purple"
                : "border-studio-line/75 bg-white/70 text-studio-muted",
            )}
            key={route.key}
            onClick={() => onNavigate(route.path)}
            type="button"
          >
            <Icon aria-hidden="true" className="h-3.5 w-3.5" />
            {route.label}
          </button>
        );
      })}
    </nav>
  );
}
