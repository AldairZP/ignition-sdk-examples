export interface PointData {
  id: string;
  x: number;
  y: number;
}

export const MODES = {
  VIEW: "view",
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
} as const;

export type Mode = (typeof MODES)[keyof typeof MODES];
