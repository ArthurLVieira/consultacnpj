import { useState, type FormEvent } from "react";
import { formatCnpj, isValidCnpj, onlyDigits } from "../utils/cnpj";
import { Loader2, Search } from "lucide-react";
import clsx from "clsx";

interface Props {
  onSearch: (cnpj: string) => void;
  loading: boolean;
}

export function SearchBar({ onSearch, loading }: Props) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const digts = onlyDigits(value);
  const invalid = touched && digts.length > 0 && !isValidCnpj(digts);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValidCnpj(digts)) return;
    onSearch(digts);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:flex-row sm:items-start"
    >
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-slate-400" />
        </div>

        <input
          id="cnpj"
          aria-label="CNPJ"
          inputMode="numeric"
          autoComplete="off"
          placeholder="00.000.000/0000-00"
          maxLength={18}
          value={value}
          onChange={(e) => setValue(formatCnpj(e.target.value))}
          onBlur={() => setTouched(true)}
          disabled={loading}
          className={clsx(
            "w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-3 text-sm font-medium",
            "tracking-wide outline-none transition focus:bg-white focus:ring-2",
            invalid
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-slate-200 focus:border-brand-400 focus:ring-brand-100",
          )}
        />

        {invalid && (
          <p className="absolute -bottom-5 left-1 text-xs font-medium text-red-600">
            CNPJ inválido
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={clsx(
          "inline-flex h-[46px] items-center justify-center gap-2 rounded-xl bg-brand-600",
          "px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Consultando…" : "Consultar"}
      </button>
    </form>
  );
}
