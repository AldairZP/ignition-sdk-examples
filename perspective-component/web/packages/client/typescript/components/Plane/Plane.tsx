import { useState } from "react";
import { Mafs, Coordinates, Point } from "mafs";

import { MODES, type Mode, type PointData } from "./types";
import { EditablePoint } from "./EditablePoint";
import { DeletablePoint } from "./DeletablePoint";
import { ModeSelector } from "./ModeSelector";
import { usePoints } from "./hooks/usePoints";

export interface PlaneProps {
  /** Puntos iniciales (solo se usa en modo no controlado) */
  initialPoints?: PointData[];
  /** Puntos controlados externamente */
  points?: PointData[];
  /** Callback cuando los puntos cambian (para modo controlado) */
  onPointsChange?: (points: PointData[]) => void;
}

export function Plane({
  initialPoints,
  points,
  onPointsChange,
}: PlaneProps = {}) {
  const [mode, setMode] = useState<Mode>(MODES.VIEW);
  const {
    points: currentPoints,
    createPoint,
    movePoint,
    deletePoint,
  } = usePoints({ initialPoints, points, onPointsChange });

  function handleMafsClick(point: [number, number]) {
    if (mode !== MODES.CREATE) return;
    const [x, y] = point;
    createPoint(x, y);
  }

  return (
    <>
      <ModeSelector currentMode={mode} onModeChange={setMode} />
      {/* <ModeInstructions mode={mode} /> */}

      <Mafs onClick={(point: [number, number]) => handleMafsClick(point)}>
        <Coordinates.Cartesian />

        {currentPoints.map((p) => {
          if (mode === MODES.EDIT) {
            return <EditablePoint key={p.id} point={p} onMove={movePoint} />;
          }

          if (mode === MODES.DELETE) {
            return (
              <DeletablePoint key={p.id} point={p} onDelete={deletePoint} />
            );
          }

          return <Point key={p.id} x={p.x} y={p.y} />;
        })}
      </Mafs>
    </>
  );
}
