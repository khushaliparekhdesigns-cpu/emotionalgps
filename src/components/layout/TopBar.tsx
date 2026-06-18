import { Bell, Command, Plus, Search } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Logo } from "./Logo";

type TopBarProps = {
  onQuickCreate: () => void;
};

export function TopBar({ onQuickCreate }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 -mx-4 border-b border-studio-line bg-studio-bg/85 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="md:hidden">
          <Logo />
        </div>
        <div className="relative hidden min-w-0 flex-1 md:block">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-studio-soft"
          />
          <Input
            aria-label="Search workspace"
            className="pl-9"
            placeholder="Search clients, briefs, notes..."
          />
          <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-studio-line bg-studio-panel px-1.5 py-0.5 text-[11px] text-studio-soft lg:flex">
            <Command aria-hidden="true" className="h-3 w-3" /> K
          </div>
        </div>
        <Button className="ml-auto md:ml-0" onClick={onQuickCreate} variant="primary">
          <Plus aria-hidden="true" className="h-4 w-4" />
          <span className="hidden sm:inline">Quick create</span>
        </Button>
        <Button className="h-10 w-10 rounded-xl p-0" variant="secondary">
          <Bell aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  );
}
