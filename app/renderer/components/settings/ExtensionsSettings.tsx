const demoExtensions = [
  { name: 'Color Shifter', description: 'Change la couleur de fond des sites visités.', enabled: true },
  { name: 'Focus Guard', description: 'Masque les distractions et bloque certains sites.', enabled: false }
];

export function ExtensionsSettings() {
  return (
    <section className="space-y-4 text-sm text-slate-200">
      <h2 className="text-xl font-semibold text-white">Extensions Web</h2>
      <p className="text-slate-400">
        Installez des extensions compatibles Manifest v2 en déposant des archives .zip dans le dossier <code>ext/</code>.
      </p>
      <div className="space-y-3">
        {demoExtensions.map((extension) => (
          <article
            key={extension.name}
            className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 shadow-xl"
          >
            <header className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">{extension.name}</h3>
              <label className="flex items-center gap-2 text-xs text-slate-300">
                Actif
                <input type="checkbox" defaultChecked={extension.enabled} />
              </label>
            </header>
            <p className="mt-2 text-xs text-slate-400">{extension.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
