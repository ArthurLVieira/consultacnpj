import { Building2 } from "lucide-react";
import { useCnpj } from "./hooks/useCnpj";
import { SearchBar } from "./components/SearchBar";
import { EmptyState } from "./components/EmptyState";
import { ResultsSkeleton } from "./components/ResultsSkeleton";
import { ErrorState } from "./components/ErrorState";
import { CompanyDetails } from "./components/CompanyDetails";

function App() {
  const { data, status, error, search } = useCnpj();

  return (
    <div className="min-h-full">
      <header className="bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 pb-16 pt-10">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 text-white">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Consulta CNPJ</h1>
            <p className="text-sm text-brand-100">
              Dados públicos de empresas brasileiras
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto -mt-8 max-w-5xl px-4 pb-20">
        <SearchBar onSearch={search} loading={status === "loading"} />

        {status === "idle" && <EmptyState onPick={search} />}
        {status === "loading" && <ResultsSkeleton />}
        {status === "error" && <ErrorState message={error} />}
        {status === "success" && data && (
          <div className="mt-6">
            <CompanyDetails data={data} />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
        Dados fornecidos por{" "}
        <a
          href="https://publica.cnpj.ws"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand-700 hover:underline"
        >
          publica.cnpj.ws
        </a>
      </footer>
    </div>
  );
}

export default App;
