import { AlertCircle } from "lucide-react";

export function ErrorState({ message }: { message: string | null }) {
  return (
    <div
      role="alert"
      className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <p className="text-sm font-semibold">
          Não foi possível concluir a consulta
        </p>
        <p className="mt-1 text-sm">{message ?? "Erro inesperado."}</p>
      </div>
    </div>
  );
}
