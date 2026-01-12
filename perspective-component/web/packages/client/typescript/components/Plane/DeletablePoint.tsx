import { Point } from "mafs";
import type { PointData } from "./types";

interface DeletablePointProps {
  point: PointData;
  color?: string;
  onDelete: (id: string, x: number, y:number) => void;
}

export function DeletablePoint({ point, color, onDelete }: DeletablePointProps) {
  return (
    <g
      onClick={(e) => {
        e.stopPropagation();
        onDelete(point.id, point.x, point.y);
      }}
      style={{ cursor: "pointer" }}
    >
      <Point x={point.x} y={point.y} color={color} />
    </g>
  );
}
