import { useThemeStore } from '../../stores/theme-store';

const presets = [
  { name: 'Neon Pulse', theme: 'neon' },
  { name: 'Midnight Drift', theme: 'midnight' },
  { name: 'Sunset Bloom', theme: 'sunset' }
];

export function ThemeGallery() {
  const { applyPreset } = useThemeStore();

  return (
    <section className="rounded-3xl border border-slate-800/60 bg-slate-950/60 p-6 text-sm text-slate-200 shadow-2xl backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Galerie de thèmes</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {presets.map((preset) => (
          <button
            key={preset.theme}
            onClick={() => applyPreset(preset.theme)}
            className="h-32 rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-800/80 via-slate-900/60 to-slate-950/80 p-4 text-left transition hover:border-neon-500"
          >
            <p className="text-base font-semibold text-white">{preset.name}</p>
            <p className="mt-1 text-xs text-slate-400">Cliquez pour appliquer ce style dans toute l'application.</p>
          </button>
        ))}
      </div>
    </section>
  );
}
