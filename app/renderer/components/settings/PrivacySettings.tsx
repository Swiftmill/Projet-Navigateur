export function PrivacySettings() {
  return (
    <section className="space-y-4 text-sm text-slate-200">
      <h2 className="text-xl font-semibold text-white">Confidentialité & blocage</h2>
      <div className="space-y-3">
        <label className="flex items-center justify-between rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3">
          <span>Activer EasyList</span>
          <input type="checkbox" defaultChecked className="h-4 w-4" />
        </label>
        <label className="flex items-center justify-between rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3">
          <span>Activer EasyPrivacy</span>
          <input type="checkbox" defaultChecked className="h-4 w-4" />
        </label>
        <label className="flex items-center justify-between rounded-2xl border border-slate-700/60 bg-slate-900/60 px-4 py-3">
          <span>Isoler les cookies par profil</span>
          <input type="checkbox" defaultChecked className="h-4 w-4" />
        </label>
      </div>
      <p className="text-xs text-slate-500">
        Les listes sont chargées depuis le dossier <code>app/main/rules</code>. Ajoutez vos propres filtres pour affiner le blocage.
      </p>
    </section>
  );
}
