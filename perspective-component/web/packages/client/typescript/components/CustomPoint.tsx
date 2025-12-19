import { useMovablePoint } from "mafs";

interface Props {
  x: number;
  y: number;
}

export const CustomPoint = ({ x, y }: Props) => {
  const point = useMovablePoint([x, y]);
  console.log(point.x)
  console.log(point.y)
  return <>{point.element}</>;
};