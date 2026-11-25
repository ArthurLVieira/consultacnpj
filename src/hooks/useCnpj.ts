import { useCallback, useRef, useState } from "react";
import { CnpjApiError, fetchCnpj } from "../services/cnpjService";
import { type CnpjResponse } from "../types/cnpj";

type Status = "idle" | "loading" | "success" | "error";

function toFriendlyMessage(err: unknown): string {
  if (err instanceof CnpjApiError) {
    if (err.status === 404) return "CNPJ não encontrado na base de dados.";
    if (err.status === 429)
      return "Limite de consultas atingido. Aguarde alguns instantes e tente novamente";
    return err.message;
  }

  if (err instanceof TypeError) {
    return "Falha de conexão. Verifique sua internet e tente novamente.";
  }
  return "Erro inesperado ao consultar o CNPJ";
}

export function useCnpj() {
  const [data, setData] = useState<CnpjResponse | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (cnpj: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setError(null);
    setData(null);

    try {
      const result = await fetchCnpj(cnpj, controller.signal);
      if (controller.signal.aborted) return;
      setData(result);
      setStatus("success");
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(toFriendlyMessage(err));
      setStatus("error");
    }
  }, []);

  const rest = useCallback(() => {
    abortRef.current?.abort();
    setData(null);
    setError(null);
    setStatus("idle");
  }, []);

  return { data, status, error, search, rest };
}
