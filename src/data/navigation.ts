import {
  BarChart3,
  CalendarDays,
  Car,
  FileText,
  Inbox,
  LayoutDashboard,
  Settings,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { RouteKey } from "../types";

export type StudioRoute = {
  key: RouteKey;
  label: string;
  path: string;
  description: string;
  icon: LucideIcon;
};

export const routes: StudioRoute[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    description: "Live Dubai operational pulse for enquiries, fleet readiness, returns, and AED revenue.",
    icon: LayoutDashboard,
  },
  {
    key: "inbox",
    label: "Unified Inbox",
    path: "/inbox",
    description: "A shared communication hub for WhatsApp, email, web, and paid enquiries.",
    icon: Inbox,
  },
  {
    key: "customers",
    label: "Customers",
    path: "/customers",
    description: "Every customer relationship, document, payment, and booking in one page.",
    icon: UsersRound,
  },
  {
    key: "fleet",
    label: "Fleet",
    path: "/fleet",
    description: "Visual fleet control for Dreamz UAE availability, location, rates, revenue, and utilisation.",
    icon: Car,
  },
  {
    key: "bookings",
    label: "Bookings",
    path: "/bookings",
    description: "Calendar-style rental planning by day, week, and month.",
    icon: CalendarDays,
  },
  {
    key: "analytics",
    label: "Analytics",
    path: "/analytics",
    description: "Revenue, utilisation, booking trends, and customer intelligence.",
    icon: BarChart3,
  },
  {
    key: "documents",
    label: "Documents",
    path: "/documents",
    description: "Passports, Emirates IDs, visit visas, driver licences, agreements, and deposits.",
    icon: FileText,
  },
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    description: "Team roles, automations, sources, payment rules, and operating preferences.",
    icon: Settings,
  },
];

export function getRouteByPath(pathname: string) {
  return routes.find((route) => route.path === pathname) ?? routes[0];
}
