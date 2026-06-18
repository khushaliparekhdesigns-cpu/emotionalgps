import { FileCheck2, Plus } from "lucide-react";
import { EmptyState } from "../components/ui/EmptyState";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { knowledgeItems } from "../data/studioData";

export function KnowledgeBase() {
  return (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-3xl leading-none tracking-[-0.02em] text-studio-ink">
                Studio operating system
              </h2>
              <p className="mt-2 text-sm text-studio-muted">
                Reusable templates and context for consistent client delivery.
              </p>
            </div>
            <Button variant="primary">
              <Plus aria-hidden="true" className="h-4 w-4" />
              New doc
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {knowledgeItems.map((item) => (
              <article
                className="rounded-2xl border border-studio-line/70 bg-studio-panel/48 p-4 transition duration-200 hover:border-studio-soft/45 hover:bg-white/72"
                key={item.title}
              >
                <FileCheck2 aria-hidden="true" className="h-5 w-5 text-studio-purple" />
                <h3 className="mt-4 font-display text-2xl leading-none tracking-[-0.02em] text-studio-ink">
                  {item.title}
                </h3>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <Badge>{item.category}</Badge>
                  <span className="text-xs text-studio-soft">{item.updated}</span>
                </div>
              </article>
            ))}
          </div>
        </CardBody>
      </Card>

      <EmptyState
        action="Connect notes"
        eyebrow="Future memory"
        title="Centralize calls, decisions, and repeatable processes."
      >
        This page is ready for integrations with notes, call transcripts, project docs, and client-specific AI context.
      </EmptyState>
    </div>
  );
}
