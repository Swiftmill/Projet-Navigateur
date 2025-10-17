import { NavLink, Outlet } from 'react-router-dom';

export function SettingsPage() {
  return (
    <div className="flex h-full">
      <aside className="w-64 border-r border-slate-800/60 bg-slate-950/70 p-6">
        <nav className="space-y-2 text-sm text-slate-300">
          <NavLink className={({ isActive }) => (isActive ? 'text-neon-400' : '')} to="themes">
            Thèmes
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'text-neon-400' : '')} to="gx-control">
            GX Control
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'text-neon-400' : '')} to="privacy">
            Confidentialité
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'text-neon-400' : '')} to="performance">
            Performances
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'text-neon-400' : '')} to="extensions">
            Extensions
          </NavLink>
        </nav>
      </aside>
      <div className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </div>
    </div>
  );
}
