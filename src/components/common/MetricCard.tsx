import { ArrowUpRight } from "lucide-react";
import { Card, CardBody } from "../ui/Card";

type MetricCardProps = {
  change?: string;
  label: string;
  note?: string;
  value: string;
};

export function MetricCard({ change, label, note, value }: MetricCardProps) {
  return (
    <Card className="hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(29,29,31,0.07)]">
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-medium text-studio-muted">{label}</p>
          {change ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-studio-purple-soft px-2 py-1 text-xs font-medium text-studio-purple">
              {change}
              <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
            </span>
          ) : null}
        </div>
        <p className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-studio-ink">
          {value}
        </p>
        {note ? <p className="mt-2 text-sm text-studio-muted">{note}</p> : null}
      </CardBody>
    </Card>
  );
}
