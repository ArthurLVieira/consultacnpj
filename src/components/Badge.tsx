import clsx from "clsx";
import type { ReactNode } from "react";

type Variant = "success" | "warning" | "danger" | "neutral";

const classes: Record<Variant, string> = {
  success: "bg-brand-100 text-brand-800 ring-brand-200",
  warning: "bg-amber-100 text-amber-800 ring-amber-200",
  danger: "bg-red-100 text-red-800 ring-red-200",
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
};

interface Props {
  children: ReactNode;
  variant?: Variant;
}

export function Badge({ children, variant = "neutral" }: Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5",
        "text-xs font-medium ring-1 ring-inset",
        classes[variant],
      )}
    >
      {children}
    </span>
  );
}
