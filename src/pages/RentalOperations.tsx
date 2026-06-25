import { useMemo, useState } from "react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  IconActivity as Activity,
  IconAlertTriangle as AlertCircle,
  IconArrowUpRight as ArrowUpRight,
  IconRobot as Bot,
  IconCalendar as CalendarDays,
  IconCar as Car,
  IconCircleCheck as CheckCircle2,
  IconCoin as CircleDollarSign,
  IconClipboardCheck as ClipboardCheck,
  IconClock as Clock3,
  IconCreditCard as CreditCard,
  IconFileText as FileText,
  IconFilter as Filter,
  IconInbox as Inbox,
  IconKey as KeyRound,
  IconChartLine as LineChart,
  IconMail as Mail,
  IconBrandWhatsapp as MessageCircle,
  IconDots as MoreHorizontal,
  IconPlane as Plane,
  IconSearch as Search,
  IconSend as Send,
  IconShieldCheck as ShieldCheck,
  IconSparkles as Sparkles,
  IconStar as Star,
  IconPaperclip as Paperclip,
  IconPhoto as Photo,
  IconTrendingUp as TrendingUp,
  IconUserCircle as UserRound,
  IconUsers as UsersRound,
  IconTool as Wrench,
} from "@tabler/icons-react";
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

type AppIcon = ComponentType<SVGProps<SVGSVGElement>>;

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

