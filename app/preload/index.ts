import { contextBridge, ipcRenderer } from 'electron';
import type { IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('hypergx', {
  gxControl: {
    getState: () => ipcRenderer.invoke('gx-control:getState'),
    updateLimits: (limits: unknown) => ipcRenderer.send('gx-control:updateLimits', limits),
    toggle: () => ipcRenderer.send('gx-control:toggle'),
    onStateChanged: (listener: (state: unknown) => void) => {
      const handler = (_event: IpcRendererEvent, state: unknown) => listener(state);
      ipcRenderer.on('gx-control:state-changed', handler);
      return () => ipcRenderer.removeListener('gx-control:state-changed', handler);
    }
  },
  system: {
    metrics: () => ipcRenderer.invoke('system:metrics')
  }
});
