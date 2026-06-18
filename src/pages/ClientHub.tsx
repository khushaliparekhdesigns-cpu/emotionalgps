import { MessageSquareText, MoreHorizontal } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";
import { clients } from "../data/studioData";

export function ClientHub() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <Card>
        <CardBody>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold tracking-[-0.02em] text-studio-ink">
                Client workspace
              </h2>
              <p className="mt-1 text-sm text-studio-muted">
                A calm overview of active relationships and commitments.
              </p>
            </div>
            <Button size="sm" variant="secondary">
              Add client
            </Button>
          </div>
          <div className="divide-y divide-studio-line">
            {clients.map((client) => (
              <div
                className="grid gap-4 py-5 transition duration-200 first:pt-0 last:pb-0 sm:grid-cols-[1.2fr_0.8fr_auto]"
                key={client.name}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-studio-purple-soft text-sm font-semibold text-studio-purple">
                      {client.name.slice(0, 1)}
                    </div>
                    <div>
                      <h3 className="font-semibold tracking-[-0.02em] text-studio-ink">
                        {client.name}
                      </h3>
                      <p className="text-sm text-studio-muted">{client.project}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Badge tone={client.status === "Retainer" ? "success" : "accent"}>
                    {client.status}
                  </Badge>
                  <p className="text-sm text-studio-muted">{client.nextStep}</p>
                </div>
                <Button className="h-9 w-9 rounded-xl p-0" size="sm" variant="ghost">
                  <MoreHorizontal aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">More actions</span>
                </Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="bg-studio-panel/80">
        <CardBody>
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-studio-line bg-white">
            <MessageSquareText aria-hidden="true" className="h-5 w-5 text-studio-purple" />
          </div>
          <h2 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-studio-ink">
            Client memory
          </h2>
          <p className="mt-3 text-sm leading-6 text-studio-muted">
            Future integrations can attach calls, notes, decisions, and deliverables to each client profile.
          </p>
          <div className="mt-6 rounded-2xl border border-studio-line bg-white p-4">
            <p className="text-sm font-medium text-studio-ink">Suggested next system</p>
            <p className="mt-2 text-sm leading-6 text-studio-muted">
              Add reusable client fields for decision makers, product context, contract type, and preferred communication style.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
