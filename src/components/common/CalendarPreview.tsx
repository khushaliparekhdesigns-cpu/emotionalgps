import { CalendarDays } from "lucide-react";
import type { StudioEvent } from "../../types";
import { cn } from "../../lib/utils";

type CalendarPreviewProps = {
  events: StudioEvent[];
};

const eventTone = {
  call: "bg-studio-panel text-studio-muted",
  deadline: "bg-rose-50 text-rose-700",
  review: "bg-studio-purple-soft text-studio-purple",
};

export function CalendarPreview({ events }: CalendarPreviewProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-studio-line/65 bg-white/52 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-studio-soft">
              Calendar
            </p>
            <h3 className="mt-1 font-display text-3xl leading-none tracking-[-0.02em] text-studio-ink">
              This week
            </h3>
          </div>
          <CalendarDays aria-hidden="true" className="h-5 w-5 text-studio-purple" />
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <div
              className="rounded-full py-1 text-center text-[11px] font-medium text-studio-soft"
              key={`${day}-${index}`}
            >
              {day}
            </div>
          ))}
          {Array.from({ length: 14 }).map((_, index) => {
            const date = index + 16;
            const isSelected = date === 18 || date === 19 || date === 24;

            return (
              <div
                className={cn(
                  "grid aspect-square place-items-center rounded-full text-xs transition duration-200",
                  isSelected
                    ? "bg-studio-purple text-white shadow-[0_8px_18px_rgba(116,98,214,0.18)]"
                    : "text-studio-muted hover:bg-white/80",
                )}
                key={date}
              >
                {date}
              </div>
            );
          })}
        </div>
      </div>

      {events.map((event) => (
        <article
          className="flex gap-3 rounded-2xl border border-studio-line/65 bg-studio-panel/42 p-3.5"
          key={`${event.date}-${event.label}`}
        >
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/68 text-center">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-studio-soft">
              {event.day}
            </span>
            <span className="-mt-1 block text-sm font-semibold text-studio-ink">
              {event.date}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h4 className="truncate text-sm font-semibold tracking-[-0.02em] text-studio-ink">
                {event.label}
              </h4>
              <span
                className={cn(
                  "rounded-full px-2 py-1 text-[10px] font-medium capitalize",
                  eventTone[event.type],
                )}
              >
                {event.type}
              </span>
            </div>
            <p className="mt-1 text-[13px] text-studio-muted">{event.time}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
