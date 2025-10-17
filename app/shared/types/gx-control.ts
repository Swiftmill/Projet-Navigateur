export type GXControlLimits = {
  cpu: number;
  memory: number;
  network: number;
};

export type GXControlState = {
  enabled: boolean;
  limits: GXControlLimits;
};
