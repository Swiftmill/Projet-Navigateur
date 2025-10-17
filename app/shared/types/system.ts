export type SystemSnapshot = {
  cpu: {
    load: number;
    cores: number;
  };
  memory: {
    total: number;
    used: number;
  };
  network: {
    rx: number;
    tx: number;
  };
};
