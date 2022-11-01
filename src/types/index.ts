export interface VCPoint {
  x: number;
  y: number;
}

export type VCPoint2 = number[];

export enum VCWidgets {
  ARROW_GENERATOR = "arrowGenerator",
  GRID_LAYOUT = "gridLayout",
}

export * from "./arrowGenerator";
