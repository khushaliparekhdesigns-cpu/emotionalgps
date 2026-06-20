import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Bot,
  CalendarDays,
  Car,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  CreditCard,
  FileText,
  Filter,
  Inbox,
  KeyRound,
  LineChart,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Plane,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
  UserRound,
  UsersRound,
  Wallet,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import {
  aiDemoCards,
  bookings,
  conversations,
  customers,
  documents,
  formatCurrency,
  getCustomer,
  getVehicle,
  operationsTimeline,
  revenueByMonth,
  vehicles,
} from "../data/rentalData";
import type { Booking, Conversation, Customer, Vehicle, VehicleStatus } from "../data/rentalData";
import type { RouteKey } from "../types";
import { cn } from "../lib/utils";

type RentalOperationsProps = {
  routeKey: RouteKey;
};

const statusStyles: Record<string, string> = {
  Available: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Booked: "border-sky-200 bg-sky-50 text-sky-700",
  Cleaning: "border-amber-200 bg-amber-50 text-amber-700",
  Maintenance: "border-rose-200 bg-rose-50 text-rose-700",
  Delivered: "border-violet-200 bg-violet-50 text-violet-700",
  Delivery: "border-violet-200 bg-violet-50 text-violet-700",
  Reserved: "border-studio-purple/20 bg-studio-purple-soft text-studio-purple",
  Open: "border-sky-200 bg-sky-50 text-sky-700",
  "Awaiting reply": "border-amber-200 bg-amber-50 text-amber-700",
  Assigned: "border-studio-purple/20 bg-studio-purple-soft text-studio-purple",
  Resolved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Confirmed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "In progress": "border-sky-200 bg-sky-50 text-sky-700",
  "Awaiting payment": "border-amber-200 bg-amber-50 text-amber-700",
  Draft: "border-studio-line bg-studio-panel text-studio-muted",
  Completed: "border-zinc-200 bg-zinc-50 text-zinc-600",
  Paid: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  "Deposit only": "border-violet-200 bg-violet-50 text-violet-700",
  Verified: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Needs review": "border-amber-200 bg-amber-50 text-amber-700",
  Expiring: "border-orange-200 bg-orange-50 text-orange-700",
  Missing: "border-rose-200 bg-rose-50 text-rose-700",
};

const sourceIcons: Record<Conversation["source"], LucideIcon> = {
  Email: Mail,
  "Google Ads": Search,
  "Meta Ads": TrendingUp,
  Website: Inbox,
  WhatsApp: MessageCircle,
};

const fleetFilters: (VehicleStatus | "All")[] = [
  "All",
  "Available",
  "Booked",
  "Cleaning",
  "Maintenance",
  "Delivered",
  "Reserved",
];

const dashboardUrgentActions: {
  title: string;
  detail: string;
  meta: string;
  action: string;
  severity: "critical" | "warning";
  icon: LucideIcon;
}[] = [
  {
    title: "2 overdue returns",
    detail: "BMW 735i and Kia Carnival are past return window and need guest follow-up.",
    meta: "Oldest overdue 42m",
    action: "Call customer",
    severity: "critical",
    icon: AlertCircle,
  },
  {
    title: "AED 18.4k pending payments",
    detail: "Five deposits and three balances must clear before vehicle delivery.",
    meta: "3 pickups at risk",
    action: "Send links",
    severity: "warning",
    icon: CreditCard,
  },
  {
    title: "4 unassigned enquiries",
    detail: "WhatsApp and Google Ads leads are waiting without an owner.",
    meta: "Oldest waiting 1h 14m",
    action: "Assign now",
    severity: "critical",
    icon: Inbox,
  },
  {
    title: "3 prep delays",
    detail: "Nissan Patrol, GMC Yukon AT4, and BMW 520i need cleaning before 14:30.",
    meta: "Cleaning bay full",
    action: "Prioritize prep",
    severity: "warning",
    icon: ClipboardCheck,
  },
  {
    title: "1 booking conflict",
    detail: "Range Rover Velar inspection overlaps with a 17:00 Palm Jumeirah handover.",
    meta: "Resolve by 15:30",
    action: "Reassign car",
    severity: "critical",
    icon: Wrench,
  },
];

const dashboardActivityFeed = [
  {
    time: "09:18",
    title: "New WhatsApp enquiry",
    detail: "Tourist asked for Nissan Patrol availability near Dubai Marina.",
    icon: MessageCircle,
  },
  {
    time: "09:06",
    title: "Booking confirmed",
    detail: "Mercedes CLA 250 reserved for Downtown Dubai delivery.",
    icon: CalendarDays,
  },
  {
    time: "08:52",
    title: "Payment received",
    detail: "AED 5,000 deposit captured for Cadillac Escalade.",
    icon: CreditCard,
  },
  {
    time: "08:31",
    title: "Vehicle returned",
    detail: "Audi Q5 returned at JBR and moved to inspection.",
    icon: KeyRound,
  },
];

const connectedChannels: {
  label: string;
  status: string;
  icon: LucideIcon;
}[] = [
  { label: "WhatsApp Business", status: "Connected", icon: MessageCircle },
  { label: "Shared email", status: "Connected", icon: Mail },
  { label: "Website enquiries", status: "Live", icon: Inbox },
  { label: "Google Ads", status: "Importing leads", icon: Search },
  { label: "Meta Ads", status: "Importing leads", icon: TrendingUp },
];

function StatusPill({ value }: { value: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        statusStyles[value] ?? "border-studio-line bg-studio-panel text-studio-muted",
      )}
    >
      {value}
    </span>
  );
}

