const EXAMPLES = [
  { label: "Globo", cnpj: "27865757000102" },
  { label: "Petrobras", cnpj: "33000167000101" },
  { label: "Magazine Luiza", cnpj: "47960950000121" },
];

export function EmptyState({ onPick }: { onPick: (cnpj: string) => void });
