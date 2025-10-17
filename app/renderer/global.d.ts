export {}; // Ensure this file is treated as a module

declare global {
  interface Window {
    hypergx: {
      gxControl: {
        getState: () => Promise<unknown>;
        updateLimits: (limits: unknown) => void;
        toggle: () => void;
        onStateChanged: (listener: (state: unknown) => void) => () => void;
      };
      system: {
        metrics: () => Promise<unknown>;
      };
    };
  }
}