function MiniMetric({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <Card className="group hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(29,29,31,0.07)]">
      <CardBody className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-studio-panel text-studio-muted ring-1 ring-studio-line">
            <Icon aria-hidden="true" className="h-4 w-4" />
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 text-studio-soft opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          />
        </div>
        <p className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-studio-ink">{value}</p>
        <p className="mt-1 text-sm font-medium text-studio-ink">{label}</p>
        <p className="mt-2 text-xs leading-5 text-studio-muted">{helper}</p>
      </CardBody>
    </Card>
  );
}

function SectionHeading({
  title,
  eyebrow,
  action,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-studio-soft">{eyebrow}</p>
        ) : null}
        <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-studio-ink">{title}</h2>
      </div>
      {action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
    </div>
  );
}

function SparklineBars({ values }: { values: number[] }) {
  const max = Math.max(...values);

  return (
    <div className="flex h-24 items-end gap-2">
      {values.map((value, index) => (
        <div className="flex flex-1 flex-col items-center gap-2" key={`${value}-${index}`}>
          <div
            className="w-full rounded-t-lg bg-studio-ink/85 shadow-sm transition-all duration-500"
            style={{ height: `${Math.max(18, (value / max) * 96)}%` }}
          />
        </div>
      ))}
    </div>
  );
}

