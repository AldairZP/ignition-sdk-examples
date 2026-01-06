import { useEffect } from "react";
import { useMovablePoint } from "mafs";
import type { PointData } from "./types";

interface EditablePointProps {
  point: PointData;
  onMove: (id: string, x: number, y: number) => void;
}

export function EditablePoint({ point, onMove }: EditablePointProps) {
  const movable = useMovablePoint([point.x, point.y]);
  const [mx, my] = movable.point;

  useEffect(() => {
    if (mx !== point.x || my !== point.y) {
      onMove(point.id, mx, my);
    }
  }, [mx, my, onMove, point.id, point.x, point.y]);

  return movable.element;
}
