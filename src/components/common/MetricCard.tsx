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
    <Card className="hover:-translate-y-0.5 hover:border-studio-line hover:shadow-[0_1px_1px_rgba(33,31,27,0.04),0_20px_46px_rgba(33,31,27,0.05)]">
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <p className="text-[13px] font-medium text-studio-muted">{label}</p>
          {change ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-studio-purple-soft/76 px-2 py-1 text-[11px] font-medium text-studio-purple">
              {change}
              <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
            </span>
          ) : null}
        </div>
        <p className="mt-5 text-[2rem] font-semibold leading-none tracking-[-0.055em] text-studio-ink">
          {value}
        </p>
        {note ? <p className="mt-3 text-[13px] leading-6 text-studio-muted">{note}</p> : null}
      </CardBody>
    </Card>
  );
}
