import clsx from "clsx";
import type { CnpjResponse } from "../types/cnpj";
import { Building2 } from "lucide-react";
import { formatCnpj } from "../utils/cnpj";
import { Badge } from "./Badge";

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
          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-tight sm:text-xl">
              {data.razao_social}
            </h2>
            {est.nome_fantasia && (
              <p className="mt-1 text-sm text-brand-100">{est.nome_fantasia}</p>
            )}
            <p className="mt-2 font-mono text-sm text-brand-100">
              {formatCnpj(est.cnpj)} . {est.tipo}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={situacaoVariant(est.situacao_cadastral)}>
            {est.situacao_cadastral}
          </Badge>
        </div>
      </div>
    </header>
  );
}
