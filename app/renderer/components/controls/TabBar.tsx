import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTabsStore } from '../../stores/tabs-store';
import { TabPreviewPopover } from './TabPreviewPopover';

export function TabBar() {
  const { tabs, activeTabId, activateTab, addTab, closeTab } = useTabsStore();
  const groups = useMemo(() => {
    return tabs.reduce<Record<string, typeof tabs>>((acc, tab) => {
      const key = tab.group ?? 'default';
      acc[key] = acc[key] ?? [];
      acc[key].push(tab);
      return acc;
    }, {});
  }, [tabs]);

  return (
    <div className="flex h-14 items-center gap-2 bg-slate-950/80 px-4 backdrop-blur-lg">
      {Object.entries(groups).map(([groupId, groupTabs]) => (
        <div key={groupId} className="flex items-center gap-1">
          <span className="text-xs uppercase tracking-wide text-slate-400">{groupId}</span>
          <div className="flex items-center gap-1">
            {groupTabs.map((tab) => (
              <TabPreviewPopover key={tab.id} tab={tab}>
                <motion.button
                  layout
                  onClick={() => activateTab(tab.id)}
                  className={`group relative flex h-10 items-center gap-2 rounded-full px-4 text-sm transition ${
                    tab.id === activeTabId
                      ? 'bg-neon-600/80 text-white shadow-glow'
                      : 'bg-slate-800/60 text-slate-200 hover:bg-slate-700/70'
                  }`}
                >
                  <span className="truncate max-w-[140px]">{tab.title}</span>
                  <span
                    className="invisible ml-2 text-xs text-slate-400 transition group-hover:visible"
                    onClick={(event) => {
                      event.stopPropagation();
                      closeTab(tab.id);
                    }}
                  >
                    ✕
                  </span>
                </motion.button>
              </TabPreviewPopover>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={() => addTab({ url: 'hypergx://new-tab', title: 'Nouvel onglet' })}
        className="ml-2 h-10 w-10 rounded-full bg-neon-600/60 text-lg text-white hover:bg-neon-600"
      >
        +
      </button>
    </div>
  );
}
