const EXAMPLES = [
  { label: "Globo", cnpj: "27865757000102" },
  { label: "Petrobras", cnpj: "33000167000101" },
  { label: "Magazine Luiza", cnpj: "47960950000121" },
];

export function EmptyState({ onPick }: { onPick: (cnpj: string) => void }) {
  return (
    <div className="mt-10 text-center">
      <p className="text-sm text-slate-500">Comece consultando um CNPJ.</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.cnpj}
            onClick={() => onPick(ex.cnpj)}
            className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 transition hover:bg-brand-100"
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
}
