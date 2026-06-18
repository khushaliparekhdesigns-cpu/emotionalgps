export type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | undefined | null>;

export type RouteKey =
  | "dashboard"
  | "clients"
  | "ai-studio"
  | "knowledge"
  | "inspiration"
  | "proposals"
  | "pricing"
  | "business";
