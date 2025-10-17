import { useState } from 'react';
import { motion } from 'framer-motion';

export function Omnibox() {
  const [value, setValue] = useState('hypergx://new-tab');

  return (
    <div className="flex items-center gap-3 border-b border-slate-800/60 bg-slate-900/80 px-6 py-3">
      <div className="flex items-center gap-2">
        <button className="rounded-full bg-slate-800/70 px-3 py-1 text-xs text-slate-400">◀</button>
        <button className="rounded-full bg-slate-800/70 px-3 py-1 text-xs text-slate-400">▶</button>
        <button className="rounded-full bg-slate-800/70 px-3 py-1 text-xs text-slate-400">⟳</button>
      </div>
      <motion.div
        layout
        className="flex flex-1 items-center gap-3 rounded-full bg-slate-950/80 px-4 py-2 text-slate-300 shadow-inner"
      >
        <span className="text-neon-500">/</span>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Tapez une URL, une recherche ou une commande (ex: /capture)"
          className="flex-1 bg-transparent text-sm outline-none"
        />
        <kbd className="rounded-md bg-slate-800/60 px-2 py-1 text-[10px] uppercase text-slate-400">Ctrl+L</kbd>
      </motion.div>
      <button className="rounded-full bg-neon-600/70 px-4 py-2 text-xs text-white">Commandes</button>
    </div>
  );
}
