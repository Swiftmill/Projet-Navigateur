import { ThemeEditor } from '../theme/ThemeEditor';
import { ThemeGallery } from '../theme/ThemeGallery';

export function ThemeSettings() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">Thèmes & personnalisation</h1>
        <p className="text-sm text-slate-400">
          Ajustez les couleurs HSL, exportez vos créations et explorez la galerie communautaire.
        </p>
      </header>
      <ThemeEditor />
      <ThemeGallery />
    </div>
  );
}
