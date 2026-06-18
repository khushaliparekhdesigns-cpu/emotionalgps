import { TrendingUp } from "lucide-react";
import { MetricCard } from "../components/common/MetricCard";
import { Card, CardBody } from "../components/ui/Card";
import { businessMetrics } from "../data/studioData";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const barHeights = ["42%", "58%", "48%", "74%", "66%", "84%"];

export function BusinessDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {businessMetrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            note={metric.note}
            value={metric.value}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardBody>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold tracking-[-0.02em] text-studio-ink">
                  Revenue rhythm
                </h2>
                <p className="mt-1 text-sm text-studio-muted">
                  Placeholder chart for tracking bookings and retainers.
                </p>
              </div>
              <TrendingUp aria-hidden="true" className="h-5 w-5 text-studio-purple" />
            </div>
            <div className="flex h-72 items-end gap-3 rounded-2xl border border-studio-line bg-studio-panel p-4">
              {months.map((month, index) => (
                <div className="flex h-full flex-1 flex-col justify-end gap-3" key={month}>
                  <div
                    className="rounded-t-2xl bg-studio-purple/78 transition duration-300 hover:bg-studio-purple"
                    style={{ height: barHeights[index] }}
                  />
                  <p className="text-center text-xs font-medium text-studio-soft">{month}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-base font-semibold tracking-[-0.02em] text-studio-ink">
              Operating signals
            </h2>
            <div className="mt-5 space-y-4">
              {[
                ["Lead quality", "Strong", "3 qualified inbound leads this month"],
                ["Capacity", "Balanced", "Room for one focused sprint"],
                ["Proposal velocity", "Fast", "Average draft within 24 hours"],
              ].map(([label, value, note]) => (
                <div className="rounded-2xl border border-studio-line bg-studio-panel/70 p-4" key={label}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-studio-muted">{label}</p>
                    <p className="text-sm font-semibold text-studio-purple">{value}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-studio-ink">{note}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
