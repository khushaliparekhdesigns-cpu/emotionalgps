import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { MetricCard } from "../components/common/MetricCard";
import { SectionTitle } from "../components/common/SectionTitle";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { clients, dashboardStats, todaysFocus } from "../data/studioData";

export function Dashboard() {
  return (
    <div className="space-y-7">
      <div className="grid gap-4 lg:grid-cols-3">
        {dashboardStats.map((stat) => (
          <MetricCard
            change={stat.change}
            key={stat.label}
            label={stat.label}
            note={stat.detail}
            value={stat.value}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.28fr_0.72fr]">
        <Card>
          <CardBody>
            <SectionTitle
              action={
                <Button size="sm" variant="ghost">
                  View all
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Button>
              }
              eyebrow="Pipeline"
              title="Active client work"
            />
            <div className="space-y-3">
              {clients.map((client) => (
                <div
                  className="rounded-2xl border border-studio-line/70 bg-studio-panel/48 p-4 transition duration-200 hover:border-studio-soft/45 hover:bg-white/72"
                  key={client.name}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-2xl leading-none tracking-[-0.02em] text-studio-ink">
                        {client.name}
                      </h3>
                      <p className="mt-2 text-[13px] text-studio-muted">{client.project}</p>
                    </div>
                    <p className="text-sm font-semibold tracking-[-0.02em] text-studio-ink">{client.value}</p>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 text-[13px] text-studio-muted sm:flex-row sm:items-center sm:justify-between">
                    <span>{client.status}</span>
                    <span>{client.nextStep}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="bg-studio-warm/78">
          <CardBody>
            <div className="flex items-center gap-2 text-sm font-medium text-studio-muted">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-studio-purple" />
              Studio briefing
            </div>
            <h2 className="mt-5 font-display text-4xl leading-[0.95] tracking-[-0.025em] text-studio-ink">
              Protect deep work while keeping revenue moving.
            </h2>
            <p className="mt-4 text-sm leading-6 text-studio-muted">
              Three items need attention before tomorrow's client block.
            </p>
            <div className="mt-6 space-y-3">
              {todaysFocus.map((item) => (
                <div className="flex gap-3 rounded-2xl border border-studio-line/65 bg-white/54 p-3" key={item}>
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-studio-purple" />
                  <p className="text-sm leading-5 text-studio-muted">{item}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
