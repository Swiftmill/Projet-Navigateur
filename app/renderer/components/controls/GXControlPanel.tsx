import { useEffect } from 'react';
import { useGXControlStore } from '../../stores/gx-control-store';

export function GXControlPanel() {
  const { state, metrics, initialize, refresh } = useGXControlStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <aside className="hidden w-80 border-l border-slate-800/60 bg-slate-950/90 p-6 text-sm xl:block">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">GX Control</h2>
        <button
          onClick={async () => {
            window.hypergx.gxControl.toggle();
            await refresh();
          }}
          className={`rounded-full px-3 py-1 text-xs ${
            state?.enabled ? 'bg-neon-600/80 text-white' : 'bg-slate-800 text-slate-300'
          }`}
        >
          {state?.enabled ? 'Activé' : 'Désactivé'}
        </button>
      </div>
      <div className="mt-6 space-y-4 text-slate-300">
        <div>
          <p className="text-xs uppercase text-slate-500">CPU</p>
          <p className="text-2xl font-semibold">
            {((metrics?.cpu.load ?? 0) * 100).toFixed(0)}%
            <span className="ml-2 text-xs text-slate-500">
              / {(((state?.limits?.cpu ?? 0) * 100)).toFixed(0)}%
            </span>
          </p>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-500">Mémoire</p>
          <p>
            {(((metrics?.memory.used ?? 0) / 1024 ** 3)).toFixed(2)} Go /{' '}
            {(((metrics?.memory.total ?? 0) / 1024 ** 3)).toFixed(2)} Go
          </p>
        </div>
        <div>
          <p className="text-xs uppercase text-slate-500">Réseau</p>
          <p>
            ↓ {(metrics?.network.rx ?? 0).toFixed(2)} Mbps • ↑ {(metrics?.network.tx ?? 0).toFixed(2)} Mbps
          </p>
        </div>
        <p className="text-xs text-slate-500">
          Les limites appliquées sont logicielles et peuvent être affinées via le panneau Réglages.
        </p>
      </div>
    </aside>
  );
}
