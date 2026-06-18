import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./Button";
import { Card, CardBody } from "./Card";

type EmptyStateProps = {
  action?: string;
  children?: ReactNode;
  eyebrow: string;
  title: string;
};

export function EmptyState({ action, children, eyebrow, title }: EmptyStateProps) {
  return (
    <Card className="border-dashed bg-studio-panel/70">
      <CardBody className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-studio-soft">
            {eyebrow}
          </p>
          <h3 className="mt-2 text-base font-semibold tracking-[-0.02em] text-studio-ink">
            {title}
          </h3>
          {children ? (
            <p className="mt-2 max-w-xl text-sm leading-6 text-studio-muted">
              {children}
            </p>
          ) : null}
        </div>
        {action ? (
          <Button className="shrink-0" variant="secondary">
            {action}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        ) : null}
      </CardBody>
    </Card>
  );
}
