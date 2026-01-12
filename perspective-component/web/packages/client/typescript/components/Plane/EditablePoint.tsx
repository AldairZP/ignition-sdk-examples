import { useEffect, useRef } from "react";
import { useMovablePoint } from "mafs";
import type { PointData } from "./types";

interface EditablePointProps {
  point: PointData;
  color?: string;
  onMove: (id: string, x: number, y: number) => void;
  onRelease?: (id: string, x: number, y: number) => void;
}

export function EditablePoint({
  point,
  color,
  onMove,
  onRelease,
}: EditablePointProps) {
  const movable = useMovablePoint([point.x, point.y], { color });
  const [mx, my] = movable.point;
  const draggingRef = useRef(false);
  const latestCoordsRef = useRef({ x: point.x, y: point.y });

  useEffect(() => {
    if (mx !== point.x || my !== point.y) {
      onMove(point.id, mx, my);
    }
  }, [mx, my, onMove, point.id, point.x, point.y]);

  useEffect(() => {
    latestCoordsRef.current = { x: mx, y: my };
  }, [mx, my]);

  useEffect(() => {
    const handlePointerUp = () => {
      if (!draggingRef.current) {
        return;
      }
      draggingRef.current = false;
      onRelease?.(
        point.id,
        latestCoordsRef.current.x,
        latestCoordsRef.current.y
      );
    };

    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [onRelease, point.id]);

  const handlePointerDown = () => {
    draggingRef.current = true;
  };

  return <g onPointerDown={handlePointerDown}>{movable.element}</g>;
}
