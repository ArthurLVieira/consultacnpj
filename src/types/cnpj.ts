export interface Porte {
  id: string;
  descricao: string;
}
export interface NaturezaJuridica {
  id: string;
  descricao: string;
}
export interface Qualificacao {
  id: number;
  descricao: string;
}

export interface Pais {
  id: string;
  iso2?: string;
  iso3?: string;
  nome: string;
  comex_id?: string;
}

export interface Socio {
  cpf_cnpj_socio: string;
  nome: string;
  tipo: string;
  data_entrada: string;
  cpf_representante_legal?: string | null;
  nome_representante?: string | null;
  faixa_etaria: string;
  atualizado_em: string;
  pais_id: string;
  qualificacao_socio: Qualificacao;
  qualificacao_representante?: string | null;
  pais?: Pais;
}

export interface Simples {
  simples: string;
  data_opcao_simples?: string | null;
  data_exclusao_simples?: string | null;
  mei: string;
  data_opcao_mei?: string | null;
  data_exclusao_mei?: string | null;
  atualizado_em: string;
}

export interface AtividadeEconomica {
  id: string;
  secao: string;
  divisao: string;
  grupo: string;
  classe: string;
  subclasse: string;
  descricao: string;
}

export interface Estado {
  id: number;
  nome: string;
  sigla: string;
  ibge_id: number;
}

export interface Cidade {
  id: number;
  nome: string;
  ibge_id: number;
  siafi_id: string;
}

export interface InscricaoEstadual {
  inscricao_estadual: string;
  ativo: boolean;
  atualizado_em: string;
  estado: Estado;
}

export interface Estabelecimento {
  cnpj: string;
  cnpj_raiz: string;
  cnpj_ordem: string;
  cnpj_digito_verificador: string;
  tipo: string;
  nome_fantasia: string | null;
  situacao_cadastral: string;
  data_situacao_cadastral: string | null;
  data_inicio_atividade: string;
  nome_cidade_exterior: string | null;
  tipo_logradouro: string | null;
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cep: string | null;
  ddd1: string | null;
  telefone1: string | null;
  ddd2: string | null;
  telefone2: string | null;
  ddd_fax: string | null;
  fax: string | null;
  email: string | null;
  situacao_especial: string | null;
  data_situacao_especial: string | null;
  atualizado_em: string;
  atividade_principal: AtividadeEconomica;
  atividades_secundarias: AtividadeEconomica[];
  pais: Pais;
  estado: Estado;
  cidade: Cidade;
  motivo_situacao_cadastral: string | null;
  inscricoes_estaduais: InscricaoEstadual[];
}

export interface CnpjResponse {
  cnpj_raiz: string;
  razao_social: string;
  capital_social: string;
  responsavel_federativo: string;
  atualizado_em: string;
  porte: Porte;
  natureza_juridica: NaturezaJuridica;
  qualificacao_do_responsavel: Qualificacao;
  socios: Socio[];
  simples: Simples | null;
  estabelecimento: Estabelecimento;
}

export interface ApiErrorPayload {
  status: number;
  titulo: string;
  detalhes: string;
  validacao: string[];
}
