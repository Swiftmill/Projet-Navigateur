import { nanoid } from 'nanoid';
import { create } from 'zustand';

export type Tab = {
  id: string;
  title: string;
  url: string;
  pinned?: boolean;
  group?: string;
};

type TabsState = {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (tab: Pick<Tab, 'title' | 'url'> & Partial<Omit<Tab, 'id'>>) => void;
  closeTab: (id: string) => void;
  activateTab: (id: string) => void;
};

const initialTab = {
  id: nanoid(),
  title: 'HyperGX',
  url: 'https://hypergx.dev',
  group: 'Général'
};

export const useTabsStore = create<TabsState>((set, get) => ({
  tabs: [initialTab],
  activeTabId: initialTab.id,
  addTab: (tab) => {
    const id = tab.id ?? nanoid();
    set((state) => ({
      tabs: [...state.tabs, { id, ...tab }],
      activeTabId: id
    }));
  },
  closeTab: (id) => {
    const { tabs, activeTabId } = get();
    const filtered = tabs.filter((tab) => tab.id !== id);
    const nextActive = activeTabId === id ? filtered.at(-1)?.id ?? null : activeTabId;
    set({ tabs: filtered, activeTabId: nextActive });
  },
  activateTab: (id) => set({ activeTabId: id })
}));
