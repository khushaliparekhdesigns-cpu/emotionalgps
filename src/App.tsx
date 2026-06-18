import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { AppShell } from "./components/layout/AppShell";
import { PageHeader } from "./components/layout/PageHeader";
import { Button } from "./components/ui/Button";
import { getRouteByPath } from "./data/navigation";
import type { StudioRoute } from "./data/navigation";
import { AIStudio } from "./pages/AIStudio";
import { BusinessDashboard } from "./pages/BusinessDashboard";
import { ClientHub } from "./pages/ClientHub";
import { Dashboard } from "./pages/Dashboard";
import { InspirationLibrary } from "./pages/InspirationLibrary";
import { KnowledgeBase } from "./pages/KnowledgeBase";
import { PricingCalculator } from "./pages/PricingCalculator";
import { ProposalGenerator } from "./pages/ProposalGenerator";

const pageByRoute = {
  dashboard: <Dashboard />,
  clients: <ClientHub />,
  "ai-studio": <AIStudio />,
  knowledge: <KnowledgeBase />,
  inspiration: <InspirationLibrary />,
  proposals: <ProposalGenerator />,
  pricing: <PricingCalculator />,
  business: <BusinessDashboard />,
};

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
  const activePage = useMemo(() => pageByRoute[activeRoute.key], [activeRoute.key]);

  return (
    <AppShell activeRoute={activeRoute} onNavigate={navigate}>
      <PageHeader
        actions={
          <>
            <Button variant="secondary">
              Roadmap
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Button>
            <Button variant="quiet">
              <Sparkles aria-hidden="true" className="h-4 w-4" />
              Ask AI
            </Button>
          </>
        }
        route={activeRoute}
      />
      {activePage}
    </AppShell>
  );
}