function CustomerSummary({ customer }: { customer: Customer }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-studio-panel/70">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold tracking-[-0.04em] text-studio-ink">{customer.name}</h3>
              <Badge tone={customer.tier === "VIP" ? "accent" : "neutral"}>{customer.tier}</Badge>
            </div>
            <p className="mt-1 text-sm text-studio-muted">
              {customer.location} · customer since {customer.since}
            </p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-studio-ink ring-1 ring-studio-line">
            <UserRound aria-hidden="true" className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>
      <CardBody className="space-y-5">
        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl border border-studio-line bg-studio-panel p-3">
            <p className="text-xs text-studio-soft">Phone</p>
            <p className="mt-1 font-medium text-studio-ink">{customer.phone}</p>
          </div>
          <div className="rounded-xl border border-studio-line bg-studio-panel p-3">
            <p className="text-xs text-studio-soft">Lifetime spend</p>
            <p className="mt-1 font-medium text-studio-ink">{formatCurrency(customer.lifetimeSpend)}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-studio-soft">Preferred vehicles</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {customer.preferredVehicles.map((vehicle) => (
              <Badge key={vehicle}>{vehicle}</Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-studio-soft">Timeline</p>
          <div className="mt-3 space-y-3">
            {customer.timeline.map((item) => (
              <div className="flex gap-3" key={`${item.time}-${item.title}`}>
                <div className="mt-1 h-2 w-2 rounded-full bg-studio-purple" />
                <div>
                  <p className="text-sm font-medium text-studio-ink">{item.title}</p>
                  <p className="mt-0.5 text-xs text-studio-soft">{item.time}</p>
                  <p className="mt-1 text-sm leading-5 text-studio-muted">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

function DashboardView() {
  const availableCars = vehicles.filter((vehicle) => vehicle.status === "Available");
  const liveFleet = vehicles
    .filter((vehicle) =>
      ["Available", "Booked", "Cleaning", "Maintenance", "Delivered"].includes(vehicle.status),
    )
    .slice(0, 10);
  const todaysRevenue = bookings.slice(0, 12).reduce((total, booking) => total + booking.value, 0);
  const fleetStatusCounts = [
    { label: "Available", value: availableCars.length, tone: "bg-emerald-500" },
    { label: "Booked", value: vehicles.filter((vehicle) => vehicle.status === "Booked").length, tone: "bg-sky-500" },
    { label: "Cleaning", value: vehicles.filter((vehicle) => vehicle.status === "Cleaning").length, tone: "bg-amber-500" },
    { label: "Maintenance", value: vehicles.filter((vehicle) => vehicle.status === "Maintenance").length, tone: "bg-rose-500" },
    { label: "Delivery", value: vehicles.filter((vehicle) => vehicle.status === "Delivered").length, tone: "bg-violet-500" },
  ];
  const snapshotMetrics = [
    {
      icon: CheckCircle2,
      label: "Cars available today",
      value: String(availableCars.length),
      helper: "Ready to assign now",
    },
    {
      icon: CalendarDays,
      label: "Bookings today",
      value: "27",
      helper: "18 confirmed, 6 in progress",
    },
    {
      icon: KeyRound,
      label: "Returns today",
      value: "9",
      helper: "2 overdue, 4 inspect",
    },
    {
      icon: Timer,
      label: "Deliveries today",
      value: "14",
      helper: "3 at risk without payment",
    },
    {
      icon: Wallet,
      label: "Revenue today",
      value: formatCurrency(todaysRevenue),
      helper: "+18% vs last Saturday",
    },
  ];

  return (
    <div className="space-y-7">
      <section>
        <SectionHeading
          action={<Badge className="border-rose-200 bg-rose-50 text-rose-700">5 actions need owner</Badge>}
          eyebrow="Top priority"
          title="Urgent Actions"
        />
        <div className="grid gap-3 xl:grid-cols-5">
          {dashboardUrgentActions.map((item) => {
            const ActionIcon = item.icon;
            const critical = item.severity === "critical";

            return (
              <Card
                className={cn(
                  "border-l-4 shadow-[0_18px_55px_rgba(29,29,31,0.05)]",
                  critical ? "border-l-rose-500" : "border-l-amber-500",
                )}
                key={item.title}
              >
                <CardBody className="flex h-full flex-col p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-xl",
                        critical ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-700",
                      )}
                    >
                      <ActionIcon aria-hidden="true" className="h-4 w-4" />
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
                        critical ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700",
                      )}
                    >
                      {critical ? "Now" : "Soon"}
                    </span>
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-5 text-studio-ink">{item.title}</p>
                  <p className="mt-2 min-h-12 text-sm leading-5 text-studio-muted">{item.detail}</p>
                  <div className="mt-4 flex flex-1 items-end justify-between gap-3">
                    <p className="text-xs font-medium text-studio-soft">{item.meta}</p>
                    <Button size="sm" variant={critical ? "primary" : "secondary"}>
                      {item.action}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Today" title="Today's Operations Snapshot" />
        <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {snapshotMetrics.map((metric) => {
              const SnapshotIcon = metric.icon;
              return (
                <Card key={metric.label}>
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-studio-panel text-studio-muted ring-1 ring-studio-line">
                        <SnapshotIcon aria-hidden="true" className="h-4 w-4" />
                      </div>
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-studio-soft" />
                    </div>
                    <p className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-studio-ink">{metric.value}</p>
                    <p className="mt-1 text-sm font-semibold text-studio-ink">{metric.label}</p>
                    <p className="mt-1 text-xs leading-5 text-studio-muted">{metric.helper}</p>
                  </CardBody>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader className="py-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-studio-ink">Today's live schedule</h3>
                <Button size="sm" variant="secondary">Open calendar</Button>
              </div>
            </CardHeader>
            <CardBody className="space-y-3 p-4">
              {operationsTimeline.slice(0, 4).map((item) => (
                <div className="grid grid-cols-[3.5rem_1fr] gap-3" key={item.time}>
                  <p className="text-sm font-semibold tabular-nums text-studio-ink">{item.time}</p>
                  <div className="rounded-xl border border-studio-line bg-studio-panel px-3 py-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-studio-ink">{item.title}</p>
                      <Badge>{item.tone}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-studio-muted">{item.detail}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </section>

      <section>
        <SectionHeading
          action={<Badge tone="accent">Live status</Badge>}
          eyebrow="Fleet"
          title="Live Fleet Status"
        />
        <Card>
          <CardBody className="p-4 sm:p-5">
            <div className="grid gap-3 md:grid-cols-5">
              {fleetStatusCounts.map((status) => (
                <div className="rounded-2xl border border-studio-line bg-studio-panel p-3" key={status.label}>
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2.5 w-2.5 rounded-full", status.tone)} />
                    <p className="text-xs font-medium text-studio-muted">{status.label}</p>
                  </div>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-studio-ink">{status.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-studio-line">
              <div className="hidden grid-cols-[1.25fr_0.75fr_1fr_1.2fr] gap-4 bg-studio-panel px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-studio-soft md:grid">
                <span>Vehicle</span>
                <span>Status</span>
                <span>Location</span>
                <span>Next action</span>
              </div>
              <div className="divide-y divide-studio-line bg-white">
                {liveFleet.map((vehicle, index) => {
                  const displayStatus = vehicle.status === "Delivered" ? "Delivery" : vehicle.status;
                  const nextAction =
                    vehicle.status === "Available"
                      ? `Idle ${["18m", "42m", "1h 05m", "2h 10m"][index % 4]} · assign booking`
                      : vehicle.status === "Cleaning"
                        ? `${["10:40", "12:20", "13:15"][index % 3]} · finish prep`
                        : vehicle.status === "Maintenance"
                          ? `${["11:30", "15:30", "17:00"][index % 3]} · service check`
                          : vehicle.status === "Delivered"
                            ? `${["10:15", "14:00", "16:45"][index % 3]} · customer handover`
                            : vehicle.nextBooking;

                  return (
                    <div
                      className="grid gap-3 px-4 py-3 text-sm md:grid-cols-[1.25fr_0.75fr_1fr_1.2fr] md:items-center md:gap-4"
                      key={vehicle.id}
                    >
                      <div>
                        <p className="font-semibold text-studio-ink">{vehicle.model}</p>
                        <p className="mt-1 text-xs text-studio-soft">{vehicle.plate}</p>
                      </div>
                      <StatusPill value={displayStatus} />
                      <p className="text-studio-muted">{vehicle.location}</p>
                      <p className="font-medium text-studio-ink">{nextAction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardBody>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader className="py-4">
            <SectionHeading
              action={<Badge tone="success">Trending up</Badge>}
              eyebrow="Secondary"
              title="Revenue Growth"
            />
          </CardHeader>
          <CardBody>
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-2xl font-semibold tracking-[-0.05em] text-studio-ink">
                  {formatCurrency(revenueByMonth.at(-1)?.revenue ?? 0)}
                </p>
                <p className="mt-1 text-sm text-studio-muted">June revenue to date</p>
              </div>
              <p className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                +10.8% MoM
              </p>
            </div>
            <div className="mt-5 opacity-80">
              <SparklineBars values={revenueByMonth.map((item) => item.revenue)} />
            </div>
            <p className="mt-4 text-sm leading-6 text-studio-muted">
              Growth is being driven by weekly SUV rentals and stronger DXB delivery conversion. Keep payment follow-up
              tight so today's at-risk bookings do not slip.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="py-4">
            <SectionHeading
              action={<Button size="sm" variant="primary">Create booking</Button>}
              eyebrow="Quick assign"
              title="Available Cars Quick Panel"
            />
          </CardHeader>
          <CardBody className="space-y-3">
            {availableCars.map((vehicle, index) => (
              <div
                className="grid gap-3 rounded-2xl border border-studio-line bg-white p-3 shadow-sm sm:grid-cols-[1fr_0.8fr_0.55fr_auto] sm:items-center"
                key={vehicle.id}
              >
                <div>
                  <p className="text-sm font-semibold text-studio-ink">{vehicle.model}</p>
                  <p className="mt-1 text-xs text-studio-muted">{formatCurrency(vehicle.dailyRate)}/day · {vehicle.plate}</p>
                </div>
                <div>
                  <p className="text-xs text-studio-soft">Location</p>
                  <p className="mt-1 text-sm font-medium text-studio-ink">{vehicle.location}</p>
                </div>
                <div>
                  <p className="text-xs text-studio-soft">Idle</p>
                  <p className="mt-1 text-sm font-medium text-studio-ink">
                    {["18m", "42m", "1h 05m", "2h 10m", "3h 20m"][index % 5]}
                  </p>
                </div>
                <Button size="sm" variant="secondary">Assign booking</Button>
              </div>
            ))}
          </CardBody>
        </Card>
      </section>

      <section>
        <SectionHeading eyebrow="Latest" title="Activity Feed" />
        <Card>
          <CardBody className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {dashboardActivityFeed.map((item) => {
              const FeedIcon = item.icon;
              return (
                <div className="rounded-2xl border border-studio-line bg-studio-panel p-4" key={`${item.time}-${item.title}`}>
                  <div className="flex items-center gap-2">
                    <FeedIcon aria-hidden="true" className="h-4 w-4 text-studio-muted" />
                    <p className="text-xs font-semibold tabular-nums text-studio-soft">{item.time}</p>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-studio-ink">{item.title}</p>
                  <p className="mt-1 text-sm leading-5 text-studio-muted">{item.detail}</p>
                </div>
              );
            })}
          </CardBody>
        </Card>
      </section>
    </div>
  );
}

function ConversationListItem({
  active,
  conversation,
  onClick,
}: {
  active: boolean;
  conversation: Conversation;
  onClick: () => void;
}) {
  const customer = getCustomer(conversation.customerId);
  const SourceIcon = sourceIcons[conversation.source];

  return (
    <button
      className={cn(
        "w-full rounded-2xl border p-4 text-left transition duration-200",
        active
          ? "border-studio-purple/30 bg-studio-purple-soft/70 shadow-sm"
          : "border-studio-line bg-white hover:-translate-y-0.5 hover:border-studio-soft/60",
      )}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <SourceIcon aria-hidden="true" className="h-4 w-4 text-studio-muted" />
            <p className="truncate text-sm font-semibold text-studio-ink">{customer.name}</p>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-studio-muted">{conversation.lastMessage}</p>
        </div>
        <StatusPill value={conversation.status} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge>{conversation.source}</Badge>
        <Badge>{conversation.stage}</Badge>
        <span className="text-xs text-studio-soft">{conversation.waitingMinutes}m waiting</span>
      </div>
    </button>
  );
}

function InboxView() {
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const [assignedToMe, setAssignedToMe] = useState(false);
  const selected = conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0];
  const customer = getCustomer(selected.customerId);
  const visibleConversations = assignedToMe
    ? conversations.filter((conversation) => conversation.assignedTo === "Amelia" || conversation.id === selectedId)
    : conversations;

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr_340px]">
      <Card className="min-h-[680px]">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-studio-soft">Shared queue</p>
              <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-studio-ink">Unified inbox</h2>
            </div>
            <Button
              onClick={() => setAssignedToMe((value) => !value)}
              size="sm"
              variant={assignedToMe ? "quiet" : "secondary"}
            >
              Mine
            </Button>
          </div>
          <div className="mt-4 flex gap-2">
            <Input className="h-9" placeholder="Filter conversations..." />
            <Button className="h-9 w-9 shrink-0 rounded-xl p-0" variant="secondary">
              <Filter aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardBody className="studio-scrollbar max-h-[560px] space-y-3 overflow-auto">
          {visibleConversations.slice(0, 16).map((conversation) => (
            <ConversationListItem
              active={conversation.id === selected.id}
              conversation={conversation}
              key={conversation.id}
              onClick={() => setSelectedId(conversation.id)}
            />
          ))}
        </CardBody>
      </Card>

      <Card className="min-h-[680px] overflow-hidden">
        <CardHeader className="bg-white">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold tracking-[-0.04em] text-studio-ink">{customer.name}</h2>
                <StatusPill value={selected.status} />
              </div>
              <p className="mt-2 text-sm text-studio-muted">
                {selected.source} · {selected.stage} · assigned to {selected.assignedTo}
              </p>
            </div>
            <Button onClick={() => setAssignedToMe(true)} variant="primary">
              Assign to me
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {selected.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardBody className="space-y-5 bg-studio-panel/50">
          <div className="rounded-2xl border border-studio-line bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-studio-ink">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-studio-purple" />
              AI customer summary
            </div>
            <p className="mt-2 text-sm leading-6 text-studio-muted">
              {customer.name} is a {customer.tier.toLowerCase()} customer who prefers {customer.preferredVehicles[0]}.
              Current thread is about availability, delivery, and payment confirmation.
            </p>
          </div>

          <div className="space-y-4">
            {selected.messages.map((message) => (
              <div
                className={cn("flex", message.from === "team" ? "justify-end" : "justify-start")}
                key={`${message.time}-${message.text}`}
              >
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl border px-4 py-3 shadow-sm",
                    message.from === "team"
                      ? "border-studio-purple/20 bg-studio-purple text-white"
                      : "border-studio-line bg-white text-studio-ink",
                  )}
                >
                  <p className={cn("text-xs", message.from === "team" ? "text-white/70" : "text-studio-soft")}>
                    {message.author} · {message.time}
                  </p>
                  <p className="mt-1 text-sm leading-6">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-studio-line bg-white p-3">
            <div className="flex items-center gap-2">
              <Input className="border-transparent bg-studio-panel" placeholder="Write a reply or /summarize..." />
              <Button className="h-10 w-10 shrink-0 rounded-xl p-0" variant="primary">
                <Send aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="space-y-6">
        <CustomerSummary customer={customer} />
        <Card>
          <CardHeader>
            <h3 className="font-semibold tracking-[-0.03em] text-studio-ink">Booking context</h3>
          </CardHeader>
          <CardBody className="space-y-3">
            {bookings
              .filter((booking) => booking.customerId === customer.id)
              .slice(0, 3)
              .map((booking) => {
                const vehicle = getVehicle(booking.vehicleId);
                return (
                  <div className="rounded-xl border border-studio-line bg-studio-panel p-3" key={booking.id}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-studio-ink">{vehicle.model}</p>
                      <StatusPill value={booking.status} />
                    </div>
                    <p className="mt-2 text-xs text-studio-muted">
                      Pickup {booking.pickup} · {formatCurrency(booking.value)}
                    </p>
                  </div>
                );
              })}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function CustomersView() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0].id);
  const selectedCustomer = getCustomer(selectedCustomerId);
  const currentBooking = bookings.find((booking) => booking.id === selectedCustomer.currentBookingId);

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <Card>
        <CardHeader>
          <SectionHeading
            action={<Badge tone="accent">{customers.length} profiles</Badge>}
            eyebrow="Relationship memory"
            title="Customers"
          />
          <Input placeholder="Search VIPs, phone, preferred vehicle..." />
        </CardHeader>
        <CardBody className="studio-scrollbar max-h-[720px] space-y-3 overflow-auto">
          {customers.map((customer) => (
            <button
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition",
                selectedCustomerId === customer.id
                  ? "border-studio-purple/30 bg-studio-purple-soft"
                  : "border-studio-line bg-white hover:border-studio-soft/60",
              )}
              key={customer.id}
              onClick={() => setSelectedCustomerId(customer.id)}
              type="button"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-studio-ink">{customer.name}</p>
                  {customer.tier === "VIP" ? <Star aria-hidden="true" className="h-3.5 w-3.5 text-studio-purple" /> : null}
                </div>
                <p className="mt-1 truncate text-xs text-studio-muted">{customer.preferredVehicles.join(" · ")}</p>
              </div>
              <p className="text-xs font-medium text-studio-muted">{formatCurrency(customer.lifetimeSpend)}</p>
            </button>
          ))}
        </CardBody>
      </Card>

      <div className="space-y-6">
        <CustomerSummary customer={selectedCustomer} />

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <h3 className="font-semibold tracking-[-0.03em] text-studio-ink">Current booking</h3>
            </CardHeader>
            <CardBody>
              {currentBooking ? (
                <BookingRow booking={currentBooking} compact />
              ) : (
                <div className="rounded-2xl border border-dashed border-studio-line bg-studio-panel p-6 text-sm text-studio-muted">
                  No active booking. Suggested follow-up available from customer preferences.
                </div>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold tracking-[-0.03em] text-studio-ink">Documents</h3>
            </CardHeader>
            <CardBody className="space-y-3">
              {selectedCustomer.uploadedDocuments.map((document) => (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-studio-line bg-studio-panel p-3" key={document.name}>
                  <div className="flex items-center gap-2">
                    <FileText aria-hidden="true" className="h-4 w-4 text-studio-soft" />
                    <p className="text-sm font-medium text-studio-ink">{document.name}</p>
                  </div>
                  <StatusPill value={document.status} />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <h3 className="font-semibold tracking-[-0.03em] text-studio-ink">Internal notes</h3>
            </CardHeader>
            <CardBody className="space-y-3">
              {selectedCustomer.notes.map((note) => (
                <div className="rounded-xl border border-studio-line bg-studio-panel p-4 text-sm leading-6 text-studio-muted" key={note}>
                  {note}
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold tracking-[-0.03em] text-studio-ink">Payment history</h3>
            </CardHeader>
            <CardBody className="space-y-3">
              {selectedCustomer.paymentHistory.map((payment) => (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-studio-line bg-white p-3" key={payment.label}>
                  <div>
                    <p className="text-sm font-medium text-studio-ink">{payment.label}</p>
                    <p className="mt-1 text-xs text-studio-muted">{formatCurrency(payment.amount)}</p>
                  </div>
                  <StatusPill value={payment.status} />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function VehicleCard({
  active,
  vehicle,
  onClick,
}: {
  active: boolean;
  vehicle: Vehicle;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "group overflow-hidden rounded-2xl border bg-white text-left shadow-[0_18px_60px_rgba(29,29,31,0.04)] transition duration-200 hover:-translate-y-1",
        active ? "border-studio-purple/40 ring-4 ring-studio-purple/10" : "border-studio-line hover:border-studio-soft/60",
      )}
      onClick={onClick}
      type="button"
    >
      <div className="relative h-44 overflow-hidden bg-studio-panel">
        <img
          alt={vehicle.model}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          src={vehicle.image}
        />
        <div className="absolute left-3 top-3">
          <StatusPill value={vehicle.status} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold tracking-[-0.03em] text-studio-ink">{vehicle.model}</h3>
            <p className="mt-1 text-sm text-studio-muted">{vehicle.plate}</p>
          </div>
          <MoreHorizontal aria-hidden="true" className="h-4 w-4 text-studio-soft" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-studio-soft">Location</p>
            <p className="mt-1 truncate font-medium text-studio-ink">{vehicle.location}</p>
          </div>
          <div>
            <p className="text-xs text-studio-soft">Utilisation</p>
            <p className="mt-1 font-medium text-studio-ink">{vehicle.utilisation}%</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-studio-line bg-studio-panel p-3 text-sm">
          <div>
            <p className="text-xs text-studio-soft">Daily</p>
            <p className="mt-1 font-semibold text-studio-ink">{formatCurrency(vehicle.dailyRate)}</p>
          </div>
          <div>
            <p className="text-xs text-studio-soft">Monthly</p>
            <p className="mt-1 font-semibold text-studio-ink">{formatCurrency(vehicle.monthlyRate)}</p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-studio-panel">
          <div className="h-full rounded-full bg-studio-ink" style={{ width: `${vehicle.utilisation}%` }} />
        </div>
        <p className="mt-4 text-sm text-studio-muted">Next: {vehicle.nextBooking}</p>
      </div>
    </button>
  );
}

function FleetView() {
  const [filter, setFilter] = useState<VehicleStatus | "All">("All");
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0].id);
  const visibleVehicles = filter === "All" ? vehicles : vehicles.filter((vehicle) => vehicle.status === filter);
  const selectedVehicle = getVehicle(selectedVehicleId);
  const selectedBookings = bookings.filter((booking) => booking.vehicleId === selectedVehicle.id).slice(0, 4);

  return (
    <div className="space-y-6">
      <Card>
        <CardBody className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {fleetFilters.map((item) => (
              <button
                className={cn(
                  "rounded-full border px-3 py-2 text-xs font-medium transition",
                  filter === item
                    ? "border-studio-purple/20 bg-studio-purple-soft text-studio-purple"
                    : "border-studio-line bg-white text-studio-muted hover:text-studio-ink",
                )}
                key={item}
                onClick={() => setFilter(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="text-sm text-studio-muted">
            {visibleVehicles.length} of {vehicles.length} vehicles shown
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {visibleVehicles.map((vehicle) => (
            <VehicleCard
              active={selectedVehicle.id === vehicle.id}
              key={vehicle.id}
              onClick={() => setSelectedVehicleId(vehicle.id)}
              vehicle={vehicle}
            />
          ))}
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <Card className="overflow-hidden">
            <div className="h-52 bg-studio-panel">
              <img alt={selectedVehicle.model} className="h-full w-full object-cover" src={selectedVehicle.image} />
            </div>
            <CardBody className="space-y-5">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold tracking-[-0.04em] text-studio-ink">{selectedVehicle.model}</h2>
                  <StatusPill value={selectedVehicle.status} />
                </div>
                <p className="mt-2 text-sm text-studio-muted">{selectedVehicle.plate} · {selectedVehicle.class}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-studio-line bg-studio-panel p-3">
                  <p className="text-xs text-studio-soft">Revenue</p>
                  <p className="mt-1 font-semibold text-studio-ink">{formatCurrency(selectedVehicle.revenue)}</p>
                </div>
                <div className="rounded-xl border border-studio-line bg-studio-panel p-3">
                  <p className="text-xs text-studio-soft">Utilisation</p>
                  <p className="mt-1 font-semibold text-studio-ink">{selectedVehicle.utilisation}%</p>
                </div>
                <div className="rounded-xl border border-studio-line bg-studio-panel p-3">
                  <p className="text-xs text-studio-soft">Location</p>
                  <p className="mt-1 font-semibold text-studio-ink">{selectedVehicle.location}</p>
                </div>
                <div className="rounded-xl border border-studio-line bg-studio-panel p-3">
                  <p className="text-xs text-studio-soft">Seats</p>
                  <p className="mt-1 font-semibold text-studio-ink">{selectedVehicle.seats}</p>
                </div>
                <div className="rounded-xl border border-studio-line bg-studio-panel p-3">
                  <p className="text-xs text-studio-soft">Daily rate</p>
                  <p className="mt-1 font-semibold text-studio-ink">{formatCurrency(selectedVehicle.dailyRate)}</p>
                </div>
                <div className="rounded-xl border border-studio-line bg-studio-panel p-3">
                  <p className="text-xs text-studio-soft">Monthly rate</p>
                  <p className="mt-1 font-semibold text-studio-ink">{formatCurrency(selectedVehicle.monthlyRate)}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-studio-soft">Upcoming bookings</p>
                <div className="mt-3 space-y-3">
                  {selectedBookings.length > 0 ? (
                    selectedBookings.map((booking) => <BookingRow booking={booking} compact key={booking.id} />)
                  ) : (
                    <p className="rounded-xl border border-dashed border-studio-line p-4 text-sm text-studio-muted">
                      No bookings currently attached to this vehicle.
                    </p>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function BookingRow({ booking, compact = false }: { booking: Booking; compact?: boolean }) {
  const customer = getCustomer(booking.customerId);
  const vehicle = getVehicle(booking.vehicleId);

  return (
    <div
      className={cn(
        "rounded-2xl border border-studio-line bg-white p-4 shadow-sm",
        compact ? "space-y-3" : "grid gap-4 lg:grid-cols-[1.1fr_1fr_1fr_0.8fr_0.7fr]",
      )}
    >
      <div>
        <p className="text-sm font-semibold text-studio-ink">{customer.name}</p>
        <p className="mt-1 text-xs text-studio-muted">{customer.tier} · {customer.location}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-studio-ink">{vehicle.model}</p>
        <p className="mt-1 text-xs text-studio-muted">{vehicle.plate}</p>
      </div>
      <div>
        <p className="text-xs text-studio-soft">Pickup</p>
        <p className="mt-1 text-sm text-studio-ink">{booking.pickup}</p>
      </div>
      <div>
        <p className="text-xs text-studio-soft">Return</p>
        <p className="mt-1 text-sm text-studio-ink">{booking.returnAt}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <StatusPill value={booking.status} />
        <StatusPill value={booking.payment} />
      </div>
      {!compact ? (
        <div className="lg:col-span-5 flex flex-wrap items-center justify-between gap-3 border-t border-studio-line pt-3">
          <p className="text-sm text-studio-muted">
            Driver: <span className="font-medium text-studio-ink">{booking.driver}</span>
          </p>
          <p className="text-sm font-semibold text-studio-ink">{formatCurrency(booking.value)}</p>
        </div>
      ) : null}
    </div>
  );
}

function BookingsView() {
  const [view, setView] = useState<Booking["view"]>("Day");
  const visibleBookings = bookings.filter((booking) => booking.view === view).slice(0, 14);

  return (
    <div className="space-y-6">
      <Card>
        <CardBody className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex rounded-xl border border-studio-line bg-white p-1 shadow-sm">
            {(["Day", "Week", "Month"] as Booking["view"][]).map((item) => (
              <button
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition",
                  view === item ? "bg-studio-ink text-white" : "text-studio-muted hover:text-studio-ink",
                )}
                key={item}
                onClick={() => setView(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary">Export schedule</Button>
            <Button variant="primary">New booking</Button>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <SectionHeading eyebrow="Calendar" title={`${view} booking plan`} />
          </CardHeader>
          <CardBody className="space-y-3">
            {visibleBookings.map((booking) => (
              <BookingRow booking={booking} key={booking.id} />
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <SectionHeading eyebrow="Availability" title="Available today" />
          </CardHeader>
          <CardBody className="space-y-3">
            {vehicles
              .filter((vehicle) => vehicle.status === "Available")
              .slice(0, 8)
              .map((vehicle) => (
                <div className="flex items-center gap-3 rounded-xl border border-studio-line bg-studio-panel p-3" key={vehicle.id}>
                  <img alt="" className="h-12 w-16 rounded-lg object-cover" src={vehicle.image} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-studio-ink">{vehicle.model}</p>
                    <p className="mt-1 text-xs text-studio-muted">{vehicle.location}</p>
                  </div>
                </div>
              ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function AnalyticsView() {
  const topVehicles = [...vehicles].sort((a, b) => b.revenue - a.revenue).slice(0, 6);
  const lowUtilisation = [...vehicles].sort((a, b) => a.utilisation - b.utilisation).slice(0, 5);
  const topCustomers = [...customers].sort((a, b) => b.lifetimeSpend - a.lifetimeSpend).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <MiniMetric icon={CircleDollarSign} label="Month revenue" value={formatCurrency(312000)} helper="+9.1% month over month" />
        <MiniMetric icon={LineChart} label="Booking trend" value="119" helper="11 more bookings than May" />
        <MiniMetric icon={Car} label="Most requested" value="Nissan Patrol" helper="28 requests this month" />
        <MiniMetric icon={Clock3} label="Avg duration" value="2.8d" helper="Luxury SUV rentals average 3.4d" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <SectionHeading eyebrow="Revenue" title="Revenue by month" />
          </CardHeader>
          <CardBody>
            <SparklineBars values={revenueByMonth.map((item) => item.revenue)} />
            <div className="mt-4 grid grid-cols-6 gap-2 text-center text-xs text-studio-soft">
              {revenueByMonth.map((item) => (
                <span key={item.month}>{item.month}</span>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <SectionHeading eyebrow="Insights" title="Booking trends" />
          </CardHeader>
          <CardBody className="space-y-4">
            {[
              ["SUV demand", "64% of inbound enquiries mention Nissan Patrol, Escalade, Yukon, or Range Rover Velar."],
              ["Airport growth", "DXB and hotel delivery requests are up 22% this month."],
              ["No-deposit offers", "No-deposit bookings convert faster when WhatsApp replies include requirements early."],
            ].map(([title, detail]) => (
              <div className="rounded-2xl border border-studio-line bg-studio-panel p-4" key={title}>
                <p className="font-medium text-studio-ink">{title}</p>
                <p className="mt-2 text-sm leading-6 text-studio-muted">{detail}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <RankingCard title="Highest earning cars" items={topVehicles.map((vehicle) => ({
          label: vehicle.model,
          meta: vehicle.plate,
          value: formatCurrency(vehicle.revenue),
        }))} />
        <RankingCard title="Lowest utilisation" items={lowUtilisation.map((vehicle) => ({
          label: vehicle.model,
          meta: vehicle.location,
          value: `${vehicle.utilisation}%`,
        }))} />
        <RankingCard title="Top customers" items={topCustomers.map((customer) => ({
          label: customer.name,
          meta: customer.tier,
          value: formatCurrency(customer.lifetimeSpend),
        }))} />
      </div>

      <AiConceptStrip />
    </div>
  );
}

function RankingCard({
  items,
  title,
}: {
  items: { label: string; meta: string; value: string }[];
  title: string;
}) {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold tracking-[-0.03em] text-studio-ink">{title}</h3>
      </CardHeader>
      <CardBody className="space-y-3">
        {items.map((item, index) => (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-studio-line bg-white p-3" key={item.label}>
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-studio-panel text-xs font-semibold text-studio-muted">
                {index + 1}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-studio-ink">{item.label}</p>
                <p className="mt-1 truncate text-xs text-studio-muted">{item.meta}</p>
              </div>
            </div>
            <p className="shrink-0 text-sm font-semibold text-studio-ink">{item.value}</p>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

function DocumentsView() {
  const needsAttention = documents.filter((document) => document.status !== "Verified").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <MiniMetric icon={ShieldCheck} label="Verified documents" value={String(documents.length - needsAttention)} helper="Ready for rentals" />
        <MiniMetric icon={AlertCircle} label="Need review" value={String(needsAttention)} helper="Expiring, missing, or unchecked" />
        <MiniMetric icon={FileText} label="Rental agreements" value="14" helper="8 signed this week" />
      </div>

      <Card>
        <CardHeader>
          <SectionHeading
            action={<Button variant="primary">Upload document</Button>}
            eyebrow="Document control"
            title="Customer documents"
          />
        </CardHeader>
        <CardBody className="space-y-3">
          {documents.slice(0, 24).map((document) => {
            const customer = getCustomer(document.customerId);
            return (
              <div
                className="grid gap-3 rounded-2xl border border-studio-line bg-white p-4 shadow-sm md:grid-cols-[1.4fr_0.8fr_0.8fr_0.7fr]"
                key={document.id}
              >
                <div>
                  <p className="font-medium text-studio-ink">{document.title}</p>
                  <p className="mt-1 text-sm text-studio-muted">{customer.email}</p>
                </div>
                <div>
                  <p className="text-xs text-studio-soft">Type</p>
                  <p className="mt-1 text-sm text-studio-ink">{document.type}</p>
                </div>
                <div>
                  <p className="text-xs text-studio-soft">Updated</p>
                  <p className="mt-1 text-sm text-studio-ink">{document.updatedAt}</p>
                </div>
                <div className="flex items-center md:justify-end">
                  <StatusPill value={document.status} />
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <SettingsPanel
          icon={UsersRound}
          title="Team roles"
          description="Concierge, fleet, finance, and manager roles with clear ownership of inbox, bookings, documents, and vehicle status."
          items={["Amelia · Operations lead", "Noah · Concierge", "Sofia · Fleet coordinator", "James · Finance"]}
        />
        <SettingsPanel
          icon={Activity}
          title="Automation rules"
          description="Route messages by channel, status, customer tier, and booking stage without creating a heavy CRM workflow."
          items={["VIP WhatsApp enquiries assign to operations lead", "Pending deposit reminders after 25 minutes", "Cleaning task created on every return"]}
        />
        <SettingsPanel
          icon={CreditCard}
          title="Payment settings"
          description="Deposit rules, balance reminders, refund status, and payment exceptions for high-value rentals."
          items={["Default security deposit: AED 5,000", "Balance due before delivery", "Finance review for rentals above AED 12,000"]}
        />
      </div>

      <Card>
        <CardHeader>
          <SectionHeading eyebrow="Sources" title="Connected channels" />
        </CardHeader>
        <CardBody className="space-y-3">
          {connectedChannels.map((channel) => {
            const ChannelIcon = channel.icon;
            return (
              <div className="flex items-center justify-between gap-3 rounded-xl border border-studio-line bg-studio-panel p-3" key={channel.label}>
                <div className="flex items-center gap-3">
                  <ChannelIcon aria-hidden="true" className="h-4 w-4 text-studio-muted" />
                  <p className="text-sm font-medium text-studio-ink">{channel.label}</p>
                </div>
                <Badge tone="success">{channel.status}</Badge>
              </div>
            );
          })}
        </CardBody>
      </Card>
    </div>
  );
}

function SettingsPanel({
  description,
  icon: Icon,
  items,
  title,
}: {
  description: string;
  icon: LucideIcon;
  items: string[];
  title: string;
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-studio-panel text-studio-muted ring-1 ring-studio-line">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.04em] text-studio-ink">{title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-studio-muted">{description}</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <div className="rounded-xl border border-studio-line bg-studio-panel p-3 text-sm text-studio-muted" key={item}>
              {item}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

function AiConceptStrip() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot aria-hidden="true" className="h-4 w-4 text-studio-purple" />
          <h2 className="font-semibold tracking-[-0.03em] text-studio-ink">AI concepts, only where useful</h2>
        </div>
      </CardHeader>
      <CardBody className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {aiDemoCards.map((card) => (
          <div className="rounded-2xl border border-studio-line bg-studio-panel p-4" key={card.title}>
            <p className="text-sm font-semibold text-studio-ink">{card.title}</p>
            <p className="mt-2 text-sm leading-6 text-studio-muted">{card.body}</p>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

function HeroQuestionBar() {
  return (
    <Card className="mb-6 overflow-hidden">
      <CardBody className="relative p-5 sm:p-6">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-studio-purple-soft to-transparent md:block" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-studio-ink">
              <Plane aria-hidden="true" className="h-4 w-4 text-studio-purple" />
              Ask the operation anything
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-studio-muted">
              Try: "Which SUVs are available today?", "Who has not replied to VIP customers?", or "Where is every delivered vehicle?"
            </p>
          </div>
          <Button variant="quiet">
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            Demo search
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export function RentalOperations({ routeKey }: RentalOperationsProps) {
  const content = useMemo(() => {
    switch (routeKey) {
      case "inbox":
        return <InboxView />;
      case "customers":
        return <CustomersView />;
      case "fleet":
        return <FleetView />;
      case "bookings":
        return <BookingsView />;
      case "analytics":
        return <AnalyticsView />;
      case "documents":
        return <DocumentsView />;
      case "settings":
        return <SettingsView />;
      case "dashboard":
      default:
        return <DashboardView />;
    }
  }, [routeKey]);

  return (
    <>
      {routeKey === "dashboard" ? null : <HeroQuestionBar />}
      {content}
    </>
  );
}
