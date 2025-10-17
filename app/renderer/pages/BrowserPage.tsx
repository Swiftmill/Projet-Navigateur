import { Omnibox } from '../components/controls/Omnibox';
import { PlayerOverlay } from '../components/controls/PlayerOverlay';

export function BrowserPage() {
  return (
    <div className="relative flex h-full flex-col">
      <Omnibox />
      <div className="flex flex-1 items-center justify-center text-slate-500">
        <p>Zone de rendu des contenus web (webview) - à connecter.</p>
      </div>
      <PlayerOverlay />
    </div>
  );
}
