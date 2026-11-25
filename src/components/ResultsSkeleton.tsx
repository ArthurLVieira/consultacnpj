export function ResultsSkeleton() {
  return (
    <div className="mt-6 space-y-6" aria-busy="true" aria-live="polite">
      <div className="h-28 animate-pulse rounded-2xl bg-slate-200" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-48 animate-pulse rounded-2xl bg-slate-200 lg:col-span-2" />
        <div className="h-48 animate-pulse rounded-2xl bg-slate-200" />
      </div>
      <div className="h-40 animate-pulse rounded-2xl bg-slate-200" />
    </div>
  );
}
