import os from 'os';
import { EventEmitter } from 'events';
import type { SystemSnapshot } from '../../shared/types/system';

export type SystemMonitor = ReturnType<typeof createSystemMonitor>;

export function createSystemMonitor() {
  const emitter = new EventEmitter();
  let lastSnapshot = captureSnapshot();

  function captureSnapshot(): SystemSnapshot {
    const cpus = os.cpus();
    const cores = cpus.length;
    const load = cpus.reduce((acc, cpu) => {
      const total = Object.values(cpu.times).reduce((sum, t) => sum + t, 0);
      return acc + (total - cpu.times.idle) / total;
    }, 0);

    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();

    // Placeholder network stats for skeleton - to be replaced with OS specific metrics
    const networkStats = { rx: Math.random() * 5, tx: Math.random() * 3 };

    return {
      cpu: {
        load: load / cores,
        cores
      },
      memory: {
        total: totalMemory,
        used: totalMemory - freeMemory
      },
      network: networkStats
    };
  }

  function snapshot() {
    lastSnapshot = captureSnapshot();
    return lastSnapshot;
  }

  const interval = setInterval(() => {
    lastSnapshot = captureSnapshot();
    emitter.emit('snapshot', lastSnapshot);
  }, 2000);

  interval.unref();

  return {
    snapshot,
    onSnapshot: (listener: (snapshot: SystemSnapshot) => void) => {
      emitter.on('snapshot', listener);
      return () => emitter.off('snapshot', listener);
    }
  };
}
