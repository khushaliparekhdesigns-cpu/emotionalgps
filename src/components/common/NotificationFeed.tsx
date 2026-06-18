import { BellRing, CheckCircle2, CircleDot } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import type { StudioNotification } from "../../types";

type NotificationFeedProps = {
  notifications: StudioNotification[];
};

const notificationStyles: Record<
  StudioNotification["tone"],
  { icon: LucideIcon; tone: string }
> = {
  attention: {
    icon: BellRing,
    tone: "bg-rose-50 text-rose-700 ring-rose-200/70",
  },
  neutral: {
    icon: CircleDot,
    tone: "bg-studio-purple-soft text-studio-purple ring-studio-purple/15",
  },
  success: {
    icon: CheckCircle2,
    tone: "bg-emerald-50 text-emerald-700 ring-emerald-200/70",
  },
};

export function NotificationFeed({ notifications }: NotificationFeedProps) {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => {
        const style = notificationStyles[notification.tone];
        const Icon = style.icon;

        return (
          <article
            className="rounded-2xl border border-studio-line/65 bg-white/50 p-4"
            key={notification.title}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full ring-1",
                  style.tone,
                )}
              >
                <Icon aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h3 className="text-sm font-semibold tracking-[-0.02em] text-studio-ink">
                    {notification.title}
                  </h3>
                  <span className="text-[11px] font-medium text-studio-soft">
                    {notification.meta}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-5 text-studio-muted">
                  {notification.message}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
