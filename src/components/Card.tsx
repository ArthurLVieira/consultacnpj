import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  title?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ title, icon, action, children, className = "" }: Props) {
  return (
    <section
      className={clsx(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm",
        className,
      )}
    >
      {(title || action) && (
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span className="text-brand-600">{icon}</span>}
            {title && (
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {title}
              </h2>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
