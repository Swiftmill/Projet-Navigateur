import { useThemeStore } from '../../stores/theme-store';

const sliders: {
  key: keyof ReturnType<typeof useThemeStore>['currentTheme']['colors'];
  label: string;
  max: number;
}[] = [
  { key: 'primaryHue', label: 'Teinte principale', max: 360 },
  { key: 'accentHue', label: 'Accent', max: 360 },
  { key: 'backgroundLightness', label: 'Luminosité fond', max: 100 }
];

export function ThemeEditor() {
  const { currentTheme, updateColor, exportTheme, importTheme } = useThemeStore();

  return (
    <section className="rounded-3xl border border-slate-800/60 bg-slate-950/60 p-6 text-sm text-slate-200 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Éditeur HSL</h2>
        <div className="space-x-2">
          <button
            onClick={() => exportTheme()}
            className="rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-300"
          >
            Exporter JSON
          </button>
          <label className="cursor-pointer rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-300">
            Importer
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  importTheme(reader.result as string);
                };
                reader.readAsText(file);
              }}
            />
          </label>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {sliders.map((slider) => (
          <label key={slider.key} className="flex flex-col gap-2">
            <span className="text-xs uppercase text-slate-400">{slider.label}</span>
            <input
              type="range"
              min={0}
              max={slider.max}
              value={currentTheme.colors[slider.key]}
              onChange={(event) => updateColor(slider.key, Number(event.target.value))}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
