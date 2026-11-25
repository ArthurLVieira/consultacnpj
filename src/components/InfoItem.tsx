import type { ReactNode } from "react";

interface Props {
  label: string;
  value?: ReactNode;
}

export function InfoItem({ label, value }: Props) {
  const isEmpty = value === null || value === undefined || value === "";

  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm font-medium text-slate-800">
        {isEmpty ? "-" : value}
      </dd>
    </div>
  );
}
