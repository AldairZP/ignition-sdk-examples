// import { useEffect } from "react";
import { Mafs, Coordinates, Point } from "mafs";

import { MODES, type state, type PointData } from "./types";
import { EditablePoint } from "./EditablePoint";
import { DeletablePoint } from "./DeletablePoint";
import { ModeSelector } from "./ModeSelector";
import { usePoints } from "./hooks/usePoints";
import { Image } from "mafs";
import { useWindowSize } from "../../hooks/useWindowSize";

export interface PlaneProps {
  /** Puntos iniciales (solo se usa en modo no controlado) */
  initialPoints?: PointData[];
  /** Puntos controlados externamente */
  points?: PointData[];
  /** Callback cuando los puntos cambian (para modo controlado) */
  onPointsChange?: (points: PointData[]) => void;
  state?: state;
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
  createPoint?: boolean;
  editPoint?: boolean;
  deletePoint?: boolean;
  selectedPoint?: PointData;
  setState: (state: state) => void;
  onPointCreated: (point: PointData, points: PointData[]) => void;
  onPointReleased: (point: PointData, points: PointData[]) => void;
  onPointDeleted: (point: PointData, points: PointData[]) => void;
  setSelectedPoint: (point: PointData) => void;
}

export function Plane({
  setState,
  state,
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
  createPoint = false,
  editPoint = false,
  deletePoint: isDeletePoint = false,
  onPointCreated,
  onPointReleased,
  onPointDeleted,
  setSelectedPoint,
  selectedPoint,
}: PlaneProps) {
  // const [mode, setMode] = useState<Mode>(MODES.VIEW);
  const {
    points: currentPoints,
    createPoint: createPointInternal,
    movePoint,
    deletePoint,
  } = usePoints({ initialPoints, points, onPointsChange });
  // rerender when resize the window
  useWindowSize();

  function handleMafsClick(point: [number, number]) {
    if (state !== MODES.CREATE) return;
    const [x, y] = point;

    if (!createPoint) {
      const newPoint: PointData = { id: crypto.randomUUID(), x, y };
      setSelectedPoint(newPoint);
      onPointCreated(newPoint, currentPoints);
      return;
    }
    const createdPoint = createPointInternal(x, y);
    const updatedPoints = [...currentPoints, createdPoint];
    setSelectedPoint(createdPoint);
    onPointCreated(createdPoint, updatedPoints);
  }

  const handlePointReleased = (point: PointData) => {
    const updatedPoints = currentPoints.map((pt) =>
      pt.id === point.id ? point : pt,
    );
    onPointReleased(point, updatedPoints);
  };

  const handlePointDeleted = (point: PointData) => {
    const updatedPoints = currentPoints.filter((pt) => pt.id != point.id);
    setSelectedPoint(point);
    onPointDeleted(point, updatedPoints);
    if (!isDeletePoint) return;
    deletePoint(point.id);
  };

  const el = document.getElementById("container-mafs");
  const newContainerHeight = el?.getBoundingClientRect().height;
  return (
    <div className="container" id="container-mafs">
      {buttons && (
        <ModeSelector
          currentMode={state ? state : "view"}
          onModeChange={(state: state) => {
            setState(state);
          }}
        />
      )}

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
          cursor: state == "create" ? "crosshair" : "default",
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
          {urlImage && (
            <Image
              href={urlImage}
              width={widthImage}
              height={heightImage}
              anchor="cc"
              x={0}
              y={0}
            />
          )}
          <Coordinates.Cartesian
            subdivisions={subdivisions}
            xAxis={subdivisions > 0 ? { axis: false, labels: false } : false}
            yAxis={subdivisions > 0 ? { axis: false, labels: false } : false}
          />
          {currentPoints.map((p) => {
            if (state === MODES.EDIT) {
              return (
                <EditablePoint
                  color={colorEditPoints}
                  key={p.id}
                  point={p}
                  editPoint={editPoint}
                  onMove={movePoint}
                  onRelease={handlePointReleased}
                  setSelectedPoint={setSelectedPoint}
                  selectedPoint={selectedPoint}
                />
              );
            }

            if (state === MODES.DELETE) {
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
