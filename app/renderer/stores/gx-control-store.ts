import { create } from 'zustand';
import type { SystemSnapshot } from '../../shared/types/system';
import type { GXControlState } from '../../shared/types/gx-control';

type GXControlStore = {
  state: GXControlState | null;
  metrics: SystemSnapshot | null;
  initialized: boolean;
  initialize: () => void;
  refresh: () => Promise<void>;
};

export const useGXControlStore = create<GXControlStore>((set, get) => ({
  state: null,
  metrics: null,
  initialized: false,
  initialize: () => {
    if (get().initialized) {
      return;
    }

    set({ initialized: true });
    get().refresh();

    window.hypergx.gxControl.onStateChanged((state) => {
      set((current) => ({ ...current, state: state as GXControlState }));
    });

    const fetchMetrics = async () => {
      const snapshot = (await window.hypergx.system.metrics()) as SystemSnapshot;
      set((current) => ({ ...current, metrics: snapshot }));
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 4000);
    interval.unref?.();
  },
  refresh: async () => {
    const state = (await window.hypergx.gxControl.getState()) as GXControlState;
    set((current) => ({ ...current, state }));
  }
}));
