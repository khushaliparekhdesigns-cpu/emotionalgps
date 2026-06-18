import { Play, Sparkles } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { aiTools } from "../data/studioData";

export function AIStudio() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
      <Card>
        <CardBody>
          <div className="flex items-center gap-2">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-studio-purple" />
            <Badge tone="accent">AI workspace</Badge>
          </div>
          <h2 className="mt-5 font-display text-4xl leading-[0.95] tracking-[-0.025em] text-studio-ink">
            Start from context, not a blank page.
          </h2>
          <p className="mt-4 text-sm leading-6 text-studio-muted">
            StudioHQ gives product designers focused AI tools for the recurring work around freelancing: proposals, briefs, critique, and synthesis.
          </p>
          <div className="mt-7 rounded-2xl border border-studio-line/70 bg-studio-panel/58 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-studio-soft">
              Prompt starter
            </p>
            <p className="mt-3 text-sm leading-6 text-studio-ink">
              Create a calm project plan for a B2B SaaS dashboard redesign, including discovery questions, risks, milestones, and deliverables.
            </p>
          </div>
          <Button className="mt-5" variant="primary">
            Run assistant
            <Play aria-hidden="true" className="h-4 w-4" />
          </Button>
        </CardBody>
      </Card>

      <div className="grid gap-4">
        {aiTools.map((tool) => (
          <Card className="hover:-translate-y-0.5 hover:border-studio-line hover:shadow-[0_1px_1px_rgba(33,31,27,0.04),0_20px_46px_rgba(33,31,27,0.05)]" key={tool.title}>
            <CardBody className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-3xl leading-none tracking-[-0.02em] text-studio-ink">
                  {tool.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-studio-muted">
                  {tool.description}
                </p>
                <p className="mt-4 rounded-xl border border-studio-line/65 bg-studio-panel/54 px-3 py-2 text-xs leading-5 text-studio-muted">
                  {tool.prompt}
                </p>
              </div>
              <Button className="shrink-0" size="sm" variant="secondary">
                Open
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
