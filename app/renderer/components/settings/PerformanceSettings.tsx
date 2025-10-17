export function PerformanceSettings() {
  return (
    <section className="space-y-4 text-sm text-slate-200">
      <h2 className="text-xl font-semibold text-white">Performances & gestion des onglets</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase text-slate-500">Mise en sommeil des onglets</span>
          <select className="rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2">
            <option>Après 5 minutes</option>
            <option>Après 15 minutes</option>
            <option>Jamais</option>
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase text-slate-500">Cap mémoire</span>
          <input type="number" className="rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2" defaultValue={2048} />
        </label>
      </div>
      <p className="text-xs text-slate-500">
        Ces paramètres sont stockés localement et seront synchronisés lorsque la fonctionnalité cloud sera disponible.
      </p>
    </section>
  );
}
