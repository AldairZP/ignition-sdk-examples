import { Mafs, Coordinates, Point } from "mafs";
import { useEffect, useState } from "react";
import { CustomPoint } from "./CustomPoint";

type planeState = "edit" | "new" | "view";
interface Point {
  x: number;
  y: number;
}
type Vec2 = [number, number];

export function HelloFx() {
  const [planeState, setPlaneState] = useState<planeState>("view");
  const [points, setPoints] = useState<Point[]>([]);
  const [pointsMovable, setPointsMovable] = useState<React.ReactNode[]>([]);
  const [pointsStatic, setPointsStatic] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    setPointsMovable(
      points.map((point) => {
        return <CustomPoint x={point.x} y={point.y} />;
      })
    );
    setPointsStatic(
      points.map((point) => {
        return <Point x={point.x} y={point.y} />;
      })
    );
  }, [points]);

  const newPoint = (x: number, y: number) => {
    const newPoint = {
      x: x,
      y: y,
    };
    setPoints((prev) => [...prev, newPoint]);
  };

  return (
    <div>
      <Mafs
        zoom={true}
        onClick={(point: Vec2, event: MouseEvent) => {
          console.log(event);
          newPoint(point[0], point[1]);
        }}
      >
        <Coordinates.Cartesian
          xAxis={{ lines: 1, labels: undefined }}
          yAxis={{ lines: 1, labels: undefined }}
          subdivisions={2}
        />
        <Point x={1} y={1} />
        {planeState === "view" ? [...pointsStatic] : [...pointsMovable]}
      </Mafs>
      <button
        onClick={() => {
          if (planeState === "edit") {
            setPlaneState("view");
            return;
          }
          setPlaneState("edit");
        }}
      >
        toggle
      </button>
    </div>
  );
}
