import { useEffect, useRef } from "react";
import { useMovablePoint } from "mafs";
import type { PointData } from "./types";

interface EditablePointProps {
  point: PointData;
  color?: string;
  editPoint?: boolean;
  selectedPoint?: PointData;
  onMove: (id: string, x: number, y: number) => void;
  onRelease?: (point: PointData) => void;
  setSelectedPoint?: (point: PointData) => void;
}

export function EditablePoint({
  point,
  color,
  editPoint,
  selectedPoint,
  onMove,
  onRelease,
  setSelectedPoint,
}: EditablePointProps) {
  const movable = useMovablePoint([point.x, point.y], { color });
  const [mx, my] = movable.point;
  const latestCoordsRef = useRef({ x: point.x, y: point.y });
  const currentCoords = { x: mx, y: my };

  useEffect(() => {
    if (!setSelectedPoint) return;

    if (mx !== point.x || my !== point.y) {
      if (selectedPoint?.id == point.id) {
        setSelectedPoint({ ...point, x: mx, y: my });
      }
      if (editPoint) {
        onMove(point.id, mx, my);
      }
    }
  }, [editPoint, mx, my, onMove, point.id, point.x, point.y, setSelectedPoint]);

  useEffect(() => {
    latestCoordsRef.current = { x: currentCoords.x, y: currentCoords.y };
  }, [currentCoords.x, currentCoords.y]);

  const handleSetSelectedPoint = () => {
    if (!setSelectedPoint) {
      return;
    }
    setSelectedPoint({ ...point, x: mx, y: my });
  };

  const handlePointerUp = () => {
    if (setSelectedPoint) {
      if (selectedPoint?.id == point.id) {
        setSelectedPoint({ ...point, x: mx, y: my });
      }
    }
    onRelease?.({ ...point, x: mx, y: my });
  };

  return (
    <g
      onPointerDownCapture={handleSetSelectedPoint}
      onPointerUpCapture={handlePointerUp}
    >
      {movable.element}
    </g>
  );
}
