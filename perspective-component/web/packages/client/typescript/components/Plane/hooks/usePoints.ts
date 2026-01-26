import { useState, useCallback, useEffect, useRef } from "react";
import type { PointData } from "../types";

export interface UsePointsOptions {
  /** Puntos iniciales (solo se usa si no hay puntos controlados) */
  initialPoints?: PointData[];
  /** Puntos controlados externamente */
  points?: PointData[];
  /** Callback cuando los puntos cambian (para modo controlado) */
  onPointsChange?: (points: PointData[]) => void;
}

export function usePoints(options: UsePointsOptions = {}) {
  const {
    initialPoints = [],
    points: controlledPoints,
    onPointsChange,
  } = options;

  const [internalPoints, setInternalPoints] =
    useState<PointData[]>(initialPoints);
  const controlledPointsRef = useRef<PointData[] | undefined>(controlledPoints);
  const onPointsChangeRef = useRef(onPointsChange);

  useEffect(() => {
    controlledPointsRef.current = controlledPoints;
  }, [controlledPoints]);

  useEffect(() => {
    onPointsChangeRef.current = onPointsChange;
  }, [onPointsChange]);

  // Usar puntos controlados si se proporcionan, sino usar estado interno
  const isControlled = controlledPoints !== undefined;
  const points = isControlled ? controlledPoints ?? [] : internalPoints;

  const setPoints = useCallback(
    (updater: PointData[] | ((prev: PointData[]) => PointData[])) => {
      if (isControlled) {
        const basePoints = controlledPointsRef.current ?? [];
        const newPoints =
          typeof updater === "function" ? updater(basePoints) : updater;
        onPointsChangeRef.current?.(newPoints);
        return;
      }
      setInternalPoints(updater);
    },
    [isControlled]
  );

  const createPoint = useCallback(
    (x: number, y: number) => {
      const newPoint: PointData = { id: crypto.randomUUID(), x, y };
      setPoints((prev) => [...prev, newPoint]);
      return newPoint;
    },
    [setPoints]
  );

  const movePoint = useCallback(
    (id: string, x: number, y: number) => {
      setPoints((prev) =>
        prev.map((pt) => (pt.id === id ? { ...pt, x, y } : pt))
      );
    },
    [setPoints]
  );

  const deletePoint = useCallback(
    (id: string) => {
      setPoints((prev) => prev.filter((p) => p.id !== id));
    },
    [setPoints]
  );

  return {
    points,
    setPoints,
    createPoint,
    movePoint,
    deletePoint,
  };
}
