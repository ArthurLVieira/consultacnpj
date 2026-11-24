import type { ApiErrorPayload, CnpjResponse } from "../types/cnpj";
import { isValidCnpj, onlyDigits } from "../utils/cnpj";

const API_BASE_URL = import.meta.env.VITE_CNPJ_API_URL ?? "/api/cnpj";

interface Props {
  readonly message: string;
  readonly status: number;
  readonly validacao?: string[];
}

export class CnpjApiError extends Error {
  readonly message: string;
  readonly status: number;
  readonly validacao?: string[];

  constructor(raw: Props) {
    super(raw.message);
    this.message = raw.message;
    this.status = raw.status;
    this.validacao = raw.validacao;
    this.name = "CnpjApiError";
  }
}

const cache = new Map<string, CnpjResponse>();

export async function fetchCnpj(
  rawCnpj: string,
  signal?: AbortSignal,
): Promise<CnpjResponse> {
  const cnpj = onlyDigits(rawCnpj);

  if (!isValidCnpj(cnpj)) {
    throw new CnpjApiError({
      message: "CNPJ inválido. verifique os dígitos informados",
      status: 400,
    });
  }

  const cached = cache.get(cnpj);
  if (cached) return cached;

  const response = await fetch(`${API_BASE_URL}/${cnpj}`, {
    method: "GET",
    headers: { accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    const payload = (await response
      .json()
      .catch(() => null)) as ApiErrorPayload | null;

    throw new CnpjApiError({
      message: payload?.titulo ?? "Não foi possível consultar o CNPJ",
      status: response.status,
      validacao: payload?.validacao,
    });
  }

  const data = (await response.json()) as CnpjResponse;
  cache.set(cnpj, data);
  return data;
}
