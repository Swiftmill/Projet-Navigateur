import type { Session } from 'electron';
import { BrowserWindow } from 'electron';
import type { GXControlLimits, GXControlState } from '../../shared/types/gx-control';
import type { SystemMonitor } from './system-monitor';

export function createGXControlManager(systemMonitor: SystemMonitor) {
  const state: GXControlState = {
    enabled: false,
    limits: { cpu: 0.8, memory: 0.85, network: 0.75 }
  };

  function applyThrottling(enabled: boolean) {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((window) => {
      const webContents = window.webContents;
      webContents.setBackgroundThrottling(enabled);
      webContents.setAudioMuted(enabled ? webContents.isAudioMuted() : false);
    });
  }

  function updateTrafficThrottling(session: Session) {
    session.webRequest.onBeforeSendHeaders((details, callback) => {
      if (!state.enabled || state.limits.network >= 1) {
        callback({ cancel: false, requestHeaders: details.requestHeaders });
        return;
      }

      const throttleHeader = Math.max(1, Math.floor(state.limits.network * 100));
      callback({
        cancel: false,
        requestHeaders: {
          ...details.requestHeaders,
          'X-HyperGX-Throttle': `${throttleHeader}`
        }
      });
    });
  }

  function toggle() {
    state.enabled = !state.enabled;
    applyThrottling(state.enabled);
  }

  function updateLimits(limits: Partial<GXControlLimits>) {
    state.limits = { ...state.limits, ...limits };
  }

  function getState() {
    return { ...state, limits: { ...state.limits } };
  }

  // Monitoring tick - inform renderer about stats for the dashboard
  systemMonitor.onSnapshot(() => {
    if (!state.enabled) {
      return;
    }

    const cpuLoad = systemMonitor.snapshot().cpu.load;
    if (cpuLoad > state.limits.cpu) {
      BrowserWindow.getAllWindows().forEach((window) => {
        window.webContents.setFrameRate(Math.floor(60 * state.limits.cpu));
      });
    }
  });

  return {
    toggle,
    updateLimits,
    getState,
    updateTrafficThrottling
  };
}
