import {
  BarChart3,
  BookOpen,
  Bot,
  Calculator,
  FileText,
  FolderKanban,
  GalleryVerticalEnd,
  LayoutDashboard,
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
    description: "Today, pipeline, and design operations at a glance.",
    icon: LayoutDashboard,
  },
  {
    key: "clients",
    label: "Client Hub",
    path: "/clients",
    description: "Manage active clients, projects, notes, and next steps.",
    icon: FolderKanban,
  },
  {
    key: "ai-studio",
    label: "AI Studio",
    path: "/ai-studio",
    description: "Generate briefs, strategy, and design assets with AI.",
    icon: Bot,
  },
  {
    key: "knowledge",
    label: "Knowledge Base",
    path: "/knowledge",
    description: "Reusable process docs, brand rules, and project memory.",
    icon: BookOpen,
  },
  {
    key: "inspiration",
    label: "Inspiration Library",
    path: "/inspiration",
    description: "Curated visual references for future creative direction.",
    icon: GalleryVerticalEnd,
  },
  {
    key: "proposals",
    label: "Proposal Generator",
    path: "/proposals",
    description: "Draft high-quality proposals from a lightweight intake.",
    icon: FileText,
  },
  {
    key: "pricing",
    label: "Pricing Calculator",
    path: "/pricing",
    description: "Estimate scope, margin, and packages with confidence.",
    icon: Calculator,
  },
  {
    key: "business",
    label: "Business Dashboard",
    path: "/business",
    description: "Revenue, capacity, conversion, and operational health.",
    icon: BarChart3,
  },
];

export function getRouteByPath(pathname: string) {
  return routes.find((route) => route.path === pathname) ?? routes[0];
}
