import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Tab } from '../../stores/tabs-store';

export function TabPreviewPopover({ tab, children }: { tab: Tab; children: ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-56 rounded-xl border border-slate-700/60 bg-slate-900/90 p-4 text-left text-xs shadow-2xl backdrop-blur-xl"
          >
            <p className="font-semibold text-slate-100">{tab.title}</p>
            <p className="mt-2 text-slate-400">{tab.url}</p>
            <p className="mt-2 text-slate-500">Aperçu instantané (à implémenter)</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
