import { useEffect, useMemo, useState } from "react";
import { CalendarPlus, Sparkles } from "lucide-react";
import { AppShell } from "./components/layout/AppShell";
import { PageHeader } from "./components/layout/PageHeader";
import { Button } from "./components/ui/Button";
import { getRouteByPath } from "./data/navigation";
import type { StudioRoute } from "./data/navigation";
import { RentalOperations } from "./pages/RentalOperations";

function useStudioRouter() {
  const [activeRoute, setActiveRoute] = useState<StudioRoute>(() =>
    getRouteByPath(window.location.pathname),
  );

  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(getRouteByPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path === window.location.pathname) {
      return;
    }

    window.history.pushState({}, "", path);
    setActiveRoute(getRouteByPath(path));
  };

  return { activeRoute, navigate };
}

export default function App() {
  const { activeRoute, navigate } = useStudioRouter();
  const activePage = useMemo(
    () => <RentalOperations routeKey={activeRoute.key} />,
    [activeRoute.key],
  );

  return (
    <AppShell activeRoute={activeRoute} onNavigate={navigate}>
      <PageHeader
        actions={
          <>
            <Button variant="secondary">
              <CalendarPlus aria-hidden="true" className="h-4 w-4" />
              New booking
            </Button>
            <Button variant="quiet">
              <Sparkles aria-hidden="true" className="h-4 w-4" />
              Ask ops
            </Button>
          </>
        }
        route={activeRoute}
      />
      {activePage}
    </AppShell>
  );
}
