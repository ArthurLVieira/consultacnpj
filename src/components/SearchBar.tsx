import { useState, type FormEvent } from "react";
import { formatCnpj, isValidCnpj, onlyDigits } from "../utils/cnpj";
import clsx from "clsx";
import { Loader2, Search } from "lucide-react";

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
      className={clsx(
        "mt-8 flex flex-col gap-2 rounded-2xl border border-slate-200",
        "bg-white p-4 shadow-lg sm:flex-row sm:items-center",
      )}
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 translate-y-1/2 text-slate-400" />
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
          className={clsx(
            "w-full rounded-xl border bg-slate-50 py-3 pl-9 pr-3 text-sm",
            "font-medium tracking-wide outline-none transition focus:bg-white focus:ring-2",
            invalid
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-slate-200 focus:border-brand-400 focus:ring-brand-100",
          )}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Consultando…" : "Consultar"}
      </button>
      {invalid && (
        <p className="w-full text-xs font-medium text-red-600 sm:absolute sm:mt-16">
          CNPJ inválido
        </p>
      )}
    </form>
  );
}
