export interface PointData {
  id: string;
  x: number;
  y: number;
  color?: string;
  [key: string]: any;
}

export const MODES = {
  VIEW: "view",
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
} as const;

export type Mode = (typeof MODES)[keyof typeof MODES];
