import {
  IconCalendar,
  IconCar,
  IconChartBar,
  IconFileText,
  IconInbox,
  IconLayoutDashboard,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import type { ComponentType, SVGProps } from "react";
import type { RouteKey } from "../types";

export type StudioRoute = {
  key: RouteKey;
  label: string;
  path: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const routes: StudioRoute[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    description: "Live Dubai operational pulse for enquiries, fleet readiness, returns, and AED revenue.",
    icon: IconLayoutDashboard,
  },
  {
    key: "inbox",
    label: "Unified Inbox",
    path: "/inbox",
    description: "A shared communication hub for WhatsApp, email, web, and paid enquiries.",
    icon: IconInbox,
  },
  {
    key: "customers",
    label: "Customers",
    path: "/customers",
    description: "Every customer relationship, document, payment, and booking in one page.",
    icon: IconUsers,
  },
  {
    key: "fleet",
    label: "Fleet",
    path: "/fleet",
    description: "Visual fleet control for Dreamz UAE availability, location, rates, revenue, and utilisation.",
    icon: IconCar,
  },
  {
    key: "bookings",
    label: "Bookings",
    path: "/bookings",
    description: "Calendar-style rental planning by day, week, and month.",
    icon: IconCalendar,
  },
  {
    key: "analytics",
    label: "Analytics",
    path: "/analytics",
    description: "Revenue, utilisation, booking trends, and customer intelligence.",
    icon: IconChartBar,
  },
  {
    key: "documents",
    label: "Documents",
    path: "/documents",
    description: "Passports, Emirates IDs, visit visas, driver licences, agreements, and deposits.",
    icon: IconFileText,
  },
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    description: "Team roles, automations, sources, payment rules, and operating preferences.",
    icon: IconSettings,
  },
];

export function getRouteByPath(pathname: string) {
  return routes.find((route) => route.path === pathname) ?? routes[0];
}
