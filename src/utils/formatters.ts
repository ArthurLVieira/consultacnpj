import { onlyDigits } from "./cnpj";

export function formatDate(iso?: string | null): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("T")[0].split("-");
  return y && m && d ? `${d}/${m}/${y}` : "—";
}

export function formatDateTime(iso?: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export function formatCurrency(value?: string | number | null): string {
  const n = typeof value === "string" ? Number(value) : value;
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(n);
}

export function formatCep(cep?: string | null): string {
  if (!cep) return "—";
  const d = onlyDigits(cep);
  return d.length === 8 ? `${d.slice(0, 5)}-${d.slice(5)}` : cep;
}

export function formatPhone(
  ddd?: string | null,
  phone?: string | null,
): string {
  if (!phone) return "—";
  const d = onlyDigits(phone);
  const formatted =
    d.length === 9
      ? `${d.slice(0, 5)}-${d.slice(5)}`
      : d.length === 8
        ? `${d.slice(0, 4)}-${d.slice(4)}`
        : d;
  return ddd ? `(${ddd}) ${formatted}` : formatted;
}
