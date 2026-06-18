import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

type ModalProps = {
  children: ReactNode;
  description?: string;
  open: boolean;
  title: string;
  onClose: () => void;
};

export function Modal({ children, description, open, title, onClose }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-studio-ink/14 px-4 backdrop-blur-md"
      role="dialog"
    >
      <div className="w-full max-w-lg rounded-[28px] border border-studio-line/80 bg-white/92 p-6 shadow-[0_24px_80px_rgba(33,31,27,0.12)]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl leading-none tracking-[-0.02em] text-studio-ink">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm leading-6 text-studio-muted">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            aria-label="Close modal"
            className="h-8 w-8 rounded-full p-0"
            onClick={onClose}
            size="sm"
            variant="ghost"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
