import clsx from "clsx";
import type { CnpjResponse } from "../types/cnpj";
import { Building2 } from "lucide-react";

function situacaoVariant(situacao: string): "success" | "warning" | "danger" {
  const s = situacao.toLowerCase();
  if (s === "ativa") return "success";
  if (s.includes("baixada") || s.includes("inapta") || s.includes("nula"))
    return "danger";
  return "warning";
}

export function CompanyHeader({ data }: { data: CnpjResponse }) {
  const est = data.estabelecimento;

  return (
    <header
      className={clsx(
        "rounded-2xl bg-gradient-to-br from-brand-600",
        "to-brand-800 p-6 text-white shadow-md",
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={clsx(
              "grid h-12 w-12 shrink-0 place-items-center rounded-xl",
              "bg-white/15 ring-1 ring-white/25",
            )}
          >
            <Building2 className="h-6 w-6" />
          </div>
          <div className="min-w-0"></div>
        </div>
      </div>
    </header>
  );
}
