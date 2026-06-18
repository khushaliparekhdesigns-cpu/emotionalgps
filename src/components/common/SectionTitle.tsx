import type { ReactNode } from "react";

type SectionTitleProps = {
  action?: ReactNode;
  eyebrow?: string;
  title: string;
};

export function SectionTitle({ action, eyebrow, title }: SectionTitleProps) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-studio-soft">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 font-display text-2xl leading-none tracking-[-0.02em] text-studio-ink">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
