import { AlertCircle, CheckCircle2, Clock3, Circle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import type { StudioTask, TaskStatus } from "../../types";

type TaskListProps = {
  tasks: StudioTask[];
};

const taskStyles: Record<
  TaskStatus,
  { icon: LucideIcon; label: string; tone: string }
> = {
  overdue: {
    icon: AlertCircle,
    label: "Overdue",
    tone: "bg-rose-50 text-rose-700 ring-rose-200/70",
  },
  today: {
    icon: Clock3,
    label: "Today",
    tone: "bg-studio-purple-soft text-studio-purple ring-studio-purple/15",
  },
  upcoming: {
    icon: Circle,
    label: "Upcoming",
    tone: "bg-studio-panel text-studio-muted ring-studio-line/80",
  },
  done: {
    icon: CheckCircle2,
    label: "Done",
    tone: "bg-emerald-50 text-emerald-700 ring-emerald-200/70",
  },
};

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const status = taskStyles[task.status];
        const Icon = status.icon;

        return (
          <article
            className="group rounded-2xl border border-studio-line/65 bg-studio-panel/42 p-4 transition duration-200 hover:border-studio-soft/45 hover:bg-white/74"
            key={`${task.client}-${task.title}`}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ring-1",
                  status.tone,
                )}
              >
                <Icon aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-display text-2xl leading-none tracking-[-0.02em] text-studio-ink">
                    {task.title}
                  </h3>
                  <span
                    className={cn(
                      "w-fit rounded-full px-2 py-1 text-[11px] font-medium ring-1",
                      status.tone,
                    )}
                  >
                    {status.label}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-studio-muted">
                  <span>{task.client}</span>
                  <span aria-hidden="true" className="text-studio-soft/70">
                    /
                  </span>
                  <span>{task.due}</span>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