const sourceIcons: Record<Conversation["source"], AppIcon> = {
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
  icon: AppIcon;
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

const dashboardTasks: {
  title: string;
  assignedTo: string;
  due: string;
  priority: "High" | "Medium" | "Low";
}[] = [
  {
    title: "Verify Emirates ID for Escalade delivery",
    assignedTo: "Sofia",
    due: "10:30",
    priority: "High",
  },
  {
    title: "Move BMW 520i to Dubai Marina",
    assignedTo: "Omar",
    due: "11:15",
    priority: "Medium",
  },
  {
    title: "Confirm no-deposit eligibility",
    assignedTo: "Amelia",
    due: "12:00",
    priority: "High",
  },
  {
    title: "Upload signed agreement for Tahoe",
    assignedTo: "Noah",
    due: "14:00",
    priority: "Low",
  },
];

const dashboardAssignableTasks: {
  title: string;
  context: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  suggestedAssignee: string;
}[] = [
  {
    title: "Call overdue BMW 735i customer",
    context: "Return overdue · Downtown Dubai",
    due: "Now",
    priority: "High",
    suggestedAssignee: "Amelia",
  },
  {
    title: "Collect Escalade deposit balance",
    context: "Payment blocker · Palm Jumeirah delivery",
    due: "10:20",
    priority: "High",
    suggestedAssignee: "Noah",
  },
  {
    title: "Assign cleaner to Nissan Patrol",
    context: "Prep delay · pickup at 14:30",
    due: "10:45",
    priority: "Medium",
    suggestedAssignee: "Omar",
  },
  {
    title: "Request Emirates ID upload",
    context: "Document missing · tourist booking",
    due: "11:00",
    priority: "Medium",
    suggestedAssignee: "Sofia",
  },
];

const connectedChannels: {
  label: string;
  status: string;
  icon: AppIcon;
}[] = [
  { label: "WhatsApp Business", status: "Connected", icon: MessageCircle },
  { label: "Shared email", status: "Connected", icon: Mail },
  { label: "Website enquiries", status: "Live", icon: Inbox },
  { label: "Google Ads", status: "Importing leads", icon: Search },
  { label: "Meta Ads", status: "Importing leads", icon: TrendingUp },
];

const inboxQueues = [
  { label: "All", count: 36 },
  { label: "Mine", count: 8 },
  { label: "Unassigned", count: 7 },
  { label: "Awaiting Reply", count: 12 },
  { label: "New Leads", count: 11 },
];

const inboxQuickReplies = [
  "Share AED quote",
  "Request Emirates ID",
  "Send payment link",
  "Confirm delivery slot",
];

const inboxTimeline = [
  { label: "Inquiry created", time: "08:41", status: "Done" },
  { label: "Quote sent", time: "08:48", status: "Done" },
  { label: "Docs received", time: "09:02", status: "Partial" },
  { label: "Payment made", time: "Pending", status: "Open" },
  { label: "Car delivered", time: "Today 16:00", status: "Upcoming" },
  { label: "Car returned", time: "Tomorrow 12:00", status: "Upcoming" },
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

const editFieldClass =
  "h-9 w-full rounded-xl border border-studio-line bg-white px-3 text-sm text-studio-ink outline-none focus:border-[#31C7B7] focus:ring-4 focus:ring-[#31C7B7]/10";

function CardMenu({
  items,
}: {
  items: {
    label: string;
    onClick?: () => void;
    tone?: "default" | "danger";
  }[];
}) {
  return (
    <details className="group relative">
      <summary className="grid h-8 w-8 cursor-pointer list-none place-items-center rounded-lg text-studio-soft transition hover:bg-studio-panel hover:text-studio-ink [&::-webkit-details-marker]:hidden">
        <MoreHorizontal aria-hidden="true" className="h-4 w-4" />
        <span className="sr-only">Open card menu</span>
      </summary>
      <div className="absolute right-0 top-9 z-20 w-40 rounded-2xl border border-studio-line bg-white p-1.5 shadow-[0_18px_60px_rgba(8,27,51,0.14)]">
        {items.map((item) => (
          <button
            className={cn(
              "block w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition hover:bg-studio-panel",
              item.tone === "danger" ? "text-rose-600" : "text-studio-ink",
            )}
            key={item.label}
            onClick={item.onClick}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
    </details>
  );
}

function EditPanel({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-2xl border border-[#31C7B7]/30 bg-[#E7FAF7] p-4">
      {children}
    </div>
  );
}

function MiniMetric({
  icon: Icon,
  label,
  value,
  helper,
}: {
  icon: AppIcon;
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

function CustomerSummary({
  customer,
  editing = false,
  onEdit,
}: {
  customer: Customer;
  editing?: boolean;
  onEdit?: () => void;
}) {
  return (
    <Card>
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
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-studio-ink ring-1 ring-studio-line">
              <UserRound aria-hidden="true" className="h-4 w-4" />
            </div>
            {onEdit ? (
              <CardMenu
                items={[
                  { label: "Edit", onClick: onEdit },
                  { label: "Update", onClick: onEdit },
                  { label: "Archive", tone: "danger" },
                ]}
              />
            ) : null}
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

        {editing ? (
          <EditPanel>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Customer name" defaultValue={customer.name} />
              <Input label="Phone" defaultValue={customer.phone} />
              <Input label="Email" defaultValue={customer.email} />
              <Input label="Location" defaultValue={customer.location} />
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <Button size="sm" variant="secondary">Cancel</Button>
              <Button size="sm" variant="primary">Save details</Button>
            </div>
          </EditPanel>
        ) : null}
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
  const carsInService =
    vehicles.filter((vehicle) => vehicle.status === "Cleaning").length +
    vehicles.filter((vehicle) => vehicle.status === "Maintenance").length;
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
      label: "Cars Available Today",
      value: String(availableCars.length),
      helper: "Ready now across Dubai",
      tone: "from-emerald-50 to-white text-emerald-700",
    },
    {
      icon: CalendarDays,
      label: "Bookings Today",
      value: "27",
      helper: "18 confirmed, 6 in progress",
      tone: "from-sky-50 to-white text-sky-700",
    },
    {
      icon: KeyRound,
      label: "Returns Today",
      value: "9",
      helper: "2 overdue, 4 inspect",
      tone: "from-amber-50 to-white text-amber-700",
    },
    {
      icon: Wrench,
      label: "Cars In Service",
      value: String(carsInService),
      helper: "Cleaning or maintenance",
      tone: "from-rose-50 to-white text-rose-700",
    },
    {
      icon: AlertCircle,
      label: "Urgent Actions",
      value: String(dashboardUrgentActions.length),
      helper: "Needs owner today",
      tone: "from-red-50 to-white text-red-700",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {snapshotMetrics.map((metric) => {
          const SnapshotIcon = metric.icon;
          return (
            <Card
              className="overflow-hidden border-white bg-white shadow-[0_14px_45px_rgba(8,27,51,0.07)]"
              key={metric.label}
            >
              <CardBody className={cn("bg-gradient-to-br p-5", metric.tone)}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-studio-muted">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-4xl font-semibold tracking-[-0.07em] text-[#081B33]">
                      {metric.value}
                    </p>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                    <SnapshotIcon aria-hidden="true" className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-studio-muted">{metric.helper}</p>
              </CardBody>
            </Card>
          );
        })}
      </section>

      <section className="rounded-[22px] border border-[#F4C7C7] bg-gradient-to-br from-[#FFF7F7] via-white to-[#FFF9EF] p-4 shadow-[0_24px_80px_rgba(127,29,29,0.09)] sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
              Highest priority
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.055em] text-[#081B33]">
              Urgent Actions
            </h2>
            <p className="mt-1 text-sm text-studio-muted">
              Resolve these before deliveries start slipping.
            </p>
          </div>
          <Badge className="border-rose-200 bg-rose-50 px-3 py-1.5 text-rose-700">
            5 actions need owner
          </Badge>
        </div>
        <div className="grid gap-3 xl:grid-cols-12">
          {dashboardUrgentActions.map((item, index) => {
            const ActionIcon = item.icon;
            const critical = item.severity === "critical";

            return (
              <div
                className={cn(
                  "rounded-2xl border bg-white p-4 shadow-[0_16px_50px_rgba(8,27,51,0.07)]",
                  critical ? "border-rose-200" : "border-amber-200",
                  index < 2 ? "xl:col-span-3" : "xl:col-span-2",
                )}
                key={item.title}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-2xl",
                      critical ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-700",
                    )}
                  >
                    <ActionIcon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
                      critical ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700",
                    )}
                  >
                    {critical ? "Urgent" : "Warning"}
                  </span>
                </div>
                <p className="mt-4 text-base font-semibold leading-6 text-[#081B33]">{item.title}</p>
                <p className="mt-2 text-sm leading-5 text-studio-muted">{item.detail}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-studio-soft">{item.meta}</p>
                  <Button
                    className={critical ? "border-rose-600 bg-rose-600 text-white hover:bg-rose-700" : ""}
                    size="sm"
                    variant={critical ? "primary" : "secondary"}
                  >
                    {item.action}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_390px]">
        <Card className="overflow-hidden border-white shadow-[0_18px_60px_rgba(8,27,51,0.06)]">
          <CardHeader className="border-[#DDE6EF] bg-[#081B33] py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#31C7B7]">Live operations</p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-white">Today's Live Operations</h2>
              </div>
              <Button className="border-white/[0.10] bg-white/[0.10] text-white hover:bg-white/[0.15]" size="sm" variant="secondary">
                Open calendar
              </Button>
            </div>
          </CardHeader>
          <CardBody className="space-y-3 bg-white p-4">
            {operationsTimeline.map((item, index) => (
              <div className="grid grid-cols-[4rem_1fr] gap-4" key={item.time}>
                <div>
                  <p className="text-sm font-semibold tabular-nums text-[#081B33]">{item.time}</p>
                  <div className="mx-auto mt-2 h-full w-px bg-studio-line" />
                </div>
                <div className="rounded-2xl border border-studio-line bg-[#F8FAFC] p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className={cn("h-2.5 w-2.5 rounded-full", fleetStatusCounts[index % fleetStatusCounts.length].tone)} />
                      <p className="text-sm font-semibold text-[#081B33]">{item.title}</p>
                    </div>
                    <Badge>{item.tone}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-studio-muted">{item.detail}</p>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card className="border-white shadow-[0_18px_60px_rgba(8,27,51,0.06)]">
          <CardHeader className="py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-studio-soft">Secondary</p>
                <h2 className="mt-1 text-lg font-semibold tracking-[-0.04em] text-[#081B33]">Revenue Growth</h2>
              </div>
              <Badge tone="success">+10.8% MoM</Badge>
            </div>
          </CardHeader>
          <CardBody className="pt-0">
            <p className="text-3xl font-semibold tracking-[-0.06em] text-[#081B33]">
              {formatCurrency(revenueByMonth.at(-1)?.revenue ?? 0)}
            </p>
            <p className="mt-1 text-sm text-studio-muted">June revenue to date</p>
            <div className="mt-5 h-20 opacity-70">
              <SparklineBars values={revenueByMonth.map((item) => item.revenue)} />
            </div>
            <p className="mt-4 text-sm leading-6 text-studio-muted">
              Trend is up, but today's payment blockers are the main risk to conversion.
            </p>
          </CardBody>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Card className="overflow-hidden border-white shadow-[0_18px_60px_rgba(8,27,51,0.06)]">
          <CardHeader className="py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-studio-soft">Fleet</p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#081B33]">Fleet Status Table</h2>
              </div>
              <div className="hidden gap-2 md:flex">
                {fleetStatusCounts.map((status) => (
                  <div className="flex items-center gap-1.5 rounded-full bg-studio-panel px-2.5 py-1" key={status.label}>
                    <span className={cn("h-2 w-2 rounded-full", status.tone)} />
                    <span className="text-xs font-medium text-studio-muted">{status.value} {status.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="hidden grid-cols-[1.1fr_0.65fr_0.85fr_1fr_1.1fr_0.75fr] gap-3 border-y border-studio-line bg-[#F8FAFC] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-studio-soft lg:grid">
              <span>Vehicle</span>
              <span>Status</span>
              <span>Location</span>
              <span>Next booking</span>
              <span>Next action</span>
              <span>Assigned staff</span>
            </div>
            <div className="divide-y divide-studio-line bg-white">
              {liveFleet.map((vehicle, index) => {
                const displayStatus = vehicle.status === "Delivered" ? "Delivery" : vehicle.status;
                const nextAction =
                  vehicle.status === "Available"
                    ? `Idle ${["18m", "42m", "1h 05m", "2h 10m"][index % 4]}`
                    : vehicle.status === "Cleaning"
                      ? `${["10:40", "12:20", "13:15"][index % 3]} · finish prep`
                      : vehicle.status === "Maintenance"
                        ? `${["11:30", "15:30", "17:00"][index % 3]} · service check`
                        : vehicle.status === "Delivered"
                          ? `${["10:15", "14:00", "16:45"][index % 3]} · customer handover`
                          : "Confirm docs and payment";

                return (
                  <div
                    className="grid gap-3 px-4 py-3 text-sm lg:grid-cols-[1.1fr_0.65fr_0.85fr_1fr_1.1fr_0.75fr] lg:items-center"
                    key={vehicle.id}
                  >
                    <div>
                      <p className="font-semibold text-[#081B33]">{vehicle.model}</p>
                      <p className="mt-0.5 text-xs text-studio-soft">{vehicle.plate}</p>
                    </div>
                    <StatusPill value={displayStatus} />
                    <p className="font-medium text-studio-muted">{vehicle.location}</p>
                    <p className="text-studio-muted">{vehicle.nextBooking}</p>
                    <p className="font-semibold text-[#081B33]">{nextAction}</p>
                    <p className="text-studio-muted">{["Amelia", "Omar", "Sofia", "Noah", "Riya"][index % 5]}</p>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        <Card className="border-white shadow-[0_18px_60px_rgba(8,27,51,0.06)]">
          <CardHeader className="py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-studio-soft">Team workload</p>
            <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#081B33]">Tasks Panel</h2>
          </CardHeader>
          <CardBody className="space-y-3 pt-0">
            {dashboardTasks.map((task) => {
              const priorityClass =
                task.priority === "High"
                  ? "bg-rose-50 text-rose-700"
                  : task.priority === "Medium"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-emerald-50 text-emerald-700";

              return (
                <div className="rounded-2xl border border-studio-line bg-[#F8FAFC] p-3" key={task.title}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold leading-5 text-[#081B33]">{task.title}</p>
                    <span className={cn("rounded-full px-2 py-1 text-[11px] font-semibold", priorityClass)}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-studio-muted">
                    <span>{task.assignedTo}</span>
                    <span>Due {task.due}</span>
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_330px]">
        <Card className="border-white shadow-[0_18px_60px_rgba(8,27,51,0.06)]">
          <CardHeader className="py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-studio-soft">Utility</p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#081B33]">Available Tasks Quick Assign</h2>
              </div>
              <Button size="sm" variant="primary">Create task</Button>
            </div>
          </CardHeader>
          <CardBody className="grid gap-3 pt-0 lg:grid-cols-2">
            {dashboardAssignableTasks.map((task) => {
              const priorityClass =
                task.priority === "High"
                  ? "bg-rose-50 text-rose-700"
                  : task.priority === "Medium"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-emerald-50 text-emerald-700";

              return (
                <div
                  className="rounded-2xl border border-studio-line bg-white p-3 shadow-sm"
                  key={task.title}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold leading-5 text-[#081B33]">{task.title}</p>
                      <p className="mt-1 text-xs leading-5 text-studio-muted">{task.context}</p>
                    </div>
                    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", priorityClass)}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 rounded-xl bg-[#F8FAFC] p-2 text-xs sm:grid-cols-3">
                    <div>
                      <p className="text-studio-soft">Due</p>
                      <p className="mt-0.5 font-semibold text-[#081B33]">{task.due}</p>
                    </div>
                    <div>
                      <p className="text-studio-soft">Assign to</p>
                      <p className="mt-0.5 font-semibold text-[#081B33]">{task.suggestedAssignee}</p>
                    </div>
                    <div className="sm:text-right">
                      <Button className="h-8 px-3" size="sm" variant="secondary">Assign</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardBody>
        </Card>

        <Card className="border-white bg-[#081B33] text-white shadow-[0_18px_60px_rgba(8,27,51,0.12)]">
          <CardBody className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#31C7B7]">Payments & docs</p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em]">Blocking handovers</h2>
              </div>
              <Badge className="border-white/[0.10] bg-white/[0.08] text-white">10 blockers</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-white/[0.70]">
              These items must clear before dispatch can release vehicles to customers.
            </p>
            <div className="mt-5 space-y-3">
              {[
                ["5", "Deposits pending", "AED 18.4k open", "Send payment links"],
                ["3", "Missing documents", "2 Emirates IDs, 1 visit visa", "Request uploads"],
                ["2", "Agreements unsigned", "Escalade and Tahoe", "Send e-sign links"],
              ].map(([value, label, detail, action]) => (
                <div className="rounded-2xl border border-white/[0.10] bg-white/[0.06] p-3" key={label}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-2xl font-semibold tracking-[-0.05em]">{value}</p>
                    <span className="rounded-full bg-[#31C7B7]/20 px-2.5 py-1 text-xs font-semibold text-[#8FF3E9]">
                      {action}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-white">{label}</p>
                  <p className="mt-0.5 text-xs leading-5 text-white/[0.64]">{detail}</p>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full border-[#31C7B7] bg-[#31C7B7] text-[#061B33] hover:bg-[#28b5a7]" variant="primary">
              Open blocker queue
            </Button>
          </CardBody>
        </Card>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-studio-soft">Latest</p>
            <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#081B33]">Activity Feed</h2>
          </div>
          <p className="text-sm text-studio-muted">Compact operational log</p>
        </div>
        <Card className="border-white shadow-[0_14px_45px_rgba(8,27,51,0.05)]">
          <CardBody className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboardActivityFeed.map((item) => {
              const FeedIcon = item.icon;
              return (
                <div className="rounded-2xl border border-studio-line bg-[#F8FAFC] p-3" key={`${item.time}-${item.title}`}>
                  <div className="flex items-center gap-2">
                    <FeedIcon aria-hidden="true" className="h-4 w-4 text-[#31C7B7]" />
                    <p className="text-xs font-semibold tabular-nums text-studio-soft">{item.time}</p>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-[#081B33]">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-studio-muted">{item.detail}</p>
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
  const assignment =
    conversation.assignedTo === "Unassigned"
      ? "Needs assignment"
      : conversation.assignedTo === "Amelia"
        ? "Assigned to you"
        : `Assigned to ${conversation.assignedTo}`;

  return (
    <button
      className={cn(
        "w-full rounded-2xl border p-4 text-left transition duration-200",
        active
          ? "border-[#31C7B7] bg-[#E7FAF7] shadow-[0_12px_34px_rgba(8,27,51,0.08)]"
          : "border-studio-line bg-white hover:-translate-y-0.5 hover:border-studio-soft/60",
      )}
      onClick={onClick}
      type="button"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="truncate text-sm font-semibold text-[#081B33]">{customer.name}</p>
        <StatusPill value={conversation.status} />
      </div>
      <p className="mt-2 line-clamp-2 text-sm leading-5 text-studio-muted">{conversation.lastMessage}</p>
      <div className="mt-3 flex items-center justify-between gap-3 text-xs font-medium">
        <span className="text-studio-soft">{conversation.waitingMinutes}m waiting</span>
        <span className={cn(conversation.assignedTo === "Unassigned" ? "text-rose-600" : "text-studio-muted")}>
          {assignment}
        </span>
      </div>
    </button>
  );
}

function InboxView() {
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const [activeQueue, setActiveQueue] = useState("All");
  const selected = conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0];
  const customer = getCustomer(selected.customerId);
  const currentBookings = bookings.filter((booking) => booking.customerId === customer.id).slice(0, 2);
  const SourceIcon = sourceIcons[selected.source];
  const visibleConversations = conversations.filter((conversation) => {
    if (conversation.id === selectedId) {
      return true;
    }

    if (activeQueue === "Mine") {
      return conversation.assignedTo === "Amelia";
    }

    if (activeQueue === "Unassigned") {
      return conversation.assignedTo === "Unassigned";
    }

    if (activeQueue === "Awaiting Reply") {
      return conversation.status === "Awaiting reply";
    }

    if (activeQueue === "New Leads") {
      return conversation.stage === "New enquiry" || conversation.source.includes("Ads") || conversation.source === "Website";
    }

    return true;
  });
  const assignment =
    selected.assignedTo === "Unassigned"
      ? "Needs assignment"
      : selected.assignedTo === "Amelia"
        ? "Assigned to you"
        : `Assigned to ${selected.assignedTo}`;
  const profileRows = [
    ["Customer since", customer.since],
    ["Past rentals", String(customer.previousBookings.length)],
    ["Average spend", formatCurrency(Math.round(customer.lifetimeSpend / Math.max(customer.previousBookings.length, 1)))],
    ["Open bookings", String(currentBookings.length || 1)],
    ["Documents uploaded", "Passport, Emirates ID"],
    ["Deposit status", selected.stage === "Payment" ? "Pending" : "Deposit held"],
  ];

  return (
    <div className="grid gap-5 2xl:grid-cols-[340px_minmax(0,1fr)_330px]">
        <Card className="overflow-hidden border-white shadow-[0_18px_60px_rgba(8,27,51,0.06)]">
          <CardHeader className="bg-white pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-studio-soft">Shared queue</p>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-[#081B33]">Unified Inbox</h2>
              </div>
              <Badge tone="accent">{visibleConversations.length} open</Badge>
            </div>
            <div className="mt-4 flex gap-2">
              <Input className="h-9 bg-[#F8FAFC]" placeholder="Search name, plate, source..." />
              <Button className="h-9 w-9 shrink-0 rounded-xl p-0" variant="secondary">
                <Filter aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
            <div className="studio-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
              {inboxQueues.map((queue) => (
                <button
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition",
                    activeQueue === queue.label
                      ? "border-[#31C7B7] bg-[#31C7B7] text-[#061B33]"
                      : "border-studio-line bg-white text-studio-muted hover:text-[#081B33]",
                  )}
                  key={queue.label}
                  onClick={() => setActiveQueue(queue.label)}
                  type="button"
                >
                  {queue.label} <span className="ml-1 opacity-70">{queue.count}</span>
                </button>
              ))}
            </div>
          </CardHeader>
          <CardBody className="studio-scrollbar max-h-[760px] space-y-2 overflow-auto bg-[#F5F6F8] p-3">
            {visibleConversations.slice(0, 18).map((conversation) => (
              <ConversationListItem
                active={conversation.id === selected.id}
                conversation={conversation}
                key={conversation.id}
                onClick={() => setSelectedId(conversation.id)}
              />
            ))}
          </CardBody>
        </Card>

        <Card className="min-h-[760px] overflow-hidden border-white shadow-[0_18px_60px_rgba(8,27,51,0.06)]">
          <CardHeader className="border-[#E3E8EE] bg-white">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-semibold tracking-[-0.055em] text-[#081B33]">{customer.name}</h2>
                  <StatusPill value={selected.status} />
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-studio-muted">
                  <SourceIcon aria-hidden="true" className="h-4 w-4 text-[#31C7B7]" />
                  <span>{selected.source}</span>
                  <span>·</span>
                  <span className={selected.assignedTo === "Unassigned" ? "font-semibold text-rose-600" : "font-semibold text-studio-muted"}>
                    {assignment}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody className="space-y-4 bg-[#F5F6F8]">
            <div className="rounded-2xl border border-studio-line bg-white p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#081B33]">
                <Sparkles aria-hidden="true" className="h-4 w-4 text-[#31C7B7]" />
                AI thread summary
              </div>
              <p className="mt-2 text-sm leading-6 text-studio-muted">
                {customer.name} is asking about {customer.preferredVehicles[0]}. They need a clear reply on availability,
                delivery timing, and payment next step.
              </p>
            </div>

            <div className="studio-scrollbar max-h-[560px] space-y-4 overflow-auto rounded-2xl border border-studio-line bg-white p-4">
              {selected.messages.map((message) => (
                <div
                  className={cn("flex", message.from === "team" ? "justify-end" : "justify-start")}
                  key={`${message.time}-${message.text}`}
                >
                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl border px-4 py-3 shadow-sm",
                      message.from === "team"
                        ? "border-[#31C7B7]/30 bg-[#081B33] text-white"
                        : "border-studio-line bg-[#F8FAFC] text-[#081B33]",
                    )}
                  >
                    <p className={cn("text-xs", message.from === "team" ? "text-white/[0.72]" : "text-studio-soft")}>
                      {message.author} · {message.time}
                    </p>
                    <p className="mt-1 text-sm leading-6">{message.text}</p>
                    {message.from === "customer" && message.time === "09:06" ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-studio-line bg-white px-2.5 py-1 text-xs font-medium text-[#081B33]">
                          <Photo aria-hidden="true" className="h-3.5 w-3.5 text-[#31C7B7]" />
                          Payment screenshot
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-studio-line bg-white px-2.5 py-1 text-xs font-medium text-[#081B33]">
                          <FileText aria-hidden="true" className="h-3.5 w-3.5 text-[#31C7B7]" />
                          Emirates ID.pdf
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-studio-line bg-white p-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {inboxQuickReplies.map((reply) => (
                  <button
                    className="rounded-xl border border-studio-line bg-[#F8FAFC] px-3 py-2 text-sm font-medium text-[#081B33] transition hover:border-[#31C7B7]"
                    key={reply}
                    type="button"
                  >
                    {reply}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  className="border-transparent bg-[#F8FAFC]"
                  placeholder={`Reply to ${customer.name}...`}
                />
                <Button className="h-10 w-10 shrink-0 rounded-xl p-0" variant="secondary">
                  <Paperclip aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">Add attachment</span>
                </Button>
                <Button className="h-10 w-10 shrink-0 rounded-xl p-0" variant="secondary">
                  <Photo aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">Add image</span>
                </Button>
                <Button className="h-10 w-10 shrink-0 rounded-xl p-0" variant="primary">
                  <Send aria-hidden="true" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="space-y-5">
          <Card className="overflow-hidden border-white shadow-[0_18px_60px_rgba(8,27,51,0.06)]">
            <CardHeader className="bg-[#081B33] text-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#31C7B7]">Customer intelligence</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.04em]">{customer.name}</h3>
                  <p className="mt-1 text-sm text-white/[0.68]">{customer.location} · customer since {customer.since}</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {profileRows.map(([label, value]) => (
                  <div className="rounded-xl border border-studio-line bg-[#F8FAFC] p-3" key={label}>
                    <p className="text-xs text-studio-soft">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-[#081B33]">{value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-studio-soft">Preferred cars</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {customer.preferredVehicles.map((vehicle) => (
                    <Badge key={vehicle}>{vehicle}</Badge>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-white shadow-[0_18px_60px_rgba(8,27,51,0.06)]">
            <CardHeader>
              <h3 className="font-semibold tracking-[-0.03em] text-[#081B33]">Customer timeline</h3>
            </CardHeader>
            <CardBody className="space-y-3">
              {inboxTimeline.map((item) => (
                <div className="flex gap-3" key={item.label}>
                  <div className={cn(
                    "mt-1 h-2.5 w-2.5 rounded-full",
                    item.status === "Done" ? "bg-emerald-500" : item.status === "Open" ? "bg-amber-500" : "bg-studio-soft",
                  )} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#081B33]">{item.label}</p>
                    <p className="mt-0.5 text-xs text-studio-muted">{item.time} · {item.status}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
  );
}

function CustomersView() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0].id);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const selectedCustomer = getCustomer(selectedCustomerId);
  const currentBooking = bookings.find((booking) => booking.id === selectedCustomer.currentBookingId);
  const toggleEditing = (section: string) => {
    setEditingSection((current) => (current === section ? null : section));
  };

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
        <CustomerSummary
          customer={selectedCustomer}
          editing={editingSection === "details"}
          onEdit={() => toggleEditing("details")}
        />

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold tracking-[-0.03em] text-studio-ink">Current booking</h3>
                <CardMenu
                  items={[
                    { label: "Edit booking", onClick: () => toggleEditing("booking") },
                    { label: "Update", onClick: () => toggleEditing("booking") },
                    { label: "Archive", tone: "danger" },
                  ]}
                />
              </div>
            </CardHeader>
            <CardBody>
              {currentBooking ? (
                <>
                  <BookingRow booking={currentBooking} compact />
                  {editingSection === "booking" ? (
                    <EditPanel>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-studio-soft">Car</span>
                          <select className={editFieldClass} defaultValue={currentBooking.vehicleId}>
                            {vehicles.slice(0, 10).map((vehicle) => (
                              <option key={vehicle.id} value={vehicle.id}>{vehicle.model}</option>
                            ))}
                          </select>
                        </label>
                        <Input label="Pickup" defaultValue={currentBooking.pickup} />
                        <Input label="Return" defaultValue={currentBooking.returnAt} />
                        <Input label="Amount" defaultValue={String(currentBooking.value)} />
                        <label className="block sm:col-span-2">
                          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-studio-soft">Status</span>
                          <select className={editFieldClass} defaultValue={currentBooking.status}>
                            {["Confirmed", "In progress", "Awaiting payment", "Draft", "Completed"].map((status) => (
                              <option key={status}>{status}</option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        <Button size="sm" variant="secondary">Cancel</Button>
                        <Button size="sm" variant="primary">Save booking</Button>
                      </div>
                    </EditPanel>
                  ) : null}
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-studio-line bg-studio-panel p-6 text-sm text-studio-muted">
                  No active booking. Suggested follow-up available from customer preferences.
                </div>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold tracking-[-0.03em] text-studio-ink">Documents</h3>
                <CardMenu
                  items={[
                    { label: "Edit", onClick: () => toggleEditing("documents") },
                    { label: "Update", onClick: () => toggleEditing("documents") },
                    { label: "Archive", tone: "danger" },
                  ]}
                />
              </div>
            </CardHeader>
            <CardBody className="space-y-3">
              {selectedCustomer.uploadedDocuments.map((document) => (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-studio-line bg-studio-panel p-3" key={document.name}>
                  <div className="flex items-center gap-2">
                    <FileText aria-hidden="true" className="h-4 w-4 text-studio-soft" />
                    <p className="text-sm font-medium text-studio-ink">{document.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusPill value={document.status} />
                    <CardMenu
                      items={[
                        { label: "Replace document", onClick: () => toggleEditing(`document:${document.name}`) },
                        { label: "Mark verified", onClick: () => toggleEditing(`document:${document.name}`) },
                        { label: "Mark missing", onClick: () => toggleEditing(`document:${document.name}`) },
                        { label: "Update expiry", onClick: () => toggleEditing(`document:${document.name}`) },
                      ]}
                    />
                  </div>
                </div>
              ))}
              {editingSection?.startsWith("document:") || editingSection === "documents" ? (
                <EditPanel>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input label="Document name" defaultValue={selectedCustomer.uploadedDocuments[0]?.name} />
                    <label className="block">
                      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-studio-soft">Status</span>
                      <select className={editFieldClass} defaultValue="Verified">
                        {["Verified", "Expiring", "Missing"].map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                    </label>
                    <Input label="Expiry date" defaultValue="20 Jun 2027" />
                    <Input label="Replace file" defaultValue="Upload new file..." />
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button size="sm" variant="secondary">Cancel</Button>
                    <Button size="sm" variant="primary">Update document</Button>
                  </div>
                </EditPanel>
              ) : null}
            </CardBody>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold tracking-[-0.03em] text-studio-ink">Internal notes</h3>
                <CardMenu
                  items={[
                    { label: "Add note", onClick: () => toggleEditing("notes") },
                    { label: "Edit", onClick: () => toggleEditing("notes") },
                    { label: "Delete note", onClick: () => toggleEditing("notes"), tone: "danger" },
                  ]}
                />
              </div>
            </CardHeader>
            <CardBody className="space-y-3">
              {selectedCustomer.notes.map((note) => (
                <div className="flex items-start justify-between gap-3 rounded-xl border border-studio-line bg-studio-panel p-4 text-sm leading-6 text-studio-muted" key={note}>
                  <span>{note}</span>
                  <CardMenu
                    items={[
                      { label: "Edit", onClick: () => toggleEditing(`note:${note}`) },
                      { label: "Update", onClick: () => toggleEditing(`note:${note}`) },
                      { label: "Delete", onClick: () => toggleEditing(`note:${note}`), tone: "danger" },
                    ]}
                  />
                </div>
              ))}
              {editingSection === "notes" || editingSection?.startsWith("note:") ? (
                <EditPanel>
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-studio-soft">Note</span>
                    <textarea
                      className="min-h-24 w-full rounded-xl border border-studio-line bg-white px-3 py-2 text-sm text-studio-ink outline-none focus:border-[#31C7B7] focus:ring-4 focus:ring-[#31C7B7]/10"
                      defaultValue={selectedCustomer.notes[0]}
                    />
                  </label>
                  <div className="mt-3 flex justify-end gap-2">
                    <Button size="sm" variant="secondary">Delete</Button>
                    <Button size="sm" variant="primary">Save note</Button>
                  </div>
                </EditPanel>
              ) : null}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold tracking-[-0.03em] text-studio-ink">Payment history</h3>
                <CardMenu
                  items={[
                    { label: "Edit", onClick: () => toggleEditing("payments") },
                    { label: "Update", onClick: () => toggleEditing("payments") },
                    { label: "Archive", tone: "danger" },
                  ]}
                />
              </div>
            </CardHeader>
            <CardBody className="space-y-3">
              {selectedCustomer.paymentHistory.map((payment) => (
                <div className="rounded-xl border border-studio-line bg-white p-3" key={payment.label}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-studio-ink">{payment.label}</p>
                      <p className="mt-1 text-xs text-studio-muted">{formatCurrency(payment.amount)}</p>
                      <p className="mt-0.5 text-xs text-studio-soft">
                        {payment.status === "Deposit held"
                          ? `Deposit held • ${payment.method}`
                          : `${payment.status} via ${payment.method}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusPill value={payment.status} />
                      <CardMenu
                        items={[
                          { label: "Edit", onClick: () => toggleEditing(`payment:${payment.label}`) },
                          { label: payment.status === "Paid" ? "Mark pending" : "Mark paid", onClick: () => toggleEditing(`payment:${payment.label}`) },
                          { label: "Update method", onClick: () => toggleEditing(`payment:${payment.label}`) },
                        ]}
                      />
                    </div>
                  </div>
                  {editingSection === "payments" || editingSection === `payment:${payment.label}` ? (
                    <EditPanel>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Input label="Amount" defaultValue={String(payment.amount)} />
                        <Input label="Date" defaultValue={payment.date} />
                        <label className="block">
                          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-studio-soft">Payment status</span>
                          <select className={editFieldClass} defaultValue={payment.status}>
                            {["Paid", "Pending", "Deposit held"].map((status) => (
                              <option key={status}>{status}</option>
                            ))}
                          </select>
                        </label>
                        <label className="block">
                          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-studio-soft">Payment method</span>
                          <select className={editFieldClass} defaultValue={payment.method}>
                            {["Cash", "Card", "Bank transfer", "Payment link"].map((method) => (
                              <option key={method}>{method}</option>
                            ))}
                          </select>
                        </label>
                        <label className="block sm:col-span-2">
                          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-studio-soft">Notes</span>
                          <textarea
                            className="min-h-20 w-full rounded-xl border border-studio-line bg-white px-3 py-2 text-sm text-studio-ink outline-none focus:border-[#31C7B7] focus:ring-4 focus:ring-[#31C7B7]/10"
                            defaultValue={payment.notes}
                          />
                        </label>
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        <Button size="sm" variant="secondary">Cancel</Button>
                        <Button size="sm" variant="primary">Save payment</Button>
                      </div>
                    </EditPanel>
                  ) : null}
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
  icon: AppIcon;
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
    <Card className="border-white shadow-[0_18px_60px_rgba(8,27,51,0.06)]">
      <CardHeader className="bg-white">
        <div className="flex items-center gap-2">
          <Bot aria-hidden="true" className="h-4 w-4 text-studio-purple" />
          <h2 className="font-semibold tracking-[-0.03em] text-[#081B33]">AI concepts, only where useful</h2>
        </div>
      </CardHeader>
      <CardBody className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {aiDemoCards.map((card) => (
          <div className="rounded-2xl border border-studio-line bg-white p-4 shadow-sm" key={card.title}>
            <p className="text-sm font-semibold text-[#081B33]">{card.title}</p>
            <p className="mt-2 text-sm leading-6 text-[#3F4B5D]">{card.body}</p>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

function HeroQuestionBar() {
  return (
    <Card className="mb-6 overflow-hidden border-studio-line bg-white shadow-[0_18px_60px_rgba(8,27,51,0.08)]">
      <CardBody className="relative p-5 sm:p-6">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-[#E7FAF7] to-transparent md:block" />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-black">
              <Plane aria-hidden="true" className="h-4 w-4 text-[#31C7B7]" />
              Ask the operation anything
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black">
              Try these demo searches:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Search for whose payment is pending",
                "Which SUVs are available today?",
                "Who has not replied to customers?",
                "Show today's DXB pickups",
              ].map((prompt) => (
                <span
                  className="rounded-full border border-studio-line bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-black"
                  key={prompt}
                >
                  {prompt}
                </span>
              ))}
            </div>
          </div>
          <Button className="border-[#31C7B7] bg-[#31C7B7] text-[#061B33] hover:bg-[#28b5a7]" variant="primary">
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
      <HeroQuestionBar />
      {content}
    </>
  );
}
