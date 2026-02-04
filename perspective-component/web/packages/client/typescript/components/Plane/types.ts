export interface PointData {
  id: string;
  x: number;
  y: number;
  color?: string;
  [key: string]: any;
}

export type state = "view" | "create" | "edit" | "delete";

export const MODES = {
  VIEW: "view",
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
} as const;

export type Mode = (typeof MODES)[keyof typeof MODES];
