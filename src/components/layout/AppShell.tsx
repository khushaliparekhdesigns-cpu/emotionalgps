import type { ReactNode } from "react";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import type { StudioRoute } from "../../data/navigation";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Modal } from "../ui/Modal";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

type AppShellProps = {
  activeRoute: StudioRoute;
  children: ReactNode;
  onNavigate: (path: string) => void;
};

export function AppShell({ activeRoute, children, onNavigate }: AppShellProps) {
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);

  return (
    <div className="min-h-screen md:flex">
      <Sidebar activeRoute={activeRoute} onNavigate={onNavigate} />
      <main className="min-w-0 flex-1 px-4 sm:px-6 lg:px-8">
        <TopBar onQuickCreate={() => setQuickCreateOpen(true)} />
        <MobileNav activeRoute={activeRoute} onNavigate={onNavigate} />
        <div className="mx-auto w-full max-w-7xl pb-10">{children}</div>
      </main>

      <Modal
        description="Capture a client, note, proposal idea, or AI task without leaving your current workspace."
        onClose={() => setQuickCreateOpen(false)}
        open={quickCreateOpen}
        title="Quick create"
      >
        <div className="space-y-4">
          <Input label="Title" placeholder="Atlas Mobile proposal update" />
          <Input label="Type" placeholder="Client note, proposal, inspiration..." />
          <div className="rounded-2xl border border-studio-line bg-studio-panel p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-studio-ink">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-studio-purple" />
              AI suggestion
            </div>
            <p className="mt-2 text-sm leading-6 text-studio-muted">
              StudioHQ can turn this into a task, outline, or reusable knowledge item when workflows are connected.
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button onClick={() => setQuickCreateOpen(false)} variant="ghost">
              Cancel
            </Button>
            <Button onClick={() => setQuickCreateOpen(false)} variant="primary">
              Save placeholder
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
