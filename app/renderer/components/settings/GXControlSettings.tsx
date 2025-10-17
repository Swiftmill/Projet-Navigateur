import { useGXControlStore } from '../../stores/gx-control-store';

export function GXControlSettings() {
  const { state } = useGXControlStore();

  return (
    <section className="space-y-4 text-sm text-slate-200">
      <h2 className="text-xl font-semibold text-white">Limiteurs CPU/RAM/Réseau</h2>
      <p className="text-slate-400">
        Ajustez les seuils appliqués lorsque GX Control est actif. Les limites sont exprimées en pourcentage.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-xs uppercase text-slate-500">CPU max</label>
          <input
            type="number"
            defaultValue={(state?.limits.cpu ?? 0.8) * 100}
            className="mt-2 w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2"
          />
        </div>
        <div>
          <label className="text-xs uppercase text-slate-500">RAM max</label>
          <input
            type="number"
            defaultValue={(state?.limits.memory ?? 0.85) * 100}
            className="mt-2 w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2"
          />
        </div>
        <div>
          <label className="text-xs uppercase text-slate-500">Réseau max</label>
          <input
            type="number"
            defaultValue={(state?.limits.network ?? 0.75) * 100}
            className="mt-2 w-full rounded-xl border border-slate-700/60 bg-slate-900/60 px-3 py-2"
          />
        </div>
      </div>
    </section>
  );
}
