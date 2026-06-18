import type { ClassValue } from "../types";

export function cn(...classes: ClassValue[]) {
  return classes
    .flatMap((value) => {
      if (!value) {
        return [];
      }

      if (Array.isArray(value)) {
        return value;
      }

      if (typeof value === "object") {
        return Object.entries(value)
          .filter(([, enabled]) => Boolean(enabled))
          .map(([className]) => className);
      }

      return [value];
    })
    .filter(Boolean)
    .join(" ");
}
