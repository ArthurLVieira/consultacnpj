import { Users } from "lucide-react";
import type { Socio } from "../types/cnpj";
import { Card } from "./Card";
import { formatDate } from "../utils/formatters";

export function SociosList({ socios }: { socios: Socio[] }) {
  return (
    <Card title="Quadro societário" icon={<Users className="h-4 w-4" />}>
      {socios.length === 0 ? (
        <p className="text-sm text-slate-500">Nenhum sócio informado.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {socios.map((s) => (
            <li
              key={`${s.cpf_cnpj_socio}-${s.nome}`}
              className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">{s.nome}</p>
                <p className="text-xs text-slate-500">
                  {s.qualificacao_socio?.descricao?.trim() || "—"} · {s.tipo}
                  {s.faixa_etaria ? ` · ${s.faixa_etaria}` : ""}
                </p>
              </div>
              <p className="text-xs text-slate-400 sm:text-right">
                Desde {formatDate(s.data_entrada)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
