import {
  Briefcase,
  Building,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import type { CnpjResponse } from "../types/cnpj";
import {
  formatCep,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatPhone,
} from "../utils/formatters";
import { Card } from "./Card";
import { CompanyHeader } from "./CompanyHeader";
import { InfoItem } from "./InfoItem";
import { Badge } from "./Badge";
import { SociosList } from "./SociosList";

function buildEndereco(est: CnpjResponse["estabelecimento"]): string {
  const linha1 = [est.tipo_logradouro, est.logradouro]
    .filter(Boolean)
    .join(" ");
  const linha2 = [est.numero, est.complemento].filter(Boolean).join(", ");
  return [linha1, linha2, est.bairro].filter(Boolean).join(" . ") || "-";
}

export function CompanyDetails({ data }: { data: CnpjResponse }) {
  const est = data.estabelecimento;

  const telefones = [
    formatPhone(est.ddd1, est.telefone1),
    formatPhone(est.ddd2, est.telefone2),
  ].filter((t) => t !== "-");

  return (
    <div className="space-y-6">
      <CompanyHeader data={data} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          title="Dados cadastrais"
          icon={<Building className="h-4 w-4" />}
          className="lg:col-span-2"
        >
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoItem
              label="CNPJ"
              value={<span className="font-mono">{est.cnpj}</span>}
            />
            <InfoItem label="Tipo" value={est.tipo} />
            <InfoItem
              label="Capital social"
              value={formatCurrency(data.capital_social)}
            />
            <InfoItem label="Porte" value={data.porte?.descricao} />
            <InfoItem
              label="Natureza jurídica"
              value={data.natureza_juridica?.descricao}
            />
            <InfoItem
              label="Data de abertura"
              value={formatDate(est.data_inicio_atividade)}
            />
            <InfoItem
              label="Situação cadastral"
              value={est.situacao_cadastral}
            />
            <InfoItem
              label="Data da situação"
              value={formatDate(est.data_situacao_cadastral)}
            />
            <InfoItem
              label="Atualizado em"
              value={formatDateTime(data.atualizado_em)}
            />
          </dl>
        </Card>

        <Card title="Simples / MEI" icon={<ShieldCheck className="h-4 w-4" />}>
          {data.simples ? (
            <dl className="space-y-4">
              <InfoItem
                label="Simples Nacional"
                value={
                  <Badge
                    variant={
                      data.simples.simples === "Sim" ? "success" : "neutral"
                    }
                  >
                    {data.simples.simples}
                  </Badge>
                }
              />
              <InfoItem
                label="Opção"
                value={formatDate(data.simples.data_opcao_simples)}
              />
              <InfoItem
                label="MEI"
                value={
                  <Badge
                    variant={data.simples.mei === "Sim" ? "success" : "neutral"}
                  >
                    {data.simples.mei}
                  </Badge>
                }
              />
              <InfoItem
                label="Opção MEI"
                value={formatDate(data.simples.data_opcao_mei)}
              />
            </dl>
          ) : (
            <p className="text-sm text-slate-500">Não optante / sem dados.</p>
          )}
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Endereço" icon={<MapPin className="h-4 w-4" />}>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoItem label="Logradouro" value={buildEndereco(est)} />
            <InfoItem label="CEP" value={formatCep(est.cep)} />
            <InfoItem label="Cidade" value={est.cidade?.nome} />
            <InfoItem
              label="Estado"
              value={
                est.estado ? `${est.estado.nome} (${est.estado.sigla})` : "—"
              }
            />
          </dl>
        </Card>

        <Card title="Contato" icon={<Phone className="h-4 w-4" />}>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoItem
              label="Telefones"
              value={telefones.length ? telefones.join(" · ") : "—"}
            />
            <InfoItem label="E-mail" value={est.email} />
          </dl>
        </Card>
      </div>

      <Card title="Atividades" icon={<Briefcase className="h-4 w-4" />}>
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-brand-700">
              Principal
            </p>
            <p className="text-sm font-medium text-slate-800">
              <span className="mr-2 font-mono text-xs text-slate-400">
                {est.atividade_principal?.subclasse}
              </span>
              {est.atividade_principal?.descricao}
            </p>
          </div>

          {est.atividades_secundarias.length > 0 && (
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Secundárias ({est.atividades_secundarias.length})
              </p>
              <ul className="space-y-1.5">
                {est.atividades_secundarias.map((a) => (
                  <li key={a.id} className="text-sm text-slate-600">
                    <span className="mr-2 font-mono text-xs text-slate-400">
                      {a.subclasse}
                    </span>
                    {a.descricao}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <SociosList socios={data.socios ?? []} />

        <Card
          title="Inscrições estaduais"
          icon={<Landmark className="h-4 w-4" />}
        >
          {est.inscricoes_estaduais.length === 0 ? (
            <p className="text-sm text-slate-500">
              Nenhuma inscrição estadual.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {est.inscricoes_estaduais.map((ie) => (
                <li
                  key={ie.inscricao_estadual}
                  className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
                >
                  <span className="font-mono text-sm text-slate-700">
                    {ie.inscricao_estadual}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                      {ie.estado.sigla}
                    </span>
                    <Badge variant={ie.ativo ? "success" : "neutral"}>
                      {ie.ativo ? "Ativa" : "Inativa"}
                    </Badge>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
