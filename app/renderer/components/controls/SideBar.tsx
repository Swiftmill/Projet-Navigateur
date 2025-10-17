import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGXControlStore } from '../../stores/gx-control-store';

const links = [
  { to: '/', label: 'Navigateur', icon: '🌐' },
  { to: '/new-tab', label: 'Nouvel Onglet', icon: '✨' },
  { to: '/gx-corner', label: 'GX Corner', icon: '🎮' },
  { to: '/settings', label: 'Réglages', icon: '⚙️' }
];

export function SideBar() {
  const refreshGX = useGXControlStore((state) => state.refresh);
  return (
    <aside className="flex w-20 flex-col items-center gap-4 border-r border-slate-800/60 bg-slate-950/90 py-6">
      <div className="text-2xl font-black tracking-tight text-neon-500">GX</div>
      <nav className="flex flex-1 flex-col items-center gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex h-12 w-12 items-center justify-center rounded-2xl text-lg transition ${
                isActive ? 'bg-neon-600/70 text-white shadow-glow' : 'bg-slate-800/70 text-slate-300'
              }`
            }
          >
            <motion.span whileHover={{ scale: 1.15 }}>{link.icon}</motion.span>
          </NavLink>
        ))}
      </nav>
      <button
        className="rounded-full bg-slate-800 px-3 py-2 text-xs text-slate-300"
        onClick={async () => {
          window.hypergx.gxControl.toggle();
          await refreshGX();
        }}
      >
        GX Control
      </button>
    </aside>
  );
}
