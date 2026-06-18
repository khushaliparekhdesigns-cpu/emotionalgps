import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <section
      className={cn(
        "rounded-[22px] border border-studio-line/80 bg-white/78 shadow-[0_1px_1px_rgba(33,31,27,0.035),0_18px_45px_rgba(33,31,27,0.035)] backdrop-blur",
        "transition duration-200 ease-out",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn("border-b border-studio-line/70 px-5 py-4 sm:px-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("p-5 sm:p-7", className)} {...props}>
      {children}
    </div>
  );
}
