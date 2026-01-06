import { Point } from "mafs";
import type { PointData } from "./types";

interface DeletablePointProps {
  point: PointData;
  onDelete: (id: string) => void;
}

export function DeletablePoint({ point, onDelete }: DeletablePointProps) {
  return (
    <g
      onClick={(e) => {
        e.stopPropagation();
        onDelete(point.id);
      }}
      style={{ cursor: "pointer" }}
    >
      <Point x={point.x} y={point.y} color="red" />
    </g>
  );
}
