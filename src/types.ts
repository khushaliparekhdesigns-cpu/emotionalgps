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
  | "inbox"
  | "customers"
  | "fleet"
  | "bookings"
  | "analytics"
  | "documents"
  | "settings";
