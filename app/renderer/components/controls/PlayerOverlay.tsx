import { motion } from 'framer-motion';

export function PlayerOverlay() {
  return (
    <motion.div
      layout
      className="pointer-events-none absolute bottom-6 right-6 flex w-72 flex-col gap-2 rounded-3xl border border-slate-700/60 bg-slate-900/80 p-4 text-xs text-slate-300 shadow-2xl backdrop-blur-xl"
    >
      <div className="pointer-events-auto flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-100">Lecteur flottant</p>
        <button className="rounded-full bg-slate-800/70 px-2 py-1 text-[10px] uppercase">PIP</button>
      </div>
      <p className="pointer-events-auto text-slate-400">
        Installez une extension audio ou connectez un flux pour contrôler la lecture partout.
      </p>
    </motion.div>
  );
}
