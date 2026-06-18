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

export type TaskStatus = "overdue" | "today" | "upcoming" | "done";

export type StudioTask = {
  client: string;
  due: string;
  status: TaskStatus;
  title: string;
};

export type StudioEvent = {
  date: string;
  day: string;
  label: string;
  time: string;
  type: "call" | "review" | "deadline";
};

export type StudioNotification = {
  message: string;
  meta: string;
  tone: "neutral" | "attention" | "success";
  title: string;
};
