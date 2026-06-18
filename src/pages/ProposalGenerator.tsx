import { FileText, WandSparkles } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { proposalSections } from "../data/studioData";

export function ProposalGenerator() {
  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <Card>
        <CardBody>
          <h2 className="font-display text-3xl leading-none tracking-[-0.02em] text-studio-ink">
            Proposal intake
          </h2>
          <p className="mt-2 text-sm leading-6 text-studio-muted">
            Lightweight inputs for a future AI-generated proposal draft.
          </p>
          <div className="mt-5 space-y-4">
            <Input label="Client" placeholder="Atlas Mobile" />
            <Input label="Project type" placeholder="Product onboarding redesign" />
            <Input label="Budget signal" placeholder="$20k - $30k" />
          </div>
          <Button className="mt-5 w-full" variant="primary">
            <WandSparkles aria-hidden="true" className="h-4 w-4" />
            Generate draft
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <Badge tone="accent">Preview</Badge>
              <h2 className="mt-3 font-display text-4xl leading-[0.95] tracking-[-0.025em] text-studio-ink">
                Product onboarding redesign proposal
              </h2>
            </div>
            <Button size="sm" variant="secondary">
              Export
            </Button>
          </div>
          <div className="space-y-3">
            {proposalSections.map((section, index) => (
              <div
                className="flex gap-4 rounded-2xl border border-studio-line/70 bg-studio-panel/48 p-4"
                key={section}
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/70 text-sm font-semibold text-studio-purple">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <FileText aria-hidden="true" className="h-4 w-4 text-studio-soft" />
                    <h3 className="font-display text-2xl leading-none tracking-[-0.02em] text-studio-ink">
                      {section}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-studio-muted">
                    Placeholder copy will become structured proposal content generated from client context, prior projects, and scope preferences.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
