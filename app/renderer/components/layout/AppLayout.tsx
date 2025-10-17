import { Outlet } from 'react-router-dom';
import { TabBar } from '../controls/TabBar';
import { SideBar } from '../controls/SideBar';
import { GXControlPanel } from '../controls/GXControlPanel';
import { WindowFrame } from '../controls/WindowFrame';

export function AppLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <SideBar />
      <div className="flex flex-1 flex-col">
        <WindowFrame />
        <TabBar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
          <GXControlPanel />
        </div>
      </div>
    </div>
  );
}
