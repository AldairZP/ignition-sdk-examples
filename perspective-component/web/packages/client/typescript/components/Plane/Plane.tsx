import { useState } from "react";
// import { useEffect } from "react";
import { Mafs, Coordinates, Point } from "mafs";

import { MODES, type Mode, type PointData } from "./types";
import { EditablePoint } from "./EditablePoint";
import { DeletablePoint } from "./DeletablePoint";
import { ModeSelector } from "./ModeSelector";
import { usePoints } from "./hooks/usePoints";
import { Image } from "mafs";

export interface PlaneProps {
  /** Puntos iniciales (solo se usa en modo no controlado) */
  initialPoints?: PointData[];
  /** Puntos controlados externamente */
  points?: PointData[];
  /** Callback cuando los puntos cambian (para modo controlado) */
  onPointsChange?: (points: PointData[]) => void;
  urlImage?: string;
  widthImage?: number;
  heightImage?: number;
  background?: string;
  colorLine?: string;
  subdivisions?: number;
  buttons?: boolean;
  zoomValue?: number;
  colorPoints?: string;
  colorEditPoints?: string;
  colorDeletePoints?: string;
  panning?: boolean;
  zooming?: boolean;
  height?: number;
  onPointCreated?: (point: PointData, points: PointData[]) => void;
  onPointReleased?: (point: PointData, points: PointData[]) => void;
  onPointDeleted?: (point: PointData, points: PointData[]) => void;
  setSelectedPoint?: (point: PointData) => void;
}

export function Plane({
  initialPoints,
  points,
  onPointsChange,
  urlImage,
  widthImage,
  heightImage,
  background,
  colorLine,
  subdivisions = 1,
  buttons = false,
  zoomValue = 3,
  colorPoints,
  colorEditPoints,
  colorDeletePoints,
  panning,
  zooming,
  height,
  onPointCreated,
  onPointReleased,
  onPointDeleted,
  setSelectedPoint,
}: PlaneProps = {}) {
  const [mode, setMode] = useState<Mode>(MODES.VIEW);
  const {
    points: currentPoints,
    createPoint,
    movePoint,
    deletePoint,
  } = usePoints({ initialPoints, points, onPointsChange });

  function handleMafsClick(point: [number, number]) {
    if (!setSelectedPoint) {
      return;
    }
    if (mode !== MODES.CREATE) return;
    const [x, y] = point;
    const createdPoint = createPoint(x, y);
    if (onPointCreated) {
      const updatedPoints = [...currentPoints, createdPoint];
      setSelectedPoint(createdPoint);
      onPointCreated(createdPoint, updatedPoints);
    }
  }

  const handlePointReleased = (id: string, x: number, y: number) => {
    if (!onPointReleased) {
      return;
    }
    const releasedPoint: PointData = { id, x, y };
    const updatedPoints = currentPoints.map((pt) =>
      pt.id === id ? releasedPoint : pt
    );
    onPointReleased(releasedPoint, updatedPoints);
  };

  const handlePointDeleted = (id: string, x: number, y: number) => {
    if (!onPointDeleted) {
      return;
    }
    const deletedPoint: PointData = { id, x, y };
    const updatedPoints = currentPoints.filter((pt) => pt.id != id);
    onPointDeleted(deletedPoint, updatedPoints);
    deletePoint(id);
  };

  const el = document.getElementById("container-mafs");
  const newContainerHeight = el?.getBoundingClientRect().height;
  return (
    <div className="container" id="container-mafs">
      {buttons && <ModeSelector currentMode={mode} onModeChange={setMode} />}

      <div
        style={{
          display: "flex",
          height:
            height === undefined
              ? buttons
                ? newContainerHeight && newContainerHeight - 49
                : newContainerHeight && newContainerHeight - 4
              : buttons
              ? height && height - 45
              : height,

          width: "100%",
          padding: 0,
          margin: 0,
        }}
      >
        <Mafs
          pan={panning}
          zoom={zooming ? { min: 0.2, max: 10 } : zooming}
          height={
            height === undefined
              ? buttons
                ? newContainerHeight && newContainerHeight - 49
                : newContainerHeight && newContainerHeight - 4
              : buttons
              ? height && height - 45
              : height
          }
          width={"auto"}
          viewBox={{ x: [-zoomValue, zoomValue], y: [-zoomValue, zoomValue] }}
          onClick={(point: [number, number]) => handleMafsClick(point)}
        >
          <Coordinates.Cartesian
            subdivisions={subdivisions}
            xAxis={subdivisions > 0 ? { axis: false, labels: false } : false}
            yAxis={subdivisions > 0 ? { axis: false, labels: false } : false}
          />
          <Image
            href={urlImage}
            width={widthImage}
            height={heightImage}
            anchor="cc"
            x={0}
            y={0}
          />
          {currentPoints.map((p) => {
            if (mode === MODES.EDIT) {
              return (
                <EditablePoint
                  color={colorEditPoints}
                  key={p.id}
                  point={p}
                  onMove={movePoint}
                  onRelease={handlePointReleased}
                  selectedPoint={setSelectedPoint}
                />
              );
            }

            if (mode === MODES.DELETE) {
              return (
                <DeletablePoint
                  color={colorDeletePoints}
                  key={p.id}
                  point={p}
                  onDelete={handlePointDeleted}
                />
              );
            }
            return (
              <Point
                color={
                  p.color === undefined || p.color === ""
                    ? colorPoints
                    : p.color
                }
                key={p.id}
                x={p.x}
                y={p.y}
              />
            );
          })}
          <style type="text/css">
            {`.MafsView{` +
              "background:" +
              background +
              ";" +
              "--mafs-line-color:" +
              colorLine +
              ";" +
              "--grid-line-subdivision-color:" +
              colorLine +
              ";" +
              `}`}
          </style>
        </Mafs>
      </div>
    </div>
  );
}
