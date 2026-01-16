import { useEffect, useRef } from "react";
import { useMovablePoint } from "mafs";
import type { PointData } from "./types";

interface EditablePointProps {
  point: PointData;
  color?: string;
  onMove: (id: string, x: number, y: number) => void;
  onRelease?: (id: string, x: number, y: number) => void;
  selectedPoint?: (point: PointData) => void;
}

export function EditablePoint({
  point,
  color,
  onMove,
  onRelease,
  selectedPoint,
}: EditablePointProps) {
  const movable = useMovablePoint([point.x, point.y], { color });
  const [mx, my] = movable.point;
  const draggingRef = useRef(false);
  const latestCoordsRef = useRef({ x: point.x, y: point.y });

  useEffect(() => {
    if (mx !== point.x || my !== point.y) {
      onMove(point.id, mx, my);
      draggingRef.current = true;
    }
  }, [mx, my, onMove, point.id, point.x, point.y]);

  useEffect(() => {
    latestCoordsRef.current = { x: mx, y: my };
  }, [mx, my]);

  const setSelectedPoint = () => {
    if (!selectedPoint) {
      return;
    }
    selectedPoint(point);
  };

  const handlePointerUp = () => {
    onRelease?.(point.id, latestCoordsRef.current.x, latestCoordsRef.current.y);
  };

  return <g onMouseDown={setSelectedPoint} onMouseUp={handlePointerUp}>{movable.element}</g>;
}
