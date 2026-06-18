import { Calculator, SlidersHorizontal } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { pricingScenarios } from "../data/studioData";

export function PricingCalculator() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardBody>
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-studio-line/75 bg-studio-panel/64">
            <Calculator aria-hidden="true" className="h-5 w-5 text-studio-purple" />
          </div>
          <h2 className="mt-5 font-display text-4xl leading-none tracking-[-0.02em] text-studio-ink">
            Scope inputs
          </h2>
          <p className="mt-2 text-sm leading-6 text-studio-muted">
            A clean pricing foundation for future formulas around rate, complexity, risk, and margin.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Input label="Weekly capacity" placeholder="24 hours" />
            <Input label="Project length" placeholder="6 weeks" />
            <Input label="Complexity" placeholder="Medium" />
            <Input label="Risk buffer" placeholder="15%" />
          </div>
          <Button className="mt-5" variant="primary">
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
            Calculate scenario
          </Button>
        </CardBody>
      </Card>

      <div className="space-y-4">
        {pricingScenarios.map((scenario) => (
          <Card className="hover:-translate-y-0.5 hover:border-studio-line hover:shadow-[0_1px_1px_rgba(33,31,27,0.04),0_20px_46px_rgba(33,31,27,0.05)]" key={scenario.package}>
            <CardBody>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Badge tone="accent">{scenario.margin} margin</Badge>
                  <h3 className="mt-3 font-display text-3xl leading-none tracking-[-0.02em] text-studio-ink">
                    {scenario.package}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-studio-muted">{scenario.scope}</p>
                </div>
                <p className="text-2xl font-semibold tracking-[-0.05em] text-studio-ink">
                  {scenario.price}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
