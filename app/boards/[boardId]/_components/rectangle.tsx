import { RectangleLayer } from "@/types/canvas";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (ev: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer;

  console.log({id, layer})

  return (
    <rect
      className="drop-shadow-lg"
      onPointerDown={(ev) => onPointerDown(ev, id)}
      style={{
        transform: `translate(${x}px ${y}px)`,
      }}
      x={x}
      y={y}
      width={width}
      height={height}
      strokeWidth={1}
      fill="#c67914"
      stroke="transparent"
    />
  );
};

export default Rectangle;
